/* eslint-disable @typescript-eslint/no-explicit-any */

export class ApiError extends Error {
    statusCode: number
    data: any

    constructor(message: string, statusCode: number, data?: any) {
        super(message)
        this.name = 'ApiError'
        this.statusCode = statusCode
        this.data = data
    }

    get isUnauthorized() {
        return this.statusCode === 401
    }

    get isNotFound() {
        return this.statusCode === 404
    }

    get isValidationError() {
        return this.statusCode === 422
    }

    get isServerError() {
        return this.statusCode >= 500
    }
}

export type FetchFunction = (url: string, init?: RequestInit) => Promise<Response>

export default class HttpFactory {
    private fetcher: FetchFunction

    constructor(fetcher: FetchFunction) {
        this.fetcher = fetcher
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        const data = await response.json().catch(() => null)

        if (!response.ok) {
            const message = data?.message || response.statusText || 'Request failed'
            throw new ApiError(message, response.status, data)
        }

        return data as T
    }

    private buildUrl(url: string, params?: Record<string, any>): string {
        if (!params) return url

        const searchParams = new URLSearchParams()
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                searchParams.append(key, String(value))
            }
        })

        const queryString = searchParams.toString()
        return queryString ? `${url}?${queryString}` : url
    }

    async get<T>(url: string, params?: Record<string, any>): Promise<T> {
        const fullUrl = this.buildUrl(url, params)
        const response = await this.fetcher(fullUrl, {
            method: 'GET'
        })
        return this.handleResponse<T>(response)
    }

    async post<T>(url: string, body?: Record<string, any>): Promise<T> {
        const isFormData = body instanceof FormData
        const response = await this.fetcher(url, {
            method: 'POST',
            body: isFormData ? body as unknown as BodyInit : JSON.stringify(body)
        })
        return this.handleResponse<T>(response)
    }

    async put<T>(url: string, body?: Record<string, any>): Promise<T> {
        const response = await this.fetcher(url, {
            method: 'PUT',
            body: JSON.stringify(body)
        })
        return this.handleResponse<T>(response)
    }

    async patch<T>(url: string, body?: Record<string, any>): Promise<T> {
        const response = await this.fetcher(url, {
            method: 'PATCH',
            body: JSON.stringify(body)
        })
        return this.handleResponse<T>(response)
    }

    async delete<T>(url: string): Promise<T> {
        const response = await this.fetcher(url, {
            method: 'DELETE'
        })
        return this.handleResponse<T>(response)
    }
}