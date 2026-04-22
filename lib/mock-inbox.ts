export interface Thread {
  id: string;
  type: 'Email' | 'Message' | 'Call' | 'Meeting';
  sender: string;
  company: string;
  subject: string;
  preview: string;
  time: string;
  status: 'unread' | 'read' | 'drafted';
  commitments: string[];
  draft?: string;
  rationale?: string;
}

export const MOCK_INBOX_THREADS: Thread[] = [
  {
    id: 't1',
    type: 'Email',
    sender: 'Sarah Jenkins',
    company: 'Apex Construction',
    subject: 'Re: Technical Validation Next Steps',
    preview: 'Thanks for the overview. We need to see the SOC2 report and get a sense of API rate limits before moving to procurement.',
    time: '12m ago',
    status: 'unread',
    commitments: ['Provide SOC2 report', 'Clarify API rate limits'],
    draft: 'Hi Sarah,\n\nAttached is our latest SOC2 Type II report. Regarding API rate limits, standard tier includes 1000 req/min, which typically covers your stated volume of 450 req/min comfortably.\n\nLet me know if procurement needs anything else.\n\nBest,',
    rationale: 'Identified compliance blocker and specific technical query. Drafted response addressing both directly with prepared collateral.'
  },
  {
    id: 't2',
    type: 'Call',
    sender: 'Marcus Smith',
    company: 'Smith\'s Auto',
    subject: 'Discovery Call Transcript',
    preview: '...yeah look, if it can integrate with our existing ERP by end of month, we can sign off. Otherwise we push to Q4.',
    time: '2h ago',
    status: 'read',
    commitments: ['Confirm ERP integration timeline by EOQ'],
    rationale: 'Extracted hard timeline constraint from call transcript. Queued technical review task.'
  }
];
