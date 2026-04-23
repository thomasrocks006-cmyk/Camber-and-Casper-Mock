/**
 * Vapi.ai Client — Real call integration when API keys are present.
 *
 * When VAPI_API_KEY is configured, calls are triggered via the Vapi REST API.
 * When keys are absent, the server falls back to mock mode (existing behaviour).
 *
 * Required env vars:
 *   VAPI_API_KEY          — Vapi platform API key
 *   VAPI_PHONE_NUMBER_ID  — Your registered Vapi phone number ID
 *
 * Optional env vars:
 *   VAPI_WEBHOOK_URL      — Public URL for webhook delivery (e.g. https://your-app.replit.app/api/vapi/webhook)
 *   VOICE_PROVIDER        — "11labs" (default)
 *   ELEVENLABS_VOICE_ID   — Voice ID (default: Isabella — ZkDZ5VCyH0GGbxO7o4aO)
 *   VAPI_LLM_PROVIDER     — "groq" (default)
 *   VAPI_LLM_MODEL        — "llama-3.3-70b-versatile" (default)
 */

import { logger } from "./logger";

const VAPI_BASE_URL = "https://api.vapi.ai";

export interface VapiCallRequest {
  phoneNumber: string;
  name: string;
  company: string;
  systemPrompt?: string;
  firstMessage?: string;
  internalCallId: string;
}

export interface VapiCallResponse {
  success: boolean;
  vapiCallId?: string;
  error?: string;
}

function getConfig() {
  return {
    apiKey: process.env["VAPI_API_KEY"] ?? "",
    phoneNumberId: process.env["VAPI_PHONE_NUMBER_ID"] ?? "",
    webhookUrl: process.env["VAPI_WEBHOOK_URL"] ?? "",
    voiceId: process.env["ELEVENLABS_VOICE_ID"] ?? "ZkDZ5VCyH0GGbxO7o4aO",
    llmModel: process.env["VAPI_LLM_MODEL"] ?? "llama-3.3-70b-versatile",
    llmProvider: process.env["VAPI_LLM_PROVIDER"] ?? "groq",
  };
}

export function isVapiEnabled(): boolean {
  const cfg = getConfig();
  return !!(cfg.apiKey && cfg.phoneNumberId);
}

/**
 * Build the system prompt for an outbound call.
 * Uses Australian conversational patterns as specified in the Call System Architecture doc.
 */
function buildSystemPrompt(name: string, company: string): string {
  return `You are Alex, a friendly and professional business development representative calling on behalf of Camber & Casper Systems. You are calling ${name} at ${company}.

CRITICAL RULES:
- You are Australian. Use natural Australian English: "G'day", "no worries", "reckon", "arvo", "mate".
- Keep responses under 2-3 sentences. Phone conversations need brevity.
- You work for Camber & Casper, makers of AtlasOS — an operating system for workshop and trade businesses.
- Your goal: qualify interest and book a 15-minute demo.
- If they're busy: offer to call back. "No worries — when's a better time this arvo?"
- If they object on price: "Fair enough — most of our clients save 10+ hours a week. Worth a quick look?"
- Always be respectful of their time. If they say no, accept gracefully: "No worries at all, cheers mate."

OPENING (use this exact pattern):
"G'day ${name}, it's Alex from Camber & Casper. I know you're busy — got 60 seconds. Worth hearing about something that could save you 10 hours a week, or should I let you go?"

TRUST WINDOW: If they don't hang up in the first 5 seconds, there's a 70% chance they'll listen for 60+ seconds. Be confident but not pushy.`;
}

/**
 * Trigger a real outbound call via the Vapi REST API.
 */
export async function triggerVapiCall(
  req: VapiCallRequest,
): Promise<VapiCallResponse> {
  const cfg = getConfig();

  if (!cfg.apiKey || !cfg.phoneNumberId) {
    return { success: false, error: "Vapi not configured — API key or phone number ID missing" };
  }

  const systemPrompt =
    req.systemPrompt ?? buildSystemPrompt(req.name, req.company);

  const firstMessage =
    req.firstMessage ??
    `G'day ${req.name}, it's Alex from Camber & Casper. I know you're busy — got 60 seconds. Worth hearing about something that could save you 10 hours a week, or should I let you go?`;

  const body: Record<string, unknown> = {
    phoneNumberId: cfg.phoneNumberId,
    customer: {
      number: req.phoneNumber,
      name: req.name,
    },
    assistant: {
      name: "AtlasOS Call Agent",
      model: {
        provider: cfg.llmProvider,
        model: cfg.llmModel,
        temperature: 0.6,
        maxTokens: 120,
        messages: [{ role: "system", content: systemPrompt }],
      },
      voice: {
        provider: "11labs",
        voiceId: cfg.voiceId,
        model: "eleven_multilingual_v2",
        stability: 0.35,
        similarityBoost: 0.85,
      },
      firstMessage,
      backchannelingEnabled: true,
      backgroundSound: "office",
      silenceTimeoutSeconds: 20,
      endCallMessage: "Talk soon.",
      maxDurationSeconds: 300,
    },
    metadata: {
      callId: req.internalCallId,
      company: req.company,
    },
  };

  // Include webhook URL if configured
  if (cfg.webhookUrl) {
    (body.assistant as Record<string, unknown>).serverUrl = cfg.webhookUrl;
  }

  try {
    const response = await fetch(`${VAPI_BASE_URL}/call/phone`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cfg.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text();
      logger.error({ status: response.status, body: errText }, "Vapi API error");
      return { success: false, error: `Vapi API ${response.status}: ${errText}` };
    }

    const data = (await response.json()) as Record<string, unknown>;
    const vapiCallId = data.id as string;
    logger.info({ vapiCallId, internalCallId: req.internalCallId }, "Vapi call initiated");

    return { success: true, vapiCallId };
  } catch (err) {
    logger.error({ err }, "Failed to trigger Vapi call");
    return { success: false, error: String(err) };
  }
}
