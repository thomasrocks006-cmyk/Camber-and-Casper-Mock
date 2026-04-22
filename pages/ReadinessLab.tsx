import React, { useState } from "react";
import { ThreeLayer } from "@/components/three-layer";
import { RightPanel, PanelSection } from "@/components/right-panel";
import { StatStrip } from "@/components/stat-strip";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MOCK_READINESS,
  MOCK_SCENARIOS,
  MOCK_ASSUMPTIONS,
  MOCK_DEPLOYMENT_ENVELOPE,
} from "@/lib/mock-readiness";
import {
  ShieldCheck,
  Activity,
  BrainCircuit,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";

export default function ReadinessLab() {
  const [activeScenario, setActiveScenario] = useState("Baseline");

  const scenario =
    MOCK_SCENARIOS.find((s) => s.name === activeScenario) ?? MOCK_SCENARIOS[0];

  const stressColors: Record<string, string> = {
    Normal: "bg-green-500/10 text-green-500 border-green-500/20",
    Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    High: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    Critical: "bg-destructive/10 text-destructive border-destructive/20",
  };
  const resultColors: Record<string, string> = {
    Pass: "bg-green-500/10 text-green-500 border-green-500/20",
    "Pass with Interventions":
      "bg-amber-500/10 text-amber-500 border-amber-500/20",
    "Fail gracefully":
      "bg-destructive/10 text-destructive border-destructive/20",
  };

  const statItems = [
    { label: "Readiness Score", value: MOCK_READINESS.score, trend: 1 },
    { label: "Deployment Band", value: MOCK_READINESS.band },
    { label: "OpVaR (Daily)", value: MOCK_READINESS.opVar },
    { label: "Risk Ceiling", value: MOCK_READINESS.riskCeiling },
    { label: "Shadow Mode", value: MOCK_READINESS.shadowMode },
  ];

  const leftNav = MOCK_SCENARIOS.map((s) => s.name);

  const leftRail = (
    <div className="space-y-1">
      <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        Simulations
      </div>
      {leftNav.map((item) => (
        <button
          key={item}
          onClick={() => setActiveScenario(item)}
          className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
            activeScenario === item
              ? "bg-primary/10 text-primary border border-primary/20"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );

  const centre = (
    <div className="space-y-6 pb-12">
      <div className="p-5 border border-border rounded-xl bg-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <BrainCircuit className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              Simulation: {activeScenario}
            </h2>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className={stressColors[scenario.stress]}>
              {scenario.stress} Stress
            </Badge>
            <Badge variant="outline" className={resultColors[scenario.result]}>
              {scenario.result}
            </Badge>
          </div>
        </div>
        <div className="text-sm text-muted-foreground leading-relaxed">
          {scenario.summary}
        </div>

        {scenario.failPoints.length > 0 && (
          <div className="mt-4 space-y-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Failure Points
            </div>
            {scenario.failPoints.map((fp, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-destructive"
              >
                <XCircle className="w-4 h-4 flex-shrink-0" />
                {fp}
              </div>
            ))}
          </div>
        )}

        {scenario.interventions.length > 0 && (
          <div className="mt-4 space-y-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Ironbark Interventions
            </div>
            {scenario.interventions.map((iv, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-amber-400"
              >
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {iv}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Deployment Envelope Matrix
        </h3>
        <Card className="overflow-hidden border-border bg-card">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary/50 border-b border-border text-muted-foreground text-xs uppercase">
              <tr>
                <th className="px-4 py-3">Action Type</th>
                <th className="px-4 py-3 text-center">Autonomous</th>
                <th className="px-4 py-3 text-center">Pre-Approved</th>
                <th className="px-4 py-3 text-center">Review-Gated</th>
                <th className="px-4 py-3 text-center">Blocked</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {MOCK_DEPLOYMENT_ENVELOPE.map((row) => (
                <tr key={row.action}>
                  <td className="px-4 py-3 font-medium">{row.action}</td>
                  <td className="px-4 py-3 text-center">
                    <div
                      className={`w-3 h-3 rounded-full mx-auto ${row.autonomous ? "bg-green-500" : "bg-secondary"}`}
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div
                      className={`w-3 h-3 rounded-full mx-auto ${row.preApproved ? "bg-primary" : "bg-secondary"}`}
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div
                      className={`w-3 h-3 rounded-full mx-auto ${row.reviewGated ? "bg-amber-500" : "bg-secondary"}`}
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div
                      className={`w-3 h-3 rounded-full mx-auto ${row.blocked ? "bg-destructive" : "bg-secondary"}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Assumption Log
        </h3>
        <Card className="overflow-hidden border-border bg-card">
          <table className="w-full text-sm text-left">
            <tbody className="divide-y divide-border/50">
              {MOCK_ASSUMPTIONS.map((a) => (
                <tr key={a.id}>
                  <td className="px-4 py-3 text-foreground">{a.statement}</td>
                  <td className="px-4 py-3 text-right">
                    <Badge
                      variant="outline"
                      className={`
                      ${a.status === "verified" ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}
                      ${a.status === "inferred" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : ""}
                      ${a.status === "missing" ? "bg-destructive/10 text-destructive border-destructive/20" : ""}
                    `}
                    >
                      {a.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );

  const rightPanel = (
    <RightPanel title="Resilience Synthesis">
      <PanelSection title="Scenario Result">
        <div className="space-y-2">
          <div
            className={`p-3 rounded-lg border text-sm font-medium ${scenario.result === "Pass" ? "bg-green-500/10 text-green-500 border-green-500/20" : scenario.result === "Pass with Interventions" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-destructive/10 text-destructive border-destructive/20"}`}
          >
            {scenario.result}
          </div>
          <div
            className={`px-3 py-1.5 rounded text-xs inline-flex items-center gap-1 ${scenario.stress === "Normal" ? "bg-green-500/10 text-green-500" : scenario.stress === "Critical" ? "bg-destructive/10 text-destructive" : "bg-amber-500/10 text-amber-400"}`}
          >
            {scenario.stress} Stress Level
          </div>
        </div>
      </PanelSection>

      {scenario.interventions.length > 0 && (
        <PanelSection title="Ironbark Interventions">
          <div className="space-y-2">
            {scenario.interventions.map((iv, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-amber-400 p-2 bg-amber-500/10 rounded border border-amber-500/20"
              >
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                {iv}
              </div>
            ))}
          </div>
        </PanelSection>
      )}

      <PanelSection title="System Boundaries">
        <div className="p-3 bg-secondary/50 rounded-lg border border-border text-sm text-foreground/80 space-y-2">
          <p>
            <strong>Safe autonomy:</strong> Customer messaging, service
            reminders, draft generation.
          </p>
          <p className="pt-2 border-t border-border/50">
            <strong>Human required:</strong> Payroll filing, invoices above
            $500, pricing changes.
          </p>
        </div>
      </PanelSection>

      <PanelSection title="Powered by Ironbark">
        <div className="p-3 bg-primary/5 rounded-lg border border-primary/10 text-xs text-muted-foreground">
          BEC+RE Assurance Framework — 20 Constitutional Principles Active. Last
          simulation run: today 6:00am AEST.
        </div>
      </PanelSection>
    </RightPanel>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h1 className="text-xl font-semibold flex items-center gap-2">
            Readiness Lab{" "}
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
              BEC+RE
            </span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Assurance, stress simulation, and deployment envelope
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
