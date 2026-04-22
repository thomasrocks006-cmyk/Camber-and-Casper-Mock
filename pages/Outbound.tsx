import React, { useState } from "react";
import { useAppStore, OutboundLane } from "../store";
import { StatStrip } from "../components/stat-strip";
import {
  RightPanel,
  PanelSection,
  ConfidenceScore,
} from "../components/right-panel";
import { DiscBars } from "../components/disc-bars";
import { LaneCard } from "../components/lane-card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Play,
  Phone,
  PhoneForwarded,
  Settings2,
  ShieldAlert,
  ChevronDown,
  Calendar,
  Activity,
  CheckCircle2,
  BrainCircuit,
  AlertTriangle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function Outbound() {
  const { outboundLanes, leads, startCall, stats } = useAppStore();
  const { toast } = useToast();

  const [focusedLaneId, setFocusedLaneId] = useState<string | null>(
    outboundLanes[0]?.id || null,
  );
  const [focusedLeadId, setFocusedLeadId] = useState<string | null>(null);
  const [preflightOpen, setPreflightOpen] = useState(false);
  const [selectedExecMode, setSelectedExecMode] = useState<
    | "Manual Only"
    | "Review Each Lane"
    | "Execute Pre-Approved"
    | "Autonomous Within Policy"
  >("Review Each Lane");

  const focusedLane = outboundLanes.find((l) => l.id === focusedLaneId);
  const laneLeads = focusedLane
    ? leads.filter((l) => focusedLane.leadIds.includes(l.id))
    : [];
  const focusedLead = leads.find((l) => l.id === focusedLeadId);

  // Set first lead when lane changes
  React.useEffect(() => {
    if (
      laneLeads.length > 0 &&
      (!focusedLeadId || !laneLeads.find((l) => l.id === focusedLeadId))
    ) {
      setFocusedLeadId(laneLeads[0].id);
    }
  }, [focusedLaneId, laneLeads, focusedLeadId]);

  const handleExecutePlan = () => {
    setPreflightOpen(true);
  };

  const confirmExecution = () => {
    setPreflightOpen(false);
    toast({
      title: "Execution Started",
      description: "Ironbark voice engine engaging.",
    });
    if (laneLeads.length > 0) {
      startCall(laneLeads[0].id);
    }
  };

  const handleCallSingle = (e: React.MouseEvent, leadId: string) => {
    e.stopPropagation();
    startCall(leadId);
  };

  const statItems = [
    {
      label: "Queued Today",
      value: outboundLanes.reduce((acc, l) => acc + l.count, 0),
      trend: 14,
    },
    { label: "In Progress", value: 12 },
    { label: "Meetings Booked", value: stats.meetingsBooked, trend: 2 },
    {
      label: "Compliance Blocked",
      value: 3,
      trend: -1,
      trendLabel: "improved",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h1 className="text-xl font-semibold">Outbound</h1>
          <p className="text-sm text-muted-foreground">
            Execution lanes and live operations
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary/50 border border-border/50 text-sm">
            <Settings2 className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">Policy: Review Each Lane</span>
            <ChevronDown className="w-3 h-3 text-muted-foreground ml-1" />
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-sm text-green-500 font-medium">
            <CheckCircle2 className="w-4 h-4" /> Pre-Flight Clear
          </div>
          <Button
            onClick={handleExecutePlan}
            className="gap-2"
            disabled={!focusedLane || focusedLane.count === 0}
          >
            <Play className="w-4 h-4 fill-current" /> Execute Plan
          </Button>
        </div>
      </div>

      <StatStrip items={statItems} />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Rail - Strategy Lanes */}
        <div className="w-72 flex-shrink-0 border-r border-border bg-card/30 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border/50 bg-secondary/20">
            <h3 className="text-sm font-medium text-foreground">
              Strategy Lanes
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {outboundLanes.map((lane) => (
              <LaneCard
                key={lane.id}
                lane={lane}
                isSelected={focusedLaneId === lane.id}
                onClick={() => setFocusedLaneId(lane.id)}
              />
            ))}
          </div>
        </div>

        {/* Main Centre - Execution Table + Lane Analytics */}
        <div className="flex-1 overflow-auto bg-background/50">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">
                {focusedLane?.name || "Select a Lane"}
              </h2>
              <Badge variant="outline" className="bg-secondary">
                {laneLeads.length} Leads Queued
              </Badge>
            </div>

            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-secondary/50 border-b border-border text-muted-foreground uppercase tracking-wider text-[10px] font-semibold">
                  <tr>
                    <th className="px-4 py-3">Lead</th>
                    <th className="px-4 py-3">Score</th>
                    <th className="px-4 py-3">Intent</th>
                    <th className="px-4 py-3">DISC</th>
                    <th className="px-4 py-3">Persona</th>
                    <th className="px-4 py-3">Signal Reason</th>
                    <th className="px-4 py-3">Compliance</th>
                    <th className="px-4 py-3">Predicted Outcome</th>
                    <th className="px-4 py-3">Strategy</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {laneLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => setFocusedLeadId(lead.id)}
                      className={`hover:bg-secondary/30 cursor-pointer transition-colors ${focusedLeadId === lead.id ? "bg-primary/5" : ""}`}
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium text-foreground">
                          {lead.company}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {lead.contact}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${lead.score >= 80 ? "bg-green-500/10 text-green-500" : "bg-secondary text-muted-foreground"}`}
                        >
                          {lead.score}
                        </span>
                      </td>
                      <td className="px-4 py-3">{lead.intent}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-mono font-semibold">
                          {lead.disc.primaryType}/
                          {lead.disc.secondaryType ?? "?"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded bg-secondary text-xs">
                          {lead.persona}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        {lead.ghostIntel?.switchingSignals?.[0] ??
                          lead.ghostIntel?.painPoints?.[0] ??
                          "Engagement uplift"}
                      </td>
                      <td className="px-4 py-3 text-xs">
                        {lead.compliance?.dncr ? (
                          <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400">
                            DNCR
                          </span>
                        ) : lead.compliance?.consent ? (
                          <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-500">
                            Consent · {lead.compliance.window}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">
                            Window only
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs">
                        <span
                          className={`px-2 py-0.5 rounded ${lead.score >= 80 ? "bg-green-500/10 text-green-500" : lead.score >= 65 ? "bg-amber-500/10 text-amber-400" : "bg-secondary text-muted-foreground"}`}
                        >
                          {lead.score >= 80
                            ? "Likely meeting"
                            : lead.score >= 65
                              ? "Qualify call"
                              : "Long nurture"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        {focusedLane?.strategy}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleCallSingle(e, lead.id)}
                          className="h-8 px-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
                        >
                          <Phone className="w-4 h-4 mr-1.5" /> Call
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {laneLeads.length === 0 && (
                    <tr>
                      <td
                        colSpan={10}
                        className="px-4 py-8 text-center text-muted-foreground italic"
                      >
                        No leads in this lane.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Lane Analytics Panel */}
            {focusedLane && (
              <div className="mt-6 p-5 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold text-foreground">
                    Lane Analytics
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-secondary/30 border border-border/50">
                    <div className="text-xs text-muted-foreground mb-1">
                      Booking Rate
                    </div>
                    <div className="text-xl font-semibold text-foreground">
                      {focusedLane.bookingRate}%
                    </div>
                    <div className="text-xs text-green-400 mt-0.5">
                      +3% vs last week
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/30 border border-border/50">
                    <div className="text-xs text-muted-foreground mb-1">
                      Pipeline Value
                    </div>
                    <div className="text-xl font-semibold text-foreground">
                      ${(focusedLane.valueAud / 1000).toFixed(1)}k
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Est. this lane
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/30 border border-border/50">
                    <div className="text-xs text-muted-foreground mb-1">
                      Avg Contact Attempt
                    </div>
                    <div className="text-xl font-semibold text-foreground">
                      2.3x
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Optimal: &lt;4x
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/30 border border-border/50">
                    <div className="text-xs text-muted-foreground mb-1">
                      Velocity
                    </div>
                    <div className="text-xl font-semibold text-foreground">
                      4.2d
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Avg lead-to-meeting
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    Strategy:{" "}
                    <span className="text-foreground font-medium">
                      {focusedLane.strategy}
                    </span>
                  </span>
                  <span className="mx-2">·</span>
                  <span>
                    State:{" "}
                    <span
                      className={`font-medium ${focusedLane.state === "Pre-Approved" ? "text-green-400" : focusedLane.state === "Active" ? "text-primary" : focusedLane.state === "Blocked" ? "text-destructive" : "text-amber-400"}`}
                    >
                      {focusedLane.state}
                    </span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Psychologist Tactical Layer */}
        {focusedLead && (
          <RightPanel title="Psychologist Layer" className="w-[340px]">
            <PanelSection title="Target Profile">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center font-bold text-sm text-muted-foreground border border-border">
                  {focusedLead.company.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-foreground">
                    {focusedLead.contact}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {focusedLead.role} · {focusedLead.company}
                  </div>
                </div>
              </div>
              <DiscBars disc={focusedLead.disc} />
              <div className="mt-3 p-2 rounded bg-secondary/30 border border-border/50 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  {focusedLead.disc.blend} — {focusedLead.persona}.
                </span>{" "}
                {focusedLead.disc.culturalNotes ??
                  "Approach with direct, results-focused communication."}
              </div>
            </PanelSection>

            <PanelSection title="Recommended Opener">
              <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm text-foreground/90 leading-relaxed italic">
                "{focusedLead.recommendedOpener}"
              </div>
              <div className="mt-1.5 text-xs text-muted-foreground flex items-center gap-1">
                <BrainCircuit className="w-3 h-3 text-primary" /> Prepared by
                Ironbark based on DISC profile
              </div>
            </PanelSection>

            <PanelSection title="Key Pain Points">
              <div className="space-y-1.5">
                {focusedLead.keyPainPoints.map((pain, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{pain}</span>
                  </div>
                ))}
              </div>
            </PanelSection>

            <PanelSection title="Objection Forecast">
              <div className="space-y-3">
                <div className="p-3 rounded border border-border bg-card text-sm">
                  <div className="text-xs font-medium text-amber-500 mb-1">
                    Likely Objection
                  </div>
                  <div className="text-foreground/80 mb-2">
                    "We're locked into our current system for now."
                  </div>
                  <div className="text-xs font-medium text-green-500 mb-1 border-t border-border/50 pt-2">
                    Counter-Response
                  </div>
                  <div className="text-muted-foreground">
                    Acknowledge the timing, then pivot to a 10-minute "parallel
                    setup" demo — no migration needed to start. Ask what's their
                    next renewal window.
                  </div>
                </div>
              </div>
            </PanelSection>

            <PanelSection title="Compliance State">
              <div className="flex items-center gap-2 text-sm mb-3">
                <ShieldAlert
                  className={`w-4 h-4 ${focusedLead.compliance?.dncr ? "text-destructive" : "text-green-500"}`}
                />
                <span
                  className={
                    focusedLead.compliance?.dncr
                      ? "text-destructive font-medium"
                      : "text-foreground"
                  }
                >
                  {focusedLead.compliance?.dncr
                    ? "Blocked (DNCR)"
                    : `Clear to call · ${focusedLead.compliance?.window ?? "Anytime"}`}
                </span>
              </div>
              <Button
                onClick={(e) =>
                  handleCallSingle(
                    e as unknown as React.MouseEvent,
                    focusedLead.id,
                  )
                }
                className="w-full gap-2"
                disabled={focusedLead.compliance?.dncr}
                variant="default"
              >
                <Phone className="w-4 h-4" /> Start Demo Call
              </Button>
            </PanelSection>
          </RightPanel>
        )}
      </div>

      <Dialog open={preflightOpen} onOpenChange={setPreflightOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Execute Plan — Pre-Flight</DialogTitle>
            <DialogDescription>
              Review execution details and select the autonomy mode before
              engaging Ironbark.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50 border border-border">
                <span className="text-sm font-medium">Target Lane</span>
                <span className="text-sm text-primary font-semibold">
                  {focusedLane?.name}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50 border border-border">
                <span className="text-sm font-medium">Leads Queued</span>
                <span className="text-sm font-semibold">
                  {laneLeads.length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50 border border-border">
                <span className="text-sm font-medium">Compliance Check</span>
                <span className="text-sm font-semibold text-green-500 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> All Passed
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50 border border-border">
                <span className="text-sm font-medium">Booking Rate Est.</span>
                <span className="text-sm font-semibold text-primary">
                  {focusedLane?.bookingRate ?? 0}%
                </span>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-foreground mb-3">
                Execution Mode
              </div>
              <div className="space-y-2">
                {(
                  [
                    {
                      mode: "Manual Only",
                      desc: "Ironbark prepares everything — you make every call yourself.",
                      icon: "🕹",
                    },
                    {
                      mode: "Review Each Lane",
                      desc: "Ironbark queues calls; you approve each before it dials.",
                      icon: "👀",
                    },
                    {
                      mode: "Execute Pre-Approved",
                      desc: "Ironbark dials all pre-approved leads without further prompts.",
                      icon: "⚡",
                    },
                    {
                      mode: "Autonomous Within Policy",
                      desc: "Ironbark executes the full lane autonomously within compliance bounds.",
                      icon: "🤖",
                    },
                  ] as const
                ).map(({ mode, desc, icon }) => (
                  <button
                    key={mode}
                    onClick={() => setSelectedExecMode(mode)}
                    className={`w-full text-left p-3 rounded-lg border transition-all flex items-start gap-3 ${selectedExecMode === mode ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/30"}`}
                  >
                    <span className="text-base mt-0.5">{icon}</span>
                    <div>
                      <div
                        className={`text-sm font-medium ${selectedExecMode === mode ? "text-primary" : "text-foreground"}`}
                      >
                        {mode}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {desc}
                      </div>
                    </div>
                    {selectedExecMode === mode && (
                      <CheckCircle2 className="w-4 h-4 text-primary ml-auto mt-0.5 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="outline" onClick={() => setPreflightOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={confirmExecution}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <PhoneForwarded className="w-4 h-4" /> Engage Ironbark
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
