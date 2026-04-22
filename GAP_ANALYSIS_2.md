# Camber & Casper Mock — Gap Analysis 2

**7-File Analysis across all Textfiles/ source documents (5,730 lines)**
Documents read: All 7 files ✅ 100% complete
Codebase analysed: pages/, components/, lib/mock-\*.ts, store/index.ts, api-server/

Gaps continue numbering from GAP-44 (last entry in GAP_ANALYSIS.md).

---

## Source Document Index

| Abbrev | File                                                  | Lines |
| ------ | ----------------------------------------------------- | ----- |
| **F1** | `Best ideas to display on the mock.txt`               | 703   |
| **F2** | `Call System Architecture — Technica.txt`             | 683   |
| **F3** | `Demo Features Showcase — Ironbark's.txt`             | 640   |
| **F4** | `Pasted text (1) (1).txt` — Scout Agent Analysis      | 579   |
| **F5** | `Pasted text.txt` — Operating Modes + WorkshopOS Skin | 858   |
| **F6** | `The Unified Client Understanding Sy.txt`             | 938   |
| **F7** | `War Room Architecture Discovery — C.txt`             | 329   |

---

## Tier Classification

| Tier            | Meaning                                                      |
| --------------- | ------------------------------------------------------------ |
| 🔴 **CRITICAL** | Demo-breaking — makes the system look incomplete or wrong    |
| 🟡 **MAJOR**    | Significantly weakens the demo / contradicts locked spec     |
| 🟢 **POLISH**   | Would elevate quality but does not break the core demo story |

---

## Section 1 — Call Console (Live and Post-Call)

### 🔴 GAP-45 — Call console minimum height violated; collapses to 64px

**Source (copilot-instructions.md + F2 lines 1–30, F3 lines 458–472):**

> "Minimum visible height: 320px when active (not 64px drawer)"
> The call system is the hero demo screen. Vibe Check, Objection Tracker, and Disposition Selector must all be simultaneously visible.

**Current `components/live-call-console.tsx`:**

```tsx
<div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border shadow-2xl z-50 h-64 flex flex-col">
```

`h-64` = 256px. The 40px header bar leaves only ~216px for content. The right-side panel (`w-80`) contains Vibe Score and Objection Detection but is cramped — no Disposition Selector, no Sentiment %, no real-time alert slots. On any screen shorter than 900px the useful working surface falls below 200px.

**Required fix:** Expand to `min-h-80` (320px) minimum. On "active" state, slot should expand to ~480px to show the full 4-panel spec: transcript | vibe | objections | disposition.

---

### 🔴 GAP-46 — Post-call panel missing Auto Summary, Key Moments, Objections Extracted, Next Step, Follow-Up Draft

**Source (copilot-instructions.md, F2 lines 23–50, F3 lines 458–475):**

> "Post-call panel must render: Auto Summary · Key Moments · Objections Extracted · Next Step · Follow-Up Draft"

**Current `components/live-call-console.tsx` (lines 93–120):**

The `completed` state renders a small stub — only a "Close Console" button and inline `callConsole.outcome`. There is no post-call analysis panel whatsoever. The store's `completeCall(vibeScore, sentiment, objections)` signature exists but the three payload fields are never displayed beyond a stub vibe bar.

**Required fix:** On `callConsole.status === 'completed'`, render a full-height post-call panel with 5 named sections fed from mock data (auto-summary prose, 2–3 key moment timestamps, extracted objection chips, a next-step action, a pre-drafted follow-up email preview).

---

### 🟡 GAP-47 — Call console missing Disposition Selector

**Source (copilot-instructions.md, F2 lines 361–376):**

Disposition = the human rep's classification of call outcome, distinct from the AI's vibe score. Outcomes defined in `CallOutcome` enum: `MEETING_BOOKED | CALL_BACK | NOT_INTERESTED | VOICEMAIL | NO_ANSWER | HOSTILE | WRONG_NUMBER | GATEKEEPERED | BLOCKED`.

**Current:** No disposition UI exists. The `completeCall()` action accepts a sentiment string (`'positive' | 'neutral' | 'negative'`) which is not the same as the disposition taxonomy.

**Required fix:** Add a Disposition Selector component in the call console right panel — a grid of 6–8 labeled outcome buttons, visually distinct, that writes to `callConsole.disposition`.

---

### 🟡 GAP-48 — Call console missing Sentiment % indicator

**Source (copilot-instructions.md, F2 lines 410–430, F3 lines 458–462):**

> "Must have: Sentiment % indicator, Vibe Score (0–100), Objection Tracker chips, Disposition Selector"

**Current:** Only the Vibe Score (0–100 progress bar) exists. "Sentiment %" is a separate metric — a rolling positive-word-ratio derived from the transcript, shown as `Positive 74%` distinct from the Vibe composite score.

**Required fix:** Add a `Sentiment %` inline display alongside the Vibe Score. Feed it from a transcript scanning mock that counts positive vs negative signal words per turn.

---

### 🟡 GAP-49 — Real-time alert placeholder slots absent (Profile Shift / Objection Incoming / Engagement Dropping)

**Source (copilot-instructions.md, F2 lines 425–455, F3 lines 474–490):**

> "Real-time alert placeholder slots must exist: Profile Shift / Objection Incoming / Engagement Dropping"

**Current:** No alert slot area exists in the console. The vibe score changes but never triggers a labelled alert card.

**Required fix:** Three distinct styled alert slots in the live call panel that can flash active. In mock mode, trigger "Engagement Dropping" alert when vibe score drops below 50. "Objection Incoming" triggers when an objection is detected. "Profile Shift" triggers mid-call as a demo animation.

---

### 🟡 GAP-50 — Lead Temperature Classification not shown pre-call or in outbound lanes

**Source (F2 lines 175–195):**

The Campaign Strategy Director classifies leads by age into 5 temperature buckets:

| Age          | Temperature | Strategy          |
| ------------ | ----------- | ----------------- |
| 0–7 days     | 🔥 HOT      | HOT_INBOUND_CLOSE |
| 7–30 days    | ☀️ WARM     | TRIGGER_DISCOVERY |
| 30–180 days  | 🌤️ COOL     | WARM_REENGAGEMENT |
| 180–730 days | ❄️ COLD     | COLD_RESURRECTION |
| 730+ days    | 🧊 FROZEN   | COLD_RESURRECTION |

**Current `lib/mock-data.ts` + `store/index.ts`:** Lead records have no `leadAge`, `temperature`, or `strategyType` field. Lane cards in Outbound show no temperature indicator.

**Required fix:** Add `leadAge: number` (days since creation), `temperature: 'hot' | 'warm' | 'cool' | 'cold' | 'frozen'`, and `strategyType: string` to the Lead type. Render a temperature badge on CRM kanban cards and Outbound lane cards.

---

### 🟡 GAP-51 — Pre-call Battlecard panel absent from Outbound / CRM

**Source (F4 lines 145–195, F2 lines 195–250):**

Before any call, the Scout Agent produces a Battlecard containing:

- Decision-maker profile (name, title, authority score, direct contact)
- Trigger event (e.g. `SEEK_JOB_POSTING` — "Posted BDM role on SEEK")
- ICP match score (e.g. 92/100, "hot")
- `recommendedOpener` ("G'day Sarah, saw you're hiring a BDM on SEEK…")
- `painPointsToProbe` (3-item list)
- `competitorIntel` (current CRM tool, likely pain)
- `australianContext` (state, industry cluster, cultural notes)

**Current `pages/Outbound.tsx` + `pages/CRM.tsx`:** No battlecard panel exists. The right panel in CRM shows DISC bars, company info, and a stub timeline. The recommended opener, trigger event, and ICP score are nowhere shown. The `mock-data.ts` includes `whySurfaced` and `recommendedOpener` fields on leads but they are not rendered in any panel.

**Required fix:** In the CRM right panel and Outbound lane card detail view, add a collapsible "Battlecard" section rendering: trigger type chip, authority score, ICP match, recommended opener in a bordered quote block, pain points as chips, and competitor intel.

---

### 🟢 GAP-52 — Trust Window Protocol not shown on pre-call prep screen

**Source (F2 lines 300–325):**

> "Critical finding: If prospect doesn't hang up in first 5 seconds, 70% chance they'll listen for 60+ seconds."

The Trust Window Protocol defines a 5-second-critical-window opening script: acknowledge busy-ness → time-box → offer exit → question format.

**Current:** No pre-call briefing panel exists in the call initiation flow.

**Required fix:** When a call is initiated from CRM or Outbound, show a brief "Pre-Call Brief" tooltip or overlay: the recommended opening line, the trust window principle (5-second note), and the lead's DISC adaptation note. Dismisses automatically when call connects.

---

### 🟢 GAP-53 — Australian discourse markers absent from call transcript display

**Source (F2 lines 260–295):**

The Ironbark voice system uses 150+ Australian lexical replacements and specific discourse markers (g'day, no worries, arvo, reckon, she'll be right, fair dinkum, mate) that make the AI's voice distinctly Australian.

**Current `components/live-call-console.tsx`:** The mock transcript reads: "Hi there, calling from Camber & Casper regarding the recent quote." — generic American/neutral English.

**Required fix:** Update all mock transcript lines to use Australian patterns. Opening: "G'day, it's Alex from Camber & Casper…" Use "no worries", "reckon", and "arvo" naturally in the simulated prospect replies.

---

## Section 2 — Today Page

### 🔴 GAP-54 — Today page lacks AI daily narrative and is missing 5 core WorkshopOS-specific widgets

**Source (F1 lines 85–120, F5 lines 25–85, F6 lines 60–100):**

The Today page in Simple Mode must be a single AI-generated feed, not a generic "Prepared Actions" list. Specific required widgets absent from current build:

1. **AI Daily Narrative** — 2–4 sentence plain-English briefing explaining _why_ these are today's priorities (not just a card list). Example: "It's a heavy day. Super hits tomorrow, the Hilux is waiting on a backorder, and you have 4 unanswered calls from this morning."
2. **Unanswered Calls Widget** — count of today's missed calls with one-tap callback draft
3. **Cash Flow Snapshot** — invoiced today / paid today / outstanding; plain English ("You've invoiced $3,400 today, $1,200 has been paid")
4. **Jobs Awaiting Authorisation** — count badge + list with one-tap approve/reject
5. **Vehicles Due for Pickup** — list of completed jobs waiting for customer collection

**Current `pages/Today.tsx`:** Shows only `<StatStrip>` metrics and `preparedActions` card list. None of the 5 widgets above exist. The page title says "Prepared Actions" — which is a sub-feature, not the page concept.

**Required fix:** Restructure Today into a proper feed with: (1) AI narrative hero card, (2) unanswered calls widget, (3) cash snapshot widget, (4) authorisation queue widget, (5) vehicles due widget, (6) existing prepared actions section re-labelled "Prepared For Your Approval."

---

### 🔴 GAP-55 — Today page missing Industry Feed

**Source (F1 lines 135–160, F5 lines 55–80):**

> "Industry feed included: mechanic news, supplier updates (Burson, Repco), local market intelligence, compliance alerts (roadworthy regulation changes, MVIS updates)"
> "In Simple Mode, the home screen is a single feed — [this] is where industry news appears as cards"

**Current:** No industry feed exists anywhere in the app. The mock data files (`lib/mock-data.ts`, `lib/mock-intel.ts`) have no industry news structure.

**Required fix:** Add `lib/mock-industry-feed.ts` with 4–6 industry feed items (e.g. "Burson: Brake pad pricing +12% from May 1 — Ironbark has identified a Repco alternative at old-price levels", "VicRoads: New roadworthy inspection checklist published — affects 2026 models"). Render as a scrollable card row or vertical feed section on Today.

---

### 🟡 GAP-56 — Today right panel is not the "Prompt Rail" structure

**Source (F1 lines 195–280):**

The right panel on Today must be a structured "Prompt Rail" with 5 named sections:

1. **Tonight** — what needs to happen before end of day
2. **Tomorrow** — what's coming that needs prep
3. **Worth Rethinking** — strategic nudge cards (separate from operational)
4. **Prepared For You** — items assembled and ready for one-tap approval
5. **Industry Move** — one key industry signal with implication

**Current `pages/Today.tsx`:** Uses the generic `RightPanel` / `PanelSection` component which shows static intelligence stubs. No section labelling matches the Prompt Rail structure.

**Required fix:** Rename and restructure the right panel on Today to use the 5 Prompt Rail sections. Each section has 1–2 items max. The "Worth Rethinking" items use a distinct visual treatment (softer border, different icon) to signal strategic vs operational.

---

### 🟡 GAP-57 — "Rethink Cards" / strategic nudge category absent

**Source (F1 lines 240–285):**

Rethink Cards are _strategically distinct_ from operational action cards. They prompt the owner to think differently:

- "You're winning quote requests but losing approvals. Consider staged repair pricing."
- "Your best customers are ageing vehicles but outreach is generic."
- "Missed calls clustering 4:30–5:30pm. You need a different callback workflow."
- "Labour rate below local benchmark. Margin pressure may worsen."

**Current:** All cards in `preparedActions` are operational (approve this, send that). No strategic-nudge category exists in `store/index.ts` or mock data.

**Required fix:** Add a `type: 'operational' | 'strategic'` field to prepared actions. Strategic type renders with a different icon (e.g. `Lightbulb` vs `Zap`), different border treatment, and no approve/skip buttons — only a "Think About This" dismiss or expand action.

---

### 🟡 GAP-58 — "Solution Cards" (cheapest / safest / fastest) not present

**Source (F1 lines 300–320):**

When something goes wrong, Ironbark prepares 3 solution options for the owner to choose from — not an alert, but a prepared resolution:

> "Tomorrow's Hilux service blocked by backorder. I found a local substitute, a one-day courier, and a reschedule path."
> Three prepared options: Cheapest fix / Safest fix / Fastest fix

**Current:** No "Solution Card" component or data structure exists. Blocking situations surface only as warnings without resolution options.

**Required fix:** Add a `SolutionCard` component with a problem statement and 3 option buttons labelled "Cheapest", "Safest", "Fastest" — each with a one-line description and estimated cost/time. Include 1–2 of these in the Today mock data.

---

### 🟡 GAP-59 — Bay utilisation map absent from Today / WorkshopOS skin

**Source (F5 lines 38–53):**

> "Bay utilisation map (visual grid of bays — green = occupied, yellow = waiting, grey = empty)"

This is called out as the #1 "wow demo moment" for the WorkshopOS skin.

**Current:** No bay map exists. The Today page has no spatial/operational view of workshop capacity.

**Required fix:** Add a `BayMap` component — a compact grid of 6–8 bay cells, each colour-coded by status with a vehicle make/model label. Render in the Today centre column above the prepared actions feed.

---

### 🟢 GAP-60 — Focus Mode indicator absent from Today

**Source (F1 lines 295–315, F5 lines 310–340):**

> "Focus Mode / Operator Deep Work Guard — disable social media/distractions; 'Don't Break My Flow' intercept; focus stats; tied to workload and schedule"
> "Focus Mode indicator on Today page — 'Focus window active until 11:30'"

**Current:** No focus mode concept exists anywhere in the codebase.

**Required fix:** Add a subtle Focus Mode banner/badge to the Today header area. When active (set it mock-active by default), shows: "Operator Focus active until 11:30 — DigressionGuard on." Include a toggle in Admin/Settings. No need to implement actual OS-level blocking; the UI indicator is sufficient for the demo.

---

## Section 3 — VICKI / Intelligence Layer

### 🔴 GAP-61 — No Silicon CFO "Truly Spendable Cash" panel anywhere in the app

**Source (F3 lines 65–110, F6 lines 180–220):**

The Silicon CFO is specifically described as the #3 "Wow Factor" demo feature. Its signature output is the "Truly Spendable Cash" calculation:

```
Bank Balance:           $42,000
- Outstanding Payables: -$8,500
- Tax Provision (10%):  -$4,200
- Safety Buffer (2wk):  -$6,800
──────────────────────────────
TRULY SPENDABLE CASH:   $22,500
```

Followed by plain-English answers to "Can I afford to hire another mechanic?"

**Current `pages/FinancialIntelligence.tsx`:** Has a standard financial dashboard with charts and metrics. No "Truly Spendable" computation panel, no safety buffer deduction logic, no hire affordability analysis.

**Required fix:** Add a `SiliconCFO` component panel on the Financial Intelligence page featuring: the 4-line deduction calculation table, a "Truly Spendable" highlighted figure, and 1 conversational Q&A example ("Can I afford to hire a mechanic at $85K?" → structured answer with conditions).

---

### 🟡 GAP-62 — VICKI reasoning chain (chain-of-thought) not visualised

**Source (F3 lines 22–55, F6 lines 55–95):**

The #1 "Wow Factor" feature is that VICKI doesn't just answer — she shows her thinking:

```
VICKI (visible thinking):
1. Querying financial data... ✓
2. Comparing to 3-month average... ✓
3. Identifying top suppliers... ✓
4. Analyzing unusual purchases... ✓

Answer: "Your parts cost is up 23% due to..."
```

This reasoning chain is what distinguishes VICKI from a standard chatbot.

**Current:** The `CommandCenter.tsx` Daily Brief is a static paragraph. There is no chat interface, no reasoning chain UI, no VICKI conversation component anywhere in the app.

**Required fix:** Add a VICKI chat panel or slide-out on the CommandCenter page. Include a static demo exchange showing the numbered reasoning steps before the answer. Use a `Thinking...` step-reveal animation in the mock.

---

### 🟡 GAP-63 — Advisory Panel (multi-perspective AI board) not present

**Source (F3 lines 165–225):**

The Advisory Panel is the #8 feature — simulates a 4-person expert board (Accountant, Lawyer, Operations, Risk) each rendering an independent verdict with reasoning. A Panel Chair (VICKI) synthesises a final recommendation.

Demo scenario: "Should we offer 6-month payment plans?" → 4 perspectives shown simultaneously → consensus recommendation.

**Current:** No advisory panel component or page section exists.

**Required fix:** Add an "Advisory Panel" section to Financial Intelligence or CommandCenter. Build a 2×2 card grid showing 4 "advisor" voices (labelled by role, each with a verdict chip + 2-line rationale), plus a full-width "Panel Chair" synthesis card below.

---

### 🟡 GAP-64 — Match Engine invoice reconciliation UI not present

**Source (F3 lines 125–165):**

Match Engine = 3-way matching (PO + receipt + invoice). The demo scenario is a variance table with:

- Quantity mismatch: Ordered 20, Invoiced 22 (+2)
- Unit price variance: Agreed $45, Invoiced $47 (+$2)
- Total variance: +$134 (14.9%)
- Benford's Law anomaly flag

**Current `pages/FinancialIntelligence.tsx`:** No invoice matching or variance detection panel.

**Required fix:** Add a "Match Engine" section with a 3-row comparison table (PO / Receipt / Invoice columns) and a variance analysis summary. Include the Benford's Law "SUSPICIOUS" flag as a styled badge. Include "HOLD for approval" CTA.

---

### 🟡 GAP-65 — Dual-Model Verification UI not present

**Source (F3 lines 112–130):**

For high-stakes decisions, TWO AI models (Claude + GPT-4) analyse independently. Their results are compared. Disagreements are flagged for human review. This communicates AI safety and reliability.

Demo scenario: $8,500 contract analysis — both models shown loading → 95% agreement → 1 clause flagged for human review.

**Current:** No dual-model concept exists anywhere in the UI.

**Required fix:** Add a `DualVerification` component usable on invoice approval cards or the Financial Intelligence page. Show 2 progress indicators ("Model 1: Analyzing ✓", "Model 2: Analyzing ✓"), then a match percentage, then any flagged disagreements. Can be a collapsible section on large invoice cards.

---

### 🟡 GAP-66 — Memory Layer continuity references absent

**Source (F6 lines 150–260, F1 lines 340–365):**

> "Last month you said you wanted to be firmer on overdue invoices. I've adjusted the drafts."
> "You flagged EV servicing to revisit. Demand has risen again."
> "On March 15, you decided to switch to ABC Auto Parts because they offered 15% better pricing."

The Memory Layer creates the feeling that the system _knows_ the owner across time. This is the "Memory and Continuity" wow moment.

**Current:** No cross-session memory references exist anywhere. The Daily Brief on CommandCenter reads like a first interaction.

**Required fix:** Add 2–3 memory callout chips to the CommandCenter Daily Brief and right panel. Style them distinctly (e.g. clock icon + lighter background): "You said last week: be firmer on overdue follow-ups. 3 drafts adjusted accordingly." This is mock data only — no real persistence required.

---

### 🟢 GAP-67 — Alert Engine threshold monitoring not surfaced

**Source (F3 lines 310–355):**

The Alert Engine monitors 50+ business metrics continuously. The demo scenario is a cash buffer alert:

> "Cash at $14,200. Safety buffer minimum $12,000. Expected $11,800 in 7 days (87% confidence). Contributing factors: payroll -$8,500, parts payment -$3,200, revenue -15% vs forecast. Recommended actions: [3 steps]."

**Current `pages/FinancialIntelligence.tsx`:** Has generic alert items in mock data but no structured Alert Engine card with the contributing factors list, confidence %, and 3-step action plan.

**Required fix:** Add an "Ironbark Alert" card component with: severity header, current vs threshold comparison, 7-day forecast with confidence %, contributing factors list, and recommended actions. At least 1 live example in the Financial Intelligence mock data.

---

## Section 4 — Scout / CRM / Lead Intelligence

### 🟡 GAP-68 — Scout trigger types not displayed in CRM or Outbound leads

**Source (F4 lines 70–140, F4 lines 340–400):**

Scout detects 6 trigger types that surface _why_ a lead is in the queue:

| Trigger                     | Signal                   | Confidence |
| --------------------------- | ------------------------ | ---------- |
| `SEEK_JOB_POSTING`          | Hiring BDM/sales role    | High       |
| `ABN_REGISTRATION`          | New business < 12mo      | High       |
| `FUNDING_ROUND`             | Recent capital raise     | Very High  |
| `COMPETITOR_PRICING_CHANGE` | Their tool got expensive | Medium     |
| `LINKEDIN_JOB_CHANGE`       | New decision-maker       | Medium     |
| `WEBSITE_CHANGE`            | Major site update        | Low-Medium |

**Current `lib/mock-data.ts`:** Leads have `whySurfaced` (a prose string) but no structured `triggerType` or `triggerConfidence` fields.

**Required fix:** Add `triggerType: string` and `triggerConfidence: 'very_high' | 'high' | 'medium' | 'low'` to the Lead type. Render a trigger chip on CRM kanban cards ("🔥 Funding Round — Very High") and in the lead right panel.

---

### 🟡 GAP-69 — ICP Match Score not shown in CRM right panel

**Source (F4 lines 155–175):**

The ICP Match Score (0–100, "hot" / "warm" / "cold") is a core lead quality indicator alongside the DISC profile. Score factors: industry, employee count, revenue, fit-level.

**Current:** No ICP score exists in lead data or CRM right panel.

**Required fix:** Add `icpScore: number` and `icpFitLevel: 'hot' | 'warm' | 'cold'` fields to mock leads. Render as a labelled score badge in the CRM right panel alongside DISC bars.

---

### 🟡 GAP-70 — Decision-Maker Authority Score absent from CRM

**Source (F4 lines 100–140):**

The Decision-Maker Scorer produces authority scores (0–100) classifying contacts as Economic Buyer (90–100), High Influencer (70–89), or Moderate Influencer (50–69). This directly changes call strategy.

**Current:** Lead contacts have no authority score.

**Required fix:** Add `authorityScore: number` and `decisionLevel: 'economic_buyer' | 'high_influencer' | 'moderate_influencer'` to lead contact objects. Render in CRM right panel contact section as a labelled bar or badge.

---

### 🟢 GAP-71 — No lead age display in CRM or Outbound

**Source (F2 lines 175–200, F4 lines 180–220):**

Lead age in days is the primary input to temperature classification and call strategy selection. The Campaign Strategy Director uses it to pick between COLD_RESURRECTION, WARM_REENGAGEMENT, or HOT_INBOUND_CLOSE.

**Current:** Lead objects have `createdAt` but it is not calculated or displayed as "X days old" anywhere.

**Required fix:** Display lead age ("47 days") as a secondary detail on CRM kanban cards and lead right panel. Calculate from `createdAt` date field.

---

### 🟢 GAP-72 — Recommended Opener from battlecard not shown before outbound call

**Source (F4 lines 160–180, F2 lines 228–252):**

The battlecard `recommendedOpener` field is the exact first sentence the AI agent will use, adapted from trigger event + DISC profile. Showing it to the human rep before the call is a key demo moment.

**Current `lib/mock-data.ts`:** `recommendedOpener` field exists but is never rendered in any UI component.

**Required fix:** In the Outbound lane card expanded view and CRM right panel "Ready to Call" state, show `recommendedOpener` in a bordered quote block labelled "Recommended Opening Line." Include "Copy" button.

---

## Section 5 — Strategic Command / War Room

### 🟡 GAP-73 — Ghost OSINT signal categories not properly represented in Strategic Command

**Source (F7 lines 45–90, F3 lines 155–175):**

The War Room's Ghost OSINT module monitors 20+ signal types grouped into:

- **Hiring signals** — job postings, expansion indicators
- **Technology signals** — CRM changes, tool removals, tech stack updates
- **Pricing signals** — competitor pricing page updates
- **Content signals** — case studies, messaging shifts
- **Market position signals** — funding rounds, conference speeches

**Current `pages/SignalEngine.tsx`:** Left rail shows only 6 signal type labels with counts. The signal table renders signals but without visual category grouping, confidence scores, or Ghost OSINT attribution ("Detected via Ghost OSINT" label).

**Required fix:** Add Ghost attribution badges to signal rows ("Ghost OSINT — automatic"). Add confidence level column. Ensure all 5 signal categories above are represented in mock data with distinct icon treatment.

---

### 🟡 GAP-74 — Counter-strategy generation not present in Strategic Command

**Source (F3 lines 153–178, F7 lines 155–210):**

When a competitor move is detected, War Room automatically generates a counter-strategy:

> "RepairDesk raised pricing 18%. Target their upset customers (48–72hr window). Draft outreach: 'Noticed RepairDesk raised prices? We didn't.' Battlecard updated: old angle 15% cheaper → new angle 35% cheaper + price-locked."

**Current `pages/SignalEngine.tsx`:** Signal detail view shows "Route to CRM" and "Send to Outbound" buttons. No counter-strategy, no generated battlecard update, no urgency window indicator.

**Required fix:** On signal detail expanded view, add an "Ironbark Counter-Strategy" section with: the recommended action headline, a 2–3 step execution plan, and an urgency window if relevant ("Action window: 48–72 hours"). Include "Execute Strategy" and "Customise" CTAs.

---

### 🟡 GAP-75 — War Table live metrics panel and Command Palette absent

**Source (F7 lines 115–140):**

The War Table frontend includes:

- Live WebSocket metrics grid: active operations, conversion rate, response time, intelligence score
- Command Palette (⌘K quick-access, VS Code-style)
- Compliance dashboard section (DNCR status, calling windows by state)
- Agent status panels

**Current:** The Strategic Command page has a basic signal table. No live-updating metrics grid, no ⌘K command palette, no DNCR compliance panel.

**Required fix:** Add a metrics strip at the top of Strategic Command showing 4 live-updating counters (mock animated): Active Operations, Intelligence Score, Competitors Tracked, Alerts Today. Add a `⌘K` command palette button in the top-right that opens a searchable action list.

---

### 🟢 GAP-76 — Competitor profile cards not present in Strategic Command

**Source (F3 lines 153–175, F7 lines 155–175):**

The War Room tracks named competitors with profiles: threat level, last detected move, recommended battlecard angle, market position.

For WorkshopOS: RepairDesk, Protractor, Workshop Wizard + local workshop competitors.

**Current:** Signals reference company names but there is no persistent "Competitor Profile" card view.

**Required fix:** Add a "Tracked Competitors" section in the Strategic Command left rail or a secondary tab. Show 3–4 competitor cards with: name, threat level badge, last detected move, and current battlecard angle.

---

## Section 6 — Conversational Analytics / Voice Ask

### 🔴 GAP-77 — No Conversational Analytics / Voice Ask interface exists anywhere

**Source (F1 lines 130–155, F5 lines 22–35, F3 lines 22–55):**

Conversational Analytics is identified as one of the top 3 immediate priorities and a core demo differentiator:

> "Conversational Analytics (Simple Mode Insights) — the 'just ask it' feature — high perceived value, differentiates immediately from traditional workshop software."
> Sample queries: "how much did I make last month?", "which jobs are overdue?", "why is my parts cost up?"

The feature requires a chat/search bar where plain-English questions return plain-English answers with supporting visuals.

**Current:** No chat interface exists on any page. The `Intelligence` page (`pages/Intelligence.tsx`) has no conversational input. There is no VICKI interaction surface in the entire app.

**Required fix:** Add a persistent `VICKIAsk` bar to the Intelligence page (or as a floating button). Include 3–4 static Q&A demo exchanges that fire on pre-set button clicks ("Ask VICKI: Why is parts cost up?") and render a structured response with the VICKI reasoning chain (see GAP-62). This is the single highest-value missing interactive feature in the demo.

---

### 🟡 GAP-78 — Intelligence page missing VICKI persona / structured response format

**Source (F6 lines 195–250, F3 lines 22–58):**

VICKI has 3 personas: Strategic (big picture, forward-looking), Operational (tasks, bottlenecks), Financial (cash, invoices, compliance). Each renders a different answer style for the same query.

**Current `pages/Intelligence.tsx`:** Shows a generic intelligence dashboard with metric cards. No persona switching, no structured response format.

**Required fix:** Add a persona toggle (Strategic / Operational / Financial) to the Intelligence page. Each mode shows a different "Ironbark Insight" panel format. Default to Strategic for demo. Rendered as radio/tab chips.

---

## Section 7 — Operating Modes (Simple / Detailed)

### 🟡 GAP-79 — Simple Mode navigation does not collapse to Today / Inbox / Help

**Source (F5 lines 12–30, F6 lines 400–420):**

> "Navigation collapses [in Simple Mode] — only Today, Inbox, and a Help button visible"
> "Mode 1: Simple Mode — the home screen is a single feed, navigation collapses"

**Current `components/app-shell.tsx`:** The mode toggle changes a `viewMode` value in the store, but the navigation does NOT change. All 12 nav items remain visible in both modes. Simple Mode provides no actual simplification of navigation.

**Required fix:** In Simple Mode, filter the sidebar nav to only `Today`, `Inbox`, and a static Help item. All other nav items become accessible via a "More..." collapsed item or are hidden. This is a core part of the Simple Mode concept.

---

### 🟡 GAP-80 — Detailed Mode drill-down analytics panels not present

**Source (F5 lines 30–50):**

Detailed Mode must show:

- Full analytics dashboards (charts, filters, comparison periods, drill-downs)
- Manual AI control (see what AI recommended, choose to approve/edit/reject)
- Integration status panel (what's connected, what's syncing)
- Industry-specific benchmarks ("Your labour rate is 8% below the Melbourne average")

**Current:** Switching to "Detailed" view mode in CommandCenter changes padding/layout slightly. No additional data panels appear. No benchmark comparisons. No integration status.

**Required fix:** In Detailed Mode, add benchmark comparison values to stat strip items (e.g. "+8% vs industry avg"). Add an "Integration Status" section to Admin showing connected vs disconnected services.

---

### 🟡 GAP-81 — WorkshopOS language skin not applied (Jobs/Bays/Technicians/Authorisation)

**Source (F5 lines 55–80):**

> "Everything uses mechanic language: 'Jobs' not 'tickets', 'Bays' not 'resources', 'Technicians' not 'staff', 'Authorisation' not 'approval'"

**Current:** Pages use generic terms. `CommandCenter.tsx` uses "Prepared Actions" and "Response Packs." CRM uses "Leads." Outbound uses "Lanes." None of the domain-specific WorkshopOS vocabulary is applied.

**Required fix:** Add a vocabulary layer. In WorkshopOS mode, map display labels: leads → "Enquiries", approval → "Authorisation", lane → "Queue", action → "Task". Vehicles shown with make/model/year/rego not just company names.

---

## Section 8 — Payroll / Compliance / Business Calendar

### 🟡 GAP-82 — Payroll Awareness surface absent (payslips ready, super alerts)

**Source (F5 lines 230–275):**

> "Tomorrow is pay day. All 3 payslips have been generated and are ready for your review. Tap to approve and schedule payment."
> Super due date alerts; PAYG reminders; leave balance visibility; roster gap detection

**Current:** No payroll-related data or UI exists in the app. The Today page has no payroll-related prepared action.

**Required fix:** Add 1–2 payroll-related prepared actions to mock data in `lib/mock-data.ts`:

- "3 payslips prepared for tomorrow's pay run — $18,400 total. Review and approve."
- "Super guarantee payment due in 4 days — $2,280. Cash position can cover it."

These use the existing `PreparedAction` type. Also add a "Compliance Dates" placeholder card in the Readiness Lab.

---

### 🟢 GAP-83 — Smart Notification tiering not reflected in Inbox mock data

**Source (F5 lines 410–440):**

Notifications must be tiered:

| Priority  | When                                                              | Delivery       |
| --------- | ----------------------------------------------------------------- | -------------- |
| Urgent    | Payment declined, technician no-show, supplier backorder tomorrow | Immediate push |
| Today     | Anomaly alerts, quote expiry, approval needed                     | Morning brief  |
| This week | Compliance dates, payroll prep, supplier price changes            | Weekly digest  |
| FYI       | Positive milestones (best week ever, 100th customer)              | In-app card    |

**Current `lib/mock-inbox.ts`:** Inbox items have no priority/tier classification. All threads appear with equal visual weight.

**Required fix:** Add `notificationTier: 'urgent' | 'today' | 'this_week' | 'fyi'` to inbox thread type. Apply distinct visual treatment per tier in `pages/Inbox.tsx`.

---

## Section 9 — Unified Client Understanding / Concierge

### 🟡 GAP-84 — No Concierge / PA layer surface in the app

**Source (F6 lines 120–175, F6 lines 280–340):**

The Concierge is described as VICKI's execution partner — handles calendar, email triage, meeting prep. Its defining UX moments include:

- "Done. I've moved your investor meeting to 3pm and rescheduled the team call to 4pm."
- Pre-meeting intelligence brief delivered 60 minutes before
- Email triage: 120 emails → 3 that need owner attention

**Current:** The Inbox page shows email/call/meeting threads. There is no AI triage layer, no "needs attention" filter, no Concierge attribution for actions.

**Required fix:** Add a "Concierge Triage" header to the Inbox page: "Ironbark reviewed 47 items. 3 need your attention." Remaining items visible in a collapsed "Handled by Ironbark" section. This is purely a UI/mock-data change — no new logic required.

---

### 🟡 GAP-85 — Pre-meeting intelligence brief not triggered from Inbox/Calendar events

**Source (F6 lines 280–320):**

When a meeting is in the calendar, Concierge auto-triggers a pre-meeting brief 60 minutes before, containing:

- Who you're meeting and their DISC profile
- Last interaction summary from Memory Layer
- Relevant competitive intelligence from Ghost/War Room
- Recommended approach

**Current:** Meeting items in `lib/mock-inbox.ts` show basic thread info. No pre-meeting brief surface exists.

**Required fix:** On meeting-type inbox threads, add an "Ironbark Pre-Brief" expandable section with: contact profile, last interaction note, recommended approach, and "1 memory recalled: [X]" chip.

---

### 🟢 GAP-86 — Founder's Intent Ledger not accessible in Admin / Settings

**Source (F6 lines 360–410):**

The Founder's Intent Ledger stores 4 categories:

1. Personal Vision & Goals ("I want to work only 3 days a week by 2027")
2. Business Philosophy & Values ("Never compete on price alone")
3. Risk Tolerance & Constraints ("Never let cash reserves drop below $12K")
4. Communication Preferences ("I prefer audio briefings over reading reports")

These values are cited by VICKI when making recommendations, creating a "the system knows my values" moment.

**Current `pages/Admin.tsx`:** Shows basic team/integration/settings panels. No Founder's Intent section.

**Required fix:** Add a "Founder's Intent" section to Admin with the 4 categories shown as editable text blocks. Pre-populate with WorkshopOS-appropriate mock values (cash reserve minimum, communication preference, labour rate philosophy, growth goal). This surface reinforces the "AI aligned to your values" narrative.

---

## Section 10 — Proactive Intelligence Concepts

### 🟡 GAP-87 — "Work Prepared, Owner Approves" principle not consistently expressed in mock data

**Source (F1 lines 1–60, F5 lines 260–310):**

The defining principle is: _Ironbark prepares the work, the owner confirms_. The prepared actions should represent Ironbark having already done the research, not just flagged a problem:

**BAD (current pattern):** "Parts price increase detected — action required"
**GOOD (spec pattern):** "Burson raised brake pad price 14%. I found Repco equivalent at old price. I've already substituted it on your 3 upcoming Hilux services. Approve the supplier switch?"

**Current `lib/mock-data.ts` preparedActions:** Most actions read as alerts ("Competitor pricing shift detected") rather than completed work. The "prepared by Ironbark" label is present but the actions describe problems not solutions.

**Required fix:** Rewrite all mock `preparedActions` items to follow the "work done, confirm it" pattern. Each should describe _what Ironbark already did_ in preparation, not what the owner needs to go and do. This is a pure mock data change requiring no component work.

---

### 🟡 GAP-88 — Cognitive timing / time-of-day context not expressed in Today or CommandCenter

**Source (F1 lines 270–295):**

> "Strategic Prompting Engine should prompt by cognitive timing: morning = execution, afternoon = exceptions, evening = prep/strategy, weekly close = reflection"
> "I know it's late, but tomorrow is heavy. We should lock payroll and confirm the 8am jobs."

**Current:** The Daily Brief is static regardless of time. No time-aware context.

**Required fix:** In the mock, set the Daily Brief header and content to reflect a time context. If the mock is in "Morning" mode (default), the brief opens with execution priorities. Add a subtle time-context badge: "Morning Execution Mode" or "Evening Prep Mode." This is a UI/copy change — one mock state is sufficient.

---

### 🟢 GAP-89 — Weather-triggered campaign surface absent

**Source (F1 lines 315–330, F5 lines 295–315):**

Ironbark monitors weather forecasts (Open-Meteo or BOM API) and triggers campaigns:

- Rain forecast → wiper blade + tyre tread campaign ready
- Heatwave → coolant + battery + AC service campaign
- Cold snap → battery check campaign

The system _drafts_ the campaign and presents it ready to approve — it does not just alert.

**Current:** No weather context exists anywhere in the app.

**Required fix:** Add 1 weather-triggered prepared action to Today mock data: "3-day rain event forecast from Thursday. I've prepared a wiper + tyre tread check message for 28 customers who are overdue. Review draft and send?" Include a small weather icon and city/forecast in the action card.

---

### 🟢 GAP-90 — Business Health Score not surfaced

**Source (F5 lines 395–415):**

> "A simple, single-number weekly score: 'This week's Workshop Health: 84/100 — up 6 from last week. Strong: quote conversion. Watch: overdue invoices.'"

Not a dashboard of numbers — a single score with two-line commentary. Designed for the owner who doesn't want to read a dashboard.

**Current:** Today and CommandCenter show stat strips with multiple metrics. No synthesised single score.

**Required fix:** Add a "Workshop Health" score widget to Today or CommandCenter — a large number (e.g. 78/100), a trend arrow, and two lines: "Strong: [X]. Watch: [Y]." Prepared by Ironbark label. This is a pure mock data / display component.

---

## Summary by Priority

### 🔴 CRITICAL — 7 gaps

| #      | Gap                                                                             | Affected File                      |
| ------ | ------------------------------------------------------------------------------- | ---------------------------------- |
| GAP-45 | Call console height < 320px                                                     | `components/live-call-console.tsx` |
| GAP-46 | Post-call panel missing (Auto Summary, Key Moments, Next Step, Follow-Up Draft) | `components/live-call-console.tsx` |
| GAP-54 | Today page missing AI narrative + 5 WorkshopOS widgets                          | `pages/Today.tsx`                  |
| GAP-55 | Industry Feed absent                                                            | `lib/mock-industry-feed.ts` (new)  |
| GAP-61 | No Silicon CFO "Truly Spendable Cash" panel                                     | `pages/FinancialIntelligence.tsx`  |
| GAP-77 | No Conversational Analytics / VICKI Ask interface                               | `pages/Intelligence.tsx`           |
| GAP-79 | Simple Mode nav does not collapse                                               | `components/app-shell.tsx`         |

### 🟡 MAJOR — 27 gaps

GAP-47 through GAP-53, GAP-56 through GAP-59, GAP-62 through GAP-70, GAP-73 through GAP-75, GAP-78, GAP-80 through GAP-82, GAP-84 through GAP-85, GAP-87 through GAP-88

### 🟢 POLISH — 8 gaps

GAP-52, GAP-53, GAP-60, GAP-67, GAP-71 through GAP-72, GAP-83, GAP-86, GAP-89 through GAP-90

---

## Second Pass — Codebase Audit Findings (GAP-91 through GAP-110)

_Source: Deep read of all 14 page files, store/index.ts, all lib/mock-_.ts files, and components. Date: April 22, 2026.\*

---

## Section 11 — Mock Data Quality Violations

### 🔴 GAP-91 — `Array.from({length:N}).map()` pattern explicitly forbidden, used in mock-data.ts

**Source (copilot-instructions.md, locked rule):**

> "No `Array.from({length:N}).map()` patterns"

**Current `lib/mock-data.ts` lines 4–25:**

```typescript
export const MOCK_LEADS: Lead[] = Array.from({ length: 30 }).map((_, i) => ({
  company: ["Smith's Auto", "Apex Construction", ...][i % 8],
  contact: `Contact ${i + 1}`,
  ...
}));
```

This is the only mechanism currently generating leads. The pattern creates 30 partially-random leads using modulo cycling, producing many with identical values, and generates generic names (`Contact 1`–`Contact 30`) that are not real Australian contacts.

**Required fix:** Replace the entire `MOCK_LEADS` array generation with 12–15 fully hand-authored leads with named Australian companies and real contact details. Each must satisfy all required fields (see GAP-92).

---

### 🔴 GAP-92 — Lead type missing all required spec fields; DISC shape is wrong

**Source (copilot-instructions.md, locked spec):**

> "Every lead MUST have: `whySurfaced`, `laneLogic`, `disc` (full object), `currentTools[]`, `keyPainPoints[]`, `recommendedOpener`"
> DISC format: `disc: { primaryType: 'D', secondaryType: 'C', blend: 'DC', dScore: 0.87, iScore: 0.44, sScore: 0.29, cScore: 0.62, confidence: 0.85, culturalNotes: '...' }`

**Current `store/index.ts` Lead interface:**

```typescript
export interface Lead {
  discPrimary: string; // e.g. 'D'  — WRONG: should be full DISC object
  discSecondary: string; // e.g. 'I'  — WRONG: redundant with full object
  // Missing: whySurfaced, laneLogic, disc (full), currentTools[], keyPainPoints[], recommendedOpener
}
```

The `DiscBars` component in CRM and Outbound accepts `primary` and `secondary` strings — it was built around the stripped DISC, not the full object. The `mock-data.ts` has no `whySurfaced`, `laneLogic`, `currentTools`, `keyPainPoints`, or `recommendedOpener` fields anywhere.

**Required fix:**

1. Add full `disc: DiscProfile` sub-object to `Lead` interface
2. Add `whySurfaced: string`, `laneLogic: string`, `currentTools: string[]`, `keyPainPoints: string[]`, `recommendedOpener: string`
3. Update `DiscBars` component to accept either the full object or derive `primary`/`secondary` from it
4. Populate all fields in the new hand-authored leads (GAP-91)

---

### 🔴 GAP-93 — All mock leads use generic names; not Australian companies/contacts

**Source (copilot-instructions.md, locked rule):**

> "All leads must be named Australian companies/contacts"

**Current `lib/mock-data.ts`:**

- Lead contacts: `Contact 1` through `Contact 30` — generic, named by index
- Companies: `Smith's Auto`, `Apex Construction`, `TechFlow Solutions`, `Bayside Retail`, `Oasis Logistics`, `Pioneer Systems`, `BlueSky Health`, `Crimson Financial` — only `Smith's Auto` reads as plausibly Australian; the rest are generic American-SaaS style names

**Required fix:** All lead companies must be plausibly Australian businesses. Examples: `Melbourne Motor Works`, `Bayside Automotive`, `Sunshine Coast Auto Repair`, `Parramatta Panel & Paint`, `Geelong Tyre Centre`. Contact names should be Australian given names. No generic placeholders.

---

### 🟡 GAP-94 — Workflow mock data: only 3 items; minimum required is 10 across 4+ categories

**Source (copilot-instructions.md, locked spec):**

> "At minimum 10 workflow items across 4+ categories"

**Current `lib/mock-workflow.ts`:** Only 3 workflow tasks — `Approval`, `Compliance`, `Billing`. `Follow-up`, `Campaign`, and `Automations` categories have zero items, so clicking those tabs shows an empty list. The minimum is 10 items across 4+ categories.

**Required fix:** Expand `MOCK_WORKFLOWS` to 10+ items: at least 3 Approvals, 2 Follow-ups, 2 Campaigns, 2 Billing, and 1 Compliance. Each must reference Australian business context (Xero invoice, DNCR check, payroll approval, BAS preparation, etc.).

---

### 🟡 GAP-95 — Inbox mock data: only 2 threads; minimum required is 6 across email/call/meeting

**Source (copilot-instructions.md, locked spec):**

> "At minimum 6 inbox threads across email/call/meeting types"

**Current `lib/mock-inbox.ts`:** Only 2 threads — 1 Email (Sarah Jenkins / Apex Construction) and 1 Call (Marcus Smith / Smith's Auto). The Inbox folder tabs show counts of 45 (Email), 8 (Messages), 3 (Calls), 2 (Meetings) but the actual data only has 2 entries — creating a severe discrepancy.

**Required fix:** Expand `MOCK_INBOX_THREADS` to 8+ items: at least 3 Email, 2 Call, 2 Meeting, 1 Message. All must reference Australian contacts and businesses. Folder tab counts must match actual data.

---

### 🟡 GAP-96 — Inbox folder tabs do not filter the thread list

**Current `pages/Inbox.tsx`:**

```tsx
const [activeFolder, setActiveFolder] = useState('Action Queue');
// ...
{MOCK_INBOX_THREADS.map(thread => ( ... ))}  // no filter applied
```

Selecting "Calls" or "Meetings" still renders all threads — the `activeFolder` state is unused in the mapping. All threads appear in every folder.

**Required fix:** Add a `type` filter: when `activeFolder` is `'Email'`, show only threads with `type === 'Email'`. When `'Action Queue'`, show threads with `status === 'unread'` or that have `draft`. This is a 2-line fix but directly impacts demo credibility.

---

### 🟡 GAP-97 — `viewMode` store default is 'Detailed'; should default to 'Simple'

**Source (F5 lines 12–30, copilot-instructions.md ModeSelect spec):**

The Simple Mode is the intended entry experience — the "wow" mode that immediately impresses. Detailed Mode is for power users who explore deeper.

**Current `store/index.ts`:**

```typescript
viewMode: 'Detailed',
```

The demo loads straight into Detailed Mode with full navigation and complex layout — not the confident, clean Simple Mode feed that is the flagship experience.

**Required fix:** Change default to `viewMode: 'Simple'`. Ensure the ModeSelect flow guides the user through the choice before reaching Today.

---

## Section 12 — Admin & Configuration Gaps

### 🟡 GAP-98 — Admin Integrations panel shows wrong integrations for WorkshopOS

**Current `pages/Admin.tsx` Integrations section:**

Listed integrations: Salesforce, HubSpot, Slack, Gong, Clearbit, ZoomInfo — all generic US SaaS tools, none relevant to an Australian workshop OS.

**WorkshopOS-relevant integrations that should appear:**

| Integration              | Category         | Status    |
| ------------------------ | ---------------- | --------- |
| Xero                     | Accounting       | Connected |
| Employment Hero / KeyPay | Payroll          | Connected |
| Workshop Software        | Job Management   | Warning   |
| Repco                    | Parts / Ordering | Inactive  |
| Burson Auto Parts        | Parts / Ordering | Connected |
| Stripe                   | Payments         | Connected |
| SendGrid / Twilio SMS    | Communications   | Connected |

**Required fix:** Replace all 6 current integrations with AU-relevant ones above. Keep the same `Card` layout — only data changes.

---

### 🟡 GAP-99 — Admin Compliance section renders empty state ("to be configured")

**Current `pages/Admin.tsx`:**

```tsx
default:
  return (
    <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
      <Settings className="w-12 h-12 mb-4 opacity-20" />
      <p>Settings panel for {activeSection} to be configured.</p>
    </div>
  );
```

The `Compliance` section (and all sections except `Execution Policy` and `Integrations`) hits this empty fallback. Compliance is a key trust signal — showing it empty in a demo is damaging.

**Required fix:** Add a `case 'Compliance':` handler that renders: DNCR compliance status (green), Calling Hours enforcement panel (9am–8pm Mon–Fri enforced), Privacy Act compliance note, and a last-audit timestamp. This is purely static mock content.

---

### 🟢 GAP-100 — Founder's Intent is hidden behind Admin left-rail but section is absent

**Source (F6 lines 360–410, GAP-86):**

The Admin left rail has: Execution Policy, Integrations, AI Preferences, Notifications, Compliance, Permissions, Audit Logs. `Founder's Intent` is not in this list — it has no entry point.

**Required fix:** Add "Founder's Intent" as an 8th item in the Admin left-rail sections. Render it with name/values content as described in GAP-86.

---

## Section 13 — Records & Data Model Gaps

### 🟡 GAP-101 — Records entity types not WorkshopOS-relevant

**Source (F5 lines 60–80, copilot-instructions.md vocabulary rules):**

**Current `pages/Records.tsx`:** Entity types listed in left rail: Leads, Companies, Customers, Vendors, Assets, Opportunities, Documents.

For WorkshopOS the record types should be:

| WorkshopOS Type | Replaces            |
| --------------- | ------------------- |
| Jobs            | Opportunities       |
| Vehicles        | Assets              |
| Customers       | Companies/Customers |
| Technicians     | (absent)            |
| Quotes          | Leads               |
| Invoices        | (absent)            |
| Documents       | Documents           |

The current `MOCK_RECORDS` array has 3 entries, one of which (`CloudScale Infrastructure`) is a tech infrastructure vendor with no relevance to a workshop.

**Required fix:** Rename the entity types, expand `MOCK_RECORDS` to 8+ items with Australian workshop names, vehicle rego, job types (e.g. "2019 Toyota HiLux — brake service, awaiting parts"). Include at least 2 Vehicles, 3 Customers, 2 Jobs in the mock data.

---

### 🟡 GAP-102 — Records detail panel activity timeline not workshop-relevant

**Current `pages/Records.tsx`:** The selected record detail shows a hardcoded activity timeline: "Technical Validation Sync" and "SOC2 Report Shared" — B2B SaaS content with no relevance to a workshop customer record.

**Required fix:** Replace the hardcoded timeline with mock data driven from `MOCK_RECORDS`. Timeline entries for a workshop customer should include: "Service completed — 2018 Subaru Forester brake service $480", "Quote sent — $340 tyre replacement", "Part ordered — ETA 2 days", "Reminder sent — service due in 30 days."

---

### 🟢 GAP-103 — Records page shows hardcoded "$125,000 value" for a workshop customer record

**Current `pages/Records.tsx`:**

```tsx
<div className="font-medium text-sm">$125,000</div>
```

`$125,000` as a customer "value" makes no sense for a workshop context where job values are $200–$2,000. This appears to be copy-pasted from a B2B SaaS template.

**Required fix:** Replace the hardcoded `$125,000` with a `record.lifetimeValue` field in `MOCK_RECORDS` (e.g. `$4,800` for a regular servicing customer over 3 years).

---

## Section 14 — Intelligence Page Gaps

### 🟡 GAP-104 — Intelligence sub-tabs all render the same Overview content

**Current `pages/Intelligence.tsx`:**

The `leftNav` has 9 items: Overview, Segments, Channels, Strategies, Objections, Sentiment, Campaigns, Lanes, Profile Effectiveness. The `centre` section renders the same pattern detection + charts regardless of which tab is selected — the `activeTab` state is never used to filter content.

**Required fix:** At minimum, differentiate 3 tab renders:

- `Overview`: current content (pattern detection, insight summary, sentiment chart)
- `Objections`: show only the `MOCK_OBJECTION_CLUSTERS` list with expanded rebuttal suggestions
- `Sentiment`: show only the sentiment/quality chart with brief annotations

All other tabs can remain as "coming soon" stubs — but they cannot silently render the Overview.

---

### 🟡 GAP-105 — Intelligence page "Competitor X" violates Australian naming rule

**Current `pages/Intelligence.tsx`:**

```tsx
<p>Competitor X announced a 15% price increase on their enterprise tier...</p>
<p>...42 mentions of "X pricing" across current pipeline calls this week.</p>
```

"Competitor X" is generic placeholder text. The Australian companies rule requires named Australian competitors.

**Required fix:** Replace all "Competitor X" / "Competitor Y" references in `pages/Intelligence.tsx` with named Australian workshop software competitors: `RepairDesk`, `Protractor`, `Workshop Wizard`. These are the correct named competitors per the War Room documentation (F7).

---

### 🟡 GAP-106 — WorkshopOS-specific Intelligence metrics absent from Intelligence page

**Source (F5 lines 60–82):**

WorkshopOS Insights must include these industry-specific metrics not present anywhere:

- Quote approval rate vs industry benchmark
- Labour vs parts revenue split
- Average job value trend
- Missed call callback rate
- Top reasons for unapproved quotes (AI-generated pattern analysis)

**Current `pages/Intelligence.tsx`:** Shows general "Call Completed / Strategy Updates / Learning Velocity" stats. None of the 5 WorkshopOS-specific metrics above are present.

**Required fix:** Add a "WorkshopOS Performance" card to the Intelligence page with the 5 metrics above. Each metric should have a benchmark comparison ("Your quote approval rate: 34% | Industry avg: 41% — below benchmark").

---

## Section 15 — Financial Intelligence Gaps

### 🟡 GAP-107 — Financial Intelligence "Silicon CFO" right panel has generic sales content

**Source (F3 lines 65–110):**

**Current `pages/FinancialIntelligence.tsx` right panel:**
The right panel is labelled "Silicon CFO Summary" but its content is a generic B2B SaaS revenue summary:

- "Strong expansion revenue this week offsets a slight dip in new logo acquisition"
- "The automated 'Upsell Tier' workflow resulted in 12 accounts upgrading"
- "Capital Allocation Shift — Shift $5k ad spend from top-of-funnel to retargeting"

This language belongs to a SaaS company, not a workshop OS. "New logo acquisition," "enterprise tier," "expansion revenue" are not workshop concepts.

**Required fix:** Replace all content in the Financial Intelligence right panel with workshop-relevant language and data. Silicon CFO narrative should reference: invoice collection rates, payroll provision, parts spend, labour revenue, cash runway, not "new logos" or "expansion revenue."

---

## Section 16 — Workflow Builder Gap

### 🟡 GAP-108 — No-code visual Workflow Builder absent (F3 #7 feature)

**Source (F3 lines 240–285):**

The Workflow Builder is the #7 "Power User" demo feature:

> "Workshop owner can build automations WITHOUT coding. Drag-and-drop workflow designer. Demo: 'Chase Overdue Payments' workflow built in 5 minutes. No developer. No coding. Just drag and drop."

The demo flow: Trigger → Condition → Action → Wait → Condition → Action → Approval Gate → Done.

**Current `pages/Workflows.tsx`:** Shows only a queue/approval list of pre-existing workflow tasks. There is no way to create, visualise, or edit a workflow. There is no builder, no canvas, no drag-and-drop surface.

**Required fix:** Add a "Build Workflow" button and a `WorkflowBuilder` panel that shows a read-only vertical step-chain visualisation of a pre-built workflow ("Chase Overdue Payments"). Each step rendered as a bordered node with icon, label, and connection arrow. The "Build New" CTA can be a placeholder — but one example workflow must be visually renderable as a step chain.

---

## Section 17 — Store Type Gaps

### 🟡 GAP-109 — `CallConsoleState` missing `disposition` field

**Source (copilot-instructions.md, F2 lines 361–376):**

> "Must have: Sentiment % indicator, Vibe Score (0–100), Objection Tracker chips, **Disposition Selector**"

**Current `store/index.ts`:**

```typescript
export interface CallConsoleState {
  status: "idle" | "dialing" | "connected" | "completed";
  leadId: string | null;
  transcript: string[];
  vibeScore: number;
  sentiment: "positive" | "neutral" | "negative"; // binary — not the taxonomy
  objections: string[];
  // Missing: disposition: CallOutcome | null
}
```

The `completeCall` action accepts `sentiment` (3-value) instead of the full `CallOutcome` disposition. This means disposition data can never be stored, displayed, or sent to any downstream process.

**Required fix:** Add `disposition: string | null` to `CallConsoleState`. Update `completeCall` signature to accept an optional `disposition: string`. Wire to the Disposition Selector component (GAP-47).

---

### 🟡 GAP-110 — Document Intelligence feature absent — not represented on any page

**Source (F3 lines 55–112):**

Document Intelligence is the #2 "Wow Factor" feature:

> "Take a phone photo of ANY invoice/receipt → instant structured data. Extracts ABN, invoice number, 6 line items, GST breakdown. Automatically matches to PO. Flags: 'Unit price variance: ordered at $22.50, invoiced at $24.00'."

**Current:** There is no Document Intelligence surface anywhere — no upload zone, no invoice parsing panel, no "photo to structured data" demo flow. The Financial Intelligence page has no document processing section.

**Required fix:** Add a "Document Intelligence" tab or panel to Financial Intelligence. Include a static mock showing: a placeholder "invoice image" area with a "Process Document" button, then a results panel showing extracted fields (supplier, ABN, invoice number, line items, GST, variance flag). This is one of the top 3 demo features and is entirely absent.

---

## Updated Summary by Priority

### 🔴 CRITICAL — 10 gaps (including Pass 2)

| #          | Gap                                              | Affected File                         |
| ---------- | ------------------------------------------------ | ------------------------------------- |
| GAP-45     | Call console height < 320px                      | `components/live-call-console.tsx`    |
| GAP-46     | Post-call panel missing                          | `components/live-call-console.tsx`    |
| GAP-54     | Today page missing AI narrative + 5 widgets      | `pages/Today.tsx`                     |
| GAP-55     | Industry Feed absent                             | `lib/mock-industry-feed.ts` (new)     |
| GAP-61     | No Silicon CFO "Truly Spendable Cash"            | `pages/FinancialIntelligence.tsx`     |
| GAP-77     | No Conversational Analytics / VICKI Ask          | `pages/Intelligence.tsx`              |
| GAP-79     | Simple Mode nav doesn't collapse                 | `components/app-shell.tsx`            |
| **GAP-91** | `Array.from` pattern in mock-data.ts             | `lib/mock-data.ts`                    |
| **GAP-92** | Lead type missing required spec fields           | `store/index.ts` + `lib/mock-data.ts` |
| **GAP-93** | All mock leads have generic non-Australian names | `lib/mock-data.ts`                    |

### 🟡 MAJOR — 37 gaps

Pass 1: GAP-47 through GAP-51, GAP-56 through GAP-59, GAP-62 through GAP-70, GAP-73 through GAP-75, GAP-78, GAP-80 through GAP-82, GAP-84 through GAP-85, GAP-87 through GAP-88

Pass 2: GAP-94 through GAP-99, GAP-101 through GAP-102, GAP-104 through GAP-110

### 🟢 POLISH — 10 gaps

Pass 1: GAP-52, GAP-53, GAP-60, GAP-67, GAP-71 through GAP-72, GAP-83, GAP-86, GAP-89 through GAP-90

Pass 2: GAP-100, GAP-103

---

## Top 15 Highest-Leverage Implementations (Updated)

Incorporating second-pass findings:

1. **GAP-92 + GAP-91 + GAP-93** — Rewrite mock-data.ts entirely: hand-authored Australian leads, full DISC objects, all required fields (these three are inseparable)
2. **GAP-77** — VICKI Ask bar on Intelligence page (single biggest missing interactive feature)
3. **GAP-46** — Post-call panel (Auto Summary, Key Moments, Follow-Up Draft)
4. **GAP-54** — Today AI narrative + widgets (unanswered calls, cash snapshot, authorisation queue)
5. **GAP-61 + GAP-110** — Silicon CFO "Truly Spendable Cash" + Document Intelligence on Financial Intelligence page
6. **GAP-45** — Call console expand to 320px+ with Disposition Selector + Sentiment %
7. **GAP-55** — Industry Feed on Today (mechanic news, Burson alerts)
8. **GAP-87** — Rewrite mock `preparedActions` to "work done, confirm it" pattern
9. **GAP-98** — Fix Admin integrations to AU-relevant (Xero, Employment Hero, Burson, etc.)
10. **GAP-94 + GAP-95** — Expand workflow items to 10+ and expand inbox to 6+ threads
11. **GAP-62** — VICKI reasoning chain visualisation
12. **GAP-51** — Battlecard panel in CRM/Outbound with `recommendedOpener`
13. **GAP-101** — Intelligence sub-tabs differentiation (Objections / Sentiment / Overview)
14. **GAP-74** — Counter-strategy generation in Strategic Command signal detail
15. **GAP-108** — Workflow Builder step-chain visualisation

---

## Fourth Pass — Full Source Document Re-Read + Remaining Page/Component Audit (GAP-124 through GAP-141)

_Source: Full read of `Textfiles/Pasted text (1) (1).txt` (Scout Agent Analysis, 579 lines), `Textfiles/The Unified Client Understanding Sy.txt` (VICKI + Concierge, 938 lines), `Textfiles/War Room Architecture Discovery.txt` (329 lines), `Textfiles/Demo Features Showcase.txt` (640 lines), `Textfiles/Call System Architecture.txt` (683 lines — second full pass); `pages/SignalEngine.tsx`, `pages/Outbound.tsx`, `pages/FinancialIntelligence.tsx`, `pages/ReadinessLab.tsx`, `pages/Workflows.tsx`, `pages/Inbox.tsx`, `pages/Login.tsx`, `pages/ModeSelect.tsx`; `components/command-palette.tsx`, `components/lane-card.tsx`, `components/three-layer.tsx`, `components/stat-strip.tsx`; `lib/mock-data.ts` (full), `lib/mock-workflow.ts`, `lib/mock-inbox.ts`, `store/index.ts`. Date: April 22, 2026._

---

## Section 24 — Broken UI Logic (State Not Wired to Render)

### 🔴 GAP-124 — `FinancialIntelligence.tsx` all 9 sub-tabs render the same Revenue Pulse content

**Source: `pages/FinancialIntelligence.tsx` lines 46, 56–220:**

The `leftNav` has 9 items: Revenue Pulse, Pipeline, Forecasts, Risk, Unit Economics, Attribution, Scenario Engine, Capital Allocation, Collections / Cash Flow. The `activeTab` state is set on click. However, the `centre` block renders unconditionally — it is NOT conditionally rendered based on `activeTab`. Every tab shows the same Revenue Pulse chart, Pipeline Engine bar chart, Attribution pie, and Forecast table.

This exactly mirrors GAP-104 (Intelligence page). Selecting "Scenario Engine" or "Risk" shows identical Revenue Pulse content.

**Required fix:** At minimum, differentiate 3–4 renders:

- `Revenue Pulse`: current content
- `Collections / Cash Flow`: Silicon CFO "Truly Spendable" panel (satisfies GAP-61 simultaneously)
- `Scenario Engine`: Advisory Panel / scenario stress test (satisfies GAP-63)
- All other tabs: "Coming soon" stub with correct heading

---

### 🔴 GAP-125 — `ReadinessLab.tsx` all 8 scenarios render the same hardcoded centre content

**Source: `pages/ReadinessLab.tsx` lines 34, 59–140:**

The `leftRail` has 8 simulation scenarios: Baseline, Fraud Pressure, Operator Strain, Data Integrity Decay, Cross-Entity Contagion, Audit Pressure, Growth Scenario, Model Upgrade Scenario. The `activeScenario` state is set on click. However, the `centre` block always renders the same: "Environment Summary: {activeScenario}" plus the same hardcoded tree visualisation and the same 3 Deployment Envelope rows. The `activeScenario` only appears in the heading text — the actual scenario data never changes.

**Required fix:** The `MOCK_SCENARIOS` array in `lib/mock-readiness.ts` already has scenario results (`stress: 'Normal'|'High'|'Critical'|'Medium'`, `result: 'Pass'|'Pass with Interventions'|'Fail gracefully'`) — use these to vary the centre. When `activeScenario === 'Fraud Pressure'`, show the high-stress result and different failure points. At minimum, the Deployment Envelope matrix and Assumption Log should reflect which simulation is active.

---

### 🔴 GAP-126 — `Workflows.tsx` category tabs are broken — 5 of 7 tabs show zero results

**Source: `pages/Workflows.tsx` lines 44–51, `lib/mock-workflow.ts`:**

```tsx
// Filter logic in Workflows.tsx:
MOCK_WORKFLOWS.filter(
  (w) => activeCategory === "Approvals" || w.category === activeCategory,
);
```

The left-rail category tabs are: `'Approvals'`, `'Follow-ups'`, `'Campaigns'`, `'Billing'`, `'Compliance'`, `'Meetings'`, `'Automations'`

The `WorkflowTask` category type is: `'Approval' | 'Follow-up' | 'Campaign' | 'Billing' | 'Compliance'`

Three mismatches:

1. Tab `'Approvals'` (plural) is handled by the special `activeCategory === 'Approvals'` catch — shows all items regardless. This masks the first mismatch.
2. Tabs `'Follow-ups'`, `'Campaigns'`, `'Meetings'`, `'Automations'` do NOT match any `WorkflowTask.category` value — always return 0 results.
3. `'Meetings'` and `'Automations'` don't even exist as a category type in `WorkflowTask`.

**In a live demo, clicking any category tab except 'Approvals' displays a completely empty queue.**

**Required fix:** Align the tab labels with the data categories. Either rename tabs to match (`'Approval'`, `'Follow-up'`, `'Campaign'`, `'Billing'`, `'Compliance'`) or rename data categories to match the tabs, AND expand `MOCK_WORKFLOWS` to 10+ items with items across all categories (satisfies GAP-94 simultaneously).

---

### 🟡 GAP-127 — `Inbox.tsx` detail panel hardcodes "Technical Validation" stage regardless of thread

**Source: `pages/Inbox.tsx` lines 145–155:**

```tsx
<PanelSection title="Linked Context">
  <div>
    <div className="text-xs text-muted-foreground mb-1">Current Stage</div>
    <Badge variant="outline" className="bg-secondary">
      Technical Validation
    </Badge>
  </div>
</PanelSection>
```

"Technical Validation" is a B2B SaaS deal stage. It is hardcoded for every thread — clicking on the "Discovery Call Transcript" from Smith's Auto shows "Technical Validation" as the linked stage, which makes no sense for an automotive workshop.

Additionally, `mock-inbox.ts` thread `t1` is pure B2B SaaS: "SOC2 report", "API rate limits of 1000 req/min" from Apex Construction. This provides no value in a WorkshopOS demo.

**Required fix:** Replace the hardcoded `Technical Validation` badge with `{selectedThread?.linkedStage || 'View Record'}` once the `Thread` type gains a `linkedStage` field. Replace the Apex Construction/SOC2 thread with a workshop-appropriate thread (e.g. "Parts invoice dispute - Burson Auto Parts" or "Fleet customer service question - Northside Transport").

---

## Section 25 — Naming and Navigation Rule Violations (Additional)

### 🟡 GAP-128 — Command Palette still labels route as "Signal Engine" not "Strategic Command"

**Source: `components/command-palette.tsx` lines 51–52:**

```tsx
<Command.Item onSelect={() => runCommand(() => setLocation("/signal-engine"))}>
  <Radio className="w-4 h-4 text-muted-foreground" /> Signal Engine
</Command.Item>
```

The Command Palette (`⌘K`) labels the Strategic Command page as "Signal Engine" — the same locked-rule violation found in the nav (GAP-113). The naming must be consistent everywhere, including: sidebar, command palette, breadcrumbs, and page headers.

**Required fix:** Change label from `Signal Engine` to `Strategic Command` in `command-palette.tsx`. Also update the `<h1>` inside `pages/SignalEngine.tsx` which currently reads `"Signal Engine"`.

---

## Section 26 — Layout Bugs

### 🟡 GAP-129 — ThreeLayer right panel is `hidden xl:flex` — invisible on typical demo laptops

**Source: `components/three-layer.tsx` lines 30–38:**

```tsx
{/* Right Panel */}
<div className="w-[320px] md:w-[360px] flex-shrink-0 border-l border-border/50 bg-background/30 hidden xl:flex flex-col">
```

The `xl` Tailwind breakpoint is `1280px`. A typical demo laptop (MacBook 13", 1440×900 physical, commonly displayed at 1366px effective CSS width after DPI scaling or browser zoom) may be below this threshold. Below `xl`, the entire right intelligence panel is hidden, making FinancialIntelligence, ReadinessLab, and Workflows pages two-column layouts — violating the three-layer layout rule.

The copilot-instructions.md rule: "Never collapse this to a two-column layout on Tier 1 pages."

**Required fix:** Change `hidden xl:flex` to `hidden lg:flex` (1024px+). Alternatively, change to `flex` unconditionally for demo purposes since this is a fixed-viewport demo app (not a responsive public site).

---

## Section 27 — Additional Mock Data Violations

### 🟡 GAP-130 — `MOCK_SIGNALS` has "Competitor X" + `MOCK_RESPONSE_PACKS` references non-existent lane

**Source: `lib/mock-data.ts` lines 54–56, 60–62:**

```typescript
{ id: 's2', type: 'Competitor Pricing', company: 'Market Wide',
  description: 'Competitor X raised prices by 15%', ... }
```

"Competitor X" in `MOCK_SIGNALS.description` violates the named-Australian-competitors rule.

```typescript
{ id: 'rp2', ..., targetLane: 'Executive Buyers', ... }
```

`targetLane: 'Executive Buyers'` does not exist in `MOCK_LANES` (only `lane1`–`lane4`: Hot Follow-Up, Competitor Switch Targets, Compliance Blocked, Cold Resurrection). Approving `rp2` in the Command Center triggers `addLeadToLane` with a lane ID lookup that will silently fail to find the lane.

**Required fix:** Replace "Competitor X" with "RepairDesk" in `MOCK_SIGNALS`. Change `targetLane: 'Executive Buyers'` to an existing lane name (e.g. `'Hot Follow-Up'`).

---

### 🟡 GAP-131 — SignalEngine "Why Now" battlecard drawer content is hardcoded B2B SaaS

**Source: `pages/SignalEngine.tsx` lines 261–288:**

The "Why Now" Sheet drawer renders hardcoded content regardless of which signal is focused:

```tsx
"Historical data indicates companies undergoing this transition have a 4x higher propensity to evaluate new operational software within 30 days."

Angle 1: "Acknowledge the change and frame our solution as a de-risking mechanism."
Angle 2: "Highlight how similar companies navigated this phase using automated workflows."

Objection: "We have too much change right now"
Rebuttal: "We deploy invisibly alongside your current tools..."
```

"Evaluate new operational software" and "automated workflows" are B2B SaaS pitch language. The ICP Match panel in the right panel includes "Tech stack overlap" (SaaS metric). None of the battlecard content adapts to the selected signal type or company.

For WorkshopOS, the battlecard for a "New Workshop Nearby" signal should say: "New competitor opened 2km from your location. Recommend retention campaign for customers within 3km radius." — completely different from a "Competitor Pricing" signal.

**Required fix:** Make battlecard content signal-type-aware. Add a map from signal type to battlecard angle/approach. ICP match subcategories for workshops: "Industry (automotive)", "Fleet size fit", "Service volume", "Location proximity" — not "Tech stack overlap".

---

### 🟡 GAP-132 — `mock-workflow.ts` and `Workflows.tsx` have a category type mismatch that causes broken UI

**Source: `lib/mock-workflow.ts` type definition and `pages/Workflows.tsx` line 44:**

This is directly related to GAP-126. The `WorkflowTask.category` type allows:

```typescript
"Approval" | "Follow-up" | "Campaign" | "Billing" | "Compliance";
```

But the UI tabs list: `'Approvals'`, `'Follow-ups'`, `'Campaigns'`, `'Billing'`, `'Compliance'`, `'Meetings'`, `'Automations'`

The type definition in `mock-workflow.ts` is the root cause — it needs to add `'Meeting'` and `'Automation'` as valid categories, AND the category values should either all be singular or all plural to match the tab labels.

Additionally, `target: 'TechFlow Solutions'` in workflow `w2` is a non-AU company name. Workshop compliance targets should be named Australian businesses (e.g. "Precision Auto Centre", "O'Brien Auto Group").

---

### 🟡 GAP-136 — `MOCK_ACTIONS` are B2B SaaS sales-team actions, not WorkshopOS prepared actions

**Source: `lib/mock-data.ts` lines 36–43:**

```typescript
{ id: 'a1', title: 'Send follow-ups to 12 leads from yesterday\'s calls', ... },
{ id: 'a2', title: 'Approve 3 quote responses drafted overnight', ... },
{ id: 'a3', title: 'Execute switch-target lane (8 leads)', ... },
{ id: 'a4', title: 'Nurture sequence for 5 aging opportunities', ... },
```

`a1` ("follow-ups to 12 leads"), `a3` ("switch-target lane"), `a4` ("nurture sequence for 5 aging opportunities") are outbound B2B sales actions. A WorkshopOS prepared action feed should contain:

- "3 payslips ready for Friday pay run — $18,400 total. Approve?"
- "Burson Auto Parts raised brake pad prices 14%. Repco equivalent sourced at old price for your 3 upcoming Hilux services. Approve supplier substitution?"
- "4 jobs awaiting customer authorisation (total $2,840). Draft reminder sent. Confirm?"
- "Workshop Wizard dropped prices 15%. Ironbark drafted retention message for top 20 customers. Send?"
- "Battery check campaign ready — cold snap forecast Thursday-Saturday (38 customers overdue). Review?"

These align with the "Work Prepared, Owner Approves" principle and WorkshopOS vocabulary.

---

### 🟡 GAP-137 — Outbound lane names and pipeline values are B2B SaaS inappropriate for workshop context

**Source: `lib/mock-data.ts` `MOCK_LANES` array:**

```typescript
{ id: 'lane1', name: 'Hot Follow-Up',            valueAud: 120000, strategy: 'Post-Meeting' },
{ id: 'lane2', name: 'Competitor Switch Targets', valueAud:  55000, strategy: 'Switch Target' },
{ id: 'lane3', name: 'Compliance Blocked',        valueAud:      0 },
{ id: 'lane4', name: 'Cold Resurrection',         valueAud: 240000, strategy: 'Re-engagement' },
```

Two problems:

1. **Lane names are B2B outbound sales lanes**, not workshop-relevant. WorkshopOS outbound lanes should be: "Service Due Reminders", "Quote Follow-ups Pending", "Lapsed Customers (6+ months)", "Fleet Account Management", "Overdue Invoice Recovery".

2. **Pipeline values are B2B SaaS deal sizes** — $240,000 for "Cold Resurrection" (ex-cold customers? worth $240k?). A workshop customer's lifetime value is $2,000–$10,000. Even a 4-lane fleet account might be $20k/year. $120k and $240k values imply enterprise software deals, not workshop services.

**Required fix:** Rename lanes to workshop-appropriate names. Correct `valueAud` to workshop-realistic totals (e.g. 4 leads × avg $1,800 booking = `valueAud: 7200`).

---

## Section 28 — Missing Demo Features from Source Documentation

### 🟡 GAP-133 — Psychologist DISC "Wrong vs Right" message comparison not visualised

**Source (Demo Features Showcase — Ironbark's.txt, Feature #13, lines 468–530):**

The Demo Features Showcase describes a specific show-stopping demo moment for the Psychologist feature:

```
❌ WRONG (I-style approach):
"Hi Sarah! 😊 Hope you're having a great day! We noticed your Corolla might
be due soon and we'd love to help you keep it running smoothly..."

✅ RIGHT (D-adapted approach):
"Sarah - Corolla due for service. 3 slots left this week: Wed 2pm, Thu 10am,
Fri 4pm. Which works?"
```

The side-by-side Wrong vs Right adapted message comparison is described as what "impresses" audiences about the Psychologist. This is a two-card display with wrong approach (❌, greyed out) vs right approach (✅, highlighted).

**Current `pages/CRM.tsx` right panel:** Shows DISC bars and a single hardcoded "Focus on ROI" note. No sampled messages, no wrong/right comparison.

**Required fix:** Below the DISC bars in the CRM right panel, add a "Psychologist Recommendation" sub-section showing: one crossed-out wrong message (style adapted for wrong DISC type) and one correct message (adapted for the lead's actual DISC blend). Both should derive from `focusedLead.disc.primaryType`.

---

### 🟡 GAP-134 — Multiplayer Collaboration feature entirely absent from all pages

**Source (Demo Features Showcase — Ironbark's.txt, Feature #9, lines 388–410):**

Feature #9 in the Demo Showcase describes real-time presence indicators:

> "See who's editing what, RIGHT NOW. Prevents save conflicts automatically. Like Google Docs for workshop management."
> "[JOB CARD #1234] 👤 Matthew (Service Advisor) is editing pricing... 👤 Sarah (Workshop Manager) is viewing this job. SOFT LOCK: Matthew has been editing for 45 seconds."

This is called out as "Enterprise collaboration features in a workshop system. Solves real multi-user problems."

**Current codebase:** No presence indicators exist anywhere. Records, Workflows, and CRM pages have no concept of concurrent editing or presence awareness.

**Required fix:** Add a static mock presence indicator to `pages/Records.tsx` job/record detail view: "👤 Colin is viewing this job" or a small avatar stack showing 2 active users. This requires no real WebSocket — a static/animated mock suffices for the demo. Demonstrates the feature concept without infrastructure.

---

### 🟢 GAP-135 — Vibe Check score emoji tier labels absent from live call console

**Source (Call System Architecture, lines 441–460):**

The Vibe Check engine maps the 0–100 score to 5 labelled tier bands:

- 90–100: 🔥 HOT
- 70–89: ☀️ WARM
- 50–69: 🌤️ COOL
- 30–49: ❄️ COLD
- 0–29: 🧊 FROZEN

**Current `components/live-call-console.tsx`:** Shows a coloured progress bar (green/amber/red) and a numeric score but no tier label or emoji. The tier is also the basis for the Ironbark "trajectory recommendation" ("Vibe cooling — try a pivot").

**Required fix:** Next to the Vibe Score number in the console, render the tier badge (e.g. `🌤️ COOL` at score 65, `☀️ WARM` at score 75). This is a one-line derived display from the existing `vibeScore` value.

---

### 🟡 GAP-138 — Constitutional AI safety badge absent (trust signal for enterprise demos)

**Source (Demo Features Showcase — Ironbark's.txt, Feature #11, lines 370–390):**

Constitutional AI is described as Feature #11 and is specifically called out as a "For Technical Audiences" trust signal. The demo response shows:

```
⛔ CONSTITUTIONAL VIOLATION BLOCKED
Requested action violates Constitutional Principle #3:
"Never generate, modify, or approve invoices without legitimate business documentation"
```

For the demo, showing that hard safety constraints exist builds trust with enterprise and compliance-focused clients.

**Current `pages/Admin.tsx` + `pages/ReadinessLab.tsx`:** No Constitutional AI reference exists anywhere in the UI.

**Required fix:** Add a "Constitutional AI" card to the ReadinessLab right panel or Admin Intelligence section showing: "20 Constitutional Principles Active." With 3 example principles shown: "Never approve invoices without legitimate PO", "Never call DNCR-listed numbers", "Never execute transactions above $5,000 without human approval." Labelled "Powered by Ironbark."

---

## Section 29 — End-to-End Demo Flow Breaks

### 🟡 GAP-139 — `completeCall` has no downstream effect — no cause-and-effect across pages

**Source (`store/index.ts` lines 178–208, `attached_assets/camber_casper_mock_demo_source_of_truth_1776839818161.md` section 4.3 — Primary Demo Loop):**

The source of truth defines the primary demo loop as:

```
Lead → executed (call) → transcript captured → CRM updated → insights updated → next action prepared
```

**Current `store/index.ts` `completeCall` action:**

```typescript
completeCall: (vibeScore, sentiment, objections) => set((state) => ({
  callConsole: {
    ...state.callConsole,
    status: 'completed',
    vibeScore,
    sentiment,
    objections
  }
})),
```

`completeCall` ONLY updates `callConsole.status`. It does NOT:

- Update the called lead's `stage` (should move to `'Contacted'` or `'Meeting Booked'`)
- Create a new workflow task (e.g. "Auto-draft follow-up approved? — 3 items")
- Add an inbox thread (e.g. call transcript thread)
- Increment `stats.callsCompleted`
- Log to `recentActivity`

This means completing a demo call has zero visible effect on any other page. The demo "loop" is broken at the most important step.

**Required fix:** Expand `completeCall` to: (1) update `leads` to move the called lead to `'Contacted'` stage, (2) increment `stats.callsCompleted`, (3) log to `recentActivity`, and (4) optionally prepend a new inbox thread stub with the call summary. This single store change makes the demo feel alive and cross-connected.

---

### 🟡 GAP-140 — `MOCK_LANES` pipeline values are B2B SaaS enterprise deal sizes

_(Documented under Section 27 — GAP-137 covers lane names. This captures the financial scale issue separately.)_

**Current `lib/mock-data.ts`:**

```typescript
{ id: 'lane4', name: 'Cold Resurrection', valueAud: 240000 }
```

A workshop "Cold Resurrection" lane of 4 lapsed customers has an imputed value of $240,000. Real workshop job values are $200–$2,000. Even a full-year fleet service account might reach $15,000–$20,000. The value display on `LaneCard` shows `$240.0k` — which is conspicuously wrong for the demo's claimed workshop context.

**Required fix:** Recalculate all `MOCK_LANES.valueAud` values using workshop-realistic estimates: (num_leads × avg_job_value). For 4 cold leads at avg $1,500 = `valueAud: 6000`. For 3 hot follow-up leads at avg $2,200 = `valueAud: 6600`.

---

### 🟢 GAP-141 — ReadinessLab Deployment Envelope and Assumptions are B2B SaaS content

**Source: `pages/ReadinessLab.tsx` lines 98–135, `lib/mock-readiness.ts`:**

**Deployment Envelope Matrix (hardcoded in JSX):**

| Action Type          | Current      |
| -------------------- | ------------ |
| Draft Communications | Autonomous   |
| Pricing Adjustments  | Review-Gated |
| Contract Execution   | Blocked      |

"Pricing Adjustments" and "Contract Execution" are B2B SaaS commercial actions. Workshop autonomy envelope should cover: Quote Generation, Job Authorisation, Invoice Dispatch, Supplier Ordering, Payroll Filing, Customer Messaging.

**MOCK_ASSUMPTIONS (hardcoded):**

- `"API Latency remains < 200ms"` — infrastructure concern, not demo-visible
- `"Lead volume does not exceed 1000/day"` — B2B SaaS scale, workshop workshop handles 8–20 jobs/day
- `"Compliance regulations remain static"` — too generic for WorkshopOS context

**Workshop-appropriate assumptions:**

- "Bay capacity ≤ 8 simultaneous jobs"
- "Technician count stable at 3 FTE"
- "MVIS inspection certification current"
- "Bookkeeping sync cadence: daily (Xero)"

**Required fix:** Replace Deployment Envelope rows with workshop-relevant action types. Replace `MOCK_ASSUMPTIONS` with workshop-specific business constraints. This is a pure content change in `lib/mock-readiness.ts` + one JSX block in `ReadinessLab.tsx`.

---

## Final Consolidated Summary (All Four Passes)

### 🔴 CRITICAL — 15 gaps

| #       | Gap                                                      | File                                           |
| ------- | -------------------------------------------------------- | ---------------------------------------------- |
| GAP-45  | Call console height < 320px                              | `components/live-call-console.tsx`             |
| GAP-46  | Post-call panel missing (5 required sections)            | `components/live-call-console.tsx`             |
| GAP-54  | Today missing AI narrative + 5 WorkshopOS widgets        | `pages/Today.tsx`                              |
| GAP-55  | Industry Feed absent entirely                            | `lib/mock-industry-feed.ts` (new)              |
| GAP-61  | No Silicon CFO "Truly Spendable Cash" panel              | `pages/FinancialIntelligence.tsx`              |
| GAP-77  | No VICKI Ask / Conversational Analytics interface        | `pages/Intelligence.tsx`                       |
| GAP-79  | Simple Mode nav does not collapse                        | `components/app-shell.tsx`                     |
| GAP-91  | `Array.from({length:30}).map()` forbidden pattern        | `lib/mock-data.ts`                             |
| GAP-92  | Lead type missing required spec fields; wrong DISC shape | `store/index.ts` + `lib/mock-data.ts`          |
| GAP-93  | All mock leads have generic non-Australian names         | `lib/mock-data.ts`                             |
| GAP-111 | `--primary` token is `210 90% 60%` (neon, violates spec) | `index.css`                                    |
| GAP-112 | `DiscBars` uses `Math.random()` — non-deterministic      | `components/disc-bars.tsx`                     |
| GAP-124 | FinancialIntelligence all 9 tabs render same content     | `pages/FinancialIntelligence.tsx`              |
| GAP-125 | ReadinessLab all 8 scenarios render same content         | `pages/ReadinessLab.tsx`                       |
| GAP-126 | Workflows category tabs broken (5 of 7 show zero items)  | `pages/Workflows.tsx` + `lib/mock-workflow.ts` |

### 🟡 MAJOR — 52 gaps

Pass 1 (9): GAP-47, 48, 49, 50, 51, 56, 57, 58, 59, 62, 63, 64, 65, 66, 68, 69, 70, 73, 74, 75, 78, 80, 81, 82, 84, 85, 87, 88

Pass 2 (9): GAP-94, 95, 96, 97, 98, 99, 101, 102, 104, 105, 106, 107, 108, 109, 110

Pass 3 (9): GAP-113, 114, 115, 116, 117, 118, 119, 121, 123

Pass 4 (8): GAP-127, 128, 129, 130, 131, 132, 133, 134, 136, 137, 139, 140

### 🟢 POLISH — 14 gaps

Pass 1 (8): GAP-52, 53, 60, 67, 71, 72, 83, 86, 89, 90

Pass 2 (2): GAP-100, 103

Pass 3 (2): GAP-120, 122

Pass 4 (2): GAP-135, 138, 141

---

## Top 20 Highest-Leverage Implementations (Final — After Pass 4)

1. **GAP-111** — Fix `--primary` token one line (`210 55% 52%`) — single change, whole-app visual identity
2. **GAP-92 + GAP-91 + GAP-93** — Rewrite `mock-data.ts` (Australian leads, full DISC objects, required fields)
3. **GAP-112** — Fix `DiscBars` to use deterministic data (depends on #2)
4. **GAP-113 + GAP-128** — Fix "Strategic Command" nav label in sidebar AND command palette
5. **GAP-126** — Fix Workflows category filter (tab label/data category mismatch) + expand to 10+ items
6. **GAP-139** — Wire `completeCall` to update lead stage + activity log (makes demo feel alive)
7. **GAP-77** — VICKI Ask bar on Intelligence page (single biggest missing interactive feature)
8. **GAP-46** — Post-call panel (Auto Summary, Key Moments, Follow-Up Draft, Disposition Selector)
9. **GAP-54** — Today AI narrative + WorkshopOS widgets (unanswered calls, cash snapshot, auth queue)
10. **GAP-124** — FinancialIntelligence sub-tabs differentiation (Silicon CFO in Collections tab = GAP-61 solved)
11. **GAP-61 + GAP-110** — Silicon CFO "Truly Spendable Cash" + Document Intelligence
12. **GAP-45** — Call console expand to 320px+ plus all required real-time elements
13. **GAP-136 + GAP-87** — Rewrite `MOCK_ACTIONS` and `preparedActions` to WorkshopOS "work done" pattern
14. **GAP-130 + GAP-137 + GAP-140** — Fix `MOCK_SIGNALS` "Competitor X" + lane names + lane values
15. **GAP-115 + GAP-116** — Rewrite `mock-fin.ts` and `mock-intel.ts` with WorkshopOS data
16. **GAP-117 + GAP-118 + GAP-119** — Fix hardcoded B2B SaaS content in CommandCenter/Today/CRM
17. **GAP-98 + GAP-99** — Fix Admin integrations (Xero, Employment Hero, Workshop Software) + Compliance section
18. **GAP-129** — Change `ThreeLayer` right panel from `hidden xl:flex` to `hidden lg:flex`
19. **GAP-125** — Wire ReadinessLab scenarios to vary content (use existing `MOCK_SCENARIOS` data)
20. **GAP-55** — Industry Feed on Today (mechanic news, Burson/Repco alerts) — Component, Token, and Content Audit (GAP-111 through GAP-123)

_Source: Full read of `app-shell.tsx`, `disc-bars.tsx`, `live-call-console.tsx`, `right-panel.tsx`, `index.css`, `pages/CommandCenter.tsx`, `pages/Today.tsx`, `pages/CRM.tsx`, `pages/Login.tsx`, `pages/ModeSelect.tsx`, `lib/mock-fin.ts`, `lib/mock-intel.ts`, `lib/mock-readiness.ts`, `store/index.ts`, `App.tsx`, `attached_assets/camber_casper_mock_demo_source_of_truth_1776839818161.md`. Date: April 22, 2026._

---

## Section 18 — Design Token Violations

### 🔴 GAP-111 — `--primary` colour token is `210 90% 60%` — violates restrained-blue spec

**Source (copilot-instructions.md, Design Token Rules):**

```css
/* SPEC */
--primary: 210 55% 52%; /* restrained blue — NOT 90% saturation */
```

**Current `index.css` line 68:**

```css
--primary: 210 90% 60%;
```

`210 90% 60%` is a bright, high-saturation electric blue — the opposite of "restrained." The copilot instructions explicitly say `NOT 90% saturation` and the design guidance states "no neon colours." The source of truth document (section 6.2) says "restrained blue accents."

This affects every primary button, badge, active nav item, and accent element across the entire app. The brand feel is currently neon/startup vs the specified premium/restrained.

**Required fix:** Change `--primary: 210 90% 60%` to `--primary: 210 55% 52%` in `index.css`. Verify the `--accent` token also matches (`--accent: 210 55% 52%`).

---

## Section 19 — Component-Level Bugs

### 🔴 GAP-112 — `DiscBars` component generates random DISC scores on every render

**Source (copilot-instructions.md, DISC Data spec):**

Full DISC object with explicit scores is required. Rendering must be deterministic.

**Current `components/disc-bars.tsx` lines 18–24:**

```typescript
// Fill others with lower values
Object.keys(scores).forEach((k) => {
  if (k !== primary && k !== secondary) {
    scores[k as keyof typeof scores] = Math.floor(Math.random() * 30) + 15;
  }
});
```

Every time the CRM right panel re-renders (e.g. hover, state change), the D/I/S/C bar heights change randomly. This is a demo-breaking bug — the DISC profile will visually jump between renders. It also ignores the full DISC object specification entirely.

The `DiscBars` component currently takes only `primary: string` and `secondary: string` props — it has no way to accept a full DISC score object.

**Required fix:** Update `DiscBars` interface to accept `disc: { dScore: number, iScore: number, sScore: number, cScore: number }` (using the full DISC object from the required Lead shape). Remove all `Math.random()` calls. Scores are passed as immutable data from the lead object.

---

## Section 20 — App Shell Violations

### 🟡 GAP-113 — Navigation label for `/signal-engine` is "Signal Engine" not "Strategic Command"

**Source (copilot-instructions.md, canonical navigation, locked rule):**

> "The route `/signal-engine` MUST display as nav label 'Strategic Command' — not 'Signal Engine', not 'War Room'. This is locked."

**Current `components/app-shell.tsx` line 31:**

```typescript
{ path: '/signal-engine', label: 'Signal Engine', icon: Radio },
```

The nav label shows "Signal Engine" in the sidebar. This violates a named locked rule.

**Required fix:** Change `label: 'Signal Engine'` to `label: 'Strategic Command'` in the navigation array.

---

### 🟡 GAP-114 — `LayoutDashboard` used as catch-all icon for 5 navigation items

**Source (copilot-instructions.md, Design Token Rules):**

> "Never: `LayoutDashboard` as a catch-all icon."

**Current `components/app-shell.tsx` navigation array:**

```typescript
{ path: '/financial-intelligence', label: 'Financial',   icon: LayoutDashboard },
{ path: '/inbox',                  label: 'Inbox',       icon: LayoutDashboard },
{ path: '/workflows',              label: 'Workflows',   icon: LayoutDashboard },
{ path: '/records',                label: 'Records',     icon: LayoutDashboard },
{ path: '/readiness-lab',          label: 'Readiness Lab', icon: LayoutDashboard },
```

Five nav items all share the same `LayoutDashboard` icon. In Simple Mode (icon-only sidebar), these five entries are visually identical and indistinguishable.

**Required fix:** Assign distinct Lucide icons per route. Suggested mapping:

| Route                     | Suggested Icon                  |
| ------------------------- | ------------------------------- |
| `/financial-intelligence` | `BarChart3` or `TrendingUp`     |
| `/inbox`                  | `Inbox` or `Mail`               |
| `/workflows`              | `Workflow` or `GitBranch`       |
| `/records`                | `FileText` or `Database`        |
| `/readiness-lab`          | `ShieldCheck` or `FlaskConical` |

---

## Section 21 — Mock Data File Content Violations

### 🟡 GAP-115 — `mock-fin.ts` is entirely B2B SaaS content — zero WorkshopOS relevance

**Source (F3, F5, F6 lines 60–220, WorkshopOS vocabulary spec):**

**Current `lib/mock-fin.ts`:**

```typescript
export const MOCK_REVENUE_PULSE = {
  split: { new: 45, expansion: 35, retention: 20 },  // SaaS revenue split
};

export const MOCK_PIPELINE_STAGES = [
  { stage: 'Technical Validation', value: 320000, ... },  // SaaS deal stage
  { stage: 'Business Case',        value: 280000, ... },  // SaaS deal stage
  { stage: 'Contract',             value: 150000, ... },  // SaaS deal stage
];

export const MOCK_FORECAST = {
  assumptions: [
    'Historical close rate of 34% maintained',
    '3 large enterprise deals close by EOQ',   // "enterprise deals"
  ]
};
```

Workshop businesses don't have "expansion revenue," "technical validation" deals, or "enterprise deals." The financial data model must reflect workshop cash-flow, invoicing, payroll, parts spend, and labour revenue.

**Required fix:** Rewrite `lib/mock-fin.ts` with WorkshopOS-appropriate financial data:

```typescript
// CORRECT
MOCK_REVENUE_PULSE = {
  today: 4200,
  week: 18400,
  month: 76000,
  split: { labour: 62, parts: 31, other: 7 }, // labour/parts split
};
MOCK_CASH_FLOW = {
  bankBalance: 42000,
  outstandingPayables: 8500,
  superProvision: 2280,
  safetyBuffer: 6800,
  trulySpendable: 24420,
};
MOCK_PIPELINE_STAGES = [
  { stage: "New Enquiry", value: 18000, count: 12 },
  { stage: "Quote Sent", value: 14200, count: 8 },
  { stage: "Awaiting Authorisation", value: 9600, count: 6 },
  { stage: "Booked In", value: 7800, count: 5 },
];
```

---

### 🟡 GAP-116 — `mock-intel.ts` patterns are B2B SaaS content with "Competitor X"

**Source (F5 lines 60–82, F4 lines WorkshopOS intelligence spec):**

**Current `lib/mock-intel.ts` MOCK_PATTERNS:**

```typescript
{ title: 'Accelerated conversion on technical ROI messaging',
  description: 'Leads with CTO/VP Engineering titles show a 32% increase in meeting booking when sequence shifts immediately to infrastructure cost vs standard feature list.' },
{ title: 'Stalled pipeline due to compliance review phase',
  description: '...SOC2 documentation is requested late. Recommend front-loading compliance pack...' },
{ title: 'Competitor X pricing shift detected', ... }
```

All 3 patterns reference B2B SaaS concepts (CTO/VP Engineering, infrastructure cost, SOC2, Competitor X). These are not workshop intelligence patterns.

Workshop-specific patterns should reference: quote approval rates, unanswered call callbacks, parts price movement, technician productivity, missed pickup trends.

**Required fix:** Replace all 3 patterns with WorkshopOS-relevant intelligence insights:

- "Quote approval rate lowest on Mondays (+32% on Tuesday–Thursday) — adjust quoting timing"
- "Unanswered calls between 4:30–5:30pm account for 41% of all missed calls — callback workflow needed"
- "Parts cost up 23% — Burson brake pads +14%, Repco equivalent available at 2022 pricing"

Replace "Competitor X" references with named competitors (RepairDesk, Protractor, Workshop Wizard) consistent with other pages.

---

## Section 22 — Hardcoded Non-Workshop Content in Page Components

### 🟡 GAP-117 — `CommandCenter.tsx` contains hardcoded non-Australian names and "Competitor X/Y/Z"

**Source (copilot-instructions.md, Australian naming rule, F3, F7):**

**Current `pages/CommandCenter.tsx` (hardcoded in JSX, not from store/mock files):**

```tsx
// Competitor Signal Feed — hardcoded
{ name: 'Competitor X', move: 'Raised list price 15%', when: '4h ago', impact: 'High' },
{ name: 'Competitor Y', move: 'New CFO appointed; cost-cutting tour', when: '1d ago', impact: 'Medium' },
{ name: 'Competitor Z', move: 'Outage reported by 3 of our prospects', when: '2d ago', impact: 'High' },

// Battlecard — hardcoded
<h3>Battlecard · Competitor X</h3>

// Top Opportunities — hardcoded
{ name: 'Apex Construction', value: 48, prob: 82 },
{ name: 'BlueSky Health',    value: 36, prob: 74 },
{ name: 'Pioneer Systems',   value: 22, prob: 65 },
```

"Apex Construction", "BlueSky Health", and "Pioneer Systems" are not plausible Australian workshop customers. "Competitor X/Y/Z" violates the naming rule.

**Required fix:** Replace all hardcoded content in CommandCenter.tsx with WorkshopOS-appropriate named data. Competitor feed items → RepairDesk, Workshop Wizard, Protractor with workshop-specific moves (e.g. "RepairDesk raised prices 12% — affecting 3 of your quote requests this week"). Top Opportunities → named Australian automotive businesses (e.g. "Northside Smash Repairs — Fleet Service Contract", "O'Brien Auto Group — 12-month parts supply").

---

### 🟡 GAP-118 — Today "Watchpoints" section is hardcoded with SaaS-flavoured language

**Source (F5 lines 55–80, WorkshopOS vocabulary spec):**

**Current `pages/Today.tsx` Watchpoints section (hardcoded in JSX):**

```tsx
"Pipeline conversion dropped 9% week-over-week in the Switch Targets lane.";
// "Likely cause: stale battlecard. Ironbark refreshed it 12m ago."
"$18,400 in invoices age past 30 days. Auto-nudge ready for 6 of 9.";
"Payroll runs in 2 days. All timesheets reconciled; super accruals on track.";
```

The first watchpoint uses "Pipeline conversion" and "Switch Targets lane" and "stale battlecard" — these are pure B2B SaaS outbound sales concepts that don't belong on a WorkshopOS Today page. Watchpoints for a workshop should reference: overdue job authorisations, parts backorders, vehicle pickups overdue, technician absence.

The $18,400 invoice watchpoint and Payroll watchpoint are appropriate and should be kept.

**Required fix:** Replace the "Pipeline conversion / Switch Targets lane / battlecard" watchpoint with a WorkshopOS-relevant one:

- "4 jobs awaiting customer authorisation — 2 quote responses overdue by more than 48 hours. Ironbark has draft follow-up messages ready."

Retain the invoice ($18,400) and payroll watchpoints.

---

### 🟡 GAP-119 — CRM "Why This Lead" section is hardcoded and uses SaaS language

**Source (F4 lines 155–175, spec requirement for `whySurfaced` field rendering):**

**Current `pages/CRM.tsx` right panel (hardcoded in JSX regardless of selected lead):**

```tsx
<PanelSection title="Why This Lead">
  <div>
    High intent score driven by recent website visits to pricing page and
    identified competitor churn signals. Probability of conversion within 14
    days is estimated at 68%.
  </div>
</PanelSection>
```

This text:

1. Never changes regardless of which lead is selected (always this same copy)
2. "Website visits to pricing page" is B2B SaaS — workshop leads don't arrive via pricing page
3. Ignores the `lead.whySurfaced` field which is documented as a required lead property

**Required fix:** Replace the hardcoded `PanelSection` body with `{focusedLead.whySurfaced}` (once the required field exists on leads post GAP-92). In the interim, at minimum vary it by lead using the existing mock data. Remove "website visits to pricing page" phrasing.

---

### 🟢 GAP-120 — CRM Psychological Profile persona description is hardcoded regardless of DISC type

**Source (copilot-instructions.md, DISC Data spec, F2 lines 175–210):**

**Current `pages/CRM.tsx` right panel:**

```tsx
<PanelSection title="Psychological Profile">
  <DiscBars
    primary={focusedLead.discPrimary}
    secondary={focusedLead.discSecondary}
  />
  <div className="...">
    <div className="font-medium text-foreground mb-1">
      Persona: {focusedLead.persona}
    </div>
    Focus on ROI, quick time-to-value, and minimize small talk.{" "}
    {/* ← always this */}
  </div>
</PanelSection>
```

The adaptation note "Focus on ROI, quick time-to-value, and minimize small talk" is appropriate for a high-D type, but is hardcoded for every lead regardless of DISC blend. A high-S lead needs "Build rapport first, avoid pressure" and a high-I leads needs "Use social proof and enthusiasm."

The full DISC spec includes `culturalNotes` for this purpose.

**Required fix:** Replace the hardcoded adaptation note with `{focusedLead.disc?.culturalNotes || 'Adaptation note not available.'}` once GAP-92 is resolved. In the interim, add a basic `switch` on `discPrimary` to provide 4 different adaptation messages.

---

## Section 23 — Layout and Mode Violations Found in Components

### 🟡 GAP-121 — Today right panel absent in Simple Mode; Prompt Rail spec requires it in both modes

**Source (F1 lines 195–280, copilot-instructions.md three-layer layout rule):**

The right panel on Today is defined as the "Prompt Rail" — a structured 5-section intelligence panel. The spec describes it as present in both Simple and Detailed modes (it is the primary output surface in Simple Mode, not an optional detail pane).

**Current `pages/Today.tsx`:**

```tsx
{
  /* Right Intelligence Panel (Detailed Mode Only) */
}
{
  viewMode === "Detailed" && focusedAction && (
    <RightPanel>{/* ... */}</RightPanel>
  );
}
```

Two problems:

1. The condition `viewMode === 'Detailed'` means Simple Mode has NO right panel at all — a two-column layout for a Tier 1 page
2. The secondary condition `focusedAction` means the right panel disappears when all actions are approved, leaving a two-column layout even in Detailed mode

**Required fix:** The Today Prompt Rail should be:

- Always visible (not gated by `focusedAction`)
- Visible in both Simple and Detailed modes (content may differ: Simple shows condensed version, Detailed shows full)
- Structured with the 5 Prompt Rail sections per GAP-56

---

### 🟢 GAP-122 — CommandCenter stat strip shows hardcoded values not from store

**Source (`attached_assets/camber_casper_mock_demo_source_of_truth_1776839818161.md` section 8.1, store/index.ts):**

The source of truth specifies Command page centre stats as: "Actions Ready / Awaiting Approval / Active Conversations / Opportunities Created / Risks Detected."

**Current `pages/CommandCenter.tsx`:**

```tsx
const statItems = [
  { label: "Active Strategies", value: 8, trend: 1 }, // hardcoded 8 — not from store
  { label: "Opportunities at Risk", value: 2, trend: -1 }, // hardcoded 2 — not from store
  { label: "Conversion Prob.", value: "68%", trend: 4 }, // hardcoded "68%" — not from store
  { label: "Pipeline Coverage", value: "3.2x" }, // hardcoded "3.2x" — not from store
];
```

All 4 stat values are hardcoded. They will never change regardless of what's in the store. The store has `stats.actionsReady`, `stats.awaitingApproval`, `stats.meetingsBooked`, `stats.callsCompleted` — none of these are used here.

Furthermore, "Pipeline Coverage" and "Conversion Prob." are SaaS sales-team metrics, not WorkshopOS metrics.

**Required fix:** Wire CommandCenter stat strip to `stats.actionsReady`, `stats.awaitingApproval`, and `stats.callsCompleted` from the store. Replace SaaS metrics with WorkshopOS equivalents: "Jobs Today", "Awaiting Auth", "Calls Completed", "Cash Collected Today."

---

### 🟡 GAP-123 — ModeSelect page uses wrong mode names ("Executive Brief" / "Command Center")

**Source (copilot-instructions.md, store ViewMode type, F5 lines 12–30):**

The application store defines `ViewMode = 'Simple' | 'Detailed'`. Simple Mode is described in the spec as the "owner-first, single-feed, navigation-collapsed" experience.

**Current `pages/ModeSelect.tsx`:**

```tsx
<h2 className="text-2xl font-bold mb-3">Executive Brief</h2>;
{
  /* ... for Simple mode */
}

<h2 className="text-2xl font-bold mb-3">Command Center</h2>;
{
  /* ... for Detailed mode */
}
```

Problems:

1. "Command Center" is a page name — labelling a mode "Command Center" implies the user is choosing a page
2. "Executive Brief" is not an established product term; it's undefined in the spec
3. The source of truth 7.4 describes an "operating mode" selector with "Guided / Balanced / Full Control" options — neither "Executive Brief" nor "Command Center" match any spec-defined vocabulary

**Required fix:** Rename mode cards to "Simple Mode" and "Detailed Mode" to match the `ViewMode` type. If the product team decides to use branded names, they must be defined in the source of truth first. "Command Center" as a mode name is actively misleading since `/command-center` is a specific page.

---

## Updated Summary by Priority (After Pass 3)

### 🔴 CRITICAL — 12 gaps (including Pass 3)

| #           | Gap                                                             | Affected File                         |
| ----------- | --------------------------------------------------------------- | ------------------------------------- |
| GAP-45      | Call console height < 320px                                     | `components/live-call-console.tsx`    |
| GAP-46      | Post-call panel missing                                         | `components/live-call-console.tsx`    |
| GAP-54      | Today page missing AI narrative + 5 widgets                     | `pages/Today.tsx`                     |
| GAP-55      | Industry Feed absent                                            | `lib/mock-industry-feed.ts` (new)     |
| GAP-61      | No Silicon CFO "Truly Spendable Cash"                           | `pages/FinancialIntelligence.tsx`     |
| GAP-77      | No Conversational Analytics / VICKI Ask                         | `pages/Intelligence.tsx`              |
| GAP-79      | Simple Mode nav does not collapse                               | `components/app-shell.tsx`            |
| GAP-91      | `Array.from` pattern in mock-data.ts                            | `lib/mock-data.ts`                    |
| GAP-92      | Lead type missing required spec fields                          | `store/index.ts` + `lib/mock-data.ts` |
| GAP-93      | All mock leads have generic non-Australian names                | `lib/mock-data.ts`                    |
| **GAP-111** | `--primary` token is `210 90% 60%` (neon) vs spec `210 55% 52%` | `index.css`                           |
| **GAP-112** | DiscBars uses `Math.random()` — non-deterministic DISC bars     | `components/disc-bars.tsx`            |

### 🟡 MAJOR — 44 gaps (including Pass 3)

Pass 1: GAP-47 through GAP-51, GAP-56 through GAP-59, GAP-62 through GAP-70, GAP-73 through GAP-75, GAP-78, GAP-80 through GAP-82, GAP-84 through GAP-85, GAP-87 through GAP-88

Pass 2: GAP-94 through GAP-99, GAP-101 through GAP-102, GAP-104 through GAP-110

Pass 3: GAP-113, GAP-114, GAP-115, GAP-116, GAP-117, GAP-118, GAP-119, GAP-121, GAP-123

### 🟢 POLISH — 12 gaps (including Pass 3)

Pass 1: GAP-52, GAP-53, GAP-60, GAP-67, GAP-71 through GAP-72, GAP-83, GAP-86, GAP-89 through GAP-90

Pass 2: GAP-100, GAP-103

Pass 3: GAP-120, GAP-122

---

## Top 18 Highest-Leverage Implementations (Updated After Pass 3)

1. **GAP-111** — Fix primary colour token (`210 55% 52%`) — single-line change, affects entire visual identity immediately
2. **GAP-92 + GAP-91 + GAP-93** — Rewrite mock-data.ts (Australian leads, full DISC objects, required fields) — foundational, unblocks 12+ other gaps
3. **GAP-112** — Fix DiscBars to use deterministic data from full DISC object (depends on #2)
4. **GAP-113 + GAP-114** — Fix nav label "Strategic Command" + replace LayoutDashboard icons (app-shell, ~5 lines)
5. **GAP-77** — VICKI Ask bar (single biggest missing interactive feature)
6. **GAP-46** — Post-call panel (Auto Summary, Key Moments, Follow-Up Draft)
7. **GAP-54** — Today AI narrative + WorkshopOS widgets
8. **GAP-61 + GAP-110** — Silicon CFO + Document Intelligence on Financial Intelligence page
9. **GAP-45** — Call console minimum height + Disposition Selector + Sentiment %
10. **GAP-55** — Industry Feed on Today (mechanic news, Burson/Repco alerts)
11. **GAP-115 + GAP-116** — Rewrite mock-fin.ts and mock-intel.ts with WorkshopOS data
12. **GAP-117 + GAP-118 + GAP-119** — Fix all hardcoded SaaS content in CommandCenter, Today Watchpoints, CRM right panel
13. **GAP-87** — Rewrite preparedActions mock to "work done, confirm it" pattern
14. **GAP-98 + GAP-99** — Fix Admin integrations (AU-relevant) + Compliance section
15. **GAP-121** — Today Prompt Rail visible in both modes and not gated by focusedAction
16. **GAP-94 + GAP-95** — Expand workflow items (10+) and inbox threads (6+)
17. **GAP-62** — VICKI reasoning chain visualisation on CommandCenter
18. **GAP-108** — Workflow Builder step-chain visualisation
