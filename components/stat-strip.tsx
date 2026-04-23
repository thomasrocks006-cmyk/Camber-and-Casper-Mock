import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

/** Animate a numeric value from 0 to target over ~600ms */
function useCountUp(target: number, duration = 600) {
  const [val, setVal] = useState(0);
  const ref = useRef(target);
  useEffect(() => {
    ref.current = target;
    let start: number | null = null;
    let frame: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.round(progress * ref.current));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return val;
}

function AnimatedValue({ value }: { value: string | number }) {
  const num = typeof value === 'number' ? value : parseFloat(value);
  const isNumeric = !isNaN(num) && typeof value === 'number';
  const animated = useCountUp(isNumeric ? num : 0);
  if (isNumeric) return <>{animated}</>;
  return <>{value}</>;
}

interface StatItemProps {
  label: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  className?: string;
}

export function StatItem({ label, value, trend, trendLabel, className }: StatItemProps) {
  return (
    <div className={cn("flex flex-col gap-0.5 min-w-0", className)}>
      <span className="label-caps truncate">{label}</span>
      <span className="text-xl font-bold display-metric text-foreground"><AnimatedValue value={value} /></span>
      {trend !== undefined && (
        <div className={cn(
          "flex items-center gap-1 mt-0.5 text-[11px] font-medium px-1.5 py-0.5 rounded-md w-fit",
          trend >= 0
            ? "text-emerald-400 bg-emerald-500/10"
            : "text-red-400 bg-red-500/10"
        )}>
          {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(trend)}%
          {trendLabel && <span className="text-muted-foreground ml-0.5">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}

interface StatStripProps {
  items: StatItemProps[];
  className?: string;
}

export function StatStrip({ items, className }: StatStripProps) {
  return (
    <div className={cn(
      "flex items-start gap-0 px-6 py-4 border-b border-white/[0.06] bg-card/20",
      className
    )}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <div className="w-px self-stretch bg-white/[0.06] mx-5 my-1" />}
          <StatItem {...item} className="flex-1" />
        </React.Fragment>
      ))}
    </div>
  );
}
