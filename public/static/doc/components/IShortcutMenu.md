# 快捷菜单
此组件为oa首页快捷菜单组件，可自动根据高度来显示单列数量

## 组件类名（className）

IShortcutMenu

## 组件类ID（classId）

idm.componet.shortcutMenu.ishortcutMenu

## 组件开发语言（comLangue）

react

## 组件类型（comType）

common

## 所在代码包版本

shortcutMenu@1.0.2

## 组件属性

### 唯一标识【ctrlId】

### 基本属性

#### 底部内容【bottomContent】
选择底部显示的内容

- 标识：`bottomContent`
- 默认值：`addApplication`
- 选项：
    - 添加应用【addApplication】
    - 不显示【false】

#### 显示角标【isShowBadge】
是否显示角标数量，为false时，显示红点

- 标识：`isShowBadge`
- 默认值：`true`

#### 图标URL【iconfontUrl】
从iconfont下载的图标库文件夹地址， 不需要具体到文件，比如：图标css文件的路径是【/project/font_1248060_zpcega7i6m9/iconfont.css】，我们这里只需要填写【/project/font_1248060_zpcega7i6m9/】，注意：里面的文件建议不要做任何修改，否则可能读取不正确，为空时默认使用项目自带iconfont，反之设置自定义路径后iconfont类名将从接口获取

- 标识：`iconfontUrl`
- 默认值：``

#### 图标前缀【iconPrefix】
设置iconfont类名前缀，如类名是iconfont icon-shouye前缀为icon-

- 标识：`iconPrefix`
- 默认值：`icon-`

#### 图标字体【iconFontFamily】
设置iconfont字体，如类名是iconfont icon-shouye字体为iconfont

- 标识：`iconFontFamily`
- 默认值：`iconfont`

### 样式设置

#### 高度模式【heightType】
用于设置组件高度方式，如果是不适配响应父容器选择固定值就好，如果需要适配父容器(或其他)组件传递的具体值则选择适应容器即可

- 标识：`heightType`
- 默认值：`fixed`
- 选项：
    - 固定值【fixed】
    - 适应容器【adaptive】

#### 单列宽(px)【width】
设置快捷菜单单列的宽度，不包括鼠标悬浮后显示的其他列

- 标识：`width`
- 默认值：`60`

#### 文本高度【textHeight】
由于单列显示数量是根据高度计算，所以文本改变时，要设置对应的字体容器高度，单位:px

- 标识：`textHeight`
- 默认值：`38`

#### 图标大小【iconSize】
设置图标大小，单位:px

- 标识：`iconSize`
- 默认值：`25`

##### 高【moduleHeight】
用于设置组件的具体高度值

- 标识：`moduleHeight`
- 默认值：`800px`

##### 内部边距【box】

- 标识：`box`
- 默认值：``


##### 背景设置

###### 背景色【bgColor】

###### 背景图片【bgImgUrl】

###### 横向偏移【positionX】

###### 纵向偏移【positionY】

###### 背景大小【bgSize】

###### 宽度【bgSizeWidth】

###### 高度【bgSizeHeight】

###### 平铺模式【bgRepeat】

###### 背景模式【bgAttachment】

##### 菜单文字【font】

- 标识：`font`
- 默认值：``

##### 菜单阴影【boxShadow】

- 标识：`boxShadow`
- 默认值：``

##### 菜单边框【border】

- 标识：`border`
- 默认值：``

### 主题设置

#### 主要颜色【mainColor】
主题的主要颜色，作用于菜单背景色

- 标识：`mainColor`

#### 次要颜色【minorColor】
主题的次要颜色，作用于菜单鼠标悬浮色、选中菜单颜色

- 标识：`minorColor`


### 高级

#### 联动组件【triggerComponents】
选择点击快捷菜单需要联动的组件

- 标识：`triggerComponents`
- 默认值：``

#### 动态内容【dataSourceType】
通过这些方式去动态获取结果值显示成菜单内容

- 标识：`triggerComponents`
- 默认值：`dataSource`
- 可选项：
    - 数据源【dataSource】
    - 页面统一接口【pageCommonInterface】
    - 自定义函数【customFunction】

#### 数据源【dataSource】
获取当前菜单的数据源，如果不配置则使用ctrl/api/frame/getShortCutInfo接口请求

- 标识：`triggerComponents`
- 默认值：``
- 显示条件：`@[dataSourceType=='dataSource']`

#### 结果集名【dataName】
页面接口设定的结果集名称，位置为：页面设置 -> 高级设置 -> 页面接口

- 标识：`dataName`
- 默认值：``
- 显示条件：`@[dataSourceType=='pageCommonInterface']`

#### 显示字段【dataFiled】
根据接口返回数据格式指定结果集的字段，比如结果集名为resultData（自定义接口忽略）且它的值为{data:{filedName:[{\"text\":\"\",\"value\":\"\",\"check\":true}]}}，则这里应该填写data.filedName

- 标识：`dataFiled`
- 默认值：``
- 显示条件：`@[dataSourceType=='pageCommonInterface']`

#### 自定义函数【customFunction】
获取动态文本内容、自定义接口回调、页面统一接口回调的时候会调用此方法，返回数据格式为字符串，接收参数：{...自定义,interfaceData:自定义接口或页面统一接口的返回结果,expressData:表达式替换后的结果}

- 标识：`customFunction`
- 默认值：``

#### 常用功能列表数据源【cyListDataSource】
获取常用功能列表数据源，如果不配置则使用ctrl/shortcut/list接口请求

- 标识：`cyListDataSource`
- 默认值：``

#### 常用功能修改数据源【cyChangeDataSource】
常用功能修改数据源，如果不配置则使用ctrl/shortcut/change接口请求，参数：{operation,menuId,portalPattern}

- 标识：`cyChangeDataSource`
- 默认值：``

#### 刷新KEY【messageRefreshKey】
根据组件接收到消息的刷新KEY来刷新数据

- 标识：`messageRefreshKey`
- 默认值：``
