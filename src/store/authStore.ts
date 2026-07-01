import { create } from 'zustand'
import { authAPI, usersAPI } from '@/lib/api'

interface User {
  id: string
  email: string
  username: string
  email_verified: boolean
  role: string
  status: string
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  fetchMe: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const res = await authAPI.login(email, password)
      localStorage.setItem('access_token', res.data.access_token)
      localStorage.setItem('refresh_token', res.data.refresh_token)
      const meRes = await usersAPI.getMe()
      set({ user: meRes.data, isAuthenticated: true, isLoading: false })
    } catch (err: any) {
      const msg = err.response?.data?.detail || 'Login failed'
      set({ error: msg, isLoading: false })
      throw err
    }
  },

  logout: async () => {
    const refresh_token = localStorage.getItem('refresh_token') || ''
    try { await authAPI.logout(refresh_token) } catch {}
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    set({ user: null, isAuthenticated: false })
  },

  fetchMe: async () => {
    const token = localStorage.getItem('access_token')
    if (!token) return
    try {
      const res = await usersAPI.getMe()
      set({ user: res.data, isAuthenticated: true })
    } catch {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }
  },

  clearError: () => set({ error: null }),
}))
