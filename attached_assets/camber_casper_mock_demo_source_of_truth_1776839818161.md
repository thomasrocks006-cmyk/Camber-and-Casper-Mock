# Camber & Casper Mock Demo — Source of Truth

## Status
Draft v1.0  
Purpose: locked master blueprint for the premium mock demo.  
Use this document as the canonical reference for all future prompts, screens, flows, and additions.

---

# 1. Core Identity

## 1.1 Brand hierarchy
- **Camber & Casper** = umbrella brand / company
- **Ironbark** = invisible operating engine / intelligence and infrastructure layer
- **Demo product** = premium, cross-industry operating system surface for demonstration purposes
- **BEC+RE** = readiness / assurance / simulation layer (shown in demo only where relevant)

## 1.2 Product philosophy
This is **not** a generic SaaS dashboard.
It is a **premium business operating system** that:
- sees what is happening across the business
- understands context across systems
- prepares work before the user asks
- executes within controllable autonomy limits
- learns from every outcome
- turns activity into strategy

## 1.3 Core user feeling
The product must feel:
- powerful
- premium
- elegant
- calm under pressure
- high consequence
- intelligently selective
- operationally deep

It must **not** feel:
- noisy
- startup-generic
- gimmicky
- chatbot-first
- overloaded
- colourful for no reason
- like a simple CRM or dialler

---

# 2. Locked Product Principles

These principles are locked unless explicitly revised in this document.

## 2.1 Primary operating loop
**The system sees → understands → prioritises → prepares → executes or asks for approval → learns → updates strategy.**

## 2.2 Core interaction philosophy
**Work prepared, user approves.**
The system should do the legwork.
The user should be deciding, not assembling.

## 2.3 Page structure philosophy
Every major page uses a three-layer layout:
- **Left = structure / navigation / queues / filters**
- **Centre = main operational surface**
- **Right = intelligence / rationale / prepared work / recommendations**

## 2.4 Control philosophy
Autonomy must always be visible and controllable.
The user must be able to see:
- what the system can do automatically
- what needs approval
- what is blocked
- why

## 2.5 Intelligence philosophy
Ironbark should be felt everywhere but named sparingly.
Use naming like:
- Prepared by Ironbark
- Ironbark Insight
- Ironbark Recommendation
- Powered by Ironbark

Do **not** over-label the UI with Ironbark.

## 2.6 Demo philosophy
This mock must look:
- comprehensive
- deep
- alive
- cross-connected
- believable
- already in use

It should show not just screens, but **cause and effect** between screens.

---

# 3. Anti-Drift Protocol

This section is mandatory for every future prompt that expands the mock.

## 3.1 Canonical source rule
This document is the single source of truth for:
- page names
- page purpose
- layout rules
- interaction logic
- feature placement
- UI philosophy
- demo story

If a future prompt conflicts with this document:
1. do not silently overwrite
2. create a **Proposed Change** section
3. specify what changes
4. specify why
5. specify affected pages/modules

## 3.2 Prompt extension rule
Every future design/build prompt should begin by referencing:
- current document version
- section(s) being changed
- whether the change is additive or replacing something existing

## 3.3 Placeholder rule
For any feature not fully defined:
- mark as **(to be filled)**
- define the page placement and purpose anyway
- do not invent hidden logic beyond what has been agreed

## 3.4 Confidence rule
For uncertain items, label with one of:
- **Locked** = agreed and stable
- **Draft** = included but can change
- **Placeholder** = structure only, logic to be filled

## 3.5 No-hallucination implementation rule
Future prompts must not invent:
- integrations not already named
- workflows not already implied by the architecture
- backend capabilities beyond demo scope
- pages or modules that contradict the core operating loop

## 3.6 Change log rule
Any meaningful addition should append to:
- version number
- date
- changed sections
- short reason for update

---

# 4. High-Level Architecture

## 4.1 Platform stack

```text
CAMBER & CASPER
  └─ Premium umbrella brand / product company
      
      PRODUCT DEMO SURFACE
      └─ Cross-industry premium operating system UI
         ├─ Command
         ├─ CRM
         ├─ Outbound
         ├─ Inbox
         ├─ Intelligence
         ├─ Strategic Command
         ├─ Workflows
         ├─ Records
         ├─ Readiness Lab
         └─ Admin

      IRONBARK
      └─ Operating engine / intelligence / infrastructure
         ├─ VICKI orchestration
         ├─ Silicon CFO
         ├─ Memory Layer
         ├─ Workflow Builder
         ├─ Approval Engine
         ├─ Compliance Shield
         ├─ Match Engine
         ├─ Verification Layer
         ├─ Ghost intelligence
         ├─ Scout / Psychologist / Medic / Soldier loop
         └─ Observability / safety / deployment logic

      BEC+RE
      └─ Readiness / simulation / deployment envelope layer
         ├─ business environment compiler
         ├─ chronos engine
         ├─ chaos/document factory
         ├─ execution arena
         ├─ scoring engine
         └─ deployment envelope / dossier outputs
```

## 4.2 Demo interaction architecture

```text
Signals / data / interactions
    ↓
CRM + Memory + Intelligence aggregation
    ↓
Prioritisation + strategy selection
    ↓
Queue / lane formation
    ↓
Execution (calls, drafts, workflows, approvals)
    ↓
Outcome capture (transcripts, status, sentiment, tasks)
    ↓
Learning + quality + strategic adaptation
    ↓
Updated queues / insights / recommendations
```

## 4.3 Primary demo loop

```text
Lead enters system
→ enriched by CRM/intelligence
→ compliance checked
→ assigned to lane / strategy
→ executed or queued for approval
→ transcript + result captured
→ CRM updated
→ insights updated
→ strategic response updated
→ next action prepared
```

---

# 5. Information Architecture

## 5.1 Locked main navigation
- Command
- CRM
- Outbound
- Inbox
- Intelligence
- Strategic Command
- Workflows
- Records
- Readiness Lab
- Admin

## 5.2 Page priority
### Tier 1 — must be highly polished
- Command
- CRM
- Outbound
- Intelligence
- Strategic Command

### Tier 2 — strong supporting pages
- Inbox
- Workflows
- Records

### Tier 3 — credibility / depth pages
- Readiness Lab
- Admin

---

# 6. Global UI Framework

## 6.1 Navigation shell
### Left sidebar
Contains:
- product logo/name
- workspace selector (placeholder)
- primary nav
- quick actions
- optional mode/autonomy control

### Top utility bar
Contains:
- global search / command palette
- notifications
- current workspace
- user menu
- execution policy / autonomy state

### Right intelligence panel
Persistent pattern across key pages.
Used for:
- rationale
- summaries
- recommended actions
- confidence
- risk flags
- linked context

## 6.2 Visual system
### Theme direction
- deep navy / graphite base
- porcelain / off-white text and cards
- restrained blue accents
- silver-grey dividers
- no loud gradients
- no neon
- no rainbow dashboards

### Typography
- clean sans serif
- medium-weight headings
- restrained hierarchy
- compact but breathable density

### Motion
- subtle only
- drawer slides
- card reveals
- state changes
- no playful motion

## 6.3 Core reusable component set
- stat strip
- intelligence card
- prepared action card
- queue table
- record timeline
- transcript viewer
- approval rail
- battlecard panel
- deployment envelope grid
- command palette
- autonomy selector
- strategy lane card

---

# 7. Login and Entry Flow

Status: **Locked framework / Draft details**

## 7.1 Login page purpose
Create a premium first impression and establish hierarchy.

## 7.2 Layout
### Centre card
- Product name (to be filled)
- by Camber & Casper
- Powered by Ironbark
- Sign in button(s)
- Enter demo environment button

### Right side or lower panel
- short value statement
- 3 short feature pillars:
  - command your business
  - execute with confidence
  - powered by intelligent infrastructure

## 7.3 Optional demo entry flow
After login:
- Choose workspace (placeholder)
- Choose operating depth / autonomy preset
- Enter demo

## 7.4 Optional preset selector
- Guided
- Balanced
- Full Control

Label as **operating mode**, not pricing.

---

# 8. Page-by-Page Master Map

# 8.1 Command
Status: **Locked Tier-1 Page (Expanded Spec v1.1)**

## Purpose
The executive command surface. Shows what matters now, what changed, and what is already prepared.

## Design Goal
Feel like a **chief-of-staff dashboard**:
- calm, high-signal
- minimal noise
- decisions, not data
- everything is contextualised

---

## Layout (Pixel-Level Structure)

### A. Top Command Bar (Persistent)
Height: 64–72px

Left:
- Page Title: Command
- Subtext: “Daily brief and prepared actions”

Centre Stats:
- Actions Ready
- Awaiting Approval
- Active Conversations
- Opportunities Created
- Risks Detected

Right:
- Autonomy Mode Indicator
- System Status (Healthy / Watch / Intervention)

---

### B. Left Rail — Priority Views (260px)

Sections:
- All Activity
- High Priority
- Today Only
- At Risk
- Waiting on You
- Waiting on Others
- Opportunities
- Alerts

Each shows:
- count
- trend arrow

---

### C. Main Centre — Core Feed (Primary Surface)

Structured in vertical stack of high-value cards

#### 1. Daily Brief (Hero Card)

Content:
- 2–4 sentence executive summary
- what changed overnight
- key movements

Example:
“3 high-value leads moved to ready state. One competitor pricing shift increases conversion probability in switch-target segment. 2 opportunities at risk due to delayed follow-up.”

Actions:
- View details
- Apply recommendations

---

#### 2. Prepared Actions Rail
Horizontal scroll or stacked cards

Each card includes:
- Action title
- Source (CRM / Outbound / Inbox / Strategy)
- Impact (high / medium / low)
- Confidence %
- One-tap approve button

Examples:
- “Send follow-ups to 12 leads from yesterday’s calls”
- “Approve 3 quote responses drafted overnight”
- “Execute switch-target lane (8 leads)”

---

#### 3. Opportunities Panel

Shows:
- Top opportunities created or updated
- Value
- Probability
- Source of opportunity

Includes:
- “Why this opportunity exists”

---

#### 4. Risk Panel

Shows:
- leads at risk
- delayed follow-ups
- negative sentiment signals
- compliance warnings

Each card includes:
- issue
- impact
- suggested fix

---

#### 5. Activity Delta Panel

“What changed since last session”

- leads moved stage
- meetings booked
- deals lost/won
- campaigns updated

---

#### 6. Commitments Panel

Extracted from:
- calls
- emails
- meetings

Shows:
- commitments due today
- overdue commitments
- assigned owner

---

### D. Right Intelligence Panel (Synthesis Engine)

Sections:

1. Ironbark Summary
- overall state
- confidence
- trend

2. What Matters Now
- top 3 priorities

3. Why It Matters
- reasoning chain

4. Recommended Moves
- actionable suggestions

5. Watch Signals
- emerging risks/opportunities

6. Autonomy Context
- what system is handling
- what needs approval

---

## Core Feature Systems

### 1. Daily Brief Engine

Inputs:
- CRM updates
- outbound results
- inbox signals
- intelligence patterns

Output:
- concise executive narrative

---

### 2. Prepared Work System

Aggregates:
- drafted emails
- follow-ups
- outbound batches
- workflow actions

All shown as:
- ready-to-approve items

---

### 3. Priority Engine

Ranks items based on:
- value impact
- urgency
- probability
- risk

---

### 4. Commitment Extraction

System pulls from:
- calls
- messages
- meetings

Creates:
- tasks
- reminders
- accountability

---

### 5. Change Detection System

Tracks:
- lead movement
- sentiment changes
- pipeline shifts
- strategy changes

---

## Demo Flow (Scripted)

1. Land on Command
2. Show Daily Brief
3. Highlight prepared actions
4. Open an action → trace to source (CRM or Outbound)
5. Approve action
6. Show immediate system update
7. Show risk panel → resolve one issue
8. Show commitments → demonstrate extraction

---

## Dependencies
- CRM
- Outbound
- Inbox
- Intelligence
- Workflows

- CRM
- Outbound
- Intelligence
- Workflows

---

# 8.2 CRM
Status: **Locked Tier-1 Page (Expanded Spec v1.1)**

## Purpose
The system of record and relationship intelligence layer. Not a list of contacts—this is a **360° decision surface** for every lead/company.

## Design Goal
- immediate depth on click
- zero hunting for context
- everything connected (calls, emails, deals, strategy)
- shows *why this lead matters now*

---

## Layout (Pixel-Level Structure)

### A. Top Bar
Left:
- Title: CRM
- Subtext: “Leads, relationships, and pipeline intelligence”

Centre Stats:
- Total Leads
- Ready to Act
- Meetings Booked (today/7d)
- Pipeline Value
- Avg Conversion Probability

Right:
- Create Lead
- Import
- Export

---

### B. Left Rail — Filters & Views (260–300px)

Sections:
- Views:
  - All Leads
  - Ready to Act
  - In Progress
  - Qualified
  - Nurture
  - At Risk
- Filters:
  - Status
  - Priority
  - Assigned Owner/Soldier
  - Campaign
  - Score Range
  - Last Contacted

Saved Views (chips):
- “High Intent – No Contact 7d”
- “Post-Meeting Follow-Ups”
- “Switch Targets (Ghost)”

---

### C. Main Centre — Dual Mode Surface

#### Mode 1: Pipeline Board (default)
Columns:
- New
- Ready
- Contacted
- Qualified
- Meeting Booked
- Opportunity
- Won / Lost

Cards show:
- Company + contact
- Lead score
- Engagement score
- Intent score
- Last touchpoint
- Next action
- Owner

Drag between stages updates status.

#### Mode 2: Lead Table
Columns:
- Company
- Contact
- Lead Score
- Engagement
- Intent
- Stage
- Last Contact
- Next Action
- Owner
- Campaign
- Probability

Row actions:
- View Profile
- Send to Outbound
- Assign
- Mark Review

---

### D. Right Panel — 360° Lead Intelligence (Core Differentiator)

Opens on selection. Scrollable stack:

#### 1. Header
- Company + logo (placeholder)
- Contact name + role
- Status + priority
- Scores:
  - Lead Score
  - Engagement
  - Conversion Probability

#### 2. Snapshot
- Industry
- Size / revenue (if available)
- Location
- Source
- Campaign

#### 3. Psychological Profile
- DISC chart (D/I/S/C bars)
- Persona label
- Communication style
- Decision style

#### 4. Ghost Intelligence
- Current tools/stack
- Competitors in use
- Switching signals
- Buying intent score
- Key pain points

#### 5. Compliance
- DNCR status
- Call window
- Consent state
- Block flags (if any)

#### 6. Timeline (Central Record)
Chronological feed:
- Calls (with transcript link)
- Emails
- Meetings
- Tasks
- Status changes

Each item shows:
- timestamp
- actor (agent/human)
- outcome
- sentiment

#### 7. Opportunities
- active deals
- value
- probability
- stage

#### 8. Meetings
- upcoming / past
- outcomes
- notes

#### 9. Tasks
- open
- overdue
- upcoming

#### 10. “Why This Lead” Panel (Critical)
- why surfaced now
- why in current lane
- expected outcome
- impact potential

#### 11. Recommended Action
- next best step
- pre-drafted option
- send to Outbound / Workflow

---

## Core Feature Systems

### 1. 360° Aggregation Engine
Combines:
- scout enrichment
- psychological profile
- ghost intelligence
- compliance
- interactions
- opportunities
- meetings
- tasks

Output:
- single unified lead profile

---

### 2. Lead Scoring Stack
Displayed (no deep math in demo):
- Lead Score
- Engagement Score
- Intent Score
- Conversion Probability

Used to:
- rank leads
- feed outbound lanes
- prioritise actions

---

### 3. Timeline Engine
- auto logs all interactions
- attaches transcripts and outcomes
- shows sentiment and results

---

### 4. Action Routing
From CRM user can:
- send lead to Outbound lane
- create task
- trigger workflow
- draft communication

---

### 5. Relationship Health (Draft)
Indicator combining:
- response time
- engagement trend
- sentiment
- frequency

Output:
- Healthy / Cooling / At Risk

---

### 6. Search & Recall
Global search supports:
- company name
- contact
- email
- phone

(placeholder for deeper semantic search)

---

## Demo Flow (Scripted)

1. Open CRM
2. Show pipeline board
3. Click high-value lead
4. Open 360 profile
5. Scroll timeline (calls → meetings → tasks)
6. Highlight Ghost + DISC + Compliance together
7. Show “Why This Lead” panel
8. Send lead to Outbound lane
9. Switch to Outbound and show it appears in lane

---

## Dependencies
- Outbound
- Intelligence
- Strategic Command
- Workflows

- Outbound
- Intelligence
- Strategic Command
- Workflows

---

# 8.3 Outbound
Status: **Locked flagship page (Expanded Spec v1.1)**

## Purpose
The hero execution surface where CRM + Intelligence + Strategy become action.

## Design Goal
Feel like a **command system for revenue execution**:
- dense but readable
- alive with real states
- deeply connected to CRM + Intelligence
- capable of controlled batch execution

---

## Layout (Pixel-Level Structure)

### A. Top Command Bar (Persistent)
Height: 64–72px

Left:
- Page Title: Outbound
- Subtext: “Execution lanes and live operations”

Centre Stats (live counters):
- Queued Today
- In Progress
- Completed
- Meetings Booked
- Opportunities Created
- Compliance Blocked

Right Controls:
- Execution Policy Selector (dropdown)
- Pre-Flight Status Indicator (green / amber / red)
- Primary CTA: **Execute Plan**

---

### B. Left Rail — Call Lanes (Fixed width 260–300px)
Scrollable list of system-generated lanes

Each Lane Card includes:
- Lane Name
- Lead Count
- Expected Booking Rate (%)
- Avg Deal Value
- Strategy Tag (e.g. “Post-Open”, “Switch Target”)
- Status Badge:
  - Pre-Approved
  - Review Required
  - Blocked
- Mini Sparkline (performance trend)

Example Lanes:
- Hot Follow-Up
- Cold Resurrection
- Post-Email Open
- Competitor Switch Targets
- Quote Chase
- High-Value Targets
- Review Required
- Compliance Blocked
- Manual Demo Call

Hover/Expand shows:
- Source logic (why this lane exists)
- Campaign linkage
- Last updated timestamp

---

### C. Main Centre — Lead Execution Table
Primary workspace (70% width)

Table Columns (left → right):
- Company
- Contact
- Lead Score (0–100)
- Engagement Score
- Intent Score
- Stage
- Last Touchpoint
- Next Action
- Strategy Type
- Compliance Status
- Owner/Soldier
- Predicted Outcome (%)

Row States:
- Default
- Selected
- In Call
- Completed
- Blocked

Row Actions (hover):
- Call
- Skip
- Mark for Review
- View Profile

Bulk Actions (top of table):
- Execute Selected
- Move to Lane
- Assign
- Mark Review

---

### D. Right Intelligence Panel (Context Engine)
Width: 320–360px

Sections:

1. Lead Summary
- Company snapshot
- Role / seniority
- Last interaction summary

2. Psychological Profile
- DISC breakdown
- Communication style
- Decision behaviour

3. Ghost Intelligence
- Current tools
- Competitor context
- Switching signals

4. Call Strategy
- Recommended opener
- Tone guidance
- Call objective
- Suggested duration

5. Objection Forecast
- Likely objections
- Handling notes

6. Rationale Panel
- “Why this lead is here”
- Lane logic
- Confidence score

7. Action State
- Pre-Approved / Review / Blocked
- Reason trace

---

### E. Bottom Dock — Live Call Console
Appears when call is initiated

States:
- Idle
- Dialing
- Connected
- Completed

Components:
- Call Timer
- Transcript (live streaming)
- Sentiment Indicator (colour + %)
- Vibe Score (0–100)
- Objection Tracker (chips)
- Decision Prompts
- Disposition Selector:
  - No Answer
  - Interested
  - Meeting Booked
  - Not Interested
  - Follow-Up Required

Post-Call Output Panel:
- Auto Summary
- Key Moments
- Objections Extracted
- Next Step (auto-generated)
- Follow-Up Draft

---

## Core Feature Systems

### 1. Execute Plan (Primary CTA)
Triggers batch execution

Flow:
1. Click Execute Plan
2. Pre-Flight Modal opens
3. System shows:
   - Total leads ready
   - Leads blocked (compliance)
   - Leads needing review
   - Confidence distribution
4. Confirm execution
5. System begins processing queue

Execution Modes:
- Execute All Pre-Approved
- Execute Lane Only
- Simulate Run
- Schedule for Review

---

### 2. Execution Policy Engine
User-visible autonomy control

States:
- Manual Only
- Review Each Lane
- Execute Pre-Approved
- Autonomous Within Policy

Displayed with:
- allowed actions
- blocked actions
- confidence thresholds
- compliance overlays

---

### 3. Pre-Flight Check System
Runs before any batch execution

Checklist:
- DNCR Safe
- Call Window Valid
- Compliance OK
- Strategy Assigned
- Confidence Threshold Met
- Calendar Capacity (placeholder)
- Risk Flags Cleared

Output:
- Pass (green)
- Conditional (amber)
- Blocked (red)

---

### 4. Call Lane Generation Engine (Display Only for Demo)
System explanation card:

“Lane assembled using:
- CRM lead scoring
- Interaction history
- Campaign membership
- Ghost signals
- Compliance filtering
- Current strategic goals”

---

### 5. Post-Call Processing Engine
After call completes:

System automatically:
- logs interaction
- stores transcript
- extracts objections
- updates sentiment
- updates lead stage
- creates/updates opportunity
- creates next task
- drafts follow-up
- updates intelligence layer

---

### 6. Lane Analytics Panel
Accessible per lane

Metrics:
- Connect Rate
- Booking Rate
- Avg Duration
- Sentiment Trend
- Objection Clusters
- Conversion to Opportunity
- Revenue Influence

---

## Demo Flow (Scripted)

1. Open Outbound
2. Show lanes pre-built overnight
3. Click lane → show explanation
4. Select lead → show full intelligence panel
5. Show “Why this lead?”
6. Trigger Manual Demo Call
7. Show live transcript + sentiment
8. End call → show summary + next step
9. Show CRM update (instant)
10. Show Intelligence update
11. Return to queue → highlight changes

---

## Dependencies
- CRM
- Intelligence
- Strategic Command
- Workflows
- Compliance Layer

- CRM
- Intelligence
- Strategic Command
- Workflows
- Compliance layer

---

# 8.4 Inbox
Status: **Draft framework**

## Purpose
Cross-channel intake and action conversion.

## Layout
### Left rail
- Email
- Messages
- Calls
- Meetings
- Drafts
- Action Queue

### Main centre
- communication threads
- summaries
- commitments extracted
- draft responses
- linked records

### Right panel
- selected thread summary
- next action
- rationale
- linked lead/company
- compliance/risk notes

## Required features
- commitment extraction
- summary generation
- suggested responses
- route to workflow
- route to CRM
- mark for follow-up
- meeting summary cards

## Demo wow moments
- “Meeting created 4 action items automatically.”
- “This email thread changed lead priority.”
- “Reply drafted and ready for approval.”

## Placeholder items
- full Teams/Slack integration display (to be filled)
- email sync depth (to be filled)

---

# 8.5 Intelligence
Status: **Locked Tier-1 Page (Expanded Spec v1.1)**

## Purpose
The learning and meaning engine of the system.
Transforms execution data into patterns, patterns into insights, and insights into strategy updates.

## Design Goal
Feel like:
- a **thinking layer**, not a dashboard
- clear cause → effect → recommendation
- continuously evolving
- minimal noise, high signal

---

## Layout (Pixel-Level Structure)

### A. Top Command Bar

Left:
- Title: Intelligence
- Subtext: “Patterns, performance, and system learning”

Centre Stats:
- Active Patterns
- Strategy Updates
- Learning Velocity
- Conversion Rate (global)
- Quality Score

Right:
- Time Range Selector (24h / 7d / 30d / custom)
- View Mode (Summary / Deep Analysis)

---

### B. Left Rail — Analysis Views (260–300px)

Sections:
- Overview
- Segments
- Channels
- Strategies
- Objections
- Sentiment
- Campaigns
- Lanes

Saved Views:
- “Top Performing Segments”
- “Dead Zones”
- “Recent Strategy Changes”

---

### C. Main Centre — Intelligence Surfaces

#### 1. Executive Insight Summary (Hero Card)

Content:
- concise 2–3 sentence summary of what changed

Example:
“Post-email follow-up calls are outperforming cold outreach by 42%. High-C profiles are rejecting current opener variant. Competitor-switch messaging is driving strongest conversions this week.”

Actions:
- Apply Strategy Update
- View Details

---

#### 2. Pattern Detection Panel

Displays detected patterns:

Each Pattern Card includes:
- Pattern Title
- Segment/Scope
- Metric Change (e.g. +42%)
- Confidence Score
- Sample Size

Examples:
- “Post-email leads convert 2.4x higher”
- “Cold leads in Segment X have 0% conversion”

Actions:
- Apply
- Ignore
- Monitor

---

#### 3. Segment Performance Grid

Breakdown by:
- industry
- company size
- persona type

Shows:
- conversion rate
- engagement
- avg deal size

Interactive filtering updates panels live.

---

#### 4. Strategy Comparison Panel

Compare strategies:
- Strategy A vs B
- performance metrics

Metrics:
- connect rate
- booking rate
- revenue influence

---

#### 5. Objection Intelligence

Clustered objection themes:
- pricing
- timing
- trust
- competition

Each cluster shows:
- frequency
- trend
- impact on conversion

---

#### 6. Sentiment & Quality Panel

Displays:
- sentiment trend over time
- average vibe score
- quality rating of calls

Highlights:
- drops
- spikes

---

#### 7. Campaign Intelligence

Shows campaign-level performance:
- leads contacted
- responses
- meetings
- opportunities

Includes:
- best/worst campaigns

---

### D. Right Panel — Insight Engine

#### 1. What Changed
- summary of latest movement

#### 2. Why It Happened
- causal explanation

#### 3. Recommended Adjustment
- what to change in strategy

#### 4. Execution Impact
- which outbound lanes change
- which leads affected

#### 5. Confidence & Risk
- confidence score
- downside risk

#### 6. Apply Action
- Apply to Outbound
- Update Campaign
- Modify Workflow

---

## Core Feature Systems

### 1. Pattern Detection Engine

Detects:
- performance deltas
- segment anomalies
- strategy differences

Displays:
- confidence
- sample size

---

### 2. Learning Loop

Flow:
Outbound → Results → Intelligence → Strategy → Outbound

System updates:
- lane composition
- call strategies
- messaging

---

### 3. Strategy Update Engine

When insight is approved:
- updates outbound scripts
- reassigns leads
- modifies lanes

---

### 4. Dead Zone Detection

Identifies:
- segments with low/no conversion

Output:
- deprioritise or remove

---

### 5. Sweet Spot Detection

Identifies:
- high-converting segments

Output:
- prioritise

---

### 6. Learning Velocity

Measures:
- how quickly system improves
- rate of pattern discovery

---

## Demo Flow (Scripted)

1. Open Intelligence
2. Show executive insight summary
3. Highlight one strong pattern
4. Open pattern details
5. Show recommendation
6. Apply update
7. Switch to Outbound
8. Show lanes updated

---

## Dependencies
- Outbound
- CRM
- Strategic Command

- Outbound
- CRM
- Strategic Command

---

# 8.6 Strategic Command
Status: **Locked Tier-1 Page (Expanded Spec v1.1)**

## Purpose
The strategic intelligence and competitive command centre.
This is where the system:
- sees the external environment
- detects threats and opportunities
- generates responses
- feeds strategy directly into execution (Outbound)

## Design Goal
Feel like:
- a **live battlefield map**
- calm but high-stakes
- insight → action, not just insight
- strategic, not operational

---

## Layout (Pixel-Level Structure)

### A. Top Command Bar

Left:
- Title: Strategic Command
- Subtext: “Market intelligence and strategic response”

Centre Stats:
- Active Signals
- High-Priority Threats
- Opportunities Detected
- Strategies Generated
- Actions Deployed

Right:
- Strategy Mode (Monitor / Recommend / Deploy)
- Time Window Selector (24h / 7d / 30d)

---

### B. Left Rail — Intelligence Streams (260–300px)

Sections:
- Competitors
- Pricing Movements
- Market Signals
- Technology Signals
- Geographic Changes
- Customer Sentiment
- Supplier Signals

Each shows:
- count
- severity indicator (low / medium / high)

Saved Views:
- “High Threat”
- “Immediate Opportunities”
- “Outbound Impacting Signals”

---

### C. Main Centre — Strategic Field

#### 1. Field Overview (Top Section)

Card grid or visual board showing:
- Competitor Cards
- Market Movement Tiles
- Signal Clusters

Each Card includes:
- Entity (competitor / signal source)
- Movement summary
- Impact level
- Direction (threat / opportunity)

Clicking expands full detail.

---

#### 2. Signal Feed (Live Stream)

Chronological feed of detected events:

Examples:
- “Competitor X reduced pricing by 15% on core service”
- “New entrant detected within target region”
- “Customer sentiment drop in segment Y”

Each signal includes:
- timestamp
- source type
- confidence score
- impact score

---

#### 3. Response Packs (Core Feature)

For each high-impact signal, system prepares:

Response Pack Card:
- Title (e.g. “Counter pricing strategy”)
- Situation summary
- Proposed response
- Expected impact
- Confidence

Actions:
- Approve Response
- Modify
- Send to Outbound

---

### D. Right Panel — Strategic Intelligence Engine

#### 1. Situation Summary
- what changed
- who is affected
- scale of impact

#### 2. Why It Matters
- strategic reasoning
- market implication

#### 3. Recommended Strategy
- positioning change
- messaging shift
- target segment

#### 4. Execution Impact
- which outbound lanes will change
- which leads are affected

#### 5. Confidence + Risk
- confidence score
- downside risk

#### 6. Action Routing
- Push to Outbound
- Create Campaign
- Add to Workflow

---

## Core Feature Systems

### 1. Signal Detection Engine (Display Only)

Signals originate from:
- competitor activity
- pricing changes
- reviews/sentiment
- hiring/expansion signals
- technology shifts

System displays:
- signal type
- source
- confidence
- impact

---

### 2. Threat & Opportunity Classification

Each signal classified as:
- Threat
- Opportunity
- Neutral

Scored by:
- urgency
- impact
- relevance

---

### 3. Response Pack Generator

For high-impact signals system generates:
- summary
- recommended move
- messaging angle
- execution plan

---

### 4. Battlecard Panel

For competitor-related signals:

Displays:
- competitor positioning
- strengths/weaknesses
- pricing vs us
- messaging gaps

Used to:
- guide outbound calls
- shape campaigns

---

### 5. Strategy → Execution Bridge (Critical)

Approved strategies automatically:
- create or modify outbound lanes
- update call scripts
- reprioritise leads

Visible preview before approval:
“8 leads will move to Switch Target lane”

---

### 6. Strategy Mode Control

States:
- Monitor Only
- Recommend Only
- Deploy Approved

Controls:
- whether system can act automatically
- whether user must approve

---

## Demo Flow (Scripted)

1. Open Strategic Command
2. Show competitor signal
3. Open signal detail
4. Show response pack
5. Show battlecard
6. Approve response
7. Show preview of outbound impact
8. Switch to Outbound
9. Show new/updated lane

---

## Dependencies
- Intelligence
- Outbound
- CRM
- Workflows

## Placeholder items
- deeper geospatial visualisation (to be filled)
- full external signal integrations (to be filled)

- full geospatial map logic (to be filled)
- external watch source detail (to be filled)

---

# 8.7 Workflows
Status: **Locked framework**

## Purpose
Show structure, approvals, execution control, and prepared actions.

## Layout
### Left rail
- approvals
- follow-ups
- campaigns
- billing / finance
- compliance
- meetings
- automations

### Main centre
- active workflow boards
- approval queues
- exceptions
- scheduled actions
- task progress

### Right panel
- rationale
- source trigger
- confidence
- audit trail
- policy basis

## Required features
- approval chains
- prepared action cards
- review queues
- campaign approvals
- workflow history
- automation state display

## Demo wow moments
- “Approve all draft follow-ups from yesterday’s call outcomes.”
- “Push converted leads into nurture automatically.”
- “Escalate only low-confidence cases to human review.”

## Placeholder items
- full workflow builder interface (to be filled)

---

# 8.8 Records
Status: **Draft framework**

## Purpose
Structured business memory and linked context.

## Layout
### Left rail
- leads
- companies
- customers
- vendors
- assets
- opportunities
- documents

### Main centre
- record detail
- timeline
- linked actions
- related communications
- related workflows

### Right panel
- AI summary
- related risks/opportunities
- recommended actions
- linked history

## Required features
- unified record view
- timeline
- linked objects
- memory highlights
- relationship status (placeholder)

## Demo wow moments
- “This record links calls, emails, meetings, and strategy changes.”
- “Past decisions surface automatically in context.”

---

# 8.9 Readiness Lab
Status: **Placeholder structure for future depth**

## Purpose
Show BEC+RE assurance / simulation / deployment envelope capability.

## Layout
### Top strip
- readiness score
- deployment band
- futures run
- risk ceiling
- shadow mode state

### Left rail
- scenario packs
- baseline
- fraud pressure
- operator strain
- data mess
- growth future
- audit season

### Main centre
- futures / branch visual
- scenario comparison
- failure map
- resilience summary

### Right panel
- deployment envelope
- assumptions
- blocked actions
- safe autonomy range

## Required features
- scenario selector
- deployment envelope viewer
- failure clusters
- assumption log
- readiness verdict

## Placeholder items
- full simulation explorer logic (to be filled)
- dossier export (to be filled)

---

# 8.10 Admin
Status: **Placeholder framework**

## Purpose
Credibility and control surface.

## Layout
- integrations
- execution policy
- AI preferences
- notification settings
- compliance settings
- permissions / roles
- audit / logs (placeholder)

## Required features
- autonomy settings
- integration status
- approval rule visibility
- policy status

---

# 8.11 Psychologist Layer Integration
Status: **Locked supporting intelligence layer**

## Purpose
Make the psychological profiling system visible in the demo as a core differentiator, not a hidden backend detail.

## What it contributes
- DISC personality assessment
- buyer persona classification
- communication style strategy
- objection prediction
- persuasion triggers
- Australian cultural adaptation
- real-time call adjustments
- ML improvement over time

## Where it appears in the demo
### CRM
- DISC chart
- buyer persona
- communication style
- decision style
- “Why this lead” explanatory logic

### Outbound
- recommended opener
- pace guidance
- do / don’t call notes
- expected call length
- likely objections
- persuasion triggers
- real-time adaptation alerts during live call

### Intelligence
- pattern learning
- profile accuracy trends
- strategy effectiveness by DISC/persona
- objection cluster analysis
- learning velocity

### Command
- optional highlights such as:
  - “High-C leads underperforming current opener”
  - “D-type switch targets now highest-value lane”

## Locked display elements
### CRM right panel
Must include:
- DISC bars
- primary / secondary type
- persona label
- communication style
- decision style

### Outbound right panel
Must include:
- recommended opener
- preferred pace
- pitch order
- likely objections
- persuasion triggers
- red flags
- cultural notes

### Live call console
Placeholder support for:
- profile shift alert
- objection incoming alert
- engagement dropping alert
- style mismatch alert

## Demo wow moments enabled by this layer
- “This lead is DC, not pure D — slow down and add more proof.”
- “Price sensitivity signals rising — switch to ROI response.”
- “Sydney founder lane responds best to direct bottom-line opener.”
- “High-C buyers need documentation before call — pre-send pack prepared.”

## Placeholder items
- voice tonality analysis (to be filled)
- buying committee dynamics (to be filled)
- multi-stakeholder profiling (to be filled)

# 9. Cross-Page Feature Map

## 9.1 Feature: Lead lifecycle loop
Appears across:
- CRM
- Outbound
- Intelligence
- Workflows
- Records

## 9.2 Feature: Strategy lane generation
Appears across:
- Outbound
- Intelligence
- Strategic Command
- Command

## 9.3 Feature: Compliance gating
Appears across:
- Outbound
- CRM
- Workflows
- Command
- Admin

## 9.4 Feature: Prepared work
Appears across:
- Command
- Outbound
- Inbox
- Workflows
- Strategic Command

## 9.5 Feature: Meaning extraction from outcomes
Appears across:
- Outbound
- CRM
- Intelligence
- Strategic Command

## 9.6 Feature: Memory / context retrieval
Appears across:
- CRM
- Records
- Command
- Outbound

## 9.7 Feature: Adjustable autonomy
Appears across:
- Login/entry
- Command
- Outbound
- Workflows
- Admin
- Readiness Lab

---

# 10. Locked Demo Flows

## 10.1 Primary wow flow
1. Login / enter demo
2. Land on Command
3. Show Daily Brief and prepared actions
4. Open CRM and inspect a rich lead profile
5. Move to Outbound
6. Show lane formation and why lead is there
7. Execute a manual or pre-approved call
8. Show live transcript and call analysis
9. Show CRM updated instantly
10. Show Intelligence updating with the result
11. Show Strategic Command adapting tomorrow’s strategy
12. Show Workflows preparing next actions

## 10.2 Strategic wow flow
1. Open Strategic Command
2. Show competitor movement
3. Show system-generated response pack
4. Push response into outbound lane
5. Open lane in Outbound
6. Show updated brief reflecting market change

## 10.3 Control wow flow
1. Open Outbound
2. Show execution policy control
3. Toggle from Review to Execute Pre-Approved
4. Show held/blocked items remain controlled
5. Run execute-all action
6. Show only allowed leads proceed

---

# 11. Autonomy Framework

Status: **Locked concept / Draft labels**

## 11.1 Visible control states
- Manual Only
- Review Each Lane
- Execute Pre-Approved
- Autonomous Within Policy

## 11.2 What autonomy affects
- lane execution
- follow-up drafts
- scheduling
- workflow actions
- campaign pushes
- escalation behaviour

## 11.3 What autonomy must never obscure
- what is blocked
- why review is required
- compliance status
- confidence thresholds
- source rationale

---

# 12. Placeholder Register

Use this section to capture structured gaps.

## 12.1 Product name
(to be filled)

## 12.2 Workspace structure
(to be filled)

## 12.3 Exact industry skin / default vertical
(to be filled)

## 12.4 Command mode naming
(to be filled)

## 12.5 Full inbox sync architecture
(to be filled)

## 12.6 Records object taxonomy
(to be filled)

## 12.7 Readiness Lab output artefacts
(to be filled)

## 12.8 Admin permissions matrix
(to be filled)

## 12.9 Notification framework
(to be filled)

## 12.10 Design token specifics
(to be filled)

---

# 13. Replit Handoff Master v2.0

Status: **Locked handoff consolidation**
Purpose: convert the source-of-truth into a cleaner, build-oriented master for Replit implementation, reflecting the full conversation history and tightening sections that were previously too shallow. This section supersedes earlier shallow phrasing where noted, without deleting the historical structure above. fileciteturn10file0turn10file1

---

## 13.1 Locked Terminology and Naming Corrections

### Brand / system hierarchy
- **Camber & Casper** = umbrella brand / company
- **Ironbark** = invisible operating engine / infrastructure and intelligence layer
- **Demo product** = premium operating system surface
- **BEC+RE** = Business Environment Compiler + Readiness Engine (internal technical name)
- **Operational Certainty Engine** = external/commercial frame for BEC+RE when shown to clients or investors. fileciteturn10file10turn10file6

### Replaced terminology
- Replace **War Room** with **Command Center** in the demo UI.
- Keep **Strategic Command** as an acceptable internal content category, but the actual page label in the UI should be **Command Center**.
- Keep **Command** as the executive daily brief / prepared work home surface.

### Naming rule
- **Command** = daily operational brief
- **Command Center** = external market / strategic intelligence page
- **Outbound** = execution page
- **Financial Intelligence** = CFO / revenue / pipeline page
- **Readiness Lab** = BEC+RE page

---

## 13.2 Updated Navigation for the Final Demo

The final recommended navigation for Replit should be:
- Today
- Command Center
- CRM
- Signal Engine
- Outbound
- Intelligence
- Financial Intelligence
- Inbox
- Workflows
- Records
- Readiness Lab
- Admin

### Navigation rationale
- **Today** replaces the old idea of landing directly on a dashboard. In Simple Mode, it is the AI-first feed of what matters now. In Detailed Mode, it can expand into the command surface. fileciteturn10file13turn8file0
- **Command Center** is the renamed strategic/competitive page.
- **Signal Engine** makes Scout visible instead of leaving opportunity discovery implicit. Scout is upstream of calling and provides lead discovery, trigger detection, decision-maker scoring, and battlecards. fileciteturn7file0turn10file21
- **Financial Intelligence** replaces the thinner BEC/RE+revenue wording from earlier fast-mode drafts and becomes the CFO-facing commercial and financial layer.
- **Readiness Lab** remains the BEC+RE simulation and deployment-envelope surface.

---

## 13.3 Operating Modes (Now Locked)

This is one of the most important product decisions and should be visible from login onward. The two-mode model is drawn directly from the operating-mode architecture you provided. fileciteturn8file0turn10file13

### Mode A — Simple Mode
Positioning:
- “Just tell me what I need to know and do it for me.”

Behaviour:
- home becomes a single AI-generated Today feed
- metrics explained in plain English
- actions presented as prepared recommendations
- navigation collapses to the few surfaces that matter most
- ideal for owners/executives who want outcomes, not tooling

### Mode B — Detailed Mode
Positioning:
- “Show me everything. I want to see the numbers and drive it myself.”

Behaviour:
- full navigation visible
- dashboards, filters, comparisons, drill-downs visible
- AI recommendations visible but user can edit, override, reject
- richer tables, history, widget-driven layouts

### Locked implementation rule
- Mode is **per user**, not per workspace. fileciteturn8file0
- The demo must show both modes, but default to **Simple Mode** first because it creates the strongest wow factor for the product philosophy.
- A mode toggle should live in the header on web and in Settings on mobile. fileciteturn8file0

### Demo consequence
The first page after login should ask:
- **Simple Mode**
- **Detailed Mode**

Then route into:
- **Today** for Simple Mode
- **Today (expanded)** or full app shell for Detailed Mode

---

## 13.4 Entry Flow (Updated)

### Step 1 — Login / Enter Demo
- Product name (to be filled)
- by Camber & Casper
- Powered by Ironbark
- Enter Demo Environment

### Step 2 — Choose Operating Mode
- Simple Mode
- Detailed Mode

### Step 3 — Choose Demo Workspace (placeholder)
Seeded demo workspaces should be configurable later, but the default Replit build should boot straight into the main showcase workspace.

### Step 4 — Land on Today
This is now the true home surface.

---

## 13.5 Page 1 — Today (New Locked Home Surface)

Status: **Locked Tier-1 page**

### Purpose
The AI-led operating feed. This is the cleanest expression of:
**The system knows what’s coming. It prepares the work. You approve.** fileciteturn8file0

### Design Goal
- no clutter
- no dashboard noise by default
- plain-English briefing
- one-tap approval moments
- highly convincing for owner/operator personas

### Layout
#### Top strip
- Today’s priorities
- actions ready
- approvals waiting
- anomalies detected
- cash / revenue watchpoint

#### Centre
A vertically stacked AI feed with cards such as:
- “You sent 12 quotes this week. 4 were approved. That’s lower than normal — here’s why.”
- “Smith’s Auto hasn’t responded in 14 days. I’ve drafted a follow-up.”
- “Tomorrow is pay day. All payslips are prepared for your review.”
- “Heavy rain forecast this week. I’ve prepared a wiper/tyre prompt for 40 overdue customers.”
- “A competitor pricing shift changes the value of the switch-target lane. Review recommendation?” fileciteturn8file0turn10file13

#### Right panel
- why this matters
- what the system used
- confidence
- approve / edit / skip

### Core feature groups visible in Today
- Daily Brief
- Prepared Work
- Payroll / calendar alerts
- compliance dates
- weather-triggered prompts
- supplier recommendations
- quiet-period campaign prep
- focus / distraction management (placeholder)
- one-tap approve/skip controls

### Simple Mode behaviour
- collapses navigation
- plain-English summaries
- one action per card
- conversational search bar available at top

### Detailed Mode behaviour
- same content can expand into widgets, charts, and filters

### Why Today matters
This is the page that turns the product from “many features” into “one intelligent operator layer.”

---

## 13.6 Page 2 — Signal Engine (Scout, now explicit)

Status: **Locked Tier-1 page**

### Purpose
Expose the upstream opportunity-ingestion layer so the system never feels like it is making random calls. Scout is production-ready for Apollo discovery, SEEK job signals, decision-maker scoring, battlecard generation, and event-driven enrichment; it is upstream of live calls and hands static battlecards to Soldier before execution. fileciteturn7file0turn10file21

### Layout
#### Top strip
- new leads discovered
- hot signals
- decision-makers identified
- battlecards generated
- enrichment queue

#### Left rail
- Hiring Signals
- New Business Signals
- Leadership Change
- Competitor Pressure
- Website Change
- Funding / Expansion
- Review Needed

#### Centre
##### Live Signal Feed
Each row/card shows:
- company
- trigger type
- confidence
- ICP match
- authority score
- suggested action

##### Lead Origin / Why Now drawer
Each selected item explains:
- why it exists
- why now
- what the signal means commercially
- expected urgency window

##### Battlecard panel
- opener
- pain points to probe
- competitor context
- cultural notes
- ICP fit

#### Right panel
- company snapshot
- decision-maker score
- trigger explanation
- route to CRM
- route to Outbound lane

### Locked wow moments
- “We don’t cold call. This lead exists because a signal was detected.”
- “This company is hiring a BDM — likely scaling pressure.”
- “Authority score 85, ICP match 92, HOT.”
- “Send to HOT lane.”

### Placeholder register for Scout
- LinkedIn job-change detection (to be filled)
- funding detection via Ghost integration (to be filled)
- website monitoring (to be filled)
- competitor pricing monitor (to be filled)

---

## 13.7 Page 3 — Outbound (Expanded Final Version)

Status: **Locked flagship page, superseding thinner drafts**

### Purpose
The execution surface where Signal Engine + CRM + Psychologist + policy become real outbound action.

### Core design promise
This must feel like:
- a live execution command system
- not a dialler
- not a CRM task list
- not a call centre dashboard

### Final layout
#### Top execution bar
- queued today
- in progress
- completed
- meetings booked
- opportunities created
- compliance blocked
- execution mode

#### Left rail — system-generated call lanes
Examples:
- Hiring Signals
- Switch Targets
- Post-Email Open
- Executive Buyers
- Re-activation
- Review Required
- Compliance Blocked
- Manual Demo Call

Each lane shows:
- lead count
- expected booking rate
- total opportunity value
- strategy tag
- approval state

#### Main centre — execution table
Columns:
- company
- contact
- signal reason
- lead score
- engagement
- intent
- DISC/persona tag
- strategy
- compliance
- predicted outcome
- action state

#### Right panel — pre-call intelligence
Must combine:
- Scout trigger and battlecard context
- Psychologist communication guidance
- CRM history and stage
- Ghost/market context if relevant
- exact opener and likely objections

#### Bottom dock — live call console
- transcript
- sentiment
- vibe score
- profile-shift alerts
- objection alerts
- style mismatch alerts
- disposition
- generated next step

### Locked primary features
#### Execute all pre-approved
A primary CTA that runs:
- policy check
- compliance check
- lane check
- optional simulation mode

#### Manual demo call
Must remain in the final product demo. The earlier architecture decision still stands: use mostly mocked data and a thin backend action for the one real call trigger. fileciteturn9file1

#### Execution policy engine
States:
- Manual Only
- Review Each Lane
- Execute Pre-Approved
- Autonomous Within Policy

#### Pre-flight panel
- DNCR safe
- call window valid
- strategy assigned
- confidence threshold met
- blocked items held back

#### Post-call meaning loop
After call:
- transcript stored
- objections extracted
- sentiment scored
- next action drafted
- opportunity updated
- CRM updated
- intelligence updated
- lane analytics updated

### Locked wow sequence
1. open a lane
2. explain why it exists
3. open a lead
4. show signal + profile + history together
5. run manual or pre-approved call
6. show live adjustment alerts
7. end call
8. show CRM, Intelligence, and Financial Intelligence updating from the result

---

## 13.8 Page 4 — Command Center (Final War Room Rewrite)

Status: **Locked Tier-1 page, replacing earlier War Room phrasing**

### Purpose
The premium strategic-intelligence surface. This is where market signals, competitor movements, supplier shifts, positioning logic, and response packs are synthesized into action. The underlying architecture already supports Ghost OSINT, market positioning, pattern detection, battlecards, and a production-ready war-table style UI; the demo must re-express that in more professional terms. fileciteturn10file18turn10file12

### Positioning sentence
**Command Center is where the business sees the field, understands what changed, and decides where to move next.**

### Layout
#### Top strip
- active signals
- high-priority threats
- opportunities detected
- strategies prepared
- actions deployed

#### Left rail
- competitors
- pricing watch
- supplier watch
- geography watch
- technology watch
- sentiment watch
- regulatory watch

#### Main centre top — field view
A calm strategic board showing:
- competitors
- major moves
- threat/opportunity tags
- overlap with current target segments

#### Main centre bottom — response packs
Each response pack includes:
- signal summary
- why it matters
- recommended positioning move
- outbound impact preview
- expected revenue / risk effect
- approve / modify / push to Outbound

#### Right panel
- strategic synthesis
- confidence
- impact surface
- exact downstream consequences
- route to Workflows / Outbound / Financial Intelligence

### Locked feature groups
- live signal feed
- battlecards
- market-positioning matrix
- strategic response packs
- lane impact preview
- strategy mode control (Monitor / Recommend / Deploy Approved)
- memory of repeated competitor patterns
- future-looking probability notes (lightweight, not sci-fi)

### Locked wow moments
- “Competitor raised price — switch-target lane expanded automatically.”
- “New entrant detected in region — retention response pack prepared.”
- “Battlecard updated and pushed into tomorrow’s lane.”
- “Three price drops in six months suggests margin pressure pattern.”

### Tone rule
This page must feel like an executive strategy room, not a startup ‘war room’.

---

## 13.9 Page 5 — Intelligence (Expanded Final Version)

Status: **Locked Tier-1 page**

### Purpose
Turn results into meaning and meaning into approved strategy changes.

### Layout
#### Top strip
- active patterns
- strategy updates
- learning velocity
- quality score
- revenue-attributed lift

#### Left rail
- Overview
- Segments
- Channels
- Strategies
- Objections
- Sentiment
- Campaigns
- Lanes
- Profile Effectiveness

#### Centre
- executive insight summary
- pattern cards
- segment performance grid
- strategy comparison
- objection intelligence
- sentiment/quality panel
- campaign intelligence
- profile accuracy / adaptation performance

#### Right panel
- what changed
- why it happened
- recommended adjustment
- execution impact
- apply to Outbound / Campaign / Workflow

### Psychologist-specific additions
Because the Psychologist layer is now locked as a visible differentiator, Intelligence must also show:
- which DISC/persona combinations perform best
- which openers underperform by profile
- where real-time adjustments improved outcomes
- accuracy trends of psychological predictions
- which persuasion triggers correlate with bookings. fileciteturn10file3turn7file0

### Locked wow moments
- “Post-email leads convert 2.4x higher.”
- “High-C buyers reject current opener; updated variant prepared.”
- “Switch-target messaging outperforms generic ROI narrative this week.”
- “Real-time adaptation increased booking rate by X in this profile cluster.”

---

## 13.10 Page 6 — Financial Intelligence (Expanded Final Version)

Status: **Locked Tier-1 page, replacing earlier shallow CFO draft**

### Purpose
This is the Silicon CFO / revenue / pipeline / capital-allocation surface. It should feel like a real financial intelligence layer, not a generic sales dashboard. Ironbark already includes Silicon CFO and financial operations capability; WorkshopOS examples explicitly show margin queries, payment tracking, invoice aging, and Xero-linked financial sync. fileciteturn10file8turn10file9

### Positioning sentence
**Financial Intelligence is where activity becomes forecast, forecast becomes capital allocation, and the system explains where money is being won or lost.**

### Layout
#### Top strip
- revenue today / week / month
- pipeline value
- weighted pipeline
- cash watch
- forecast confidence
- risk at value

#### Left rail
- Revenue Pulse
- Pipeline
- Forecasts
- Risk
- Unit Economics
- Attribution
- Scenario Engine
- Capital Allocation
- Collections / Cash Flow

#### Centre modules
##### 1. Revenue Pulse
- day / week / month view
- new vs expansion vs retention split
- acceleration / deceleration indicator

##### 2. Pipeline Engine
- stage totals
- weighted value
- deal velocity
- stage aging
- move-to-close probability

##### 3. Deal Intelligence
For selected deal:
- why likely to close
- main risks
- competitive context
- profile fit
- expected next action

##### 4. Forecast Engine
- best/base/worst case
- forecast confidence
- assumptions driving forecast
- deals driving upside and downside

##### 5. Collections / cash watch
- overdue invoices
- expected inflows/outflows
- cash dip forecast
- parts/supplier obligations
- payroll / BAS / super watchpoints in relevant vertical skins. fileciteturn8file0turn10file13

##### 6. Capital Allocation Engine
- where to shift time/effort
- which lanes deserve more volume
- which campaigns to reduce
- where margin risk is rising

##### 7. Revenue Attribution
- Signal Engine contribution
- Psychologist/strategy contribution
- Outbound contribution
- campaign contribution

##### 8. Scenario Engine (lightweight in demo)
- if pricing changed
- if volume shifted by lane
- if close rate changed by profile segment
- if follow-up speed improved

#### Right panel
- CFO summary
- what changed financially
- what caused it
- what the system recommends next
- confidence / downside note

### Locked wow moments
- “Forecast increased +$120K after lane shift.”
- “Hiring-signal segment is under-resourced relative to expected revenue.”
- “Three overdue invoices resolve next week’s projected cash dip.”
- “This deal is likely to close because signal urgency, profile fit, and competitor weakness align.”

### Commercial tone rule
This page must feel like:
- executive
- financial
- causal
- investor-legible
- not sales-manager basic

---

## 13.11 Page 7 — Readiness Lab (BEC+RE, Expanded Final Version)

Status: **Locked Tier-3 / credibility-and-moat page, significantly expanded**

### Purpose
Expose BEC+RE as the assurance and simulation layer without overwhelming the core product demo. BEC+RE is not a normal feature: it is a client-specific digital twin and simulation system that compiles a business environment, runs AI through time-compressed futures, and generates a mathematically rigorous deployment envelope. It is explicitly framed as an Operational Certainty Engine. fileciteturn10file10turn10file6

### Positioning sentence
**Readiness Lab proves what the system is allowed to do safely before it touches the live business.**

### What BEC+RE really adds
- compiled business environment
- universal benchmark + client-specific environment
- future-path stress testing
- OpVaR / expected shortfall
- deployment envelope
- shadow mode and drift detection
- resilience dossier and auditability
- cryptographically verifiable decision records. fileciteturn10file6turn10file16

### Layout
#### Top strip
- readiness score
- deployment band
- futures run
- OpVaR
- risk ceiling
- shadow mode state

#### Left rail
- baseline
- fraud pressure
- operator strain
- data integrity decay
- cross-entity contagion
- audit pressure
- growth scenario
- model upgrade scenario

#### Main centre
##### 1. Environment summary
- compiled entity/world state
- key assumptions
- benchmark family selected

##### 2. Future branches / simulation map
- best / base / stressed branches
- failure clusters
- dominant risk nodes

##### 3. Deployment envelope viewer
Matrix of what can be:
- autonomous
- pre-approved only
- review-gated
- blocked entirely

##### 4. Assumption log
- inferred assumptions
- verified assumptions
- missing assumptions

##### 5. Resilience outputs preview
- Deployment Envelope
- Resilience Dossier
- Loss Prevention Report
- Shadow Mode plan
- Validation Review

#### Right panel
- what failed under stress
- what held up
- what autonomy range is safe
- what must remain human controlled
- why

### Critical expanded concepts to show
#### OpVaR
Use it as the main CFO-facing risk metric. BEC’s own plan explicitly frames Operational Value at Risk and Expected Shortfall as the primary CFO-facing metric. fileciteturn10file6

#### Data Integrity Decay
Show that systems fail through entropy, rebrands, changed naming, and drift over time, not just bugs. fileciteturn10file15

#### Multi-Entity Cross-Contagion
Important for property/family-office credibility. Explicitly show how one entity’s failure can cascade into others if approval, cash, or shared bank logic breaks. fileciteturn10file15

#### Cryptographic decision trail
This is a very strong credibility layer: every autonomous decision can be sealed and reconstructed with model version, policy version, evidence, and world state hash. fileciteturn10file16

### Demo usage rule
Do not lead with this page. Use it as the “seriousness / moat / trust” reveal after the core product loop is shown.

---

## 13.12 Supporting Pages (Tightened)

### Inbox
Must emphasise:
- meeting summaries
- commitment extraction
- drafted replies
- cross-channel follow-up conversion
- action queue

### Workflows
Must emphasise:
- prepared approvals
- follow-up automation
- campaign approvals
- review queues
- policy-based routing

### Records
Must emphasise:
- connected history graph
- linked communications
- linked workflows
- linked strategic notes
- “system remembers” moments

### Admin
Must emphasise:
- execution policy
- integration state
- autonomy rules
- permissions
- compliance settings
- audit / observability placeholders

---

## 13.13 Replit Build Guidance (Locked)

### Architecture choice
For this mock, keep the earlier architecture decision:
- web-first PWA
- Replit-hosted
- premium responsive UI
- mostly mocked business logic
- one thin real-action layer for the manual outbound call if implemented. fileciteturn9file1turn9file0

### Recommended frontend stack
- Next.js
- TypeScript
- Tailwind
- Zustand
- mocked local JSON / TS fixtures
- thin route handlers / server endpoints

### What must be truly stateful in the demo
- lane movements
- approval actions
- call outcomes
- CRM updates
- intelligence updates
- financial-impact counters

### What can remain mocked
- full auth
- full sync integrations
- deep BEC simulation engine
- multi-tenant backend
- full compliance internals

### Replit handoff rule
Build enough real state mutation that the demo feels causal, but do not overbuild infrastructure.

---

## 13.14 Final Demo Spine (Locked)

The final demo should now run as:
1. Login
2. Choose Mode
3. Land on Today
4. Show prepared work
5. Open Signal Engine
6. Send signal-driven lead to Outbound
7. Open CRM and inspect profile depth
8. Execute outbound action / live manual call
9. Show Intelligence updating
10. Open Command Center and show strategic response
11. Open Financial Intelligence and show revenue effect
12. Reveal Readiness Lab as the trust/moat layer

This flow keeps:
- simplicity first
- execution second
- depth third
- credibility last

---

# 14. Version Control and Update Log

## v2.0
- corrected War Room terminology to Command Center
- promoted Today + Operating Modes to core UX structure
- added Signal Engine as an explicit page
- expanded Outbound into final execution-centric spec
- expanded Financial Intelligence into a real Silicon CFO / forecasting / allocation layer
- expanded Readiness Lab with deeper BEC+RE logic
- added Replit-specific handoff guidance
- tightened final demo spine and page naming

## v1.0
- established source-of-truth structure
- locked brand hierarchy
- locked page map
- locked three-layer layout pattern
- defined anti-drift rules
- defined primary wow flows
- mapped placeholder register

---

# 15. Working Rule for Future Prompts

Copy this into future prompts when extending the mock:

> Use `camber_casper_mock_demo_source_of_truth` as the canonical reference. Treat section 13 Replit Handoff Master v2.0 as the active build specification. Do not silently overwrite locked sections. Mark any new additions as Locked, Draft, or Placeholder. If a change conflicts with an existing section, create a Proposed Change note before modifying the structure.

