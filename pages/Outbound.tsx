import React, { useState } from 'react';
import { useAppStore, OutboundLane } from '../store';
import { StatStrip } from '../components/stat-strip';
import { RightPanel, PanelSection, ConfidenceScore } from '../components/right-panel';
import { DiscBars } from '../components/disc-bars';
import { LaneCard } from '../components/lane-card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Play, Phone, PhoneForwarded, Settings2, ShieldAlert,
  ChevronDown, Calendar, Activity, CheckCircle2, BrainCircuit
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';

export default function Outbound() {
  const { outboundLanes, leads, startCall, stats } = useAppStore();
  const { toast } = useToast();
  
  const [focusedLaneId, setFocusedLaneId] = useState<string | null>(outboundLanes[0]?.id || null);
  const [focusedLeadId, setFocusedLeadId] = useState<string | null>(null);
  const [preflightOpen, setPreflightOpen] = useState(false);

  const focusedLane = outboundLanes.find(l => l.id === focusedLaneId);
  const laneLeads = focusedLane ? leads.filter(l => focusedLane.leadIds.includes(l.id)) : [];
  const focusedLead = leads.find(l => l.id === focusedLeadId);

  // Set first lead when lane changes
  React.useEffect(() => {
    if (laneLeads.length > 0 && (!focusedLeadId || !laneLeads.find(l => l.id === focusedLeadId))) {
      setFocusedLeadId(laneLeads[0].id);
    }
  }, [focusedLaneId, laneLeads, focusedLeadId]);

  const handleExecutePlan = () => {
    setPreflightOpen(true);
  };

  const confirmExecution = () => {
    setPreflightOpen(false);
    toast({ title: "Execution Started", description: "Ironbark voice engine engaging." });
    if (laneLeads.length > 0) {
      startCall(laneLeads[0].id);
    }
  };

  const handleCallSingle = (e: React.MouseEvent, leadId: string) => {
    e.stopPropagation();
    startCall(leadId);
  };

  const statItems = [
    { label: "Queued Today", value: outboundLanes.reduce((acc, l) => acc + l.count, 0), trend: 14 },
    { label: "In Progress", value: 12 },
    { label: "Meetings Booked", value: stats.meetingsBooked, trend: 2 },
    { label: "Compliance Blocked", value: 3, trend: -1, trendLabel: "improved" }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h1 className="text-xl font-semibold">Outbound</h1>
          <p className="text-sm text-muted-foreground">Execution lanes and live operations</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary/50 border border-border/50 text-sm">
            <Settings2 className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">Policy: Review Each Lane</span>
            <ChevronDown className="w-3 h-3 text-muted-foreground ml-1" />
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-sm text-green-500 font-medium">
            <CheckCircle2 className="w-4 h-4" /> Pre-Flight Clear
          </div>
          <Button onClick={handleExecutePlan} className="gap-2" disabled={!focusedLane || focusedLane.count === 0}>
            <Play className="w-4 h-4 fill-current" /> Execute Plan
          </Button>
        </div>
      </div>
      
      <StatStrip items={statItems} />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Rail - Strategy Lanes */}
        <div className="w-72 flex-shrink-0 border-r border-border bg-card/30 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border/50 bg-secondary/20">
            <h3 className="text-sm font-medium text-foreground">Strategy Lanes</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {outboundLanes.map(lane => (
              <LaneCard 
                key={lane.id} 
                lane={lane} 
                isSelected={focusedLaneId === lane.id}
                onClick={() => setFocusedLaneId(lane.id)}
              />
            ))}
          </div>
        </div>

        {/* Main Centre - Execution Table */}
        <div className="flex-1 overflow-auto bg-background/50">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">{focusedLane?.name || 'Select a Lane'}</h2>
              <Badge variant="outline" className="bg-secondary">{laneLeads.length} Leads Queued</Badge>
            </div>

            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-secondary/50 border-b border-border text-muted-foreground uppercase tracking-wider text-[10px] font-semibold">
                  <tr>
                    <th className="px-4 py-3">Lead</th>
                    <th className="px-4 py-3">Score</th>
                    <th className="px-4 py-3">Intent</th>
                    <th className="px-4 py-3">DISC</th>
                    <th className="px-4 py-3">Persona</th>
                    <th className="px-4 py-3">Signal Reason</th>
                    <th className="px-4 py-3">Compliance</th>
                    <th className="px-4 py-3">Predicted Outcome</th>
                    <th className="px-4 py-3">Strategy</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {laneLeads.map(lead => (
                    <tr 
                      key={lead.id} 
                      onClick={() => setFocusedLeadId(lead.id)}
                      className={`hover:bg-secondary/30 cursor-pointer transition-colors ${focusedLeadId === lead.id ? 'bg-primary/5' : ''}`}
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium text-foreground">{lead.company}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{lead.contact}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${lead.score >= 80 ? 'bg-green-500/10 text-green-500' : 'bg-secondary text-muted-foreground'}`}>{lead.score}</span>
                      </td>
                      <td className="px-4 py-3">{lead.intent}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-mono font-semibold">{lead.discPrimary}/{lead.discSecondary}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded bg-secondary text-xs">{lead.persona}</span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        {lead.ghostIntel?.switchingSignals?.[0] ?? lead.ghostIntel?.painPoints?.[0] ?? 'Engagement uplift'}
                      </td>
                      <td className="px-4 py-3 text-xs">
                        {lead.compliance?.dncr ? (
                          <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400">DNCR</span>
                        ) : lead.compliance?.consent ? (
                          <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-500">Consent · {lead.compliance.window}</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">Window only</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs">
                        <span className={`px-2 py-0.5 rounded ${lead.score >= 80 ? 'bg-green-500/10 text-green-500' : lead.score >= 65 ? 'bg-amber-500/10 text-amber-400' : 'bg-secondary text-muted-foreground'}`}>
                          {lead.score >= 80 ? 'Likely meeting' : lead.score >= 65 ? 'Qualify call' : 'Long nurture'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{focusedLane?.strategy}</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm" onClick={(e) => handleCallSingle(e, lead.id)} className="h-8 px-2 text-muted-foreground hover:text-primary hover:bg-primary/10">
                          <Phone className="w-4 h-4 mr-1.5" /> Call
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {laneLeads.length === 0 && (
                    <tr>
                      <td colSpan={10} className="px-4 py-8 text-center text-muted-foreground italic">
                        No leads in this lane.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Panel - Pre-Call Intelligence */}
        {focusedLead && (
          <RightPanel title="Pre-Call Intelligence" className="w-[340px]">
            <PanelSection title="Target Profile">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center font-bold text-muted-foreground">
                  {focusedLead.company.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-foreground">{focusedLead.contact}</div>
                  <div className="text-xs text-muted-foreground">{focusedLead.role} @ {focusedLead.company}</div>
                </div>
              </div>
              <DiscBars primary={focusedLead.discPrimary} secondary={focusedLead.discSecondary} />
            </PanelSection>

            <PanelSection title="Call Strategy">
              <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm text-foreground/90 space-y-2">
                <div className="flex items-center gap-2 font-medium text-primary mb-1">
                  <BrainCircuit className="w-4 h-4" /> Recommended Approach
                </div>
                <p>Lead is a <strong>{focusedLead.persona}</strong> type. Focus strictly on ROI and efficiency gains. Skip small talk. Reference their current use of {focusedLead.ghostIntel?.tools[0] || 'legacy tools'} and highlight our superior integration.</p>
              </div>
            </PanelSection>

            <PanelSection title="Objection Forecast">
              <div className="space-y-3">
                <div className="p-3 rounded border border-border bg-card">
                  <div className="text-xs font-medium text-amber-500 mb-1">Likely Objection</div>
                  <div className="text-sm text-foreground/80 mb-2">"We just signed a contract with competitor."</div>
                  <div className="text-xs font-medium text-green-500 mb-1 border-t border-border/50 pt-2">Counter-Response</div>
                  <div className="text-sm text-muted-foreground">Offer the 6-month parallel deployment at zero cost to prove ROI before their renewal.</div>
                </div>
              </div>
            </PanelSection>

            <PanelSection title="Compliance State">
              <div className="flex items-center gap-2 text-sm">
                <ShieldAlert className={`w-4 h-4 ${focusedLead.compliance?.dncr ? 'text-destructive' : 'text-green-500'}`} />
                <span className={focusedLead.compliance?.dncr ? 'text-destructive font-medium' : 'text-foreground'}>
                  {focusedLead.compliance?.dncr ? 'Blocked (DNCR)' : `Clear to call (${focusedLead.compliance?.window || 'Anytime'})`}
                </span>
              </div>
            </PanelSection>
          </RightPanel>
        )}
      </div>

      <Dialog open={preflightOpen} onOpenChange={setPreflightOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Pre-Flight Authorization</DialogTitle>
            <DialogDescription>
              Review execution plan before engaging Ironbark voice engine.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50 border border-border">
              <span className="text-sm font-medium">Target Lane</span>
              <span className="text-sm text-primary font-semibold">{focusedLane?.name}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50 border border-border">
              <span className="text-sm font-medium">Leads Queued</span>
              <span className="text-sm font-semibold">{laneLeads.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50 border border-border">
              <span className="text-sm font-medium">Compliance Check</span>
              <span className="text-sm font-semibold text-green-500 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> All Passed</span>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setPreflightOpen(false)}>Cancel</Button>
            <Button onClick={confirmExecution} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <PhoneForwarded className="w-4 h-4" /> Engage Engine
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}