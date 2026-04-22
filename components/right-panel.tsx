import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, ChevronRight, Info } from 'lucide-react';

interface RightPanelProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function RightPanel({ title = "Ironbark Synthesis", children, className }: RightPanelProps) {
  return (
    <div className={cn("w-80 flex-shrink-0 flex flex-col gap-6 border-l border-border pl-6 overflow-y-auto pb-8 h-full bg-background", className)}>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export function PanelSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="mb-6 last:mb-0">
      <h4 className="font-medium text-sm mb-3 text-foreground">{title}</h4>
      {children}
    </div>
  );
}

export function ConfidenceScore({ score, label = "Confidence" }: { score: number, label?: string }) {
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full" style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs text-muted-foreground font-medium">{score}% {label}</span>
    </div>
  );
}
