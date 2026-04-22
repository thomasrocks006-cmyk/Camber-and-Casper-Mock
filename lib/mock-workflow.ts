export interface WorkflowTask {
  id: string;
  category: 'Approval' | 'Follow-up' | 'Campaign' | 'Billing' | 'Compliance';
  title: string;
  target: string;
  priority: 'High' | 'Medium' | 'Low';
  trigger: string;
  confidence: number;
  policyBasis: string;
}

export const MOCK_WORKFLOWS: WorkflowTask[] = [
  {
    id: 'w1',
    category: 'Approval',
    title: 'Approve draft follow-ups from yesterday\'s calls',
    target: '12 Leads',
    priority: 'High',
    trigger: 'Daily post-call sync',
    confidence: 96,
    policyBasis: 'Execution Policy: Review Each Lane'
  },
  {
    id: 'w2',
    category: 'Compliance',
    title: 'Review flagged consent record',
    target: 'TechFlow Solutions',
    priority: 'High',
    trigger: 'DNCR registry mismatch',
    confidence: 100,
    policyBasis: 'Compliance Shield: Zero Tolerance'
  },
  {
    id: 'w3',
    category: 'Billing',
    title: 'Process overdue dunning sequence',
    target: '3 Accounts',
    priority: 'Medium',
    trigger: 'Invoices > 14 days overdue',
    confidence: 92,
    policyBasis: 'Finance: Standard Recovery'
  }
];
