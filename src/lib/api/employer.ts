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
  extractJobSkills: (description: string) =>
    apiClient<any>('/api/marketplace/jobs/ai-extract', {
      method: 'POST',
      body: JSON.stringify({ description }),
    }),

  // Talent Search & Candidate Discovery (Workflow 2)
  searchTalent: (params?: { query?: string; skill?: string; minReadiness?: number; targetRole?: string }) => {
    const q = new URLSearchParams();
    if (params?.query) q.append('query', params.query);
    if (params?.skill) q.append('skill', params.skill);
    if (params?.minReadiness) q.append('minReadiness', params.minReadiness.toString());
    if (params?.targetRole) q.append('targetRole', params.targetRole);
    const queryString = q.toString();
    return apiClient<any[]>(`/api/marketplace/talent/search${queryString ? `?${queryString}` : ''}`);
  },

  // Interview Management
  scheduleInterview: (data: {
    applicationId: string;
    scheduledAt: string;
    interviewType?: string;
    durationMinutes?: number;
    meetingLink?: string;
    instructions?: string;
  }) =>
    apiClient<any>('/api/marketplace/interviews/schedule', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getEmployerInterviews: () => apiClient<any[]>('/api/marketplace/interviews'),
  getLearnerInterviews: () => apiClient<any[]>('/api/marketplace/interviews/my'),
};
