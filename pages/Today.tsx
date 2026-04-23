import React, { useState, useEffect } from "react";
import { useAppStore } from "../store";
import { AnimatePresence, motion } from "framer-motion";
import { StatStrip } from "../components/stat-strip";
import { RightPanel, PanelSection } from "../components/right-panel";
import {
  Check,
  CheckCircle2,
  ChevronRight,
  X,
  Edit2,
  Zap,
  Phone,
  DollarSign,
  Car,
  Newspaper,
  ClipboardList,
  MessageSquare,
  Clock,
  AlertTriangle,
  ArrowRight,
  CloudRain,
  ShieldAlert,
  Send,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  MOCK_UNANSWERED_CALLS,
  MOCK_VEHICLES_DUE,
  MOCK_INDUSTRY_FEED,
} from "../lib/mock-industry-feed";
import { MOCK_CASH_FLOW } from "../lib/mock-fin";

const JOBS_AWAITING_AUTH = [
  {
    id: "j1",
    rego: "ABC-123",
    customer: "Brett Kowalski",
    job: "Clutch replacement + gearbox service",
    value: 920,
    waitHours: 4,
  },
  {
    id: "j2",
    rego: "XYZ-789",
    customer: "Wayne Pemberton",
    job: "Engine mount + timing belt",
    value: 780,
    waitHours: 7,
  },
  {
    id: "j3",
    rego: "LMN-456",
    customer: "Craig Hutchinson",
    job: "Wheel bearing (rear left) + alignment",
    value: 640,
    waitHours: 2,
  },
  {
    id: "j4",
    rego: "QRS-012",
    customer: "Raj Patel",
    job: "AC compressor replacement",
    value: 500,
    waitHours: 1,
  },
];

const impactColour: Record<string, string> = {
  High: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  Medium: "text-primary bg-primary/10 border-primary/30",
  Low: "text-muted-foreground bg-secondary border-border",
};

export default function Today() {
  const { preparedActions, stats, approveAction, skipAction } =
    useAppStore();
  const { toast } = useToast();

  const pendingActions = preparedActions.filter((a) => a.status === "pending");
  const [focusedId, setFocusedId] = useState<string | null>(
    pendingActions[0]?.id || null,
  );
  const [callbackExpanded, setCallbackExpanded] = useState<string | null>(null);
  const [authSent, setAuthSent] = useState<Record<string, boolean>>({});
  const [minutesAgo, setMinutesAgo] = useState(6);

  // Simulate live timestamp ticker
  useEffect(() => {
    const t = setInterval(() => setMinutesAgo(prev => prev + 1), 60000);
    return () => clearInterval(t);
  }, []);

  const focusedAction =
    pendingActions.find((a) => a.id === focusedId) || pendingActions[0];

  const handleApprove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    approveAction(id);
    toast({
      title: "Action Approved",
      description: "Ironbark is executing the action.",
    });
    const remaining = preparedActions.filter(
      (a) => a.id !== id && a.status === "pending",
    );
    if (remaining.length > 0) setFocusedId(remaining[0].id);
  };

  const handleSkip = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    skipAction(id);
    const remaining = preparedActions.filter(
      (a) => a.id !== id && a.status === "pending",
    );
    if (remaining.length > 0) setFocusedId(remaining[0].id);
  };

  const statItems = [
    {
      label: "Actions Ready",
      value: stats.actionsReady,
      trend: 12,
      trendLabel: "vs yesterday",
    },
    { label: "Awaiting Approval", value: stats.awaitingApproval, trend: 0 },
    { label: "Calls Completed", value: stats.callsCompleted, trend: 5 },
    {
      label: "Truly Spendable",
      value: `$${(MOCK_CASH_FLOW.trulySpendable / 1000).toFixed(0)}k`,
      trend: 0,
    },
  ];

  const totalJobsValue = JOBS_AWAITING_AUTH.reduce((s, j) => s + j.value, 0);

  return (
    <div className="flex flex-col h-full">
      <StatStrip items={statItems} />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Centre Feed */}
        <div className="flex-1 overflow-y-auto scroll-slim p-6 space-y-8">
          {/* Morning Briefing — Multi-Insight Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Zap className="w-3 h-3 text-primary" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Morning Brief
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground/60">
                Prepared by Ironbark · Updated {minutesAgo} min ago
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Revenue at Risk — Awaiting Auth */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.3 }}
                className="p-4 rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent group hover:border-amber-500/40 transition-all cursor-default"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <ClipboardList className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-[10px] font-medium text-amber-400/70 bg-amber-500/10 px-2 py-0.5 rounded-full">
                    Action Ready
                  </span>
                </div>
                <div className="text-lg font-bold text-foreground tabular-nums">
                  ${totalJobsValue.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  <strong className="text-foreground">4 jobs</strong> awaiting customer authorisation — reminder messages drafted and ready to send.
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-[10px] text-amber-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <Send className="w-3 h-3" /> Send reminders before 3 PM for best approval rate
                </div>
              </motion.div>

              {/* Cash Position */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.3 }}
                className="p-4 rounded-xl border border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent group hover:border-green-500/40 transition-all cursor-default"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-[10px] font-medium text-green-400/70 bg-green-500/10 px-2 py-0.5 rounded-full">
                    On Track
                  </span>
                </div>
                <div className="text-lg font-bold text-foreground tabular-nums">
                  $20,220
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  <strong className="text-foreground">Truly spendable</strong> after provisions. Payroll runs Thursday — super is on track.
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-[10px] text-green-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <TrendingUp className="w-3 h-3" /> $2.4k above 30-day average position
                </div>
              </motion.div>

              {/* Weather Opportunity */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.19, duration: 0.3 }}
                className="p-4 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent group hover:border-primary/40 transition-all cursor-default"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <CloudRain className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-[10px] font-medium text-primary/70 bg-primary/10 px-2 py-0.5 rounded-full">
                    Opportunity
                  </span>
                </div>
                <div className="text-lg font-bold text-foreground">
                  3-Day Rain
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  Forecast from <strong className="text-foreground">Thursday</strong> — a wiper &amp; tyre campaign is pre-built for <strong className="text-foreground">28 overdue customers</strong>.
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-[10px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-3 h-3" /> One tap to launch campaign
                </div>
              </motion.div>

              {/* Competitor Alert */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26, duration: 0.3 }}
                className="p-4 rounded-xl border border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent group hover:border-red-500/40 transition-all cursor-default"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-[10px] font-medium text-red-400/70 bg-red-500/10 px-2 py-0.5 rounded-full">
                    Competitor
                  </span>
                </div>
                <div className="text-lg font-bold text-foreground">
                  +15% Price Hike
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  <strong className="text-foreground">RepairDesk</strong> raised prices this week — a retention message is drafted for your <strong className="text-foreground">top 20 customers</strong>.
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-[10px] text-red-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <Send className="w-3 h-3" /> Review &amp; send retention messages
                </div>
              </motion.div>
            </div>
          </div>

          {/* Unanswered Calls */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Unanswered Calls
              </h2>
              <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                {MOCK_UNANSWERED_CALLS.length} missed
              </span>
            </div>
            <div className="space-y-2">
              {MOCK_UNANSWERED_CALLS.map((call) => (
                <div
                  key={call.id}
                  className="p-4 rounded-xl border border-border bg-card"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm text-foreground">
                        {call.caller}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {call.company} · {call.time}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setCallbackExpanded(
                            callbackExpanded === call.id ? null : call.id,
                          )
                        }
                      >
                        <MessageSquare className="w-3.5 h-3.5 mr-1" /> Callback
                        Draft
                      </Button>
                      <Button size="sm" variant="default" onClick={() => toast({ title: "Dialling", description: `Calling ${call.caller} at ${call.company}…` })}>
                        <Phone className="w-3.5 h-3.5 mr-1" /> Call Now
                      </Button>
                    </div>
                  </div>
                  <AnimatePresence>
                    {callbackExpanded === call.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 p-3 rounded-lg bg-secondary/30 border border-border/50 text-sm text-muted-foreground leading-relaxed"
                      >
                        "{call.callbackDraft}"
                        <div className="mt-2 flex gap-2">
                          <Button
                            size="sm"
                            variant="default"
                            className="text-xs"
                            onClick={() => toast({ title: "SMS Sent", description: `Callback message sent to ${call.caller}.` })}
                          >
                            Send as SMS
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                            onClick={() => toast({ title: "Edit Mode", description: "Draft opened for editing." })}
                          >
                            Edit
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>

          {/* Cash Snapshot */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Cash Snapshot
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl border border-border bg-card">
                <div className="text-xs text-muted-foreground mb-1">
                  Invoiced Today
                </div>
                <div className="text-xl font-semibold text-foreground">
                  $4,200
                </div>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card">
                <div className="text-xs text-muted-foreground mb-1">
                  Overdue
                </div>
                <div className="text-xl font-semibold text-amber-400">
                  ${MOCK_CASH_FLOW.overdue.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  6 of 9 auto-nudge ready
                </div>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card">
                <div className="text-xs text-muted-foreground mb-1">
                  Bank Balance
                </div>
                <div className="text-xl font-semibold text-foreground">
                  ${MOCK_CASH_FLOW.bankBalance.toLocaleString()}
                </div>
              </div>
              <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
                <div className="text-xs text-primary mb-1">Truly Spendable</div>
                <div className="text-xl font-semibold text-foreground">
                  ${MOCK_CASH_FLOW.trulySpendable.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  After provisions
                </div>
              </div>
            </div>
            <div className="mt-2 p-3 rounded-lg border border-border/50 bg-card text-xs text-muted-foreground">
              Payroll run Thursday — $18,400. Super payment due in 4 days —
              $2,280. Both covered by current cash position.
            </div>
          </section>

          {/* Jobs Awaiting Authorisation */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <ClipboardList className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Jobs Awaiting Authorisation
              </h2>
              <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                {JOBS_AWAITING_AUTH.length} jobs · $
                {totalJobsValue.toLocaleString()}
              </span>
            </div>
            <div className="space-y-2">
              {JOBS_AWAITING_AUTH.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                        {job.rego}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {job.customer}
                      </span>
                      {job.waitHours >= 6 && (
                        <span className="flex items-center gap-1 text-xs text-amber-400">
                          <Clock className="w-3 h-3" /> {job.waitHours}h waiting
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {job.job}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-foreground shrink-0">
                    ${job.value.toLocaleString()}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => {
                        setAuthSent((prev) => ({ ...prev, [job.id]: true }));
                        toast({
                          title: "Reminder Sent",
                          description: `Auth reminder sent to ${job.customer}.`,
                        });
                      }}
                      disabled={authSent[job.id]}
                    >
                      {authSent[job.id] ? (
                        <CheckCircle2 className="w-3 h-3 mr-1 text-green-500" />
                      ) : (
                        <MessageSquare className="w-3 h-3 mr-1" />
                      )}
                      {authSent[job.id] ? "Sent" : "Send Reminder"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Vehicles Due for Pickup */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Car className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Vehicles Due for Pickup
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {MOCK_VEHICLES_DUE.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className={`p-4 rounded-xl border bg-card ${vehicle.status === "Ready for Pickup" ? "border-green-500/30" : vehicle.status === "Quality Check" ? "border-primary/30" : "border-border"}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                          {vehicle.rego}
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          {vehicle.make} {vehicle.model}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {vehicle.customer} · {vehicle.jobType}
                      </div>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${
                        vehicle.status === "Ready for Pickup"
                          ? "bg-green-500/20 text-green-400"
                          : vehicle.status === "Quality Check"
                            ? "bg-primary/20 text-primary"
                            : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {vehicle.status}
                    </span>
                  </div>
                  {vehicle.readySince !== "Incoming" && (
                    <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Ready since{" "}
                      {vehicle.readySince}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Prepared Actions Queue */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Prepared Actions
              </h2>
              <span className="ml-auto text-xs text-muted-foreground">
                {pendingActions.length} pending approval
              </span>
            </div>
            <div className="space-y-3">
              <AnimatePresence>
                {pendingActions.map((action) => (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setFocusedId(action.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${focusedId === action.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/30"}`}
                  >
                    <div className="flex gap-4">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${action.impact === "high" ? "bg-amber-500/20 text-amber-500" : "bg-primary/20 text-primary"}`}
                      >
                        <Zap className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-medium px-2 py-0.5 bg-secondary text-secondary-foreground rounded uppercase tracking-wider">
                            {action.source}
                          </span>
                          {action.impact === "high" && (
                            <span className="text-xs font-medium px-2 py-0.5 bg-amber-500/20 text-amber-500 rounded uppercase tracking-wider">
                              High Impact
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-medium text-foreground">
                          {action.title}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Prepared by Ironbark · {action.confidence}% confidence
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={(e) => handleApprove(e, action.id)}
                          className="w-24"
                        >
                          <Check className="w-4 h-4 mr-1" /> Approve
                        </Button>
                        <div className="flex gap-1.5">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => handleSkip(e, action.id)}
                            className="flex-1"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={(e) => { e.stopPropagation(); toast({ title: "Edit Action", description: "Action opened for editing." }); }}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {pendingActions.length === 0 && (
                <div className="p-10 text-center border border-border border-dashed rounded-xl text-muted-foreground flex flex-col items-center">
                  <CheckCircle2 className="w-10 h-10 text-green-500 mb-3" />
                  <div className="text-sm font-medium text-foreground">
                    All caught up
                  </div>
                  <div className="text-xs mt-1">
                    No prepared actions waiting for approval.
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Industry Feed */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Newspaper className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Industry Feed
              </h2>
            </div>
            <div className="space-y-2">
              {MOCK_INDUSTRY_FEED.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border bg-card flex gap-4 ${item.impact === "High" ? "border-amber-500/20" : "border-border"}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded border ${impactColour[item.impact]}`}
                      >
                        {item.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.source} · {item.timestamp}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {item.headline}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {item.detail}
                    </div>
                  </div>
                  {item.actionLabel && (
                    <div className="shrink-0 flex items-start pt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs whitespace-nowrap"
                        onClick={() => toast({ title: "Action Launched", description: `${item.actionLabel} — executing now.` })}
                      >
                        {item.actionLabel}{" "}
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Panel — always visible */}
        <RightPanel>
          <PanelSection title="Today's Prompt Rail">
            <div className="space-y-2">
              {[
                "Why is my parts cost up this week?",
                "Which customers haven't been back in 90 days?",
                "How much did I make in labour vs parts last month?",
                "Which jobs should I follow up today?",
              ].map((q, i) => (
                <button
                  key={i}
                  className="w-full text-left p-3 rounded-lg bg-secondary/40 hover:bg-secondary border border-border/50 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => toast({ title: "Ironbark Thinking…", description: `Analysing: "${q}"` })}
                >
                  {q}
                </button>
              ))}
            </div>
          </PanelSection>

          {focusedAction && (
            <PanelSection title="Focused Action">
              <div className="p-3 rounded-lg bg-card border border-border text-xs text-muted-foreground space-y-2">
                <div className="font-medium text-foreground text-sm">
                  {focusedAction.source}
                </div>
                <div>{focusedAction.title}</div>
                <div className="flex items-center gap-1.5">
                  <span className="text-primary font-medium">
                    {focusedAction.confidence}%
                  </span>{" "}
                  system confidence
                </div>
              </div>
              <Button
                variant="default"
                size="sm"
                className="w-full mt-2"
                onClick={() => {
                  approveAction(focusedAction.id);
                  toast({
                    title: "Action Approved",
                    description: "Ironbark is executing the action.",
                  });
                }}
              >
                <Check className="w-4 h-4 mr-1" /> Approve This Action
              </Button>
            </PanelSection>
          )}

          <PanelSection title="Watchpoints">
            <div className="space-y-2">
              <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/5 text-xs">
                <div className="flex items-center gap-1.5 text-amber-400 font-medium mb-1">
                  <AlertTriangle className="w-3 h-3" /> Quote Conversion
                </div>
                <div className="text-muted-foreground">
                  Quote approval rate is 34% — 7 points below the 41% industry
                  average. Ironbark suggests adding a follow-up call at 48h.
                </div>
              </div>
              <div className="p-3 rounded-lg border border-border bg-card text-xs">
                <div className="flex items-center gap-1.5 text-primary font-medium mb-1">
                  <CheckCircle2 className="w-3 h-3" /> Payroll
                </div>
                <div className="text-muted-foreground">
                  All timesheets reconciled. STP filing scheduled for Thursday.
                  No action required.
                </div>
              </div>
            </div>
          </PanelSection>

          <PanelSection title="Next Recommended">
            <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 text-xs text-muted-foreground leading-relaxed">
              4 job authorisation reminders are drafted and ready. Sending them
              before 3 PM maximises same-day approval rates based on your
              customer response patterns.
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2 justify-between"
              onClick={() => {
                JOBS_AWAITING_AUTH.forEach(j => setAuthSent(prev => ({ ...prev, [j.id]: true })));
                toast({ title: "Reminders Sent", description: `${JOBS_AWAITING_AUTH.length} auth reminders sent.` });
              }}
            >
              Send Auth Reminders <ChevronRight className="w-4 h-4" />
            </Button>
          </PanelSection>
        </RightPanel>
      </div>
    </div>
  );
}
