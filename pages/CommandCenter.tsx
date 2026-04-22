import React, { useState } from 'react';
import { useAppStore } from '../store';
import { StatStrip } from '../components/stat-strip';
import { RightPanel, PanelSection, ConfidenceScore } from '../components/right-panel';
import { ShieldAlert, Zap, Briefcase, CheckCircle2, ChevronRight, Activity, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommandCenter() {
  const { stats, responsePacks, approveResponsePack, addLeadToLane } = useAppStore();
  const { toast } = useToast();
  
  const pendingPacks = responsePacks.filter(rp => rp.status === 'pending');
  const [focusedPackId, setFocusedPackId] = useState<string | null>(pendingPacks[0]?.id || null);
  const focusedPack = responsePacks.find(rp => rp.id === focusedPackId);

  const handleApprove = (e: React.MouseEvent, packId: string) => {
    e.stopPropagation();
    const pack = responsePacks.find(rp => rp.id === packId);
    if (!pack) return;
    
    approveResponsePack(packId);
    toast({ 
      title: "Response Pack Approved", 
      description: `${pack.leadsAffected} leads moved to ${pack.targetLane} lane.` 
    });
    
    const remaining = responsePacks.filter(rp => rp.status === 'pending' && rp.id !== packId);
    if (remaining.length > 0) setFocusedPackId(remaining[0].id);
  };

  const statItems = [
    { label: "Active Strategies", value: 8, trend: 1 },
    { label: "Opportunities at Risk", value: 2, trend: -1 },
    { label: "Conversion Prob.", value: "68%", trend: 4 },
    { label: "Pipeline Coverage", value: "3.2x" }
  ];

  return (
    <div className="flex flex-col h-full">
      <StatStrip items={statItems} />
      
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Rail */}
        <div className="w-64 flex-shrink-0 border-r border-border bg-card/30 flex flex-col p-4 overflow-y-auto">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Strategic Priorities</h3>
          <div className="space-y-1">
            {[
              { label: 'All Activity', count: 24 },
              { label: 'High Priority', count: 6 },
              { label: 'Today Only', count: 9 },
              { label: 'At Risk', count: 2 },
              { label: 'Waiting on You', count: 4 },
              { label: 'Opportunities', count: 7 },
            ].map(view => (
              <button key={view.label} className="w-full text-left px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors flex justify-between items-center group">
                <span className="text-foreground/80 group-hover:text-foreground">{view.label}</span>
                <span className="text-xs text-muted-foreground">{view.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Centre */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="p-6 rounded-xl border border-primary/20 bg-primary/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <h2 className="text-2xl font-semibold mb-2 text-foreground">Daily Brief</h2>
            <p className="text-foreground/80 leading-relaxed text-lg max-w-3xl">
              3 high-value leads moved to ready state overnight. One competitor pricing shift increases conversion probability in your switch-target segment. 2 opportunities are at risk due to delayed follow-up.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" /> Strategic Response Packs
              </h3>
              <Badge variant="outline" className="text-amber-500 border-amber-500/20 bg-amber-500/10">Action Required</Badge>
            </div>
            
            <div className="grid gap-4">
              <AnimatePresence>
                {pendingPacks.map(pack => (
                  <motion.div
                    key={pack.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => setFocusedPackId(pack.id)}
                    className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col gap-4 ${focusedPackId === pack.id ? 'border-primary bg-card shadow-[0_0_15px_rgba(var(--primary),0.1)]' : 'border-border bg-card/50 hover:border-primary/50'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold mb-1 text-foreground">{pack.title}</h4>
                        <p className="text-sm text-muted-foreground">{pack.description}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm font-medium">
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-muted-foreground">Impact</span>
                          <span>{pack.leadsAffected} Leads</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-muted-foreground">Target</span>
                          <span className="text-primary">{pack.targetLane}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end gap-3 mt-2 pt-4 border-t border-border/50">
                      <Button variant="ghost" size="sm" className="text-muted-foreground">Modify</Button>
                      <Button variant="default" size="sm" onClick={(e) => handleApprove(e, pack.id)} className="gap-2">
                        <Play className="w-4 h-4 fill-current" /> Deploy to Outbound
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {pendingPacks.length === 0 && (
                <div className="p-8 text-center border border-border border-dashed rounded-xl text-muted-foreground">
                  No active response packs requiring approval.
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-border bg-card">
              <h3 className="text-base font-medium mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-primary" /> Competitor Signal Feed</h3>
              <div className="space-y-3">
                {[
                  { name: 'Competitor X', move: 'Raised list price 15%', when: '4h ago', impact: 'High' },
                  { name: 'Competitor Y', move: 'New CFO appointed; cost-cutting tour', when: '1d ago', impact: 'Medium' },
                  { name: 'Competitor Z', move: 'Outage reported by 3 of our prospects', when: '2d ago', impact: 'High' },
                ].map((c, i) => (
                  <div key={i} className="p-3 rounded-lg bg-secondary/30 border border-border/50">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm text-foreground">{c.name}</div>
                      <Badge variant="outline" className={c.impact === 'High' ? 'text-amber-400 border-amber-500/30 bg-amber-500/10' : 'text-muted-foreground'}>{c.impact}</Badge>
                    </div>
                    <div className="text-sm text-foreground/80 mt-1">{c.move}</div>
                    <div className="text-xs text-muted-foreground mt-1">{c.when}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-xl border border-primary/20 bg-primary/5">
              <h3 className="text-base font-medium mb-4 flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-primary" /> Battlecard · Competitor X</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">When you'll hear it</div>
                  <div className="text-foreground/90">"We already use Competitor X and it's cheaper."</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Position</div>
                  <div className="text-foreground/90">Lead with the 15% price hike; anchor on price-lock guarantee + faster onboarding.</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Proof points</div>
                  <ul className="list-disc list-inside text-foreground/80 space-y-1">
                    <li>3 customers switched in the last 30 days</li>
                    <li>2.4× faster invoice cycle in head-to-head pilots</li>
                    <li>Native ATO/STP filing — Competitor X bolt-on</li>
                  </ul>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">Last refreshed by Ironbark · 12m ago</span>
                  <Button variant="ghost" size="sm" className="text-primary">Open full card <ArrowRight className="w-4 h-4 ml-1" /></Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-border bg-card">
              <h3 className="text-base font-medium mb-4 flex items-center gap-2"><Briefcase className="w-4 h-4 text-muted-foreground" /> Top Opportunities</h3>
              <div className="space-y-3">
                {[
                  { name: 'Apex Construction', value: 48, prob: 82 },
                  { name: 'BlueSky Health', value: 36, prob: 74 },
                  { name: 'Pioneer Systems', value: 22, prob: 65 },
                ].map(opp => (
                  <div key={opp.name} className="p-3 rounded-lg bg-secondary/30 flex justify-between items-center border border-border/50">
                    <div>
                      <div className="font-medium text-sm text-foreground">{opp.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Source: Outbound</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm text-green-400">${opp.value},000</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{opp.prob}% prob</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-5 rounded-xl border border-border bg-card">
              <h3 className="text-base font-medium mb-4 flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-amber-500" /> Watch & Risk</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-amber-500 font-medium text-sm">
                    <ShieldAlert className="w-4 h-4" /> Delayed Follow-up
                  </div>
                  <div className="text-sm text-foreground/80">Apex Construction waiting &gt; 48h</div>
                  <div className="text-xs text-muted-foreground flex items-center justify-between mt-1">
                    <span>Suggested Fix: Draft prepared</span>
                    <button className="text-primary hover:underline font-medium">Apply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Intelligence Panel */}
        <RightPanel title="Strategic Synthesis">
          {focusedPack ? (
            <>
              <PanelSection title="Strategy Rationale">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Competitor X recently raised prices by 15%. This creates an immediate window to approach {focusedPack.leadsAffected} leads currently using their platform with a price-lock guarantee.
                </p>
              </PanelSection>
              <PanelSection title="Predicted Outcome">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Expected Booking Rate</span>
                    <span className="font-medium text-foreground">22%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pipeline Potential</span>
                    <span className="font-medium text-green-400">$180,000</span>
                  </div>
                </div>
              </PanelSection>
              <PanelSection title="System Confidence">
                <ConfidenceScore score={88} label="Success Probability" />
              </PanelSection>
            </>
          ) : (
            <PanelSection title="System State">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-primary font-medium">
                  <CheckCircle2 className="w-4 h-4" /> Healthy
                </div>
                <div className="text-sm text-foreground/80">
                  Confidence high across active lanes. Recommended focus on conversion of pending quotes.
                </div>
              </div>
            </PanelSection>
          )}
        </RightPanel>
      </div>
    </div>
  );
}