import React from "react";
import { ScrollArea } from "./ui/scroll-area";

interface ThreeLayerProps {
  leftRail: React.ReactNode;
  centre: React.ReactNode;
  rightPanel: React.ReactNode;
}

export function ThreeLayer({ leftRail, centre, rightPanel }: ThreeLayerProps) {
  return (
    <div className="flex h-full w-full overflow-hidden bg-background">
      {/* Left Rail */}
      <div className="w-[260px] md:w-[300px] flex-shrink-0 border-r border-border/50 bg-background/50 hidden md:flex flex-col">
        <ScrollArea className="h-full">
          <div className="p-4 flex flex-col gap-4">{leftRail}</div>
        </ScrollArea>
      </div>

      {/* Centre */}
      <div className="flex-1 min-w-0 flex flex-col bg-background">
        <ScrollArea className="h-full">
          <div className="p-6 md:p-8 flex flex-col gap-6 max-w-5xl mx-auto w-full">
            {centre}
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel */}
      <div className="w-[320px] md:w-[360px] flex-shrink-0 border-l border-border/50 bg-background/30 hidden lg:flex flex-col">
        <ScrollArea className="h-full">
          <div className="p-6 flex flex-col gap-6">{rightPanel}</div>
        </ScrollArea>
      </div>
    </div>
  );
}
