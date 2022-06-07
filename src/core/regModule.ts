import { createElement, Component, createRef, RefObject } from 'react'
import { createRoot } from 'react-dom/client';
import config from '../../public/static/config.json'
//闭包方法
(() => {
    const className = window.IDM && window.IDM.url.queryString("className")
    // 将全部组件放到一个Map里
    const requireComponent = require.context('../components', true, /[A-Z]\w+\.(jsx|tsx)$/);
    const componentsMap = new Map()
    requireComponent.keys().forEach((fileName: any) => {
        const componentConfig = requireComponent(fileName)
        const  componentName= fileName.split('/').pop().replace(/\.\w+$/, '')
        componentsMap.set(componentName, componentConfig.default || componentConfig)
      })
    //这里把classId+@+version作为入口方法名（组件的包名）
    var defining = {
    };
    config && config.module.forEach((item: any) => {
        defining[item.classId + "@" + config.version] = function (moduleObject) {
            //把组件定义的属性返回给核心框架
            moduleObject.compositeAttr = item.compositeAttr;
            //把组件定义的组件内属性返回给核心框架(如果有的话)
            if(item.innerAttr){
                moduleObject.innerAttr = item.innerAttr;
            }
            //组件内部容器组件的名称
            if(item.innerComName){
                moduleObject.innerComName = item.innerComName;
            }

            const root = createRoot(document.getElementById(moduleObject.id) || document.createElement('div'));
            root.render(createElement(class extends Component {
                childCom: RefObject<IDMReactComponent>
                constructor() {
                    super(moduleObject)
                    this.childCom = createRef()
                    this.setState(moduleObject?.props?.compositeAttr)
                    /**
                     * 编辑属性更新
                     * @param {*} props
                     */
                    moduleObject.idmProps = (props) => {
                        this.childCom?.current?.propDataWatchHandle(props.compositeAttr)
                    }
                    /**
                     * 接收消息的方法
                     * @param {
                     *  type:"发送消息的时候定义的类型，这里可以自己用来要具体做什么，统一规定的type：linkageResult（组件联动传结果值）、linkageDemand（组件联动传需求值）、linkageReload（联动组件重新加载）
                     * 、linkageOpenDialog（打开弹窗）、linkageCloseDialog（关闭弹窗）、linkageShowModule（显示组件）、linkageHideModule（隐藏组件）、linkageResetDefaultValue（重置默认值）"
                     *  message:{发送的时候传输的消息对象数据}
                     *  messageKey:"消息数据的key值，代表数据类型是什么，常用于表单交互上，比如通过这个key判断是什么数据"
                     *  isAcross:如果为true则代表发送来源是其他页面的组件，默认为false
                     * } object 
                     */
                     moduleObject.idmBroadcastMessage = function (object) {
                        this.childCom?.current?.receiveBroadcastMessage(object)
                    }
                    /**
                     * 交互功能：设置组件的上下文内容值
                     * @param {
                     *  type:"定义的类型，已知类型：pageCommonInterface（页面统一接口返回值）"
                     *  Key:"数据key标识，页面每个接口设置的数据集名称，方便识别获取自己需要的数据"
                     *  data:"数据集，内容为：字符串 or 数组 or 对象"
                     * }
                     */
                    moduleObject.idmSetContextValue = function(object){}
                    /**
                     * 交互功能：获取需要返回的值，返回格式如下
                     * @return {
                     *    key:"定义的key标识，一般组件定义了一个属性，然后获取指定属性填写的值，这样返回后就能识别对应的字段或者元数据",
                     *    data:{要返回的值，内容为：字符串 or 数组 or 对象}
                     * }
                     */
                    moduleObject.idmGetContextValue = function(){}
                }
                componentDidMount() {
                    moduleObject.mountComplete && moduleObject.mountComplete(moduleObject);
                    // 预览时数据传入
                    const propData = moduleObject?.props?.compositeAttr
                    if(propData) this.childCom?.current?.propDataWatchHandle(propData)
                }
                render() {
                    return createElement(componentsMap.get(moduleObject.className || className), {...moduleObject, ref: this.childCom})
                }
            }))
        }
    })
    Object.keys(defining).forEach(key => {
        window[key] = defining[key];
    });
    //延时
    setTimeout(function(){
        if(className){
            config && config.module.forEach(item => {
                if(item.className === className){
                    window[item.classId + "@" + config.version]({
                        "id": "module_demo"
                    })
                }
            });
        }
    },100)
})();