import { create } from 'zustand'
import { DashboardSummary, MonthlyStoryCount } from '@/repositories'

interface DashboardState {
    summary: DashboardSummary | null
    storiesPerMonth: MonthlyStoryCount[]
    isLoading: boolean
    error: string | null
    setSummary: (summary: DashboardSummary) => void
    setStoriesPerMonth: (storiesPerMonth: MonthlyStoryCount[]) => void
    setLoading: (isLoading: boolean) => void
    setError: (error: string | null) => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
    summary: null,
    storiesPerMonth: [],
    isLoading: false,
    error: null,

    setSummary: (summary) => set({ summary }),
    setStoriesPerMonth: (storiesPerMonth) => set({ storiesPerMonth }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error })
}))
