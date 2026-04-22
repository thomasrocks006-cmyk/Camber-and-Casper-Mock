export interface Pattern {
  id: string;
  title: string;
  confidence: number;
  sampleSize: number;
  description: string;
  action: 'Apply' | 'Ignore' | 'Monitor';
}

export const MOCK_PATTERNS: Pattern[] = [
  { id: 'p1', title: 'Accelerated conversion on technical ROI messaging', confidence: 94, sampleSize: 142, description: 'Leads with CTO/VP Engineering titles show a 32% increase in meeting booking when sequence shifts immediately to infrastructure cost vs standard feature list.', action: 'Apply' },
  { id: 'p2', title: 'Stalled pipeline due to compliance review phase', confidence: 88, sampleSize: 56, description: 'Mid-market deals are extending by 14 days on average when SOC2 documentation is requested late. Recommend front-loading compliance pack in initial pitch.', action: 'Monitor' },
  { id: 'p3', title: 'Competitor X pricing shift detected', confidence: 91, sampleSize: 28, description: 'Multiple ghosts detected evaluating Competitor X. Sentiment indicates frustration with new tiering. Recommend activating aggressive switch campaign.', action: 'Apply' }
];

export const MOCK_SENTIMENT_DATA = [
  { time: '08:00', quality: 85, sentiment: 70 },
  { time: '10:00', quality: 88, sentiment: 72 },
  { time: '12:00', quality: 86, sentiment: 68 },
  { time: '14:00', quality: 92, sentiment: 78 },
  { time: '16:00', quality: 90, sentiment: 75 },
  { time: '18:00', quality: 94, sentiment: 82 }
];

export const MOCK_OBJECTION_CLUSTERS = [
  { id: 'o1', topic: 'Implementation Time', count: 45, trend: '+12%' },
  { id: 'o2', topic: 'Existing Contract', count: 32, trend: '-5%' },
  { id: 'o3', topic: 'Budget Constraints', count: 28, trend: '+2%' },
];
