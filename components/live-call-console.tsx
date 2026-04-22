import React, { useEffect, useRef } from "react";
import { useAppStore } from "../store";
import {
  Mic,
  UserX,
  Activity,
  StopCircle,
  Check,
  AlertTriangle,
  TrendingDown,
  Brain,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const DISPOSITION_OPTIONS = [
  "Meeting Booked",
  "Callback Requested",
  "Quote Sent",
  "Not Interested",
  "Wrong Number",
  "Left Voicemail",
  "Follow-up in 30 Days",
  "Transferred to Owner",
  "Won — Closed",
];

const sentimentColour = (s: string) =>
  s === "positive"
    ? "text-green-400"
    : s === "negative"
      ? "text-red-400"
      : "text-amber-400";

const sentimentPct = (s: string) =>
  s === "positive" ? 82 : s === "negative" ? 24 : 54;

export function LiveCallConsole() {
  const {
    callConsole,
    leads,
    resetCall,
    appendTranscript,
    completeCall,
    setDisposition,
  } = useAppStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Resolve the active lead so transcript + post-call panels are dynamic
  const activeLead = leads.find((l) => l.id === callConsole.leadId) ?? null;
  const contactFirst = activeLead?.contact.split(" ")[0] ?? "the contact";
  const painPoint =
    activeLead?.keyPainPoints?.[0] ?? "operational inefficiencies";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [callConsole.transcript]);

  useEffect(() => {
    if (callConsole.status === "dialing") {
      const t1 = setTimeout(() => appendTranscript("Dialing…"), 500);
      const t2 = setTimeout(() => {
        useAppStore.setState((s) => ({
          callConsole: { ...s.callConsole, status: "connected" },
        }));
        appendTranscript("Connected. Ironbark coaching engine active.");
      }, 2500);
      const t3 = setTimeout(
        () => appendTranscript(`Customer: Hello, this is ${contactFirst}.`),
        3500,
      );
      const t4 = setTimeout(
        () =>
          appendTranscript(
            `Rep: Hi ${contactFirst}, it's Alex from Camber & Casper — calling about the quote we sent through on the job management system.`,
          ),
        5000,
      );
      const t5 = setTimeout(
        () =>
          appendTranscript(
            `Customer: Ah yeah, I've been meaning to look at that. Bit busy this week.`,
          ),
        7000,
      );
      const t6 = setTimeout(
        () =>
          appendTranscript(
            `Rep: No worries at all — I'll keep it brief. The main thing that would help with ${painPoint} is the automated follow-up sequences…`,
          ),
        9000,
      );
      const t7 = setTimeout(
        () =>
          appendTranscript(
            `Customer: That's actually a big pain point for us — we lose time every week on that.`,
          ),
        11000,
      );
      const t8 = setTimeout(() => {
        completeCall(79, "positive", [
          "Too busy right now",
          "Price concern: setup cost",
        ]);
      }, 13000);

      return () => {
        [t1, t2, t3, t4, t5, t6, t7, t8].forEach(clearTimeout);
      };
    }
    return undefined;
  }, [callConsole.status, callConsole.leadId, contactFirst, painPoint]);

  if (callConsole.status === "idle") return null;

  const isActive =
    callConsole.status === "dialing" || callConsole.status === "connected";
  const isCompleted = callConsole.status === "completed";

  return (
    <div
      className="absolute bottom-0 left-0 right-0 bg-card border-t border-border shadow-2xl z-50 flex flex-col transition-all duration-300"
      style={{ minHeight: "320px", maxHeight: "480px" }}
    >
      {/* Console Header */}
      <div className="h-10 border-b border-border/50 flex items-center px-4 justify-between bg-secondary/30 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {callConsole.status === "dialing" && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            )}
            {callConsole.status === "connected" && (
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            )}
            {callConsole.status === "completed" && (
              <span className="w-2 h-2 rounded-full bg-primary" />
            )}
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {callConsole.status === "dialing"
                ? "Dialing"
                : callConsole.status === "connected"
                  ? "Live Call"
                  : "Call Complete — Post-Call Analysis"}
            </span>
          </div>
          <div className="text-sm font-medium border-l border-border/50 pl-3 text-foreground">
            {activeLead
              ? `${activeLead.contact} · ${activeLead.company}`
              : (callConsole.leadId ?? "Unknown Contact")}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <button
              onClick={resetCall}
              className="text-xs bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-1.5 rounded transition-colors"
            >
              Close Console
            </button>
          ) : (
            <button
              onClick={() => completeCall(50, "neutral", [])}
              className="text-xs flex items-center gap-1.5 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground px-3 py-1.5 rounded transition-colors"
            >
              <StopCircle className="w-3 h-3" /> End Call
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Transcript pane */}
        <div className="flex-1 border-r border-border/50 p-4 flex flex-col min-h-0 bg-background/40">
          <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
            <Mic className="w-3 h-3" />{" "}
            {isActive ? "Live Transcript" : "Call Transcript"}
          </div>
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto space-y-1.5 pr-1"
          >
            {callConsole.transcript.map((line, i) => (
              <div
                key={i}
                className={`text-sm leading-relaxed ${
                  line.startsWith("Rep:")
                    ? "text-primary"
                    : line.startsWith("Customer:")
                      ? "text-foreground"
                      : "text-muted-foreground italic"
                }`}
              >
                {line}
              </div>
            ))}
            {callConsole.status === "connected" && (
              <div className="flex items-center gap-1 mt-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            )}
          </div>

          {/* Real-time alert slots */}
          {isActive && (
            <div className="mt-3 border-t border-border/50 pt-3 space-y-1.5 shrink-0">
              <div className="text-xs font-medium text-muted-foreground mb-1">
                Ironbark Live Alerts
              </div>
              <div className="flex items-center gap-2 text-xs p-2 rounded-lg bg-secondary/30 border border-border/50 text-muted-foreground">
                <Brain className="w-3 h-3 shrink-0 text-primary" />
                <span>Profile Shift — awaiting trigger</span>
              </div>
              <div className="flex items-center gap-2 text-xs p-2 rounded-lg bg-secondary/30 border border-border/50 text-muted-foreground">
                <AlertTriangle className="w-3 h-3 shrink-0 text-amber-400" />
                <span>Objection Incoming — awaiting trigger</span>
              </div>
              <div className="flex items-center gap-2 text-xs p-2 rounded-lg bg-secondary/30 border border-border/50 text-muted-foreground">
                <TrendingDown className="w-3 h-3 shrink-0 text-red-400" />
                <span>Engagement Dropping — awaiting trigger</span>
              </div>
            </div>
          )}
        </div>

        {/* Right panel — live metrics or post-call */}
        <div className="w-80 flex flex-col bg-card overflow-y-auto">
          {isActive && (
            <div className="p-4 space-y-4">
              {/* Vibe Score */}
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-2">
                  <Activity className="w-3 h-3" /> Vibe Score (0–100)
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${callConsole.vibeScore > 70 ? "bg-green-500" : callConsole.vibeScore > 40 ? "bg-amber-500" : "bg-red-500"}`}
                      style={{ width: `${callConsole.vibeScore}%` }}
                    />
                  </div>
                  <span className="text-lg font-semibold tabular-nums">
                    {callConsole.vibeScore}
                  </span>
                </div>
              </div>

              {/* Sentiment % */}
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1.5">
                  Sentiment
                </div>
                <div
                  className={`text-sm font-semibold ${sentimentColour(callConsole.sentiment)}`}
                >
                  {callConsole.sentiment.charAt(0).toUpperCase() +
                    callConsole.sentiment.slice(1)}{" "}
                  · {sentimentPct(callConsole.sentiment)}%
                </div>
              </div>

              {/* Objection Tracker */}
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-2">
                  <UserX className="w-3 h-3" /> Objection Tracker
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {callConsole.objections.length > 0 ? (
                    callConsole.objections.map((obj, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 bg-destructive/10 text-destructive rounded border border-destructive/20"
                      >
                        {obj}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground italic">
                      Monitoring…
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Post-call analysis panel */}
          {isCompleted && (
            <div className="p-4 space-y-4 overflow-y-auto">
              {/* Vibe + Sentiment summary */}
              <div className="flex gap-4">
                <div className="flex-1 p-2 rounded-lg bg-secondary/30 border border-border/50 text-center">
                  <div className="text-xs text-muted-foreground">Vibe</div>
                  <div
                    className={`text-xl font-bold ${callConsole.vibeScore > 70 ? "text-green-400" : callConsole.vibeScore > 40 ? "text-amber-400" : "text-red-400"}`}
                  >
                    {callConsole.vibeScore}
                  </div>
                </div>
                <div className="flex-1 p-2 rounded-lg bg-secondary/30 border border-border/50 text-center">
                  <div className="text-xs text-muted-foreground">Sentiment</div>
                  <div
                    className={`text-lg font-bold ${sentimentColour(callConsole.sentiment)}`}
                  >
                    {sentimentPct(callConsole.sentiment)}%
                  </div>
                </div>
              </div>

              {/* Auto Summary */}
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Auto Summary
                </div>
                <div className="text-xs text-muted-foreground leading-relaxed p-2 rounded-lg bg-secondary/30 border border-border/50">
                  {contactFirst} confirmed{" "}
                  {activeLead?.keyPainPoints?.[0]
                    ? `"${activeLead.keyPainPoints[0]}"`
                    : "a key pain point"}{" "}
                  is significant. They're interested but flagged busyness and
                  setup cost.{" "}
                  {callConsole.vibeScore >= 70
                    ? "Positive outcome: warm lead."
                    : "Outcome: follow-up required."}{" "}
                  Suggest a follow-up call in 3 days with a 10-min demo link.
                </div>
              </div>

              {/* Key Moments */}
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Key Moments
                </div>
                <div className="space-y-1">
                  {[
                    { time: "0:11", note: "Connected and confirmed identity" },
                    {
                      time: "0:47",
                      note: activeLead?.keyPainPoints?.[0]
                        ? `Pain point confirmed: ${activeLead.keyPainPoints[0]}`
                        : "Pain point confirmed",
                    },
                    {
                      time: "1:08",
                      note: "Price concern raised re: setup cost",
                    },
                  ].map((m, i) => (
                    <div key={i} className="flex gap-2 text-xs">
                      <span className="font-mono text-muted-foreground shrink-0">
                        {m.time}
                      </span>
                      <span className="text-foreground">{m.note}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Objections Extracted */}
              {callConsole.objections.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                    Objections Extracted
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {callConsole.objections.map((obj, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 bg-destructive/10 text-destructive rounded border border-destructive/20"
                      >
                        {obj}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Disposition Selector */}
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Disposition
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {DISPOSITION_OPTIONS.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDisposition(d)}
                      className={`text-xs px-2 py-1 rounded border transition-colors ${
                        callConsole.disposition === d
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary/40 border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {callConsole.disposition === d && (
                        <Check className="w-2.5 h-2.5 inline mr-1" />
                      )}
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Next Step */}
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Next Step
                </div>
                <div className="text-xs text-muted-foreground p-2 rounded-lg bg-secondary/30 border border-border/50">
                  Send 10-min demo booking link. Follow-up call in 3 business
                  days if no response. Ironbark will auto-remind.
                </div>
              </div>

              {/* Follow-Up Draft */}
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Follow-Up Draft
                </div>
                <div className="text-xs text-muted-foreground p-2 rounded-lg bg-secondary/30 border border-border/50 leading-relaxed italic">
                  "Hi {contactFirst} — great speaking today. As promised, here's
                  the 10-min demo link: [link]. It shows exactly how we address{" "}
                  {activeLead?.keyPainPoints?.[0]
                    ? activeLead.keyPainPoints[0].toLowerCase()
                    : "your key challenges"}
                  . Happy to walk through it with you — let me know a time that
                  suits."
                </div>
                <button className="mt-2 w-full text-xs bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded px-3 py-1.5 transition-colors flex items-center justify-center gap-1.5">
                  <Check className="w-3 h-3" /> Send Follow-Up
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
