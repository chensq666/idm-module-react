export interface IDMHttp {
  get(path: string, params?: object, options?: object, rootPath?: string)
  post(path: string, params?: object, options?: object, rootPath?: string)
  all(arr: Array<Promise>):Array<any>,
  upload(path: string, file: File, params?: object, options?: object, rootPath?: string): Promise
  importFiles(arr: Array<string>): Promise
}