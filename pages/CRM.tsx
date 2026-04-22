import React, { useState } from 'react';
import { useAppStore, Lead, LeadStage } from '../store';
import { StatStrip } from '../components/stat-strip';
import { RightPanel, PanelSection, ConfidenceScore } from '../components/right-panel';
import { DiscBars } from '../components/disc-bars';
import { 
  Building2, User, Mail, Phone, Calendar, Clock, 
  CheckCircle2, AlertTriangle, ShieldAlert, Activity, 
  ChevronRight, ArrowRight, LayoutGrid, List
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const STAGES: LeadStage[] = ['New', 'Ready', 'Contacted', 'Qualified', 'Meeting Booked', 'Opportunity', 'Won / Lost'];

export default function CRM() {
  const { leads, updateLeadStage, addLeadToLane } = useAppStore();
  const { toast } = useToast();
  
  const [viewMode, setViewMode] = useState<'board' | 'table'>('board');
  const [focusedLeadId, setFocusedLeadId] = useState<string | null>(null);

  const focusedLead = leads.find(l => l.id === focusedLeadId);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('leadId', id);
  };

  const handleDrop = (e: React.DragEvent, stage: LeadStage) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('leadId');
    if (id) {
      updateLeadStage(id, stage);
      toast({ title: "Lead Updated", description: `Moved to ${stage}` });
    }
  };

  const handleSendToOutbound = () => {
    if (focusedLead) {
      // Find a suitable lane or default to first
      addLeadToLane('lane1', focusedLead.id);
      toast({ title: "Routed to Outbound", description: `${focusedLead.contact} added to Hot Follow-Up lane.` });
    }
  };

  const statItems = [
    { label: "Total Leads", value: leads.length, trend: 12 },
    { label: "Ready to Act", value: leads.filter(l => l.stage === 'Ready').length, trend: 5 },
    { label: "Meetings Booked", value: leads.filter(l => l.stage === 'Meeting Booked').length, trend: 2 },
    { label: "Avg Conversion Prob.", value: "64%", trend: 4 }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h1 className="text-xl font-semibold">CRM</h1>
          <p className="text-sm text-muted-foreground">Leads, relationships, and pipeline intelligence</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-secondary/50 p-1 rounded-md">
            <button 
              onClick={() => setViewMode('board')} 
              className={`p-1.5 rounded ${viewMode === 'board' ? 'bg-card shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('table')} 
              className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-card shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <Button>Create Lead</Button>
        </div>
      </div>
      
      <StatStrip items={statItems} />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Filters */}
        <div className="w-64 flex-shrink-0 border-r border-border bg-card/30 p-4 overflow-y-auto">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Saved Views</h3>
          <div className="space-y-2 mb-8">
            {['High Intent – No Contact 7d', 'Post-Meeting Follow-Ups', 'Switch Targets (Ghost)'].map(view => (
              <Badge key={view} variant="secondary" className="w-full justify-start font-normal text-xs py-1.5 cursor-pointer hover:bg-secondary/80">
                {view}
              </Badge>
            ))}
          </div>

          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Filters</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Owner</label>
              <select className="w-full bg-secondary/50 border border-border rounded-md text-sm p-2 outline-none">
                <option>All Owners</option>
                <option>Ironbark</option>
                <option>Human Team</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Lead Score</label>
              <select className="w-full bg-secondary/50 border border-border rounded-md text-sm p-2 outline-none">
                <option>Any Score</option>
                <option>&gt; 80</option>
                <option>&gt; 50</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Centre */}
        <div className="flex-1 overflow-auto bg-background/50 relative">
          {viewMode === 'board' ? (
            <div className="flex gap-4 p-6 h-full min-w-max">
              {STAGES.map(stage => (
                <div 
                  key={stage} 
                  className="w-80 flex flex-col h-full bg-secondary/10 rounded-xl border border-border/50"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, stage)}
                >
                  <div className="p-3 border-b border-border/50 flex justify-between items-center bg-card/50 rounded-t-xl">
                    <h3 className="font-medium text-sm text-foreground/80">{stage}</h3>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                      {leads.filter(l => l.stage === stage).length}
                    </span>
                  </div>
                  <div className="flex-1 p-3 overflow-y-auto space-y-3">
                    {leads.filter(l => l.stage === stage).map(lead => (
                      <div 
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead.id)}
                        onClick={() => setFocusedLeadId(lead.id)}
                        className={`p-4 bg-card rounded-lg border cursor-pointer hover:border-primary/50 transition-colors shadow-sm ${focusedLeadId === lead.id ? 'border-primary ring-1 ring-primary/20' : 'border-border'}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-foreground leading-tight">{lead.company}</h4>
                          <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${lead.score >= 80 ? 'bg-green-500/10 text-green-500' : 'bg-secondary text-muted-foreground'}`}>{lead.score}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mb-3">{lead.contact} · {lead.role}</div>
                        <div className="flex flex-col gap-1.5 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Intent</span>
                            <span className={lead.intent > 70 ? 'text-amber-500' : 'text-foreground'}>{lead.intent}/100</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Next</span>
                            <span className="truncate max-w-[120px] text-right">{lead.nextAction}</span>
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
                    {leads.map(lead => (
                      <tr 
                        key={lead.id} 
                        onClick={() => setFocusedLeadId(lead.id)}
                        className={`hover:bg-secondary/30 cursor-pointer transition-colors ${focusedLeadId === lead.id ? 'bg-primary/5' : ''}`}
                      >
                        <td className="px-4 py-3 font-medium">{lead.company}</td>
                        <td className="px-4 py-3 text-muted-foreground">{lead.contact}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${lead.score >= 80 ? 'bg-green-500/10 text-green-500' : 'bg-secondary text-muted-foreground'}`}>{lead.score}</span>
                        </td>
                        <td className="px-4 py-3">{lead.intent}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded bg-secondary text-xs">{lead.stage}</span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground truncate max-w-[150px]">{lead.nextAction}</td>
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
                  <h2 className="text-xl font-semibold text-foreground leading-tight">{focusedLead.company}</h2>
                  <p className="text-sm text-muted-foreground">{focusedLead.contact} · {focusedLead.role}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">{focusedLead.stage}</Badge>
                <Badge variant="outline" className="bg-green-500/5 border-green-500/20 text-green-500">Score: {focusedLead.score}</Badge>
              </div>
            </div>

            <PanelSection title="Psychological Profile">
              <DiscBars primary={focusedLead.discPrimary} secondary={focusedLead.discSecondary} />
              <div className="mt-4 p-3 bg-secondary/30 rounded-lg text-sm text-foreground/80 border border-border/50">
                <div className="font-medium text-foreground mb-1">Persona: {focusedLead.persona}</div>
                Focus on ROI, quick time-to-value, and minimize small talk.
              </div>
            </PanelSection>

            {focusedLead.ghostIntel && (
              <PanelSection title="Ghost Intelligence">
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground text-xs uppercase tracking-wider block mb-1">Current Stack</span>
                    <div className="flex gap-1 flex-wrap">
                      {focusedLead.ghostIntel.tools.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded bg-secondary/50 border border-border/50 text-xs">{t}</span>
                      ))}
                    </div>
                  </div>
                  {focusedLead.ghostIntel.switchingSignals.length > 0 && (
                    <div>
                      <span className="text-muted-foreground text-xs uppercase tracking-wider block mb-1 text-amber-500">Switching Signals</span>
                      <ul className="list-disc pl-4 text-amber-500/90 text-xs">
                        {focusedLead.ghostIntel.switchingSignals.map(s => <li key={s}>{s}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </PanelSection>
            )}

            {focusedLead.compliance && (
              <PanelSection title="Compliance & Reachability">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className={`p-2 rounded border ${focusedLead.compliance.dncr ? 'bg-destructive/10 border-destructive/20 text-destructive' : 'bg-green-500/10 border-green-500/20 text-green-500'}`}>
                    <div className="text-xs opacity-80">DNCR Status</div>
                    <div className="font-medium">{focusedLead.compliance.dncr ? 'Blocked' : 'Clear'}</div>
                  </div>
                  <div className="p-2 rounded border border-border bg-secondary/30">
                    <div className="text-xs text-muted-foreground">Call Window</div>
                    <div className="font-medium">{focusedLead.compliance.window}</div>
                  </div>
                </div>
              </PanelSection>
            )}

            <PanelSection title="Why This Lead">
              <div className="text-sm text-muted-foreground bg-primary/5 p-3 rounded-lg border border-primary/10">
                High intent score driven by recent website visits to pricing page and identified competitor churn signals. Probability of conversion within 14 days is estimated at 68%.
              </div>
            </PanelSection>

            <PanelSection title="Recommended Action">
              <Button onClick={handleSendToOutbound} className="w-full justify-between" variant="default">
                Send to Outbound <ArrowRight className="w-4 h-4" />
              </Button>
            </PanelSection>
          </RightPanel>
        )}
      </div>
    </div>
  );
}