import React, { useState } from 'react';
import { ThreeLayer } from '@/components/three-layer';
import { RightPanel, PanelSection, ConfidenceScore } from '@/components/right-panel';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ShieldAlert, Workflow, Clock, Layers, Zap } from 'lucide-react';
import { MOCK_WORKFLOWS } from '@/lib/mock-workflow';

export default function Workflows() {
  const [activeCategory, setActiveCategory] = useState('Approvals');
  const [selectedTask, setSelectedTask] = useState(MOCK_WORKFLOWS[0]);

  const categories = [
    'Approvals', 'Follow-ups', 'Campaigns', 'Billing', 'Compliance', 'Meetings', 'Automations'
  ];

  const leftRail = (
    <div className="space-y-1">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
            activeCategory === cat 
              ? 'bg-primary/10 text-primary' 
              : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );

  const centre = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">{activeCategory} Queue</h2>
        <Button variant="outline" size="sm" className="bg-secondary/50">Bulk Approve All</Button>
      </div>

      <div className="space-y-4">
        {MOCK_WORKFLOWS.filter(w => activeCategory === 'Approvals' || w.category === activeCategory).map(task => (
          <Card 
            key={task.id} 
            className={`p-5 cursor-pointer transition-colors border ${selectedTask.id === task.id ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/50'}`}
            onClick={() => setSelectedTask(task)}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${task.category === 'Compliance' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                  {task.category === 'Compliance' ? <ShieldAlert className="w-5 h-5" /> : <Workflow className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-base">{task.title}</h3>
                  <div className="text-sm text-muted-foreground mt-0.5">Target: {task.target}</div>
                </div>
              </div>
              <Badge variant={task.priority === 'High' ? 'destructive' : 'secondary'}>{task.priority}</Badge>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-amber-500" /> {task.trigger}</span>
                <span>Created 10m ago</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Review</Button>
                <Button size="sm" className="bg-primary text-primary-foreground">Approve</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const rightPanel = (
    <RightPanel title="Task Intelligence">
      <PanelSection title="Rationale">
        <div className="p-3 bg-secondary/50 rounded-lg border border-border text-sm text-foreground/80 space-y-2">
          <p>System aggregated outcomes from 12 discovery calls yesterday. Prepared standardized follow-up templates dynamically populated with specific commitments discussed in each call.</p>
        </div>
      </PanelSection>

      <PanelSection title="Source Trigger">
        <div className="flex items-center gap-2 p-2 rounded border border-border bg-card text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium text-foreground">{selectedTask.trigger}</span>
        </div>
      </PanelSection>

      <PanelSection title="Policy Basis">
        <div className="p-3 bg-primary/5 rounded border border-primary/20 text-sm text-foreground/90">
          <span className="font-medium text-primary block mb-1">Execution Rule applied:</span>
          {selectedTask.policyBasis}
        </div>
      </PanelSection>

      <PanelSection title="Audit Trail preview">
        <div className="space-y-3 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-4 h-4 rounded-full border border-primary bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-primary/20">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            </div>
            <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-2 rounded border border-border bg-card shadow-sm text-xs">
              <div className="font-medium text-foreground">Calls Completed</div>
              <div className="text-muted-foreground mt-0.5">14 calls mapped</div>
            </div>
          </div>
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
             <div className="flex items-center justify-center w-4 h-4 rounded-full border border-primary bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-primary/20">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            </div>
            <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-2 rounded border border-border bg-card shadow-sm text-xs">
              <div className="font-medium text-foreground">Commitments Extracted</div>
              <div className="text-muted-foreground mt-0.5">22 items found</div>
            </div>
          </div>
        </div>
      </PanelSection>

      <ConfidenceScore score={selectedTask.confidence} label="Task Confidence" />
    </RightPanel>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h1 className="text-xl font-semibold">Workflows</h1>
          <p className="text-sm text-muted-foreground">Orchestration and approval queues</p>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <ThreeLayer leftRail={leftRail} centre={centre} rightPanel={rightPanel} />
      </div>
    </div>
  );
}
