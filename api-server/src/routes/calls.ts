import { Router, type IRouter } from "express";
import { callStore, generateCallId } from "../lib/call-store";
import { isVapiEnabled, triggerVapiCall } from "../lib/vapi-client";
import { logger } from "../lib/logger";

const router: IRouter = Router();

/**
 * GET /api/calls/config
 * Returns whether the Vapi integration is active (keys present).
 */
router.get("/calls/config", (_req, res) => {
  res.json({ vapiEnabled: isVapiEnabled(), mode: isVapiEnabled() ? "live" : "mock" });
});

/**
 * POST /api/calls/outbound
 * Trigger an outbound call for a known lead.
 * Body: { leadId: string, laneId?: string, phone?: string, name?: string, company?: string }
 *
 * When Vapi keys are present, this triggers a real call.
 * When absent, it creates a mock call record for the frontend to simulate.
 */
router.post("/calls/outbound", async (req, res) => {
  const { leadId, laneId, phone, name, company } = req.body ?? {};
  if (!leadId) {
    res.status(400).json({ error: "leadId is required" });
    return;
  }
  const id = generateCallId();
  callStore[id] = {
    id,
    status: "dialing",
    leadId,
    startedAt: new Date().toISOString(),
    transcript: [],
  };

  // If Vapi is configured and we have a phone number, trigger a real call
  if (isVapiEnabled() && phone) {
    const result = await triggerVapiCall({
      phoneNumber: phone,
      name: name ?? "Contact",
      company: company ?? "Unknown",
      internalCallId: id,
    });
    if (result.success && result.vapiCallId) {
      callStore[id].vapiCallId = result.vapiCallId;
      callStore[id].status = "ringing";
      logger.info({ callId: id, vapiCallId: result.vapiCallId }, "Live call initiated via Vapi");
    } else {
      logger.warn({ callId: id, error: result.error }, "Vapi call failed — falling back to mock mode");
    }
  }

  res
    .status(201)
    .json({ callId: id, status: callStore[id].status, leadId, laneId: laneId ?? null, vapiEnabled: isVapiEnabled() });
});

/**
 * POST /api/calls/manual
 * Trigger a manual call with contact details.
 * Body: { name: string, phone: string, company: string, notes?: string }
 */
router.post("/calls/manual", async (req, res) => {
  const { name, phone, company, notes } = req.body ?? {};
  if (!name || !phone) {
    res.status(400).json({ error: "name and phone are required" });
    return;
  }
  const id = generateCallId();
  callStore[id] = {
    id,
    status: "dialing",
    startedAt: new Date().toISOString(),
    transcript: [],
  };

  // If Vapi is configured, trigger a real call
  if (isVapiEnabled()) {
    const result = await triggerVapiCall({
      phoneNumber: phone,
      name,
      company: company ?? "Unknown",
      internalCallId: id,
    });
    if (result.success && result.vapiCallId) {
      callStore[id].vapiCallId = result.vapiCallId;
      callStore[id].status = "ringing";
      logger.info({ callId: id, vapiCallId: result.vapiCallId }, "Live manual call via Vapi");
    } else {
      logger.warn({ callId: id, error: result.error }, "Vapi call failed — mock mode");
    }
  }

  res
    .status(201)
    .json({
      callId: id,
      status: callStore[id].status,
      contact: { name, phone, company: company ?? null, notes: notes ?? null },
      vapiEnabled: isVapiEnabled(),
    });
});

/**
 * GET /api/calls/:id/status
 * Poll current call state.
 */
router.get("/calls/:id/status", (req, res) => {
  const call = callStore[req.params.id];
  if (!call) {
    res.status(404).json({ error: "Call not found" });
    return;
  }
  res.json({
    callId: call.id,
    status: call.status,
    startedAt: call.startedAt,
    transcriptLines: call.transcript.length,
  });
});

/**
 * POST /api/calls/:id/outcome
 * Receive transcript and result from the call provider webhook.
 * Body: { status: string, transcript?: string[], summary?: string, objections?: string[], nextStep?: string }
 */
router.post("/calls/:id/outcome", (req, res) => {
  const call = callStore[req.params.id];
  if (!call) {
    res.status(404).json({ error: "Call not found" });
    return;
  }
  const { status, transcript, summary, objections, nextStep } = req.body ?? {};
  call.status = status ?? "completed";
  call.transcript = transcript ?? call.transcript;
  call.outcome = status ?? "completed";
  call.outcomeDetail = { summary, objections: objections ?? [], nextStep };
  res.json({ callId: call.id, status: call.status, outcome: call.outcome, outcomeDetail: call.outcomeDetail });
});

export default router;
