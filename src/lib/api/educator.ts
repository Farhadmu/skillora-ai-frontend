import { apiClient } from './client';

export const educatorApi = {
  getCohort: () => apiClient<any>('/api/educator/cohort'),
  generateQuiz: (topic: string, count = 5) =>
    apiClient<any>('/api/educator/generate-quiz', {
      method: 'POST',
      body: JSON.stringify({ topic, count }),
    }),
  getInterventions: (skillGaps: string[]) =>
    apiClient<any>('/api/educator/interventions', {
      method: 'POST',
      body: JSON.stringify({ skillGaps }),
    }),
  createCohort: (data: any) =>
    apiClient<any>('/api/educator/cohort', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
