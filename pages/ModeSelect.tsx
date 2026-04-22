import React, { useState } from "react";
import { useLocation } from "wouter";
import { useAppStore } from "../store";
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  Settings2,
  Zap,
  Shield,
  BarChart3,
} from "lucide-react";

const WORKSPACES = [
  {
    id: "northside",
    label: "Northside Auto Workshop",
    description: "Demo environment — full scenario loaded",
    initials: "NA",
    type: "Auto Workshop",
  },
  {
    id: "canning",
    label: "Canning Vale Fleet Services",
    description: "Fleet management demo — 34 vehicles",
    initials: "CV",
    type: "Fleet Services",
  },
  {
    id: "generic",
    label: "Generic Demo Workspace",
    description: "Clean slate — no pre-loaded data",
    initials: "GD",
    type: "Generic",
  },
];

const PRESETS = [
  {
    id: "guided",
    label: "Guided",
    icon: Shield,
    viewMode: "Simple" as const,
    autonomy: "Review Each Lane" as const,
    description:
      "High-level summaries and one-tap approvals. Ironbark surfaces only what requires attention. Best for quick check-ins.",
  },
  {
    id: "balanced",
    label: "Balanced",
    icon: BarChart3,
    viewMode: "Detailed" as const,
    autonomy: "Review Each Lane" as const,
    description:
      "Full intelligence surface with human review on every lane. Detailed context, controlled execution.",
    recommended: true,
  },
  {
    id: "full",
    label: "Full Control",
    icon: Zap,
    viewMode: "Detailed" as const,
    autonomy: "Execute Pre-Approved" as const,
    description:
      "Complete strategic control. Execute pre-approved actions automatically across all lanes.",
  },
];

export default function ModeSelect() {
  const [, setLocation] = useLocation();
  const { setViewMode, setAutonomyMode } = useAppStore();
  const [step, setStep] = useState<"workspace" | "preset">("workspace");
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>(
    null,
  );

  const handleSelectWorkspace = (id: string) => {
    setSelectedWorkspace(id);
    setStep("preset");
  };

  const handleSelectPreset = (preset: (typeof PRESETS)[0]) => {
    setViewMode(preset.viewMode);
    setAutonomyMode(preset.autonomy);
    setLocation("/today");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground dark p-6">
      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-10">
        <div
          className={`flex items-center gap-2 text-sm ${step === "workspace" ? "text-primary font-semibold" : "text-muted-foreground"}`}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${step === "workspace" ? "bg-primary text-primary-foreground border-primary" : "bg-secondary border-border"}`}
          >
            {step === "preset" ? <CheckCircle2 className="w-3.5 h-3.5" /> : "1"}
          </div>
          Select Workspace
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <div
          className={`flex items-center gap-2 text-sm ${step === "preset" ? "text-primary font-semibold" : "text-muted-foreground"}`}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${step === "preset" ? "bg-primary text-primary-foreground border-primary" : "bg-secondary border-border"}`}
          >
            2
          </div>
          Operating Mode
        </div>
      </div>

      {step === "workspace" && (
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight mb-2">
              Choose a Workspace
            </h1>
            <p className="text-muted-foreground text-sm">
              Select the demo environment to load.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {WORKSPACES.map((ws) => (
              <button
                key={ws.id}
                onClick={() => handleSelectWorkspace(ws.id)}
                className="text-left p-5 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all flex items-center gap-5 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0 group-hover:bg-primary/20 transition-colors">
                  {ws.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground">
                    {ws.label}
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">
                    {ws.description}
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground border border-border/50 rounded px-2 py-0.5">
                    {ws.type}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "preset" && (
        <div className="max-w-3xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight mb-2">
              Select Operating Mode
            </h1>
            <p className="text-muted-foreground text-sm">
              Choose how much Ironbark does independently. You can change this
              at any time.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {PRESETS.map((preset) => {
              const Icon = preset.icon;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`relative text-left p-6 rounded-2xl border transition-all group flex flex-col ${preset.recommended ? "border-primary/50 bg-primary/5 hover:bg-primary/10" : "border-border bg-card/50 hover:bg-card hover:border-primary/40"}`}
                >
                  {preset.recommended && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest font-semibold bg-primary text-primary-foreground px-3 py-0.5 rounded-full">
                      Recommended
                    </div>
                  )}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${preset.recommended ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-lg font-bold mb-2">{preset.label}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {preset.description}
                  </p>
                  <div className="mt-4 flex flex-col gap-1">
                    <div className="text-xs text-muted-foreground">
                      <span className="text-foreground/70 font-medium">
                        View:
                      </span>{" "}
                      {preset.viewMode}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span className="text-foreground/70 font-medium">
                        Execution:
                      </span>{" "}
                      {preset.autonomy}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setStep("workspace")}
            className="mt-6 mx-auto flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to workspace selection
          </button>
        </div>
      )}
    </div>
  );
}
