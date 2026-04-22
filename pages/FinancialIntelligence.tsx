import React, { useState } from 'react';
import { ThreeLayer } from '@/components/three-layer';
import { RightPanel, PanelSection, ConfidenceScore } from '@/components/right-panel';
import { StatStrip } from '@/components/stat-strip';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MOCK_REVENUE_PULSE, MOCK_PIPELINE_STAGES, MOCK_FORECAST, MOCK_CASH_FLOW, MOCK_ATTRIBUTION } from '@/lib/mock-fin';
import { TrendingUp, ArrowRight, Activity, DollarSign, PieChart as PieChartIcon } from 'lucide-react';
import { useAppStore } from '../store';

const fmtMoney = (n: number) => n >= 1_000_000 ? `$${(n/1_000_000).toFixed(2)}M` : `$${Math.round(n/1000)}k`;

export default function FinancialIntelligence() {
  const [activeTab, setActiveTab] = useState('Revenue Pulse');
  const stats = useAppStore(s => s.stats);

  const statItems = [
    { label: "Revenue (Month)", value: `$${(MOCK_REVENUE_PULSE.month / 1000).toFixed(1)}k`, trend: 12 },
    { label: "Pipeline Value", value: fmtMoney(stats.pipelineValueAud), trend: 5 },
    { label: "Weighted Pipeline", value: fmtMoney(stats.pipelineValueAud * 0.68) },
    { label: "Opportunities", value: stats.opportunitiesCreated, trend: 1 },
    { label: "Forecast Confidence", value: "88%" },
    { label: "Risk at Value", value: "$120k" }
  ];

  const leftNav = [
    'Revenue Pulse', 'Pipeline', 'Forecasts', 'Risk', 
    'Unit Economics', 'Attribution', 'Scenario Engine', 
    'Capital Allocation', 'Collections / Cash Flow'
  ];

  const leftRail = (
    <div className="space-y-1">
      {leftNav.map(item => (
        <button
          key={item}
          onClick={() => setActiveTab(item)}
          className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === item 
              ? 'bg-primary/10 text-primary' 
              : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );

  const centre = (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 flex items-center justify-between">
          <span>Revenue Pulse</span>
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">{MOCK_REVENUE_PULSE.acceleration} Acceleration</Badge>
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Today</div>
            <div className="text-xl font-semibold">${(MOCK_REVENUE_PULSE.today / 1000).toFixed(1)}k</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">This Week</div>
            <div className="text-xl font-semibold">${(MOCK_REVENUE_PULSE.week / 1000).toFixed(1)}k</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">This Month</div>
            <div className="text-xl font-semibold">${(MOCK_REVENUE_PULSE.month / 1000).toFixed(1)}k</div>
          </div>
        </div>
        <div className="h-4 w-full bg-secondary rounded-full overflow-hidden flex">
          <div className="bg-primary h-full" style={{ width: `${MOCK_REVENUE_PULSE.split.new}%` }} title="New Logo" />
          <div className="bg-blue-400 h-full" style={{ width: `${MOCK_REVENUE_PULSE.split.expansion}%` }} title="Expansion" />
          <div className="bg-slate-400 h-full" style={{ width: `${MOCK_REVENUE_PULSE.split.retention}%` }} title="Retention" />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2 px-1">
          <span>New {MOCK_REVENUE_PULSE.split.new}%</span>
          <span>Expansion {MOCK_REVENUE_PULSE.split.expansion}%</span>
          <span>Retention {MOCK_REVENUE_PULSE.split.retention}%</span>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Pipeline Engine</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_PIPELINE_STAGES} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} width={80} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(222 25% 10%)', borderColor: 'hsl(222 15% 20%)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(val: number) => `$${(val/1000).toFixed(0)}k`}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Revenue Attribution</h3>
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
                  {MOCK_ATTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#3b82f6', '#60a5fa', '#93c5fd', '#cbd5e1'][index % 4]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(222 25% 10%)', borderColor: 'hsl(222 15% 20%)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Forecast Engine</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-secondary/30 rounded border border-border">
            <span className="text-sm font-medium">Best Case</span>
            <span className="text-sm font-semibold text-green-500">${(MOCK_FORECAST.best / 1000).toFixed(1)}k</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-primary/10 rounded border border-primary/20">
            <span className="text-sm font-medium text-primary">Base Case</span>
            <span className="text-sm font-semibold text-primary">${(MOCK_FORECAST.base / 1000).toFixed(1)}k</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-secondary/30 rounded border border-border">
            <span className="text-sm font-medium text-muted-foreground">Worst Case</span>
            <span className="text-sm font-semibold text-muted-foreground">${(MOCK_FORECAST.worst / 1000).toFixed(1)}k</span>
          </div>
          <div className="pt-4 border-t border-border/50">
            <h4 className="text-xs font-medium text-muted-foreground mb-2">Key Assumptions</h4>
            <ul className="text-sm text-foreground/80 space-y-1 list-disc pl-4">
              {MOCK_FORECAST.assumptions.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );

  const rightPanel = (
    <RightPanel title="Silicon CFO Summary">
      <PanelSection title="Financial Shift">
        <div className="p-3 bg-secondary/50 rounded-lg border border-border text-sm text-foreground/80 space-y-2">
          <p>Strong expansion revenue this week offsets a slight dip in new logo acquisition. Cash flow remains highly positive.</p>
        </div>
      </PanelSection>

      <PanelSection title="Underlying Cause">
        <div className="p-3 bg-secondary/50 rounded-lg border border-border text-sm text-foreground/80 space-y-2">
          <p>The automated "Upsell Tier" workflow executed last Tuesday resulted in 12 accounts upgrading, driving the expansion spike.</p>
        </div>
      </PanelSection>

      <PanelSection title="Recommended Next Move">
        <div className="p-3 bg-primary/5 rounded-lg border border-primary/20 text-sm text-foreground/90 space-y-2">
          <div className="flex items-center gap-2 font-medium text-primary mb-1">
            <DollarSign className="w-4 h-4" /> Capital Allocation Shift
          </div>
          <p>Shift $5k ad spend from top-of-funnel brand awareness to bottom-funnel retargeting to accelerate the stalled new logo deals.</p>
        </div>
      </PanelSection>

      <PanelSection title="Downside Risk">
        <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20 text-sm text-amber-500/90 space-y-2">
          <p>If the 3 large enterprise deals push to Q4, base case drops to $310k.</p>
        </div>
      </PanelSection>
      
      <ConfidenceScore score={MOCK_FORECAST.confidence} label="Forecast Confidence" />
    </RightPanel>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h1 className="text-xl font-semibold">Financial Intelligence</h1>
          <p className="text-sm text-muted-foreground">Silicon CFO and revenue operations</p>
        </div>
      </div>
      <StatStrip items={statItems} />
      <div className="flex-1 min-h-0">
        <ThreeLayer leftRail={leftRail} centre={centre} rightPanel={rightPanel} />
      </div>
    </div>
  );
}
