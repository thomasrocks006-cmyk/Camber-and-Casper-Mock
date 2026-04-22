import React from 'react';
import { cn } from '@/lib/utils';
import { OutboundLane } from '../store';
import { Activity } from 'lucide-react';

interface LaneCardProps {
  lane: OutboundLane;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function LaneCard({ lane, isSelected, onClick, className }: LaneCardProps) {
  const getStatusColor = (state: string) => {
    switch (state) {
      case 'Pre-Approved': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Review Required': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'Blocked': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'Active': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-muted-foreground bg-secondary border-border';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={cn(
        "p-4 rounded-xl border transition-all cursor-pointer group flex flex-col gap-3",
        isSelected 
          ? "border-primary bg-primary/5 shadow-md shadow-primary/5" 
          : "border-border bg-card hover:border-primary/50 hover:bg-card/80",
        className
      )}
    >
      <div className="flex justify-between items-start gap-2">
        <h4 className="font-medium leading-tight">{lane.name}</h4>
        <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap", getStatusColor(lane.state))}>
          {lane.state}
        </span>
      </div>
      
      <div className="flex items-center gap-4 text-sm mt-1">
        <div className="flex flex-col">
          <span className="text-muted-foreground text-xs">Leads</span>
          <span className="font-semibold">{lane.count}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground text-xs">Est. Book</span>
          <span className="font-semibold">{lane.bookingRate}%</span>
        </div>
        <div className="flex flex-col ml-auto text-right">
          <span className="text-muted-foreground text-xs">Value</span>
          <span className="font-semibold text-green-400">${(lane.valueAud / 1000).toFixed(1)}k</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-1 pt-3 border-t border-border/50">
        <span className="text-xs font-medium text-muted-foreground">{lane.strategy}</span>
        <Activity className="w-4 h-4 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}
