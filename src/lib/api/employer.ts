import { apiClient } from './client';

export const employerApi = {
  getCandidatePipeline: () => apiClient<any[]>('/api/marketplace/employer/candidates'),
  updateApplicationStage: (applicationId: string, stage: string, notes?: string) =>
    apiClient<any>(`/api/marketplace/applications/${applicationId}/stage`, {
      method: 'PATCH',
      body: JSON.stringify({ stage, notes }),
    }),
  createJob: (jobData: any) =>
    apiClient<any>('/api/marketplace/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    }),
  generateCandidateInterviewQuestions: (candidateId: string, targetRole?: string) =>
    apiClient<any>(`/api/marketplace/candidates/${candidateId}/interview-questions`, {
      method: 'POST',
      body: JSON.stringify({ targetRole }),
    }),
};
