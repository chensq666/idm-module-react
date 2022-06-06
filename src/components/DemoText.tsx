import { Component } from 'react'

interface IState extends ICommonState {
  propData: any
}
class DemoText extends Component<{}, IState> {
  constructor(props) {
      super(props)
      this.state = {
        id: '',
        propData: {
          htmlTitle: '测试文本'
        },
        ...props,
      }
  }
  /**
  * 提供父级组件调用的刷新prop数据组件
  */
  propDataWatchHandle(propData){
    this.setState({ ...this.state, propData })
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
  receiveBroadcastMessage(object) {
    console.log(`收到消息 ---> ${object}`)
  }

  render() {
    const { id, propData } = this.state
    return <div idm-ctrl="idm_module" id={ id } idm-ctrl-id={ id }>
      <div>{propData.htmlTitle}</div>
    </div>
  }
}

export default DemoText