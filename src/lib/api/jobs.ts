import { apiClient } from './client';

export const jobsApi = {
  getAllJobs: (params?: { mode?: string; exp?: string; query?: string }) => {
    const q = new URLSearchParams();
    if (params?.mode) q.set('mode', params.mode);
    if (params?.exp) q.set('exp', params.exp);
    if (params?.query) q.set('query', params.query);
    return apiClient<any[]>(`/api/marketplace/jobs?${q.toString()}`);
  },
  getJobById: (id: string) => apiClient<any>(`/api/marketplace/jobs/${id}`),
  applyToJob: (jobId: string, notes?: string) =>
    apiClient<any>(`/api/marketplace/jobs/${jobId}/apply`, {
      method: 'POST',
      body: JSON.stringify({ notes }),
    }),
  getMyApplications: () => apiClient<any[]>('/api/marketplace/applications/me'),
  aiExtractJobRequirements: (rawJobText: string) =>
    apiClient<any>('/api/marketplace/jobs/ai-extract', {
      method: 'POST',
      body: JSON.stringify({ rawJobText }),
    }),
};
