import React from 'react';
import { cn } from '@/lib/utils';


interface RightPanelProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function RightPanel({ title = "Assessment", children, className }: RightPanelProps) {
  return (
    <div className={cn("w-80 flex-shrink-0 flex flex-col gap-5 border-l border-white/[0.04] pl-5 overflow-y-auto scroll-slim pb-6 h-full bg-background", className)}>
      <div>
        <h3 className="text-[11px] font-semibold text-muted-foreground/50 uppercase tracking-[0.08em] mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export function PanelSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="mb-5 last:mb-0">
      <h4 className="font-medium text-sm mb-2.5 text-foreground/90">{title}</h4>
      {children}
    </div>
  );
}

export function ConfidenceScore({ score, label = "Confidence" }: { score: number, label?: string }) {
  return (
    <div className="flex items-center gap-2.5 mt-2">
      <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${score}%` }} />
      </div>
      <span className="text-[11px] text-muted-foreground/60 font-medium tabular-nums">{score}% {label}</span>
    </div>
  );
}
