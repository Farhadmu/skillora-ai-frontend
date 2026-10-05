import { apiClient } from './client';

export const careerApi = {
  getBenchmarkRoles: () => apiClient<any[]>('/api/career-navigator/roles'),
  compareRoles: (roleA: string, roleB: string) =>
    apiClient<any>(`/api/career-navigator/compare?roleA=${encodeURIComponent(roleA)}&roleB=${encodeURIComponent(roleB)}`),
  analyzeJobDescription: (jobDescription: string, targetRole?: string) =>
    apiClient<any>('/api/career-navigator/analyze-jd', {
      method: 'POST',
      body: JSON.stringify({ jobDescription, targetRole }),
    }),
};
