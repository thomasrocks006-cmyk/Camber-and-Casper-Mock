import React, { useState } from 'react';
import { ThreeLayer } from '@/components/three-layer';
import { RightPanel, PanelSection } from '@/components/right-panel';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, User, FileText, Activity, Calendar, History } from 'lucide-react';
import { MOCK_RECORDS } from '@/lib/mock-records';

export default function Records() {
  const [activeType, setActiveType] = useState('Companies');
  const [selectedRecordId, setSelectedRecordId] = useState(MOCK_RECORDS[0].id);

  const types = ['Leads', 'Companies', 'Customers', 'Vendors', 'Assets', 'Opportunities', 'Documents'];
  const selectedRecord = MOCK_RECORDS.find(r => r.id === selectedRecordId);

  const leftRail = (
    <div className="space-y-1">
      {types.map(t => (
        <button
          key={t}
          onClick={() => setActiveType(t)}
          className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
            activeType === t 
              ? 'bg-primary/10 text-primary' 
              : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );

  const centre = (
    <div className="flex h-[calc(100vh-140px)] gap-6">
      {/* Left List */}
      <div className="w-1/2 flex flex-col border border-border rounded-xl bg-card overflow-hidden">
        <div className="p-3 border-b border-border bg-secondary/30">
          <input 
            type="text" 
            placeholder="Filter records..." 
            className="w-full bg-background border border-border rounded p-2 text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-border/50">
          {MOCK_RECORDS.map(record => (
            <div 
              key={record.id}
              onClick={() => setSelectedRecordId(record.id)}
              className={`p-4 cursor-pointer transition-colors ${selectedRecordId === record.id ? 'bg-primary/5 border-l-2 border-l-primary' : 'hover:bg-secondary/30 border-l-2 border-l-transparent'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium text-foreground">{record.name}</div>
                <Badge variant={record.health === 'Healthy' ? 'secondary' : 'destructive'} className="text-[10px]">
                  {record.health}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {record.owner}</span>
                <span className="flex items-center gap-1"><History className="w-3 h-3" /> {record.lastUpdated}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Detail */}
      <div className="w-1/2 flex flex-col border border-border rounded-xl bg-card overflow-hidden">
        {selectedRecord ? (
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded bg-secondary flex items-center justify-center border border-border">
                  <Building2 className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{selectedRecord.name}</h2>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    {selectedRecord.type} • {selectedRecord.status}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-3 rounded border border-border bg-secondary/30">
                  <div className="text-xs text-muted-foreground mb-1">Account Owner</div>
                  <div className="font-medium text-sm">{selectedRecord.owner}</div>
                </div>
                <div className="p-3 rounded border border-border bg-secondary/30">
                  <div className="text-xs text-muted-foreground mb-1">Value</div>
                  <div className="font-medium text-sm">$125,000</div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-sm font-medium text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="w-px h-full bg-border mt-2"></div>
                  </div>
                  <div className="pb-4">
                    <div className="text-sm font-medium">Technical Validation Sync</div>
                    <div className="text-xs text-muted-foreground mb-2">Yesterday, 2:00 PM</div>
                    <div className="text-sm text-foreground/80 bg-secondary/30 p-3 rounded border border-border">
                      Confirmed API rate limits meet requirements. Security review requested.
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                      <FileText className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="pb-4">
                    <div className="text-sm font-medium">SOC2 Report Shared</div>
                    <div className="text-xs text-muted-foreground mb-2">2 days ago, via Ironbark System</div>
                  </div>
                </div>
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
      <PanelSection title="AI Summary">
        <div className="p-3 bg-secondary/50 rounded-lg border border-border text-sm text-foreground/80 leading-relaxed">
          {selectedRecord.summary}
        </div>
      </PanelSection>

      <PanelSection title="Related Risks">
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-2 rounded border border-amber-500/20 bg-amber-500/10 text-sm text-amber-500">
             <Activity className="w-4 h-4" /> Competitor evaluation active
          </div>
        </div>
      </PanelSection>

      <PanelSection title="Recommended Action">
        <div className="p-3 bg-primary/5 rounded border border-primary/20 text-sm text-foreground/90">
          Fast-track security review bypass for CTO. Prepare alternative deployment architecture.
        </div>
      </PanelSection>
    </RightPanel>
  ) : <div />;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h1 className="text-xl font-semibold">Records</h1>
          <p className="text-sm text-muted-foreground">System of record and entity management</p>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <ThreeLayer leftRail={leftRail} centre={centre} rightPanel={rightPanel} />
      </div>
    </div>
  );
}
