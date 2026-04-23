import React, { useState } from "react";
import { ThreeLayer } from "@/components/three-layer";
import { RightPanel, PanelSection } from "@/components/right-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Mail,
  MessageSquare,
  Phone,
  Calendar,
  Clock,
  Send,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MOCK_INBOX_THREADS } from "@/lib/mock-inbox";

export default function Inbox() {
  const [activeFolder, setActiveFolder] = useState("Action Queue");
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(
    MOCK_INBOX_THREADS[0]?.id || null,
  );
  const [sentDrafts, setSentDrafts] = useState<Set<string>>(new Set());
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const folders = [
    {
      name: "Action Queue",
      count: MOCK_INBOX_THREADS.filter((t) => t.status === "unread").length,
      icon: Sparkles,
    },
    {
      name: "Email",
      count: MOCK_INBOX_THREADS.filter((t) => t.type === "Email").length,
      icon: Mail,
    },
    {
      name: "Messages",
      count: MOCK_INBOX_THREADS.filter((t) => t.type === "Message").length,
      icon: MessageSquare,
    },
    {
      name: "Calls",
      count: MOCK_INBOX_THREADS.filter((t) => t.type === "Call").length,
      icon: Phone,
    },
    {
      name: "Meetings",
      count: MOCK_INBOX_THREADS.filter((t) => t.type === "Meeting").length,
      icon: Calendar,
    },
    {
      name: "Drafts",
      count: MOCK_INBOX_THREADS.filter((t) => !!t.draft).length,
      icon: Clock,
    },
  ];

  const folderTypeMap: Record<string, string | null> = {
    "Action Queue": null,
    Email: "Email",
    Messages: "Message",
    Calls: "Call",
    Meetings: "Meeting",
    Drafts: null,
  };

  const visibleThreads = MOCK_INBOX_THREADS.filter((t) => {
    if (activeFolder === "Action Queue") return t.status === "unread";
    if (activeFolder === "Drafts") return !!t.draft;
    const typeFilter = folderTypeMap[activeFolder];
    return typeFilter ? t.type === typeFilter : true;
  });

  const selectedThread = MOCK_INBOX_THREADS.find(
    (t) => t.id === selectedThreadId,
  );

  const leftRail = (
    <div className="space-y-1">
      {folders.map((folder) => {
        const Icon = folder.icon;
        return (
          <button
            key={folder.name}
            onClick={() => setActiveFolder(folder.name)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              activeFolder === folder.name
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-4 h-4" />
              {folder.name}
            </div>
            <Badge
              variant="secondary"
              className={`text-xs ${activeFolder === folder.name ? "bg-primary/20 text-primary" : ""}`}
            >
              {folder.count}
            </Badge>
          </button>
        );
      })}
    </div>
  );

  const centre = (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex-1 overflow-y-auto scroll-slim border border-border/50 rounded-xl bg-card divide-y divide-border/50">
        {visibleThreads.length === 0 && (
          <div className="p-12 text-center text-muted-foreground text-sm">
            No threads in this folder.
          </div>
        )}
        {visibleThreads.map((thread) => (
          <div
            key={thread.id}
            onClick={() => setSelectedThreadId(thread.id)}
            className={`p-4 cursor-pointer transition-colors ${selectedThreadId === thread.id ? "bg-primary/5" : "hover:bg-secondary/30"}`}
          >
            <div className="flex justify-between items-start mb-1">
              <div className="font-medium text-foreground">
                {thread.sender}{" "}
                <span className="text-muted-foreground font-normal ml-1">
                  ({thread.company})
                </span>
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">
                {thread.time}
              </div>
            </div>
            <div className="text-sm font-medium text-foreground/90 mb-1">
              {thread.subject}
            </div>
            <div className="text-sm text-muted-foreground line-clamp-1 mb-3">
              {thread.preview}
            </div>

            {thread.commitments.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {thread.commitments.map((c, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="bg-secondary/50 text-[10px] text-muted-foreground font-normal border-border/50"
                  >
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
              <Button variant="outline" size="sm" onClick={() => toast({ title: "Edit Mode", description: "Draft opened for editing." })}>
                Edit
              </Button>
              <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => {
                setSentDrafts(prev => new Set(prev).add(selectedThread!.id));
                toast({ title: "Draft Sent", description: `Reply sent to ${selectedThread!.sender}.` });
              }} disabled={sentDrafts.has(selectedThread?.id ?? "")}>
                <Send className="w-4 h-4 mr-2" /> {sentDrafts.has(selectedThread?.id ?? "") ? "Sent" : "Send"}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );

  const rightPanel = selectedThread ? (
    <RightPanel title="Thread Intelligence">
      <PanelSection title="Thread Synthesis">
        <div className="p-3 bg-secondary/50 rounded-lg border border-border text-sm text-foreground/80 space-y-2">
          <p>{selectedThread.rationale}</p>
        </div>
      </PanelSection>

      <PanelSection title="Extracted Action Items">
        <div className="space-y-2">
          {selectedThread.commitments.map((c, i) => {
            const key = `${selectedThread.id}-${i}`;
            const done = completedItems.has(key);
            return (
              <div
                key={i}
                className={`flex items-start gap-2 p-2 rounded border border-border bg-card cursor-pointer transition-colors ${done ? 'opacity-50' : 'hover:bg-secondary/30'}`}
                onClick={() => {
                  setCompletedItems(prev => { const s = new Set(prev); done ? s.delete(key) : s.add(key); return s; });
                }}
              >
                <div className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${done ? 'bg-primary border-primary' : 'border-primary/50'}`}>
                  {done && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span className={`text-sm text-foreground/90 ${done ? 'line-through' : ''}`}>{c}</span>
              </div>
            );
          })}
        </div>
      </PanelSection>

      <PanelSection title="Linked Context">
        <div className="p-3 rounded-lg border border-border bg-card text-sm space-y-3">
          <div>
            <div className="text-xs text-muted-foreground mb-1">
              Company Profile
            </div>
            <div className="font-medium text-foreground">
              {selectedThread.company}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">
              Current Stage
            </div>
            <Badge variant="outline" className="bg-secondary">
              {selectedThread.stage}
            </Badge>
          </div>
        </div>
      </PanelSection>

      {selectedThread.type === "Email" && (
        <div className="mt-8 text-center text-xs font-medium text-amber-500 bg-amber-500/10 py-2 rounded border border-amber-500/20">
          This email thread changed lead priority to High.
        </div>
      )}
      {selectedThread.type === "Call" && (
        <div className="mt-8 text-center text-xs font-medium text-green-500 bg-green-500/10 py-2 rounded border border-green-500/20">
          Meeting created 4 action items automatically.
        </div>
      )}
    </RightPanel>
  ) : (
    <div />
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h1 className="page-title">Inbox</h1>
          <p className="text-sm text-muted-foreground">
            Unified communications and intelligence
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
  );
}
