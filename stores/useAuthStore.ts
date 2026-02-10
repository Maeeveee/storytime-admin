import { create } from 'zustand'
import { Admin, ApiClient, LoginRequest } from '@/repositories'

interface AuthState {
    admin: Admin | null
    token: string | null
    isLoading: boolean
    error: string | null

    setAdmin: (admin: Admin | null) => void
    setToken: (token: string | null) => void
    setLoading: (isLoading: boolean) => void
    setError: (error: string | null) => void

    login: (api: ApiClient, credentials: LoginRequest) => Promise<void>
    logout: (api: ApiClient) => Promise<void>
    checkAuth: (api: ApiClient) => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
    admin: null,
    token: null,
    isLoading: true, 
    error: null,

    setAdmin: (admin) => set({ admin }),
    setToken: (token) => set({ token }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),

    login: async (api, credentials) => {
        set({ isLoading: true, error: null })
        try {
            const response = await api.auth.login(credentials)
            const { user, token } = response.data
 
            if (typeof document !== 'undefined') {
                const expires = new Date()
                expires.setDate(expires.getDate() + 7)
                document.cookie = `token=${token}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`
            }

            set({ admin: user, token, isLoading: false })
            return Promise.resolve()
        } catch (error: any) {
            set({ error: error.message || 'Login failed', isLoading: false })
            return Promise.reject(error)
        }
    },

    logout: async (api) => {
        set({ isLoading: true })
        try {
            await api.auth.logout()
        } catch (error) {
            console.error('Logout error', error)
        } finally {
            if (typeof document !== 'undefined') {
                document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
            }
            set({ admin: null, token: null, error: null, isLoading: false })
        }
    },

    checkAuth: async (api) => {
        set({ isLoading: true })

         
        let token = null
        if (typeof document !== 'undefined') {
            token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] || null
        }

        if (!token) {
            set({ admin: null, token: null, isLoading: false })
            return
        }

        try {
            const response = await api.auth.getProfile()
            set({ admin: response.data, token, isLoading: false })
        } catch (error) {
            if (typeof document !== 'undefined') {
                document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
            }
            set({ admin: null, token: null, isLoading: false })
        }
    }
}))