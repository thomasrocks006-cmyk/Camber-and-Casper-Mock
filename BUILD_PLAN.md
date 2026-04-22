# Camber & Casper Mock — Master Build Plan

**Status:** Draft v1.0 | April 22, 2026
**Source documents:** GAP_ANALYSIS.md + all 15,038 lines of ChatGPT blueprint + 7 Textfiles
**Build approach:** Phase-based, test-gated, anti-drift

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

### Phase 4 — Call System + API

| Gap                  | Change                                                                 | File(s)                            |
| -------------------- | ---------------------------------------------------------------------- | ---------------------------------- |
| GAP-36/GAP-40/GAP-41 | Add API route stubs for call system                                    | `api-server/src/routes/calls.ts`   |
| GAP-16/GAP-42        | Rebuild call console with Vibe Check Score (0–100) as post-call output | `components/live-call-console.tsx` |

**API routes to create:**

```
POST /api/calls/outbound     → { leadId, lane } → { callId, status }
POST /api/calls/manual       → { name, phone, company } → { callId }
GET  /api/calls/:id/status   → { status, duration, transcript? }
POST /api/vapi/webhook        → Vapi event receiver (call.started, call.ended, transcript.ready)
```

For demo mode, these routes return mocked responses. Real Vapi integration is a placeholder.

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
