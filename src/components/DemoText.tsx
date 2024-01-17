import { Component } from 'react'
import { Button } from 'antd'
interface IState extends IDMCommonState {}
class DemoText extends Component<IDMCommonProp, IState> {
    constructor(rootProps: IDMCommonProp | Readonly<IDMCommonProp>) {
        super(rootProps)
        this.state = {
            propData: {
                title: '测试文本'
            }
        }
    }
    setContextValue(object: { type: string }) {
        console.log('统一接口设置的值', object)
        if (object.type !== 'pageCommonInterface') {
            return
        }
    }
    /**
     * 把属性转换成样式对象
     */
    convertAttrToStyleObject() {
        const { id } = this.props
        const { propData } = this.state
        var styleObject = {}
        IDM.style.setBackgroundStyle(styleObject, propData)
        for (const key in propData) {
            if (propData.hasOwnProperty.call(propData, key)) {
                const element = propData[key]
                if (!element && element !== false && element !== 0) {
                    continue
                }
                switch (key) {
                    case 'width':
                    case 'height':
                        styleObject[key] = element
                        break
                    case 'font':
                        IDM.style.setFontStyle(styleObject, element)
                        break
                    case 'box':
                        IDM.style.setBoxStyle(styleObject, element)
                        break
                    case 'border':
                        IDM.style.setBorderStyle(styleObject, element)
                        break
                }
            }
        }
        window.IDM.setStyleToPageHead(id, styleObject)
        this.initData()
    }
    reload() {
        this.initData()
    }
    initData() {}
    propDataWatchHandle(propData: any) {
        // setState是异步， 其他操作要放在回调里，避免initData内数据不同步
        this.setState({ propData }, () => {
            this.convertAttrToStyleObject()
        })
    }
    receiveBroadcastMessage(object: any) {
        console.log(`收到消息 ---> ${object}`)
    }

    render() {
        const { id } = this.props
        const { propData } = this.state
        return (
            <div idm-ctrl='idm_module' id={id} idm-ctrl-id={id}>
                <div>{propData.title}</div>
                <Button>测试按钮</Button>
            </div>
        )
    }
}

export default DemoText
