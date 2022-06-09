import { IDMCache } from './Cache'
import { IDMBroadcast } from './Broadcast'
import { IDMExpress } from './Express'
import { IDMHttp } from './Http'
import { IDMUrl } from './Url'

interface IDM {
  UUID(): string
  uuid(): string
  getClientWH(): {width: number, height: number}
  mix(target: object, other: object): object
  isPlainObject(object: any): boolean
  hasOwn(obj: object, key:string): boolean
  type(data: T): T
  isUnDef(data: any): boolean
  isDef(data: any): boolean
  isEmptyObject(obj: object): boolean
  setStyleToPageHead(id: string, object: object): void
  removeStyleTagForId(id: string):void
  difference(data: object, oldData: object): boolean
  array: {
    ensure(arr: T, item: F): T,
    remove(arr: T, item: F): T | boolean,
    removeAt(arr: T, index: number): boolean
  }
  validate(type: IDMValidateType, data: any, data2?: any): boolean
  broadcast: IDMBroadcast
  express: IDMExpress
  http: IDMHttp
  url: IDMUrl
  cachePool(maxLength: number): IDMCache
  user: {
    getCurrentUserInfo(): any
    setCurrentUserInfo(userInfo: object): void
  }
  theme: {
    getCurrentThemeInfo():any
    setCurrentThemeInfo(info: any): void
  }

  [key: string]: any
}

export = IDM