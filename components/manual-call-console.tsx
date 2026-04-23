import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  PhoneOff,
  Mic,
  Signal,
  Clock,
  User,
  Building2,
  Activity,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type CallPhase = "idle" | "dialing" | "ringing" | "connected" | "completed" | "failed";

interface TranscriptLine {
  role: "agent" | "customer" | "system";
  text: string;
  time: string;
}

const SIMULATED_TRANSCRIPT: { delay: number; role: "agent" | "customer" | "system"; text: string }[] = [
  { delay: 0, role: "system", text: "Connecting via Vapi…" },
  { delay: 2200, role: "system", text: "Ringing…" },
  { delay: 4500, role: "system", text: "Connected." },
  { delay: 6000, role: "agent", text: "G'day, it's Alex from Camber & Casper. I know you're busy — got 60 seconds. Worth hearing about something that could save you 10 hours a week, or should I let you go?" },
  { delay: 10000, role: "customer", text: "Uh, yeah sure — go ahead." },
  { delay: 12000, role: "agent", text: "Brilliant. We've built an operating system for trades businesses — handles your quoting, job management, and follow-ups automatically. No more chasing customers for approvals." },
  { delay: 17000, role: "customer", text: "How much does something like that cost?" },
  { delay: 19000, role: "agent", text: "Fair question. Setup's a one-off, then monthly — no lock-in. Most of our clients save 10+ hours a week so it pays for itself in the first fortnight. Happy to show you in a 15-min demo?" },
  { delay: 24000, role: "customer", text: "Yeah alright, send me a link." },
  { delay: 26000, role: "agent", text: "Ripper — I'll get that across to you now. Cheers mate, talk soon." },
  { delay: 28000, role: "system", text: "Call ended — Meeting Booked." },
];

function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function ManualCallConsole() {
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  // Call state
  const [phase, setPhase] = useState<CallPhase>("idle");
  const [callId, setCallId] = useState<string | null>(null);
  const [vapiEnabled, setVapiEnabled] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [vibeScore, setVibeScore] = useState(50);
  const [sentiment, setSentiment] = useState<"neutral" | "positive" | "negative">("neutral");
  const [objections, setObjections] = useState<string[]>([]);
  const [outcome, setOutcome] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const simRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Auto-scroll transcript
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  // Timer
  useEffect(() => {
    if (phase === "dialing" || phase === "ringing" || phase === "connected") {
      timerRef.current = setInterval(() => setElapsed((p) => p + 1), 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  // Vibe score animation during connected phase
  useEffect(() => {
    if (phase === "connected") {
      const interval = setInterval(() => {
        setVibeScore((prev) => {
          const delta = Math.random() > 0.4 ? Math.floor(Math.random() * 5) : -Math.floor(Math.random() * 3);
          return Math.max(20, Math.min(98, prev + delta));
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const addTranscriptLine = useCallback((role: "agent" | "customer" | "system", text: string) => {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
    setTranscript((prev) => [...prev, { role, text, time }]);
  }, []);

  const runSimulation = useCallback(() => {
    // Clear any prior sim
    simRef.current.forEach(clearTimeout);
    simRef.current = [];

    SIMULATED_TRANSCRIPT.forEach((entry) => {
      const t = setTimeout(() => {
        addTranscriptLine(entry.role, entry.text);

        // Phase transitions
        if (entry.text === "Ringing…") setPhase("ringing");
        if (entry.text === "Connected.") {
          setPhase("connected");
          setVibeScore(52);
        }
        // Sentiment shifts
        if (entry.text.includes("yeah sure")) {
          setSentiment("neutral");
          setVibeScore(58);
        }
        if (entry.text.includes("How much")) {
          setObjections(["Price concern"]);
          setVibeScore(48);
          setSentiment("neutral");
        }
        if (entry.text.includes("send me a link")) {
          setSentiment("positive");
          setVibeScore(89);
          setObjections(["Price concern (resolved)"]);
        }
        if (entry.text.includes("Call ended")) {
          setPhase("completed");
          setVibeScore(89);
          setSentiment("positive");
          setOutcome("Meeting Booked");
        }
      }, entry.delay);
      simRef.current.push(t);
    });
  }, [addTranscriptLine]);

  const handleStartCall = async () => {
    if (!name.trim() || !phone.trim()) {
      toast({ title: "Missing Fields", description: "Name and phone number are required." });
      return;
    }

    // Reset state
    setPhase("dialing");
    setElapsed(0);
    setTranscript([]);
    setVibeScore(50);
    setSentiment("neutral");
    setObjections([]);
    setOutcome(null);
    setCallId(null);
    setVapiEnabled(false);

    // Hit the API
    try {
      const res = await fetch("/api/calls/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), company: company.trim() || "Unknown" }),
      });
      if (res.ok) {
        const data = await res.json();
        setCallId(data.callId);
        setVapiEnabled(data.vapiEnabled ?? false);

        if (data.vapiEnabled) {
          // Real Vapi call — poll status
          addTranscriptLine("system", `Live call initiated · ID: ${data.callId}`);
          addTranscriptLine("system", "Connecting via Vapi…");
          // TODO: implement real polling via GET /api/calls/:id/status
          // For now, we still run the visual simulation
          setTimeout(() => runSimulation(), 500);
        } else {
          // Demo mode — run simulation
          addTranscriptLine("system", "Demo mode · Simulating call");
          runSimulation();
        }
      } else {
        addTranscriptLine("system", "API returned error — running demo simulation");
        runSimulation();
      }
    } catch {
      addTranscriptLine("system", "API unreachable — running demo simulation");
      runSimulation();
    }
  };

  const handleEndCall = () => {
    simRef.current.forEach(clearTimeout);
    simRef.current = [];
    setPhase("completed");
    setOutcome(outcome ?? "Call Ended");
    addTranscriptLine("system", "Call ended manually.");
  };

  const handleReset = () => {
    simRef.current.forEach(clearTimeout);
    simRef.current = [];
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("idle");
    setElapsed(0);
    setTranscript([]);
    setVibeScore(50);
    setSentiment("neutral");
    setObjections([]);
    setOutcome(null);
    setCallId(null);
  };

  const isActive = phase === "dialing" || phase === "ringing" || phase === "connected";

  // ─── IDLE: sophisticated form ───
  if (phase === "idle") {
    return (
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Phone className="w-3.5 h-3.5 text-primary" />
          </div>
          <div>
            <div className="text-xs font-semibold text-foreground">Manual Call</div>
            <div className="text-[10px] text-muted-foreground">Direct dial · Vapi voice AI</div>
          </div>
        </div>

        <div className="space-y-2.5">
          <div>
            <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider block mb-1">
              Contact Name *
            </label>
            <div className="relative">
              <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50" />
              <input
                type="text"
                placeholder="Brett Kowalski"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-background border border-border rounded-lg pl-8 pr-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/30"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider block mb-1">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50" />
              <input
                type="tel"
                placeholder="+61 4XX XXX XXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-background border border-border rounded-lg pl-8 pr-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/30 tabular-nums"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider block mb-1">
              Company
            </label>
            <div className="relative">
              <Building2 className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50" />
              <input
                type="text"
                placeholder="Northside Auto & Tyre"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-background border border-border rounded-lg pl-8 pr-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/30"
              />
            </div>
          </div>

          <Button
            onClick={handleStartCall}
            className="w-full gap-2 mt-1 relative overflow-hidden group"
            disabled={!name.trim() || !phone.trim()}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/0 via-green-400/10 to-green-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Phone className="w-4 h-4" />
            <span>Start Call</span>
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground/50 mt-1">
            <Signal className="w-3 h-3" />
            <span>Powered by Ironbark · Vapi voice engine</span>
          </div>
        </div>
      </div>
    );
  }

  // ─── ACTIVE / COMPLETED: live call display ───
  return (
    <div className="border-t border-border/50 flex flex-col" style={{ minHeight: "420px" }}>
      {/* Call header with status */}
      <div className="px-4 py-3 bg-secondary/30 border-b border-border/50 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            {/* Pulsing ring indicator */}
            <div className="relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                phase === "dialing" ? "bg-amber-500/20" :
                phase === "ringing" ? "bg-amber-500/20" :
                phase === "connected" ? "bg-green-500/20" :
                outcome === "Meeting Booked" ? "bg-green-500/20" : "bg-secondary"
              }`}>
                {isActive ? (
                  <Phone className={`w-4 h-4 ${phase === "connected" ? "text-green-400" : "text-amber-400"}`} />
                ) : outcome === "Meeting Booked" ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                ) : (
                  <PhoneOff className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              {isActive && (
                <>
                  <span className={`absolute inset-0 rounded-full animate-ping ${
                    phase === "connected" ? "bg-green-500/20" : "bg-amber-500/20"
                  }`} style={{ animationDuration: "1.5s" }} />
                  <span className={`absolute inset-[-4px] rounded-full border-2 ${
                    phase === "connected" ? "border-green-500/30" : "border-amber-500/30"
                  } animate-pulse`} />
                </>
              )}
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground leading-tight">{name}</div>
              <div className="text-[10px] text-muted-foreground">{company || "Unknown"} · {phone}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`text-[10px] font-semibold ${
              phase === "dialing" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
              phase === "ringing" ? "bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse" :
              phase === "connected" ? "bg-green-500/10 text-green-400 border-green-500/20" :
              outcome === "Meeting Booked" ? "bg-green-500/10 text-green-400 border-green-500/20" :
              "bg-secondary text-muted-foreground"
            }`}>
              {phase === "dialing" ? "DIALING" :
               phase === "ringing" ? "RINGING" :
               phase === "connected" ? "LIVE" :
               "ENDED"}
            </Badge>
          </div>
        </div>

        {/* Timer + live metrics bar */}
        <div className="flex items-center gap-4 text-[10px]">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span className="tabular-nums font-mono font-semibold text-foreground">{formatTimer(elapsed)}</span>
          </div>
          {(phase === "connected" || phase === "completed") && (
            <>
              <div className="flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">Vibe</span>
                <span className={`font-semibold tabular-nums ${vibeScore >= 70 ? "text-green-400" : vibeScore >= 40 ? "text-amber-400" : "text-red-400"}`}>
                  {vibeScore}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mic className="w-3 h-3 text-muted-foreground" />
                <span className={`font-semibold ${sentiment === "positive" ? "text-green-400" : sentiment === "negative" ? "text-red-400" : "text-amber-400"}`}>
                  {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
                </span>
              </div>
              {vapiEnabled && (
                <Badge variant="outline" className="text-[9px] bg-primary/10 text-primary border-primary/20 ml-auto">
                  LIVE · Vapi
                </Badge>
              )}
              {!vapiEnabled && callId && (
                <Badge variant="outline" className="text-[9px] bg-secondary text-muted-foreground ml-auto">
                  DEMO
                </Badge>
              )}
            </>
          )}
        </div>

        {/* Vibe score bar */}
        {(phase === "connected" || phase === "completed") && (
          <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${vibeScore >= 70 ? "bg-green-500" : vibeScore >= 40 ? "bg-amber-500" : "bg-red-500"}`}
              style={{ width: `${vibeScore}%` }}
            />
          </div>
        )}
      </div>

      {/* Transcript */}
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col bg-background/40">
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto scroll-slim p-3 space-y-2"
        >
          {transcript.map((line, i) => (
            <div key={i} className="flex gap-2 text-xs">
              <span className="text-[9px] font-mono text-muted-foreground/50 shrink-0 mt-0.5 tabular-nums w-[52px]">
                {line.time}
              </span>
              <div className={`flex-1 leading-relaxed ${
                line.role === "agent" ? "text-primary" :
                line.role === "customer" ? "text-foreground" :
                "text-muted-foreground italic"
              }`}>
                {line.role === "agent" && <span className="text-primary/50 font-semibold mr-1">Agent:</span>}
                {line.role === "customer" && <span className="text-foreground/50 font-semibold mr-1">{name.split(" ")[0]}:</span>}
                {line.text}
              </div>
            </div>
          ))}

          {/* Typing indicator when connected */}
          {phase === "connected" && (
            <div className="flex items-center gap-1 pl-[60px] mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          )}
        </div>

        {/* Objection chips */}
        {objections.length > 0 && (
          <div className="px-3 py-2 border-t border-border/30 shrink-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-medium">Objections:</span>
              {objections.map((obj, i) => (
                <span key={i} className={`text-[10px] px-2 py-0.5 rounded-full border ${
                  obj.includes("resolved")
                    ? "bg-green-500/10 text-green-400 border-green-500/20 line-through opacity-60"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                }`}>
                  {obj}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Outcome banner (completed) */}
      {phase === "completed" && outcome && (
        <div className={`px-4 py-3 border-t shrink-0 ${
          outcome === "Meeting Booked"
            ? "bg-green-500/10 border-green-500/20"
            : "bg-secondary/30 border-border/50"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {outcome === "Meeting Booked" ? (
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              ) : (
                <XCircle className="w-4 h-4 text-muted-foreground" />
              )}
              <div>
                <div className={`text-sm font-semibold ${outcome === "Meeting Booked" ? "text-green-400" : "text-foreground"}`}>
                  {outcome}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Duration: {formatTimer(elapsed)} · Vibe: {vibeScore}/100 · {sentiment}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              {callId && <span className="font-mono opacity-50">{callId.slice(0, 16)}…</span>}
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="px-4 py-3 border-t border-border/50 bg-card shrink-0 flex items-center gap-2">
        {isActive ? (
          <Button onClick={handleEndCall} variant="destructive" size="sm" className="w-full gap-2">
            <PhoneOff className="w-4 h-4" /> End Call
          </Button>
        ) : (
          <>
            <Button onClick={handleReset} variant="outline" size="sm" className="flex-1">
              New Call
            </Button>
            <Button onClick={() => { handleReset(); }} variant="ghost" size="sm" className="text-muted-foreground">
              Close
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
