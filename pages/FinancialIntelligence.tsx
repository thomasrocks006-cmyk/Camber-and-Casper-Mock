import React, { useState, useEffect } from "react";
import { ThreeLayer } from "@/components/three-layer";
import {
  RightPanel,
  PanelSection,
  ConfidenceScore,
} from "@/components/right-panel";
import { StatStrip } from "@/components/stat-strip";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  MOCK_REVENUE_PULSE,
  MOCK_PIPELINE_STAGES,
  MOCK_FORECAST,
  MOCK_CASH_FLOW,
  MOCK_ATTRIBUTION,
  MOCK_SILICON_CFO,
  MOCK_INVOICE_MATCH,
} from "@/lib/mock-fin";
import {
  TrendingUp,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Layers,
  Brain,
  Shield,
  Target,
  GitBranch,
  Gauge,
  Lock,
  Eye,
} from "lucide-react";
import { useAppStore } from "../store";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const fmtMoney = (n: number) => `$${n.toLocaleString()}`;

// ─── Model registry — institutional-grade engines powering this view ───
const MODELS = [
  { id: "ts-decomp", name: "TS-Decomposition", type: "Forecast", version: "v3.2", status: "live" as const },
  { id: "monte-carlo", name: "Monte Carlo", type: "Scenario", version: "v2.1", status: "live" as const },
  { id: "benfords", name: "Benford's Law", type: "Anomaly", version: "v1.4", status: "live" as const },
  { id: "bayesian-ar", name: "Bayesian AR", type: "Cash Flow", version: "v2.8", status: "live" as const },
  { id: "var-cvar", name: "VaR / CVaR", type: "Risk", version: "v1.9", status: "live" as const },
  { id: "cohort-ltv", name: "Cohort LTV", type: "Attribution", version: "v2.0", status: "live" as const },
  { id: "kelly-sizing", name: "Kelly Criterion", type: "Allocation", version: "v1.1", status: "warm" as const },
];

// ─── Synthetic time-series for sparklines ───
const DAILY_REVENUE = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  revenue: Math.round(2200 + Math.sin(i * 0.5) * 800 + (i % 3) * 200),
  forecast: Math.round(2400 + Math.sin(i * 0.5) * 600),
}));

const CASH_FLOW_SERIES = Array.from({ length: 14 }, (_, i) => ({
  day: `Apr ${i + 10}`,
  inflow: Math.round(2800 + (i % 4) * 300),
  net: Math.round(600 + (i % 5) * 160),
}));

// ─── Model layer badge component ───
function ModelBadge({ model, variant = "default" }: { model: string; variant?: "default" | "compact" }) {
  const entry = MODELS.find((m) => m.name === model || m.id === model);
  if (!entry) return null;
  if (variant === "compact") {
    return (
      <span className="inline-flex items-center gap-1 text-[9px] font-mono text-muted-foreground/60 bg-secondary/40 px-1.5 py-0.5 rounded border border-border/30">
        <Activity className="w-2.5 h-2.5" /> {entry.name}
      </span>
    );
  }
  return (
    <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground bg-secondary/40 px-2 py-1 rounded-md border border-border/30">
      <div className={`w-1.5 h-1.5 rounded-full ${entry.status === "live" ? "bg-green-500 animate-pulse" : "bg-amber-500"}`} />
      <span className="text-foreground/70 font-medium">{entry.name}</span>
      <span className="text-muted-foreground/50">{entry.version}</span>
    </div>
  );
}

// ─── Data provenance strip ───
function ProvenanceStrip({ sources, confidence, model }: { sources: string[]; confidence: number; model?: string }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-secondary/20 border border-border/30 mt-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-[9px] text-muted-foreground/50 uppercase tracking-wider font-semibold">
          <Layers className="w-3 h-3" /> Data Layers
        </div>
        <div className="flex items-center gap-1.5">
          {sources.map((s) => (
            <span key={s} className="text-[9px] px-1.5 py-0.5 rounded bg-secondary/60 text-muted-foreground/70 border border-border/20">{s}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {model && <ModelBadge model={model} variant="compact" />}
        <span className={`text-[10px] font-mono font-semibold tabular-nums ${confidence >= 80 ? "text-green-400" : confidence >= 60 ? "text-amber-400" : "text-red-400"}`}>
          {confidence}% conf
        </span>
      </div>
    </div>
  );
}

export default function FinancialIntelligence() {
  const [activeTab, setActiveTab] = useState("Revenue Pulse");
  const _stats = useAppStore((s) => s.stats);
  const { toast } = useToast();
  const [modelPanelOpen, setModelPanelOpen] = useState(false);

  // Simulate live data refresh tick
  const [_liveRefresh, setLiveRefresh] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setLiveRefresh((p) => p + 1), 8000);
    return () => clearInterval(t);
  }, []);

  const statItems = [
    { label: "Invoiced Today", value: `$${(MOCK_REVENUE_PULSE.today / 1000).toFixed(1)}k`, trend: 8 },
    { label: "Invoiced Week", value: `$${(MOCK_REVENUE_PULSE.week / 1000).toFixed(1)}k`, trend: 5 },
    { label: "This Month", value: `$${(MOCK_REVENUE_PULSE.month / 1000).toFixed(0)}k`, trend: 12 },
    { label: "Truly Spendable", value: fmtMoney(MOCK_SILICON_CFO.trulySpendable) },
    { label: "Overdue", value: `$${(MOCK_CASH_FLOW.overdue / 1000).toFixed(1)}k`, trend: -3 },
    { label: "Model Confidence", value: `${MOCK_FORECAST.confidence}%` },
  ];

  const leftNav = [
    "Revenue Pulse",
    "Pipeline",
    "Forecasts",
    "Risk",
    "Unit Economics",
    "Attribution",
    "Scenario Engine",
    "Capital Allocation",
    "Collections / Cash Flow",
  ];

  const leftRail = (
    <div className="flex flex-col h-full">
      <div className="space-y-0.5 flex-1">
        {leftNav.map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === item ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Model stack — always visible in left rail */}
      <div className="border-t border-border/50 pt-3 mt-3">
        <button
          onClick={() => setModelPanelOpen(!modelPanelOpen)}
          className="flex items-center justify-between w-full text-[10px] uppercase tracking-wider font-semibold text-muted-foreground/60 hover:text-muted-foreground transition-colors px-3 py-1"
        >
          <span className="flex items-center gap-1.5">
            <Brain className="w-3 h-3" /> Active Models
          </span>
          <span className="text-[9px] tabular-nums">{MODELS.filter((m) => m.status === "live").length}/{MODELS.length}</span>
        </button>
        {modelPanelOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="overflow-hidden"
          >
            <div className="space-y-1 px-2 pt-2 pb-1">
              {MODELS.map((m) => (
                <div key={m.id} className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-secondary/20 border border-border/20">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${m.status === "live" ? "bg-green-500" : "bg-amber-500"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-medium text-foreground/80 truncate">{m.name}</div>
                    <div className="text-[9px] text-muted-foreground/50">{m.type} · {m.version}</div>
                  </div>
                  <span className={`text-[8px] uppercase font-bold tracking-wider ${m.status === "live" ? "text-green-500" : "text-amber-500"}`}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // TAB: Revenue Pulse
  // ═══════════════════════════════════════════════════════════════
  const revenuePulseContent = (
    <div className="space-y-6">
      <Card className="p-6 border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              Revenue Pulse <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-[10px]">{MOCK_REVENUE_PULSE.acceleration} MTD</Badge>
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">30-day rolling revenue with TS-Decomposition forecast overlay</p>
          </div>
          <div className="flex items-center gap-2">
            <ModelBadge model="TS-Decomposition" />
            <div className="flex items-center gap-1 text-[9px] text-green-400/70 font-mono">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              LIVE
            </div>
          </div>
        </div>

        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DAILY_REVENUE} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(210 55% 52%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(210 55% 52%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fcastGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142 40% 50%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(142 40% 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#475569" fontSize={9} tickLine={false} axisLine={false} />
              <YAxis stroke="#475569" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} width={40} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(222 25% 10%)", borderColor: "hsl(222 15% 20%)", borderRadius: "8px", fontSize: "11px" }} formatter={(v: number) => `$${v.toFixed(0)}`} />
              <Area type="monotone" dataKey="forecast" stroke="hsl(142 40% 50%)" strokeWidth={1} fill="url(#fcastGrad)" strokeDasharray="4 2" dot={false} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(210 55% 52%)" strokeWidth={2} fill="url(#revGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue breakdown — three-tier metric strip */}
        <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-border/30">
          {[
            { label: "Today", value: `$${(MOCK_REVENUE_PULSE.today / 1000).toFixed(1)}k`, sub: "vs $3.8k avg", cls: "text-green-400" },
            { label: "This Week", value: `$${(MOCK_REVENUE_PULSE.week / 1000).toFixed(1)}k`, sub: "vs $16.2k avg", cls: "text-green-400" },
            { label: "This Month", value: `$${(MOCK_REVENUE_PULSE.month / 1000).toFixed(0)}k`, sub: "projected $84k", cls: "text-primary" },
          ].map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-[10px] text-muted-foreground/60 uppercase tracking-wider font-medium mb-1">{m.label}</div>
              <div className={`text-xl font-bold tabular-nums ${m.cls}`}>{m.value}</div>
              <div className="text-[10px] text-muted-foreground/50 mt-0.5">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Revenue mix bar */}
        <div className="mt-4">
          <div className="h-3 w-full bg-secondary rounded-full overflow-hidden flex">
            <div className="bg-primary h-full transition-all duration-700" style={{ width: `${MOCK_REVENUE_PULSE.split.labour}%` }} />
            <div className="bg-blue-400/70 h-full" style={{ width: `${MOCK_REVENUE_PULSE.split.parts}%` }} />
            <div className="bg-slate-500/50 h-full" style={{ width: `${MOCK_REVENUE_PULSE.split.other}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground/60 mt-1.5 px-0.5">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-primary inline-block" /> Labour {MOCK_REVENUE_PULSE.split.labour}%</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-blue-400/70 inline-block" /> Parts {MOCK_REVENUE_PULSE.split.parts}%</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-slate-500/50 inline-block" /> Other {MOCK_REVENUE_PULSE.split.other}%</span>
          </div>
        </div>

        <ProvenanceStrip sources={["Xero GL", "JobTrack", "POS"]} confidence={94} model="TS-Decomposition" />
      </Card>

      {/* Two-column: Pipeline + Revenue Mix */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            Job Pipeline <ModelBadge model="Bayesian AR" variant="compact" />
          </h3>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_PIPELINE_STAGES} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 10 }} width={120} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(222 25% 10%)", borderColor: "hsl(222 15% 20%)", borderRadius: "8px" }} itemStyle={{ color: "#fff" }} formatter={(val: number) => `$${(val / 1000).toFixed(1)}k`} />
                <Bar dataKey="value" fill="hsl(210 55% 52%)" radius={[0, 4, 4, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            Revenue Mix <ModelBadge model="Cohort LTV" variant="compact" />
          </h3>
          <div className="h-[180px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MOCK_ATTRIBUTION} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={3} dataKey="value" strokeWidth={0}>
                  {MOCK_ATTRIBUTION.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={["hsl(210 55% 52%)", "hsl(210 55% 68%)", "hsl(222 15% 40%)"][index % 3]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "hsl(222 25% 10%)", borderColor: "hsl(222 15% 20%)", borderRadius: "8px" }} itemStyle={{ color: "#fff" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // TAB: Collections / Cash Flow — Silicon CFO
  // ═══════════════════════════════════════════════════════════════
  const cashFlowContent = (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-semibold flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" /> Silicon CFO — Truly Spendable Cash
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Waterfall decomposition with Bayesian auto-regressive cash flow model</p>
          </div>
          <div className="flex items-center gap-2">
            <ModelBadge model="Bayesian AR" />
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[10px]">Prepared by Ironbark</Badge>
          </div>
        </div>

        {/* Cash flow sparkline */}
        <div className="h-[120px] w-full mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CASH_FLOW_SERIES} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142 40% 50%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(142 40% 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#475569" fontSize={9} tickLine={false} axisLine={false} />
              <YAxis stroke="#475569" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} width={35} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(222 25% 10%)", borderColor: "hsl(222 15% 20%)", borderRadius: "8px", fontSize: "11px" }} formatter={(v: number) => `$${v.toFixed(0)}`} />
              <Area type="monotone" dataKey="inflow" stroke="hsl(142 40% 50%)" strokeWidth={1.5} fill="url(#inflowGrad)" dot={false} />
              <Area type="monotone" dataKey="net" stroke="hsl(210 55% 52%)" strokeWidth={1.5} fill="none" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Waterfall breakdown */}
        <div className="space-y-0 font-mono text-sm">
          {[
            { label: "Bank Balance", value: fmtMoney(MOCK_SILICON_CFO.bankBalance), cls: "text-foreground", sign: "" },
            { label: "− Outstanding Payables", value: fmtMoney(MOCK_SILICON_CFO.outstandingPayables), cls: "text-red-400", sign: "−" },
            { label: "− Super Provision", value: fmtMoney(MOCK_SILICON_CFO.superProvision), cls: "text-red-400", sign: "−" },
            { label: "− Tax Provision (GST)", value: fmtMoney(MOCK_SILICON_CFO.taxProvision), cls: "text-red-400", sign: "−" },
            { label: "− Safety Buffer (2 weeks)", value: fmtMoney(MOCK_SILICON_CFO.safetyBuffer), cls: "text-amber-400", sign: "−" },
          ].map((row, i) => (
            <div key={i} className="flex justify-between py-2 border-b border-border/20 last:border-0 hover:bg-secondary/10 transition-colors px-2 rounded">
              <span className="text-muted-foreground">{row.label}</span>
              <span className={row.cls}>{row.sign}{row.value}</span>
            </div>
          ))}
          <div className="flex justify-between py-3 mt-1 bg-primary/10 rounded-lg px-3 border border-primary/20">
            <span className="font-bold text-foreground text-base">TRULY SPENDABLE CASH</span>
            <span className="font-bold text-primary text-base">{fmtMoney(MOCK_SILICON_CFO.trulySpendable)}</span>
          </div>
        </div>

        <ProvenanceStrip sources={["Xero GL", "ATO BAS", "Payroll", "SuperStream"]} confidence={91} model="Bayesian AR" />

        {/* Hiring scenario */}
        <div className="mt-6 pt-5 border-t border-border/50">
          <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg border border-border/40">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Brain className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-semibold mb-1 flex items-center gap-2">
                Ironbark Scenario Analysis <ModelBadge model="Monte Carlo" variant="compact" />
              </div>
              <div className="font-medium text-sm mb-1">&quot;{MOCK_SILICON_CFO.hiringScenario.question}&quot;</div>
              <div className="text-sm text-muted-foreground leading-relaxed mb-3">{MOCK_SILICON_CFO.hiringScenario.answer}</div>
              <div className="space-y-1">
                {MOCK_SILICON_CFO.hiringScenario.conditions.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
              <Badge className="mt-3 bg-green-500/10 text-green-500 border-green-500/20 border" variant="outline">
                {MOCK_SILICON_CFO.hiringScenario.verdict}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Match Engine */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Eye className="w-4 h-4 text-amber-400" /> Match Engine — Invoice Variance Detection
          </h3>
          <ModelBadge model="Benford's Law" />
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] text-muted-foreground uppercase border-b border-border/40 tracking-wider">
              <th className="text-left py-2 font-semibold">Document</th>
              <th className="text-right py-2 font-semibold">Qty</th>
              <th className="text-right py-2 font-semibold">Unit Price</th>
              <th className="text-right py-2 font-semibold">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20 font-mono">
            <tr className="hover:bg-secondary/10 transition-colors">
              <td className="py-2.5 text-muted-foreground">Purchase Order</td>
              <td className="text-right tabular-nums">{MOCK_INVOICE_MATCH.po.qty}</td>
              <td className="text-right tabular-nums">${MOCK_INVOICE_MATCH.po.unitPrice.toFixed(2)}</td>
              <td className="text-right tabular-nums">${MOCK_INVOICE_MATCH.po.total.toFixed(2)}</td>
            </tr>
            <tr className="hover:bg-secondary/10 transition-colors">
              <td className="py-2.5 text-muted-foreground">Goods Receipt</td>
              <td className="text-right tabular-nums">{MOCK_INVOICE_MATCH.receipt.qty}</td>
              <td className="text-right tabular-nums">${MOCK_INVOICE_MATCH.receipt.unitPrice.toFixed(2)}</td>
              <td className="text-right tabular-nums">${MOCK_INVOICE_MATCH.receipt.total.toFixed(2)}</td>
            </tr>
            <tr className="text-amber-400 hover:bg-amber-500/5 transition-colors">
              <td className="py-2.5 font-medium">Supplier Invoice</td>
              <td className="text-right tabular-nums">{MOCK_INVOICE_MATCH.invoice.qty}</td>
              <td className="text-right tabular-nums">${MOCK_INVOICE_MATCH.invoice.unitPrice.toFixed(2)}</td>
              <td className="text-right tabular-nums">${MOCK_INVOICE_MATCH.invoice.total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4 flex items-center justify-between p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
          <div className="flex items-center gap-2 text-sm text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            <span>Variance: +${MOCK_INVOICE_MATCH.variance.total} (+{MOCK_INVOICE_MATCH.variance.pct}%)</span>
            {MOCK_INVOICE_MATCH.benfordsAnomaly && (
              <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20 text-[10px]">Benford&apos;s Anomaly</Badge>
            )}
          </div>
          <Button size="sm" variant="outline" className="text-xs" onClick={() => toast({ title: "Invoice Held", description: "Invoice held for manual approval review." })}>
            HOLD for Approval
          </Button>
        </div>
        <ProvenanceStrip sources={["PO System", "GR Note", "Supplier PDF"]} confidence={87} model="Benford's Law" />
      </Card>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // TAB: Forecasts
  // ═══════════════════════════════════════════════════════════════
  const forecastContent = (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold">Monthly Forecast Engine</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">10,000-run Monte Carlo simulation with Bayesian priors</p>
          </div>
          <div className="flex items-center gap-2">
            <ModelBadge model="Monte Carlo" />
            <ModelBadge model="TS-Decomposition" />
          </div>
        </div>

        <div className="space-y-3 mb-5">
          {[
            { label: "P90 — Best Case", value: MOCK_FORECAST.best, pct: "90th", cls: "border-green-500/20 bg-green-500/5", txtCls: "text-green-400", barW: 100 },
            { label: "P50 — Base Case", value: MOCK_FORECAST.base, pct: "50th", cls: "border-primary/30 bg-primary/10", txtCls: "text-primary", barW: 88 },
            { label: "P10 — Worst Case", value: MOCK_FORECAST.worst, pct: "10th", cls: "border-border bg-secondary/30", txtCls: "text-muted-foreground", barW: 74 },
          ].map((band) => (
            <div key={band.label} className={`p-4 rounded-lg border ${band.cls}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{band.label}</span>
                <span className={`text-lg font-bold tabular-nums ${band.txtCls}`}>${(band.value / 1000).toFixed(0)}k</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${band.txtCls === "text-green-400" ? "bg-green-500/60" : band.txtCls === "text-primary" ? "bg-primary" : "bg-muted-foreground/40"} transition-all duration-1000`} style={{ width: `${band.barW}%` }} />
              </div>
              <div className="text-[10px] text-muted-foreground/50 mt-1 text-right">{band.pct} percentile</div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border/30">
          <div className="flex items-center gap-2 mb-3">
            <GitBranch className="w-3.5 h-3.5 text-muted-foreground/50" />
            <h4 className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider">Key Assumptions</h4>
          </div>
          <ul className="text-sm text-foreground/70 space-y-1.5">
            {MOCK_FORECAST.assumptions.map((a, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-muted-foreground/40 text-xs mt-0.5">&bull;</span>
                <span className="leading-relaxed">{a}</span>
              </li>
            ))}
          </ul>
        </div>

        <ProvenanceStrip sources={["TS-Decomp", "Industry Bench", "Xero GL"]} confidence={MOCK_FORECAST.confidence} model="Monte Carlo" />
      </Card>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // TAB: Pipeline
  // ═══════════════════════════════════════════════════════════════
  const pipelineContent = (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold">Pipeline by Stage</h3>
          <ModelBadge model="Bayesian AR" />
        </div>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_PIPELINE_STAGES} layout="vertical">
              <XAxis type="number" tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="stage" stroke="#94a3b8" fontSize={11} width={140} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(222 25% 10%)", borderColor: "hsl(222 15% 20%)", borderRadius: "8px" }} formatter={(v: number) => `$${v.toLocaleString()}`} />
              <Bar dataKey="value" fill="hsl(210 55% 52%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <ProvenanceStrip sources={["JobTrack", "CRM"]} confidence={89} model="Bayesian AR" />
      </Card>
      <div className="grid grid-cols-2 gap-3">
        {MOCK_PIPELINE_STAGES.map((s) => (
          <Card key={s.stage} className="p-4">
            <div className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-1">{s.stage}</div>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-bold tabular-nums">{fmtMoney(s.value)}</span>
              <span className="text-[10px] text-muted-foreground">{s.count} deals · {s.velocity} avg</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // TAB: Risk — VaR / CVaR
  // ═══════════════════════════════════════════════════════════════
  const riskContent = (
    <div className="space-y-6">
      <Card className="p-5 border-red-500/15 bg-red-500/[0.03]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-red-400">
            <Shield className="w-5 h-5" />
            <h3 className="text-base font-semibold">Risk Dashboard</h3>
          </div>
          <ModelBadge model="VaR / CVaR" />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[
            { label: "1-Day VaR (95%)", value: "$2,840", sub: "Max expected daily loss", cls: "text-red-400" },
            { label: "CVaR (99%)", value: "$4,120", sub: "Conditional tail risk", cls: "text-red-400" },
            { label: "Stress Scenario", value: "\u2212$8.2k", sub: "3-sigma shock event", cls: "text-red-400/60" },
          ].map((m) => (
            <div key={m.label} className="p-3 rounded-lg bg-card border border-border/40 text-center">
              <div className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-1">{m.label}</div>
              <div className={`text-lg font-bold tabular-nums ${m.cls}`}>{m.value}</div>
              <div className="text-[9px] text-muted-foreground/40 mt-0.5">{m.sub}</div>
            </div>
          ))}
        </div>
        <ProvenanceStrip sources={["GL History", "Market Data", "AR Aging"]} confidence={82} model="VaR / CVaR" />
      </Card>

      <Card className="p-6 border-amber-500/20 bg-amber-500/[0.03]">
        <div className="flex items-center gap-2 text-amber-400 mb-4">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="text-base font-semibold">Active Risk Signals</h3>
          <Badge variant="outline" className="ml-auto text-[10px] bg-amber-500/10 text-amber-400 border-amber-500/20">4 active</Badge>
        </div>
        <div className="space-y-3">
          {[
            { title: "Invoice Variance Anomaly", desc: `${MOCK_INVOICE_MATCH.supplier} — ${MOCK_INVOICE_MATCH.variance.pct}% variance on ${MOCK_INVOICE_MATCH.invoiceNumber}. Benford's Law flagged.`, severity: "High", action: "Review invoice", model: "Benford's Law" },
            { title: "Overdue Receivables Growing", desc: `$${(MOCK_CASH_FLOW.overdue / 1000).toFixed(1)}k overdue across 6 accounts — 23% increase from last month.`, severity: "Medium", action: "Send reminders", model: "Bayesian AR" },
            { title: "Parts Cost Inflation", desc: "Burson parts +14% QoQ. 3 upcoming jobs affected — margin compression risk.", severity: "Medium", action: "Review pricing", model: "TS-Decomposition" },
            { title: "Super Guarantee Due", desc: `$${MOCK_SILICON_CFO.superProvision.toLocaleString()} due in 4 days. Penalty applies if late.`, severity: "High", action: "Schedule payment", model: "Bayesian AR" },
          ].map((risk, i) => (
            <div key={i} className="p-4 rounded-lg bg-card border border-border/40 hover:bg-secondary/10 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-foreground">{risk.title}</span>
                <div className="flex items-center gap-2">
                  <ModelBadge model={risk.model} variant="compact" />
                  <Badge variant="outline" className={risk.severity === "High" ? "text-red-400 border-red-500/30 bg-red-500/10 text-[10px]" : "text-amber-400 border-amber-500/30 bg-amber-500/10 text-[10px]"}>{risk.severity}</Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{risk.desc}</p>
              <Button variant="outline" size="sm" className="text-xs" onClick={() => toast({ title: risk.action, description: `${risk.title} — action initiated.` })}>{risk.action}</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // TAB: Unit Economics
  // ═══════════════════════════════════════════════════════════════
  const unitEconomicsContent = (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold">Unit Economics</h3>
          <ModelBadge model="Cohort LTV" />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Labour", pct: MOCK_REVENUE_PULSE.split.labour, color: "text-primary", bg: "bg-primary/10 border-primary/20" },
            { label: "Parts", pct: MOCK_REVENUE_PULSE.split.parts, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
            { label: "Other", pct: MOCK_REVENUE_PULSE.split.other, color: "text-muted-foreground", bg: "bg-secondary border-border/50" },
          ].map((item) => (
            <div key={item.label} className={`text-center p-4 rounded-lg ${item.bg} border`}>
              <div className={`text-2xl font-bold tabular-nums ${item.color}`}>{item.pct}%</div>
              <div className="text-[10px] text-muted-foreground/60 mt-1 uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {[
            { metric: "Avg Job Value", value: "$480", benchmark: "$520", status: "below", delta: "\u2212$40" },
            { metric: "Labour Rate / Hour", value: "$135", benchmark: "$125", status: "above", delta: "+$10" },
            { metric: "Parts Margin", value: "22%", benchmark: "28%", status: "below", delta: "\u22126pp" },
            { metric: "Bay Utilisation", value: "78%", benchmark: "82%", status: "below", delta: "\u22124pp" },
            { metric: "Quote Approval Rate", value: "34%", benchmark: "41%", status: "below", delta: "\u22127pp" },
            { metric: "Customer LTV (12mo)", value: "$1,840", benchmark: "$2,100", status: "below", delta: "\u2212$260" },
          ].map((m) => (
            <div key={m.metric} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border/30 text-sm hover:bg-secondary/30 transition-colors">
              <span className="text-foreground/80">{m.metric}</span>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-foreground tabular-nums">{m.value}</span>
                <span className="text-[10px] text-muted-foreground/50">vs {m.benchmark}</span>
                <span className={`text-xs font-mono font-semibold ${m.status === "below" ? "text-amber-400" : "text-green-400"}`}>{m.delta}</span>
              </div>
            </div>
          ))}
        </div>
        <ProvenanceStrip sources={["JobTrack", "Xero GL", "Industry Bench"]} confidence={88} model="Cohort LTV" />
      </Card>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // TAB: Attribution
  // ═══════════════════════════════════════════════════════════════
  const attributionContent = (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold">Revenue Attribution</h3>
          <ModelBadge model="Cohort LTV" />
        </div>
        <div className="flex items-center gap-8">
          <div className="h-[200px] w-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MOCK_ATTRIBUTION} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={45} strokeWidth={0}>
                  {MOCK_ATTRIBUTION.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={["hsl(210 55% 52%)", "hsl(142 40% 45%)", "hsl(222 15% 40%)"][index % 3]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "hsl(222 25% 10%)", borderColor: "hsl(222 15% 20%)", borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2">
            {[
              { source: "Outbound Calls", rev: "$32,400", pct: 42, trend: "+8%" },
              { source: "Inbound Enquiries", rev: "$21,600", pct: 28, trend: "+3%" },
              { source: "Repeat Customers", rev: "$14,200", pct: 19, trend: "\u22122%" },
              { source: "Referrals", rev: "$7,800", pct: 10, trend: "+12%" },
            ].map((s) => (
              <div key={s.source} className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/20 border border-border/30 hover:bg-secondary/30 transition-colors">
                <span className="text-sm text-foreground/80">{s.source}</span>
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-semibold tabular-nums">{s.rev}</span>
                  <span className="text-[10px] text-muted-foreground/50 tabular-nums w-8 text-right">{s.pct}%</span>
                  <span className={`text-[10px] font-mono font-semibold tabular-nums ${s.trend.startsWith("+") ? "text-green-400" : "text-red-400"}`}>{s.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ProvenanceStrip sources={["CRM", "Call Log", "POS"]} confidence={85} model="Cohort LTV" />
      </Card>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // TAB: Scenario Engine
  // ═══════════════════════════════════════════════════════════════
  const scenarioContent = (
    <div className="space-y-6">
      <Card className="p-6 border-primary/20 bg-primary/[0.03]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-primary">
            <Target className="w-5 h-5" />
            <h3 className="text-base font-semibold">Scenario Engine</h3>
          </div>
          <div className="flex items-center gap-2">
            <ModelBadge model="Monte Carlo" />
            <ModelBadge model="Kelly Criterion" />
          </div>
        </div>
        <p className="text-[11px] text-muted-foreground mb-5 leading-relaxed">
          Stress-test business decisions against 10,000 Monte Carlo simulations. Kelly Criterion sizes optimal capital allocation per scenario.
        </p>

        {/* Scenario A: Hiring */}
        <div className="p-4 rounded-lg bg-card border border-border/40 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-primary/70" />
            <span className="text-sm font-semibold">Scenario A: Second Technician Hire</span>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-3">
            {[
              { label: "Break-Even", value: "Week 10", cls: "text-green-400" },
              { label: "12-Mo NPV", value: "+$18.4k", cls: "text-green-400" },
              { label: "P(Success)", value: "78%", cls: "text-primary" },
            ].map((m) => (
              <div key={m.label} className="p-2.5 rounded bg-secondary/30 border border-border/30 text-center">
                <div className="text-[9px] text-muted-foreground/50 uppercase tracking-wider">{m.label}</div>
                <div className={`text-sm font-bold tabular-nums ${m.cls}`}>{m.value}</div>
              </div>
            ))}
          </div>
          <div className="space-y-1">
            {MOCK_SILICON_CFO.hiringScenario.conditions.map((c, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0" /> {c}
              </div>
            ))}
          </div>
          <Badge variant="outline" className="mt-3 bg-green-500/10 text-green-400 border-green-500/20">{MOCK_SILICON_CFO.hiringScenario.verdict}</Badge>
        </div>

        {/* Scenario B: Equipment */}
        <div className="p-4 rounded-lg bg-card border border-border/40 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="w-4 h-4 text-primary/70" />
            <span className="text-sm font-semibold">Scenario B: New Hoist ($28k Capex)</span>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-3">
            {[
              { label: "Payback Period", value: "7.2 months", cls: "text-green-400" },
              { label: "Utilisation Lift", value: "+12%", cls: "text-primary" },
              { label: "IRR", value: "34%", cls: "text-green-400" },
            ].map((m) => (
              <div key={m.label} className="p-2.5 rounded bg-secondary/30 border border-border/30 text-center">
                <div className="text-[9px] text-muted-foreground/50 uppercase tracking-wider">{m.label}</div>
                <div className={`text-sm font-bold tabular-nums ${m.cls}`}>{m.value}</div>
              </div>
            ))}
          </div>
          <div className="text-xs text-muted-foreground leading-relaxed">
            At current bay utilisation (78%), a fourth hoist lifts capacity by 12%. Monte Carlo shows positive NPV in 87% of runs. Kelly sizing recommends allocating no more than 35% of discretionary cash.
          </div>
        </div>

        {/* Scenario C: Price Increase */}
        <div className="p-4 rounded-lg bg-card border border-border/40">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-primary/70" />
            <span className="text-sm font-semibold">Scenario C: 8% Labour Rate Increase</span>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-3">
            {[
              { label: "Revenue Impact", value: "+$6.1k/mo", cls: "text-green-400" },
              { label: "Churn Risk", value: "3.2%", cls: "text-amber-400" },
              { label: "Net Margin Lift", value: "+2.4pp", cls: "text-green-400" },
            ].map((m) => (
              <div key={m.label} className="p-2.5 rounded bg-secondary/30 border border-border/30 text-center">
                <div className="text-[9px] text-muted-foreground/50 uppercase tracking-wider">{m.label}</div>
                <div className={`text-sm font-bold tabular-nums ${m.cls}`}>{m.value}</div>
              </div>
            ))}
          </div>
          <div className="text-xs text-muted-foreground leading-relaxed">
            Industry avg labour rate is $125/hr. Increasing to $146/hr puts you at P75. Competitor analysis: RepairDesk at $140, Sparesbox at $130. Churn probability modelled at 3.2% given current NPS.
          </div>
        </div>

        <ProvenanceStrip sources={["Monte Carlo (10k)", "Kelly Criterion", "Industry Bench"]} confidence={79} model="Monte Carlo" />
      </Card>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // TAB: Capital Allocation
  // ═══════════════════════════════════════════════════════════════
  const capitalContent = (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold">Capital Allocation Matrix</h3>
          <ModelBadge model="Kelly Criterion" />
        </div>
        <p className="text-[11px] text-muted-foreground mb-5 leading-relaxed">
          Kelly Criterion-weighted allocation framework. Each bucket is sized by risk-adjusted expected value to maximise long-run geometric growth rate.
        </p>
        <div className="space-y-3">
          {[
            { bucket: "Operating Reserve", amount: MOCK_CASH_FLOW.bankBalance - MOCK_SILICON_CFO.trulySpendable, note: "Locked for payroll + overheads", pct: 52, risk: "N/A", color: "bg-blue-500/60" },
            { bucket: "Growth Investment", amount: 8000, note: "Marketing + tool trials", pct: 19, risk: "Medium", color: "bg-green-500/60" },
            { bucket: "Debt / Payables", amount: MOCK_SILICON_CFO.outstandingPayables, note: "Due within 30 days", pct: 20, risk: "Low", color: "bg-amber-500/60" },
            { bucket: "Discretionary", amount: MOCK_SILICON_CFO.trulySpendable - 8000, note: "Available for unplanned spend", pct: 9, risk: "High", color: "bg-primary" },
          ].map((b) => (
            <div key={b.bucket} className="p-4 rounded-lg bg-secondary/20 border border-border/30 hover:bg-secondary/30 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm text-foreground">{b.bucket}</span>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-sm text-foreground tabular-nums">{fmtMoney(b.amount)}</span>
                  <Badge variant="outline" className={`text-[9px] ${b.risk === "High" ? "text-red-400 border-red-500/20" : b.risk === "Medium" ? "text-amber-400 border-amber-500/20" : "text-muted-foreground border-border/40"}`}>
                    {b.risk} risk
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-muted-foreground/60">{b.note}</span>
                <span className="text-[10px] text-muted-foreground/50 tabular-nums font-mono">{b.pct}%</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${b.color} transition-all duration-700`} style={{ width: `${b.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
        <ProvenanceStrip sources={["GL Ledger", "Payroll", "Kelly Model"]} confidence={76} model="Kelly Criterion" />
      </Card>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // TAB ROUTER
  // ═══════════════════════════════════════════════════════════════
  const renderCentre = () => {
    switch (activeTab) {
      case "Revenue Pulse": return revenuePulseContent;
      case "Collections / Cash Flow": return cashFlowContent;
      case "Forecasts": return forecastContent;
      case "Pipeline": return pipelineContent;
      case "Risk": return riskContent;
      case "Unit Economics": return unitEconomicsContent;
      case "Attribution": return attributionContent;
      case "Scenario Engine": return scenarioContent;
      case "Capital Allocation": return capitalContent;
      default: return (
        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
          <TrendingUp className="w-12 h-12 mb-4 opacity-20" />
          <p className="font-medium text-foreground/60">{activeTab}</p>
          <p className="text-sm mt-2">This view is being prepared by Ironbark.</p>
        </div>
      );
    }
  };

  const centre = renderCentre();

  // ═══════════════════════════════════════════════════════════════
  // RIGHT PANEL
  // ═══════════════════════════════════════════════════════════════
  const rightPanel = (
    <RightPanel title="Silicon CFO">
      <PanelSection title="Cash Position">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bank Balance</span>
            <span className="tabular-nums">{fmtMoney(MOCK_SILICON_CFO.bankBalance)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Truly Spendable</span>
            <span className="text-primary font-semibold tabular-nums">{fmtMoney(MOCK_SILICON_CFO.trulySpendable)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Overdue Invoices</span>
            <span className="text-amber-400 tabular-nums">${(MOCK_CASH_FLOW.overdue / 1000).toFixed(1)}k</span>
          </div>
        </div>
      </PanelSection>

      <PanelSection title="Model Stack">
        <div className="space-y-1.5">
          {MODELS.slice(0, 5).map((m) => (
            <div key={m.id} className="flex items-center justify-between p-2 rounded bg-secondary/20 border border-border/20">
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${m.status === "live" ? "bg-green-500" : "bg-amber-500"}`} />
                <span className="text-[10px] font-medium text-foreground/70">{m.name}</span>
              </div>
              <span className="text-[9px] font-mono text-muted-foreground/50">{m.version}</span>
            </div>
          ))}
          <div className="text-[9px] text-muted-foreground/40 text-center pt-1">
            {MODELS.length} models · {MODELS.filter(m => m.status === "live").length} live
          </div>
        </div>
      </PanelSection>

      <PanelSection title="Payroll Provision">
        <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20 text-sm text-amber-400">
          Payroll run in 2 days — $18,400 total. 3 payslips generated and ready for review.
        </div>
        <Button className="w-full mt-3" size="sm" variant="outline" onClick={() => toast({ title: "Payslips", description: "Opening payslip review for 3 employees." })}>
          Review Payslips
        </Button>
      </PanelSection>

      <PanelSection title="Ironbark Insight">
        <div className="p-3 bg-primary/5 rounded-lg border border-primary/10 text-sm text-foreground/80 leading-relaxed">
          Labour revenue at 62% of total is above the 58% industry benchmark. Parts margin compressing slightly — Burson Q2 pricing adjustment is the main driver.
        </div>
      </PanelSection>

      <ConfidenceScore score={MOCK_FORECAST.confidence} label="Model Confidence" />
    </RightPanel>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h1 className="page-title">Financial Intelligence</h1>
          <p className="text-sm text-muted-foreground">
            Silicon CFO · Quantitative Models · Institutional-Grade Analytics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-green-400/70">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            {MODELS.filter(m => m.status === "live").length} models live
          </div>
          <Badge variant="outline" className="text-[10px] bg-secondary/40 text-muted-foreground border-border/40">
            <Lock className="w-3 h-3 mr-1" /> AES-256 encrypted
          </Badge>
        </div>
      </div>
      <StatStrip items={statItems} />
      <div className="flex-1 min-h-0">
        <ThreeLayer leftRail={leftRail} centre={centre} rightPanel={rightPanel} />
      </div>
    </div>
  );
}
