import {create} from 'zustand'
import {Admin} from '@/repositories'

interface AuthState {
    admin: Admin | null
    token: string | null
    isLoading: boolean
    error: string | null

    setAdmin: (admin: Admin | null) => void
    setToken: (token: string | null) => void
    setLoading: (isLoading: boolean) => void
    setError: (error: string | null) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
    admin: null,
    token: null,
    isLoading: false,
    error: null,

    setAdmin: (admin) => set ({admin}),
    setToken: (token) => set({token}),
    setLoading: (isLoading) => set ({isLoading}),
    setError: (error) => set({error}),
    logout: () => set ({admin: null, token: null, error: null}),
}))