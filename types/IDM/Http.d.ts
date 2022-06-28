import { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface IDMHttp {
    get<T = any, R = AxiosResponse<T>, D = any>(
        url: string,
        params?: object,
        options?: AxiosRequestConfig<D>,
        rootPath?: string
    ): Promise<R>
    post<T = any, R = AxiosResponse<T>, D = any>(
        url: string,
        params?: object,
        options?: AxiosRequestConfig<D>,
        rootPath?: string
    ): Promise<R>
    all<T>(values: Array<T | Promise<T>>): Promise<T[]>
    upload<T>(path: string, file: File, params?: object, options?: object, rootPath?: string): Promise<T>
    importFiles<T>(arr: Array<string>): Promise<T>
}
