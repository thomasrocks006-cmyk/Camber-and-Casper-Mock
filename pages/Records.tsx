import React, { useState } from "react";
import { ThreeLayer } from "@/components/three-layer";
import { RightPanel, PanelSection } from "@/components/right-panel";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  User,
  Calendar,
  History,
  AlertTriangle,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { MOCK_RECORDS } from "@/lib/mock-records";

export default function Records() {
  const [activeType, setActiveType] = useState("Companies");
  const [selectedRecordId, setSelectedRecordId] = useState(MOCK_RECORDS[0].id);
  const [filterText, setFilterText] = useState("");

  const types = [
    "Leads",
    "Companies",
    "Customers",
    "Vendors",
    "Assets",
    "Opportunities",
    "Documents",
  ];
  const selectedRecord = MOCK_RECORDS.find((r) => r.id === selectedRecordId);

  const leftRail = (
    <div className="space-y-1">
      {types.map((t) => (
        <button
          key={t}
          onClick={() => setActiveType(t)}
          className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
            activeType === t
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );

  const centre = (
    <div className="flex h-full gap-5">
      {/* Left List */}
      <div className="w-1/2 flex flex-col border border-border rounded-xl bg-card overflow-hidden">
        <div className="p-3 border-b border-border bg-secondary/30">
          <input
            type="text"
            placeholder="Filter records..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full bg-background border border-border rounded p-2 text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="flex-1 overflow-y-auto scroll-slim divide-y divide-border/50">
          {MOCK_RECORDS.filter(r => !filterText || r.name.toLowerCase().includes(filterText.toLowerCase()) || r.owner.toLowerCase().includes(filterText.toLowerCase())).map((record) => (
            <div
              key={record.id}
              onClick={() => setSelectedRecordId(record.id)}
              className={`p-4 cursor-pointer transition-colors ${selectedRecordId === record.id ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-secondary/30 border-l-2 border-l-transparent"}`}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium text-foreground">{record.name}</div>
                <Badge
                  variant={
                    record.health === "Healthy" ? "secondary" : "destructive"
                  }
                  className="text-[10px]"
                >
                  {record.health}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" /> {record.owner}
                </span>
                <span className="flex items-center gap-1">
                  <History className="w-3 h-3" /> {record.lastUpdated}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Detail */}
      <div className="w-1/2 flex flex-col border border-border rounded-xl bg-card overflow-hidden">
        {selectedRecord ? (
          <div className="flex-1 overflow-y-auto scroll-slim">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded bg-secondary flex items-center justify-center border border-border">
                  <Building2 className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {selectedRecord.name}
                  </h2>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    {selectedRecord.type} • {selectedRecord.status}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-3 rounded border border-border bg-secondary/30">
                  <div className="text-xs text-muted-foreground mb-1">
                    Account Owner
                  </div>
                  <div className="font-medium text-sm">
                    {selectedRecord.owner}
                  </div>
                </div>
                <div className="p-3 rounded border border-border bg-secondary/30">
                  <div className="text-xs text-muted-foreground mb-1">
                    Health
                  </div>
                  <div
                    className={`font-medium text-sm ${selectedRecord.health === "Warning" ? "text-amber-400" : selectedRecord.health === "Critical" ? "text-red-400" : "text-emerald-400"}`}
                  >
                    {selectedRecord.health}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-sm font-medium text-foreground mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {(
                  selectedRecord.recentActivity ?? [
                    {
                      label: "Record created",
                      detail: "Added to system by Ironbark.",
                      timestamp: selectedRecord.lastUpdated,
                    },
                  ]
                ).map((ev, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Calendar className="w-4 h-4" />
                      </div>
                      {i < (selectedRecord.recentActivity?.length ?? 1) - 1 && (
                        <div className="w-px flex-1 bg-border mt-2" />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="text-sm font-medium">{ev.label}</div>
                      <div className="text-xs text-muted-foreground mb-1">
                        {ev.timestamp}
                      </div>
                      <div className="text-sm text-foreground/80 bg-secondary/30 p-3 rounded border border-border">
                        {ev.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
            Select a record to view details
          </div>
        )}
      </div>
    </div>
  );

  const rightPanel = selectedRecord ? (
    <RightPanel title="Record Intelligence">
      <PanelSection title="Summary">
        <div className="p-3 bg-secondary/50 rounded-lg border border-border text-sm text-foreground/80 leading-relaxed">
          {selectedRecord.summary}
        </div>
      </PanelSection>

      <PanelSection title="Related Risks">
        <div className="space-y-2">
          {selectedRecord.risk ? (
            <div className="flex items-start gap-2 p-2 rounded border border-amber-500/20 bg-amber-500/10 text-sm text-amber-400">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{selectedRecord.risk}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-2 rounded border border-border bg-secondary/30 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4" /> No active risks flagged
            </div>
          )}
        </div>
      </PanelSection>

      <PanelSection title="Recommended Action">
        <div className="p-3 bg-primary/5 rounded border border-primary/20 text-sm text-foreground/90 leading-relaxed">
          <span className="flex items-center gap-1.5 text-xs text-primary font-medium mb-1">
            <Zap className="w-3 h-3" /> Ironbark Recommendation
          </span>
          {selectedRecord.recommendedAction ??
            "No action required at this time."}
        </div>
      </PanelSection>
    </RightPanel>
  ) : (
    <div />
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h1 className="page-title">Records</h1>
          <p className="text-sm text-muted-foreground">
            System of record and entity management
          </p>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <ThreeLayer
          leftRail={leftRail}
          centre={centre}
          rightPanel={rightPanel}
        />
      </div>
    </div>
  );
}
