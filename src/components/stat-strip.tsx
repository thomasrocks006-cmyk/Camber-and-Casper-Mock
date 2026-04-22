import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatItemProps {
  label: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  className?: string;
}

export function StatItem({ label, value, trend, trendLabel, className }: StatItemProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-semibold tracking-tight">{value}</span>
        {trend !== undefined && (
          <div className={cn("flex items-center text-xs font-medium", trend >= 0 ? "text-green-500" : "text-destructive")}>
            {trend >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {Math.abs(trend)}% {trendLabel && <span className="text-muted-foreground ml-1">{trendLabel}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

interface StatStripProps {
  items: StatItemProps[];
  className?: string;
}

export function StatStrip({ items, className }: StatStripProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 border-b border-border bg-card/30", className)}>
      {items.map((item, i) => (
        <StatItem key={i} {...item} />
      ))}
    </div>
  );
}
