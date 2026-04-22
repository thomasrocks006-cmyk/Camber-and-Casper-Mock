import React, { useState } from "react";
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
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useAppStore } from "../store";

const fmtMoney = (n: number) => `$${n.toLocaleString()}`;

export default function FinancialIntelligence() {
  const [activeTab, setActiveTab] = useState("Revenue Pulse");
  const stats = useAppStore((s) => s.stats);

  const statItems = [
    {
      label: "Invoiced Today",
      value: `$${(MOCK_REVENUE_PULSE.today / 1000).toFixed(1)}k`,
      trend: 8,
    },
    {
      label: "Invoiced Week",
      value: `$${(MOCK_REVENUE_PULSE.week / 1000).toFixed(1)}k`,
      trend: 5,
    },
    {
      label: "This Month",
      value: `$${(MOCK_REVENUE_PULSE.month / 1000).toFixed(0)}k`,
      trend: 12,
    },
    {
      label: "Truly Spendable",
      value: fmtMoney(MOCK_SILICON_CFO.trulySpendable),
    },
    {
      label: "Overdue",
      value: `$${(MOCK_CASH_FLOW.overdue / 1000).toFixed(1)}k`,
      trend: -3,
    },
    { label: "Forecast Confidence", value: `${MOCK_FORECAST.confidence}%` },
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
    <div className="space-y-1">
      {leftNav.map((item) => (
        <button
          key={item}
          onClick={() => setActiveTab(item)}
          className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === item
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );

  // Revenue Pulse tab content
  const revenuePulseContent = (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 flex items-center justify-between">
          <span>Revenue Pulse</span>
          <Badge
            variant="outline"
            className="bg-green-500/10 text-green-500 border-green-500/20"
          >
            {MOCK_REVENUE_PULSE.acceleration} vs last month
          </Badge>
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Today</div>
            <div className="text-xl font-semibold">
              ${(MOCK_REVENUE_PULSE.today / 1000).toFixed(1)}k
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">This Week</div>
            <div className="text-xl font-semibold">
              ${(MOCK_REVENUE_PULSE.week / 1000).toFixed(1)}k
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">This Month</div>
            <div className="text-xl font-semibold">
              ${(MOCK_REVENUE_PULSE.month / 1000).toFixed(0)}k
            </div>
          </div>
        </div>
        <div className="h-4 w-full bg-secondary rounded-full overflow-hidden flex">
          <div
            className="bg-primary h-full"
            style={{ width: `${MOCK_REVENUE_PULSE.split.labour}%` }}
          />
          <div
            className="bg-blue-400 h-full"
            style={{ width: `${MOCK_REVENUE_PULSE.split.parts}%` }}
          />
          <div
            className="bg-slate-400 h-full"
            style={{ width: `${MOCK_REVENUE_PULSE.split.other}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2 px-1">
          <span>Labour {MOCK_REVENUE_PULSE.split.labour}%</span>
          <span>Parts {MOCK_REVENUE_PULSE.split.parts}%</span>
          <span>Other {MOCK_REVENUE_PULSE.split.other}%</span>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Job Pipeline
          </h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={MOCK_PIPELINE_STAGES}
                layout="vertical"
                margin={{ top: 0, right: 0, left: 30, bottom: 0 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="stage"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                  width={120}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222 25% 10%)",
                    borderColor: "hsl(222 15% 20%)",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "#fff" }}
                  formatter={(val: number) => `$${(val / 1000).toFixed(1)}k`}
                />
                <Bar
                  dataKey="value"
                  fill="hsl(210 55% 52%)"
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Revenue Mix
          </h3>
          <div className="h-[200px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_ATTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {MOCK_ATTRIBUTION.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ["hsl(210 55% 52%)", "#60a5fa", "#93c5fd"][index % 3]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222 25% 10%)",
                    borderColor: "hsl(222 15% 20%)",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );

  // Collections / Cash Flow tab — Silicon CFO panel (GAP-61)
  const cashFlowContent = (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" /> Silicon CFO — Truly
            Spendable Cash
          </h3>
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/20 text-xs"
          >
            Prepared by Ironbark
          </Badge>
        </div>

        <div className="space-y-2 font-mono text-sm mb-6">
          <div className="flex justify-between py-1.5 border-b border-border/40">
            <span className="text-muted-foreground">Bank Balance</span>
            <span className="text-foreground">
              {fmtMoney(MOCK_SILICON_CFO.bankBalance)}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-border/40">
            <span className="text-muted-foreground">
              − Outstanding Payables
            </span>
            <span className="text-red-400">
              −{fmtMoney(MOCK_SILICON_CFO.outstandingPayables)}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-border/40">
            <span className="text-muted-foreground">− Super Provision</span>
            <span className="text-red-400">
              −{fmtMoney(MOCK_SILICON_CFO.superProvision)}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-border/40">
            <span className="text-muted-foreground">− Tax Provision (GST)</span>
            <span className="text-red-400">
              −{fmtMoney(MOCK_SILICON_CFO.taxProvision)}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-border/40">
            <span className="text-muted-foreground">
              − Safety Buffer (2 weeks)
            </span>
            <span className="text-amber-400">
              −{fmtMoney(MOCK_SILICON_CFO.safetyBuffer)}
            </span>
          </div>
          <div className="flex justify-between py-3 mt-2 bg-primary/10 rounded-lg px-3 border border-primary/20">
            <span className="font-bold text-foreground text-base">
              TRULY SPENDABLE CASH
            </span>
            <span className="font-bold text-primary text-base">
              {fmtMoney(MOCK_SILICON_CFO.trulySpendable)}
            </span>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-border/50">
          <div className="flex items-start gap-3 p-4 bg-secondary/40 rounded-lg border border-border">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-primary font-bold text-sm">?</span>
            </div>
            <div>
              <div className="font-medium text-sm mb-1">
                "{MOCK_SILICON_CFO.hiringScenario.question}"
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed mb-3">
                {MOCK_SILICON_CFO.hiringScenario.answer}
              </div>
              <div className="space-y-1">
                {MOCK_SILICON_CFO.hiringScenario.conditions.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
              <Badge
                className="mt-3 bg-green-500/10 text-green-500 border-green-500/20 border"
                variant="outline"
              >
                {MOCK_SILICON_CFO.hiringScenario.verdict}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Match Engine — Invoice Variance
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-muted-foreground uppercase border-b border-border">
              <th className="text-left py-2">Document</th>
              <th className="text-right py-2">Qty</th>
              <th className="text-right py-2">Unit Price</th>
              <th className="text-right py-2">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            <tr>
              <td className="py-2 text-muted-foreground">Purchase Order</td>
              <td className="text-right">{MOCK_INVOICE_MATCH.po.qty}</td>
              <td className="text-right">
                ${MOCK_INVOICE_MATCH.po.unitPrice.toFixed(2)}
              </td>
              <td className="text-right">
                ${MOCK_INVOICE_MATCH.po.total.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="py-2 text-muted-foreground">Goods Receipt</td>
              <td className="text-right">{MOCK_INVOICE_MATCH.receipt.qty}</td>
              <td className="text-right">
                ${MOCK_INVOICE_MATCH.receipt.unitPrice.toFixed(2)}
              </td>
              <td className="text-right">
                ${MOCK_INVOICE_MATCH.receipt.total.toFixed(2)}
              </td>
            </tr>
            <tr className="text-amber-400">
              <td className="py-2 font-medium">Supplier Invoice</td>
              <td className="text-right">{MOCK_INVOICE_MATCH.invoice.qty}</td>
              <td className="text-right">
                ${MOCK_INVOICE_MATCH.invoice.unitPrice.toFixed(2)}
              </td>
              <td className="text-right">
                ${MOCK_INVOICE_MATCH.invoice.total.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4 flex items-center justify-between p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
          <div className="flex items-center gap-2 text-sm text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            <span>
              Variance: +${MOCK_INVOICE_MATCH.variance.total} (+
              {MOCK_INVOICE_MATCH.variance.pct}%)
            </span>
            {MOCK_INVOICE_MATCH.benfordsAnomaly && (
              <Badge
                variant="outline"
                className="bg-red-500/10 text-red-400 border-red-500/20 text-xs"
              >
                Benford's Anomaly
              </Badge>
            )}
          </div>
          <Button size="sm" variant="outline" className="text-xs">
            HOLD for Approval
          </Button>
        </div>
      </Card>
    </div>
  );

  // Forecast tab content
  const forecastContent = (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Monthly Forecast Engine
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-secondary/30 rounded border border-border">
            <span className="text-sm font-medium">Best Case</span>
            <span className="text-sm font-semibold text-green-500">
              ${(MOCK_FORECAST.best / 1000).toFixed(0)}k
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-primary/10 rounded border border-primary/20">
            <span className="text-sm font-medium text-primary">Base Case</span>
            <span className="text-sm font-semibold text-primary">
              ${(MOCK_FORECAST.base / 1000).toFixed(0)}k
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-secondary/30 rounded border border-border">
            <span className="text-sm font-medium text-muted-foreground">
              Worst Case
            </span>
            <span className="text-sm font-semibold text-muted-foreground">
              ${(MOCK_FORECAST.worst / 1000).toFixed(0)}k
            </span>
          </div>
          <div className="pt-4 border-t border-border/50">
            <h4 className="text-xs font-medium text-muted-foreground mb-2">
              Key Assumptions
            </h4>
            <ul className="text-sm text-foreground/80 space-y-1 list-disc pl-4">
              {MOCK_FORECAST.assumptions.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );

  // Stub for other tabs
  const comingSoonContent = (
    <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
      <TrendingUp className="w-12 h-12 mb-4 opacity-20" />
      <p className="font-medium text-foreground/60">{activeTab}</p>
      <p className="text-sm mt-2">This view is being prepared by Ironbark.</p>
    </div>
  );

  const renderCentre = () => {
    switch (activeTab) {
      case "Revenue Pulse":
        return revenuePulseContent;
      case "Collections / Cash Flow":
        return cashFlowContent;
      case "Forecasts":
        return forecastContent;
      default:
        return comingSoonContent;
    }
  };

  const centre = renderCentre();

  const rightPanel = (
    <RightPanel title="Silicon CFO">
      <PanelSection title="Cash Position">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bank Balance</span>
            <span>{fmtMoney(MOCK_SILICON_CFO.bankBalance)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Truly Spendable</span>
            <span className="text-primary font-semibold">
              {fmtMoney(MOCK_SILICON_CFO.trulySpendable)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Overdue Invoices</span>
            <span className="text-amber-400">
              ${(MOCK_CASH_FLOW.overdue / 1000).toFixed(1)}k
            </span>
          </div>
        </div>
      </PanelSection>

      <PanelSection title="Payroll Provision">
        <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20 text-sm text-amber-400">
          Payroll run in 2 days — $18,400 total. 3 payslips generated and ready
          for review.
        </div>
        <Button className="w-full mt-3" size="sm" variant="outline">
          Review Payslips
        </Button>
      </PanelSection>

      <PanelSection title="Ironbark Insight">
        <div className="p-3 bg-primary/5 rounded-lg border border-primary/10 text-sm text-foreground/80">
          Labour revenue at 62% of total is above the 58% industry benchmark.
          Parts margin compressing slightly — Burson Q2 pricing adjustment is
          the main driver.
        </div>
      </PanelSection>

      <ConfidenceScore
        score={MOCK_FORECAST.confidence}
        label="Forecast Confidence"
      />
    </RightPanel>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h1 className="text-xl font-semibold">Financial Intelligence</h1>
          <p className="text-sm text-muted-foreground">
            Silicon CFO · Cash Intelligence · Payroll Provision
          </p>
        </div>
      </div>
      <StatStrip items={statItems} />
      <div className="flex-1 min-h-0">
        <ThreeLayer
          leftRail={leftRail}
          centre={centre}
          rightPanel={rightPanel}
        />
      </div>
    </div>
  );
}
