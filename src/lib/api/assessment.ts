import { apiClient } from './client';

export const assessmentApi = {
  getAllAssessments: (category?: string, skill?: string) =>
    apiClient<any[]>(`/api/assessments?category=${category || 'All'}&skill=${skill || ''}`),
  getAssessmentById: (id: string) => apiClient<any>(`/api/assessments/${id}`),
  createAssessment: (data: any) =>
    apiClient<any>('/api/assessments', { method: 'POST', body: JSON.stringify(data) }),
  submitAssessment: (id: string, answers: Record<string, any>) =>
    apiClient<any>(`/api/assessments/${id}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    }),
};
