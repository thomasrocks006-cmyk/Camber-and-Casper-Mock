import React, { useState } from "react";
import { ThreeLayer } from "@/components/three-layer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAppStore, type AutonomyMode } from "@/store";
import {
  ShieldCheck,
  Database,
  Settings,
  Bell,
  Lock,
  Key,
  Link as LinkIcon,
  CheckCircle2,
} from "lucide-react";

export default function Admin() {
  const [activeSection, setActiveSection] = useState("Execution Policy");
  const { autonomyMode, setAutonomyMode } = useAppStore();

  const sections = [
    { id: "Execution Policy", icon: ShieldCheck },
    { id: "Integrations", icon: LinkIcon },
    { id: "AI Preferences", icon: Settings },
    { id: "Notifications", icon: Bell },
    { id: "Compliance", icon: Lock },
    { id: "Permissions", icon: Key },
    { id: "Audit Logs", icon: Database },
  ];

  const leftRail = (
    <div className="space-y-1">
      <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        Settings
      </div>
      {sections.map((section) => {
        const Icon = section.icon;
        return (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              activeSection === section.id
                ? "bg-primary/10 text-primary border border-primary/20"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent"
            }`}
          >
            <Icon className="w-4 h-4" />
            {section.id}
          </button>
        );
      })}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "Execution Policy":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-2">
                System Autonomy State
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Define the operational limits for the Ironbark engine across
                your workspace.
              </p>

              <Card className="p-6 bg-card border-border">
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Current Mode</Label>
                    <Select
                      value={autonomyMode}
                      onValueChange={(v) => setAutonomyMode(v as AutonomyMode)}
                    >
                      <SelectTrigger className="w-full md:w-[300px] bg-secondary/50 border-border">
                        <SelectValue placeholder="Select autonomy mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Manual Only">Manual Only</SelectItem>
                        <SelectItem value="Review Each Lane">
                          Review Each Lane
                        </SelectItem>
                        <SelectItem value="Execute Pre-Approved">
                          Execute Pre-Approved
                        </SelectItem>
                        <SelectItem value="Autonomous Within Policy">
                          Autonomous Within Policy
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <h4 className="text-sm font-medium mb-3">
                      Granular Controls
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-foreground">
                            Allow Draft Sending
                          </Label>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            System can dispatch emails without review if
                            confidence &gt; 95%
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-foreground">
                            Automatic Strategy Shifts
                          </Label>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            System can move leads between lanes automatically
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-foreground">
                            Price Negotiation
                          </Label>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            System can offer up to 10% discount to close
                          </div>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      case "Integrations":
        const integrations = [
          { name: "Xero", status: "Healthy", type: "Accounting" },
          { name: "Employment Hero", status: "Healthy", type: "Payroll" },
          {
            name: "Workshop Software",
            status: "Warning",
            type: "Job Management",
          },
          {
            name: "Burson Auto Parts",
            status: "Healthy",
            type: "Parts Ordering",
          },
          { name: "Repco Connect", status: "Inactive", type: "Parts Ordering" },
          { name: "Stripe", status: "Healthy", type: "Payments" },
          { name: "SendGrid", status: "Healthy", type: "Email / SMS" },
          { name: "Twilio SMS", status: "Healthy", type: "Email / SMS" },
        ];

        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-medium">Connected Systems</h2>
                <p className="text-sm text-muted-foreground">
                  Manage data sources and execution targets.
                </p>
              </div>
              <Button size="sm">Add Integration</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations.map((int) => (
                <Card
                  key={int.name}
                  className="p-4 flex justify-between items-center bg-card border-border"
                >
                  <div>
                    <div className="font-medium">{int.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {int.type}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`
                    ${int.status === "Healthy" ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}
                    ${int.status === "Warning" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : ""}
                    ${int.status === "Inactive" ? "bg-secondary text-muted-foreground border-border" : ""}
                  `}
                  >
                    {int.status}
                  </Badge>
                </Card>
              ))}
            </div>
          </div>
        );

      case "Compliance":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-1">
                Compliance & Regulatory
              </h2>
              <p className="text-sm text-muted-foreground">
                DNCR status, calling hours, and privacy compliance.
              </p>
            </div>
            <Card className="p-5 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <span className="font-medium text-sm">
                  DNCR Registry Status
                </span>
                <Badge
                  variant="outline"
                  className="bg-green-500/10 text-green-500 border-green-500/20"
                >
                  Compliant
                </Badge>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <span className="font-medium text-sm">
                  Calling Hours Enforcement
                </span>
                <span className="text-xs text-muted-foreground">
                  Mon–Fri 9am–8pm · Sat 9am–5pm (AEST)
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <span className="font-medium text-sm">
                  Privacy Act 1988 (Cth)
                </span>
                <Badge
                  variant="outline"
                  className="bg-green-500/10 text-green-500 border-green-500/20"
                >
                  Compliant
                </Badge>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <span className="font-medium text-sm">Spam Act 2003</span>
                <Badge
                  variant="outline"
                  className="bg-green-500/10 text-green-500 border-green-500/20"
                >
                  Compliant
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">Last Audit</span>
                <span className="text-xs text-muted-foreground">
                  Today 6:00am — Prepared by Ironbark
                </span>
              </div>
            </Card>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Settings className="w-12 h-12 mb-4 opacity-20" />
            <p>Settings panel for {activeSection} to be configured.</p>
          </div>
        );
    }
  };

  const rightPanel = (
    <div className="w-80 flex-shrink-0 flex flex-col gap-6 pl-6 h-full border-l border-border bg-background/30 opacity-50">
      {/* Intentionally empty/light right column as per spec */}
      <div className="text-sm text-muted-foreground italic mt-8 text-center">
        Configuration context will appear here
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h1 className="text-xl font-semibold">Administration</h1>
          <p className="text-sm text-muted-foreground">
            Workspace configuration and policy limits
          </p>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <ThreeLayer
          leftRail={leftRail}
          centre={renderContent()}
          rightPanel={rightPanel}
        />
      </div>
    </div>
  );
}
