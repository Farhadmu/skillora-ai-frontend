export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface ApiErrorResponse {
  message: string;
  statusCode?: number;
  error?: string;
}

export class ApiError extends Error {
  public statusCode: number;
  public details?: any;

  constructor(message: string, statusCode = 500, details?: any) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('skillora_access_token');
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('skillora_refresh_token');
}

export function setAuthSession(tokens: { accessToken: string; refreshToken?: string }, user: any) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('skillora_access_token', tokens.accessToken);
  if (tokens.refreshToken) {
    localStorage.setItem('skillora_refresh_token', tokens.refreshToken);
  }
  localStorage.setItem('skillora_user', JSON.stringify(user));
}

export function clearAuthSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('skillora_access_token');
  localStorage.removeItem('skillora_refresh_token');
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

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
  allowRetry = true,
): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE}${endpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    // Handle token expiration & automatic refresh
    if (res.status === 401 && allowRetry && getRefreshToken()) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((newToken) => {
          headers['Authorization'] = `Bearer ${newToken}`;
          return apiClient<T>(endpoint, { ...options, headers }, false);
        });
      }

      isRefreshing = true;
      try {
        const refreshRes = await fetch(`${API_BASE}/api/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: getRefreshToken() }),
        });

        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          if (refreshData.tokens?.accessToken) {
            setAuthSession(refreshData.tokens, refreshData.user || getCurrentUser());
            processQueue(null, refreshData.tokens.accessToken);
            headers['Authorization'] = `Bearer ${refreshData.tokens.accessToken}`;
            return apiClient<T>(endpoint, { ...options, headers }, false);
          }
        }
        clearAuthSession();
        processQueue(new Error('Session expired'));
      } catch (refreshErr) {
        clearAuthSession();
        processQueue(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    if (!res.ok) {
      const errorBody: ApiErrorResponse = await res.json().catch(() => ({ message: res.statusText }));
      throw new ApiError(
        errorBody.message || `API request failed with status ${res.status}`,
        res.status,
        errorBody,
      );
    }

    return await res.json();
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error.message || 'Network error connecting to Skillora AI server', 503);
  }
}
