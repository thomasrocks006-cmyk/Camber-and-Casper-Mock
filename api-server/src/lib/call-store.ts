/**
 * Shared in-memory call state for demo purposes.
 * Resets on server restart — in production this would be a Redis/DB layer.
 */

export interface CallRecord {
  id: string;
  status:
    | "dialing"
    | "ringing"
    | "connected"
    | "completed"
    | "failed"
    | "no-answer";
  leadId?: string;
  vapiCallId?: string;
  startedAt: string;
  endedAt?: string;
  transcript: string[];
  summary?: string;
  objections?: string[];
  nextStep?: string;
  vibeScore?: number;
  outcome?: string;
  outcomeDetail?: { summary?: string; objections?: string[]; nextStep?: string };
  recordingUrl?: string;
}

export const callStore: Record<string, CallRecord> = {};

export const generateCallId = () =>
  `call_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
