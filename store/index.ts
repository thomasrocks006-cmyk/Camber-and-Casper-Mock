import { create } from "zustand";

export type LeadStage =
  | "New"
  | "Ready"
  | "Contacted"
  | "Qualified"
  | "Meeting Booked"
  | "Opportunity"
  | "Won / Lost";
export type AutonomyMode =
  | "Manual Only"
  | "Review Each Lane"
  | "Execute Pre-Approved"
  | "Autonomous Within Policy";
export type ViewMode = "Simple" | "Detailed";

export interface DISCProfile {
  primaryType: "D" | "I" | "S" | "C";
  secondaryType?: "D" | "I" | "S" | "C";
  blend: string;
  dScore: number;
  iScore: number;
  sScore: number;
  cScore: number;
  confidence: number;
  culturalNotes?: string;
}

export interface Lead {
  id: string;
  company: string;
  contact: string;
  /** Alias for contact — used by unit tests (GAP-32) */
  name: string;
  role: string;
  score: number;
  /** Alias for score — used by unit tests */
  leadScore: number;
  engagement: number;
  intent: number;
  stage: LeadStage;
  lastContact: string;
  nextAction: string;
  owner: string;
  disc: DISCProfile;
  persona: string;
  whySurfaced: string;
  laneLogic: string;
  currentTools: string[];
  keyPainPoints: string[];
  recommendedOpener: string;
  ghostIntel?: {
    tools: string[];
    switchingSignals: string[];
    painPoints: string[];
  };
  compliance?: {
    dncr: boolean;
    window: string;
    consent: boolean;
  };
}

export interface PreparedAction {
  id: string;
  title: string;
  source: string;
  impact: "high" | "medium" | "low";
  confidence: number;
  status: "pending" | "approved" | "skipped";
}

export interface OutboundLane {
  id: string;
  name: string;
  leadIds: string[];
  count: number;
  bookingRate: number;
  valueAud: number;
  strategy: string;
  state: "Pre-Approved" | "Review Required" | "Blocked" | "Active";
}

export interface CallConsoleState {
  status: "idle" | "dialing" | "connected" | "completed";
  /** Derived convenience bool — true when status is dialing or connected */
  active: boolean;
  leadId: string | null;
  /** Server-issued call ID — present after api-server acknowledges the call */
  callId: string | null;
  transcript: string[];
  vibeScore: number;
  sentiment: "positive" | "neutral" | "negative";
  objections: string[];
  disposition: string | null;
}

export interface ActivityEntry {
  id: string;
  timestamp: string;
  type: string;
  description: string;
}

export interface Signal {
  id: string;
  type: string;
  company: string;
  description: string;
  impact: "High" | "Medium" | "Low";
  timestamp: string;
}

export interface ResponsePack {
  id: string;
  title: string;
  description: string;
  targetLane: string;
  leadsAffected: number;
  status: "pending" | "approved" | "modified";
}

export interface AppState {
  autonomyMode: AutonomyMode;
  setAutonomyMode: (mode: AutonomyMode) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;

  leads: Lead[];
  setLeads: (leads: Lead[]) => void;
  updateLeadStage: (id: string, stage: LeadStage) => void;

  preparedActions: PreparedAction[];
  approveAction: (id: string) => void;
  skipAction: (id: string) => void;

  stats: {
    actionsReady: number;
    awaitingApproval: number;
    meetingsBooked: number;
    opportunitiesCreated: number;
    callsCompleted: number;
    pipelineValueAud: number;
  };
  incrementMeetingsBooked: () => void;

  outboundLanes: OutboundLane[];
  addLeadToLane: (laneId: string, leadId: string) => void;
  updateLane: (id: string, updates: Partial<OutboundLane>) => void;

  recentActivity: ActivityEntry[];
  logActivity: (activity: Omit<ActivityEntry, "id" | "timestamp">) => void;

  callConsole: CallConsoleState;
  startCall: (leadId: string) => void;
  appendTranscript: (text: string) => void;
  completeCall: (
    vibeScore: number,
    sentiment: "positive" | "neutral" | "negative",
    objections: string[],
  ) => void;
  setDisposition: (disposition: string) => void;
  resetCall: () => void;

  signals: Signal[];
  responsePacks: ResponsePack[];
  approveResponsePack: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  autonomyMode: "Review Each Lane",
  setAutonomyMode: (mode) => set({ autonomyMode: mode }),
  viewMode: "Simple",
  setViewMode: (mode) => set({ viewMode: mode }),

  leads: [],
  setLeads: (leads) => set({ leads }),
  updateLeadStage: (id, stage) =>
    set((state) => ({
      leads: state.leads.map((l) => (l.id === id ? { ...l, stage } : l)),
    })),

  preparedActions: [],
  approveAction: (id) =>
    set((state) => {
      const actions = state.preparedActions.map((a) =>
        a.id === id ? { ...a, status: "approved" as const } : a,
      );
      return {
        preparedActions: actions,
        stats: {
          ...state.stats,
          actionsReady: actions.filter((a) => a.status === "pending").length,
        },
      };
    }),
  skipAction: (id) =>
    set((state) => {
      const actions = state.preparedActions.map((a) =>
        a.id === id ? { ...a, status: "skipped" as const } : a,
      );
      return {
        preparedActions: actions,
        stats: {
          ...state.stats,
          actionsReady: actions.filter((a) => a.status === "pending").length,
        },
      };
    }),

  stats: {
    actionsReady: 0,
    awaitingApproval: 0,
    meetingsBooked: 12,
    opportunitiesCreated: 4,
    callsCompleted: 47,
    pipelineValueAud: 1_245_000,
  },
  incrementMeetingsBooked: () =>
    set((state) => ({
      stats: { ...state.stats, meetingsBooked: state.stats.meetingsBooked + 1 },
    })),

  outboundLanes: [],
  addLeadToLane: (laneId, leadId) =>
    set((state) => ({
      outboundLanes: state.outboundLanes.map((lane) => {
        if (lane.id !== laneId) return lane;
        if (lane.leadIds.includes(leadId)) return lane;
        const nextIds = [...lane.leadIds, leadId];
        return { ...lane, leadIds: nextIds, count: nextIds.length };
      }),
    })),
  updateLane: (id, updates) =>
    set((state) => ({
      outboundLanes: state.outboundLanes.map((lane) =>
        lane.id === id ? { ...lane, ...updates } : lane,
      ),
    })),

  recentActivity: [],
  logActivity: (activity) =>
    set((state) => ({
      recentActivity: [
        {
          ...activity,
          id: Math.random().toString(36).substring(7),
          timestamp: new Date().toISOString(),
        },
        ...state.recentActivity,
      ].slice(0, 50),
    })),

  callConsole: {
    status: "idle",
    active: false,
    leadId: null,
    callId: null,
    transcript: [],
    vibeScore: 0,
    sentiment: "neutral",
    objections: [],
    disposition: null,
  },
  startCall: (leadId) => {
    // Optimistically set to dialing so the UI responds immediately
    set({
      callConsole: {
        status: "dialing",
        active: true,
        leadId,
        callId: null,
        transcript: [],
        vibeScore: 50,
        sentiment: "neutral",
        objections: [],
        disposition: null,
      },
    });
    // Fire-and-forget to api-server — store callId when resolved
    fetch("/api/calls/outbound", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId }),
    })
      .then((res) => {
        if (!res.ok) return;
        return res.json();
      })
      .then((data: { callId?: string } | undefined) => {
        if (!data?.callId) return;
        set((state) => ({
          callConsole: { ...state.callConsole, callId: data.callId ?? null },
        }));
      })
      .catch(() => {
        // api-server unreachable — demo continues in simulation mode
      });
  },
  appendTranscript: (text) =>
    set((state) => ({
      callConsole: {
        ...state.callConsole,
        transcript: [...state.callConsole.transcript, text],
      },
    })),
  completeCall: (vibeScore, sentiment, objections) =>
    set((state) => {
      const leadId = state.callConsole.leadId;
      const lead = state.leads.find((l) => l.id === leadId);
      const bookedMeeting = sentiment === "positive" && vibeScore >= 70;
      const createdOpportunity = bookedMeeting && vibeScore >= 80;
      const dealValue = createdOpportunity
        ? 25_000 + Math.round(vibeScore * 250)
        : 0;

      const nextLeads = leadId
        ? state.leads.map((l) => {
            if (l.id !== leadId) return l;
            const nextStage: LeadStage = createdOpportunity
              ? "Opportunity"
              : bookedMeeting
                ? "Meeting Booked"
                : "Contacted";
            return { ...l, stage: nextStage, lastContact: "Just now" };
          })
        : state.leads;

      const activityEntry: ActivityEntry = {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toISOString(),
        type: "call.completed",
        description: lead
          ? `Call completed with ${lead.contact} at ${lead.company} — vibe ${vibeScore}, ${sentiment}`
          : `Call completed — vibe ${vibeScore}, ${sentiment}`,
      };

      return {
        callConsole: {
          ...state.callConsole,
          status: "completed",
          active: false,
          vibeScore,
          sentiment,
          objections,
        },
        leads: nextLeads,
        stats: {
          ...state.stats,
          callsCompleted: state.stats.callsCompleted + 1,
          meetingsBooked: state.stats.meetingsBooked + (bookedMeeting ? 1 : 0),
          opportunitiesCreated:
            state.stats.opportunitiesCreated + (createdOpportunity ? 1 : 0),
          pipelineValueAud: state.stats.pipelineValueAud + dealValue,
        },
        recentActivity: [activityEntry, ...state.recentActivity].slice(0, 50),
      };
    }),
  setDisposition: (disposition) =>
    set((state) => ({
      callConsole: { ...state.callConsole, disposition },
    })),
  resetCall: () =>
    set({
      callConsole: {
        status: "idle",
        active: false,
        leadId: null,
        callId: null,
        transcript: [],
        vibeScore: 0,
        sentiment: "neutral",
        objections: [],
        disposition: null,
      },
    }),

  signals: [],
  responsePacks: [],
  approveResponsePack: (id) =>
    set((state) => {
      const pack = state.responsePacks.find((rp) => rp.id === id);
      if (!pack) return {};

      const targetLane = state.outboundLanes.find(
        (l) => l.id === pack.targetLane || l.name === pack.targetLane,
      );

      let nextLanes = state.outboundLanes;
      if (targetLane) {
        const eligible = state.leads
          .filter((l) => !targetLane.leadIds.includes(l.id))
          .slice(0, pack.leadsAffected)
          .map((l) => l.id);
        const merged = Array.from(
          new Set([...targetLane.leadIds, ...eligible]),
        );
        nextLanes = state.outboundLanes.map((lane) =>
          lane.id === targetLane.id
            ? {
                ...lane,
                leadIds: merged,
                count: merged.length,
                state: lane.state === "Blocked" ? "Review Required" : "Active",
              }
            : lane,
        );
      } else {
        const eligibleIds = state.leads
          .slice(0, pack.leadsAffected)
          .map((l) => l.id);
        const newLane: OutboundLane = {
          id: `lane-${Math.random().toString(36).substring(2, 8)}`,
          name: pack.targetLane,
          leadIds: eligibleIds,
          count: eligibleIds.length,
          bookingRate: 18,
          valueAud: eligibleIds.length * 12_500,
          strategy: pack.title,
          state: "Review Required",
        };
        nextLanes = [...state.outboundLanes, newLane];
      }

      const activityEntry: ActivityEntry = {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toISOString(),
        type: "response_pack.approved",
        description: `Approved "${pack.title}" — ${pack.leadsAffected} leads added to ${pack.targetLane}`,
      };

      return {
        responsePacks: state.responsePacks.map((rp) =>
          rp.id === id ? { ...rp, status: "approved" as const } : rp,
        ),
        outboundLanes: nextLanes,
        recentActivity: [activityEntry, ...state.recentActivity].slice(0, 50),
      };
    }),
}));
