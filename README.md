# IDM组件开发脚手架（React版本）
IDM component development scaffold (React version)

[![OSCS Status](https://www.oscs1024.com/platform/badge/web-csq/idm-module-react.svg?size=small)](https://www.oscs1024.com/project/web-csq/idm-module-react?ref=badge_small)

## UI

为避免和`idm-core`中`antd-vue`样式类名冲突，修改了antd样式前缀

- src/core/regComponent.js  --->  antdConfig
- config/webpack.config.js  --->  ant-prefix, iconfont-css-prefix


## 预览
After start look at http://localhost:3000?className= `your component's className`


## 打包配置

idm zip -m 使用异步加载组件的main.js

