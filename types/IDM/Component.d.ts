interface IDMCommonState {
    propData: any
    moduleObject?: ModuleObject
}

interface IDMCommonProp {
    id: string
    className: string
    env?: 'develop' | 'production'
    asName: string
    callback: () => void
    classId: string
    codeSrc: string
    comId: string
    comName: string
    comType: string
    complete: boolean
    compositeAttr: object
    datetime: number
    moduleReload: () => void
    mountComplete: () => void
    packageid: string
    projectNo: string
    relationId: string
    relationType: string
    type: string
    version: string
}

interface IDMReactComponent {
    /**
     * 组件根据传入数据更新
     * @param propData 传入数据data
     */
    propDataWatchHandle(propData: any): void
    /**
     * 接受消息
     * @param object 消息体
     */
    receiveBroadcastMessage(object: any): void
    idmSetContextValue(object: any): void
    idmGetContextValue(): any
    reload(): void
    setContextValue(object: any): void
}
