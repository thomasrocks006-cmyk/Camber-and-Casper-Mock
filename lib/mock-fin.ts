export const MOCK_REVENUE_PULSE = {
  today: 12450,
  week: 84200,
  month: 342500,
  split: { new: 45, expansion: 35, retention: 20 },
  acceleration: '+12%'
};

export const MOCK_PIPELINE_STAGES = [
  { stage: 'Discovery', value: 450000, count: 24, velocity: '14d' },
  { stage: 'Technical Validation', value: 320000, count: 12, velocity: '21d' },
  { stage: 'Business Case', value: 280000, count: 8, velocity: '12d' },
  { stage: 'Contract', value: 150000, count: 4, velocity: '8d' }
];

export const MOCK_FORECAST = {
  best: 420000,
  base: 380000,
  worst: 310000,
  confidence: 88,
  assumptions: [
    'Historical close rate of 34% maintained',
    'No major macro shifts in Q3',
    '3 large enterprise deals close by EOQ'
  ]
};

export const MOCK_CASH_FLOW = {
  overdue: 42500,
  inflows: 125000,
  outflows: 85000,
  dipForecast: 'None expected in next 30 days'
};

export const MOCK_ATTRIBUTION = [
  { name: 'Signal', value: 45 },
  { name: 'Psych', value: 25 },
  { name: 'Outbound', value: 20 },
  { name: 'Campaign', value: 10 }
];
