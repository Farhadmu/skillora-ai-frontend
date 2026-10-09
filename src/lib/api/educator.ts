import { apiClient } from './client';

export const educatorApi = {
  // Courses
  getCourses: () => apiClient<any[]>('/api/educator/courses'),
  createCourse: (data: any) =>
    apiClient<any>('/api/educator/courses', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateCourse: (id: string, data: any) =>
    apiClient<any>(`/api/educator/courses/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  getCourseCatalog: () => apiClient<any[]>('/api/educator/courses/catalog'),
  enrollInCourse: (id: string) =>
    apiClient<any>(`/api/educator/courses/${id}/enroll`, {
      method: 'POST',
    }),
  getMyEnrollments: () => apiClient<any[]>('/api/educator/my-enrollments'),

  // Cohorts
  getCohorts: () => apiClient<any[]>('/api/educator/cohorts'),
  getCohort: () => apiClient<any>('/api/educator/cohort'),
  createCohort: (data: any) =>
    apiClient<any>('/api/educator/cohort', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getCohortLearners: (cohortId: string) =>
    apiClient<any[]>(`/api/educator/cohorts/${cohortId}/learners`),

  // Assignments & Submissions (Workflow 1)
  getAssignments: (cohortId?: string) =>
    apiClient<any[]>(`/api/educator/assignments${cohortId ? `?cohortId=${cohortId}` : ''}`),
  createAssignment: (data: any) =>
    apiClient<any>('/api/educator/assignments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getMyAssignments: () => apiClient<any[]>('/api/educator/my-assignments'),
  submitAssignment: (assignmentId: string, data: any) =>
    apiClient<any>(`/api/educator/assignments/${assignmentId}/submit`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getSubmissions: (assignmentId: string) =>
    apiClient<any[]>(`/api/educator/assignments/${assignmentId}/submissions`),
  reviewSubmission: (submissionId: string, data: any) =>
    apiClient<any>(`/api/educator/submissions/${submissionId}/review`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Market Demand Alignment (Workflow 3)
  getMarketDemand: () => apiClient<any>('/api/educator/market-demand'),

  // AI Helpers
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
};
