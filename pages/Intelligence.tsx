import React, { useState } from 'react';
import { ThreeLayer } from '@/components/three-layer';
import { RightPanel, PanelSection, ConfidenceScore } from '@/components/right-panel';
import { StatStrip } from '@/components/stat-strip';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, BrainCircuit, Activity, AlertTriangle, TrendingUp, TrendingDown, Target, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_PATTERNS, MOCK_SENTIMENT_DATA, MOCK_OBJECTION_CLUSTERS } from '@/lib/mock-intel';
import { useAppStore } from '../store';

export default function Intelligence() {
  const [activeTab, setActiveTab] = useState('Overview');
  const stats = useAppStore(s => s.stats);

  const statItems = [
    { label: "Calls Completed", value: stats.callsCompleted, trend: 2 },
    { label: "Strategy Updates", value: 4, trend: 1 },
    { label: "Learning Velocity", value: "94%", trend: 5 },
    { label: "Meetings Booked", value: stats.meetingsBooked, trend: 3 },
    { label: "Opportunities Created", value: stats.opportunitiesCreated, trend: 1 }
  ];

  const leftNav = [
    'Overview', 'Segments', 'Channels', 'Strategies', 
    'Objections', 'Sentiment', 'Campaigns', 'Lanes', 'Profile Effectiveness'
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
      <Card className="p-6 border-primary/20 bg-primary/5">
        <div className="flex items-center gap-3 mb-4 text-primary">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Executive Insight Summary</h2>
        </div>
        <p className="text-foreground/90 leading-relaxed">
          The system has detected a high-confidence shift in mid-market tech buying behaviour. Competitor X's recent pricing changes have created a vulnerability window. Recommend shifting 45% of outbound capacity to the "Switch Target" lane focusing on infrastructure cost reduction. Current learning velocity indicates a 94% confidence in this adjustment yielding positive pipeline impact within 14 days.
        </p>
      </Card>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Pattern Detection</h3>
        <div className="space-y-3">
          {MOCK_PATTERNS.map(pattern => (
            <Card key={pattern.id} className="p-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-foreground">{pattern.title}</h4>
                  <Badge variant="outline" className="bg-secondary text-xs font-normal">n={pattern.sampleSize}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{pattern.description}</p>
                <div className="flex items-center gap-4 text-xs font-medium">
                  <span className="text-green-500">{pattern.confidence}% Confidence</span>
                  <span className="text-muted-foreground">Ironbark Insight</span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Ignore</Button>
                <Button variant="secondary" size="sm" className="flex-1 sm:flex-none">Monitor</Button>
                <Button size="sm" className="flex-1 sm:flex-none bg-primary text-primary-foreground">Apply</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Objection Clusters</h3>
          <div className="space-y-3">
            {MOCK_OBJECTION_CLUSTERS.map(obj => (
              <div key={obj.id} className="p-3 rounded-lg border bg-card flex justify-between items-center">
                <div>
                  <div className="font-medium text-sm text-foreground">{obj.topic}</div>
                  <div className="text-xs text-muted-foreground">{obj.count} occurrences</div>
                </div>
                <div className={`text-xs font-medium flex items-center ${obj.trend.startsWith('+') ? 'text-amber-500' : 'text-green-500'}`}>
                  {obj.trend.startsWith('+') ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {obj.trend}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Sentiment & Quality</h3>
          <Card className="p-4 h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_SENTIMENT_DATA}>
                <XAxis dataKey="time" stroke="#cbd5e1" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(222 25% 10%)', borderColor: 'hsl(222 15% 20%)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="quality" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="sentiment" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );

  const rightPanel = (
    <RightPanel title="Intelligence Synthesis">
      <PanelSection title="What Changed">
        <div className="p-3 bg-secondary/50 rounded-lg border border-border text-sm text-foreground/80 space-y-2">
          <p>Competitor X announced a 15% price increase on their enterprise tier, effective next month.</p>
        </div>
      </PanelSection>

      <PanelSection title="Why It Happened">
        <div className="p-3 bg-secondary/50 rounded-lg border border-border text-sm text-foreground/80 space-y-2">
          <p>Correlated with their recent acquisition. Signal engine detected 42 mentions of "X pricing" across current pipeline calls this week.</p>
        </div>
      </PanelSection>

      <PanelSection title="Recommended Adjustment">
        <div className="p-3 bg-primary/5 rounded-lg border border-primary/20 text-sm text-foreground/90 space-y-2">
          <div className="flex items-center gap-2 font-medium text-primary mb-1">
            <Target className="w-4 h-4" /> Activate Switch Target Lane
          </div>
          <p>Deploy "Cost Optimization" messaging to all leads currently known to use Competitor X.</p>
        </div>
      </PanelSection>

      <PanelSection title="Execution Impact">
        <div className="text-sm font-medium text-foreground mb-4">
          8 leads will move to Switch Target lane.
        </div>
        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Apply Action</Button>
      </PanelSection>
      
      <ConfidenceScore score={94} label="Prediction Confidence" />
    </RightPanel>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h1 className="text-xl font-semibold">Intelligence</h1>
          <p className="text-sm text-muted-foreground">Pattern detection and strategic synthesis</p>
        </div>
      </div>
      <StatStrip items={statItems} />
      <div className="flex-1 min-h-0">
        <ThreeLayer leftRail={leftRail} centre={centre} rightPanel={rightPanel} />
      </div>
    </div>
  );
}
