export interface RecordItem {
  id: string;
  type: "Company" | "Customer" | "Vendor" | "Asset";
  name: string;
  status: string;
  owner: string;
  lastUpdated: string;
  health: "Healthy" | "Warning" | "Critical";
  summary: string;
  recentActivity?: { label: string; detail: string; timestamp: string }[];
  recommendedAction?: string;
  risk?: string;
}

export const MOCK_RECORDS: RecordItem[] = [
  {
    id: "r1",
    type: "Company",
    name: "Northside Auto & Tyre",
    status: "Ready",
    owner: "Ironbark",
    lastUpdated: "2h ago",
    health: "Healthy",
    summary:
      "High-intent prospect in active pipeline. Workshop Software subscription lapsed 6 weeks ago. Owner Brett Kowalski is a D-type — move fast, lead with ROI. Discovery call confirmed for Friday.",
    recentActivity: [
      {
        label: "Discovery call scheduled",
        detail: "Brett confirmed Friday 2pm via email — calendar invite sent.",
        timestamp: "14m ago",
      },
      {
        label: "Ghost Intel updated",
        detail: "Workshop Software lapse confirmed via domain intelligence.",
        timestamp: "2h ago",
      },
    ],
    recommendedAction:
      "Prepare 10-min ROI-focused demo. Anchor on job auth reminders — Brett confirmed this as his top pain.",
    risk: "RepairDesk may contact Brett before Friday. Accelerate if possible.",
  },
  {
    id: "r2",
    type: "Customer",
    name: "Bayside Automotive Repairs",
    status: "Active",
    owner: "Ironbark",
    lastUpdated: "1d ago",
    health: "Healthy",
    summary:
      "Existing Camber & Casper customer — 7 months onboarded. Raj Patel is an S-type operator focused on steady growth. 96% STP filing compliance. Expansion opportunity: second technician hire confirmed by Raj in last call.",
    recentActivity: [
      {
        label: "Demo meeting completed",
        detail:
          "Raj confirmed interest in expanding to vehicle health reports module.",
        timestamp: "1d ago",
      },
      {
        label: "Payroll filed",
        detail: "STP filed via Employment Hero. Xero reconciliation clean.",
        timestamp: "3d ago",
      },
    ],
    recommendedAction:
      "Upsell to Vehicle Health Reports module. Estimated ARR uplift: $1,800.",
  },
  {
    id: "r3",
    type: "Vendor",
    name: "Burson Auto Parts",
    status: "Active",
    owner: "Procurement",
    lastUpdated: "2h ago",
    health: "Warning",
    summary:
      "Primary parts supplier. Brake pad line increased 14% effective Monday. Repco equivalent lines sourced at previous pricing for 3 upcoming Hilux services. Approve supplier substitution to lock in savings.",
    recentActivity: [
      {
        label: "Price increase notification received",
        detail: "EBC and Bendix brake pad lines up 14% from Monday 9 June.",
        timestamp: "2h ago",
      },
      {
        label: "Repco alternative sourced",
        detail:
          "Equivalent Repco lines confirmed at pre-hike pricing for 3 Hilux orders.",
        timestamp: "1h ago",
      },
    ],
    recommendedAction:
      "Approve Repco substitution for pending Hilux services to avoid 14% cost increase.",
    risk: "If substitution not approved before Friday, 3 jobs will incur the higher price.",
  },
  {
    id: "r4",
    type: "Vendor",
    name: "Xero",
    status: "Active",
    owner: "Finance",
    lastUpdated: "3d ago",
    health: "Healthy",
    summary:
      "Primary accounting platform. Xero sync is healthy — last reconciliation completed 3 days ago with no variances. BAS lodgement on track for end of quarter.",
    recentActivity: [
      {
        label: "Monthly reconciliation",
        detail:
          "Bank feed reconciled. Zero outstanding unmatched transactions.",
        timestamp: "3d ago",
      },
    ],
    recommendedAction:
      "Review quarterly BAS position before EOFY. Silicon CFO suggests provisioning $4,200 for Q4 BAS.",
  },
  {
    id: "r5",
    type: "Asset",
    name: "Workshop Bay 3 — Lift Equipment",
    status: "Active",
    owner: "Workshop",
    lastUpdated: "1w ago",
    health: "Warning",
    summary:
      "Bay 3 lift equipment is due for annual safety inspection by July 15. Last serviced 11 months ago. If not booked within 2 weeks, bay will need to be taken offline pending certification.",
    recentActivity: [
      {
        label: "Inspection reminder",
        detail: "Ironbark flagged upcoming inspection deadline.",
        timestamp: "1w ago",
      },
    ],
    recommendedAction:
      "Book safety inspection with certified lift technician before July 1 to avoid bay downtime.",
    risk: "Bay 3 offline would reduce capacity by 25% during peak EOFY service period.",
  },
  {
    id: "r6",
    type: "Company",
    name: "Canning Vale Fleet Services",
    status: "Qualified",
    owner: "Ironbark",
    lastUpdated: "2d ago",
    health: "Healthy",
    summary:
      "High-value fleet prospect with 34 vehicles. Fleetmatics end-of-life announced — replacement needed by Q4. Andrew Blackwood is a C-type — heavy detail orientation. Provide spec comparisons and compliance documentation.",
    recentActivity: [
      {
        label: "Fleet management gap confirmed",
        detail: "Fleetmatics end-of-life announcement shared with Andrew.",
        timestamp: "2d ago",
      },
    ],
    recommendedAction:
      "Prepare fleet-specific compliance brief and ROI calculator. Estimated ARR: $18k.",
  },
];
