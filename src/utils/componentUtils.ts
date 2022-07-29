import { IDMBroadcastMessage } from "@idm-modules/types/IDM/Broadcast"
/**
 * 组件通信：发送消息的方法
 * @param {
 *  type:"自己定义的，统一规定的type：linkageResult（组件联动传结果值）、linkageDemand（组件联动传需求值）、linkageReload（联动组件重新加载）
 * 、linkageOpenDialog（打开弹窗）、linkageCloseDialog（关闭弹窗）、linkageShowModule（显示组件）、linkageHideModule（隐藏组件）、linkageResetDefaultValue（重置默认值）",
 *  message:{实际的消息对象},
 *  rangeModule:"为空发送给全部，根据配置的属性中设定的值（值的内容是组件的packageid数组），不取子表的，比如直接 this.$root.propData.compositeAttr["attrKey"]（注意attrKey是属性中定义的bindKey）,这里的格式为：['1','2']"",
 *  className:"指定的组件类型，比如只给待办组件发送，然后再去过滤上面的值"
 *  globalSend:如果为true则全站发送消息，注意全站rangeModule是无效的，只有className才有效，默认为false
 * } object
 */
export function sendBroadcastMessage(object: IDMBroadcastMessage) {
    IDM.broadcast && IDM.broadcast.send(object)
}
/**
 * 通用的url参数对象
 * 所有地址的url参数转换
 */
export function commonParam() {
    let urlObject = IDM.url.queryObject()
    var params = {
        pageId: IDM.broadcast && IDM.broadcast.pageModule ? IDM.broadcast.pageModule.id : '',
        urlData: JSON.stringify(urlObject)
    }
    return params
}
// 加载css
export function loadIconFile(confrontUrl: string) {
    if(!confrontUrl) return
    let baseUrl = confrontUrl + (confrontUrl.substring(confrontUrl.length - 1, confrontUrl.length) === '/' ? '' : '/')
    IDM.http
        .get(baseUrl + 'iconfont.json', {})
        .then((res) => {
            if (!res.data) {
                return
            }
            //存在，加载css
            IDM.module.loadCss(IDM.url.getWebPath(baseUrl + 'iconfont.css'), true)
        })
        .catch(function (error) {
            console.log(error)
        })
}
