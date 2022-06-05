import { Component } from 'react'

class DemoText extends Component {
  constructor(props) {
      super(props)
      this.state = {
        moduleObject: props
      }
      console.log(props)
  }

  render() {
    const { moduleObject } = this.state
    return <div idm-ctrl="idm_module" id={moduleObject.id} idm-ctrl-id={moduleObject.id}>
      <div>456</div>
    </div>
  }
}

export default DemoText