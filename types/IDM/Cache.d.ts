export interface IDMCache {
  size: number,
  limit: number,
  head: number | string,
  tail: number | string,
  put(key: string, value: object): void
  get(key: string): any
  _keymap: {
    [key: string]: any
  }
}