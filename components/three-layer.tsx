import React from "react";

interface ThreeLayerProps {
  leftRail: React.ReactNode;
  centre: React.ReactNode;
  rightPanel: React.ReactNode;
}

export function ThreeLayer({ leftRail, centre, rightPanel }: ThreeLayerProps) {
  return (
    <div className="flex h-full w-full overflow-hidden bg-background">
      {/* Left Rail */}
      <div className="w-[240px] md:w-[260px] flex-shrink-0 border-r border-white/[0.04] hidden md:flex flex-col">
        <div className="flex-1 overflow-y-auto scroll-slim">
          <div className="p-4 flex flex-col gap-3">{leftRail}</div>
        </div>
      </div>

      {/* Centre */}
      <div className="flex-1 min-w-0 flex flex-col bg-background">
        <div className="flex-1 overflow-y-auto scroll-slim">
          <div className="p-5 md:p-6 flex flex-col gap-5 w-full">
            {centre}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-[300px] md:w-[340px] flex-shrink-0 border-l border-white/[0.04] hidden lg:flex flex-col">
        <div className="flex-1 overflow-y-auto scroll-slim">
          <div className="p-5 flex flex-col gap-5">{rightPanel}</div>
        </div>
      </div>
    </div>
  );
}
