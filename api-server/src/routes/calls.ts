import { Router, type IRouter } from "express";
import { callStore, generateCallId } from "../lib/call-store";

const router: IRouter = Router();

/**
 * POST /api/calls/outbound
 * Trigger an outbound call for a known lead.
 * Body: { leadId: string, laneId?: string }
 */
router.post("/calls/outbound", (req, res) => {
  const { leadId, laneId } = req.body ?? {};
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
  res
    .status(201)
    .json({ callId: id, status: "dialing", leadId, laneId: laneId ?? null });
});

/**
 * POST /api/calls/manual
 * Trigger a manual call with contact details.
 * Body: { name: string, phone: string, company: string, notes?: string }
 */
router.post("/calls/manual", (req, res) => {
  const { name, phone, company, notes } = req.body ?? {};
  if (!name || !phone || !company) {
    res.status(400).json({ error: "name, phone, and company are required" });
    return;
  }
  const id = generateCallId();
  callStore[id] = {
    id,
    status: "dialing",
    startedAt: new Date().toISOString(),
    transcript: [],
  };
  res
    .status(201)
    .json({
      callId: id,
      status: "dialing",
      contact: { name, phone, company, notes: notes ?? null },
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
  call.outcome = { summary, objections: objections ?? [], nextStep };
  res.json({ callId: call.id, status: call.status, outcome: call.outcome });
});

export default router;
