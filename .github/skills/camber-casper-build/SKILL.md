---
name: camber-casper-build
description: "Use when: building, editing, or reviewing pages/components/store/mock-data for the Camber & Casper premium demo. Use for all feature gaps from GAP_ANALYSIS.md, UI changes, mock data enrichment, route changes, call console work, Strategic Command page, or any Ironbark-branded interface work. Covers visual system, three-layer layout, DISC panels, Psychologist layer, and all 39 identified gaps."
---

# Camber & Casper Build Skill

## Project Identity

| Layer           | Name            | Role in UI                                                       |
| --------------- | --------------- | ---------------------------------------------------------------- |
| Company         | Camber & Casper | Company name — never the product name                            |
| Engine          | Ironbark        | Invisible engine — label prepared work as "Prepared by Ironbark" |
| Product         | (to be filled)  | The named OS surface users see                                   |
| Assurance layer | BEC+RE          | Readiness Lab page                                               |

## Architecture Quick Reference

```
Root/
├── App.tsx            — Real demo SPA router (wouter)
├── pages/             — 14 demo pages
├── components/        — app-shell, live-call-console, right-panel, stat-strip, etc.
├── lib/               — mock-data.ts, mock-*.ts files (ALL mock data here)
├── store/index.ts     — Zustand store (Lead, CallConsole, Lane, Signal, etc.)
├── index.css          — Design tokens (CSS vars only, Tailwind v4)
└── api-server/        — Express server (only /healthz exists today)
```

The `src/` folder is the mockup canvas shell — do NOT edit it for demo changes.

## Canonical Page Map (Locked)

| Route                     | Page                   | Tier |
| ------------------------- | ---------------------- | ---- |
| `/today`                  | Today                  | T1   |
| `/command-center`         | Command                | T1   |
| `/crm`                    | CRM                    | T1   |
| `/outbound`               | Outbound               | T1   |
| `/intelligence`           | Intelligence           | T1   |
| `/signal-engine`          | Strategic Command      | T1   |
| `/inbox`                  | Inbox                  | T2   |
| `/workflows`              | Workflows              | T2   |
| `/records`                | Records                | T2   |
| `/readiness-lab`          | Readiness Lab          | T3   |
| `/financial-intelligence` | Financial Intelligence | T3   |
| `/admin`                  | Admin                  | T3   |

**Critical:** `/signal-engine` route name stays, but nav label and page MUST be "Strategic Command".

## Three-Layer Layout Rule (Always Apply)

Every Tier 1 and Tier 2 page uses:

```
Left Rail (260–300px)    Centre Surface (flex-1)    Right Panel (320–360px)
navigation / filters     main operational content    intelligence / rationale
```

## Design Token Rules

```css
/* CORRECT — restrained */
--primary: 210 55% 52%; /* Not 90% saturation */
--accent: 210 55% 52%;

/* Background hierarchy */
--background: 222 30% 7%; /* Page canvas */
--card: 222 25% 10%; /* Default card */
--card-elevated: 222 22% 13%; /* Highlighted/hover card */
--secondary: 222 20% 18%; /* Interactive surfaces */
--muted: 222 20% 15%; /* Muted backgrounds */
```

Never use: loud gradients, emoji in UI text, neon colours, `LayoutDashboard` as a generic icon.

## Icon Convention

| Page                              | Icon              |
| --------------------------------- | ----------------- |
| Today                             | `MonitorPlay`     |
| Command                           | `LayoutDashboard` |
| CRM                               | `Users`           |
| Signal Engine / Strategic Command | `Radio`           |
| Outbound                          | `Phone`           |
| Intelligence                      | `Zap`             |
| Financial Intelligence            | `TrendingUp`      |
| Inbox                             | `Inbox` or `Mail` |
| Workflows                         | `GitBranch`       |
| Records                           | `Database`        |
| Readiness Lab                     | `ShieldCheck`     |
| Admin                             | `Settings`        |

## Label Convention for Ironbark

Use these exact strings when attributing system-generated work:

- `Prepared by Ironbark`
- `Ironbark Insight`
- `Ironbark Recommendation`
- `Powered by Ironbark`

Do NOT use: "AI suggests", "AI-generated", "Camber & Casper suggests".

## Autonomy Mode Labels (Locked — do not change)

```
Manual Only
Review Each Lane
Execute Pre-Approved
Autonomous Within Policy
```

## DISC Data Shape (Minimum Required)

```typescript
interface DISCProfile {
  primaryType: "D" | "I" | "S" | "C";
  secondaryType?: "D" | "I" | "S" | "C";
  blend: string; // e.g. "DC", "IS"
  dScore: number; // 0–1
  iScore: number;
  sScore: number;
  cScore: number;
  confidence: number; // 0–1
  culturalNotes?: string; // Australian adaptation note
}
```

## Lead Data Shape (Minimum Required)

```typescript
interface Lead {
  // Basic
  id: string;
  name: string;
  company: string;
  role: string;
  industry: string;
  location: string;
  // Scores
  leadScore: number; // 0–100
  engagementScore: number;
  intentScore: number;
  conversionProbability: number;
  // DISC
  disc: DISCProfile;
  buyerPersona:
    | "EXECUTIVE_BUYER"
    | "TECHNICAL_BUYER"
    | "USER_BUYER"
    | "COACH"
    | "ECONOMIC_BUYER";
  // Ghost Intelligence
  currentTools: string[];
  competitorProducts: string[];
  switchingSignals: string[];
  buyingIntentScore: number;
  keyPainPoints: string[];
  // Compliance
  dncr: boolean;
  callWindow: string;
  complianceStatus: "Clear" | "Review" | "Blocked";
  // "Why This Lead"
  whySurfaced: string;
  laneLogic: string;
  expectedOutcome: string;
  // Psychologist tactical
  recommendedOpener: string;
  pitchOrder: string[];
  likelyObjections: Array<{ objection: string; response: string }>;
  persuasionTriggers: string[];
  redFlags: string[];
  culturalNotes: string;
  // Timeline
  timeline: TimelineEntry[];
}
```

## Critical Gaps To Always Be Aware Of

Reference GAP_ANALYSIS.md for full list. Top 5 that affect every build task:

1. **GAP-03/GAP-22**: Strategic Command nav + page content — always use "Strategic Command" label
2. **GAP-11**: "Why This Lead" panel on CRM right panel — always include in 360° profile
3. **GAP-21**: Outbound right panel needs opener + pitch order + objections + cultural notes
4. **GAP-35**: DISC must always use blend + four scores, not a single letter
5. **GAP-32**: Mock data must look realistic — named Australian companies, real pain points

## Call Console Rules

- Must occupy significant vertical space (min 320px when open), NOT a 64px drawer
- Must have: Transcript (live) · Sentiment % · Vibe Score · Objection Tracker chips
- Disposition selector: No Answer / Interested / Meeting Booked / Not Interested / Follow-Up Required
- Post-call panel: Auto Summary · Key Moments · Objections Extracted · Next Step · Follow-Up Draft
- Real-time alert slots (even if mocked): Profile Shift / Objection Incoming / Engagement Dropping

## Mock Data Standards

- No `Array.from({length:30}).map((_,i)=>...)` patterns
- All leads must be named Australian companies and contacts
- Each lead must have a `whySurfaced` explanation string
- DISC must use full 4-score object, not enum
- At minimum 10 workflow items across 4 categories
- At minimum 6 inbox threads across email/call/meeting/message types

## Testing Checklist (Run Before Committing)

```bash
make check       # full quality check
make test        # run unit + component tests
make lint        # ESLint
make types       # TypeScript noEmit
```

## File Creation Rules

1. Read existing file before editing
2. For new pages: follow three-layer layout pattern
3. For mock data: keep in `lib/mock-*.ts`, import from there
4. Never add `console.log` to production code
5. Never use inline styles (use Tailwind classes)
6. Never use `any` type in TypeScript
