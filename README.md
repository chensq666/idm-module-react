# IDM component development scaffold (React version)
IDM组件开发脚手架（Vue版本）

[![OSCS Status](https://www.oscs1024.com/platform/badge/web-csq/idm-module-react.svg?size=small)](https://www.oscs1024.com/project/web-csq/idm-module-react?ref=badge_small)

## 简介

此项目专为`idm`低代码平台搭建`create-react-app`框架

## UI
为避免和`idm`产生样式冲突，建议使用UI组件库`idm-react-antd`

## 预览
start后 http://localhost:3000?className= `your component's className`

## release note

### 2022-06-28
- 新增工具文件，更好的tree shaking
    1.发消息
    2.批量生成类名
- 区分component内部数据
    1. prop 父级传入
    2. state.propData 组件属性传入
    3. state 内部其他自定义数据
