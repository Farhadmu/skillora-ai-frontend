import { apiClient } from './client';

export const profileApi = {
  getMyProfile: () => apiClient<any>('/api/profile/me'),
  updateMyProfile: (data: any) =>
    apiClient<any>('/api/profile/me', { method: 'PATCH', body: JSON.stringify(data) }),
  parseCv: (cvText: string) =>
    apiClient<any>('/api/profile/parse-cv', { method: 'POST', body: JSON.stringify({ cvText }) }),
  getPublicPortfolio: (idOrEmail: string) =>
    apiClient<any>(`/api/profile/public/${encodeURIComponent(idOrEmail)}`),
};
