import _ from '@types/lodash'
import JQuery from '@types/jquery'
import QueryString from '@types/qs'

declare global {
  interface Window {
    IDM: any
    $: JQuery
    _: _
    qs: QueryString
  }
}

