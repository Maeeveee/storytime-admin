import { create } from 'zustand'
import { User } from '@/repositories'

interface UserState {
    users: User[]
    isLoading: boolean
    error: string | null
    totalUsers: number
    setUsers: (users: User[]) => void
    setTotalUser: (totalUsers: number) => void
    setLoading: (isLoading: boolean) => void
    setError: (error: string | null) => void
}

export const useUserStore = create<UserState>((set, get) => ({
    users: [],
    isLoading: false,
    error: null,
    totalUsers: 0,

    setUsers: (users) => set({ users }),
    setTotalUser: (totalUsers) => set({ totalUsers }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error })
}))