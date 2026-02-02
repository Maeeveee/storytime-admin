import type HttpFactory from '../factory'
import type {
    Story,
    CreateStoryRequest,
    UpdateStoryRequest,
    StoryListParams,
    ApiResponse,
    PaginatedResponse
} from '../types'

export default class StoriesModule {
    private factory: HttpFactory

    constructor(factory: HttpFactory) {
        this.factory = factory
    }

    async getList(params?: StoryListParams): Promise<PaginatedResponse<Story>> {
        return this.factory.get<PaginatedResponse<Story>>('/admin/stories', params)
    }
    async getDetail(id: number): Promise<ApiResponse<Story>> {
        return this.factory.get<ApiResponse<Story>>(`/admin/stories/${id}`)
    }

    async create(data: CreateStoryRequest): Promise<ApiResponse<Story>> {
        return this.factory.post<ApiResponse<Story>>('/admin/stories', data)
    }

    async update(id: number, data: UpdateStoryRequest): Promise<ApiResponse<Story>> {
        return this.factory.patch<ApiResponse<Story>>(`/admin/stories/${id}`, data)
    }

    async updateCover(id: number, formData: FormData): Promise<ApiResponse<Story>> {
        return this.factory.post<ApiResponse<Story>>(`/admin/stories/${id}/cover`, formData as unknown as Record<string, unknown>)
    }

    async delete(id: number): Promise<ApiResponse<null>> {
        return this.factory.delete<ApiResponse<null>>(`/admin/stories/${id}`)
    }
}
