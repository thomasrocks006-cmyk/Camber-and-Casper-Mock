import React, { useState } from 'react';
import { ThreeLayer } from '@/components/three-layer';
import { RightPanel, PanelSection } from '@/components/right-panel';
import { StatStrip } from '@/components/stat-strip';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MOCK_READINESS, MOCK_SCENARIOS, MOCK_ASSUMPTIONS } from '@/lib/mock-readiness';
import { ShieldCheck, Activity, BrainCircuit, Network, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export default function ReadinessLab() {
  const [activeScenario, setActiveScenario] = useState('Baseline');

  const statItems = [
    { label: "Readiness Score", value: MOCK_READINESS.score, trend: 1 },
    { label: "Deployment Band", value: MOCK_READINESS.band },
    { label: "OpVaR", value: MOCK_READINESS.opVar },
    { label: "Risk Ceiling", value: MOCK_READINESS.riskCeiling },
    { label: "Shadow Mode", value: MOCK_READINESS.shadowMode, trend: 0, trendLabel: "active" }
  ];

  const leftNav = [
    'Baseline', 'Fraud Pressure', 'Operator Strain', 
    'Data Integrity Decay', 'Cross-Entity Contagion', 
    'Audit Pressure', 'Growth Scenario', 'Model Upgrade Scenario'
  ];

  const leftRail = (
    <div className="space-y-1">
      <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Simulations</div>
      {leftNav.map(item => (
        <button
          key={item}
          onClick={() => setActiveScenario(item)}
          className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
            activeScenario === item 
              ? 'bg-primary/10 text-primary border border-primary/20' 
              : 'text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent'
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
        <div className="flex items-center gap-3 mb-4">
          <BrainCircuit className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Environment Summary: {activeScenario}</h2>
        </div>
        <div className="text-sm text-muted-foreground leading-relaxed">
          Compiled entity state running against {activeScenario.toLowerCase()} conditions. System is evaluating 4,000 parallel decision paths to verify operational boundaries and identify breaking points in autonomy logic.
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Future Branches Simulation</h3>
        <Card className="p-6 bg-secondary/10 border-border overflow-x-auto">
          {/* Horizontal Tree Vis Placeholder */}
          <div className="flex items-center min-w-[600px] py-4">
            <div className="p-3 bg-card border border-border rounded text-sm font-medium shrink-0">Current State</div>
            <div className="w-12 h-px bg-border shrink-0"></div>
            
            <div className="flex flex-col gap-8 shrink-0">
              <div className="flex items-center">
                 <div className="w-4 h-px bg-border shrink-0"></div>
                 <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 rounded text-sm font-medium">Best Case Path</div>
              </div>
              <div className="flex items-center">
                 <div className="w-4 h-px bg-border shrink-0"></div>
                 <div className="p-3 bg-primary/10 border border-primary/20 text-primary rounded text-sm font-medium">Base Case Path</div>
              </div>
              <div className="flex items-center">
                 <div className="w-4 h-px bg-border shrink-0"></div>
                 <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded text-sm font-medium flex items-center gap-2">
                   Stressed Path <AlertTriangle className="w-4 h-4" />
                 </div>
              </div>
            </div>
            
            <div className="w-12 h-px bg-border shrink-0 ml-4 relative">
              <div className="absolute -top-12 left-0 h-24 w-px bg-border"></div>
            </div>
            
            <div className="p-3 bg-secondary border border-border rounded text-sm text-muted-foreground shrink-0">
              Outcome Cluster
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Deployment Envelope Matrix</h3>
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
              <tr>
                <td className="px-4 py-3 font-medium">Draft Communications</td>
                <td className="px-4 py-3 text-center"><div className="w-3 h-3 rounded-full bg-green-500 mx-auto"></div></td>
                <td className="px-4 py-3 text-center"><div className="w-3 h-3 rounded-full bg-secondary mx-auto"></div></td>
                <td className="px-4 py-3 text-center"><div className="w-3 h-3 rounded-full bg-secondary mx-auto"></div></td>
                <td className="px-4 py-3 text-center"><div className="w-3 h-3 rounded-full bg-secondary mx-auto"></div></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Pricing Adjustments</td>
                <td className="px-4 py-3 text-center"><div className="w-3 h-3 rounded-full bg-secondary mx-auto"></div></td>
                <td className="px-4 py-3 text-center"><div className="w-3 h-3 rounded-full bg-secondary mx-auto"></div></td>
                <td className="px-4 py-3 text-center"><div className="w-3 h-3 rounded-full bg-amber-500 mx-auto"></div></td>
                <td className="px-4 py-3 text-center"><div className="w-3 h-3 rounded-full bg-secondary mx-auto"></div></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Contract Execution</td>
                <td className="px-4 py-3 text-center"><div className="w-3 h-3 rounded-full bg-secondary mx-auto"></div></td>
                <td className="px-4 py-3 text-center"><div className="w-3 h-3 rounded-full bg-secondary mx-auto"></div></td>
                <td className="px-4 py-3 text-center"><div className="w-3 h-3 rounded-full bg-secondary mx-auto"></div></td>
                <td className="px-4 py-3 text-center"><div className="w-3 h-3 rounded-full bg-destructive mx-auto"></div></td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Assumption Log</h3>
        <Card className="overflow-hidden border-border bg-card">
          <table className="w-full text-sm text-left">
            <tbody className="divide-y divide-border/50">
              {MOCK_ASSUMPTIONS.map(a => (
                <tr key={a.id}>
                  <td className="px-4 py-3 text-foreground">{a.statement}</td>
                  <td className="px-4 py-3 text-right">
                    <Badge variant="outline" className={`
                      ${a.status === 'verified' ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''}
                      ${a.status === 'inferred' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : ''}
                      ${a.status === 'missing' ? 'bg-destructive/10 text-destructive border-destructive/20' : ''}
                    `}>
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
      <PanelSection title="Stress Test Results">
        <div className="space-y-3">
          <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20 text-sm text-destructive space-y-1">
            <div className="font-semibold flex items-center gap-1"><XCircle className="w-4 h-4"/> What Failed</div>
            <p className="text-destructive/80">Under operator strain, manual review queues breached SLA by 400%, causing pipeline stagnation.</p>
          </div>
          <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-sm text-green-500 space-y-1">
            <div className="font-semibold flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> What Held Up</div>
            <p className="text-green-500/80">Compliance shield successfully blocked 100% of out-of-policy outbound attempts during chaos simulation.</p>
          </div>
        </div>
      </PanelSection>

      <PanelSection title="Operational Boundaries">
        <div className="p-3 bg-secondary/50 rounded-lg border border-border text-sm text-foreground/80 space-y-2">
          <p><strong>Safe Autonomy Range:</strong> Lead qualification, draft generation, and routine follow-ups.</p>
          <p className="pt-2 border-t border-border/50"><strong>Required Human Control:</strong> Pricing variance above 5%, final contract sign-off.</p>
        </div>
      </PanelSection>
    </RightPanel>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h1 className="text-xl font-semibold flex items-center gap-2">
            Readiness Lab <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[10px]">BEC+RE</Badge>
          </h1>
          <p className="text-sm text-muted-foreground">Assurance, simulation, and deployment envelope</p>
        </div>
      </div>
      <StatStrip items={statItems} />
      <div className="flex-1 min-h-0">
        <ThreeLayer leftRail={leftRail} centre={centre} rightPanel={rightPanel} />
      </div>
    </div>
  );
}
