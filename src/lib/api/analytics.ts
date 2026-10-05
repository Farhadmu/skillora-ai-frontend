import { apiClient } from './client';

export const analyticsApi = {
  getLearnerAnalytics: () => apiClient<any>('/api/analytics/learner'),
  getEmployerFunnelAnalytics: () => apiClient<any>('/api/analytics/employer/funnel'),
};
