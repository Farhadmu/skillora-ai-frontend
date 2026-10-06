import { apiClient, setAuthSession, clearAuthSession } from './client';

export const authApi = {
  login: async (data: { email: string; password: string }) => {
    const res = await apiClient<any>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (res.tokens && res.user) {
      setAuthSession(res.tokens, res.user);
    }
    return res;
  },

  register: async (data: any) => {
    const res = await apiClient<any>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (res.tokens && res.user) {
      setAuthSession(res.tokens, res.user);
    }
    return res;
  },

  verifyEmail: async (token: string) => {
    const res = await apiClient<any>('/api/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
    if (res.tokens && res.user) {
      setAuthSession(res.tokens, res.user);
    }
    return res;
  },

  resendVerification: (email: string) =>
    apiClient<any>('/api/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  forgotPassword: (email: string) =>
    apiClient<any>('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  resetPassword: (token: string, newPassword: string) =>
    apiClient<any>('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    }),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    apiClient<any>('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  logout: async () => {
    try {
      await apiClient<any>('/api/auth/logout', { method: 'POST' });
    } finally {
      clearAuthSession();
    }
  },

  logoutAll: async () => {
    try {
      await apiClient<any>('/api/auth/logout-all', { method: 'POST' });
    } finally {
      clearAuthSession();
    }
  },

  getMe: () => apiClient<any>('/api/auth/me'),
};

export async function switchWorkspaceRole(targetRole: 'LEARNER' | 'EDUCATOR' | 'EMPLOYER' | 'ADMIN') {
  const canonicalEmail = `${targetRole.toLowerCase()}@skillora.ai`;
  try {
    const res = await authApi.login({
      email: canonicalEmail,
      password: 'Password123!',
    });
    if (res.tokens && res.user) {
      setAuthSession(res.tokens, res.user);
    }
  } catch {
    // Deterministic fallback profile
    setAuthSession('', {
      id: `usr-${targetRole.toLowerCase()}-1`,
      name: `Active ${targetRole}`,
      role: targetRole,
      email: canonicalEmail,
    });
  }
  if (typeof window !== 'undefined') {
    window.location.href = `/${targetRole.toLowerCase()}/dashboard`;
  }
}

