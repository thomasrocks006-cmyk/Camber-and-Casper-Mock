export interface Pattern {
  id: string;
  title: string;
  confidence: number;
  sampleSize: number;
  description: string;
  action: "Apply" | "Ignore" | "Monitor";
}

export const MOCK_PATTERNS: Pattern[] = [
  {
    id: "p1",
    title: "Quote approval rate 32% higher on Tuesday–Thursday",
    confidence: 91,
    sampleSize: 87,
    description:
      "Customers approve quotes 32% more often when submitted Tuesday–Thursday before 2pm. Monday and Friday submissions have the lowest approval rates. Recommendation: schedule quote delivery window accordingly.",
    action: "Apply",
  },
  {
    id: "p2",
    title: "Unanswered calls 4:30–5:30pm account for 41% of all missed calls",
    confidence: 88,
    sampleSize: 63,
    description:
      "Call drop-off peak is late afternoon when technicians are still in bay. A callback automation sequence would recover estimated 12–14 bookings per month. Current manual recovery rate: 22%.",
    action: "Apply",
  },
  {
    id: "p3",
    title: "RepairDesk price increase creating measurable switch intent",
    confidence: 86,
    sampleSize: 34,
    description:
      "RepairDesk raised prices 15% in April. Signal scan shows 8 workshops in your area posting publicly about rising software costs. Switch window typically 4–6 weeks post-renewal notice.",
    action: "Apply",
  },
];

export const MOCK_SENTIMENT_DATA = [
  { time: "08:00", quality: 82, sentiment: 71 },
  { time: "10:00", quality: 86, sentiment: 74 },
  { time: "12:00", quality: 84, sentiment: 68 },
  { time: "14:00", quality: 91, sentiment: 79 },
  { time: "16:00", quality: 88, sentiment: 72 },
  { time: "18:00", quality: 93, sentiment: 84 },
];

export const MOCK_OBJECTION_CLUSTERS = [
  {
    id: "o1",
    topic: "Already on Workshop Software / not looking to change",
    count: 42,
    trend: "-8%",
    rebuttal:
      "That's a fair point — and actually our strongest customer segment are people coming off Workshop Software. Can I show you one thing that changes the comparison in 3 minutes?",
  },
  {
    id: "o2",
    topic: "Too busy right now / not a good time",
    count: 31,
    trend: "+4%",
    rebuttal:
      "No worries at all. We're built for busy workshops — can I send you a 2-minute overview to look at when you get a chance? If it's not relevant I won't follow up.",
  },
  {
    id: "o3",
    topic: "Price / can't justify the cost",
    count: 24,
    trend: "-2%",
    rebuttal:
      "Fair. The rough rule is if we save you 3 hours a week across admin and chasing, that pays for itself. I can show you where those hours usually come from?",
  },
];

export interface VICKIDemoQA {
  id: string;
  question: string;
  thinkingSteps: string[];
  answer: string;
  persona: "Strategic" | "Operational" | "Financial";
}

export const MOCK_VICKI_QA: VICKIDemoQA[] = [
  {
    id: "q1",
    question: "Why is my parts cost up?",
    thinkingSteps: [
      "Scanning invoice history for last 90 days...",
      "Comparing to same period last year...",
      "Identifying top suppliers by cost change...",
      "Cross-referencing with market price feeds...",
    ],
    answer:
      "Your parts cost is up 23% over the past 90 days. The main driver is Burson Auto Parts — brake pads and rotors are up 14%, accounting for 61% of the increase. Repco has equivalent parts at 2022 pricing. I've prepared a supplier substitution recommendation for your 3 upcoming Hilux services. Want me to apply it?",
    persona: "Financial",
  },
  {
    id: "q2",
    question: "Which jobs are overdue?",
    thinkingSteps: [
      "Scanning open job cards...",
      "Checking promised completion dates...",
      "Identifying jobs past SLA...",
    ],
    answer:
      "4 jobs are past their promised completion date. The longest overdue is a 2018 Subaru Forester brake job — 3 days late, waiting on a backorder from Burson. I've identified an alternative part at Repco with same-day availability. The other 3 are waiting on customer authorisation — I've prepared follow-up messages ready to send.",
    persona: "Operational",
  },
  {
    id: "q3",
    question: "How much did I make last month?",
    thinkingSteps: [
      "Pulling Xero invoice data for last 30 days...",
      "Separating labour vs parts revenue...",
      "Calculating net after payables...",
    ],
    answer:
      "Last month you invoiced $76,000 — up 8% on the month before. Of that, $47,000 was labour (62%) and $23,500 was parts (31%). You collected $68,200 in cash — $7,800 in outstanding invoices, including $4,400 more than 30 days old that I'd recommend chasing today.",
    persona: "Financial",
  },
];
