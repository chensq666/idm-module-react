# IDM component development scaffold (React version)
IDM组件开发脚手架（React版本）

[![OSCS Status](https://www.oscs1024.com/platform/badge/web-csq/idm-module-react.svg?size=small)](https://www.oscs1024.com/project/web-csq/idm-module-react?ref=badge_small)

## UI
为避免和`idm`产生样式冲突，建议使用UI组件库[idm-react-antd](https://github.com/web-csq/idm-react-antd/tree/idm-react-antd)
```js
npm i idm-react-antd -S
```

## 预览
After start look at http://localhost:3000?className= `your component's className`

## Release Note

## 2022-07-01
- add:component.setContextValue
- perf: lodash & jquery & IDM.types
- perf: manifest & robots
- perf: don't build react & react-dom

### 2022-06-28
- 新增工具ts，更好的tree shaking
    1. 发消息
    2. 批量生成类名
- 区分component内部数据
    1. prop 父级传入
    2. state.propData 组件属性传入
    3. state 内部其他自定义数据
