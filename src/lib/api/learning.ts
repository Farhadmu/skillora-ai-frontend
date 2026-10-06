import { apiClient } from './client';

export const learningApi = {
  chatWithTutor: (data: {
    message: string;
    subject: string;
    mode: string;
    bloomsLevel?: string;
    language?: 'en' | 'bn';
    useRag?: boolean;
  }) => apiClient<any>('/api/ai-teacher/chat', { method: 'POST', body: JSON.stringify(data) }),

  getTeacherHistory: () => apiClient<any[]>('/api/ai-teacher/history'),
  getFlashcards: (topic?: string) =>
    apiClient<any[]>(`/api/ai-teacher/flashcards${topic ? `?topic=${encodeURIComponent(topic)}` : ''}`),

  getRoadmap: () => apiClient<any>('/api/skillbridge/roadmap'),
  generateRoadmap: (
    targetRoleOrOptions: string | { targetRole?: string; durationDays?: number; timeframeWeeks?: number },
    durationDays = 30,
  ) => {
    const targetRole =
      typeof targetRoleOrOptions === 'string'
        ? targetRoleOrOptions
        : targetRoleOrOptions?.targetRole || 'Full-Stack Software Engineer';
    const days =
      typeof targetRoleOrOptions === 'object' && targetRoleOrOptions?.durationDays
        ? targetRoleOrOptions.durationDays
        : typeof targetRoleOrOptions === 'object' && targetRoleOrOptions?.timeframeWeeks
        ? targetRoleOrOptions.timeframeWeeks * 7
        : durationDays;
    return apiClient<any>('/api/skillbridge/roadmap/generate', {
      method: 'POST',
      body: JSON.stringify({ targetRole, durationDays: days }),
    });
  },
  toggleRoadmapTask: (milestoneIndex: number, taskIndex: number, completed: boolean) =>
    apiClient<any>('/api/skillbridge/roadmap/toggle', {
      method: 'PATCH',
      body: JSON.stringify({ milestoneIndex, taskIndex, completed }),
    }),
};
