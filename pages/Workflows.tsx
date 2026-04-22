import React, { useState } from "react";
import { ThreeLayer } from "@/components/three-layer";
import {
  RightPanel,
  PanelSection,
  ConfidenceScore,
} from "@/components/right-panel";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ShieldAlert,
  Workflow,
  Clock,
  Layers,
  Zap,
} from "lucide-react";
import { MOCK_WORKFLOWS } from "@/lib/mock-workflow";

export default function Workflows() {
  const [activeCategory, setActiveCategory] = useState("Approvals");
  const [selectedTask, setSelectedTask] = useState(MOCK_WORKFLOWS[0]);

  const categories = [
    "Approvals",
    "Follow-ups",
    "Campaigns",
    "Billing",
    "Compliance",
    "Meetings",
    "Automations",
  ];

  const leftRail = (
    <div className="space-y-1">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
            activeCategory === cat
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );

  const centre = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">{activeCategory} Queue</h2>
        <Button variant="outline" size="sm" className="bg-secondary/50">
          Bulk Approve All
        </Button>
      </div>

      <div className="space-y-4">
        {MOCK_WORKFLOWS.filter((w) => {
          const tabCategoryMap: Record<string, string> = {
            Approvals: "Approval",
            "Follow-ups": "Follow-up",
            Campaigns: "Campaign",
            Billing: "Billing",
            Compliance: "Compliance",
            Meetings: "Meeting",
            Automations: "Automation",
          };
          const mapped = tabCategoryMap[activeCategory];
          return !mapped || w.category === mapped;
        }).map((task) => (
          <Card
            key={task.id}
            className={`p-5 cursor-pointer transition-colors border ${selectedTask.id === task.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"}`}
            onClick={() => setSelectedTask(task)}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${task.category === "Compliance" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}
                >
                  {task.category === "Compliance" ? (
                    <ShieldAlert className="w-5 h-5" />
                  ) : (
                    <Workflow className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-base">
                    {task.title}
                  </h3>
                  <div className="text-sm text-muted-foreground mt-0.5">
                    Target: {task.target}
                  </div>
                </div>
              </div>
              <Badge
                variant={task.priority === "High" ? "destructive" : "secondary"}
              >
                {task.priority}
              </Badge>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-500" /> {task.trigger}
                </span>
                <span>Created 10m ago</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Review
                </Button>
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground"
                >
                  Approve
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const rightPanel = (
    <RightPanel title="Task Intelligence">
      <PanelSection title="Ironbark Rationale">
        <div className="p-3 bg-primary/5 rounded-lg border border-primary/10 text-sm text-foreground/80 space-y-2">
          <span className="text-xs text-primary font-medium block mb-1">
            Prepared by Ironbark
          </span>
          <p>
            {selectedTask.category === "Approval"
              ? `Ironbark prepared this approval based on the trigger: "${selectedTask.trigger}". Target: ${selectedTask.target}. All pre-conditions verified.`
              : selectedTask.category === "Follow-up"
                ? `${selectedTask.target} has not responded in the expected window. Ironbark drafted a follow-up based on previous call context and DISC adaptation for this contact.`
                : selectedTask.category === "Campaign"
                  ? `Signal detected: ${selectedTask.trigger}. Campaign drafted and segmented for ${selectedTask.target}. Copy adapted per profile type.`
                  : selectedTask.category === "Compliance"
                    ? `A compliance flag requires human review. Ironbark has staged the resolution path — awaiting your confirmation before proceeding.`
                    : selectedTask.category === "Billing"
                      ? `Financial action prepared. ${selectedTask.target} — ${selectedTask.trigger}. Ironbark cross-checked against Xero reconciliation before staging.`
                      : selectedTask.category === "Meeting"
                        ? `Meeting brief auto-compiled from CRM, recent calls, and DISC profile. Adapted specifically for the personas involved.`
                        : `Automation sequence triggered. ${selectedTask.trigger}. Ironbark staged the run pending your approval.`}
          </p>
        </div>
      </PanelSection>

      <PanelSection title="Source Trigger">
        <div className="flex items-center gap-2 p-2 rounded border border-border bg-card text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium text-foreground">
            {selectedTask.trigger}
          </span>
        </div>
      </PanelSection>

      <PanelSection title="Policy Basis">
        <div className="p-3 bg-secondary/40 rounded border border-border/60 text-sm text-foreground/90">
          <span className="font-medium text-primary block mb-1">
            Execution Rule:
          </span>
          {selectedTask.policyBasis}
        </div>
      </PanelSection>

      <PanelSection title="Execution Impact">
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 rounded bg-secondary/30 border border-border/50">
            <span className="text-muted-foreground">Target scope</span>
            <span className="font-medium text-foreground">
              {selectedTask.target}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-secondary/30 border border-border/50">
            <span className="text-muted-foreground">Category</span>
            <Badge variant="secondary" className="text-xs">
              {selectedTask.category}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-secondary/30 border border-border/50">
            <span className="text-muted-foreground">Priority</span>
            <span
              className={`text-xs font-semibold ${selectedTask.priority === "High" ? "text-red-400" : selectedTask.priority === "Medium" ? "text-amber-400" : "text-muted-foreground"}`}
            >
              {selectedTask.priority}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-secondary/30 border border-border/50">
            <span className="text-muted-foreground">Reversible</span>
            <span className="text-xs font-medium text-green-400">
              {selectedTask.category === "Compliance"
                ? "No — manual only"
                : "Yes — within 24h"}
            </span>
          </div>
        </div>
      </PanelSection>

      <PanelSection title="Audit Trail">
        <div className="space-y-2">
          {[
            {
              label: "Trigger detected",
              detail: selectedTask.trigger,
              who: "Ironbark",
            },
            {
              label: "Policy matched",
              detail: selectedTask.policyBasis,
              who: "Ironbark",
            },
            {
              label: "Task staged for review",
              detail: `Queued in ${selectedTask.category} lane`,
              who: "Ironbark",
            },
          ].map((ev, i) => (
            <div
              key={i}
              className="text-xs flex gap-2 p-2 rounded bg-secondary/20 border border-border/40"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-foreground">{ev.label}</span>
                <span className="text-muted-foreground"> — {ev.detail}</span>
                <div className="text-muted-foreground/60 mt-0.5">{ev.who}</div>
              </div>
            </div>
          ))}
        </div>
      </PanelSection>

      <ConfidenceScore
        score={selectedTask.confidence}
        label="Task Confidence"
      />
    </RightPanel>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h1 className="text-xl font-semibold">Workflows</h1>
          <p className="text-sm text-muted-foreground">
            Orchestration and approval queues
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
