import React, { useState } from 'react';
import { ThreeLayer } from '@/components/three-layer';
import { RightPanel, PanelSection } from '@/components/right-panel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mail, MessageSquare, Phone, Calendar, Clock, Send, Sparkles, AlertTriangle } from 'lucide-react';
import { MOCK_INBOX_THREADS } from '@/lib/mock-inbox';

export default function Inbox() {
  const [activeFolder, setActiveFolder] = useState('Action Queue');
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(MOCK_INBOX_THREADS[0]?.id || null);

  const folders = [
    { name: 'Action Queue', count: 12, icon: Sparkles },
    { name: 'Email', count: 45, icon: Mail },
    { name: 'Messages', count: 8, icon: MessageSquare },
    { name: 'Calls', count: 3, icon: Phone },
    { name: 'Meetings', count: 2, icon: Calendar },
    { name: 'Drafts', count: 5, icon: Clock },
  ];

  const selectedThread = MOCK_INBOX_THREADS.find(t => t.id === selectedThreadId);

  const leftRail = (
    <div className="space-y-1">
      {folders.map(folder => {
        const Icon = folder.icon;
        return (
          <button
            key={folder.name}
            onClick={() => setActiveFolder(folder.name)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              activeFolder === folder.name 
                ? 'bg-primary/10 text-primary' 
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-4 h-4" />
              {folder.name}
            </div>
            <Badge variant="secondary" className={`text-xs ${activeFolder === folder.name ? 'bg-primary/20 text-primary' : ''}`}>
              {folder.count}
            </Badge>
          </button>
        );
      })}
    </div>
  );

  const centre = (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex-1 overflow-auto border border-border rounded-xl bg-card divide-y divide-border/50">
        {MOCK_INBOX_THREADS.map(thread => (
          <div 
            key={thread.id}
            onClick={() => setSelectedThreadId(thread.id)}
            className={`p-4 cursor-pointer transition-colors ${selectedThreadId === thread.id ? 'bg-primary/5' : 'hover:bg-secondary/30'}`}
          >
            <div className="flex justify-between items-start mb-1">
              <div className="font-medium text-foreground">{thread.sender} <span className="text-muted-foreground font-normal ml-1">({thread.company})</span></div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">{thread.time}</div>
            </div>
            <div className="text-sm font-medium text-foreground/90 mb-1">{thread.subject}</div>
            <div className="text-sm text-muted-foreground line-clamp-1 mb-3">{thread.preview}</div>
            
            {thread.commitments.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {thread.commitments.map((c, i) => (
                  <Badge key={i} variant="outline" className="bg-secondary/50 text-[10px] text-muted-foreground font-normal border-border/50">
                    <CheckCircleIcon className="w-3 h-3 mr-1 opacity-50" /> {c}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedThread?.draft && (
        <Card className="p-0 border-primary/20 bg-card overflow-hidden">
          <div className="bg-primary/5 px-4 py-2 border-b border-primary/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Sparkles className="w-4 h-4" /> Prepared Draft
            </div>
          </div>
          <div className="p-4">
            <div className="text-sm text-foreground/90 whitespace-pre-wrap font-mono bg-secondary/20 p-3 rounded border border-border/50">
              {selectedThread.draft}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" size="sm">Edit</Button>
              <Button size="sm" className="bg-primary text-primary-foreground">
                <Send className="w-4 h-4 mr-2" /> Send
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );

  const rightPanel = selectedThread ? (
    <RightPanel title="Thread Intelligence">
      <PanelSection title="Ironbark Synthesis">
        <div className="p-3 bg-secondary/50 rounded-lg border border-border text-sm text-foreground/80 space-y-2">
          <p>{selectedThread.rationale}</p>
        </div>
      </PanelSection>

      <PanelSection title="Extracted Action Items">
        <div className="space-y-2">
          {selectedThread.commitments.map((c, i) => (
            <div key={i} className="flex items-start gap-2 p-2 rounded border border-border bg-card">
              <div className="mt-0.5 w-4 h-4 rounded border border-primary/50 flex-shrink-0" />
              <span className="text-sm text-foreground/90">{c}</span>
            </div>
          ))}
        </div>
      </PanelSection>

      <PanelSection title="Linked Context">
        <div className="p-3 rounded-lg border border-border bg-card text-sm space-y-3">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Company Profile</div>
            <div className="font-medium text-foreground">{selectedThread.company}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Current Stage</div>
            <Badge variant="outline" className="bg-secondary">Technical Validation</Badge>
          </div>
        </div>
      </PanelSection>
      
      {selectedThread.type === 'Email' && (
        <div className="mt-8 text-center text-xs font-medium text-amber-500 bg-amber-500/10 py-2 rounded border border-amber-500/20">
          This email thread changed lead priority to High.
        </div>
      )}
      {selectedThread.type === 'Call' && (
        <div className="mt-8 text-center text-xs font-medium text-green-500 bg-green-500/10 py-2 rounded border border-green-500/20">
          Meeting created 4 action items automatically.
        </div>
      )}
    </RightPanel>
  ) : <div />;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h1 className="text-xl font-semibold">Inbox</h1>
          <p className="text-sm text-muted-foreground">Unified communications and intelligence</p>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <ThreeLayer leftRail={leftRail} centre={centre} rightPanel={rightPanel} />
      </div>
    </div>
  );
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}
