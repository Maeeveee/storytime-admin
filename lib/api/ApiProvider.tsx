'use client'

import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { createApiClient, type ApiClient } from '@/repositories'

const ApiContext = createContext<ApiClient | null>(null)

interface ApiProviderProps {
    children: ReactNode
    baseURL?: string
}

function getCookie(name: string): string | null {
    if (typeof window === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
        const cookieValue = parts.pop()?.split(';').shift()
        return cookieValue ? decodeURIComponent(cookieValue) : null
    }
    return null
}
export function ApiProvider({
    children,
    baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || ''
}: ApiProviderProps) {
    const apiClient = useMemo(() => {
        const customFetch: typeof fetch = async (input, init = {}) => {
            const headers = new Headers(init.headers)
            headers.set('Accept', 'application/json')
            headers.set('Content-Type', 'application/json')

            const authToken = getCookie('token')
            if (authToken) {
                headers.set('Authorization', `Bearer ${authToken}`)
            }

            return fetch(input, { ...init, headers })
        }

        return createApiClient(customFetch, baseURL)
    }, [baseURL])

    return (
        <ApiContext.Provider value={apiClient}>
            {children}
        </ApiContext.Provider>
    )
}

export function useApi(): ApiClient {
    const context = useContext(ApiContext)
    if (!context) {
        throw new Error('useApi must be used within an ApiProvider')
    }
    return context
}
