const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('skillora_access_token');
}

export function setAuthSession(token: string, user: any) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('skillora_access_token', token);
  localStorage.setItem('skillora_user', JSON.stringify(user));
}

export function clearAuthSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('skillora_access_token');
  localStorage.removeItem('skillora_user');
}

export function getCurrentUser(): any {
  if (typeof window === 'undefined') return null;
  const userJson = localStorage.getItem('skillora_user');
  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || `API request failed with status ${res.status}`);
  }

  return res.json();
}

export const api = {
  // Auth
  login: (data: { email: string; password: string }) =>
    request<any>('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data: any) =>
    request<any>('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  getMe: () => request<any>('/api/auth/me'),

  // Profile & CV
  getMyProfile: () => request<any>('/api/profile/me'),
  updateMyProfile: (data: any) =>
    request<any>('/api/profile/me', { method: 'PATCH', body: JSON.stringify(data) }),
  parseCv: (cvText: string) =>
    request<any>('/api/profile/parse-cv', { method: 'POST', body: JSON.stringify({ cvText }) }),
  getPublicPortfolio: (idOrEmail: string) =>
    request<any>(`/api/profile/public/${encodeURIComponent(idOrEmail)}`),

  // Skills & Graph
  getAllSkills: (category?: string, query?: string) =>
    request<any[]>(`/api/skills?category=${category || 'All'}&query=${query || ''}`),
  getSkillGraph: (userId?: string) =>
    request<any>(`/api/skills/graph${userId ? `?userId=${userId}` : ''}`),
  getSkillGaps: (targetRole?: string) =>
    request<any>(`/api/skills/gaps${targetRole ? `?targetRole=${encodeURIComponent(targetRole)}` : ''}`),

  // AI Teacher
  chatWithTutor: (data: {
    message: string;
    subject: string;
    mode: string;
    bloomsLevel?: string;
    language?: 'en' | 'bn';
    useRag?: boolean;
  }) => request<any>('/api/ai-teacher/chat', { method: 'POST', body: JSON.stringify(data) }),
  getTutorHistory: (subject: string) =>
    request<any[]>(`/api/ai-teacher/history?subject=${encodeURIComponent(subject)}`),
  getFlashcards: (subject: string) =>
    request<any[]>(`/api/ai-teacher/flashcards?subject=${encodeURIComponent(subject)}`),

  // Assessments
  getAssessments: (category?: string) =>
    request<any[]>(`/api/assessments${category ? `?category=${encodeURIComponent(category)}` : ''}`),
  getAssessmentById: (id: string) => request<any>(`/api/assessments/${id}`),
  submitAssessment: (id: string, answers: Record<string, any>) =>
    request<any>(`/api/assessments/${id}/submit`, { method: 'POST', body: JSON.stringify({ answers }) }),

  // Career Navigator
  getCareerRoles: () => request<any[]>('/api/career-navigator/roles'),
  compareRoles: (roleA: string, roleB: string) =>
    request<any>(`/api/career-navigator/compare?roleA=${encodeURIComponent(roleA)}&roleB=${encodeURIComponent(roleB)}`),
  analyzeJobDescription: (jdText: string) =>
    request<any>('/api/career-navigator/analyze-jd', { method: 'POST', body: JSON.stringify({ jdText }) }),

  // SkillBridge & Roadmaps
  getActiveRoadmap: () => request<any>('/api/skillbridge/roadmap'),
  generateRoadmap: (targetRole: string, durationDays: number) =>
    request<any>('/api/skillbridge/roadmap/generate', {
      method: 'POST',
      body: JSON.stringify({ targetRole, durationDays }),
    }),
  toggleRoadmapMilestone: (roadmapId: string, milestoneIndex: number) =>
    request<any>('/api/skillbridge/roadmap/toggle', {
      method: 'PATCH',
      body: JSON.stringify({ roadmapId, milestoneIndex }),
    }),

  // Projects & Code Review
  getProjects: (category?: string, difficulty?: string) =>
    request<any[]>(`/api/projects?category=${category || 'All'}&difficulty=${difficulty || 'All'}`),
  getProjectRecommendations: () => request<any[]>('/api/projects/recommendations'),
  getProjectById: (id: string) => request<any>(`/api/projects/${id}`),
  reviewCode: (code: string, language: string, context?: string) =>
    request<any>('/api/projects/review-code', {
      method: 'POST',
      body: JSON.stringify({ code, language, context }),
    }),

  // Workforce Ready & Mock Interview
  getReadinessScore: () => request<any>('/api/workforce-ready/score'),
  conductMockInterview: (data: { mode: string; questionNumber: number; candidateAnswer?: string }) =>
    request<any>('/api/workforce-ready/mock-interview', { method: 'POST', body: JSON.stringify(data) }),

  // Talent Marketplace & Employer
  getJobs: (params?: { mode?: string; experienceLevel?: string; query?: string; userId?: string }) => {
    const q = new URLSearchParams();
    if (params?.mode) q.set('mode', params.mode);
    if (params?.experienceLevel) q.set('experienceLevel', params.experienceLevel);
    if (params?.query) q.set('query', params.query);
    if (params?.userId) q.set('userId', params.userId);
    return request<any[]>(`/api/marketplace/jobs?${q.toString()}`);
  },
  getJobById: (id: string) => request<any>(`/api/marketplace/jobs/${id}`),
  applyForJob: (jobId: string) =>
    request<any>(`/api/marketplace/jobs/${jobId}/apply`, { method: 'POST' }),
  getMyApplications: () => request<any[]>('/api/marketplace/applications/me'),
  getEmployerCandidates: () => request<any[]>('/api/marketplace/employer/candidates'),
  updateApplicationStage: (id: string, stage: string) =>
    request<any>(`/api/marketplace/applications/${id}/stage`, {
      method: 'PATCH',
      body: JSON.stringify({ stage }),
    }),

  // Educator & Admin & Analytics
  getCohortOverview: () => request<any>('/api/educator/cohort'),
  getAdminStats: () => request<any>('/api/admin/stats'),
  getAdminUsers: () => request<any[]>('/api/admin/users'),
  getLearnerAnalytics: () => request<any>('/api/analytics/learner'),
  getEmployerFunnel: () => request<any>('/api/analytics/employer/funnel'),

  // Global Search & Command Center
  globalSearch: (q: string) => request<any>(`/api/search?q=${encodeURIComponent(q)}`),
  askCommandCenter: (query: string, pageContext?: string) =>
    request<any>('/api/ai/command-center', {
      method: 'POST',
      body: JSON.stringify({ query, pageContext }),
    }),
};
