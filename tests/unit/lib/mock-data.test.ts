import { describe, it, expect, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";

// Re-export of the store for testing
// We test the Zustand store by using its plain actions
describe("Zustand App Store", () => {
  describe("Mock data shape validation", () => {
    it("MOCK_LEADS must have minimum required fields", async () => {
      const { MOCK_LEADS } = await import("../../../lib/mock-data");

      expect(MOCK_LEADS.length).toBeGreaterThanOrEqual(10);

      MOCK_LEADS.forEach((lead, i) => {
        const prefix = `Lead[${i}] (${lead.company ?? "unnamed"})`;

        // Core identity
        expect(lead.id, `${prefix} missing id`).toBeTruthy();
        expect(lead.name, `${prefix} missing name`).toBeTruthy();
        expect(lead.company, `${prefix} missing company`).toBeTruthy();

        // Scores
        expect(
          typeof lead.leadScore,
          `${prefix} leadScore must be number`,
        ).toBe("number");
        expect(
          lead.leadScore,
          `${prefix} leadScore out of range`,
        ).toBeGreaterThanOrEqual(0);
        expect(
          lead.leadScore,
          `${prefix} leadScore out of range`,
        ).toBeLessThanOrEqual(100);

        // DISC must be a full object, not a string (GAP-35)
        expect(typeof lead.disc, `${prefix} DISC must be object (GAP-35)`).toBe(
          "object",
        );
        expect(lead.disc, `${prefix} DISC is null`).not.toBeNull();
        expect(
          lead.disc?.dScore,
          `${prefix} missing DISC dScore`,
        ).toBeDefined();
        expect(lead.disc?.blend, `${prefix} missing DISC blend`).toBeTruthy();
        expect(
          lead.disc?.primaryType,
          `${prefix} missing DISC primaryType`,
        ).toBeTruthy();
        expect(
          ["D", "I", "S", "C"],
          `${prefix} DISC primaryType invalid`,
        ).toContain(lead.disc?.primaryType);
      });
    });

    it("MOCK_LEADS must contain no auto-generated patterns (GAP-32)", async () => {
      const { MOCK_LEADS } = await import("../../../lib/mock-data");

      // Check that lead scores are not all exact multiples of the same number
      const scores = MOCK_LEADS.map((l) => l.leadScore);
      const allSameModulo = scores.every((s) => s % 10 === 0);
      expect(
        allSameModulo,
        "All leadScores end in 0 — looks auto-generated",
      ).toBe(false);

      // Company names must look real — no "Company 1", "Company 2" patterns
      const programmaticPattern = /company\s*\d+|lead\s*\d+|test\s*\d+/i;
      MOCK_LEADS.forEach((lead) => {
        expect(
          programmaticPattern.test(lead.company),
          `Company name "${lead.company}" looks auto-generated`,
        ).toBe(false);
      });
    });

    it("MOCK_LEADS must include whySurfaced for Why This Lead panel (GAP-33)", async () => {
      const { MOCK_LEADS } = await import("../../../lib/mock-data");
      MOCK_LEADS.forEach((lead, i) => {
        expect(
          lead.whySurfaced,
          `Lead[${i}] missing whySurfaced — required for GAP-33`,
        ).toBeTruthy();
      });
    });

    it("MOCK_LEADS must include Ghost Intelligence fields (GAP-34)", async () => {
      const { MOCK_LEADS } = await import("../../../lib/mock-data");
      MOCK_LEADS.forEach((lead, i) => {
        const prefix = `Lead[${i}] (${lead.company})`;
        expect(
          Array.isArray(lead.currentTools),
          `${prefix} missing currentTools array`,
        ).toBe(true);
        expect(
          Array.isArray(lead.keyPainPoints),
          `${prefix} missing keyPainPoints array`,
        ).toBe(true);
        expect(
          lead.currentTools.length,
          `${prefix} currentTools is empty`,
        ).toBeGreaterThan(0);
        expect(
          lead.keyPainPoints.length,
          `${prefix} keyPainPoints is empty`,
        ).toBeGreaterThan(0);
      });
    });

    it("MOCK_LEADS must have recommendedOpener for Psychologist layer (GAP-21)", async () => {
      const { MOCK_LEADS } = await import("../../../lib/mock-data");
      MOCK_LEADS.forEach((lead, i) => {
        expect(
          lead.recommendedOpener,
          `Lead[${i}] missing recommendedOpener — required for Outbound right panel`,
        ).toBeTruthy();
      });
    });
  });

  describe("Workflow mock data", () => {
    it("MOCK_WORKFLOWS must have at least 10 items across 4 categories (GAP-29)", async () => {
      const { MOCK_WORKFLOWS } = await import("../../../lib/mock-workflow");
      expect(
        MOCK_WORKFLOWS.length,
        "Need at least 10 workflow items",
      ).toBeGreaterThanOrEqual(10);

      const categories = new Set(
        MOCK_WORKFLOWS.map((w: { category: string }) => w.category),
      );
      expect(
        categories.size,
        "Need at least 4 workflow categories",
      ).toBeGreaterThanOrEqual(4);
    });
  });

  describe("Inbox mock data", () => {
    it("MOCK_INBOX_THREADS must have at least 6 threads (GAP-28)", async () => {
      const { MOCK_INBOX_THREADS } = await import("../../../lib/mock-inbox");
      expect(
        MOCK_INBOX_THREADS.length,
        "Need at least 6 inbox threads",
      ).toBeGreaterThanOrEqual(6);

      const types = new Set(
        MOCK_INBOX_THREADS.map((t: { type: string }) => t.type),
      );
      expect(
        types.size,
        "Need at least 3 thread types (Email/Call/Meeting)",
      ).toBeGreaterThanOrEqual(3);
    });
  });
});
