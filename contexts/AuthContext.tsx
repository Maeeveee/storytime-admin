'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useApi } from '@/lib/api/ApiProvider'
import type { Admin } from '@/repositories'
import { ApiError } from '@/repositories'
import { useAuthStore } from '@/stores/useAuthStore'

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

    const {
        admin,
        isLoading,
        login: storeLogin,
        logout: storeLogout,
        checkAuth
    } = useAuthStore()

    useEffect(() => {
        checkAuth(api)
    }, [api, checkAuth])

    const login = useCallback(async (email: string, password: string) => {
        await storeLogin(api, { email, password })
        router.push('/')
    }, [api, storeLogin, router])

    const logout = useCallback(async () => {
        await storeLogout(api)
        router.push('/login')
    }, [api, storeLogout, router])

    const refreshUser = useCallback(async () => {
        await checkAuth(api)
    }, [api, checkAuth])

    return (
        <AuthContext.Provider value={{
            user: admin,
            isLoading,
            isAuthenticated: !!admin,
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
