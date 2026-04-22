import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  // No vite build plugins needed for unit/component tests —
  // vitest handles JSX/TSX natively via esbuild
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  test: {
    name: "unit",
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: [
      "tests/unit/**/*.{test,spec}.{ts,tsx}",
      "components/**/*.{test,spec}.{ts,tsx}",
      "pages/**/*.{test,spec}.{ts,tsx}",
      "lib/**/*.{test,spec}.{ts,tsx}",
      "store/**/*.{test,spec}.{ts,tsx}",
    ],
    exclude: ["node_modules", "dist", "tests/e2e", "tests/visual"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      reportsDirectory: "./tests/coverage",
      include: [
        "App.tsx",
        "components/**/*.{ts,tsx}",
        "pages/**/*.{ts,tsx}",
        "lib/**/*.{ts,tsx}",
        "store/**/*.{ts,tsx}",
      ],
      exclude: [
        "components/ui/**", // shadcn primitives — not our code
        "**/*.d.ts",
        "**/*.config.*",
        "**/mock-*.ts", // mock data — not testable logic
      ],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 50,
        statements: 60,
      },
    },
    reporters: ["verbose", "html"],
    outputFile: {
      html: "./tests/reports/unit-results.html",
    },
  },
});
