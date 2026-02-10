import { create } from 'zustand'
import { Category } from '@/repositories'

interface CategoryState {
    categories: Category[]
    isLoading: boolean
    error: string | null
    totalCategories: number
    setCategories: (categories: Category[]) => void
    setTotalCategories: (totalCategories: number) => void
    setLoading: (isLoading: boolean) => void
    setError: (error: string | null) => void
}


export const useCategoryStore = create<CategoryState>((set, get) => ({
    categories: [],
    isLoading: false,
    error: null,
    totalCategories: 0,

    setCategories: (categories) => set({categories}),
    setTotalCategories: (totalCategories) => set({totalCategories}),
    setLoading: (isLoading) => set({isLoading}),
    setError:(error) => set({error})
}))