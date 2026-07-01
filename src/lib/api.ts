import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        const refreshToken = localStorage.getItem('refresh_token')
        if (refreshToken) {
          try {
            const res = await axios.post(`${API_URL}/auth/refresh`, { refresh_token: refreshToken })
            localStorage.setItem('access_token', res.data.access_token)
            localStorage.setItem('refresh_token', res.data.refresh_token)
            error.config.headers.Authorization = `Bearer ${res.data.access_token}` 
            return api(error.config)
          } catch {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            window.location.href = '/login'
          }
        } else {
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(error)
  }
)

export default api

// ─── Auth ───────────────────────────────────────────────
export const authAPI = {
  register: (email: string, username: string, password: string) =>
    api.post('/auth/register', { email, username, password }),

  verifyEmail: (email: string, otp_code: string) =>
    api.post('/auth/verify-email', { email, otp_code }),

  resendOTP: (email: string) =>
    api.post('/auth/resend-otp', { email }),

  login: (email: string, password: string) =>
    api.post<{ access_token: string; refresh_token: string; token_type: string }>(
      '/auth/login', { email, password }
    ),

  logout: (refresh_token: string) =>
    api.post('/auth/logout', { refresh_token }),
}

// ─── Users ──────────────────────────────────────────────
export const usersAPI = {
  getMe: () => api.get<{
    id: string; email: string; username: string
    email_verified: boolean; role: string; status: string
    created_at: string; updated_at: string
  }>('/users/me'),
}

// ─── OAuth ──────────────────────────────────────────────
export const oauthAPI = {
  getGoogleUrl: () => api.get<{ auth_url: string }>('/oauth/google/authorize'),
  getGithubUrl: () => api.get<{ auth_url: string }>('/oauth/github/authorize'),
}