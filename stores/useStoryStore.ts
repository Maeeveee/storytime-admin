import {create} from 'zustand'
import { Story } from '@/repositories'

interface StoryState {
    stories: Story[]
    isLoading: boolean
    error: string | null
    totalStories: number

    setStories: (stories: Story[]) => void
    setTotalStories: (totalStories: number) => void
    setLoading: (isLoading: boolean) => void
    setError: (error: string | null) => void
}

export const useStoryStore = create<StoryState>((set, get) =>({
    stories: [],
    isLoading: false,
    error: null,
    totalStories: 0,

    setStories: (stories) => set({stories}),
    setTotalStories: (totalStories) => set({totalStories}),
    setLoading: (isLoading) => set({isLoading}),
    setError: (error) => set({error})
}))