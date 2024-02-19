### 2024-02-19
- 更新idm.core.js
### 2024-01-17
- ci:修改打包后目录名配置 build -> dist，适配idm zip脚本
- ci:增加自动打包脚本 -> npm run dist
- ci:增加ts.config配置ignoreDeprecations
- perf:注册组件regComponent.js逻辑优化
- perf:删除多余文件 src/utils src/api
- chore:维护public/lib/idm.core.js -> IDM.style.*
- chore:简化示例组件DemoText代码
### 2024-01-12
- perf:优化组件库引入方式
- fix: IDM方法报错
### 2023-05-18
- fix:config文件报错吗，修改注册程序方式
### 2022-07-22
- type:将IDM对象提取到npm 优化语法提示
### 2022-07-22
- perf: 将idm-generate 发布到npm 通过idm-generate vue/react生成对应模板

### 2022-07-12
- add: root.element.id idm_

### 2022-07-11
- update: root.element.id
- remove: production_env sourceMap
- types: allowJs -> false, noImplicitAny -> true

### 2022-07-07
- add:自动生成组件模板

### 2022-07-04
- fix: 预览时setState异步拿不到数据
- perf: idm-react-antd默认样式，减少style侵入

### 2022-07-01
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