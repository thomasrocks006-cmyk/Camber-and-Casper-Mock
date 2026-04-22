import React from 'react';
import { cn } from '@/lib/utils';

interface DiscBarsProps {
  primary: string;
  secondary: string;
  className?: string;
}

export function DiscBars({ primary, secondary, className }: DiscBarsProps) {
  const scores = {
    D: 0,
    I: 0,
    S: 0,
    C: 0
  };

  scores[primary as keyof typeof scores] = 85;
  scores[secondary as keyof typeof scores] = 65;
  
  // Fill others with lower values
  Object.keys(scores).forEach(k => {
    if (k !== primary && k !== secondary) {
      scores[k as keyof typeof scores] = Math.floor(Math.random() * 30) + 15;
    }
  });

  const colors = {
    D: 'bg-red-500',
    I: 'bg-amber-500',
    S: 'bg-green-500',
    C: 'bg-blue-500'
  };

  return (
    <div className={cn("flex items-end gap-2 h-20", className)}>
      {Object.entries(scores).map(([trait, score]) => (
        <div key={trait} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full bg-secondary/30 rounded-t-sm flex-1 flex items-end overflow-hidden">
            <div 
              className={cn("w-full transition-all duration-1000 ease-out rounded-t-sm", colors[trait as keyof typeof colors], (trait !== primary && trait !== secondary) && "opacity-30")} 
              style={{ height: `${score}%` }} 
            />
          </div>
          <span className="text-[10px] font-bold text-muted-foreground">{trait}</span>
        </div>
      ))}
    </div>
  );
}
