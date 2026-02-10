import type HttpFactory from '../factory'
import type {
    LoginRequest,
    LoginResponse,
    Admin,
    ApiResponse
} from '../types'

export default class AuthModule {
    private factory: HttpFactory

    constructor(factory: HttpFactory) {
        this.factory = factory
    }

    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data?.message || 'Login failed')
        }

        return data as LoginResponse
    }

    async logout(): Promise<ApiResponse<null>> {
        return this.factory.delete<ApiResponse<null>>('/admin/logout')
    }

    async getProfile(): Promise<ApiResponse<Admin>> {
        return this.factory.get<ApiResponse<Admin>>('/admin/me')
    }
}
