import _ from '@types/lodash'
import JQuery from '@types/jquery'
import QueryString from '@types/qs'
import IDM from './IDM'

declare global {
  interface Window {
    IDM: IDM
    $: JQuery
    _: _
    qs: QueryString
  }
}

