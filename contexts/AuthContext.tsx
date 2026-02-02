'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useApi } from '@/lib/api/ApiProvider'
import type { Admin } from '@/repositories'
import { ApiError } from '@/repositories'

interface AuthContextType {
    user: Admin | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
    children: ReactNode
}

function setToken(token: string): void {
    const expires = new Date()
    expires.setDate(expires.getDate() + 7)
    document.cookie = `token=${token}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`
}

function removeToken(): void {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
}

function getToken(): string | null {
    if (typeof window === 'undefined') return null
    return document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] || null
}

export function AuthProvider({ children }: AuthProviderProps) {
    const router = useRouter()
    const api = useApi()
    const [user, setUser] = useState<Admin | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const refreshUser = useCallback(async () => {
        const token = getToken()
        if (!token) {
            setUser(null)
            setIsLoading(false)
            return
        }

        try {
            const response = await api.auth.getProfile()
            setUser(response.data)
        } catch (err) {
            if (err instanceof ApiError && err.isUnauthorized) {
                removeToken()
                setUser(null)
            }
        } finally {
            setIsLoading(false)
        }
    }, [api])

    useEffect(() => {
        refreshUser()
    }, [refreshUser])

    const login = useCallback(async (email: string, password: string) => {
        setIsLoading(true)
        try {
            const response = await api.auth.login({ email, password })
            setToken(response.data.token)
            setUser(response.data.user)
            router.push('/')
        } finally {
            setIsLoading(false)
        }
    }, [api, router])

    const logout = useCallback(async () => {
        setIsLoading(true)
        try {
            await api.auth.logout()
        } catch {
        } finally {
            removeToken()
            setUser(null)
            setIsLoading(false)
            router.push('/login')
        }
    }, [api, router])

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            isAuthenticated: !!user,
            login,
            logout,
            refreshUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
