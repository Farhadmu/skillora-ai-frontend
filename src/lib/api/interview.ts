import { apiClient } from './client';

export const interviewApi = {
  getReadinessScore: (targetRole?: string) =>
    apiClient<any>(`/api/workforce-ready/score${targetRole ? `?targetRole=${encodeURIComponent(targetRole)}` : ''}`),
  simulateMockInterview: (data: {
    targetRole: string;
    interviewType: string;
    userAnswer?: string;
    currentTurn?: number;
  }) => apiClient<any>('/api/workforce-ready/mock-interview', { method: 'POST', body: JSON.stringify(data) }),
};
