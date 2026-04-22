import { Lead, PreparedAction, OutboundLane, Signal, ResponsePack, LeadStage } from '../store';

const STAGES: LeadStage[] = ['New', 'Ready', 'Contacted', 'Qualified', 'Meeting Booked', 'Opportunity'];

export const MOCK_LEADS: Lead[] = Array.from({ length: 30 }).map((_, i) => ({
  id: `l${i + 1}`,
  company: ["Smith's Auto", "Apex Construction", "TechFlow Solutions", "Bayside Retail", "Oasis Logistics", "Pioneer Systems", "BlueSky Health", "Crimson Financial"][i % 8],
  contact: `Contact ${i + 1}`,
  role: ["Owner", "Director", "CTO", "CEO", "VP of Sales", "Head of Operations"][i % 6],
  score: Math.floor(Math.random() * 40) + 50,
  engagement: Math.floor(Math.random() * 50) + 40,
  intent: Math.floor(Math.random() * 60) + 30,
  stage: STAGES[i % STAGES.length],
  lastContact: `${Math.floor(Math.random() * 5) + 1} days ago`,
  nextAction: ['Follow up quote', 'Book Demo', 'Initial Outreach', 'Send Case Study'][i % 4],
  owner: ['VICKI (Auto)', 'Ironbark', 'Human'][i % 3],
  discPrimary: ['D', 'I', 'S', 'C'][i % 4],
  discSecondary: ['I', 'S', 'C', 'D'][i % 4],
  persona: ['Results-Driven', 'Visionary', 'Harmonious', 'Analytical'][i % 4],
  ghostIntel: { 
    tools: ['Xero', 'Salesforce', 'HubSpot', 'Mailchimp'].slice(0, (i % 2) + 1), 
    switchingSignals: i % 3 === 0 ? ['New CFO hired', 'Contract ending soon'] : [], 
    painPoints: ['Manual entry', 'Integration issues', 'Scalability', 'High costs'].slice(0, (i % 2) + 1) 
  },
  compliance: { 
    dncr: i % 10 === 0, 
    window: '9am-5pm', 
    consent: i % 10 !== 0 
  }
}));

export const MOCK_ACTIONS: PreparedAction[] = [
  { id: 'a1', title: 'Send follow-ups to 12 leads from yesterday’s calls', source: 'Outbound', impact: 'high', confidence: 94, status: 'pending' },
  { id: 'a2', title: 'Approve 3 quote responses drafted overnight', source: 'Inbox', impact: 'medium', confidence: 88, status: 'pending' },
  { id: 'a3', title: 'Execute switch-target lane (8 leads)', source: 'Strategy', impact: 'high', confidence: 91, status: 'pending' },
  { id: 'a4', title: 'Nurture sequence for 5 aging opportunities', source: 'CRM', impact: 'low', confidence: 75, status: 'pending' },
  { id: 'a5', title: 'Schedule sync with Oasis Logistics', source: 'Inbox', impact: 'medium', confidence: 85, status: 'pending' }
];

export const MOCK_LANES: OutboundLane[] = [
  { id: 'lane1', name: 'Hot Follow-Up', leadIds: ['l1', 'l2', 'l5'], count: 3, bookingRate: 45, valueAud: 120000, strategy: 'Post-Meeting', state: 'Pre-Approved' },
  { id: 'lane2', name: 'Competitor Switch Targets', leadIds: ['l4', 'l7'], count: 2, bookingRate: 20, valueAud: 55000, strategy: 'Switch Target', state: 'Review Required' },
  { id: 'lane3', name: 'Compliance Blocked', leadIds: ['l3'], count: 1, bookingRate: 0, valueAud: 0, strategy: 'Nurture', state: 'Blocked' },
  { id: 'lane4', name: 'Cold Resurrection', leadIds: ['l6', 'l8', 'l9', 'l10'], count: 4, bookingRate: 12, valueAud: 240000, strategy: 'Re-engagement', state: 'Review Required' }
];

export const MOCK_SIGNALS: Signal[] = [
  { id: 's1', type: 'Leadership Change', company: 'Apex Construction', description: 'New CFO Sarah Jenkins appointed', impact: 'High', timestamp: '2h ago' },
  { id: 's2', type: 'Competitor Pricing', company: 'Market Wide', description: 'Competitor X raised prices by 15%', impact: 'High', timestamp: '4h ago' },
  { id: 's3', type: 'Funding Round', company: 'TechFlow Solutions', description: 'Raised $5M Series A', impact: 'Medium', timestamp: '1d ago' },
  { id: 's4', type: 'Hiring Surge', company: 'Oasis Logistics', description: 'Opened 12 new supply chain roles', impact: 'Medium', timestamp: '2d ago' }
];

export const MOCK_RESPONSE_PACKS: ResponsePack[] = [
  { id: 'rp1', title: 'Competitor Price Hike Campaign', description: 'Target accounts using Competitor X with price-lock guarantee messaging.', targetLane: 'Competitor Switch Targets', leadsAffected: 14, status: 'pending' },
  { id: 'rp2', title: 'New Leadership Outreach', description: 'Drafted congratulations and intro sequence for newly appointed executives.', targetLane: 'Executive Buyers', leadsAffected: 3, status: 'pending' }
];
