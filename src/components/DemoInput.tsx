import { Component } from 'react'
interface IState extends ICommonState {
  propData: any
}
class DemoInput extends Component<{}, IState> {
  constructor(props) {
      super(props)
      this.state = {
        id: '',
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
    const { id, propData } = this.state
    const { handleInput } = this
    return <div idm-ctrl="idm_module" id={id} idm-ctrl-id={id}>
      <input value={propData.htmlTitle} onInput={eve => handleInput.call(this, eve)}></input>
      <div>{ propData.htmlTitle }</div>
    </div>
  }
}

export default DemoInput