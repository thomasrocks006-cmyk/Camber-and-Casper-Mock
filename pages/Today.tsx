import React, { useState } from 'react';
import { useAppStore } from '../store';
import { AnimatePresence, motion } from 'framer-motion';
import { StatStrip } from '../components/stat-strip';
import { RightPanel, PanelSection, ConfidenceScore } from '../components/right-panel';
import { Check, CheckCircle2, ChevronRight, X, Edit2, ShieldAlert, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function Today() {
  const { preparedActions, stats, viewMode, approveAction, skipAction } = useAppStore();
  const { toast } = useToast();
  
  const pendingActions = preparedActions.filter(a => a.status === 'pending');
  const [focusedId, setFocusedId] = useState<string | null>(pendingActions[0]?.id || null);

  const focusedAction = pendingActions.find(a => a.id === focusedId) || pendingActions[0];

  const handleApprove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    approveAction(id);
    toast({ title: "Action Approved", description: "Ironbark is executing the action." });
    const remaining = pendingActions.filter(a => a.id !== id);
    if (remaining.length > 0) setFocusedId(remaining[0].id);
  };

  const handleSkip = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    skipAction(id);
    const remaining = pendingActions.filter(a => a.id !== id);
    if (remaining.length > 0) setFocusedId(remaining[0].id);
  };

  const statItems = [
    { label: "Actions Ready", value: stats.actionsReady, trend: 12, trendLabel: "vs yesterday" },
    { label: "Meetings Booked", value: stats.meetingsBooked, trend: 5 },
    { label: "Opportunities", value: stats.opportunitiesCreated, trend: -2 },
    { label: "Execution Speed", value: "1.2s", trend: 15 }
  ];

  return (
    <div className="flex flex-col h-full">
      <StatStrip items={statItems} />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Main Feed */}
        <div className={`flex-1 overflow-y-auto p-6 ${viewMode === 'Simple' ? 'max-w-3xl mx-auto w-full' : ''}`}>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Prepared Actions</h2>
            <div className="text-sm text-muted-foreground">{pendingActions.length} pending approval</div>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {pendingActions.map(action => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setFocusedId(action.id)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${focusedId === action.id ? 'border-primary bg-primary/5 shadow-[0_0_15px_rgba(var(--primary),0.1)]' : 'border-border bg-card hover:border-primary/30'}`}
                >
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${action.impact === 'high' ? 'bg-amber-500/20 text-amber-500' : 'bg-primary/20 text-primary'}`}>
                      <Zap className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium px-2 py-0.5 bg-secondary text-secondary-foreground rounded uppercase tracking-wider">{action.source}</span>
                        {action.impact === 'high' && <span className="text-xs font-medium px-2 py-0.5 bg-amber-500/20 text-amber-500 rounded uppercase tracking-wider">High Impact</span>}
                      </div>
                      <h3 className="text-lg font-medium text-foreground">{action.title}</h3>
                      <div className="text-sm text-muted-foreground mt-1">Prepared by Ironbark · {action.confidence}% confidence</div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <Button variant="default" size="sm" onClick={(e) => handleApprove(e, action.id)} className="w-24">
                        <Check className="w-4 h-4 mr-1" /> Approve
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={(e) => handleSkip(e, action.id)} className="flex-1">
                          <X className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {pendingActions.length === 0 && (
              <div className="p-12 text-center border border-border border-dashed rounded-xl text-muted-foreground flex flex-col items-center">
                <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
                <h3 className="text-lg font-medium text-foreground">All caught up</h3>
                <p>No more prepared actions waiting for your approval.</p>
              </div>
            )}
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight mb-3">Watchpoints</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
                <div className="flex items-center gap-2 mb-1 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                  <ShieldAlert className="w-3.5 h-3.5" /> Anomaly
                </div>
                <div className="text-sm font-medium text-foreground">Pipeline conversion dropped 9% week-over-week in the Switch Targets lane.</div>
                <div className="text-xs text-muted-foreground mt-1">Likely cause: stale battlecard. Ironbark refreshed it 12m ago.</div>
              </div>
              <div className="p-4 rounded-xl border border-primary/30 bg-primary/5">
                <div className="flex items-center gap-2 mb-1 text-primary text-xs font-semibold uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5" /> Cash & Revenue
                </div>
                <div className="text-sm font-medium text-foreground">$18,400 in invoices age past 30 days. Auto-nudge ready for 6 of 9.</div>
                <div className="text-xs text-muted-foreground mt-1">Forecast: 88% confidence to clear by Friday with one approval.</div>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-2 mb-1 text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Payroll
                </div>
                <div className="text-sm font-medium text-foreground">Payroll runs in 2 days. All timesheets reconciled; super accruals on track.</div>
                <div className="text-xs text-muted-foreground mt-1">No action required — Ironbark will file STP on schedule.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Intelligence Panel (Detailed Mode Only) */}
        {viewMode === 'Detailed' && focusedAction && (
          <RightPanel>
            <PanelSection title="Why this matters">
              <p className="text-sm text-muted-foreground leading-relaxed">
                This action is projected to impact pipeline value significantly. It aligns with the current <strong className="text-foreground">Switch Target</strong> strategy which has been highly effective this quarter.
              </p>
            </PanelSection>

            <PanelSection title="What the system used">
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-primary" /> CRM interaction history</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-primary" /> Recent competitor pricing changes</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-primary" /> Executive intent signals</li>
              </ul>
            </PanelSection>

            <PanelSection title="System Confidence">
              <ConfidenceScore score={focusedAction.confidence} label="Match Score" />
              <div className="mt-3 p-3 rounded bg-secondary/30 text-xs text-muted-foreground border border-border/50">
                <div className="flex items-center gap-1.5 font-medium text-foreground mb-1"><ShieldAlert className="w-3 h-3 text-amber-500" /> Compliance Check Passed</div>
                All leads in this action are within their contact window and have provided consent.
              </div>
            </PanelSection>
            
            <PanelSection title="Recommended Next">
              <Button variant="outline" className="w-full justify-between" onClick={() => approveAction(focusedAction.id)}>
                Approve Action <ChevronRight className="w-4 h-4" />
              </Button>
            </PanelSection>
          </RightPanel>
        )}
      </div>
    </div>
  );
}