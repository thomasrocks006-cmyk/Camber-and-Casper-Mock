export interface IndustryFeedItem {
  id: string;
  category:
    | "Parts Pricing"
    | "Compliance"
    | "Weather"
    | "Competitor"
    | "Regulation"
    | "Market";
  headline: string;
  detail: string;
  source: string;
  impact: "High" | "Medium" | "Low";
  timestamp: string;
  actionLabel?: string;
}

export const MOCK_INDUSTRY_FEED: IndustryFeedItem[] = [
  {
    id: "f1",
    category: "Parts Pricing",
    headline: "Burson Auto Parts: brake pad price increase effective Monday",
    detail:
      "EBC and Bendix brake pad lines up 14% from Monday 9 June. Repco equivalent lines available at current pricing. Ironbark has pre-sourced alternatives for 3 upcoming Hilux services.",
    source: "Burson Trade Portal",
    impact: "High",
    timestamp: "2h ago",
    actionLabel: "Approve Substitution",
  },
  {
    id: "f2",
    category: "Weather",
    headline:
      "3-day rain event forecast: Thu–Sat across Greater Sydney and Illawarra",
    detail:
      "BOM predicts 40–60mm rainfall Thu–Sat. Wiper and tyre tread check campaign ready for 28 customers last serviced >90 days ago. High booking conversion historically for weather triggers.",
    source: "Bureau of Meteorology",
    impact: "Medium",
    timestamp: "4h ago",
    actionLabel: "Launch Campaign",
  },
  {
    id: "f3",
    category: "Competitor",
    headline:
      "RepairDesk raised workshop subscription pricing 15% — effective July 1",
    detail:
      "RepairDesk sent price increase notices to customers yesterday. Several local workshops have already posted on Facebook service groups expressing frustration. Switching window open for next 6–8 weeks.",
    source: "Competitive Intelligence",
    impact: "High",
    timestamp: "6h ago",
    actionLabel: "View Retention Pack",
  },
  {
    id: "f4",
    category: "Regulation",
    headline: "VicRoads: updated roadworthy certificate checklist from 1 July",
    detail:
      "ADAS recalibration requirements added to the Victorian roadworthy standard from 1 July 2025. Applies to any vehicle with forward-facing cameras or lane-keep assist. Affects approximately 34% of your current vehicle register.",
    source: "VicRoads",
    impact: "Medium",
    timestamp: "1d ago",
    actionLabel: "Read Update",
  },
  {
    id: "f5",
    category: "Compliance",
    headline:
      "Super guarantee rate rises to 11.5% — check payroll configuration",
    detail:
      "SGC rate increases to 11.5% from 1 July 2025. Employment Hero and Xero both support automatic rate updates. Ironbark will flag if your payroll config is not updated before the June payroll filing deadline.",
    source: "ATO Super Bulletin",
    impact: "High",
    timestamp: "1d ago",
  },
  {
    id: "f6",
    category: "Market",
    headline:
      "Used ute prices stabilising: Hilux and Ranger enquiries up 18% this month",
    detail:
      "Cox Automotive data shows used ute enquiry volumes up 18% MoM nationally. Workshops with fleet service capability are reporting higher inbound from fleet operators reviewing maintenance contracts ahead of EOFY.",
    source: "Cox Automotive Monthly",
    impact: "Low",
    timestamp: "2d ago",
  },
];

export interface UnansweredCall {
  id: string;
  caller: string;
  company: string;
  time: string;
  callbackDraft: string;
}

export const MOCK_UNANSWERED_CALLS: UnansweredCall[] = [
  {
    id: "uc1",
    caller: "Brett Kowalski",
    company: "Northside Auto & Tyre",
    time: "10:14 AM",
    callbackDraft:
      "Hi Brett, it's Alex — sorry I missed your call this morning. Happy to jump on a quick call this arvo if that suits? Let me know.",
  },
  {
    id: "uc2",
    caller: "Unknown",
    company: "02 9876 5432",
    time: "11:02 AM",
    callbackDraft:
      "Hi, this is Alex from Camber & Casper following up on a missed call. Happy to chat — give me a bell when you're free.",
  },
  {
    id: "uc3",
    caller: "Sandra McHugh",
    company: "Mornington Mechanical",
    time: "2:37 PM",
    callbackDraft:
      "Hi Sandra, sorry I missed your call. I'll give you a ring tomorrow morning first thing — or feel free to text if easier.",
  },
];

export interface VehicleDue {
  id: string;
  rego: string;
  make: string;
  model: string;
  customer: string;
  jobType: string;
  readySince: string;
  status: "Ready for Pickup" | "Awaiting Parts" | "Quality Check";
}

export const MOCK_VEHICLES_DUE: VehicleDue[] = [
  {
    id: "v1",
    rego: "DEF-456",
    make: "Toyota",
    model: "HiLux",
    customer: "Craig Hutchinson",
    jobType: "Major Service + Brake Pads",
    readySince: "8:30 AM",
    status: "Ready for Pickup",
  },
  {
    id: "v2",
    rego: "GHJ-789",
    make: "Ford",
    model: "Ranger XLT",
    customer: "Andrew Blackwood",
    jobType: "Transmission Service",
    readySince: "11:00 AM",
    status: "Ready for Pickup",
  },
  {
    id: "v3",
    rego: "KLM-321",
    make: "Mitsubishi",
    model: "Outlander",
    customer: "Tanya Fletcher",
    jobType: "Air Con Regas + Cabin Filter",
    readySince: "Incoming",
    status: "Awaiting Parts",
  },
  {
    id: "v4",
    rego: "NOP-654",
    make: "Holden",
    model: "Colorado",
    customer: "Wayne Pemberton",
    jobType: "RWC Inspection",
    readySince: "2:00 PM",
    status: "Quality Check",
  },
];
