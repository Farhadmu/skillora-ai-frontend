import { apiClient } from './client';

export const adminApi = {
  getPlatformStats: () => apiClient<any>('/api/admin/stats'),
  listUsers: (role?: string) =>
    apiClient<any[]>(`/api/admin/users${role ? `?role=${role}` : ''}`),
  updateUserRole: (userId: string, role: string) =>
    apiClient<any>(`/api/admin/users/${userId}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    }),
  updateUserStatus: (userId: string, status: string) =>
    apiClient<any>(`/api/admin/users/${userId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  listAiProviders: () => apiClient<any[]>('/api/admin/ai-providers'),
  testAiProvider: (providerName: string) =>
    apiClient<any>('/api/admin/ai-providers/test', {
      method: 'POST',
      body: JSON.stringify({ providerName }),
    }),
};

