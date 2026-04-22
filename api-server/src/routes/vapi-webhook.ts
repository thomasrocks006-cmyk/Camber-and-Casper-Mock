/**
 * Vapi Webhook Receiver — GAP-40
 *
 * Receives real-time events from the Vapi.ai platform during and after calls.
 * In production: verify HMAC-SHA256 signature from VAPI_WEBHOOK_SECRET.
 * In demo: accept all events and update the shared in-memory callStore.
 *
 * Vapi fires these event types:
 *   call.started         → call was picked up / connected
 *   call.ended           → call finished (with outcome metadata)
 *   transcript.ready     → full transcript available
 *   recording.ready      → recording URL available
 */

import { Router, type IRouter } from "express";
import { callStore } from "../lib/call-store";

const router: IRouter = Router();

/**
 * POST /api/vapi/webhook
 * Entry point for all Vapi platform events.
 *
 * Vapi sends the callId as `message.call.id` and correlates to our
 * internal callId via `message.call.metadata.callId`.
 */
router.post("/vapi/webhook", (req, res) => {
  const payload = req.body ?? {};
  const message = payload.message ?? payload;
  const eventType: string = message.type ?? payload.type ?? "unknown";

  // Resolve internal callId from Vapi metadata
  const vapiCallId: string | undefined = message.call?.id ?? message.callId;
  const internalCallId: string | undefined =
    message.call?.metadata?.callId ?? vapiCallId;

  // Find the matching record (prefer internal id, fall back to vapiCallId match)
  const record =
    (internalCallId ? callStore[internalCallId] : undefined) ??
    Object.values(callStore).find((r) => r.vapiCallId === vapiCallId);

  switch (eventType) {
    case "call.started":
      if (record) {
        record.status = "connected";
        record.vapiCallId = vapiCallId;
      }
      break;

    case "call.ended": {
      const endedAt = message.call?.endedAt ?? new Date().toISOString();
      const endReason = message.call?.endedReason ?? "unknown";
      if (record) {
        record.status =
          endReason === "assistant-ended-call" ? "completed" : "completed";
        record.endedAt = endedAt;
        // Vapi sends a top-level summary object on call.ended
        const summary = message.analysis?.summary;
        if (summary) record.summary = summary;
        const vibeScore = message.analysis?.successEvaluation;
        if (vibeScore != null) record.vibeScore = Math.round(Number(vibeScore));
        const structuredData = message.analysis?.structuredData;
        if (structuredData?.objections)
          record.objections = structuredData.objections;
        if (structuredData?.nextStep) record.nextStep = structuredData.nextStep;
        if (structuredData?.outcome) record.outcome = structuredData.outcome;
      }
      break;
    }

    case "transcript.ready": {
      const messages: Array<{ role: string; message: string }> =
        message.transcript ?? message.messages ?? [];
      if (record) {
        record.transcript = messages.map((m) => `${m.role}: ${m.message}`);
      }
      break;
    }

    case "recording.ready": {
      const url = message.recordingUrl ?? message.stereoRecordingUrl;
      if (record && url) {
        record.recordingUrl = url;
      }
      break;
    }

    default:
      // Unknown event — acknowledge and ignore
      break;
  }

  // Always respond 200 immediately — Vapi retries on non-2xx
  res.status(200).json({ received: true, eventType });
});

export default router;
