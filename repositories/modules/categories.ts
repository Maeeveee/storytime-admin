import type HttpFactory from '../factory'
import type {
    Category,
    CreateCategoryRequest,
    UpdateCategoryRequest,
    CategoryListParams,
    ApiResponse,
    PaginatedResponse
} from '../types'

export default class CategoriesModule {
    private factory: HttpFactory

    constructor(factory: HttpFactory) {
        this.factory = factory
    }

    async getList(params?: CategoryListParams): Promise<PaginatedResponse<Category>> {
        return this.factory.get<PaginatedResponse<Category>>('/admin/categories', params)
    }

    async getDetail(id: number): Promise<ApiResponse<Category>> {
        return this.factory.get<ApiResponse<Category>>(`/admin/categories/${id}`)
    }
    async create(data: CreateCategoryRequest): Promise<ApiResponse<Category>> {
        return this.factory.post<ApiResponse<Category>>('/admin/categories', data)
    }

    async update(id: number, data: UpdateCategoryRequest): Promise<ApiResponse<Category>> {
        return this.factory.patch<ApiResponse<Category>>(`/admin/categories/${id}`, data)
    }

    async delete(id: number): Promise<ApiResponse<null>> {
        return this.factory.delete<ApiResponse<null>>(`/admin/categories/${id}`)
    }
}
