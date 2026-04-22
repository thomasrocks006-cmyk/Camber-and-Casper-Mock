import React from "react";
import { cn } from "@/lib/utils";

interface DiscProfile {
  primaryType: string;
  secondaryType?: string;
  dScore: number;
  iScore: number;
  sScore: number;
  cScore: number;
}

interface DiscBarsProps {
  disc: DiscProfile;
  className?: string;
}

export function DiscBars({ disc, className }: DiscBarsProps) {
  const scores = {
    D: Math.round(disc.dScore * 100),
    I: Math.round(disc.iScore * 100),
    S: Math.round(disc.sScore * 100),
    C: Math.round(disc.cScore * 100),
  };

  const colors = {
    D: "bg-red-500",
    I: "bg-amber-500",
    S: "bg-green-500",
    C: "bg-blue-500",
  };

  return (
    <div className={cn("flex items-end gap-2 h-20", className)}>
      {Object.entries(scores).map(([trait, score]) => (
        <div key={trait} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full bg-secondary/30 rounded-t-sm flex-1 flex items-end overflow-hidden">
            <div
              className={cn(
                "w-full transition-all duration-1000 ease-out rounded-t-sm",
                colors[trait as keyof typeof colors],
                trait !== disc.primaryType &&
                  trait !== disc.secondaryType &&
                  "opacity-30",
              )}
              style={{ height: `${score}%` }}
            />
          </div>
          <span className="text-[10px] font-bold text-muted-foreground">
            {trait}
          </span>
        </div>
      ))}
    </div>
  );
}
