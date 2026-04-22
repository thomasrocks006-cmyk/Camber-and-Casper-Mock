import React, { useState } from "react";
import { useAppStore } from "../store";
import { StatStrip } from "../components/stat-strip";
import {
  RightPanel,
  PanelSection,
  ConfidenceScore,
} from "../components/right-panel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radio,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Zap,
  ArrowUpRight,
  ArrowRight,
  Play,
  CheckCircle2,
  ChevronDown,
  Building2,
  Clock,
  Target,
  Shield,
} from "lucide-react";

const INTEL_STREAMS = [
  { label: "All Signals", count: 124, severity: "high" },
  { label: "Competitor Moves", count: 9, severity: "high" },
  { label: "Pricing Movements", count: 6, severity: "high" },
  { label: "Market Signals", count: 22, severity: "medium" },
  { label: "Technology Changes", count: 14, severity: "medium" },
  { label: "Hiring Surges", count: 18, severity: "medium" },
  { label: "Customer Sentiment", count: 31, severity: "low" },
  { label: "Supplier Signals", count: 24, severity: "low" },
];

const SAVED_VIEWS = [
  "High Threat",
  "Immediate Opportunities",
  "Outbound Impacting Signals",
];

const COMPETITOR_CARDS = [
  {
    id: "c1",
    name: "RepairDesk",
    move: "Raised subscription prices 15% — effective July 1",
    direction: "opportunity" as const,
    impact: "High",
    affectedLeads: 8,
    timestamp: "4h ago",
    summary:
      "3 of your active prospects are on RepairDesk. Switching window is open for 6–8 weeks. Response pack ready.",
  },
  {
    id: "c2",
    name: "Workshop Wizard",
    move: "Service outage — 3 workshops in your territory affected",
    direction: "opportunity" as const,
    impact: "High",
    affectedLeads: 3,
    timestamp: "1d ago",
    summary:
      "Outage affected 3 workshops you're currently nurturing. Engagement window open while they're frustrated with their current tool.",
  },
  {
    id: "c3",
    name: "Protractor",
    move: "Launched new tyre module — targeting fleet accounts",
    direction: "threat" as const,
    impact: "Medium",
    affectedLeads: 2,
    timestamp: "2d ago",
    summary:
      "Protractor is moving into fleet tyre services — overlaps with 2 of your Canning Vale / Broome fleet prospects. Monitor closely.",
  },
];

const MARKET_SIGNALS = [
  {
    id: "m1",
    type: "Pricing",
    source: "Burson Auto Parts",
    event: "Brake pad line up 14% — 3 upcoming Hilux services affected",
    impact: "High",
    timestamp: "2h ago",
    direction: "threat" as const,
  },
  {
    id: "m2",
    type: "Hiring",
    source: "Northside Auto & Tyre",
    event: "Workshop Manager + BDM roles posted on SEEK — growth phase signal",
    impact: "Medium",
    timestamp: "1d ago",
    direction: "opportunity" as const,
  },
  {
    id: "m3",
    type: "Technology",
    source: "Canning Vale Fleet Services",
    event: "Fleetmatics end-of-life announced — fleet management gap by Q4",
    impact: "High",
    timestamp: "2d ago",
    direction: "opportunity" as const,
  },
  {
    id: "m4",
    type: "Regulation",
    source: "VicRoads",
    event:
      "Updated RWC checklist adds ADAS recalibration from July 1 — affects 34% of your fleet",
    impact: "Medium",
    timestamp: "1d ago",
    direction: "threat" as const,
  },
  {
    id: "m5",
    type: "Pricing",
    source: "ATO",
    event:
      "Super guarantee rises to 11.5% from July 1 — payroll provision impact",
    impact: "Medium",
    timestamp: "1d ago",
    direction: "threat" as const,
  },
  {
    id: "m6",
    type: "Leadership",
    source: "O'Brien Auto Group",
    event:
      "New Operations Manager appointed — process improvement initiative signalled",
    impact: "High",
    timestamp: "2h ago",
    direction: "opportunity" as const,
  },
];

const impactBadge = (impact: string) =>
  impact === "High"
    ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
    : impact === "Medium"
      ? "bg-primary/20 text-primary border-primary/30"
      : "bg-secondary text-muted-foreground border-border";

const directionIcon = (d: "threat" | "opportunity") =>
  d === "opportunity" ? (
    <TrendingUp className="w-3.5 h-3.5 text-green-400" />
  ) : (
    <TrendingDown className="w-3.5 h-3.5 text-red-400" />
  );

export default function SignalEngine() {
  const {
    signals,
    leads,
    outboundLanes,
    responsePacks,
    addLeadToLane,
    approveResponsePack,
    logActivity,
  } = useAppStore();
  const { toast } = useToast();

  const [activeStream, setActiveStream] = useState("All Signals");
  const [focusedCompetitorId, setFocusedCompetitorId] = useState<string | null>(
    COMPETITOR_CARDS[0].id,
  );
  const [focusedSignalId, setFocusedSignalId] = useState<string | null>(null);
  const [strategyMode, setStrategyMode] = useState<
    "Monitor" | "Recommend" | "Deploy"
  >("Recommend");
  const [timeWindow, setTimeWindow] = useState("7d");

  const focusedCompetitor = COMPETITOR_CARDS.find(
    (c) => c.id === focusedCompetitorId,
  );
  const pendingPacks = responsePacks.filter((rp) => rp.status === "pending");

  const handleDeployPack = (packId: string) => {
    const pack = responsePacks.find((rp) => rp.id === packId);
    if (!pack) return;
    approveResponsePack(packId);
    toast({
      title: "Response Pack Deployed",
      description: `${pack.leadsAffected} leads routed to ${pack.targetLane}.`,
    });
  };

  const statItems = [
    { label: "Active Signals", value: 124, trend: 15 },
    { label: "High-Priority Threats", value: 12, trend: 2 },
    { label: "Opportunities Detected", value: 9, trend: 4 },
    { label: "Strategies Generated", value: pendingPacks.length + 2 },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Command Bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border shrink-0">
        <div>
          <h1 className="text-xl font-semibold">Strategic Command</h1>
          <p className="text-sm text-muted-foreground">
            Market intelligence and strategic response
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-secondary/50 rounded-md border border-border/50 overflow-hidden text-xs font-medium">
            {(["Monitor", "Recommend", "Deploy"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setStrategyMode(m)}
                className={`px-3 py-1.5 transition-colors ${strategyMode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="flex bg-secondary/50 rounded-md border border-border/50 overflow-hidden text-xs font-medium">
            {(["24h", "7d", "30d"] as const).map((w) => (
              <button
                key={w}
                onClick={() => setTimeWindow(w)}
                className={`px-3 py-1.5 transition-colors ${timeWindow === w ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      </div>

      <StatStrip items={statItems} />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Rail — Intelligence Streams */}
        <div className="w-64 flex-shrink-0 border-r border-border bg-card/30 p-4 overflow-y-auto">
          <div className="mb-4">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Saved Views
            </h3>
            <div className="space-y-1">
              {SAVED_VIEWS.map((v) => (
                <button
                  key={v}
                  className="w-full text-left px-2 py-1.5 rounded text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Intelligence Streams
          </h3>
          <div className="space-y-0.5">
            {INTEL_STREAMS.map((stream) => (
              <button
                key={stream.label}
                onClick={() => setActiveStream(stream.label)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex justify-between items-center ${activeStream === stream.label ? "bg-primary/10 text-primary" : "text-foreground/70 hover:bg-secondary hover:text-foreground"}`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${stream.severity === "high" ? "bg-amber-400" : stream.severity === "medium" ? "bg-primary" : "bg-muted-foreground"}`}
                  />
                  {stream.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {stream.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Centre — Strategic Field */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-background/50">
          {/* Competitor Cards */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Competitor Movement
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {COMPETITOR_CARDS.map((card) => (
                <div
                  key={card.id}
                  onClick={() => setFocusedCompetitorId(card.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${focusedCompetitorId === card.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/30"}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="font-semibold text-sm text-foreground">
                      {card.name}
                    </div>
                    <div className="flex items-center gap-1">
                      {directionIcon(card.direction)}
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded border ${impactBadge(card.impact)}`}
                      >
                        {card.impact}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {card.move}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {card.timestamp}
                    </span>
                    <span>{card.affectedLeads} leads affected</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Live Signal Feed */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Radio className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Live Signal Feed
              </h2>
            </div>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-secondary/50 border-b border-border text-muted-foreground uppercase tracking-wider text-[10px] font-semibold">
                  <tr>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Source</th>
                    <th className="px-4 py-3">Signal</th>
                    <th className="px-4 py-3">Direction</th>
                    <th className="px-4 py-3">Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {MARKET_SIGNALS.map((sig) => (
                    <tr
                      key={sig.id}
                      onClick={() =>
                        setFocusedSignalId(
                          focusedSignalId === sig.id ? null : sig.id,
                        )
                      }
                      className={`cursor-pointer transition-colors hover:bg-secondary/30 ${focusedSignalId === sig.id ? "bg-primary/5" : ""}`}
                    >
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                        {sig.timestamp}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                          {sig.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">
                        {sig.source}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground max-w-sm">
                        {sig.event}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {directionIcon(sig.direction)}
                          <span
                            className={`text-xs ${sig.direction === "opportunity" ? "text-green-400" : "text-red-400"}`}
                          >
                            {sig.direction === "opportunity"
                              ? "Opportunity"
                              : "Threat"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2 py-0.5 rounded border ${impactBadge(sig.impact)}`}
                        >
                          {sig.impact}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Response Packs */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Response Packs
              </h2>
              <Badge
                variant="outline"
                className="ml-auto text-xs text-amber-400 border-amber-500/30 bg-amber-500/10"
              >
                {pendingPacks.length} awaiting approval
              </Badge>
            </div>
            <div className="space-y-3">
              <AnimatePresence>
                {pendingPacks.map((pack) => (
                  <motion.div
                    key={pack.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-5 rounded-xl border border-border bg-card hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="font-semibold text-foreground mb-1">
                          {pack.title}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {pack.description}
                        </div>
                        <div className="flex items-center gap-3 mt-3 text-xs">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Target className="w-3 h-3" /> {pack.leadsAffected}{" "}
                            leads affected
                          </span>
                          <span className="flex items-center gap-1 text-primary">
                            <ArrowRight className="w-3 h-3" /> {pack.targetLane}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <Button
                          size="sm"
                          onClick={() => handleDeployPack(pack.id)}
                          className="gap-1.5"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" /> Deploy
                          to Outbound
                        </Button>
                        <Button size="sm" variant="outline">
                          Modify
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {pendingPacks.length === 0 && (
                <div className="p-8 text-center border border-border border-dashed rounded-xl text-muted-foreground text-sm">
                  <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  All response packs have been deployed.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Panel — Strategic Intelligence Engine */}
        <RightPanel title="Strategic Intelligence">
          {focusedCompetitor ? (
            <>
              <PanelSection title="Situation Summary">
                <div className="p-3 rounded-lg bg-secondary/30 border border-border text-sm text-muted-foreground leading-relaxed">
                  <div className="font-medium text-foreground mb-1 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-primary" />
                    {focusedCompetitor.name}
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded border ml-auto ${impactBadge(focusedCompetitor.impact)}`}
                    >
                      {focusedCompetitor.impact}
                    </span>
                  </div>
                  {focusedCompetitor.summary}
                </div>
              </PanelSection>

              <PanelSection title="Why It Matters">
                <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
                  <p>
                    {focusedCompetitor.direction === "opportunity"
                      ? `${focusedCompetitor.name}'s move creates a short-term switching window. Workshops are price-sensitive — a 15% hike triggers vendor re-evaluation immediately.`
                      : `${focusedCompetitor.name} is expanding into your target segment. Two of your active prospects may now receive competing offers.`}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-primary font-medium mt-2">
                    {directionIcon(focusedCompetitor.direction)}
                    {focusedCompetitor.affectedLeads} leads in your pipeline
                    directly affected
                  </div>
                </div>
              </PanelSection>

              <PanelSection title="Recommended Strategy">
                <div className="space-y-2 text-sm">
                  {focusedCompetitor.direction === "opportunity" ? (
                    <>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">
                          Lead with price-lock guarantee messaging in outbound
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">
                          Reference same-week onboarding to reduce switching
                          friction
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">
                          Deploy response pack within 2 days — window is 6–8
                          weeks
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">
                          Accelerate pipeline velocity on affected leads
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">
                          Differentiate on integration depth — highlight Xero +
                          Burson native connectors
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </PanelSection>

              <PanelSection title="Execution Impact">
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded border border-border bg-card flex justify-between">
                    <span className="text-muted-foreground">
                      Outbound lane affected
                    </span>
                    <span className="font-medium text-primary">
                      Competitor Switch Targets
                    </span>
                  </div>
                  <div className="p-2 rounded border border-border bg-card flex justify-between">
                    <span className="text-muted-foreground">
                      Leads to re-sequence
                    </span>
                    <span className="font-medium">
                      {focusedCompetitor.affectedLeads}
                    </span>
                  </div>
                  <div className="p-2 rounded border border-border bg-card flex justify-between">
                    <span className="text-muted-foreground">
                      Response pack status
                    </span>
                    <span
                      className={`font-medium ${pendingPacks.length > 0 ? "text-amber-400" : "text-green-400"}`}
                    >
                      {pendingPacks.length > 0 ? "Ready to deploy" : "Deployed"}
                    </span>
                  </div>
                </div>
                <ConfidenceScore score={89} label="Strategy Confidence" />
              </PanelSection>
            </>
          ) : (
            <PanelSection title="Select a signal">
              <p className="text-sm text-muted-foreground">
                Click a competitor card or signal row to see strategic analysis.
              </p>
            </PanelSection>
          )}
        </RightPanel>
      </div>
    </div>
  );
}
