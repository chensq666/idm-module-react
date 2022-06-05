import { Component } from 'react'
import { Button } from 'antd';
class DemoText extends Component {
  constructor(props) {
      super(props)
      this.state = {
        id: '',
        propData: {
          htmlTitle: 1
        },
        ...props,
      }
  }

  render() {
    const { id, propData } = this.state
    return <div idm-ctrl="idm_module" id={id} idm-ctrl-id={id}>
      <input value={123456}/>
      <span>{propData.htmlTitle}</span>
      <Button>123</Button>
    </div>
  }
}

export default DemoText