import * as _ from 'lodash'
import QueryString from '@types/qs'
import IDM from './IDM'

declare global {
  interface Window {
    IDM: IDM
    _: _
    qs: QueryString
  }
}
declare module jquery {}
