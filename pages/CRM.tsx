import React, { useState } from "react";
import { useAppStore, LeadStage } from "../store";
import { StatStrip } from "../components/stat-strip";
import {
  RightPanel,
  PanelSection,
} from "../components/right-panel";
import { DiscBars } from "../components/disc-bars";
import {
  Building2,
  Phone,
  ChevronRight,
  ArrowRight,
  LayoutGrid,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STAGES: LeadStage[] = [
  "New",
  "Ready",
  "Contacted",
  "Qualified",
  "Meeting Booked",
  "Opportunity",
  "Won / Lost",
];

export default function CRM() {
  const { leads, updateLeadStage, addLeadToLane, startCall } = useAppStore();
  const { toast } = useToast();

  const [viewMode, setViewMode] = useState<"board" | "table">("board");
  const [focusedLeadId, setFocusedLeadId] = useState<string | null>(null);
  const [savedView, setSavedView] = useState<string | null>(null);
  const [ownerFilter, setOwnerFilter] = useState("All Owners");
  const [scoreFilter, setScoreFilter] = useState("Any Score");

  const focusedLead = leads.find((l) => l.id === focusedLeadId);

  const filteredLeads = React.useMemo(() => {
    let result = leads;
    if (savedView) {
      if (savedView === "High Intent \u2013 No Contact 7d")
        result = result.filter((l) => l.score >= 70 && l.engagement < 50);
      else if (savedView === "Post-Meeting Follow-Ups")
        result = result.filter(
          (l) => l.stage === "Meeting Booked" || l.stage === "Qualified",
        );
      else if (savedView === "Switch Targets (Ghost)")
        result = result.filter((l) =>
          l.currentTools?.some((t) =>
            /repairdesk|workshop software|protractor|workshop wizard/i.test(t),
          ),
        );
    }
    if (scoreFilter === "> 80") result = result.filter(l => l.score > 80);
    else if (scoreFilter === "> 50") result = result.filter(l => l.score > 50);
    return result;
  }, [leads, savedView, ownerFilter, scoreFilter]);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("leadId", id);
  };

  const handleDrop = (e: React.DragEvent, stage: LeadStage) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("leadId");
    if (id) {
      updateLeadStage(id, stage);
      toast({ title: "Lead Updated", description: `Moved to ${stage}` });
    }
  };

  const handleSendToOutbound = () => {
    if (focusedLead) {
      // Find a suitable lane or default to first
      addLeadToLane("lane1", focusedLead.id);
      toast({
        title: "Routed to Outbound",
        description: `${focusedLead.contact} added to Hot Follow-Up lane.`,
      });
    }
  };

  const statItems = [
    { label: "Total Leads", value: leads.length, trend: 12 },
    {
      label: "Ready to Act",
      value: leads.filter((l) => l.stage === "Ready").length,
      trend: 5,
    },
    {
      label: "Meetings Booked",
      value: leads.filter((l) => l.stage === "Meeting Booked").length,
      trend: 2,
    },
    { label: "Avg Conversion Prob.", value: "64%", trend: 4 },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h1 className="page-title">CRM</h1>
          <p className="page-subtitle">
            Leads, relationships, and pipeline intelligence
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-secondary/50 p-1 rounded-md">
            <button
              onClick={() => setViewMode("board")}
              className={`p-1.5 rounded ${viewMode === "board" ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded ${viewMode === "table" ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <Button onClick={() => toast({ title: "Create Lead", description: "Lead creation form would open here." })}>Create Lead</Button>
        </div>
      </div>

      <StatStrip items={statItems} />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Filters */}
        <div className="w-64 flex-shrink-0 border-r border-border bg-card/60 p-4 overflow-y-auto scroll-slim">
          <h3 className="section-label mb-4">
            Saved Views
          </h3>
          <div className="space-y-2 mb-8">
            {[
              "High Intent – No Contact 7d",
              "Post-Meeting Follow-Ups",
              "Switch Targets (Ghost)",
            ].map((view) => (
              <button
                key={view}
                onClick={() => setSavedView(savedView === view ? null : view)}
                className={`w-full text-left text-xs py-1.5 px-3 rounded-md font-medium transition-colors border ${
                  savedView === view
                    ? "bg-primary/10 text-primary border-primary/30"
                    : "bg-secondary/30 text-muted-foreground border-transparent hover:bg-secondary hover:text-foreground"
                }`}
              >
                {view}
                {savedView === view && (
                  <span className="float-right text-[10px] text-primary/70">
                    ✕
                  </span>
                )}
              </button>
            ))}
            {savedView && (
              <div className="text-xs text-muted-foreground pt-1">
                Showing {filteredLeads.length} of {leads.length} leads
              </div>
            )}
          </div>

          <h3 className="section-label mb-4">
            Filters
          </h3>
          <div className="space-y-4">
            <div>
              <label className="section-label mb-2 block">
                Owner
              </label>
              <Select value={ownerFilter} onValueChange={setOwnerFilter}>
                <SelectTrigger className="w-full bg-secondary/50 border-border text-sm h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Owners">All Owners</SelectItem>
                  <SelectItem value="Ironbark">Ironbark</SelectItem>
                  <SelectItem value="Human Team">Human Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="section-label mb-2 block">
                Lead Score
              </label>
              <Select value={scoreFilter} onValueChange={setScoreFilter}>
                <SelectTrigger className="w-full bg-secondary/50 border-border text-sm h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Any Score">Any Score</SelectItem>
                  <SelectItem value="> 80">&gt; 80</SelectItem>
                  <SelectItem value="> 50">&gt; 50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Main Centre */}
        <div className="flex-1 overflow-auto scroll-slim bg-background/50 relative">
          {viewMode === "board" ? (
            <div className="flex gap-4 p-6 h-full min-w-max">
              {STAGES.map((stage) => (
                <div
                  key={stage}
                  className="w-80 flex flex-col h-full bg-secondary/10 rounded-xl border border-border/50"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, stage)}
                >
                  <div className="p-3 border-b border-border/50 flex justify-between items-center bg-card/50 rounded-t-xl">
                    <h3 className="font-medium text-sm text-foreground/80">
                      {stage}
                    </h3>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                      {filteredLeads.filter((l) => l.stage === stage).length}
                    </span>
                  </div>
                  <div className="flex-1 p-3 overflow-y-auto scroll-slim space-y-3">
                    {filteredLeads
                      .filter((l) => l.stage === stage)
                      .map((lead) => (
                        <div
                          key={lead.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, lead.id)}
                          onClick={() => setFocusedLeadId(lead.id)}
                          className={`p-4 bg-card rounded-lg border cursor-pointer hover:border-primary/50 transition-colors shadow-sm ${focusedLeadId === lead.id ? "border-primary ring-1 ring-primary/20" : "border-border"}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-foreground leading-tight">
                              {lead.company}
                            </h4>
                            <span
                              className={`text-xs font-medium px-1.5 py-0.5 rounded ${lead.score >= 80 ? "bg-green-500/10 text-green-500" : "bg-secondary text-muted-foreground"}`}
                            >
                              {lead.score}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground mb-3">
                            {lead.contact} · {lead.role}
                          </div>
                          <div className="flex flex-col gap-1.5 text-xs">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Intent
                              </span>
                              <span
                                className={
                                  lead.intent > 70
                                    ? "text-amber-500"
                                    : "text-foreground"
                                }
                              >
                                {lead.intent}/100
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Next
                              </span>
                              <span className="truncate max-w-[120px] text-right">
                                {lead.nextAction}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6">
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-secondary/50 border-b border-border text-muted-foreground uppercase tracking-wider text-[10px] font-semibold">
                    <tr>
                      <th className="px-4 py-3">Company</th>
                      <th className="px-4 py-3">Contact</th>
                      <th className="px-4 py-3">Score</th>
                      <th className="px-4 py-3">Intent</th>
                      <th className="px-4 py-3">Stage</th>
                      <th className="px-4 py-3">Next Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {filteredLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        onClick={() => setFocusedLeadId(lead.id)}
                        className={`hover:bg-secondary/30 cursor-pointer transition-colors ${focusedLeadId === lead.id ? "bg-primary/5" : ""}`}
                      >
                        <td className="px-4 py-3 font-medium">
                          {lead.company}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {lead.contact}
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
                          <span className="px-2 py-0.5 rounded bg-secondary text-xs">
                            {lead.stage}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground truncate max-w-[150px]">
                          {lead.nextAction}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right Intelligence Panel - 360 Profile */}
        {focusedLead && (
          <RightPanel title="360° Lead Intelligence" className="w-[360px]">
            <div className="mb-6 pb-6 border-b border-border/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded bg-secondary flex items-center justify-center border border-border">
                  <Building2 className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground leading-tight">
                    {focusedLead.company}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {focusedLead.contact} · {focusedLead.role}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className="bg-primary/5 border-primary/20 text-primary"
                >
                  {focusedLead.stage}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-green-500/5 border-green-500/20 text-green-500"
                >
                  Score: {focusedLead.score}
                </Badge>
                {(() => {
                  const health =
                    focusedLead.engagement >= 60 && focusedLead.score >= 70
                      ? {
                          label: "Healthy",
                          cls: "bg-green-500/10 border-green-500/20 text-green-400",
                        }
                      : focusedLead.engagement >= 30
                        ? {
                            label: "Cooling",
                            cls: "bg-amber-500/10 border-amber-500/20 text-amber-400",
                          }
                        : {
                            label: "At Risk",
                            cls: "bg-red-500/10 border-red-500/20 text-red-400",
                          };
                  return (
                    <Badge variant="outline" className={health.cls}>
                      ● {health.label}
                    </Badge>
                  );
                })()}
              </div>
            </div>

            <PanelSection title="Psychological Profile">
              <DiscBars disc={focusedLead.disc} />
              <div className="mt-4 p-3 bg-secondary/30 rounded-lg text-sm text-foreground/80 border border-border/50">
                <div className="font-medium text-foreground mb-1">
                  Persona: {focusedLead.persona} · {focusedLead.disc.blend}
                </div>
                {focusedLead.disc.culturalNotes ||
                  "Adaptation note not available."}
              </div>
            </PanelSection>

            {focusedLead.ghostIntel && (
              <PanelSection title="Ghost Intelligence">
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground text-xs uppercase tracking-wider block mb-1">
                      Current Stack
                    </span>
                    <div className="flex gap-1 flex-wrap">
                      {focusedLead.ghostIntel.tools.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-secondary/50 border border-border/50 text-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  {focusedLead.ghostIntel.switchingSignals.length > 0 && (
                    <div>
                      <span className="text-muted-foreground text-xs uppercase tracking-wider block mb-1 text-amber-500">
                        Switching Signals
                      </span>
                      <ul className="list-disc pl-4 text-amber-500/90 text-xs">
                        {focusedLead.ghostIntel.switchingSignals.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </PanelSection>
            )}

            {focusedLead.compliance && (
              <PanelSection title="Compliance & Reachability">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div
                    className={`p-2 rounded border ${focusedLead.compliance.dncr ? "bg-destructive/10 border-destructive/20 text-destructive" : "bg-green-500/10 border-green-500/20 text-green-500"}`}
                  >
                    <div className="text-xs opacity-80">DNCR Status</div>
                    <div className="font-medium">
                      {focusedLead.compliance.dncr ? "Blocked" : "Clear"}
                    </div>
                  </div>
                  <div className="p-2 rounded border border-border bg-secondary/30">
                    <div className="text-xs text-muted-foreground">
                      Call Window
                    </div>
                    <div className="font-medium">
                      {focusedLead.compliance.window}
                    </div>
                  </div>
                </div>
              </PanelSection>
            )}

            <PanelSection title="Why This Lead">
              <div className="text-sm text-muted-foreground bg-primary/5 p-3 rounded-lg border border-primary/10">
                {focusedLead.whySurfaced}
              </div>
            </PanelSection>

            <PanelSection title="Recommended Action">
              <div className="space-y-2">
                <Button
                  onClick={() => startCall(focusedLead.id)}
                  className="w-full justify-between"
                  variant="default"
                  disabled={focusedLead.compliance?.dncr}
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Start Demo Call
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleSendToOutbound}
                  className="w-full justify-between"
                  variant="outline"
                >
                  Send to Outbound <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </PanelSection>

            <PanelSection title="Activity Timeline">
              <div className="space-y-3">
                {[
                  {
                    actor: "Ironbark",
                    type: "agent",
                    label: "Ghost intel updated",
                    detail: "Workshop Software lapse confirmed",
                    sentiment: "Neutral",
                    sentimentCls: "text-muted-foreground",
                    when: "14m ago",
                  },
                  {
                    actor: focusedLead.contact.split(" ")[0],
                    type: "human",
                    label: "Replied to follow-up email",
                    detail: "Confirmed interest in demo Friday",
                    sentiment: "Positive",
                    sentimentCls: "text-green-400",
                    when: "2h ago",
                  },
                  {
                    actor: "Ironbark",
                    type: "agent",
                    label: "Lead score updated",
                    detail: `Score raised to ${focusedLead.score} — engagement signal detected`,
                    sentiment: "Positive",
                    sentimentCls: "text-green-400",
                    when: "4h ago",
                  },
                  {
                    actor: "You",
                    type: "human",
                    label: "Call completed",
                    detail:
                      "Discussed pricing concerns. Objection: cost vs ROI.",
                    sentiment: "Mixed",
                    sentimentCls: "text-amber-400",
                    when: "1d ago",
                  },
                ].map((ev, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 border ${ev.type === "agent" ? "bg-primary/10 border-primary/20 text-primary" : "bg-secondary border-border text-foreground/70"}`}
                      >
                        {ev.type === "agent"
                          ? "IB"
                          : ev.actor.slice(0, 2).toUpperCase()}
                      </div>
                      {i < 3 && (
                        <div className="w-px flex-1 bg-border/50 mt-1" />
                      )}
                    </div>
                    <div className="pb-3 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-foreground">
                          {ev.label}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${ev.sentimentCls} bg-current/10`}
                          style={{ backgroundColor: "transparent" }}
                        >
                          {ev.sentiment}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {ev.detail}
                      </div>
                      <div className="text-[10px] text-muted-foreground/60 mt-0.5">
                        {ev.actor} · {ev.when}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </PanelSection>
          </RightPanel>
        )}
      </div>
    </div>
  );
}
