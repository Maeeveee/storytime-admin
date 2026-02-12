import type HttpFactory from '../factory'
import type {
    User,
    Story,
    CreateUserRequest,
    UpdateUserRequest,
    ResetPasswordRequest,
    UserListParams,
    ApiResponse,
    PaginatedResponse
} from '../types'

export default class UsersModule {
    private factory: HttpFactory

    constructor(factory: HttpFactory) {
        this.factory = factory
    }

    async getList(params?: UserListParams): Promise<PaginatedResponse<User>> {
        return this.factory.get<PaginatedResponse<User>>('/admin/users', params)
    }

    async getDetail(id: number): Promise<ApiResponse<User>> {
        return this.factory.get<ApiResponse<User>>(`/admin/users/${id}`)
    }

    async getUserStories(id: number, params?: { page?: number; per_page?: number }): Promise<PaginatedResponse<Story>> {
        return this.factory.get<PaginatedResponse<Story>>(`/admin/users/${id}/stories`, params)
    }

    async create(data: CreateUserRequest): Promise<ApiResponse<User>> {
        return this.factory.post<ApiResponse<User>>('/admin/users', data)
    }

    async update(id: number, data: UpdateUserRequest): Promise<ApiResponse<User>> {
        return this.factory.patch<ApiResponse<User>>(`/admin/users/${id}`, data)
    }

    async updateProfileImage(id: number, formData: FormData): Promise<ApiResponse<User>> {
        return this.factory.post<ApiResponse<User>>(`/admin/users/${id}/profile-image`, formData as unknown as Record<string, unknown>)
    }

    async resetPassword(id: number, data: ResetPasswordRequest): Promise<ApiResponse<null>> {
        return this.factory.post<ApiResponse<null>>(`/admin/users/${id}/reset-password`, data)
    }

    async delete(id: number): Promise<ApiResponse<null>> {
        return this.factory.delete<ApiResponse<null>>(`/admin/users/${id}`)
    }
}
