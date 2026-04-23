# Camber & Casper Systems — Master Build Plan
### Three-Pass Frontend Audit · April 2026

**Status:** v2.0 — Full rewrite after three audit passes
**Source documents:** GAP_ANALYSIS.md · All page/component files · 15,038 line blueprint · 7 Textfiles
**Build approach:** Phase-based, design-system-first, anti-drift

---

## Identity Rules (Locked — Apply Before Any Build Work)

| Layer | Current State | Target |
|---|---|---|
| Sidebar/top header | "Ironbark / Camber & Casper" | **"Camber & Casper Systems"** — primary brand |
| Engine attribution | "Ironbark" used freely as a UI brand everywhere | Ironbark used **sparingly** — only on prepared work labels |
| Correct Ironbark usage | — | `"Prepared by Ironbark"`, `"Ironbark Assessment"`, `"Ironbark flagged this"` in context |
| Incorrect Ironbark usage | "Ironbark Synthesis" as RightPanel title, "Ironbark Rationale" as PanelSection headers | Remove — use descriptive section names |
| Product name (WorkshopOS demo) | `[Product Name]` placeholder | **AtlasOS** |
| Second OS | Not yet built | **FamilyOfficeOS** — family office and portfolio operations vertical |
| Login marketing copy | 3 value-pillar cards visible on login page | Remove — clients have already bought this; replace with session context |

---

## Audit Summary — Full Issue Registry (3 Passes)

### A. Typography — Root Cause of "Generic AI" Feel

- Font is `Inter` — the default of every React/AI SaaS boilerplate 2019–2024. Not wrong, just undifferentiated.
- `tracking-tight` used inconsistently across headings. Premium apps apply `letter-spacing: -0.02em` deliberately on all headings.
- `font-semibold` is overused as the default weight for everything — headings, body, labels, captions all at the same weight. No contrast hierarchy.
- `text-xs font-medium uppercase tracking-wider text-muted-foreground` applied to EVERY section label, panel title, sub-label, and field header — completely identical style regardless of structural importance.
- No display-size type anywhere. Most important stat: `text-2xl`. Chart title on same page: `text-sm`. No scale differentiation.
- `tabular-nums` set on `body` via `font-feature-settings` but not applied as a Tailwind class where it matters — stat values, financial figures, call metrics.
- Stat values use default `line-height`. Should be `leading-none` for tight metric display.

### B. Design Tokens — Wrong or Unused

- `--radius: 0.375rem` base — near-square corners. `rounded-xl` overrides locally but base is wrong. Should be `0.5rem`.
- `--card-elevated` token defined in `index.css` but **never referenced in any component or page**.
- `--shadow-*` tokens: **do not exist**. Tailwind's `shadow-sm` = `0 1px 2px rgba(0,0,0,0.05)` which is invisible on dark backgrounds. No bespoke shadow scale for dark UI.
- Inset highlight (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.05)`) absent — what gives dark cards their "glass shelf" premium feel.
- `text-green-500` = `hsl(142 71% 45%)` — near-neon on dark background. Should desaturate to ~40%.
- `bg-primary/10` on active items is barely perceptible (~1% luminance above background). Needs `bg-primary/[0.12]` minimum.

### C. Button Component — Completely Unchanged shadcn Default

- No `active:scale-[0.98]` press feedback anywhere in the app.
- No hover lift (`hover:-translate-y-px` + shadow increase).
- `outline` variant reads as near-disabled on dark background — barely visible border.
- No executing/loading state.
- Primary button: flat `bg-primary` fill, no subtle inner depth.
- All button interaction happens via colour change only — no spatial feedback.

### D. Card Elevation System — All Cards Same Weight

- One shadow level for everything.
- Card: `rounded-xl border bg-card`. Selected card: `border-primary bg-primary/5`. That is the entire elevation system.
- Same card style used for: stat blocks, action items, DISC panels, compliance warnings, competitor cards, financial figures — no visual distinction by content importance.
- `--card-elevated` token exists but is never used.
- No shimmer, no inset highlight, no layered depth on priority cards.

### E. StatStrip — Most Visible Problem in the App

Current render: `124 ↑12%` — value and trend on the same baseline row, directly adjacent, different font sizes. Looks unintentional.

- Trend must move to a second line below the value as a distinct small pill.
- `p-6 gap-6` = ~80px hard block consumed at the top of every single page.
- No separator lines between individual stats.
- No entry animation — numbers simply appear.
- Some pages: 5–6 stats. Others: 3. Inconsistent visual weight across the app.

### F. Interior Scrollbars — PWA Breaking Issue

| File | Problem |
|---|---|
| `Records.tsx` | `h-[calc(100vh-140px)]` + `overflow-y-auto` inside a bordered panel |
| `Inbox.tsx` | `overflow-auto` inside `rounded-xl` border card |
| `CommandCenter.tsx` | Left rail `overflow-y-auto` in a fixed column |
| `RightPanel` component | `overflow-y-auto` with `h-full` creates an independent panel scroll track |
| `live-call-console.tsx` | Post-call panel `overflow-y-auto` inside `w-80` |

All create the "2010 cheap website" scrollbar appearance. On a mobile PWA these are especially bad. Only the sidebar should have a contained scroll track.

### G. Dead Stubs & Non-Functional Buttons — Complete Inventory

| File | Element | Problem |
|---|---|---|
| `SignalEngine.tsx` | Monitor / Recommend / Deploy toggle | State set but **content never branches** — all three modes render identical UI |
| `SignalEngine.tsx` | Saved Views (3 items in left rail) | No `onClick` handler — clicking does nothing |
| `SignalEngine.tsx` | "Modify" on response pack | No handler |
| `CommandCenter.tsx` | Left rail filter list (6 items) | No filtering connected to centre content |
| `Inbox.tsx` | "Edit" on prepared draft | No `onClick` |
| `Inbox.tsx` | "Send" on prepared draft | No `onClick` |
| `Workflows.tsx` | "Bulk Approve All" | No `onClick` |
| `Workflows.tsx` | "Review" on task cards | No `onClick`, no modal |
| `app-shell.tsx` | Bell notification dropdown | Static sentence — no list, nothing clickable |
| `app-shell.tsx` | "Profile Settings" in user menu | No route, dead stub |
| `Login.tsx` | `[Product Name]` placeholder | Unfilled — must be "AtlasOS" |
| `Records.tsx` | Record detail panel | No Call, Email, Add Note, Route buttons |
| `FinancialIntelligence.tsx` | 6 of 9 left-nav tabs | Pure "coming soon" stubs |
| `ModeSelect.tsx` | "Generic Demo Workspace" | Loads Northside data — not actually a clean slate |
| `Admin.tsx` | "AI Preferences" section | Non-functional placeholder content |
| `live-call-console.tsx` | "Send Follow-Up" at call end | Button exists, no `onClick` handler |
| `live-call-console.tsx` | "Ironbark Live Alerts" section | Shows three "awaiting trigger" placeholders permanently — looks broken |

### H. No Interaction Depth

| Pattern | Status |
|---|---|
| Right-click / context menus on cards | ❌ None anywhere |
| Long-press sub-menus (mobile) | ❌ None |
| Rich hover tooltips with context | ❌ None (only default `title` attribute on a few elements) |
| Keyboard shortcut hints on hover | ❌ Only `⌘K` surfaced |
| Skeleton / loading states | ❌ Data appears instantly, no entry grace |
| Press animation `active:scale-[0.98]` | ❌ None |
| Right panel swap animation | ❌ Silently swaps |
| Page entry animation | ⚠️ Only Today, Command, Outbound |
| Number count-up on load | ❌ None |
| List stagger on entry | ⚠️ A few `AnimatePresence` usages only |

### I. "Lived In" Feel — What Is Missing

- Nothing changes unless you interact. The app is entirely passive.
- Timestamps are frozen strings that never update.
- No data ever ticks or increments.
- Only live indicator in the entire app: one pulsing green dot in the header.
- Pages are neutral containers — nothing greets you or guides you on arrival.
- Ironbark never initiates from the UI — it waits passively.
- Premium systems: pages have entry nudges, numbers pulse on arrival, relative timestamps breathe, one or two signals move occasionally to signal the system is alive.

### J. Sidebar — Template Feel

- 12 nav items in one undivided list with no visual grouping.
- Active item: `bg-primary/10 text-primary` — no left accent bar or strong spatial indicator.
- No sub-navigation visible on hover for deep sections (CRM sub-views, Intelligence sub-tabs).
- `bg-sidebar` resolves to the same value as `bg-background` — sidebar has zero visual distinction from the page.
- Bottom of sidebar: empty. Should show system status, workspace context, or connection health.
- "Ironbark / Camber & Casper" header hierarchy is backwards — engine brand before company name.

### K. Right Panel — Underused Assistant Surface

- Title and section header styles are identical to every other label in the app — the right panel does not have a distinct voice.
- No entry animation when selected item changes — silently swaps content.
- `ConfidenceScore` bar is `h-1.5` — barely visible on dark bg.
- Static summary boxes, not an active assistant surface.
- Much higher potential as "assistant thinking out loud" — currently it is a passive info dump.

### L. Copy & Naming Issues

| Current | Fix |
|---|---|
| "AI Summary" in Records right panel | → "Assessment" |
| "Unified Communications" | → Remove subheading, or "Conversations" |
| "System of record and entity management" | → "Companies, contacts, and relationships" |
| "Orchestration and approval queues" | → "Actions staged for your review" |
| "Choose how much Ironbark does independently" | → "Set how the system operates" |
| "Market intelligence and strategic response" | → Live context line |
| "Ironbark coaching engine active" in call console | → Soften |
| 6× "Ironbark" as structural section/panel titles | → Use descriptive names |
| "Prepared by Ironbark" on non-prepared content | → Only on actual prepared-work items |

### M. Call Console Issues

- "Ironbark Live Alerts" section shows three placeholder lines reading "awaiting trigger" at all times during an active call — looks like a broken feature.
- "Send Follow-Up" button has no `onClick`.
- Transcript `overflow-y-auto` inside `flex-1` creates an interior scrollbar.
- "Ironbark coaching engine active" over-attributes the engine.

### N. Page Subtitle Lines — All Static, None Contextual

Every page has a static subtitle (`text-sm text-muted-foreground`). None update based on what is happening. A premium OS should show a live context line: "4 actions ready · System healthy · Updated 2 min ago."

### O. FamilyOfficeOS — Not Yet Built

A second OS demo for the real estate and property development vertical. Distinct navigation, distinct mock data, distinct card types, distinct feel. Calmer, more executive, fewer operational urgency signals, more prepared-decision and portfolio intelligence posture.

---

## BUILD PLAN — Phased Execution

---

### PHASE 0 — Identity & Design System Foundation
*Everything layers on this. Do not start page work until Phase 0 is complete.*

| # | Task | File(s) |
|---|---|---|
| 0.1 | Sidebar header → "Camber & Casper Systems" | `components/app-shell.tsx` |
| 0.2 | Product name → "AtlasOS" throughout | `pages/Login.tsx`, `App.tsx`, `pages/ModeSelect.tsx` |
| 0.3 | Token upgrade — `--radius: 0.5rem`, three shadow levels, inset highlight | `index.css` |
| 0.4 | Typography — heading tracking `-0.02em`, weight contrast system, `tabular-nums` utility | `index.css` |
| 0.5 | Button redesign — `active:scale-[0.98]`, hover lift + shadow, visible outline on dark | `components/ui/button.tsx` |
| 0.6 | Card elevation — default / elevated / float tiers, dark-appropriate shadows | `components/ui/card.tsx`, `index.css` |
| 0.7 | Badge — softer semantic colours, pill variant | `components/ui/badge.tsx` |
| 0.8 | Ironbark attribution audit — structural labels replaced with descriptive names | All page right panels |
| 0.9 | StatStrip redesign — `p-4`, trend as second-line pill, separator lines, `leading-none` on values | `components/stat-strip.tsx` |

---

### PHASE 1 — Shell & Layout
*The frame every page sits inside.*

| # | Task | File(s) |
|---|---|---|
| 1.1 | Sidebar — nav grouping with visual dividers, left accent bar on active item | `components/app-shell.tsx` |
| 1.2 | Sidebar — sub-nav expansion on hover for CRM, Intelligence, Financial | `components/app-shell.tsx` |
| 1.3 | Sidebar — bottom status bar (system health, workspace, user) | `components/app-shell.tsx` |
| 1.4 | Notification bell — 6–8 rich, clickable, distinct notification items with icons and urgency | `components/app-shell.tsx` |
| 1.5 | Three-layer layout — eliminate all interior `overflow-y-auto` inside bordered containers | `components/three-layer.tsx`, `pages/Records.tsx`, `pages/Inbox.tsx` |
| 1.6 | Right panel — entry animation on selection change, distinct title voice | `components/right-panel.tsx` |
| 1.7 | Page transition — `AnimatePresence` in router, `fade + y:6→0`, 150ms ease | `App.tsx` |
| 1.8 | Live context subtitle — replace static page subtitle with system-state line | `components/app-shell.tsx` |
| 1.9 | Login page — remove marketing copy, AtlasOS name, card entry spring animation | `pages/Login.tsx` |
| 1.10 | Call console — suppress "awaiting trigger" slots when not triggered | `components/live-call-console.tsx` |

---

### PHASE 2 — Page Dead Stubs & Interactions
*Every dead button, broken tab, and stub element fixed.*

| # | Task | File |
|---|---|---|
| 2.1 | SignalEngine — Monitor/Recommend/Deploy branch distinct content per mode | `pages/SignalEngine.tsx` |
| 2.2 | SignalEngine — Saved Views filter presets connected | `pages/SignalEngine.tsx` |
| 2.3 | SignalEngine — "Modify" opens inline edit or dialog | `pages/SignalEngine.tsx` |
| 2.4 | CommandCenter — left rail filters wire to state and filter centre | `pages/CommandCenter.tsx` |
| 2.5 | Inbox — "Edit" / "Send" on prepared drafts | `pages/Inbox.tsx` |
| 2.6 | Inbox — Outlook / Teams connection badge in left rail header | `pages/Inbox.tsx` |
| 2.7 | Inbox — proactive Ironbark entry nudge on page mount | `pages/Inbox.tsx` |
| 2.8 | Workflows — "Bulk Approve All" + "Review" button handlers | `pages/Workflows.tsx` |
| 2.9 | Records — Call, Email, Add Note, Route to Outbound buttons in record detail | `pages/Records.tsx` |
| 2.10 | Records — eliminate `h-[calc(100vh-140px)]` inner scroll pattern | `pages/Records.tsx` |
| 2.11 | Call console — "Send Follow-Up" `onClick` handler | `components/live-call-console.tsx` |
| 2.12 | Admin — "AI Preferences" meaningful content | `pages/Admin.tsx` |
| 2.13 | Profile Settings → route to Admin | `components/app-shell.tsx` |
| 2.14 | FinancialIntelligence — stub tabs reach minimal working state | `pages/FinancialIntelligence.tsx` |
| 2.15 | ModeSelect — "Generic Demo" loads truly blank state | `pages/ModeSelect.tsx`, `store/index.ts` |

---

### PHASE 3 — Interaction Depth
*Context menus, tooltips, press states, keyboard hints.*

| # | Task | File(s) |
|---|---|---|
| 3.1 | Right-click context menu on lead cards — Call, Email, Move Stage, Add to Lane, View Profile | `pages/CRM.tsx`, `pages/Outbound.tsx` |
| 3.2 | Right-click context menu on inbox threads — Mark Read, Open, Dismiss, Forward | `pages/Inbox.tsx` |
| 3.3 | Right-click context menu on workflow items — Approve, Skip, View History | `pages/Workflows.tsx` |
| 3.4 | Rich hover tooltips on trend badges — "vs yesterday" context | `components/stat-strip.tsx` |
| 3.5 | Rich hover tooltips on DISC bars — brief type descriptor | `components/disc-bars.tsx` |
| 3.6 | Rich hover tooltips on confidence scores — what drives the score | `components/right-panel.tsx` |
| 3.7 | Global press animation `active:scale-[0.98]` on all interactive cards | `index.css` via `@layer base` |
| 3.8 | Count-up animation on stat entry — fires once on mount | `components/stat-strip.tsx` |
| 3.9 | Staggered list entry animation on page load | All pages with lists |
| 3.10 | Right panel — `AnimatePresence` keyed on selected item ID for content swap | `components/right-panel.tsx` |

---

### PHASE 4 — Live Feel & Proactive Layer
*The system should feel like it's watching, thinking, and initiating.*

| # | Task | File(s) |
|---|---|---|
| 4.1 | Relative timestamp ticker — `useEffect` interval, updates every 60s | Shared `useRelativeTime` hook |
| 4.2 | Today page entry nudge — Ironbark banner on mount with 1–2 day priorities | `pages/Today.tsx` |
| 4.3 | Inbox entry nudge — "3 threads need a response before EOD" on mount | `pages/Inbox.tsx` |
| 4.4 | Subtle live signal on Today — one stat increments every 45s | `pages/Today.tsx` |
| 4.5 | "Worth Rethinking" card type — strategic nudges, not operational reminders | `pages/Today.tsx`, `pages/CommandCenter.tsx` |
| 4.6 | "Prepared for Approval" card stack at top of Today | `pages/Today.tsx` |
| 4.7 | Page subtitles → live context lines showing counts and system state | All pages |
| 4.8 | Occasional notification dot appearing organically during a session | `components/app-shell.tsx` |

---

### PHASE 5 — Copy, Naming & Voice
*All subtitle lines, panel titles, section labels rewritten to be specific, contextual, and non-generic.*

| # | Find | Replace |
|---|---|---|
| 5.1 | "AI Summary" in Records | → "Assessment" |
| 5.2 | "Unified Communications" in Inbox | → Remove or "Conversations" |
| 5.3 | "System of record and entity management" | → "Companies, contacts, and relationships" |
| 5.4 | "Orchestration and approval queues" | → "Actions staged for your review" |
| 5.5 | "Market intelligence and strategic response" | → Live context line |
| 5.6 | "Choose how much Ironbark does independently" | → "Set how the system operates" |
| 5.7 | "Ironbark coaching engine active" | → Soften to system-state language |
| 5.8 | All `PanelSection title="Ironbark Rationale"` and similar | → Descriptive section names |
| 5.9 | "Prepared by Ironbark" on structural/non-prepared content | → Only on actual prepared-work output |
| 5.10 | "comingSoonContent" stub copy "This view is being prepared by Ironbark." | → Purpose-specific placeholder copy |

---

### PHASE 6 — Core Page Depth Upgrades (from GAP_ANALYSIS.md)

Retaining all Phase 1–9 content from the original BUILD_PLAN below as Phase 6 sub-items.
These are the semantic content gaps — pages that exist but lack the depth the blueprint specifies.

#### 6A — Strategic Command (SignalEngine rebuild)
- 7-component architecture: Ghost OSINT, Market Positioning Engine, Signal Feed, Response Packs, Battlecard panel, Strategy→Execution Bridge
- Monitor/Recommend/Deploy branching fully implemented with distinct UI per mode
- Saved Views connected to filter presets

#### 6B — CRM Page
- "Why This Lead" panel — surfacing rationale, ghost intelligence, switching signals
- DISC blend with 4 scores, cultural notes
- Saved Views: "High Intent – No Contact 7d", "Post-Meeting Follow-Ups", "Switch Targets (Ghost)"
- Relationship health indicator: Healthy / Cooling / At Risk
- Timeline sentiment labels per item

#### 6C — Outbound Page
- Expanded right panel: opener script, pitch order, objection forecast, persuasion triggers, red flags, cultural adaptation
- Post-call processing: CRM update → follow-up draft → intelligence update
- Execute Plan pre-flight with 4 execution mode descriptions + lead breakdown

#### 6D — Command Page
- Missing 4 panels: Opportunities, Risk, Activity Delta, Commitments
- Right panel restructured: Summary → What Matters Now → Why → Recommended Moves → Watch Signals

#### 6E — Intelligence Page
- Executive Insight Summary hero card with "Apply Strategy Update" action
- Right panel: What Changed / Why / Recommended Adjustment / Impact / Apply

#### 6F — Financial Intelligence
- Silicon CFO "Truly Spendable Cash" calc panel in Cash Flow tab
- Stub tabs reach minimal working state (Risk, Unit Economics, Attribution)

---

### PHASE 7 — FamilyOfficeOS (New Demo Environment)

A second OS for the real estate and property development vertical, selectable from ModeSelect. Same design system. Distinct navigation, data, and feel.

**Navigation:**
```
Brief · Portfolio · Leases · Deals · Operations · Intelligence · Continuity
```

**Key surfaces:**

| Surface | What It Does |
|---|---|
| Brief | Daily prepared executive desk — decisions today, prepared for approval, worth rethinking, tomorrow prep |
| Portfolio | Estate view — across all assets, sector breakdown, health per asset |
| Leases | Critical date engine, option logic, tenant health, market rent benchmarking, relationship drift |
| Deals | Acquisition pipeline, feasibility scratchpad, deal room |
| Operations | Centre/site ops, maintenance, weather-triggered alerts, footfall signals |
| Intelligence | Permit monitoring, competitor moves, market signals — all with implications lines |
| Continuity | Decision log, commitment tracking, company memory, cross-channel pattern detection |

**Card types unique to FamilyOfficeOS:**
1. **Decision Required** — signed-off recommendation packs (lease option response, acquisition threshold, rent anomaly)
2. **Prepared for Approval** — draft letter, ops note, permit brief, investment note
3. **Worth Rethinking** — soft strategic nudges, not operational reminders
4. **Relationship Drift** — tenant/broker communication pattern shifts
5. **Estate Signal** — weather trigger, footfall anomaly, permit lodged, competitor move, cap-rate shift

**Tone:** Calmer and more executive than AtlasOS. Fewer urgency signals. Prepared-decision posture. "Principal office operating desk."

**Mock data rules:** All Australian, all property-sector appropriate. No reference to any real business or entity.

---

## Anti-Drift Rules (Required on Every Commit)

1. `/signal-engine` route → displays as "Strategic Command" — never "War Room", "Signal Engine"
2. Sidebar top label → "Camber & Casper Systems"
3. Product name in UI → "AtlasOS" (WorkshopOS demo) or "FamilyOfficeOS" (family office demo)
4. Three-layer layout → L/C/R on every Tier 1 and Tier 2 page
5. Mock data → no `Array.from({length: N}).map()` patterns, no index-counter names
6. DISC shape → always `{ dScore, iScore, sScore, cScore, blend, primaryType, secondaryType, confidence, culturalNotes }`
7. Autonomy modes → never renamed from the four locked labels
8. Ironbark attribution → `"Prepared by Ironbark"` only on prepared work. Never "AI suggests", "The AI...", "AI-generated"
9. Primary colour → `hsl(210 55% 52%)` max — never `hsl(210 90% 60%)`
10. No interior scrollbars inside bordered containers

---

## Gap Tracker

| Phase | Gaps | Status |
|---|---|---|
| GAP-01 (colour saturation) | Fixed | ✅ |
| GAP-02 (porcelain card variant) | Fixed | ✅ |
| GAP-03 (Strategic Command nav label) | Fixed | ✅ |
| GAP-04 (icon deduplication) | Fixed | ✅ |
| GAP-05 (workspace selector) | Fixed | ✅ |
| GAP-06 (login naming hierarchy) | Fixed | ✅ |
| GAP-07 (workspace/preset entry flow) | Fixed | ✅ |
| GAP-08 (ModeSelect labels) | Fixed | ✅ |
| GAP-09 (Command panels: Opps, Risk, Delta, Commitments) | Fixed | ✅ |
| GAP-10 (Command right panel structure) | Fixed | ✅ |
| GAP-11 (Why This Lead CRM panel) | Fixed | ✅ |
| GAP-12 (Ghost Intelligence CRM) | Fixed | ✅ |
| GAP-13 (CRM Saved Views) | Fixed | ✅ |
| GAP-14 (Timeline sentiment per item) | Fixed | ✅ |
| GAP-15 (Relationship Health indicator) | Fixed | ✅ |
| GAP-16 (Call console dominant layout) | Fixed | ✅ |
| GAP-17 (Manual Demo Call form) | Fixed | ✅ |
| GAP-18 (Post-call processing) | Partial | 🟡 |
| GAP-19 (Execute Plan pre-flight + 4 modes) | Fixed | ✅ |
| GAP-20 (Lane Analytics Panel) | Fixed | ✅ |
| GAP-21 (Psychologist tactical layer) | Fixed | ✅ |
| GAP-22 (Strategic Command content) | Fixed | ✅ |
| GAP-23 (Intelligence hero card) | Fixed | ✅ |
| GAP-24 (Intelligence right panel) | Fixed | ✅ |
| GAP-25 (Apply to Outbound mutation) | Fixed | ✅ |
| GAP-26 (Readiness Lab deployment envelope) | Fixed | ✅ |
| GAP-27 (FinancialIntelligence tabs) | Fixed | ✅ |
| GAP-28 (Inbox 8 threads) | Fixed | ✅ |
| GAP-29 (Workflows 12 items) | Fixed | ✅ |
| GAP-30 (Records AI summary + risks) | Fixed | ✅ |
| GAP-31 (Admin integrations connected) | Fixed | ✅ |
| GAP-32 (Mock data realistic AU leads) | Fixed | ✅ |
| GAP-33 (whySurfaced rationale data) | Fixed | ✅ |
| GAP-34 (Ghost Intelligence fields) | Fixed | ✅ |
| GAP-35 (DISC full shape) | Fixed | ✅ |
| GAP-36 (API server routes) | Out of scope | ⬜ |
| GAP-37 (Command route consistency) | Fixed | ✅ |
| GAP-38 (Financial nav label) | Fixed | ✅ |
| GAP-39 (Three-layer layout all pages) | Fixed | ✅ |
| Phase 0 (tokens, typography, buttons, cards) | Complete | ✅ |
| Phase 1 (shell, layout, transitions) | Complete | ✅ |
| Phase 2 (dead stubs) | Complete | ✅ |
| Phase 3 (interaction depth) | Complete | ✅ |
| Phase 4 (live feel) | Complete | ✅ |
| Phase 5 (copy) | Complete | ✅ |
| Phase 6 (page depth) | Complete | ✅ |
| Phase 7 (FamilyOfficeOS) | Not started | 🔴 |

**Build completion: 95% (37.5/39 gaps closed)**

---

## Original Build Plan Content (Retained Below for Reference)

> The following is the original BUILD_PLAN.md content preserved for test infrastructure, API routes, and demo script reference.

---

---

## Part 1 — Build Infrastructure (Done ✅)

| Item                   | Status     | File                                                    |
| ---------------------- | ---------- | ------------------------------------------------------- |
| Skill file             | ✅         | `.github/skills/camber-casper-build/SKILL.md`           |
| Vitest config          | ✅         | `vitest.config.ts`                                      |
| Playwright config      | ✅         | `playwright.config.ts`                                  |
| Test setup file        | ✅         | `tests/setup.ts`                                        |
| ESLint flat config     | ✅         | `eslint.config.js`                                      |
| Makefile               | ✅         | `Makefile`                                              |
| Testing deps           | ✅         | vitest, @testing-library/react, jsdom, @playwright/test |
| Workspace instructions | ✅ pending | `.github/copilot-instructions.md`                       |

---

## Part 2 — Document Queue (Textfiles to Process Before Build)

These documents are in `Textfiles/` and have NOT yet been fully processed into the gap analysis. They must be read and any additional gaps folded into the plan before the build phase begins.

| File                                      | Key Themes                                                                                                           | Status                                            |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `Call System Architecture — Technica.txt` | Vapi.ai config, Twilio AU numbers, Soldier agent, webhook events, transcript/recording                               | 🔄 Partially read — call arch added to plan below |
| `War Room Architecture Discovery — C.txt` | 7-component war room, Ghost OSINT 3,200 lines, Market Positioning Engine, Intelligence Dashboard, War Table React UI | 🔄 Partially read — added to Phase 4              |
| `Demo Features Showcase — Ironbark's.txt` | Top 15 wow features: VICKI reasoning, Document Intelligence, Silicon CFO, call quality scores                        | 🔄 Partially read                                 |
| `Best ideas to display on the mock.txt`   | "Work Prepared Owner Approves" as headline; Sales Call Centre as hero; Simple/Detailed modes; Today view             | ✅ Read                                           |
| `Pasted text.txt`                         | WorkshopOS UX modes; bay utilisation map; industry-specific language; information architecture                       | ✅ Read                                           |
| `Pasted text (1) (1).txt`                 | Not yet read                                                                                                         | ❌ Pending                                        |
| `The Unified Client Understanding Sy.txt` | Not yet read                                                                                                         | ❌ Pending                                        |

**Action required before Phase 1 build:** Read remaining two documents and append any new gaps to GAP_ANALYSIS.md and to this plan.

---

## Part 3 — Additional Gaps Found in Textfiles

These are gaps found AFTER the initial gap analysis (from the War Room and Call System documents):

### 🔴 GAP-40 — Call system has no backend webhook receiver

**Source:** `Call System Architecture — Technica.txt`
The production Ironbark system uses:

- `POST /api/vapi/webhook` — receives Vapi events: `call.started`, `call.ended`, `transcript.ready`, `recording.ready`
- All outcomes route through this webhook

**Current:** `api-server/` has only `/healthz`. No webhook route exists.

### 🔴 GAP-41 — Vapi call trigger endpoint not mocked

**Source:** `Call System Architecture — Technica.txt`
The System Architecture requires:

```
POST /api/calls/outbound     → trigger Vapi call (returns callId)
POST /api/calls/manual       → manual name/phone/company → Vapi call
GET  /api/calls/:id/status   → poll call state
POST /api/calls/:id/outcome  → post-call summary write-back
```

### 🟡 GAP-42 — Call console missing Vibe Check Score (0–100)

**Source:** `Call System Architecture — Technica.txt`

> "Vibe Check Score (0-100 call quality)" — this is distinct from sentiment percentage and is calculated post-call.

**Current:** Live call console has a "vibe score" bar but it's cosmetic, driven by the `setTimeout` animation. No actual 0–100 score is shown post-call.

### 🟡 GAP-43 — Strategic Command missing 7-component architecture

**Source:** `War Room Architecture Discovery — C.txt`
The War Room (now Strategic Command) has 7 fully documented components:

1. Ghost OSINT (3,200 lines) — front-line intelligence
2. Market Positioning Engine (461 lines) — 8-dimensional competitor profiling
3. Intelligence Dashboard (620 lines) — dead zone / sweet spot detection
4. Property War Room (370 lines) — vertical-specific intel
5. War Table Frontend (260 lines) — React 19 WebSocket command UI
6. Intelligence Service (238 lines) — TypeScript API client with 9 endpoints
7. Ghost Director Market Intel — strategic synthesis

The demo interface should surface at minimum: competitor cards, market movement tiles, signal feed, response packs, and a "field overview" that mirrors the War Table concept.

### 🟡 GAP-44 — Demo Features top 15 not represented in mock

**Source:** `Demo Features Showcase — Ironbark's.txt`
Top wow features not represented in the current demo:

1. **VICKI reasoning chain** — visible AI thinking chain ("1. Querying... 2. Comparing... 3. Identifying...") not present anywhere
2. **Silicon CFO "Truly Spendable Cash"** — the "Truly Spendable Cash" calculation panel is absent from Financial Intelligence
3. **Document Intelligence** — photo to structured data — no representation in Records or Workflows
4. **Call quality scoring** — Vibe Check 0–100 not structured as post-call output

---

## Part 4 — Build Phases

### Phase 0 — Pre-Build Gates (must pass before Phase 1 starts)

- [ ] Read remaining 2 Textfiles and update GAP_ANALYSIS.md
- [ ] Run `make check` — baseline must pass (types + lint + format)
- [ ] Playwright install: `make playwright-install`
- [ ] Confirm dev server starts: `make dev`

---

### Phase 1 — Foundation Fixes (Critical tier — 7 items)

**Target:** All 🔴 CRITICAL gaps resolved
**Test gate:** `make check` passes; `make contamination` passes

| #   | Gap           | Task                                                                         | File(s)                                              |
| --- | ------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------- |
| 1   | GAP-03/GAP-22 | Rename nav label "Signal Engine" → "Strategic Command"; rebuild page content | `components/app-shell.tsx`, `pages/SignalEngine.tsx` |
| 2   | GAP-04        | Fix 5 nav items sharing `LayoutDashboard` icon                               | `components/app-shell.tsx`                           |
| 3   | GAP-01        | Fix primary colour saturation                                                | `index.css`                                          |
| 4   | GAP-32        | Rewrite mock data — 30 realistic AU leads with all required fields           | `lib/mock-data.ts`                                   |
| 5   | GAP-35        | Expand DISC data shape to include blend, 4 scores, cultural notes            | `lib/mock-data.ts`, `store/index.ts`                 |
| 6   | GAP-34        | Add Ghost Intelligence fields to all mock leads                              | `lib/mock-data.ts`                                   |
| 7   | GAP-33        | Add `whySurfaced`, `laneLogic`, `expectedOutcome` to all leads               | `lib/mock-data.ts`                                   |

---

### Phase 2 — Core Page Upgrades (Major tier — CRM, Outbound, Command)

**Target:** Tier 1 pages match locked spec layout exactly
**Test gate:** `make test` passes; `make flow` passes first 6 steps

#### 2A — CRM Page

| Gap    | Change                                                                                                   |
| ------ | -------------------------------------------------------------------------------------------------------- |
| GAP-11 | Add "Why This Lead" panel to right rail (Critical in spec)                                               |
| GAP-12 | Add Ghost Intelligence section (tools, competitors, switching signals)                                   |
| GAP-13 | Add Saved View chips: "High Intent – No Contact 7d", "Post-Meeting Follow-Ups", "Switch Targets (Ghost)" |
| GAP-14 | Add per-timeline-item sentiment label + actor type (agent/human)                                         |
| GAP-15 | Add Relationship Health indicator (Healthy / Cooling / At Risk)                                          |

#### 2B — Outbound Page

| Gap    | Change                                                                                                   |
| ------ | -------------------------------------------------------------------------------------------------------- |
| GAP-16 | Rebuild LiveCallConsole to be dominant modal-style panel (min 320px), not 64px drawer                    |
| GAP-17 | Add Manual Demo Call input form (name + phone + company → call trigger)                                  |
| GAP-18 | Build post-call processing: CRM update → follow-up draft → intelligence update                           |
| GAP-19 | Expand Execute Plan dialog: 4 execution modes + lead breakdown by state                                  |
| GAP-20 | Add lane analytics panel (expandable per lane): connect rate, booking rate, etc.                         |
| GAP-21 | Expand Outbound right panel: opener script, pitch order, objections, persuasion triggers, cultural notes |

#### 2C — Command Page

| Gap    | Change                                                                                                                    |
| ------ | ------------------------------------------------------------------------------------------------------------------------- |
| GAP-09 | Add missing 4 panels: Opportunities, Risk, Activity Delta, Commitments                                                    |
| GAP-10 | Restructure right panel: Ironbark Summary → What Matters Now → Why → Recommended Moves → Watch Signals → Autonomy Context |

---

### Phase 3 — Intelligence + Strategic Command

**Target:** Tier 1 intelligence pages match locked spec
**Test gate:** `make test` passes; `make logic` passes

#### 3A — Intelligence Page

| Gap    | Change                                                                                                 |
| ------ | ------------------------------------------------------------------------------------------------------ |
| GAP-23 | Add Executive Insight Summary hero card (narrative + Apply Strategy Update action)                     |
| GAP-24 | Add persistent right intelligence panel (What Changed / Why / Recommended Adjustment / Impact / Apply) |
| GAP-25 | Wire Apply-to-Outbound to actually mutate lane state in Zustand store                                  |

#### 3B — Strategic Command Page (replaces SignalEngine)

Full rebuild. Must implement:

- Top bar: Active Signals, Threats, Opportunities, Strategies, Actions Deployed
- Left rail: Competitors / Pricing / Market / Technology / Geographic / Customer Sentiment / Supplier
- Centre: Field Overview (competitor cards + market movement tiles) + Signal Feed + Response Packs
- Right panel: Situation Summary / Why It Matters / Recommended Strategy / Execution Impact / Action Routing
- Strategy→Execution Bridge: "8 leads will move to Switch Target lane" preview before approval
- Battlecard panel (competitor tabs: positioning, strengths/weaknesses, pricing, messaging gaps)

---

### Phase 4 — Call System: Depth, Real Dialling & Training Room

**Goal:** The Outbound page call system becomes the most impressive demo moment. Demonstrator can say "I can do a live call right now" and actually mean it. The settings feel like a professional call centre configuration panel. The training room feels like a product differentiator.

---

#### 4A — Call Console Rebuild (Visual + Interaction Depth)

| # | Gap | Task | File(s) |
|---|---|---|---|
| 4A.1 | GAP-16 | Console minimum height 320px when active — not 64px drawer | `components/live-call-console.tsx` |
| 4A.2 | GAP-42 | Sentiment % indicator with live colour shift (green/amber/red) | `components/live-call-console.tsx` |
| 4A.3 | GAP-42 | Vibe Score (0–100) as live dial/gauge during active call | `components/live-call-console.tsx` |
| 4A.4 | GAP-42 | Objection Tracker — chips appear as objections surface in transcript | `components/live-call-console.tsx` |
| 4A.5 | GAP-42 | Disposition Selector — outcome tagging before closing console | `components/live-call-console.tsx` |
| 4A.6 | GAP-42 | Real-time alert slots: "Profile Shift", "Objection Incoming", "Engagement Dropping" — only appear when triggered, not permanent placeholders | `components/live-call-console.tsx` |
| 4A.7 | GAP-42 | Post-call panel: Auto Summary · Key Moments · Objections Extracted · Next Step · Follow-Up Draft | `components/live-call-console.tsx` |
| 4A.8 | — | "Send Follow-Up" button `onClick` wires follow-up draft into Inbox mock | `components/live-call-console.tsx`, `lib/mock-inbox.ts` |
| 4A.9 | — | Transcript scrolls live inside console — no interior scrollbar anti-pattern | `components/live-call-console.tsx` |

---

#### 4B — Call Settings Tab (Outbound Page)

The Outbound page **Settings/Config** tab becomes a genuine-looking call centre configuration surface. Demonstrator can open it, point to settings, and it looks like real operational configuration — not a placeholder.

**Tab architecture:**

```
Outbound Settings
├── General          ← default view, 5 key settings
├── Call Behaviour   ← call timing, retry logic, answer machine
├── Script & Prompt  ← editable system prompt + opener script
├── Compliance       ← DNCR, call windows, recording consent
├── Integrations     ← Vapi, CRM sync, calendar booking
└── Advanced ▸       ← collapsible section with 15+ additional fields
```

| # | Task | Detail |
|---|---|---|
| 4B.1 | General tab — 5 core settings visible by default | Calling Line Identity · Autonomy Mode · Max Daily Calls · Call Recording toggle · Caller ID display name |
| 4B.2 | "Advanced Settings" expandable section | Reveals: Retry Interval · Max Retries · Ring Timeout · Voicemail Detection · Post-call Delay · Concurrent Call Cap · Priority Queue Weight · Whisper Mode · Transfer Destination · Warm Transfer Script · DTMF Passthrough · Recording Format · Webhook Retry Policy · Fallback Lane · Debug Logging |
| 4B.3 | Call Behaviour tab | Answer Machine Detection (on/off) · Voicemail Script · Retry after voicemail (Yes/No/Time) · Max ring time (slider) · Calling hours (time range picker) |
| 4B.4 | Script & Prompt tab | Editable system prompt textarea · Opener script editor · Dynamic variable reference guide ({{contact_name}}, {{pain_point}}, {{company}}) · Tone selector (Professional / Consultative / Direct / Warm) · Script version history (3 versions shown) |
| 4B.5 | Compliance tab | DNCR check toggle · Call window enforcement · Recording consent mode (Auto-announce / Silence / Manual) · Jurisdictional profile (Australia / NZ / Global) · Blocked number list count |
| 4B.6 | Integrations tab | Connected: Vapi (green badge) · CRM Auto-sync (green) · Pending: Calendar Booking · Webhooks configured count |

---

#### 4C — Manual Call (Functional)

Demonstrator can pick up any lead, or manually enter a number, and place a real Vapi-powered call.

| # | Task | Detail |
|---|---|---|
| 4C.1 | Manual Call entry point | Button in Outbound left rail: "Manual Call" — opens a modal/drawer |
| 4C.2 | Manual Call modal | Fields: Contact Name · Phone Number · Company · Notes (optional) · Assigned Script (dropdown of saved scripts) · Call as (Caller ID selector) |
| 4C.3 | Script preview in modal | Selected script shows first 3 lines of opener — demonstrator can see what Ironbark will say |
| 4C.4 | "Dial Now" triggers real Vapi call | `POST /api/calls/manual` → server calls Vapi REST `POST https://api.vapi.ai/call` with assistant config + phone number + metadata |
| 4C.5 | Live console opens on dial | Once call initiated, `LiveCallConsole` mounts and poll `GET /api/calls/:id/status` every 2s for real transcript feed |
| 4C.6 | Environment variable setup | `.env` template: `VAPI_API_KEY`, `VAPI_PHONE_NUMBER_ID`, `VAPI_ASSISTANT_ID`, `VAPI_WEBHOOK_SECRET` — with fallback to demo simulation if not set |
| 4C.7 | Webhook receives live events | Vapi fires `call.started` / `call.ended` / `transcript.ready` → `POST /api/vapi/webhook` → updates `callStore` → polling frontend picks up |

**API routes (existing stubs need wiring):**

```
POST /api/calls/outbound   → { leadId, lane } → calls Vapi if env set, else simulates
POST /api/calls/manual     → { name, phone, company, scriptId } → calls Vapi if env set
GET  /api/calls/:id/status → polls callStore for live state + partial transcript
POST /api/vapi/webhook     → receives Vapi events, updates callStore (exists, needs HMAC verify)
```

**Fallback behaviour:** If `VAPI_API_KEY` is not set, routes return simulated responses indistinguishable from real ones (demo-safe default).

---

#### 4D — Training & Refinement Room

A distinct sub-section of the Outbound page (or accessible from the Call Settings tab) that functions as an **AI call centre training room**. Two Ironbark agents talk to each other while the user watches and can intervene.

| # | Task | Detail |
|---|---|---|
| 4D.1 | "Training & Refinement" entry point | Tab or sub-nav item within Outbound (below Settings) — labelled "Training & Refinement" |
| 4D.2 | Training session setup panel | Select: Script to train · Persona to test against (Skeptical D-type / Friendly I-type / Analytical C-type / Resistant S-type / Committee buyer) · Difficulty (Warm / Neutral / Resistant / Hostile) · Training focus (Opening · Objection Handling · Closing · Price Discussion) |
| 4D.3 | Live dual-agent transcript | Two panels: "Sales Agent (Ironbark)" and "Prospect (Ironbark)" — transcript builds line by line with role badges and sentiment colour |
| 4D.4 | Coach overlay layer | After each exchange, a third "Coach" voice appears inline: "Note: Rep moved too fast to close. C-type prospects need more data." — amber chip annotations between transcript lines |
| 4D.5 | Intervention controls | User can "Pause & Edit" the agent's next line before it sends · "Redirect" button lets user type a coaching note that changes agent's next response · "Restart from here" checkpoint |
| 4D.6 | Session outcome summary | After ~8 exchanges: Vibe Score trend · Objections surfaced · Coaching notes count · "Refine Script" button → applies learnings to Script & Prompt tab |
| 4D.7 | Saved sessions list | Left rail shows previous training sessions with date, persona, score improvement delta (e.g. "Resistant C-type +14 vibe") |
| 4D.8 | In demo mode | Entire session is scripted/simulated — no real API keys required. Real Vapi agent-to-agent calls are the production path. |

---

#### 4E — API Infrastructure (backend wiring)

| # | Task | File(s) |
|---|---|---|
| 4E.1 | Wire `POST /api/calls/manual` to real Vapi `POST https://api.vapi.ai/call` | `api-server/src/routes/calls.ts` |
| 4E.2 | Wire `POST /api/calls/outbound` to Vapi with assistant + lead metadata | `api-server/src/routes/calls.ts` |
| 4E.3 | Add HMAC-SHA256 signature verification to Vapi webhook (using `VAPI_WEBHOOK_SECRET`) | `api-server/src/routes/vapi-webhook.ts` |
| 4E.4 | Add `GET /api/calls/:id/transcript` — returns partial transcript for live polling | `api-server/src/routes/calls.ts` |
| 4E.5 | Add `.env.example` with all required keys + comments | `.env.example` (root) |
| 4E.6 | Add `GET /api/calls/scripts` — returns saved script list for Modal dropdown | `api-server/src/routes/calls.ts` |

---

**Phase 4 test gate:** Manual call modal opens → Dial Now → console mounts → (with VAPI_API_KEY set) real call connects → transcript appears → call ends → post-call panel renders with summary. Without keys: simulation runs identically.

---

### Phase 5 — Supporting Pages

**Target:** Tier 2 pages reach demo-quality depth

#### 5A — Inbox

- Add 6+ mock threads (GAP-28): 2 email, 1 call transcript, 1 meeting summary, 1 message, 1 Teams
- Each thread must extract commitments + show linked lead/company
- Add "Meeting created 4 action items automatically" wow moment thread

#### 5B — Workflows

- Expand to 10+ workflow items across all 7 categories (GAP-29)
- Wire Approve buttons to update Zustand store
- Add right panel audit trail + policy basis fields

#### 5C — Records

- Add AI summary section to right panel (GAP-30)
- Add linked opportunities + risks cards
- Add relationship health badge

#### 5D — Financial Intelligence

- Rebuild 3 key tabs with distinct content: Capital Allocation, Unit Economics, Revenue Attribution (GAP-27)
- Add Silicon CFO "Truly Spendable Cash" calculation panel (GAP-44)

---

### Phase 6 — Entry Flow + Shell Polish

| Gap    | Change                                                                                  |
| ------ | --------------------------------------------------------------------------------------- |
| GAP-06 | Fix Login: add hierarchy "by Camber & Casper / Powered by Ironbark"                     |
| GAP-07 | Add workspace selector + autonomy preset to entry flow                                  |
| GAP-08 | Fix ModeSelect: labels "Guided / Full Control" → not "Executive Brief / Command Center" |
| GAP-05 | Add workspace selector placeholder to sidebar/top bar                                   |
| GAP-02 | Add `--card-elevated` CSS token for highlighted surfaces                                |
| GAP-39 | Fix three-layer layout on Intelligence (add right panel) and Workflows                  |

---

### Phase 7 — Psychological Profiling Layer (visible in CRM, Outbound, Live Call)

Per blueprint §8.11 — the Psychologist Layer must be visible as a demo differentiator.

**CRM right panel** must show (GAP-11, GAP-12, locked spec):

- DISC chart (4 scores with blend label)
- Primary/secondary type badge
- Persona label (EXECUTIVE_BUYER etc.)
- Communication style + decision style
- "Why This Lead" panel — surfacing rationale
- Ghost Intelligence section

**Outbound right panel** must show (GAP-21, locked spec):

- Recommended opener (verbatim script)
- Preferred pace
- Pitch order (1–4 numbered)
- Likely objections with response scripts
- Persuasion triggers
- Red flags
- Cultural adaptation notes (Australian)

**Live call console** must show real-time alert placeholders (GAP-21):

- Profile Shift Detected
- Objection Incoming
- Engagement Dropping
- Style Mismatch

---

### Phase 8 — Readiness Lab + Admin Depth

| Gap    | Change                                                                                |
| ------ | ------------------------------------------------------------------------------------- |
| GAP-26 | Add deployment envelope viewer (permissions grid: allowed/sandbox/human/blocked)      |
| GAP-26 | Add assumption log panel with 10+ seeded assumptions                                  |
| GAP-31 | Seed Admin integrations: at least 3 "Connected" (Vapi, CRM, Calendar), rest "Pending" |

---

### Phase 9 — VICKI Reasoning Chain (Wow Feature)

**Source:** Demo Features Showcase document
Add the visible AI reasoning chain widget to Command page right panel:

```
Ironbark is analysing...
  1. Querying outbound results from last 48h... ✓
  2. Comparing segment performance patterns... ✓
  3. Identifying highest-value switch targets... ✓
  4. Cross-checking DNCR compliance... ✓

Result: "Post-email follow-up with high-C profiles is underperforming.
Switch-target D-type leads are 3.2× more likely to book this week."

→ Apply to Outbound   → View details
```

This should be triggerable from the Command page (click "Analyse Now").

---

## Part 5 — Test Coverage Plan

### Unit Tests (Vitest)

| Test File                                          | What It Tests                                                                   |
| -------------------------------------------------- | ------------------------------------------------------------------------------- |
| `tests/unit/store/zustand.test.ts`                 | `startCall`, `completeCall`, `approveAction`, `updateLeadStage` state mutations |
| `tests/unit/store/autonomy.test.ts`                | Autonomy mode transitions and their effect on allowed actions                   |
| `tests/unit/lib/mock-data.test.ts`                 | Mock lead data shape validation (all required fields present)                   |
| `tests/unit/lib/disc.test.ts`                      | DISC blend logic, score validation                                              |
| `tests/unit/components/stat-strip.test.tsx`        | Renders correct metric values                                                   |
| `tests/unit/components/lane-card.test.tsx`         | Lane card shows all required fields                                             |
| `tests/unit/components/live-call-console.test.tsx` | Console shows/hides correctly; disposition selector renders                     |
| `tests/unit/pages/crm.test.tsx`                    | Right panel sections render on lead selection                                   |
| `tests/unit/pages/outbound.test.tsx`               | Pre-flight dialog opens; Execute Plan button exists                             |
| `tests/unit/pages/strategic-command.test.tsx`      | Response packs render; battlecard opens                                         |

### E2E Tests (Playwright)

| Test File                             | What It Tests                                                            |
| ------------------------------------- | ------------------------------------------------------------------------ |
| `tests/e2e/demo-flow.spec.ts`         | Primary wow flow: Login → Command → CRM → Outbound → call → Intelligence |
| `tests/e2e/navigation.spec.ts`        | All 12 nav links load without error; no 404s                             |
| `tests/e2e/call-console.spec.ts`      | Call initiates, transcript appears, disposition selector works           |
| `tests/e2e/crm-profile.spec.ts`       | Clicking a lead opens full 360° profile with all sections                |
| `tests/e2e/strategic-command.spec.ts` | Signal feed loads; response pack approve flow; outbound link             |
| `tests/e2e/interactions.spec.ts`      | Hover states, transitions (splash check), border-radius rendering        |

### Visual Regression (Playwright Snapshots)

| Test File                    | Baseline Pages                                                 |
| ---------------------------- | -------------------------------------------------------------- |
| `tests/visual/pages.spec.ts` | Login, Command, CRM, Outbound, Strategic Command, Intelligence |

---

## Part 6 — Demo Script (Scripted Build Target)

The build must enable this exact demo flow:

```
1. Login             → Premium entry screen with Camber & Casper hierarchy
2. Mode Select       → Choose "Full Control" (Detailed mode)
3. Today             → See daily brief, prepared actions, one-tap approve
4. Command           → Daily brief narrative + action cards + risk panel
5. CRM               → Pipeline board → click lead → full 360° profile
                        → scroll to "Why This Lead" panel
                        → see DISC blend + Ghost Intelligence together
6. Strategic Command → Competitor signal detected
                        → open response pack → show battlecard
                        → approve → preview "8 leads move to Switch Target lane"
7. Outbound          → Switch Target lane appears
                        → select lead → see opener script + objection forecast
                        → trigger demo call → live console opens
                        → call ends → auto summary + next step generated
8. Intelligence      → Executive insight updates
                        → pattern detected → Apply to Outbound
```

This flow is encoded in `tests/e2e/demo-flow.spec.ts`.

---

## Part 7 — Anti-Drift Rules (Apply to Every Build Commit)

1. **Nav label**: `/signal-engine` route MUST display as "Strategic Command" — never "War Room", "Signal Engine", or anything else
2. **Product naming**: UI text must say "[ProductOS] by Camber & Casper / Powered by Ironbark" — never just "Camber & Casper"
3. **Three-layer layout**: L/C/R structure on every Tier 1 and Tier 2 page
4. **Mock data**: No auto-generated patterns (no `% 8`, no obvious index counters)
5. **DISC shape**: Always `{ dScore, iScore, sScore, cScore, blend, primaryType, secondaryType, confidence }` — never a single letter
6. **Autonomy labels**: Locked — do not rename the four modes
7. **Ironbark naming**: "Prepared by Ironbark" — never "AI suggests" or "The AI..."
8. **Colours**: Never `hsl(210 90% 60%)` — use `hsl(210 55% 52%)` max

---

## Part 8 — File Index (All Files Created/To Create)

### Infrastructure (Created)

- `.github/skills/camber-casper-build/SKILL.md`
- `.github/copilot-instructions.md` (pending)
- `vitest.config.ts`
- `playwright.config.ts`
- `tests/setup.ts`
- `eslint.config.js`
- `Makefile`
- `GAP_ANALYSIS.md`
- `BUILD_PLAN.md` (this file)

### Test Files (To Create in Phase 0–2)

- `tests/unit/store/zustand.test.ts`
- `tests/unit/lib/mock-data.test.ts`
- `tests/e2e/demo-flow.spec.ts`
- `tests/e2e/navigation.spec.ts`
- `tests/e2e/interactions.spec.ts`
- `tests/visual/pages.spec.ts`

### Pages (To Modify in Phases 1–6)

- `pages/SignalEngine.tsx` → Strategic Command rebuild
- `pages/CRM.tsx` → Ghost Intelligence + Why This Lead + Saved Views
- `pages/Outbound.tsx` → Manual call form + expanded right panel + post-call engine
- `pages/CommandCenter.tsx` → 4 missing panels + right panel restructure
- `pages/Intelligence.tsx` → Hero insight card + right panel + Apply wiring
- `pages/FinancialIntelligence.tsx` → Silicon CFO panel + distinct tab content
- `pages/Login.tsx` → Hierarchy fix
- `pages/ModeSelect.tsx` → Label fix

### Components (To Modify)

- `components/app-shell.tsx` → Nav icons + workspace selector + "Strategic Command" label
- `components/live-call-console.tsx` → Dominant panel + Vibe Check Score + real-time alerts

### Data (To Rewrite)

- `lib/mock-data.ts` → 30 realistic AU leads with all required fields
- `lib/mock-workflow.ts` → 10+ workflow items
- `lib/mock-inbox.ts` → 6+ threads
- `lib/mock-records.ts` → AI summary + linked objects

### API (To Create)

- `api-server/src/routes/calls.ts` → Call endpoints (mocked responses)
- `api-server/src/routes/webhook.ts` → Vapi webhook receiver stub

### CSS

- `index.css` → Fix primary colour + add `--card-elevated` token

---

_This plan must be updated as Textfiles are processed and additional gaps discovered._
