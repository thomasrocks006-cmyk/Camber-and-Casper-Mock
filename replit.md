# Camber & Casper Premium Business OS Demo

A frontend-only mock of the Camber & Casper premium business operating system, "Powered by Ironbark". Built per the Section 13 Replit Handoff Master v2.0 spec in `attached_assets/camber_casper_mock_demo_source_of_truth_1776839818161.md`.

## Architecture

- pnpm monorepo. Primary artifact is `artifacts/camber-casper` (React + Vite + TS) mounted at `/`.
- All data is mocked. No backend coupling; the `artifacts/api-server` only hosts the default `/healthz`.
- State managed with Zustand (`src/store/index.ts`) for cross-page causality (lanes, prepared actions, call console, signals, response packs).
- Routing: wouter, base from `import.meta.env.BASE_URL`.
- UI: shadcn primitives in `src/components/ui/`, Tailwind v4, framer-motion, recharts (monochrome blue→silver palette), cmdk command palette (Cmd/Ctrl+K), lucide-react icons. No emojis anywhere.

## Pages (12 + login + mode select)

`/login` → `/mode-select` (Simple vs Detailed) → `/today`. From the AppShell sidebar:
Today, Command Center, CRM, Signal Engine, Outbound (with Live Call Console), Intelligence, Financial Intelligence, Inbox, Workflows, Records, Readiness Lab, Admin.

## Visual identity

Deep navy / graphite canvas, porcelain off-white text, restrained cool blue accent, silver hairline borders. Three-layer page layout (left rail · centre operational surface · right intelligence panel) used consistently. Logo asset at `attached_assets/ChatGPT_Image_Apr_18,_2026,_01_55_48_AM_(3)_1776840047577.png` imported via `@assets/...`.

## Key files

- `artifacts/camber-casper/src/App.tsx` — router and store hydration
- `artifacts/camber-casper/src/store/index.ts` — Zustand store (lanes, calls, actions, autonomy)
- `artifacts/camber-casper/src/components/app-shell.tsx` — shell, sidebar, top bar, autonomy selector
- `artifacts/camber-casper/src/components/live-call-console.tsx` — bottom-docked call dialer simulation
- `artifacts/camber-casper/src/components/command-palette.tsx` — Cmd+K palette
- `artifacts/camber-casper/src/lib/mock-*.ts` — fixtures for each surface

## Notes

- Frontend-only — no OpenAPI, no DB needed.
- Logo lives in `attached_assets/`; do not rename.
