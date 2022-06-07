import { Component } from 'react'
class DemoInput extends Component<IDMCommonProp, IDMCommonState> {
  constructor(props) {
      super(props)
      this.state = {
        propData: {
          htmlTitle: '测试输入'
        },
        ...props,
      }
  }
  propDataWatchHandle(propData){
    this.setState({ ...this.state, propData })
  }
  handleInput(e) {
    this.state.propData.htmlTitle = e.target.value
    this.setState(this.state)
  }

  render() {
    const { id } = this.props
    const { propData } = this.state
    const { handleInput } = this
    return <div idm-ctrl="idm_module" idm-ctrl-id={id}>
      <input value={propData.htmlTitle} onInput={eve => handleInput.call(this, eve)}></input>
      <div>{ propData.htmlTitle }</div>
    </div>
  }
}

export default DemoInput