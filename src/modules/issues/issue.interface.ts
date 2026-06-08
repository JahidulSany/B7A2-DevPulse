export interface IIssue {
  title: string;
  description: string;
  type: 'bug' | 'feature_request';
  status?: 'open' | 'in_progress' | 'resolved';
}

export interface IQueryParams {
  sort: string;
  type: string;
  status: string;
}
