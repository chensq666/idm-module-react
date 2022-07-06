export interface IDMCache<T> {
    size: T
    limit: T
    head: T | string
    tail: T | string
    put(key: string, value: object): void
    get(key: string): any
}
