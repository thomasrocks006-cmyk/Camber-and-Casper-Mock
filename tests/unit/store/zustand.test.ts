import { describe, it, expect, beforeEach, vi } from "vitest";

describe("App Store — Zustand state mutations", () => {
  beforeEach(async () => {
    vi.resetModules();
  });

  describe("autonomyMode", () => {
    it("starts with a valid mode", async () => {
      const { useAppStore } = await import("../../../store");
      const state = useAppStore.getState();
      const validModes = [
        "Manual Only",
        "Review Each Lane",
        "Execute Pre-Approved",
        "Autonomous Within Policy",
      ];
      expect(validModes).toContain(state.autonomyMode);
    });

    it("setAutonomyMode updates to all 4 valid modes", async () => {
      const { useAppStore } = await import("../../../store");
      const modes = [
        "Manual Only",
        "Review Each Lane",
        "Execute Pre-Approved",
        "Autonomous Within Policy",
      ] as const;
      for (const mode of modes) {
        useAppStore.getState().setAutonomyMode(mode);
        expect(useAppStore.getState().autonomyMode).toBe(mode);
      }
    });
  });

  describe("call console", () => {
    it("startCall sets active=true", async () => {
      const { useAppStore } = await import("../../../store");
      useAppStore.getState().startCall("test-lead-id");
      expect(useAppStore.getState().callConsole.active).toBe(true);
    });

    it("completeCall sets active to falsy", async () => {
      const { useAppStore } = await import("../../../store");
      useAppStore.getState().startCall("test-lead-id");
      useAppStore.getState().completeCall();
      expect(useAppStore.getState().callConsole.active).toBeFalsy();
    });
  });

  describe("prepared actions", () => {
    it("approveAction removes action from list", async () => {
      const { useAppStore } = await import("../../../store");
      const initial = useAppStore.getState().preparedActions;
      if (initial.length === 0) return;
      useAppStore.getState().approveAction(initial[0].id);
      expect(
        useAppStore
          .getState()
          .preparedActions.find((a: { id: string }) => a.id === initial[0].id),
      ).toBeUndefined();
    });

    it("skipAction removes action from list", async () => {
      const { useAppStore } = await import("../../../store");
      const initial = useAppStore.getState().preparedActions;
      if (initial.length === 0) return;
      useAppStore.getState().skipAction(initial[0].id);
      expect(
        useAppStore
          .getState()
          .preparedActions.find((a: { id: string }) => a.id === initial[0].id),
      ).toBeUndefined();
    });
  });

  describe("lead stage updates", () => {
    it("updateLeadStage changes stage", async () => {
      const { useAppStore } = await import("../../../store");
      const leads = useAppStore.getState().leads;
      if (leads.length === 0) return;
      useAppStore.getState().updateLeadStage(leads[0].id, "Qualified");
      const updated = useAppStore
        .getState()
        .leads.find((l: { id: string }) => l.id === leads[0].id);
      expect(updated?.stage).toBe("Qualified");
    });
  });
});
