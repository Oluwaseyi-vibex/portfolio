export interface CaseStudy {
  id: string;
  title: string;
  period: string;
  stack: string[];
  problem: {
    context: string;
    constraint: string;
    failureMode: string;
  };
  decisions: Array<{
    what: string;
    rejected: string;
    reason: string;
  }>;
  outcome: {
    shipped: string;
    metric: string | null;
    retrospective: string;
  };
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
}
