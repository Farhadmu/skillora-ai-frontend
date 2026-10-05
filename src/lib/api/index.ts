import { authApi } from './auth';
import { profileApi } from './profile';
import { skillsApi } from './skills';
import { careerApi } from './career';
import { learningApi } from './learning';
import { assessmentApi } from './assessment';
import { projectsApi } from './projects';
import { interviewApi } from './interview';
import { jobsApi } from './jobs';
import { employerApi } from './employer';
import { educatorApi } from './educator';
import { adminApi } from './admin';
import { analyticsApi } from './analytics';
import { apiClient } from './client';

export * from './client';
export * from './auth';
export * from './profile';
export * from './skills';
export * from './career';
export * from './learning';
export * from './assessment';
export * from './projects';
export * from './interview';
export * from './jobs';
export * from './employer';
export * from './educator';
export * from './admin';
export * from './analytics';

export const api = {
  ...authApi,
  ...profileApi,
  ...skillsApi,
  ...careerApi,
  ...learningApi,
  ...assessmentApi,
  ...projectsApi,
  ...interviewApi,
  ...jobsApi,
  ...employerApi,
  ...educatorApi,
  ...adminApi,
  ...analyticsApi,

  // Legacy & Ergonomic Aliases
  getAdminStats: () => adminApi.getPlatformStats(),
  getAdminUsers: (role?: string) => adminApi.listUsers(role),
  testAiCascade: () => adminApi.testAiProvider('Gemini'),
  getCareerRoles: () => careerApi.getBenchmarkRoles(),
  getActiveRoadmap: () => learningApi.getRoadmap(),
  getJobs: (params?: { mode?: string; experienceLevel?: string; query?: string; userId?: string }) => {
    const q = new URLSearchParams();
    if (params?.mode) q.set('mode', params.mode);
    if (params?.experienceLevel) q.set('exp', params.experienceLevel);
    if (params?.query) q.set('query', params.query);
    return apiClient<any[]>(`/api/marketplace/jobs?${q.toString()}`);
  },
  applyForJob: (jobId: string, notes?: string) => jobsApi.applyToJob(jobId, notes),
  toggleRoadmapMilestone: (roadmapIdOrIndex: any, milestoneIndex?: number, completed?: boolean) => {
    const mIndex = typeof milestoneIndex === 'number' ? milestoneIndex : Number(roadmapIdOrIndex);
    const isCompleted = typeof completed === 'boolean' ? completed : true;
    return learningApi.toggleRoadmapTask(mIndex, 0, isCompleted);
  },
  getCohortOverview: () => educatorApi.getCohort(),
  analyzeJd: (jdText: string, targetRole?: string) => careerApi.analyzeJobDescription(jdText, targetRole),
  getEmployerCandidates: () => employerApi.getCandidatePipeline(),
  getEmployerFunnel: () => analyticsApi.getEmployerFunnelAnalytics(),
  conductMockInterview: (data: any) => {
    return interviewApi.simulateMockInterview({
      targetRole: data.targetRole || data.mode || 'Full-Stack Software Engineer',
      interviewType: data.interviewType || data.mode || 'Technical',
      userAnswer: data.candidateAnswer || data.userAnswer,
      currentTurn: data.questionNumber || data.currentTurn || 1,
    });
  },
  getProjectRecommendations: (targetRole?: string) => projectsApi.getRecommendations(targetRole),
  getProjects: (category?: string, difficulty?: string) => projectsApi.getAllProjects(category, difficulty),
  getAssessments: (category?: string, skill?: string) => assessmentApi.getAllAssessments(category, skill),
  getTutorHistory: () => learningApi.getTeacherHistory(),
  reviewCode: (codeOrData: any, language?: string, context?: string) => {
    if (typeof codeOrData === 'object' && codeOrData !== null && 'code' in codeOrData) {
      return projectsApi.reviewCode(codeOrData);
    }
    return projectsApi.reviewCode({
      code: String(codeOrData || ''),
      language: language || 'typescript',
      projectContext: context,
    });
  },
  globalSearch: (query: string) => apiClient<any>(`/api/search?q=${encodeURIComponent(query)}`),
  askCommandCenter: (queryOrData: any, pageContext?: string) => {
    const payload =
      typeof queryOrData === 'object'
        ? queryOrData
        : { query: queryOrData, pageContext };
    return apiClient<any>('/api/ai/command-center', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
