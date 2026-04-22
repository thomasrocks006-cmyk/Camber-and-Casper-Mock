import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "./tests/reports/playwright",
  snapshotDir: "./tests/visual/snapshots",

  // Run tests sequentially — demo app is synchronous mock
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,

  reporter: [
    ["list"],
    [
      "html",
      { outputFolder: "./tests/reports/playwright-html", open: "never" },
    ],
    ["json", { outputFile: "./tests/reports/e2e-results.json" }],
  ],

  use: {
    // App requires PORT and BASE_PATH — set via env in e2e tests
    baseURL: process.env.E2E_BASE_URL || "http://localhost:5173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on-first-retry",

    // Slow down actions slightly for visual clarity in recordings
    actionTimeout: 10000,
    navigationTimeout: 20000,
  },

  // Visual regression baseline
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
      animations: "disabled",
    },
  },

  projects: [
    {
      name: "chromium-desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "mobile",
      use: {
        ...devices["iPhone 14"],
      },
    },
  ],

  // Optional: start dev server automatically for local e2e runs
  // webServer: {
  //   command: 'PORT=5173 BASE_PATH=/ pnpm vite',
  //   url: 'http://localhost:5173',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 30000,
  // },
});
