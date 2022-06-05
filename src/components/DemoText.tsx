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

  render() {
    const { id, propData } = this.state
    return <div idm-ctrl="idm_module" id={ id } idm-ctrl-id={ id }>
      <div>{propData.htmlTitle}</div>
    </div>
  }
}

export default DemoText