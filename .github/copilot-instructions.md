# Camber & Casper Mock — Copilot Workspace Instructions

## Project Identity — Read Before Every Change

This workspace is the **Camber & Casper premium business OS demo**. It is NOT a generic SaaS template.

| Layer     | Name            | How it appears in UI                                    |
| --------- | --------------- | ------------------------------------------------------- |
| Company   | Camber & Casper | "by Camber & Casper" — never as a product name          |
| Engine    | Ironbark        | "Prepared by Ironbark", "Ironbark Insight" — never "AI" |
| Product   | (to be filled)  | Will be set — leave as placeholder for now              |
| Assurance | BEC+RE          | Readiness Lab page                                      |

## Architecture

```
Root/              ← Demo app (App.tsx, pages/, components/, lib/, store/)
src/               ← Mockup canvas shell — do NOT edit for demo changes
api-server/        ← Express server (only /healthz today)
lib/               ← Library packages (api-spec, api-zod, api-client-react, db)
```

**Always edit files at root level for demo changes. Never edit `src/` for demo features.**

## Canonical Navigation (Locked)

```
Today · Command · CRM · Outbound · Inbox · Intelligence
Strategic Command · Workflows · Records · Readiness Lab · Financial Intelligence · Admin
```

The route `/signal-engine` MUST display as nav label **"Strategic Command"** — not "Signal Engine", not "War Room". This is locked.

## Layout Rule — Always Apply

Every Tier 1 and 2 page uses the three-layer layout:

```
Left Rail (260–300px fixed) | Centre Surface (flex-1) | Right Panel (320–360px fixed)
```

Never collapse this to a two-column layout on Tier 1 pages (Command, CRM, Outbound, Intelligence, Strategic Command).

## Design Token Rules

```css
--primary: 210 55% 52%; /* restrained blue — NOT 90% saturation */
--background: 222 30% 7%; /* deep navy */
--card: 222 25% 10%; /* panel surface */
```

Never: loud gradients, neon colours, emoji in UI text, `LayoutDashboard` as a catch-all icon.

## DISC Data — Always Use Full Shape

```typescript
// CORRECT
disc: { primaryType: 'D', secondaryType: 'C', blend: 'DC', dScore: 0.87, iScore: 0.44, sScore: 0.29, cScore: 0.62, confidence: 0.85, culturalNotes: '...' }

// WRONG
disc: 'D'
```

## Ironbark Attribution Labels

Use these exact strings:

- `Prepared by Ironbark`
- `Ironbark Insight`
- `Ironbark Recommendation`
- `Powered by Ironbark`

Never: "AI suggests", "AI-generated", "The AI...", "ChatGPT..."

## Autonomy Mode Labels (Locked — never rename)

```
Manual Only | Review Each Lane | Execute Pre-Approved | Autonomous Within Policy
```

## Gap Reference

All identified gaps are in `GAP_ANALYSIS.md`. The build phases are in `BUILD_PLAN.md`.
Run `make gaps` to see the gap summary.
Run `make contamination` to check for naming violations.
Run `make check` before every commit.

## Completion Reporting — Required

At the end of **every response** that makes code changes, append a completion percentage line:

```
**Build completion: XX% (N/39 gaps closed)**
```

Calculate as: (fully closed gaps) / 39 × 100. Partial gaps count as 0.5.
Reference GAP_ANALYSIS.md for the canonical list. Never skip this line.

## Mock Data Rules

- No `Array.from({length:N}).map()` patterns
- All leads must be named Australian companies/contacts
- Every lead MUST have: `whySurfaced`, `laneLogic`, `disc` (full object), `currentTools[]`, `keyPainPoints[]`, `recommendedOpener`
- At minimum 10 workflow items across 4+ categories
- At minimum 6 inbox threads across email/call/meeting types

## Call Console Rules

- Minimum visible height: 320px when active (not 64px drawer)
- Must have: Sentiment % indicator, Vibe Score (0–100), Objection Tracker chips, Disposition Selector
- Post-call panel must render: Auto Summary, Key Moments, Objections Extracted, Next Step, Follow-Up Draft
- Real-time alert placeholder slots must exist (Profile Shift / Objection Incoming / Engagement Dropping)
