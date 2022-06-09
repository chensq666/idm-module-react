interface IDMBroadcastMessage {
  type: string
  message: any
  rangeModule: null| Array<any>
  className: string,
  globalSend: boolean,
  messageKey: string,
  triggerType: string,
}

export interface OpenDialogOptions {
  moduleId: string
  openUrl: string
  success?: function
  yes?: function
  cancel?: function
  end?: function
}

export interface OpenControlOptions{
  param: {
   marketModuleId: string
   pageId: string
   packageid: string
  },
  showTop?: string
  success?: function
  yes?: function
  reset?: function
  other?: function
}

export interface IDMBroadcast {
  send(e: IDMBroadcastMessage):void
  getModuleContextValue(pageModuleList?: Array<object>, groupKey?: string): any
  getRangeModule(pageModuleList?: Array<object>, groupKey?: string): any
  openDialog(options: OpenDialogOptions):void
  closeDialog(options: {moduleId: string | Array<string>}): void
  openControlSetPanel(options: OpenControlOptions):void
  closeControlSetPanel(options: {controlSetPanelId: string}):void
}