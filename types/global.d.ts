import * as lodash from '@types/lodash'
import * as jquery from '@types/jquery'
import IDM from '@idm-modules/types/IDM'

declare global {
  const _: typeof lodash
  const IDM: IDM
  interface Window {
    IDM: IDM
  }
}
declare module jquery {}
