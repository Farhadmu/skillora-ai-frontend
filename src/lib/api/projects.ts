import { apiClient } from './client';

export const projectsApi = {
  getAllProjects: (category?: string, difficulty?: string) =>
    apiClient<any[]>(`/api/projects?category=${category || 'All'}&difficulty=${difficulty || 'All'}`),
  getRecommendations: (targetRole?: string) =>
    apiClient<any[]>(`/api/projects/recommendations${targetRole ? `?targetRole=${encodeURIComponent(targetRole)}` : ''}`),
  getProjectById: (id: string) => apiClient<any>(`/api/projects/${id}`),
  reviewCode: (data: { code: string; language: string; projectContext?: string }) =>
    apiClient<any>('/api/projects/review-code', { method: 'POST', body: JSON.stringify(data) }),
};
