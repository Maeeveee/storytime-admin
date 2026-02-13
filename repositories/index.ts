import HttpFactory, { type FetchFunction } from './factory'
import AuthModule from './modules/auth'
import StoriesModule from './modules/stories'
import UsersModule from './modules/users'
import CategoriesModule from './modules/categories'
import DashboardModule from './modules/dashboard'

export * from './types'
export { ApiError } from './factory'

export function createApiClient(fetcher: FetchFunction, baseURL: string) {
    const fetchWithBase: FetchFunction = (url, init) => {
        const fullUrl = `${baseURL}${url}`
        return fetcher(fullUrl, init)
    }

    const factory = new HttpFactory(fetchWithBase)

    return {
        auth: new AuthModule(factory),
        stories: new StoriesModule(factory),
        users: new UsersModule(factory),
        categories: new CategoriesModule(factory),
        dashboard: new DashboardModule(factory)
    }
}

export type ApiClient = ReturnType<typeof createApiClient>
