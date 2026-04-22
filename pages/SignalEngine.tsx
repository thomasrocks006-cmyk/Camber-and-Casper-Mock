import React, { useState } from 'react';
import { useAppStore } from '../store';
import { StatStrip } from '../components/stat-strip';
import { RightPanel, PanelSection } from '../components/right-panel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Radio, ArrowRight, Building2, ExternalLink, Activity, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const SIGNAL_TYPE_TO_LANE: Record<string, { id: string; name: string }> = {
  'Leadership Change': { id: 'lane1', name: 'Hot Follow-Up' },
  'Competitor Pricing': { id: 'lane2', name: 'Competitor Switch Targets' },
  'Funding Round': { id: 'lane1', name: 'Hot Follow-Up' },
  'Hiring Surge': { id: 'lane4', name: 'Cold Resurrection' },
};

export default function SignalEngine() {
  const { signals, leads, outboundLanes, addLeadToLane, logActivity } = useAppStore();
  const { toast } = useToast();
  
  const [focusedSignalId, setFocusedSignalId] = useState<string | null>(signals[0]?.id || null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const focusedSignal = signals.find(s => s.id === focusedSignalId);

  const resolveTarget = () => {
    if (!focusedSignal) return null;
    const laneSpec = SIGNAL_TYPE_TO_LANE[focusedSignal.type] ?? { id: 'lane2', name: 'Competitor Switch Targets' };
    const matchedLead =
      leads.find(l => l.company === focusedSignal.company) ??
      leads.find(l => !outboundLanes.find(ln => ln.id === laneSpec.id)?.leadIds.includes(l.id)) ??
      leads[0];
    return { laneSpec, leadId: matchedLead?.id };
  };

  const handleRouteToCRM = () => {
    toast({ title: "Routed to CRM", description: `${focusedSignal?.company ?? 'Company'} added to CRM watch list.` });
    logActivity({ type: 'Signal', description: `Routed ${focusedSignal?.company} to CRM based on ${focusedSignal?.type} signal` });
  };

  const handleSendToOutbound = () => {
    const target = resolveTarget();
    if (!target?.leadId) return;
    addLeadToLane(target.laneSpec.id, target.leadId);
    toast({ title: "Sent to Outbound", description: `${focusedSignal?.company ?? 'Company'} added to ${target.laneSpec.name} lane.` });
    logActivity({ type: 'Outbound', description: `Added ${focusedSignal?.company} to ${target.laneSpec.name} lane` });
  };

  const statItems = [
    { label: "Signals Today", value: 124, trend: 15 },
    { label: "High Impact", value: 12, trend: 2 },
    { label: "Routed Automatically", value: 85, trend: 10 },
    { label: "Signal-to-Noise", value: "94%" }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h1 className="text-xl font-semibold">Signal Engine</h1>
          <p className="text-sm text-muted-foreground">Scout network and market intelligence</p>
        </div>
      </div>
      
      <StatStrip items={statItems} />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Rail */}
        <div className="w-64 flex-shrink-0 border-r border-border bg-card/30 p-4 overflow-y-auto">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Signal Types</h3>
          <div className="space-y-1">
            {[
              { label: 'All Signals', count: 124 },
              { label: 'Leadership Changes', count: 18 },
              { label: 'Competitor Pricing', count: 9 },
              { label: 'Funding Events', count: 14 },
              { label: 'Hiring Surges', count: 22 },
              { label: 'Tech Stack Changes', count: 11 },
            ].map(type => (
              <button key={type.label} className="w-full text-left px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors flex justify-between items-center group">
                <span className="text-foreground/80 group-hover:text-foreground">{type.label}</span>
                <span className="text-xs text-muted-foreground">{type.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Centre */}
        <div className="flex-1 overflow-auto bg-background/50 p-6">
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary/50 border-b border-border text-muted-foreground uppercase tracking-wider text-[10px] font-semibold">
                <tr>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Signal Type</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Impact</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {signals.map(signal => (
                  <tr 
                    key={signal.id} 
                    onClick={() => setFocusedSignalId(signal.id)}
                    className={`hover:bg-secondary/30 cursor-pointer transition-colors ${focusedSignalId === signal.id ? 'bg-primary/5' : ''}`}
                  >
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{signal.timestamp}</td>
                    <td className="px-4 py-3 font-medium">{signal.company}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-secondary text-xs">{signal.type}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground truncate max-w-[200px]">{signal.description}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs ${signal.impact === 'High' ? 'bg-amber-500/10 text-amber-500' : 'bg-secondary text-muted-foreground'}`}>
                        {signal.impact}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setFocusedSignalId(signal.id); setDrawerOpen(true); }}>
                        Why Now <ArrowUpRight className="w-3 h-3 ml-1" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel */}
        {focusedSignal && (
          <RightPanel title="Intelligence Snapshot">
            <div className="mb-6 pb-6 border-b border-border/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded bg-secondary flex items-center justify-center border border-border">
                  <Building2 className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground leading-tight">{focusedSignal.company}</h2>
                  <a href="#" className="text-xs text-primary hover:underline flex items-center gap-1 mt-1">
                    View Website <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <PanelSection title="Decision Maker Readiness">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-4 border-primary flex items-center justify-center text-xl font-bold text-foreground">
                  84
                </div>
                <div className="flex-1 space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between items-center">
                    <span>Intent</span>
                    <span className="font-medium text-foreground">High</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Authority</span>
                    <span className="font-medium text-foreground">Verified</span>
                  </div>
                </div>
              </div>
            </PanelSection>

            <PanelSection title="ICP Match">
              {(() => {
                const icp = [
                  { label: 'Industry fit', value: 92 },
                  { label: 'Company size', value: 78 },
                  { label: 'Tech stack overlap', value: 84 },
                  { label: 'Geography', value: 96 },
                ];
                const overall = Math.round(icp.reduce((a, b) => a + b.value, 0) / icp.length);
                return (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Overall match</span>
                      <span className="text-sm font-semibold text-foreground">{overall}/100</span>
                    </div>
                    {icp.map(row => (
                      <div key={row.label}>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>{row.label}</span>
                          <span className="text-foreground">{row.value}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${row.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </PanelSection>

            <PanelSection title="Authority Score">
              {(() => {
                const auth = [
                  { label: 'Title seniority', value: 88, note: 'CFO, named decision maker' },
                  { label: 'Budget signal', value: 74, note: 'Quarterly tech budget unconfirmed' },
                  { label: 'Recent mandate', value: 90, note: 'New CFO hired 14 days ago' },
                ];
                const overall = Math.round(auth.reduce((a, b) => a + b.value, 0) / auth.length);
                return (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Composite</span>
                      <span className="text-sm font-semibold text-foreground">{overall}/100</span>
                    </div>
                    {auth.map(row => (
                      <div key={row.label} className="text-xs">
                        <div className="flex items-center justify-between text-muted-foreground mb-1">
                          <span>{row.label}</span>
                          <span className="text-foreground font-medium">{row.value}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                          <div className="h-full bg-primary/80" style={{ width: `${row.value}%` }} />
                        </div>
                        <div className="text-muted-foreground/80 mt-1">{row.note}</div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </PanelSection>

            <PanelSection title="Scout Notes">
              <div className="text-sm text-muted-foreground bg-secondary/30 p-3 rounded-lg border border-border/50">
                {focusedSignal.description}. This creates an immediate opening for value proposition discussion, specifically around scaling operations without adding headcount.
              </div>
            </PanelSection>

            <PanelSection title="Recommended Actions">
              <div className="space-y-2">
                <Button onClick={handleRouteToCRM} className="w-full justify-between" variant="outline">
                  Route to CRM Watch List <ArrowRight className="w-4 h-4" />
                </Button>
                <Button onClick={handleSendToOutbound} className="w-full justify-between" variant="default">
                  Send to Outbound Lane <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </PanelSection>
          </RightPanel>
        )}
      </div>

      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="sm:max-w-[500px] bg-card border-l border-border p-0 flex flex-col">
          <SheetHeader className="p-6 border-b border-border/50 bg-secondary/20">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Battlecard</Badge>
              <span className="text-xs text-muted-foreground">{focusedSignal?.type}</span>
            </div>
            <SheetTitle className="text-2xl">Why Now: {focusedSignal?.company}</SheetTitle>
            <SheetDescription>Strategic synthesis of recent market signals.</SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <h4 className="font-medium text-sm text-foreground mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" /> The Trigger
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {focusedSignal?.description}. Historical data indicates companies undergoing this transition have a 4x higher propensity to evaluate new operational software within 30 days.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-foreground mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> Strategic Approach
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2 bg-secondary/30 p-3 rounded border border-border/50">
                  <span className="font-medium text-foreground min-w-[60px]">Angle 1:</span>
                  <span className="text-muted-foreground">Acknowledge the change and frame our solution as a de-risking mechanism.</span>
                </li>
                <li className="flex items-start gap-2 bg-secondary/30 p-3 rounded border border-border/50">
                  <span className="font-medium text-foreground min-w-[60px]">Angle 2:</span>
                  <span className="text-muted-foreground">Highlight how similar companies navigated this phase using automated workflows.</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-foreground mb-3">Objection Handling</h4>
              <div className="space-y-2">
                <div className="p-3 rounded border border-border">
                  <div className="text-xs font-medium text-amber-500 mb-1">"We have too much change right now"</div>
                  <div className="text-sm text-muted-foreground">"Understood. We deploy invisibly alongside your current tools to handle the transition load without adding new training requirements."</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-border/50 bg-background flex gap-3">
            <Button className="flex-1" onClick={() => { handleSendToOutbound(); setDrawerOpen(false); }}>Deploy to Outbound</Button>
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>Close</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}