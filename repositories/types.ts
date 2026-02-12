// ============================================
// API Response Types (Laravel Format)
// ============================================

export interface ApiResponse<T> {
    data: T
    message?: string
}

export interface PaginatedResponse<T> {
    data: T[]
    meta: PaginationMeta
    links?: PaginationLinks
}

export interface PaginationMeta {
    pagination: {
        current_page: number
        from: number | null
        last_page: number
        per_page: number
        to: number | null
        total: number
    }
}

export interface PaginationLinks {
    first: string | null
    last: string | null
    prev: string | null
    next: string | null
}

// ============================================
// Auth Types
// ============================================

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponseData {
    user: Admin
    token: string
}

export interface LoginResponse {
    message: string
    data: LoginResponseData
    meta?: {
        timestamp: string
    }
}

export interface Admin {
    id: number
    name: string
    email: string
    created_at: string
    updated_at: string
}

// ============================================
// User Types
// ============================================

export interface User {
    id: number
    name: string
    email: string
    profile_image?: string
    created_at: string
    updated_at: string
}

export interface CreateUserRequest {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export interface UpdateUserRequest {
    name?: string
    email?: string
}

// ============================================
// Story Types
// ============================================

export interface Story {
    id: number
    title: string
    slug: string
    content?: string
    content_preview?: string
    cover_image?: string
    author: User
    category: Category
    status: 'draft' | 'published'
    created_at: string
    updated_at: string
}

export interface CreateStoryRequest {
    title: string
    content: string
    category_id: number
    user_id: number
    status?: 'draft' | 'published'
}

export interface UpdateStoryRequest {
    title?: string
    content?: string
    category_id?: number
    status?: 'draft' | 'published'
}

export interface StoryListParams {
    page?: number
    per_page?: number
    search?: string
    category_id?: number
    author_id?: number
    limit?: number
    status?: 'draft' | 'published'
    sort_by?: 'created_at' | 'title' | 'updated_at'
    sort_order?: 'asc' | 'desc'
}

// ============================================
// Category Types
// ============================================

export interface Category {
    id: number
    name: string
    slug: string
    description?: string
    created_at: string
    updated_at: string
}

export interface CreateCategoryRequest {
    name: string
    slug: string
}

export interface UpdateCategoryRequest {
    name?: string
    slug?: string
}

export interface CategoryListParams {
    page?: number
    per_page?: number
    search?: string
    limit?: number
}

// ============================================
// Common List Params
// ============================================

export interface UserListParams {
    page?: number
    per_page?: number
    search?: string
    limit?: number
    sort_by?: 'created_at' | 'name' | 'email'
    sort_order?: 'asc' | 'desc'
}
