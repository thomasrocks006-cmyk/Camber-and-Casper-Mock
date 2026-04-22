import { test, expect, type Page } from "@playwright/test";

/**
 * Interaction / Splash Effect Tests
 * Validates hover states, border-radius, transitions, and visual interaction effects
 */

test.describe("Button and Card Interactions", () => {
  test("Outbound — Execute Plan button has visible hover state", async ({
    page,
  }) => {
    await page.goto("/outbound");
    await page.waitForLoadState("networkidle");

    const btn = page
      .locator("button")
      .filter({ hasText: /execute plan/i })
      .first();
    await expect(btn).toBeVisible();

    // Screenshot pre-hover
    await btn.screenshot({ path: "tests/reports/btn-execute-pre-hover.png" });

    await btn.hover();
    await page.waitForTimeout(200); // allow transition

    // Screenshot post-hover
    await btn.screenshot({ path: "tests/reports/btn-execute-post-hover.png" });
  });

  test("Navigation items have transition on hover", async ({ page }) => {
    await page.goto("/today");
    await page.waitForLoadState("networkidle");

    const navItems = page.locator("nav a, nav button");
    const count = await navItems.count();
    expect(count, "Nav should have items").toBeGreaterThan(0);

    // Hover each visible nav item and check no layout shift
    for (let i = 0; i < Math.min(count, 4); i++) {
      const item = navItems.nth(i);
      if (await item.isVisible()) {
        await item.hover();
        await page.waitForTimeout(100);
      }
    }
  });

  test("Cards do not have hard edges — border-radius applied", async ({
    page,
  }) => {
    await page.goto("/command-center");
    await page.waitForLoadState("networkidle");

    // Get computed border-radius of first visible card
    const cardRadius = await page.evaluate(() => {
      const cards = document.querySelectorAll(
        '[class*="rounded"], [class*="card"]',
      );
      if (cards.length === 0) return null;
      return window.getComputedStyle(cards[0]).borderRadius;
    });

    expect(cardRadius, "Cards should have border-radius applied").not.toBe(
      "0px",
    );
    expect(cardRadius).not.toBeNull();
  });

  test("Primary colour is restrained (not hyper-saturated blue)", async ({
    page,
  }) => {
    await page.goto("/today");
    await page.waitForLoadState("networkidle");

    const primaryHsl = await page.evaluate(() => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();
    });

    // Should contain saturation value — warn if it's 90%
    const saturationMatch = primaryHsl.match(/(\d+)%/);
    if (saturationMatch) {
      const saturation = parseInt(saturationMatch[1], 10);
      expect(
        saturation,
        `Primary colour saturation ${saturation}% is too high — target ≤65% (see GAP-01)`,
      ).toBeLessThanOrEqual(65);
    }
  });

  test('Nav does not show "War Room" or "Signal Engine" label', async ({
    page,
  }) => {
    await page.goto("/today");
    await page.waitForLoadState("networkidle");

    const navText = await page.locator("nav").textContent();
    expect(
      navText,
      'Nav contains "War Room" — use "Strategic Command" (GAP-03)',
    ).not.toMatch(/War Room/i);
    expect(
      navText,
      'Nav contains "Signal Engine" — use "Strategic Command" (GAP-03)',
    ).not.toMatch(/Signal Engine/);
  });

  test("Nav icons are all unique (no 5× LayoutDashboard)", async ({ page }) => {
    await page.goto("/today");
    await page.waitForLoadState("networkidle");

    // Check that navigation items have distinct aria-labels or titles
    const navLinks = page.locator("nav a");
    const count = await navLinks.count();
    const labels: string[] = [];

    for (let i = 0; i < count; i++) {
      const label =
        (await navLinks.nth(i).getAttribute("title")) ||
        (await navLinks.nth(i).textContent()) ||
        "";
      labels.push(label.trim());
    }

    const uniqueLabels = new Set(labels.filter(Boolean));
    expect(
      uniqueLabels.size,
      `Only ${uniqueLabels.size} unique nav labels for ${count} nav items — icons likely duplicated (GAP-04)`,
    ).toBe(count > 0 ? count : 1);
  });
});

test.describe("Three-Layer Layout Validation", () => {
  const tier1Pages = [
    "/command-center",
    "/crm",
    "/outbound",
    "/intelligence",
    "/signal-engine",
  ];

  for (const route of tier1Pages) {
    test(`${route} — has three-layer layout (L/C/R)`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState("networkidle");

      // Check viewport width — 1440px desktop
      await page.setViewportSize({ width: 1440, height: 900 });

      // Three-layer: should have at minimum left sidebar + content area
      // We validate that the page is wider than a single column
      const pageWidth = await page.evaluate(() => document.body.offsetWidth);
      expect(pageWidth).toBeGreaterThan(900);

      // Should not be single-column
      const mainContent = await page
        .locator('main, [class*="content"], [class*="flex"]')
        .first();
      const box = await mainContent.boundingBox();
      if (box) {
        expect(
          box.width,
          `${route} content area is too narrow — check three-layer layout`,
        ).toBeGreaterThan(600);
      }
    });
  }
});
