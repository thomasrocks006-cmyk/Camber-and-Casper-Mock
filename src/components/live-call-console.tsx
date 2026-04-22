import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../store';
import { Phone, Mic, UserX, Activity, StopCircle, Check } from 'lucide-react';

export function LiveCallConsole() {
  const { callConsole, resetCall, appendTranscript, completeCall } = useAppStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [callConsole.transcript]);

  useEffect(() => {
    if (callConsole.status === 'dialing') {
      const t1 = setTimeout(() => appendTranscript("Dialing..."), 500);
      const t2 = setTimeout(() => {
        useAppStore.setState(s => ({ callConsole: { ...s.callConsole, status: 'connected' } }));
        appendTranscript("Connected. Ironbark voice engine active.");
      }, 2500);
      
      const t3 = setTimeout(() => appendTranscript("Prospect: Hello?"), 3500);
      const t4 = setTimeout(() => appendTranscript("Ironbark: Hi there, calling from Camber & Casper regarding the recent quote."), 5000);
      const t5 = setTimeout(() => appendTranscript("Prospect: Ah yes, I've been meaning to review that."), 7000);
      
      const t6 = setTimeout(() => {
        completeCall(85, 'positive', []);
      }, 9000);

      return () => {
        clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); 
        clearTimeout(t4); clearTimeout(t5); clearTimeout(t6);
      };
    }
    return undefined;
  }, [callConsole.status, callConsole.leadId]);

  if (callConsole.status === 'idle') return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border shadow-2xl z-50 h-64 flex flex-col transition-all duration-300">
      <div className="h-10 border-b border-border/50 flex items-center px-4 justify-between bg-secondary/20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {callConsole.status === 'dialing' && <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />}
            {callConsole.status === 'connected' && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
            {callConsole.status === 'completed' && <span className="w-2 h-2 rounded-full bg-primary" />}
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {callConsole.status === 'dialing' ? 'Dialing' : callConsole.status === 'connected' ? 'Live Call' : 'Completed'}
            </span>
          </div>
          <div className="text-sm font-medium border-l border-border/50 pl-3">
            Lead: {callConsole.leadId || 'Unknown'}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {callConsole.status === 'completed' ? (
            <button onClick={resetCall} className="text-xs bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-1 rounded">
              Close Console
            </button>
          ) : (
            <button onClick={() => completeCall(50, 'neutral', [])} className="text-xs flex items-center gap-1 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground px-3 py-1 rounded transition-colors">
              <StopCircle className="w-3 h-3" /> End Call
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 flex min-h-0">
        <div className="flex-1 border-r border-border/50 p-4 flex flex-col min-h-0 bg-background/50">
          <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
            <Mic className="w-3 h-3" /> Live Transcript
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 pr-2">
            {callConsole.transcript.map((line, i) => (
              <div key={i} className={`text-sm ${line.startsWith('Ironbark:') ? 'text-primary' : line.startsWith('Prospect:') ? 'text-foreground' : 'text-muted-foreground italic'}`}>
                {line}
              </div>
            ))}
            {callConsole.status === 'connected' && (
              <div className="flex items-center gap-1 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>
        </div>
        
        <div className="w-80 p-4 flex flex-col gap-4 bg-card">
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <Activity className="w-3 h-3" /> Vibe Score
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div className={`h-full ${callConsole.vibeScore > 70 ? 'bg-green-500' : callConsole.vibeScore > 40 ? 'bg-amber-500' : 'bg-red-500'} transition-all duration-500`} style={{ width: `${callConsole.vibeScore}%` }} />
              </div>
              <span className="text-lg font-semibold">{callConsole.vibeScore}</span>
            </div>
          </div>
          
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <UserX className="w-3 h-3" /> Objection Detection
            </div>
            <div className="flex flex-wrap gap-2">
              {callConsole.objections.length > 0 ? (
                callConsole.objections.map((obj, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-destructive/10 text-destructive rounded border border-destructive/20">{obj}</span>
                ))
              ) : (
                <span className="text-xs text-muted-foreground italic">No objections detected</span>
              )}
            </div>
          </div>
          
          {callConsole.status === 'completed' && (
            <div className="mt-auto pt-3 border-t border-border/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Post-call Action:</span>
                <span className="font-medium text-green-400 flex items-center gap-1"><Check className="w-3 h-3" /> Follow-up Drafted</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}