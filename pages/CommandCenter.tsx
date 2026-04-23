import React, { useState, useEffect } from "react";
import { useAppStore } from "../store";
import { StatStrip } from "../components/stat-strip";
import {
  RightPanel,
  PanelSection,
  ConfidenceScore,
} from "../components/right-panel";
import {
  ShieldAlert,
  Zap,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Activity,
  ArrowRight,
  Play,
  Clock,
  GitCommit,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export default function CommandCenter() {
  const { stats, responsePacks, approveResponsePack } =
    useAppStore();
  const { toast } = useToast();

  const pendingPacks = responsePacks.filter((rp) => rp.status === "pending");
  const [focusedPackId, setFocusedPackId] = useState<string | null>(
    pendingPacks[0]?.id || null,
  );
  const [activeView, setActiveView] = useState("All Activity");
  const [checkedCommitments, setCheckedCommitments] = useState<Set<number>>(new Set());
  const [minutesAgo, setMinutesAgo] = useState(4);

  useEffect(() => {
    const t = setInterval(() => setMinutesAgo(prev => prev + 1), 60000);
    return () => clearInterval(t);
  }, []);

  const handleApprove = (e: React.MouseEvent, packId: string) => {
    e.stopPropagation();
    const pack = responsePacks.find((rp) => rp.id === packId);
    if (!pack) return;

    approveResponsePack(packId);
    toast({
      title: "Response Pack Approved",
      description: `${pack.leadsAffected} leads moved to ${pack.targetLane} lane.`,
    });

    const remaining = responsePacks.filter(
      (rp) => rp.status === "pending" && rp.id !== packId,
    );
    if (remaining.length > 0) setFocusedPackId(remaining[0].id);
  };

  const statItems = [
    { label: "Actions Ready", value: stats.actionsReady, trend: 1 },
    { label: "Awaiting Approval", value: stats.awaitingApproval, trend: -1 },
    { label: "Calls Completed", value: stats.callsCompleted, trend: 4 },
    { label: "Meetings Booked", value: stats.meetingsBooked },
  ];

  return (
    <div className="flex flex-col h-full">
      <StatStrip items={statItems} />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Rail */}
        <div className="w-64 flex-shrink-0 border-r border-border bg-card/60 flex flex-col p-4 overflow-y-auto scroll-slim">
          <h3 className="section-label mb-4">
            Strategic Priorities
          </h3>
          <div className="space-y-1">
            {[
              { label: "All Activity", count: 24 },
              { label: "High Priority", count: 6 },
              { label: "Today Only", count: 9 },
              { label: "At Risk", count: 2 },
              { label: "Waiting on You", count: 4 },
              { label: "Opportunities", count: 7 },
            ].map((view) => (
              <button
                key={view.label}
                onClick={() => setActiveView(view.label)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex justify-between items-center group ${activeView === view.label ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'}`}
              >
                <span className="text-foreground/80 group-hover:text-foreground">
                  {view.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {view.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Centre */}
        <div className="flex-1 overflow-y-auto scroll-slim p-6 space-y-6">
          <div className="p-6 rounded-xl border border-primary/20 bg-primary/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <h2 className="text-2xl font-semibold mb-2 text-foreground">
              Daily Brief
            </h2>
            <p className="text-foreground/80 leading-relaxed text-lg max-w-3xl">
              RepairDesk raised prices 15% — your switch-target response pack is
              staged and ready. 4 jobs are awaiting customer authorisation worth
              $2,840. Payroll runs Thursday and all timesheets are reconciled.
              Quote approval rate is 7 points below the industry average —
              Ironbark has drafted a 48-hour follow-up sequence.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" /> Strategic Response
                Packs
              </h3>
              <Badge
                variant="outline"
                className="text-amber-500 border-amber-500/20 bg-amber-500/10"
              >
                Action Required
              </Badge>
            </div>

            <div className="grid gap-4">
              <AnimatePresence>
                {pendingPacks.map((pack) => (
                  <motion.div
                    key={pack.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => setFocusedPackId(pack.id)}
                    className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col gap-4 ${focusedPackId === pack.id ? "border-primary bg-card shadow-[0_0_15px_rgba(var(--primary),0.1)]" : "border-border bg-card/50 hover:border-primary/50"}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold mb-1 text-foreground">
                          {pack.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {pack.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm font-medium">
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-muted-foreground">
                            Impact
                          </span>
                          <span>{pack.leadsAffected} Leads</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-muted-foreground">
                            Target
                          </span>
                          <span className="text-primary">
                            {pack.targetLane}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 mt-2 pt-4 border-t border-border/50">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground"
                        onClick={(e) => { e.stopPropagation(); toast({ title: "Modify Pack", description: "Pack editing mode activated." }); }}
                      >
                        Modify
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={(e) => handleApprove(e, pack.id)}
                        className="gap-2"
                      >
                        <Play className="w-4 h-4 fill-current" /> Deploy to
                        Outbound
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {pendingPacks.length === 0 && (
                <div className="p-8 text-center border border-border border-dashed rounded-xl text-muted-foreground">
                  No active response packs requiring approval.
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-border bg-card">
              <h3 className="text-base font-medium mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" /> Competitor Signal
                Feed
              </h3>
              <div className="space-y-3">
                {[
                  {
                    name: "RepairDesk",
                    move: "Raised workshop subscription pricing 15% — effective July 1",
                    when: "4h ago",
                    impact: "High",
                  },
                  {
                    name: "Workshop Wizard",
                    move: "Service outage reported — 3 workshops in your territory affected",
                    when: "1d ago",
                    impact: "High",
                  },
                  {
                    name: "Protractor",
                    move: "New tyre module launched — targeting fleet accounts",
                    when: "2d ago",
                    impact: "Medium",
                  },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-secondary/30 border border-border/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm text-foreground">
                        {c.name}
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          c.impact === "High"
                            ? "text-amber-400 border-amber-500/30 bg-amber-500/10"
                            : "text-muted-foreground"
                        }
                      >
                        {c.impact}
                      </Badge>
                    </div>
                    <div className="text-sm text-foreground/80 mt-1">
                      {c.move}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {c.when}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-xl border border-primary/20 bg-primary/5">
              <h3 className="text-base font-medium mb-4 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-primary" /> Battlecard ·
                RepairDesk
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    When you'll hear it
                  </div>
                  <div className="text-foreground/90">
                    "We already use RepairDesk and it's cheaper."
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Position
                  </div>
                  <div className="text-foreground/90">
                    Lead with the 15% price hike; anchor on price-lock guarantee
                    + faster onboarding.
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Proof points
                  </div>
                  <ul className="list-disc list-inside text-foreground/80 space-y-1">
                    <li>3 customers switched in the last 30 days</li>
                    <li>2.4× faster invoice cycle in head-to-head pilots</li>
                    <li>Native ATO/STP filing — Competitor X bolt-on</li>
                  </ul>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">
                    Last refreshed by Ironbark · 12m ago
                  </span>
                  <Button variant="ghost" size="sm" className="text-primary" onClick={() => toast({ title: "Battlecard", description: "Opening full RepairDesk battlecard." })}>
                    Open full card <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-border bg-card">
              <h3 className="text-base font-medium mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-muted-foreground" /> Top
                Opportunities
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Northside Auto & Tyre", value: 18, prob: 82 },
                  { name: "Sunshine Coast Panel & Paint", value: 14, prob: 74 },
                  { name: "Mornington Mechanical", value: 9, prob: 65 },
                ].map((opp) => (
                  <div
                    key={opp.name}
                    className="p-3 rounded-lg bg-secondary/30 flex justify-between items-center border border-border/50"
                  >
                    <div>
                      <div className="font-medium text-sm text-foreground">
                        {opp.name}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Source: Outbound
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm text-green-400">
                        ${opp.value}k p.a.
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {opp.prob}% prob
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl border border-border bg-card">
              <h3 className="text-base font-medium mb-4 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-500" /> Watch & Risk
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-amber-500 font-medium text-sm">
                    <ShieldAlert className="w-4 h-4" /> Delayed Follow-up
                  </div>
                  <div className="text-sm text-foreground/80">
                    Northside Auto & Tyre — quote follow-up overdue by 48h
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center justify-between mt-1">
                    <span>Suggested Fix: Draft prepared</span>
                    <button className="text-primary hover:underline font-medium" onClick={() => toast({ title: "Fix Applied", description: "Follow-up draft sent to Northside Auto & Tyre." })}>
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Delta Panel */}
          <div className="p-5 rounded-xl border border-border bg-card">
            <h3 className="text-base font-medium mb-4 flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-primary" /> What Changed Since
              Last Session
              <span className="text-xs text-muted-foreground font-normal ml-auto">
                Last session: 9h ago
              </span>
            </h3>
            <div className="space-y-2">
              {[
                {
                  icon: Activity,
                  label: "4 leads moved to Ready state",
                  sub: "Northside Auto, Bayside Automotive, Valley Fleet, Canning Vale",
                  color: "text-green-400",
                  dot: "bg-green-400",
                },
                {
                  icon: ShieldAlert,
                  label: "RepairDesk pricing shift detected",
                  sub: "Response pack auto-staged — awaiting approval",
                  color: "text-amber-400",
                  dot: "bg-amber-400",
                },
                {
                  icon: MessageSquare,
                  label: "3 call transcripts processed",
                  sub: "Ironbark extracted 5 commitments and 2 objection clusters",
                  color: "text-primary",
                  dot: "bg-primary",
                },
                {
                  icon: Calendar,
                  label: "2 meetings booked via Outbound",
                  sub: "Sunshine Coast Panel · Mornington Mechanical — Friday 10am, 2pm",
                  color: "text-green-400",
                  dot: "bg-green-400",
                },
                {
                  icon: Clock,
                  label: "Quote approval rate dropped 7 points",
                  sub: "Industry avg 38%. Ironbark has drafted a 48h follow-up sequence.",
                  color: "text-amber-400",
                  dot: "bg-amber-400",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg bg-secondary/20 border border-border/40"
                  >
                    <div
                      className={`w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 ${item.color}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground">
                        {item.label}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {item.sub}
                      </div>
                    </div>
                    <div
                      className={`w-2 h-2 rounded-full ${item.dot} mt-1.5 shrink-0`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Commitments Panel */}
          <div className="p-5 rounded-xl border border-border bg-card">
            <h3 className="text-base font-medium mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" /> Commitments Extracted
              <span className="text-xs text-muted-foreground font-normal ml-auto">
                From calls, emails &amp; meetings
              </span>
            </h3>
            <div className="space-y-2">
              {[
                {
                  text: "Send updated quote to Brett Kowalski — Northside Auto",
                  source: "Call · 2d ago",
                  due: "Overdue",
                  dueCls: "text-red-400 bg-red-500/10 border-red-500/20",
                },
                {
                  text: "Book workshop walkthrough with Raj Patel — Bayside Automotive",
                  source: "Email · 1d ago",
                  due: "Today",
                  dueCls: "text-amber-400 bg-amber-500/10 border-amber-500/20",
                },
                {
                  text: "Share fleet compliance brief — Canning Vale Fleet",
                  source: "Meeting · yesterday",
                  due: "Tomorrow",
                  dueCls:
                    "text-muted-foreground bg-secondary/30 border-border/50",
                },
                {
                  text: "Confirm parts delivery window — Burson price hike review",
                  source: "System · 2h ago",
                  due: "This week",
                  dueCls:
                    "text-muted-foreground bg-secondary/30 border-border/50",
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20 border border-border/40"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded text-primary accent-primary shrink-0"
                    checked={checkedCommitments.has(i)}
                    onChange={() => setCheckedCommitments(prev => { const s = new Set(prev); s.has(i) ? s.delete(i) : s.add(i); return s; })}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-foreground">{c.text}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {c.source}
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded border ${c.dueCls} shrink-0`}
                  >
                    {c.due}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Intelligence Panel */}
        <RightPanel title="Ironbark Insight">
          <PanelSection title="System State">
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary font-medium text-sm">
                <CheckCircle2 className="w-4 h-4" /> Healthy — Confidence High
              </div>
              <div className="text-sm text-foreground/80 leading-relaxed">
                All lanes active. 4 leads in ready state. One competitor pricing
                shift creates an immediate response window.
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3" /> Trend: Improving
                </span>
                <span>·</span>
                <span>Updated {minutesAgo}m ago</span>
              </div>
            </div>
          </PanelSection>

          <PanelSection title="What Matters Now">
            <div className="space-y-2">
              {[
                {
                  rank: 1,
                  text: "Approve RepairDesk response pack before the 6-week window closes",
                  urgency: "high",
                },
                {
                  rank: 2,
                  text: "Follow up overdue Northside Auto quote — 48h past commitment",
                  urgency: "high",
                },
                {
                  rank: 3,
                  text: "Book walkthrough with Raj Patel at Bayside Automotive",
                  urgency: "medium",
                },
              ].map((item) => (
                <div
                  key={item.rank}
                  className="flex items-start gap-2.5 p-2.5 rounded border border-border/60 bg-secondary/20"
                >
                  <span
                    className={`text-[10px] font-bold rounded px-1.5 py-0.5 shrink-0 mt-0.5 ${item.urgency === "high" ? "bg-amber-500/20 text-amber-400" : "bg-secondary text-muted-foreground"}`}
                  >
                    P{item.rank}
                  </span>
                  <span className="text-sm text-foreground/90 leading-snug">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </PanelSection>

          <PanelSection title="Why It Matters">
            <p className="text-sm text-muted-foreground leading-relaxed">
              RepairDesk's 15% price hike is the strongest switching catalyst in
              12 months. Historical data shows 3 customers switched to you in
              the last 30 days following a similar event. The response pack is
              pre-staged — deploying now captures the switching window before
              RepairDesk issues retention offers.
            </p>
          </PanelSection>

          <PanelSection title="Recommended Moves">
            <div className="space-y-2">
              {[
                {
                  label: "Deploy RepairDesk response pack",
                  type: "primary",
                  detail: "8 leads → Switch Target lane",
                },
                {
                  label: "Draft overdue quote follow-up",
                  type: "secondary",
                  detail: "Northside Auto — Brett Kowalski",
                },
                {
                  label: "Review Canning Vale fleet brief",
                  type: "secondary",
                  detail: "Estimated $18k ARR if approved",
                },
              ].map((move, i) => (
                <button
                  key={i}
                  className={`w-full text-left p-2.5 rounded border text-sm flex items-center justify-between gap-3 transition-colors ${move.type === "primary" ? "border-primary/30 bg-primary/5 hover:bg-primary/10 text-foreground" : "border-border/50 bg-secondary/20 hover:bg-secondary/40 text-foreground/80"}`}
                  onClick={() => toast({ title: "Executing", description: move.label })}
                >
                  <div>
                    <div className="font-medium text-sm">{move.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {move.detail}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </button>
              ))}
            </div>
          </PanelSection>

          <PanelSection title="Watch Signals">
            <div className="space-y-2 text-sm">
              {[
                {
                  signal:
                    "Workshop Wizard outage — 3 territory workshops affected",
                  when: "1d ago",
                  type: "opportunity",
                },
                {
                  signal: "Canning Vale tender window closes Q4",
                  when: "2d ago",
                  type: "opportunity",
                },
                {
                  signal:
                    "Mornington Mechanical going quiet — last contact 6d ago",
                  when: "6d ago",
                  type: "risk",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded border flex gap-2 ${s.type === "opportunity" ? "border-green-500/20 bg-green-500/5" : "border-amber-500/20 bg-amber-500/5"}`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${s.type === "opportunity" ? "bg-green-400" : "bg-amber-400"}`}
                  />
                  <div>
                    <div
                      className={
                        s.type === "opportunity"
                          ? "text-green-400/90"
                          : "text-amber-400/90"
                      }
                    >
                      {s.signal}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {s.when}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PanelSection>

          <PanelSection title="Autonomy Context">
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-green-500/5 border border-green-500/20">
                <span className="text-green-400">
                  Ironbark handles automatically
                </span>
                <span className="text-muted-foreground">
                  Lead scoring · Transcript processing
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-amber-500/5 border border-amber-500/20">
                <span className="text-amber-400">Needs your approval</span>
                <span className="text-muted-foreground">
                  Response packs · Quote sends
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-secondary border border-border/50">
                <span className="text-muted-foreground">Hard block</span>
                <span className="text-muted-foreground">
                  Price changes · Contract edits
                </span>
              </div>
            </div>
            <ConfidenceScore score={88} label="Overall session confidence" />
          </PanelSection>
        </RightPanel>
      </div>
    </div>
  );
}
