export interface RecordItem {
  id: string;
  type: 'Company' | 'Customer' | 'Vendor';
  name: string;
  status: string;
  owner: string;
  lastUpdated: string;
  health: 'Healthy' | 'Warning' | 'Critical';
  summary: string;
}

export const MOCK_RECORDS: RecordItem[] = [
  {
    id: 'r1',
    type: 'Company',
    name: 'Apex Construction',
    status: 'Qualified',
    owner: 'Ironbark',
    lastUpdated: '2m ago',
    health: 'Healthy',
    summary: 'High intent prospect currently in technical validation. Strong engagement across technical and business stakeholders.'
  },
  {
    id: 'r2',
    type: 'Customer',
    name: 'Smith\'s Auto',
    status: 'Active',
    owner: 'Sarah J.',
    lastUpdated: '1d ago',
    health: 'Warning',
    summary: 'Recent support tickets indicate friction with reporting module. Renewal risk flagged.'
  },
  {
    id: 'r3',
    type: 'Vendor',
    name: 'CloudScale Infrastructure',
    status: 'Active',
    owner: 'IT Ops',
    lastUpdated: '1w ago',
    health: 'Healthy',
    summary: 'Core infrastructure provider. SLA at 99.99% for current period.'
  }
];
