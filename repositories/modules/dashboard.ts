import type HttpFactory from '../factory'
import type {
    ApiResponse,
    DashboardSummary,
    DashboardOverview
} from '../types'

export default class DashboardModule {
    private factory: HttpFactory

    constructor(factory: HttpFactory) {
        this.factory = factory
    }

    async getSummary(): Promise<ApiResponse<DashboardSummary>> {
        return this.factory.get<ApiResponse<DashboardSummary>>('/admin/dashboard/summary')
    }

    async getOverview(): Promise<ApiResponse<DashboardOverview>> {
        return this.factory.get<ApiResponse<DashboardOverview>>('/admin/dashboard/overview')
    }
}
