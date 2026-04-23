import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAppStore } from "../store";
import {
  CheckCircle2,
  ChevronRight,
  Shield,
  BarChart3,
  Zap,
} from "lucide-react";

const WORKSPACES = [
  {
    id: "northside",
    label: "Northside Auto Workshop",
    description: "Full scenario loaded",
    initials: "NA",
  },
  {
    id: "canning",
    label: "Canning Vale Fleet Services",
    description: "Fleet management — 34 vehicles",
    initials: "CV",
  },
  {
    id: "property",
    label: "Property & Development Group",
    description: "FamilyOfficeOS — portfolio operations",
    initials: "PD",
  },
];

const PRESETS = [
  {
    id: "guided",
    label: "Guided",
    icon: Shield,
    viewMode: "Simple" as const,
    autonomy: "Review Each Lane" as const,
    description: "Summaries and one-tap approvals. Only what requires attention.",
  },
  {
    id: "balanced",
    label: "Balanced",
    icon: BarChart3,
    viewMode: "Detailed" as const,
    autonomy: "Review Each Lane" as const,
    description: "Full surface with human review on every lane.",
    recommended: true,
  },
  {
    id: "full",
    label: "Full Control",
    icon: Zap,
    viewMode: "Detailed" as const,
    autonomy: "Execute Pre-Approved" as const,
    description: "Pre-approved actions execute automatically across all lanes.",
  },
];

export default function ModeSelect() {
  const [, setLocation] = useLocation();
  const { setViewMode, setAutonomyMode } = useAppStore();
  const [step, setStep] = useState<"workspace" | "preset">("workspace");
  const [, setSelectedWorkspace] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Reset animation on step change
  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, [step]);

  const handleSelectWorkspace = (id: string) => {
    setSelectedWorkspace(id);
    setStep("preset");
  };

  const handleSelectPreset = (preset: (typeof PRESETS)[0]) => {
    setExiting(true);
    setViewMode(preset.viewMode);
    setAutonomyMode(preset.autonomy);
    setTimeout(() => setLocation("/today"), 250);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground dark p-6">
      {/* Step indicator — minimal */}
      <div className="flex items-center gap-2 mb-10">
        <div className={`flex items-center gap-1.5 text-xs font-medium ${step === "workspace" ? "text-foreground" : "text-muted-foreground"}`}>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step === "workspace" ? "bg-primary text-primary-foreground" : "bg-white/[0.06] text-muted-foreground"}`}>
            {step === "preset" ? <CheckCircle2 className="w-3 h-3" /> : "1"}
          </div>
          Workspace
        </div>
        <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
        <div className={`flex items-center gap-1.5 text-xs font-medium ${step === "preset" ? "text-foreground" : "text-muted-foreground/50"}`}>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step === "preset" ? "bg-primary text-primary-foreground" : "bg-white/[0.04] text-muted-foreground/40"}`}>
            2
          </div>
          Mode
        </div>
      </div>

      <div className={`transition-all duration-300 ease-out w-full ${visible && !exiting ? "opacity-100 translate-y-0" : exiting ? "opacity-0 -translate-y-3" : "opacity-0 translate-y-3"}`}>
        {step === "workspace" && (
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-lg font-bold heading-tight text-center mb-6">
              Select workspace
            </h1>
            <div className="flex flex-col gap-2">
              {WORKSPACES.map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => handleSelectWorkspace(ws.id)}
                  className="text-left p-4 rounded-xl border border-white/[0.06] bg-card/40 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-150 active:scale-[0.99] flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0 group-hover:text-foreground group-hover:border-white/[0.12] transition-colors">
                    {ws.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-foreground">{ws.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{ws.description}</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "preset" && (
          <div className="max-w-lg mx-auto w-full">
            <h1 className="text-lg font-bold heading-tight text-center mb-1">
              Operating mode
            </h1>
            <p className="text-xs text-muted-foreground text-center mb-6">
              You can change this at any time from the sidebar.
            </p>
            <div className="flex flex-col gap-2">
              {PRESETS.map((preset) => {
                const Icon = preset.icon;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`relative text-left p-4 rounded-xl border transition-all duration-150 active:scale-[0.99] flex items-center gap-4 group ${
                      preset.recommended
                        ? "border-primary/30 bg-primary/[0.04] hover:bg-primary/[0.07]"
                        : "border-white/[0.06] bg-card/40 hover:bg-white/[0.04] hover:border-white/[0.12]"
                    }`}
                  >
                    {preset.recommended && (
                      <div className="absolute -top-2 right-4 text-[9px] uppercase tracking-widest font-semibold bg-primary text-primary-foreground px-2 py-px rounded-full">
                        Recommended
                      </div>
                    )}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      preset.recommended
                        ? "bg-primary/15 text-primary"
                        : "bg-white/[0.04] text-muted-foreground group-hover:text-foreground"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-foreground">{preset.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{preset.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setStep("workspace")}
              className="mt-5 mx-auto flex items-center gap-1 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
