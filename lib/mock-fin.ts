export const MOCK_REVENUE_PULSE = {
  today: 4200,
  week: 18400,
  month: 76000,
  split: { labour: 62, parts: 31, other: 7 },
  acceleration: "+8%",
};

export const MOCK_PIPELINE_STAGES = [
  { stage: "New Enquiry", value: 18000, count: 12, velocity: "1d" },
  { stage: "Quote Sent", value: 14200, count: 8, velocity: "3d" },
  { stage: "Awaiting Authorisation", value: 9600, count: 6, velocity: "2d" },
  { stage: "Booked In", value: 7800, count: 5, velocity: "1d" },
];

export const MOCK_FORECAST = {
  best: 92000,
  base: 81000,
  worst: 68000,
  confidence: 84,
  assumptions: [
    "Bay utilisation maintains at current 78% average",
    "No unplanned technician absences in forecast period",
    "Burson parts supply stable after Q1 price adjustment",
  ],
};

export const MOCK_CASH_FLOW = {
  bankBalance: 42000,
  outstandingPayables: 8500,
  taxProvision: 4200,
  safetyBuffer: 6800,
  trulySpendable: 22500,
  overdue: 18400,
  inflows: 42000,
  outflows: 24300,
  dipForecast: "Payroll run expected Thursday — $18,400",
};

export const MOCK_SILICON_CFO = {
  bankBalance: 42000,
  outstandingPayables: 8500,
  superProvision: 2280,
  taxProvision: 4200,
  safetyBuffer: 6800,
  trulySpendable: 20220,
  hiringScenario: {
    question: "Can I afford to hire a second technician at $72,000 p.a.?",
    answer:
      "On current trajectory, yes — from month 3. Current truly spendable cash covers onboarding costs ($2,800) and the first 6 weeks of salary. Condition: maintain invoice collection rate above 78%. I recommend a 90-day review clause.",
    conditions: [
      "Invoice collection rate stays above 78%",
      "No unexpected parts price increases > 15%",
      "Super guarantee remains current (due in 4 days)",
    ],
    verdict: "Viable from week 10",
  },
};

export const MOCK_ATTRIBUTION = [
  { name: "Labour", value: 62 },
  { name: "Parts", value: 31 },
  { name: "Other", value: 7 },
];

export const MOCK_INVOICE_MATCH = {
  po: { qty: 20, unitPrice: 45.0, total: 900.0 },
  receipt: { qty: 20, unitPrice: 45.0, total: 900.0 },
  invoice: { qty: 22, unitPrice: 47.0, total: 1034.0 },
  variance: { qty: 2, unitPrice: 2.0, total: 134.0, pct: 14.9 },
  supplier: "Burson Auto Parts Pty Ltd",
  abn: "78 123 456 789",
  invoiceNumber: "BUR-2024-08821",
  benfordsAnomaly: true,
};
