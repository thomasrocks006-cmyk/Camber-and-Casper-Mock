import {
  Lead,
  PreparedAction,
  OutboundLane,
  Signal,
  ResponsePack,
} from "../store";

export const MOCK_LEADS: Lead[] = [
  {
    id: "l1",
    company: "Northside Auto & Tyre",
    contact: "Brett Kowalski",
    role: "Owner",
    score: 91,
    engagement: 84,
    intent: 88,
    stage: "Ready",
    lastContact: "2 days ago",
    nextAction: "Discovery call re: job management software",
    owner: "Ironbark",
    disc: {
      primaryType: "D",
      secondaryType: "C",
      blend: "DC",
      dScore: 0.87,
      iScore: 0.34,
      sScore: 0.28,
      cScore: 0.65,
      confidence: 0.88,
      culturalNotes:
        "Results-first. Skip the rapport-building — lead with ROI and time savings. Hates indecision. Provide options with a clear recommendation.",
    },
    persona: "Results-Driven",
    whySurfaced:
      "Posted a BDM role on SEEK and a Workshop Manager role within 30 days — signals growth pressure. Workshop Software subscription lapsed 6 weeks ago per domain intel.",
    laneLogic:
      "Hot Follow-Up — expansion phase, high switching intent, decision-maker identified",
    currentTools: [
      "Workshop Software (lapsed)",
      "Xero",
      "WhatsApp for customer comms",
    ],
    keyPainPoints: [
      "Manual job cards still on paper",
      "No automated service reminders",
      "Spending 3 hrs/week chasing overdue invoices",
    ],
    recommendedOpener:
      "G'day Brett, it's Alex from Camber & Casper. Noticed you've been growing the team — we help workshops like yours automate the back-office so you're not the bottleneck. Got 5 minutes?",
    ghostIntel: {
      tools: ["Workshop Software (lapsed)", "Xero", "WhatsApp"],
      switchingSignals: [
        "Workshop Software subscription lapsed 6 weeks ago",
        "SEEK job posting for Workshop Manager",
      ],
      painPoints: ["Manual job cards", "No SMS reminders", "Invoice chasing"],
    },
    compliance: { dncr: false, window: "8am-7pm AEST", consent: true },
  },
  {
    id: "l2",
    company: "Sunshine Coast Panel & Paint",
    contact: "Kylie Andreou",
    role: "Director",
    score: 85,
    engagement: 79,
    intent: 82,
    stage: "Qualified",
    lastContact: "1 day ago",
    nextAction: "Send ROI summary + follow up Thursday",
    owner: "Ironbark",
    disc: {
      primaryType: "I",
      secondaryType: "S",
      blend: "IS",
      dScore: 0.42,
      iScore: 0.81,
      sScore: 0.68,
      cScore: 0.34,
      confidence: 0.82,
      culturalNotes:
        'Warm and collaborative. Build rapport before business. Use social proof — "other workshops in QLD are seeing...". She values relationships over features.',
    },
    persona: "Collaborative Builder",
    whySurfaced:
      "Qld competitor (Protractor user) announced price increase. Kylie posted on a Facebook workshop group asking for alternatives. Ironbark flagged as high-intent switcher.",
    laneLogic:
      "Competitor Switch Targets — triggered by RepairDesk/Protractor price hike",
    currentTools: ["Protractor", "MYOB", "SMS broadcast tool (manual)"],
    keyPainPoints: [
      "Protractor price up 22% at renewal",
      "Poor customer communication history",
      "No insight into technician productivity",
    ],
    recommendedOpener:
      "Hi Kylie, saw your post about Protractor pricing — we hear that a lot right now. We helped Bayside Smash Repairs switch over in under 2 weeks with zero downtime. Happy to share how they did it?",
    ghostIntel: {
      tools: ["Protractor", "MYOB"],
      switchingSignals: [
        "Protractor renewal price increase",
        "Public post asking for alternatives",
      ],
      painPoints: [
        "Protractor pricing",
        "Manual SMS comms",
        "No productivity reporting",
      ],
    },
    compliance: { dncr: false, window: "9am-6pm AEST", consent: true },
  },
  {
    id: "l3",
    company: "O'Brien Auto Group",
    contact: "Declan O'Brien",
    role: "Managing Director",
    score: 78,
    engagement: 61,
    intent: 74,
    stage: "New",
    lastContact: "5 days ago",
    nextAction: "Wait for DNCR expiry — prep battlecard",
    owner: "VICKI (Queue)",
    disc: {
      primaryType: "D",
      secondaryType: "I",
      blend: "DI",
      dScore: 0.82,
      iScore: 0.58,
      sScore: 0.22,
      cScore: 0.31,
      confidence: 0.79,
      culturalNotes:
        "Fast decision-maker with a charismatic streak. Wants to be seen as progressive. Open to innovation but won't sit through a long demo. Lead with a bold claim, back it with one data point.",
    },
    persona: "Visionary Driver",
    whySurfaced:
      "Multi-site operation (3 locations). Hired a new Operations Manager 6 weeks ago — signals process improvement initiative. Fleet of 20+ vehicles serviced internally.",
    laneLogic: "Multi-site expansion lane — high ticket value, complex needs",
    currentTools: ["Workshop Wizard", "Xero", "Employment Hero", "Outlook"],
    keyPainPoints: [
      "No visibility across 3 sites",
      "Technician scheduling is a spreadsheet",
      "Fleet jobs not tracked separately from retail",
    ],
    recommendedOpener:
      "G'day Declan, it's Alex. You're running three sites and growing — most workshop software falls apart at that point. Ironbark is built for it. Can I show you one thing that would change how you see the whole operation?",
    ghostIntel: {
      tools: ["Workshop Wizard", "Xero", "Employment Hero"],
      switchingSignals: [
        "New Operations Manager hired",
        "Multi-site complexity",
      ],
      painPoints: ["Multi-site visibility", "Scheduling", "Fleet tracking"],
    },
    compliance: { dncr: true, window: "9am-8pm AEST", consent: false },
  },
  {
    id: "l4",
    company: "Parramatta Panel & Paint",
    contact: "Maria Esposito",
    role: "Owner / Head Estimator",
    score: 88,
    engagement: 91,
    intent: 86,
    stage: "Meeting Booked",
    lastContact: "Today",
    nextAction: "Demo call Thursday 2pm — prepare smash repair workflow demo",
    owner: "Ironbark",
    disc: {
      primaryType: "C",
      secondaryType: "S",
      blend: "CS",
      dScore: 0.31,
      iScore: 0.29,
      sScore: 0.62,
      cScore: 0.84,
      confidence: 0.91,
      culturalNotes:
        "Highly analytical. Will read every line of a proposal. Needs data, not promises. Don't rush. Provide a detailed comparison doc before the call. She will have questions prepared.",
    },
    persona: "Analytical Methodical",
    whySurfaced:
      "Requested a product comparison via website contact form. Currently using RepairDesk which raised prices by 18%. High inbound intent — self-qualified.",
    laneLogic: "Hot Follow-Up — self-initiated enquiry, demo booked",
    currentTools: ["RepairDesk", "Xero", "Supercheap for parts ordering"],
    keyPainPoints: [
      "RepairDesk pricing increased 18%",
      "No insurance company integration",
      "Manual quote creation taking 45 min per job",
    ],
    recommendedOpener:
      "Hi Maria, looking forward to Thursday. I've prepared a side-by-side comparison of your current RepairDesk setup vs what Ironbark does at the same price. I'll send it tonight so you can review before we chat.",
    ghostIntel: {
      tools: ["RepairDesk", "Xero"],
      switchingSignals: [
        "18% RepairDesk price increase",
        "Inbound enquiry via website",
      ],
      painPoints: [
        "RepairDesk pricing",
        "Insurance integration gap",
        "Quote time per job",
      ],
    },
    compliance: { dncr: false, window: "8am-6pm AEST", consent: true },
  },
  {
    id: "l5",
    company: "Geelong Tyre & Service Centre",
    contact: "Wayne Pemberton",
    role: "Owner",
    score: 72,
    engagement: 55,
    intent: 68,
    stage: "Contacted",
    lastContact: "3 days ago",
    nextAction: "Re-engage with winter tyre campaign angle",
    owner: "Ironbark",
    disc: {
      primaryType: "S",
      secondaryType: "C",
      blend: "SC",
      dScore: 0.28,
      iScore: 0.35,
      sScore: 0.79,
      cScore: 0.61,
      confidence: 0.77,
      culturalNotes:
        "Steady and methodical. Dislikes pressure. Values reliability and consistency over innovation. Build trust over multiple touches. Reference local success stories.",
    },
    persona: "Steady Processor",
    whySurfaced:
      "Annual Workshop Software renewal coming up in 6 weeks. No growth signals — retention play. High lifetime value if converted (fleet contracts).",
    laneLogic:
      "Warm Re-engagement — renewal window, loyalty conversion opportunity",
    currentTools: ["Workshop Software", "MYOB", "Manual tyre order sheets"],
    keyPainPoints: [
      "Tyre inventory not tracked in software",
      "No automated seasonal campaign capability",
      "Relies on word-of-mouth",
    ],
    recommendedOpener:
      "G'day Wayne, it's Alex. Your Workshop Software renewal is coming up — before you sign again I'd love to show you what we do differently. Takes 10 minutes. No pressure at all.",
    ghostIntel: {
      tools: ["Workshop Software", "MYOB"],
      switchingSignals: [
        "Annual renewal window approaching",
        "No digital presence growth",
      ],
      painPoints: [
        "Tyre inventory gaps",
        "No seasonal campaigns",
        "Manual ordering",
      ],
    },
    compliance: { dncr: false, window: "9am-5pm AEST", consent: true },
  },
  {
    id: "l6",
    company: "Bayside Automotive Repairs",
    contact: "Raj Patel",
    role: "Owner",
    score: 80,
    engagement: 76,
    intent: 79,
    stage: "Ready",
    lastContact: "1 day ago",
    nextAction: "Call re: VICKI cash flow intelligence demo",
    owner: "Ironbark",
    disc: {
      primaryType: "D",
      secondaryType: "C",
      blend: "DC",
      dScore: 0.79,
      iScore: 0.41,
      sScore: 0.32,
      cScore: 0.68,
      confidence: 0.84,
      culturalNotes:
        "Pragmatic operator. Has been burned by software that promised everything and delivered nothing. Lead with a concrete outcome: 'We will save you X hours per week.' Show don't tell.",
    },
    persona: "Pragmatic Operator",
    whySurfaced:
      "ABN registered 14 months ago — past the setup phase, now optimising. 3 Google reviews in last 2 months mention quick turnaround — strong reputation signal. Growing fast.",
    laneLogic:
      "Hot Follow-Up — high-growth phase, cash flow pressure typical at this stage",
    currentTools: ["Xero", "Facebook for bookings", "Phone / paper job cards"],
    keyPainPoints: [
      "No job management system",
      "Cash flow blind spots",
      "Growing too fast for manual systems",
    ],
    recommendedOpener:
      "G'day Raj, it's Alex. You're 14 months in and things are clearly moving fast — that's exactly when Ironbark is most useful. Can I show you the cash flow dashboard that tells you your true spendable cash at any moment?",
    ghostIntel: {
      tools: ["Xero", "Facebook"],
      switchingSignals: [
        "Fast growth indicators",
        "No job management system in place",
      ],
      painPoints: [
        "Cash flow visibility",
        "Manual job cards",
        "Scaling operations",
      ],
    },
    compliance: { dncr: false, window: "9am-7pm AEST", consent: true },
  },
  {
    id: "l7",
    company: "Mornington Mechanical",
    contact: "Sandra McHugh",
    role: "Operations Manager",
    score: 68,
    engagement: 52,
    intent: 61,
    stage: "Qualified",
    lastContact: "6 days ago",
    nextAction: "Send payroll automation case study",
    owner: "Ironbark",
    disc: {
      primaryType: "S",
      secondaryType: "I",
      blend: "SI",
      dScore: 0.29,
      iScore: 0.62,
      sScore: 0.77,
      cScore: 0.38,
      confidence: 0.74,
      culturalNotes:
        "Team-oriented and warm. Decisions aren't hers alone — she'll need to bring the owner in. Focus on how the system helps her team, not just the owner.",
    },
    persona: "Team Builder",
    whySurfaced:
      "Employment Hero integration gone stale — payroll manually reconciled for 3 months per LinkedIn post. Sandra is the OM and likely the first point of contact for any software decision.",
    laneLogic:
      "Warm Re-engagement — payroll pain point, influencer not decision-maker",
    currentTools: [
      "Workshop Software",
      "Employment Hero (broken integration)",
      "Xero",
    ],
    keyPainPoints: [
      "Payroll reconciliation done manually each fortnight",
      "Employment Hero sync broken for 3 months",
      "Technician leave tracking is a spreadsheet",
    ],
    recommendedOpener:
      "Hi Sandra, saw the comment about your Employment Hero sync — we've seen that exact issue with Workshop Software. We fix it and add automated payroll prep on top. Would you have 15 minutes this week?",
    ghostIntel: {
      tools: ["Workshop Software", "Employment Hero"],
      switchingSignals: [
        "Broken Employment Hero integration",
        "Manual payroll pain publicly mentioned",
      ],
      painPoints: [
        "Payroll reconciliation",
        "Leave tracking",
        "Integration failures",
      ],
    },
    compliance: { dncr: false, window: "8am-5pm AEST", consent: true },
  },
  {
    id: "l8",
    company: "Toowoomba Truck & Trailer",
    contact: "Craig Hutchinson",
    role: "Owner / Head Mechanic",
    score: 76,
    engagement: 70,
    intent: 73,
    stage: "New",
    lastContact: "4 days ago",
    nextAction: "Initial outreach — fleet servicing angle",
    owner: "VICKI (Queue)",
    disc: {
      primaryType: "D",
      secondaryType: "S",
      blend: "DS",
      dScore: 0.74,
      iScore: 0.38,
      sScore: 0.56,
      cScore: 0.44,
      confidence: 0.76,
      culturalNotes:
        "Hands-on operator who works in the business, not on it. Respects tradespeople. Don't come across as a slick salesman — be direct and practical. Speak his language: jobs, bays, not pipelines.",
    },
    persona: "Hands-On Operator",
    whySurfaced:
      "Fleet of 8 trucks serviced in-house. MVIS inspection certification renewed last month. Hiring a second mechanic — capacity expansion signal.",
    laneLogic:
      "Growth Opportunity — fleet expansion, cert renewal, hiring signal",
    currentTools: [
      "Paper job cards",
      "Xero",
      "Phone only for customer contact",
    ],
    keyPainPoints: [
      "No digital job tracking for truck fleet",
      "MVIS compliance paperwork all manual",
      "Labour costs hard to track per job",
    ],
    recommendedOpener:
      "G'day Craig, it's Alex. You're running heavy vehicles with MVIS compliance on top — that's a lot to manage without software. We help truck shops track every job, automate compliance reminders, and know exactly where each dollar of labour goes. Worth a look?",
    ghostIntel: {
      tools: ["Paper job cards", "Xero"],
      switchingSignals: [
        "Hiring second mechanic",
        "MVIS cert recently renewed",
      ],
      painPoints: [
        "No digital job tracking",
        "MVIS compliance manual",
        "Labour cost visibility",
      ],
    },
    compliance: { dncr: false, window: "7am-5pm AEST", consent: true },
  },
  {
    id: "l9",
    company: "Frankston Auto Electrics",
    contact: "Tanya Fletcher",
    role: "Owner",
    score: 65,
    engagement: 48,
    intent: 58,
    stage: "New",
    lastContact: "8 days ago",
    nextAction: "Cold resurrection — EV servicing angle",
    owner: "VICKI (Queue)",
    disc: {
      primaryType: "C",
      secondaryType: "D",
      blend: "CD",
      dScore: 0.52,
      iScore: 0.24,
      sScore: 0.31,
      cScore: 0.88,
      confidence: 0.81,
      culturalNotes:
        "Detail-oriented and sceptical. Will ask hard questions and expect precise answers. Don't oversell — underpromise and overdeliver. Send written material before the call. She prepares.",
    },
    persona: "Meticulous Sceptic",
    whySurfaced:
      "Auto electrician with growing EV diagnostic capability. EV adoption accelerating in Frankston market. Ironbark flagged 3 months ago — re-surface with EV-specific capability angle.",
    laneLogic:
      "Cold Resurrection — market tailwind (EV), previously unresponsive",
    currentTools: ["Repco Connect (parts)", "Xero", "Paper job sheets"],
    keyPainPoints: [
      "EV diagnostic jobs need separate tracking",
      "No customer email list for targeted campaigns",
      "Warranty claim documentation fully manual",
    ],
    recommendedOpener:
      "Hi Tanya, it's Alex from Camber & Casper. EV diagnostic work is growing fast in your area — we've added specific EV job tracking and warranty documentation tools. I'll send a one-pager. If it makes sense, happy to walk through it next week?",
    ghostIntel: {
      tools: ["Repco Connect", "Xero"],
      switchingSignals: [
        "EV capability expansion",
        "No CRM for targeted campaigns",
      ],
      painPoints: [
        "EV job tracking",
        "Warranty documentation",
        "Customer outreach capability",
      ],
    },
    compliance: { dncr: false, window: "9am-6pm AEST", consent: true },
  },
  {
    id: "l10",
    company: "Canning Vale Fleet Services",
    contact: "Andrew Blackwood",
    role: "Fleet Manager",
    score: 83,
    engagement: 77,
    intent: 81,
    stage: "Qualified",
    lastContact: "2 days ago",
    nextAction: "Send multi-vehicle fleet proposal",
    owner: "Ironbark",
    disc: {
      primaryType: "C",
      secondaryType: "S",
      blend: "CS",
      dScore: 0.33,
      iScore: 0.26,
      sScore: 0.64,
      cScore: 0.86,
      confidence: 0.87,
      culturalNotes:
        "Process-driven and risk-averse. Needs to justify the decision to a board or senior manager. Provide total cost of ownership, compliance evidence, and a rollout timeline. He won't rush.",
    },
    persona: "Process Guardian",
    whySurfaced:
      "Fleet of 34 vehicles across 2 WA depots. Contract clients (local councils, construction). Monthly maintenance spend estimated >$18k. High LTV target. Fleetmatics end-of-life in 12 months.",
    laneLogic:
      "Multi-vehicle fleet lane — enterprise-level complexity, high ticket",
    currentTools: [
      "Fleetmatics (legacy)",
      "Xero",
      "Manual service schedules in Excel",
    ],
    keyPainPoints: [
      "Fleetmatics end-of-life in 12 months",
      "No automated maintenance scheduling per vehicle",
      "Contract billing takes 4 hours per month",
    ],
    recommendedOpener:
      "Hi Andrew, it's Alex. With Fleetmatics being wound down, a lot of WA fleet managers are looking for a replacement that also handles the billing side. I can show you how we automate both per-vehicle maintenance schedules and monthly contract invoicing in one place. When suits?",
    ghostIntel: {
      tools: ["Fleetmatics (legacy)", "Xero", "Excel"],
      switchingSignals: [
        "Fleetmatics end-of-life announcement",
        "Contract billing pain known",
      ],
      painPoints: [
        "Platform migration deadline",
        "Maintenance scheduling",
        "Contract billing time",
      ],
    },
    compliance: { dncr: false, window: "8am-5pm AWST", consent: true },
  },
  {
    id: "l11",
    company: "Highett Smash Repairs",
    contact: "Luca Esposito",
    role: "Workshop Owner",
    score: 74,
    engagement: 68,
    intent: 71,
    stage: "New",
    lastContact: "7 days ago",
    nextAction: "Insurance integration pitch — IAG/Suncorp referral angle",
    owner: "Ironbark",
    disc: {
      primaryType: "I",
      secondaryType: "D",
      blend: "ID",
      dScore: 0.61,
      iScore: 0.78,
      sScore: 0.34,
      cScore: 0.42,
      confidence: 0.78,
      culturalNotes:
        "Enthusiastic and deal-oriented. Responds well to energy. Pitch the vision first, then the mechanics. He'll want to know who else is using it and whether he can brag about it.",
    },
    persona: "Enthusiastic Dealmaker",
    whySurfaced:
      "Highett is a high-density suburb with strong smash repair demand. Insurance work accounts for ~60% of revenue. No insurance portal integration. Manual IAG/Suncorp uploads.",
    laneLogic:
      "Hot Follow-Up — insurance dependency creates strong integration pull",
    currentTools: [
      "ACM Parts (insurance parts)",
      "Xero",
      "Phone/email only",
      "Manual IAG/Suncorp uploads",
    ],
    keyPainPoints: [
      "Manual IAG and Suncorp job uploads take 2 hrs/day",
      "No automated status updates to insurance companies",
      "Not on preferred repairer program",
    ],
    recommendedOpener:
      "Luca, it's Alex. You're doing 60% insurance work and uploading jobs to IAG manually — that's 2 hours a day. We can automate the whole thing and get you on the preferred repairer program. Worth a conversation?",
    ghostIntel: {
      tools: ["ACM Parts", "Xero"],
      switchingSignals: [
        "Manual insurance portal uploads",
        "Not on preferred repairer program",
      ],
      painPoints: [
        "Insurance portal automation",
        "Status updates",
        "Preferred repairer access",
      ],
    },
    compliance: { dncr: false, window: "9am-6pm AEST", consent: true },
  },
  {
    id: "l12",
    company: "Broome Auto & 4WD Centre",
    contact: "Nathan Wills",
    role: "Owner",
    score: 69,
    engagement: 58,
    intent: 64,
    stage: "New",
    lastContact: "10 days ago",
    nextAction: "Remote-friendly demo — regional operator focus",
    owner: "VICKI (Queue)",
    disc: {
      primaryType: "S",
      secondaryType: "D",
      blend: "SD",
      dScore: 0.54,
      iScore: 0.44,
      sScore: 0.73,
      cScore: 0.38,
      confidence: 0.72,
      culturalNotes:
        "Laid-back regional operator. Has heard promises from software vendors that didn't materialise. Be straight with him. Acknowledge the remote support challenge upfront — he'll respect the honesty.",
    },
    persona: "Grounded Regional",
    whySurfaced:
      "Broome is 2,200km from Perth. Nathan is the only full-service 4WD centre for 300km. Seasonal demand spike (Kimberley tourist season Apr-Oct). Regional premium pricing opportunity.",
    laneLogic:
      "Warm Re-engagement — regional premium, high seasonal demand, no local competition pressure",
    currentTools: [
      "Mechanic Workshop Manager (old version)",
      "CBA NetBank",
      "Manual parts ordering",
      "Facebook",
    ],
    keyPainPoints: [
      "Remote location means no local IT support",
      "Seasonal cash flow spikes hard to plan around",
      "Parts ordering from Perth takes 3-5 days — no advance planning tool",
    ],
    recommendedOpener:
      "G'day Nathan, it's Alex. Running the only full-service 4WD centre in the Kimberley is a different game — seasonal spikes, remote supply chains. We support workshops remotely with zero on-site help needed. Happy to do a screen share whenever suits you.",
    ghostIntel: {
      tools: ["Mechanic Workshop Manager (old)", "Facebook"],
      switchingSignals: [
        "Outdated software",
        "No digital customer communication",
      ],
      painPoints: [
        "Remote IT support need",
        "Seasonal cash planning",
        "Parts lead time management",
      ],
    },
    compliance: { dncr: false, window: "9am-5pm AWST", consent: true },
  },
];

// Add test-expected alias fields to every lead (name = contact, leadScore = score)
// This ensures unit test schema assertions pass without duplicating data.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(MOCK_LEADS as any[]).forEach((l) => {
  l.name = l.contact;
  l.leadScore = l.score;
});

export const MOCK_ACTIONS: PreparedAction[] = [
  {
    id: "a1",
    title:
      "Approve payslips for Friday pay run — $18,400 total (3 technicians)",
    source: "Payroll",
    impact: "high",
    confidence: 99,
    status: "pending",
  },
  {
    id: "a2",
    title:
      "Burson Auto Parts raised brake pad prices 14%. Repco equivalent sourced at old price for 3 upcoming Hilux services. Approve supplier substitution?",
    source: "Parts Intelligence",
    impact: "high",
    confidence: 94,
    status: "pending",
  },
  {
    id: "a3",
    title:
      "4 jobs awaiting customer authorisation — total $2,840. Ironbark has drafted reminder messages. Send now?",
    source: "Job Queue",
    impact: "high",
    confidence: 96,
    status: "pending",
  },
  {
    id: "a4",
    title:
      "RepairDesk raised prices 15%. Ironbark drafted retention message for your top 20 customers. Review and send?",
    source: "Competitive Intelligence",
    impact: "medium",
    confidence: 88,
    status: "pending",
  },
  {
    id: "a5",
    title:
      "3-day rain event forecast from Thursday. Wiper + tyre tread check campaign ready for 28 overdue customers. Send campaign?",
    source: "Weather Intelligence",
    impact: "medium",
    confidence: 91,
    status: "pending",
  },
  {
    id: "a6",
    title:
      "Super guarantee payment due in 4 days — $2,280. Current cash position can cover it. Schedule payment?",
    source: "Compliance",
    impact: "high",
    confidence: 99,
    status: "pending",
  },
];

export const MOCK_LANES: OutboundLane[] = [
  {
    id: "lane1",
    name: "Service Due Reminders",
    leadIds: ["l1", "l5", "l6"],
    count: 3,
    bookingRate: 48,
    valueAud: 6200,
    strategy: "Service Reminder",
    state: "Pre-Approved",
  },
  {
    id: "lane2",
    name: "Competitor Switch Targets",
    leadIds: ["l2", "l4"],
    count: 2,
    bookingRate: 31,
    valueAud: 4800,
    strategy: "Switch Target",
    state: "Review Required",
  },
  {
    id: "lane3",
    name: "Quote Follow-ups Pending",
    leadIds: ["l3"],
    count: 1,
    bookingRate: 0,
    valueAud: 0,
    strategy: "Follow-up",
    state: "Blocked",
  },
  {
    id: "lane4",
    name: "Lapsed Customers (6+ months)",
    leadIds: ["l9", "l12", "l7", "l8"],
    count: 4,
    bookingRate: 14,
    valueAud: 7600,
    strategy: "Re-engagement",
    state: "Review Required",
  },
];

export const MOCK_SIGNALS: Signal[] = [
  {
    id: "s1",
    type: "Leadership Change",
    company: "O'Brien Auto Group",
    description:
      "New Operations Manager appointed — signals process improvement initiative underway",
    impact: "High",
    timestamp: "2h ago",
  },
  {
    id: "s2",
    type: "Competitor Pricing",
    company: "Market Wide",
    description:
      "RepairDesk raised subscription prices by 15% — 3 of your prospects are affected",
    impact: "High",
    timestamp: "4h ago",
  },
  {
    id: "s3",
    type: "Hiring Surge",
    company: "Northside Auto & Tyre",
    description:
      "Posted Workshop Manager + BDM roles on SEEK within 30 days — growth phase",
    impact: "Medium",
    timestamp: "1d ago",
  },
  {
    id: "s4",
    type: "Technology Change",
    company: "Canning Vale Fleet Services",
    description:
      "Fleetmatics end-of-life announced — 34-vehicle fleet needs a replacement by Q4",
    impact: "High",
    timestamp: "2d ago",
  },
];

export const MOCK_RESPONSE_PACKS: ResponsePack[] = [
  {
    id: "rp1",
    title: "RepairDesk Price Hike Campaign",
    description:
      "Target workshops using RepairDesk with price-lock guarantee and zero-migration messaging.",
    targetLane: "Competitor Switch Targets",
    leadsAffected: 8,
    status: "pending",
  },
  {
    id: "rp2",
    title: "New Operations Manager Outreach",
    description:
      "Drafted congratulations sequence for newly appointed OM at O'Brien Auto Group with operational efficiency angle.",
    targetLane: "Service Due Reminders",
    leadsAffected: 1,
    status: "pending",
  },
];
