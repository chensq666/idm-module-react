import { Component } from 'react'
import { commonParam } from '../utils/componentUtils'
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
     * 通用的获取表达式匹配后的结果
     */
    getExpressData(dataName: string | number, dataFiled: any, resultData: any) {
        //给defaultValue设置dataFiled的值
        var _defaultVal: any = undefined
        if (dataFiled) {
            var filedExp = dataFiled
            filedExp = dataName + (filedExp.startsWiths('[') ? '' : '.') + filedExp
            var dataObject = { IDM: window.IDM }
            dataObject[dataName] = resultData
            _defaultVal = IDM.express.replace.call(this, '@[' + filedExp + ']', dataObject)
        }
        //对结果进行再次函数自定义
        if (this.state.propData.customFunction && this.state.propData.customFunction.length > 0) {
            var params = commonParam()
            var resValue = ''
            try {
                const funcName: string | undefined = this.state.propData.customFunction[0].name
                resValue =
                    funcName &&
                    window[funcName] &&
                    window[funcName].call(this, {
                        ...params,
                        ...this.state.propData.customFunction[0].param,
                        moduleObject: this.state.moduleObject,
                        expressData: _defaultVal,
                        interfaceData: resultData
                    })
            } catch (error) {}
            _defaultVal = resValue
        }

        return _defaultVal
    }
    /**
     * 把属性转换成样式对象
     */
    convertAttrToStyleObject() {
        const { id } = this.props
        const { propData } = this.state
        var styleObject = {}
        if (propData.bgSize && propData.bgSize === 'custom') {
            styleObject['background-size'] =
                (propData.bgSizeWidth ? propData.bgSizeWidth.inputVal + propData.bgSizeWidth.selectVal : 'auto') +
                ' ' +
                (propData.bgSizeHeight ? propData.bgSizeHeight.inputVal + propData.bgSizeHeight.selectVal : 'auto')
        } else if (propData.bgSize) {
            styleObject['background-size'] = propData.bgSize
        }
        if (propData.positionX && propData.positionX.inputVal) {
            styleObject['background-position-x'] = propData.positionX.inputVal + propData.positionX.selectVal
        }
        if (propData.positionY && propData.positionY.inputVal) {
            styleObject['background-position-y'] = propData.positionY.inputVal + propData.positionY.selectVal
        }
        for (const key in propData) {
            if (propData.hasOwnProperty.call(propData, key)) {
                const element = propData[key]
                if (!element && element !== false && element !== 0) {
                    continue
                }
                switch (key) {
                    case 'width':
                        styleObject[key] = element
                        break
                    case 'height':
                        styleObject[key] = element
                        break
                    case 'font':
                        styleObject['font-family'] = element.fontFamily
                        if (element.fontColors.hex8) {
                            styleObject['color'] = element.fontColors.hex8
                        }
                        styleObject['font-weight'] = element.fontWeight && element.fontWeight.split(' ')[0]
                        styleObject['font-style'] = element.fontStyle
                        styleObject['font-size'] = element.fontSize + element.fontSizeUnit
                        styleObject['line-height'] =
                            element.fontLineHeight +
                            (element.fontLineHeightUnit === '-' ? '' : element.fontLineHeightUnit)
                        styleObject['text-align'] = element.fontTextAlign
                        styleObject['text-decoration'] = element.fontDecoration
                        break
                    case 'box':
                        if (element.marginTopVal) {
                            styleObject['margin-top'] = `${element.marginTopVal}`
                        }
                        if (element.marginRightVal) {
                            styleObject['margin-right'] = `${element.marginRightVal}`
                        }
                        if (element.marginBottomVal) {
                            styleObject['margin-bottom'] = `${element.marginBottomVal}`
                        }
                        if (element.marginLeftVal) {
                            styleObject['margin-left'] = `${element.marginLeftVal}`
                        }
                        if (element.paddingTopVal) {
                            styleObject['padding-top'] = `${element.paddingTopVal}`
                        }
                        if (element.paddingRightVal) {
                            styleObject['padding-right'] = `${element.paddingRightVal}`
                        }
                        if (element.paddingBottomVal) {
                            styleObject['padding-bottom'] = `${element.paddingBottomVal}`
                        }
                        if (element.paddingLeftVal) {
                            styleObject['padding-left'] = `${element.paddingLeftVal}`
                        }
                        break
                    case 'border':
                        if (element.border.top.width > 0) {
                            styleObject['border-top-width'] = element.border.top.width + element.border.top.widthUnit
                            styleObject['border-top-style'] = element.border.top.style
                            if (element.border.top.colors.hex8) {
                                styleObject['border-top-color'] = element.border.top.colors.hex8
                            }
                        }
                        if (element.border.right.width > 0) {
                            styleObject['border-right-width'] =
                                element.border.right.width + element.border.right.widthUnit
                            styleObject['border-right-style'] = element.border.right.style
                            if (element.border.right.colors.hex8) {
                                styleObject['border-right-color'] = element.border.right.colors.hex8
                            }
                        }
                        if (element.border.bottom.width > 0) {
                            styleObject['border-bottom-width'] =
                                element.border.bottom.width + element.border.bottom.widthUnit
                            styleObject['border-bottom-style'] = element.border.bottom.style
                            if (element.border.bottom.colors.hex8) {
                                styleObject['border-bottom-color'] = element.border.bottom.colors.hex8
                            }
                        }
                        if (element.border.left.width > 0) {
                            styleObject['border-left-width'] = element.border.left.width + element.border.left.widthUnit
                            styleObject['border-left-style'] = element.border.left.style
                            if (element.border.left.colors.hex8) {
                                styleObject['border-left-color'] = element.border.left.colors.hex8
                            }
                        }

                        styleObject['border-top-left-radius'] =
                            element.radius.leftTop.radius + element.radius.leftTop.radiusUnit
                        styleObject['border-top-right-radius'] =
                            element.radius.rightTop.radius + element.radius.rightTop.radiusUnit
                        styleObject['border-bottom-left-radius'] =
                            element.radius.leftBottom.radius + element.radius.leftBottom.radiusUnit
                        styleObject['border-bottom-right-radius'] =
                            element.radius.rightBottom.radius + element.radius.rightBottom.radiusUnit
                        break
                }
            }
        }
        window.IDM.setStyleToPageHead(id, styleObject)
        this.initData()
    }
    /**
     * 重新加载
     */
    reload() {
        //请求数据源
        this.initData()
    }
    /**
     * 加载动态数据
     */
    initData() {}
    /**
     * 提供父级组件调用的刷新prop数据组件
     */
    propDataWatchHandle(propData: any) {
        // setState是异步， 其他操作要放在回调里，避免initData内数据不同步
        this.setState({ propData }, () => {
            this.convertAttrToStyleObject()
        })
    }
    /**
     * 组件通信：接收消息的方法
     * @param {
     *  type:"发送消息的时候定义的类型，这里可以自己用来要具体做什么，统一规定的type：linkageResult（组件联动传结果值）、linkageDemand（组件联动传需求值）、linkageReload（联动组件重新加载）
     * 、linkageOpenDialog（打开弹窗）、linkageCloseDialog（关闭弹窗）、linkageShowModule（显示组件）、linkageHideModule（隐藏组件）、linkageResetDefaultValue（重置默认值）"
     *  message:{发送的时候传输的消息对象数据}
     *  messageKey:"消息数据的key值，代表数据类型是什么，常用于表单交互上，比如通过这个key判断是什么数据"
     *  isAcross:如果为true则代表发送来源是其他页面的组件，默认为false
     * } object
     */
    receiveBroadcastMessage(object: any) {
        console.log(`收到消息 ---> ${object}`)
    }

    render() {
        const { id } = this.props
        const { propData } = this.state
        return (
            <div idm-ctrl='idm_module' id={id} idm-ctrl-id={id}>
                <div>{propData.title}</div>
            </div>
        )
    }
}

export default DemoText
