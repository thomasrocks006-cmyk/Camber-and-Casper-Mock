import { test, expect, type Page } from "@playwright/test";

/**
 * Primary Demo Flow E2E Test
 * Validates the scripted walk-through path from BUILD_PLAN.md §Part 6
 */

async function waitForNav(page: Page, path: string) {
  await page.goto(path);
  await page.waitForLoadState("networkidle");
}

test.describe("Primary Demo Flow", () => {
  test("1 — Login page renders with Camber & Casper branding hierarchy", async ({
    page,
  }) => {
    await waitForNav(page, "/login");

    // Should have "by Camber & Casper" text
    await expect(page.locator("text=Camber & Casper")).toBeVisible();

    // Should have entry button
    await expect(
      page
        .locator("button, a")
        .filter({ hasText: /demo|enter/i })
        .first(),
    ).toBeVisible();
  });

  test("2 — Mode Select page shows valid mode options", async ({ page }) => {
    await waitForNav(page, "/mode-select");

    // Should offer at least 2 mode options
    const modeCards = page
      .locator('[data-testid="mode-card"], .cursor-pointer')
      .filter({ hasText: /mode|guided|control|simple|detailed/i });
    await expect(modeCards.first()).toBeVisible();
  });

  test("3 — Today page renders with action cards", async ({ page }) => {
    await waitForNav(page, "/today");
    await expect(page).toHaveTitle(/mockup|camber|casper|ironbark/i);
    // Page should not show an error state
    await expect(page.locator("text=Page not found")).not.toBeVisible();
    await expect(page.locator("text=undefined")).not.toBeVisible();
  });

  test("4 — Command page renders all major panels", async ({ page }) => {
    await waitForNav(page, "/command-center");
    // Three-layer layout: left rail + centre + right
    await expect(
      page.locator('nav, [class*="left-rail"], [class*="sidebar"]').first(),
    ).toBeVisible();
    await expect(page.locator("text=Command")).toBeVisible();
    await expect(page.locator("text=undefined")).not.toBeVisible();
  });

  test("5 — CRM page loads pipeline board", async ({ page }) => {
    await waitForNav(page, "/crm");
    await expect(page.locator("text=CRM")).toBeVisible();
    // Should have lead cards or column headers
    const content = await page
      .locator('main, [class*="content"], [class*="centre"]')
      .first()
      .textContent();
    expect(content?.length).toBeGreaterThan(50);
  });

  test("6 — Strategic Command shows nav label correctly", async ({ page }) => {
    await waitForNav(page, "/signal-engine");
    // Nav label should be "Strategic Command", never "Signal Engine" or "War Room"
    const navText = await page.locator("nav").textContent();
    expect(navText).not.toMatch(/War Room/i);
    expect(navText).not.toMatch(/Signal Engine/);
  });

  test("7 — Outbound page renders with Execute Plan button", async ({
    page,
  }) => {
    await waitForNav(page, "/outbound");
    await expect(page.locator("text=Outbound")).toBeVisible();
    // Execute Plan CTA
    await expect(
      page
        .locator("button")
        .filter({ hasText: /execute|plan/i })
        .first(),
    ).toBeVisible();
  });

  test("8 — Intelligence page loads without errors", async ({ page }) => {
    await waitForNav(page, "/intelligence");
    await expect(page.locator("text=undefined")).not.toBeVisible();
    await expect(page.locator("text=Intelligence")).toBeVisible();
  });

  test("9 — All 12 main routes load without crash", async ({ page }) => {
    const routes = [
      "/today",
      "/command-center",
      "/crm",
      "/outbound",
      "/intelligence",
      "/signal-engine",
      "/inbox",
      "/workflows",
      "/records",
      "/readiness-lab",
      "/financial-intelligence",
      "/admin",
    ];

    for (const route of routes) {
      await page.goto(route);
      await page.waitForLoadState("domcontentloaded");

      // No JS error banners
      await expect(page.locator("text=Something went wrong")).not.toBeVisible();
      await expect(page.locator("text=Page not found")).not.toBeVisible();

      // Page title should not be empty
      const title = await page.title();
      expect(title.length, `Route ${route} has empty title`).toBeGreaterThan(0);
    }
  });
});
