export interface WorkflowTask {
  id: string;
  category:
    | "Approval"
    | "Follow-up"
    | "Campaign"
    | "Billing"
    | "Compliance"
    | "Meeting"
    | "Automation";
  title: string;
  target: string;
  priority: "High" | "Medium" | "Low";
  trigger: string;
  confidence: number;
  policyBasis: string;
}

export const MOCK_WORKFLOWS: WorkflowTask[] = [
  {
    id: "w1",
    category: "Approval",
    title: "Approve payslips for Friday pay run — $18,400 total",
    target: "3 Technicians",
    priority: "High",
    trigger: "Payroll deadline in 2 days",
    confidence: 99,
    policyBasis: "Payroll: Scheduled Weekly Run",
  },
  {
    id: "w2",
    category: "Approval",
    title:
      "Approve supplier substitution — Repco brake pads for 3 Hilux services",
    target: "Parts Order",
    priority: "High",
    trigger: "Burson price increase detected (+14%)",
    confidence: 94,
    policyBasis: "Parts Intelligence: Cost Optimisation",
  },
  {
    id: "w3",
    category: "Approval",
    title:
      "Approve 4 customer authorisation reminders — total $2,840 in pending jobs",
    target: "4 Pending Jobs",
    priority: "High",
    trigger: "Jobs awaiting auth > 48 hours",
    confidence: 96,
    policyBasis: "Execution Policy: Review Each Lane",
  },
  {
    id: "w4",
    category: "Follow-up",
    title: "Send follow-up to Kylie Andreou re: Protractor migration quote",
    target: "Sunshine Coast Panel & Paint",
    priority: "High",
    trigger: "No response in 3 days post-quote",
    confidence: 88,
    policyBasis: "CRM: Post-Quote Follow-up",
  },
  {
    id: "w5",
    category: "Follow-up",
    title: "Re-engage Brett Kowalski — 6-week lapsed Workshop Software account",
    target: "Northside Auto & Tyre",
    priority: "Medium",
    trigger: "Switching signal: WSW subscription lapsed",
    confidence: 82,
    policyBasis: "Outbound: Warm Re-engagement",
  },
  {
    id: "w6",
    category: "Campaign",
    title: "Send RepairDesk price increase campaign to 8 switch-target leads",
    target: "8 Leads",
    priority: "High",
    trigger: "RepairDesk price hike confirmed +15%",
    confidence: 91,
    policyBasis: "Competitive Intelligence: Response Pack Active",
  },
  {
    id: "w7",
    category: "Campaign",
    title: "Launch winter tyre + wiper check campaign — 28 overdue customers",
    target: "28 Customers",
    priority: "Medium",
    trigger: "3-day rain forecast from Thursday",
    confidence: 89,
    policyBasis: "Weather Intelligence: Seasonal Campaigns",
  },
  {
    id: "w8",
    category: "Billing",
    title: "Schedule super guarantee payment — $2,280 due in 4 days",
    target: "ATO Superannuation",
    priority: "High",
    trigger: "Super deadline approaching",
    confidence: 99,
    policyBasis: "Compliance: Super Guarantee (SGA)",
  },
  {
    id: "w9",
    category: "Billing",
    title: "Send overdue invoice reminders — $18,400 across 6 accounts",
    target: "6 Accounts",
    priority: "Medium",
    trigger: "Invoices > 30 days overdue",
    confidence: 93,
    policyBasis: "Finance: Standard Recovery",
  },
  {
    id: "w10",
    category: "Compliance",
    title: "Review flagged consent record — DNCR mismatch detected",
    target: "O'Brien Auto Group",
    priority: "High",
    trigger: "DNCR registry mismatch",
    confidence: 100,
    policyBasis: "Compliance Shield: Zero Tolerance",
  },
  {
    id: "w11",
    category: "Meeting",
    title: "Prepare demo brief for Maria Esposito — Thursday 2pm",
    target: "Parramatta Panel & Paint",
    priority: "High",
    trigger: "Demo booked for Thursday 2pm AEST",
    confidence: 100,
    policyBasis: "CRM: Meeting Prep — auto-briefing",
  },
  {
    id: "w12",
    category: "Automation",
    title: "Service reminder automation — 47 vehicles due next 14 days",
    target: "47 Customers",
    priority: "Medium",
    trigger: "Service due date scan: daily 6am",
    confidence: 97,
    policyBasis: "Automation: Service Reminder Sequence",
  },
];
