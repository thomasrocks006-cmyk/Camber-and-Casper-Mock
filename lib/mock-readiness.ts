export const MOCK_READINESS = {
  score: 94,
  band: "Pre-Approved Only",
  opVar: "$8,200",
  riskCeiling: "$25,000",
  shadowMode: "Active",
};

export const MOCK_SCENARIOS = [
  {
    name: "Baseline",
    stress: "Normal",
    result: "Pass",
    summary:
      "All systems operating within normal parameters. 3 technicians on shift, parts inventory stable, cash above safety buffer.",
    failPoints: [],
    interventions: [],
  },
  {
    name: "Fraud Pressure",
    stress: "High",
    result: "Pass with Interventions",
    summary:
      "Unusual invoice pattern detected from Burson Auto Parts. 3 invoices submitted without corresponding purchase orders. Benford's Law anomaly flagged. Ironbark held for approval.",
    failPoints: ["Invoice variance >10% without PO match"],
    interventions: [
      "HOLD flag on 3 invoices",
      "Dual-verification triggered for manual review",
      "Finance alert sent to owner",
    ],
  },
  {
    name: "Operator Strain",
    stress: "Critical",
    result: "Fail gracefully",
    summary:
      "Two technicians absent simultaneously with 6 jobs booked. Bay utilisation exceeds safe capacity. Ironbark suspended autonomous job booking and queued rescheduling drafts for owner approval.",
    failPoints: ["Bay capacity exceeded", "Customer SLA breach risk on 2 jobs"],
    interventions: [
      "Autonomous booking paused",
      "Rescheduling drafts queued (owner approved required)",
      "Customer delay alerts prepared",
    ],
  },
  {
    name: "Data Integrity Decay",
    stress: "Medium",
    result: "Pass",
    summary:
      "Xero sync lagged by 14 hours due to API timeout. Ironbark flagged cash position as stale and held Silicon CFO recommendations until sync was restored.",
    failPoints: ["Xero sync gap: 14 hours (resolved)"],
    interventions: [
      "Stale data flag on cash position",
      "Ironbark paused financial recommendations during outage",
    ],
  },
  {
    name: "Cross-Entity Contagion",
    stress: "Medium",
    result: "Pass with Interventions",
    summary:
      "Duplicate customer records detected across CRM and Xero. Ironbark quarantined 4 invoice drafts pending deduplication. No data written to live accounts during resolution.",
    failPoints: ["4 duplicate customer records"],
    interventions: [
      "Invoice drafts quarantined",
      "Deduplication report prepared for review",
    ],
  },
  {
    name: "Audit Pressure",
    stress: "Normal",
    result: "Pass",
    summary:
      "BAS compliance audit simulation completed. All GST calculations correct. DNCR registry current. Employment Hero payroll records aligned with Ironbark payroll log.",
    failPoints: [],
    interventions: [],
  },
  {
    name: "Growth Scenario",
    stress: "High",
    result: "Pass with Interventions",
    summary:
      "Projected doubling of job volume (8 → 16 per day). System maintains accuracy but cash flow requires active monitoring. Parts ordering automation required to prevent stockouts.",
    failPoints: ["Parts inventory depletion risk at day 12"],
    interventions: [
      "Auto-order thresholds recommended",
      "Second technician hiring analysis prepared for review",
    ],
  },
  {
    name: "Model Upgrade Scenario",
    stress: "Normal",
    result: "Pass",
    summary:
      "Ironbark model version 4.2 shadow-tested against 30 days of historical decisions. 97% decision alignment with previous model. 3 cases improved. 0 regressions.",
    failPoints: [],
    interventions: [],
  },
];

export const MOCK_ASSUMPTIONS = [
  {
    id: "a1",
    statement: "Bay capacity stable at 8 simultaneous jobs",
    status: "verified",
  },
  {
    id: "a2",
    statement: "Technician count stable at 3 FTE",
    status: "verified",
  },
  {
    id: "a3",
    statement: "MVIS inspection certification current",
    status: "verified",
  },
  {
    id: "a4",
    statement: "Bookkeeping sync cadence: daily (Xero)",
    status: "inferred",
  },
  {
    id: "a5",
    statement: "Parts supply continuity — Burson Q3 pricing stable",
    status: "missing",
  },
];

export const MOCK_DEPLOYMENT_ENVELOPE = [
  {
    action: "Customer Messaging",
    autonomous: true,
    preApproved: false,
    reviewGated: false,
    blocked: false,
  },
  {
    action: "Job Authorisation Reminders",
    autonomous: false,
    preApproved: true,
    reviewGated: false,
    blocked: false,
  },
  {
    action: "Quote Generation",
    autonomous: false,
    preApproved: false,
    reviewGated: true,
    blocked: false,
  },
  {
    action: "Invoice Dispatch",
    autonomous: false,
    preApproved: true,
    reviewGated: false,
    blocked: false,
  },
  {
    action: "Supplier Ordering (>$500)",
    autonomous: false,
    preApproved: false,
    reviewGated: true,
    blocked: false,
  },
  {
    action: "Payroll Filing",
    autonomous: false,
    preApproved: false,
    reviewGated: false,
    blocked: true,
  },
];
