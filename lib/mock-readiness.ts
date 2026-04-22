export const MOCK_READINESS = {
  score: 94,
  band: 'Pre-Approved Only',
  opVar: '$1.2M',
  riskCeiling: '$5.0M',
  shadowMode: 'Active'
};

export const MOCK_SCENARIOS = [
  { name: 'Baseline', stress: 'Normal', result: 'Pass' },
  { name: 'Fraud Pressure', stress: 'High', result: 'Pass with Interventions' },
  { name: 'Operator Strain', stress: 'Critical', result: 'Fail gracefully' },
  { name: 'Data Integrity Decay', stress: 'Medium', result: 'Pass' }
];

export const MOCK_ASSUMPTIONS = [
  { id: 'a1', statement: 'API Latency remains < 200ms', status: 'verified' },
  { id: 'a2', statement: 'Lead volume does not exceed 1000/day', status: 'inferred' },
  { id: 'a3', statement: 'Compliance regulations remain static', status: 'missing' }
];
