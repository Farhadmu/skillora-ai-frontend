import { apiClient } from './client';

export const skillsApi = {
  getAllSkills: (category?: string, query?: string) =>
    apiClient<any[]>(`/api/skills?category=${category || 'All'}&query=${query || ''}`),
  getSkillGraph: (userId?: string) =>
    apiClient<any>(`/api/skills/graph${userId ? `?userId=${userId}` : ''}`),
  getSkillGaps: (targetRole?: string) =>
    apiClient<any>(`/api/skills/gaps${targetRole ? `?targetRole=${encodeURIComponent(targetRole)}` : ''}`),
};
