import { Component } from 'react'
import './IShortcutMenu.less'
import '../../public/static/menu-icon/iconfont.css'
import responseData from '../mockData/ShortCutInfo.json'
import CreateMenu from '../commonComponents/CreateMenu'
import CommonFunction from '../commonComponents/CommonFunctions'
interface IState extends IDMCommonState {
    text: string
    moduleHeight: string
    isHover: boolean
    isDisplayRight: boolean
    shortCutData: {
        shortCut: Array<any>
    }
    createMenuShow: boolean
    commonFunctionShow: boolean
    pageShortcutList: Array<any>
}
class IShortcutMenu extends Component<IDMCommonProp, IState> {
    constructor(props) {
        super(props)
        this.state = {
            shortCutData: { shortCut: [{ name: ' ', onlyShowPlaceholder: true }] },
            createMenuShow: false,
            commonFunctionShow: false,
            isHover: false,
            isDisplayRight: true,
            moduleHeight: '800px',
            pageShortcutList: [
                [
                    {
                        badgeAction: '',
                        isTabReload: '',
                        name: ' ',
                        icon: '',
                        link: '',
                        menuId: '',
                        id: '200819032505wojCx49Dqt5sLavzEo6',
                        target: ''
                    }
                ]
            ],
            propData: {
                title: '页面标题',
                text: '测试文本',
                interfaceUrl: 'ctrl/api/frame/getShortCutInfo'
            },
            ...props
        }
        // 防抖处理
        this.sliceShortcutData = _.debounce(this.sliceShortcutData, 400)
    }
    // 获取用户自定义字体缩放比例
    getUserFontSizeRatio() {
        const user: any = IDM.user
        return user?.getUserFontSizeRatio() || 1
    }
    setUserFontSizeRatio(styleObj, element: any){
        const userFontSizeRatio = this.getUserFontSizeRatio()
        if(element?.fontSize && element?.fontSizeUnit) {
            styleObj['font-size'] = (element.fontSize ?? 0) * userFontSizeRatio + element.fontSizeUnit
        }
    }
    /**
     * 把属性转换成样式对象
     */
    convertAttrToStyleObject(stateObj) {
        const { propData, id } = stateObj
        const styleObject = {},
            fontObj = {},
            iconSizeObj = {}
        if (propData.bgSize && propData.bgSize === 'custom') {
            styleObject['background-size'] =
                (propData.bgSizeWidth ? propData.bgSizeWidth.inputVal + propData.bgSizeWidth.selectVal : 'auto') +
                ' ' +
                (propData.bgSizeHeight ? propData.bgSizeHeight.inputVal + propData.bgSizeHeight.selectVal : 'auto')
        } else if (propData.bgSize) {
            styleObject['background-size'] = propData.bgSize
        }
        if (propData.positionX && propData.positionX.inputVal) {
            styleObject['background-position-x'] = propData.positionX.inputVal + propData.positionX.selectVal
        }
        if (propData.positionY && propData.positionY.inputVal) {
            styleObject['background-position-y'] = propData.positionY.inputVal + propData.positionY.selectVal
        }
        for (const key in propData) {
            if (propData.hasOwnProperty.call(propData, key)) {
                const element = propData[key]
                if (!element && element !== false && element !== 0) {
                    continue
                }
                switch (key) {
                    case 'textHeight':
                        fontObj['height'] = element + 'px'
                        break
                    case 'iconSize':
                        iconSizeObj['font-size'] = element * this.getUserFontSizeRatio() + 'px'
                        break
                    case 'font':
                        IDM.style.setFontStyle(fontObj, element)
                        this.setUserFontSizeRatio(fontObj, element)
                        break
                    case 'bgColor':
                        if (element && element.hex8) {
                            styleObject['background-color'] = element.hex8 + ' !important'
                        }
                        break
                    case 'bgImgUrl':
                        styleObject['background-image'] = `url(${window.IDM.url.getWebPath(element)})`
                        break
                    case 'positionX':
                        //背景横向偏移

                        break
                    case 'positionY':
                        //背景纵向偏移

                        break
                    case 'bgRepeat':
                        //平铺模式
                        styleObject['background-repeat'] = element
                        break
                    case 'bgAttachment':
                        //背景模式
                        styleObject['background-attachment'] = element
                        break
                    case 'box':
                        IDM.style.setBoxStyle(styleObject, element)
                        break
                    case 'boxShadow':
                        styleObject['box-shadow'] = element
                        break
                    case 'border':
                        IDM.style.setBorderStyle(styleObject, element)
                        break
                }
            }
        }
        window.IDM.setStyleToPageHead(id + ' .idm-shortcut-menu-box-container', styleObject)
        window.IDM.setStyleToPageHead(id + ' .idm-shortcut-menu-box-container .idm-shortcut-menu-text', fontObj)
        window.IDM.setStyleToPageHead(id + ' .idm-shortcut-menu-box-container .idm-shortcut-menu-icon', iconSizeObj)
        this.initData()
    }
    // 获取单列数量
    getOneLineNumber() {
        if(!this.state.shortCutData?.shortCut?.length) return 1
        const oneBoxObj = window.getComputedStyle($('.idm-shortcut-menu-box')[0]) || {}
        const containerBoxObj = window.getComputedStyle($('.idm-shortcut-menu-box-container')[0]) || {}
        const oneHeight =
            parseInt(oneBoxObj['height'] || '1') +
            parseInt(oneBoxObj['margin-bottom'] || '1')
        const totalHeight =
            parseInt(containerBoxObj['height'] || '1') -
            (this.state.propData.bottomContent === false ? 0 : 70) // 减去底部的高
        return Math.floor(totalHeight / oneHeight)
    }
    // 加载css
    loadIconFile() {
        const iconfontUrl = this.state.propData.iconfontUrl
        if (iconfontUrl) {
            let baseUrl =
                iconfontUrl + (iconfontUrl.substring(iconfontUrl.length - 1, iconfontUrl.length) === '/' ? '' : '/')
            window.IDM.http
                .get(baseUrl + 'iconfont.json', {})
                .then((res) => {
                    if (!res.data) {
                        return
                    }
                    //存在，加载css
                    window.IDM.module.loadCss(window.IDM.url.getWebPath(baseUrl + 'iconfont.css'), true)
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }
    // 批量生成css类名
    generateClassName(themePrefix, classArray) {
        return classArray.map((el) => themePrefix + el).join(',')
    }
    // 主题
    convertThemeListAttrToStyleObject(stateObj) {
        const { id } = stateObj
        var themeList = this.state.propData.themeList
        if (!themeList) {
            return
        }
        const themeNamePrefix =
            window.IDM.setting && window.IDM.setting.applications && window.IDM.setting.applications.themeNamePrefix
                ? window.IDM.setting.applications.themeNamePrefix
                : 'idm-theme-'
        for (var i = 0; i < themeList.length; i++) {
            var item = themeList[i]
            const mainBgColorObj = {
                'background-color': item.mainColor ? window.IDM.hex8ToRgbaString(item.mainColor.hex8) : ''
            }
            const minorBgColorObj = {
                'background-color': item.minorColor ? window.IDM.hex8ToRgbaString(item.minorColor.hex8) : ''
            }

            const mainColorObj = {
                color: item.mainColor ? window.IDM.hex8ToRgbaString(item.mainColor.hex8) : ''
            }
            const borderColorObj = {
                'border-color': item.mainColor ? window.IDM.hex8ToRgbaString(item.mainColor.hex8) : ''
            }

            window.IDM.setStyleToPageHead(
                '.' + themeNamePrefix + item.key + ` #${id} .idm-shortcut-menu-box-container`,
                mainBgColorObj
            )
            window.IDM.setStyleToPageHead(
                '.' + themeNamePrefix + item.key + ` #${id} .idm-shortcut-menu-box:hover`,
                minorBgColorObj
            )

            /**dialog */
            window.IDM.setStyleToPageHead(
                this.generateClassName('.' + themeNamePrefix + item.key + ` .idm-create-menu-app `, [
                    `.idm-create-menu-app-group-item .idm-create-menu-app-group-title>div`,
                    '.idm-create-menu-inner-anchor>div>div.active',
                    '.idm-create-menu-inner-anchor>div>div.active i',
                    '.idm-create-menu-app-search>div .search-icon'
                ]),
                Object.assign({}, mainColorObj, borderColorObj)
            )
            window.IDM.setStyleToPageHead(
                '.' +
                    themeNamePrefix +
                    item.key +
                    ` .idm-create-menu-app .idm-create-menu-app-content .idm-create-menu-app-group-item .idm-create-menu-app-group-content .idm-create-menu-app-element-item:hover`,
                mainBgColorObj
            )
        }
    }
    // 切割数组
    sliceShortcutData(isRefresh: any = false) {
        const list: Array<any> = []
        let number = this.getOneLineNumber()
        if(number === 0) number = 6
        console.log(this.state.shortCutData?.shortCut, number)
        this.state.shortCutData?.shortCut?.forEach((element, index) => {
            let key = Math.floor(index / number)
            if (!list[key]) {
                list[key] = []
            }
            list[key].push(element)
        })
        console.log(list, '<------------- Slice done')
        this.setState({ pageShortcutList: list }, () => {
            if(isRefresh) {
                this.deepRefreshMenuBadge(this.state.shortCutData?.shortCut || [])
            }
        })
    }
    handleMouseEnter(type: 'left' | 'right') {
        if (type === 'left') {
            this.setState({
                isDisplayRight: true
            })
        }
        this.setState({ isHover: true })
    }
    handleMouseLeave() {
        this.setState({ isHover: false })
    }
    getPositionStyle(indexs) {
        const index = indexs + 1
        return {
            left:
                this.state.isDisplayRight && this.state.isHover
                    ? this.state.propData.width * index + 'px'
                    : '0',
            transition: `left ${index * 0.04}s`,
            zIndex: index + 100,
            height: this.state.moduleHeight,
            width: this.state.propData.width + 'px',
            borderLeft: '1px solid #FFFFFF'
        }
    }
    setContextValue(object) {
        console.log('统一接口设置的值', object)
        if (object.type !== 'pageCommonInterface') {
            return
        }
        if (object.key === this.state.propData.dataName) {
            // this.propData.fontContent = this.getExpressData(this.propData.dataName,this.propData.dataFiled,object.data);
            this.setState(
                {
                    shortCutData: this.getExpressData(
                        this.state.propData.dataName,
                        this.state.propData.dataFiled,
                        object.data
                    )
                },
                () => {
                    this.sliceShortcutData(true)
                }
            )
        }
    }
    /**
     * 重新加载
     */
    reload() {
        //请求数据源
        this.initData()
    }
    /**
     * 通用的url参数对象
     * 所有地址的url参数转换
     */
    commonParam() {
        let urlObject = window.IDM.url.queryObject()
        var params = {
            pageId: window.IDM.broadcast && window.IDM.broadcast.pageModule ? window.IDM.broadcast.pageModule.id : '',
            urlData: JSON.stringify(urlObject)
        }
        return params
    }
    /**
     * 通用的获取表达式匹配后的结果
     */
    getExpressData(dataName, dataFiled, resultData) {
        //给defaultValue设置dataFiled的值
        var _defaultVal: any = undefined
        if (dataFiled) {
            var filedExp = dataFiled
            filedExp = dataName + (filedExp.startsWiths('[') ? '' : '.') + filedExp
            var dataObject = { IDM: window.IDM }
            dataObject[dataName] = resultData
            _defaultVal = window.IDM.express.replace.call(this, '@[' + filedExp + ']', dataObject)
        }
        //对结果进行再次函数自定义
        if (this.state.propData.customFunction && this.state.propData.customFunction.length > 0) {
            var params = this.commonParam()
            var resValue = ''
            try {
                const funcName: string | undefined = this.state.propData.customFunction[0].name
                resValue =
                    funcName &&
                    window[funcName].call(this, {
                        ...params,
                        ...this.state.propData.customFunction[0].param,
                        moduleObject: this.state,
                        expressData: _defaultVal,
                        interfaceData: resultData
                    })
            } catch (error) {}
            _defaultVal = resValue
        }

        return _defaultVal
    }
    /**
     * 加载动态数据
     */
    initData() {
        if (this.props.env !== 'production') {
            console.log(responseData.data)
            this.setState({ shortCutData: responseData.data }, () => {
                this.sliceShortcutData(true)
            })
            return
        }
        switch (this.state.propData.dataSourceType) {
            case 'customInterface':
            case 'dataSource':
                if(this.state.propData?.dataSource?.[0]?.id) {
                    IDM.datasource.request(this.state.propData.dataSource[0].id, {
                        moduleObject: this.state.moduleObject,
                        param: {}
                    }).then(res => {
                        if(!res || res.length === 0) {
                            res = [{ name: ' ', onlyShowPlaceholder: true }]
                            return
                        }
                        this.setState({ shortCutData: res }, () => {
                            this.sliceShortcutData(true)
                        })
                    })
                }else {
                    window.IDM.http
                    .get('ctrl/api/frame/getShortCutInfo')
                    .then((res) => {
                        if (res.status === 200 && res.data.code === '200') {
                            if(res.data.data.shortCut.length === 0) {
                                res.data.data.shortCut = [{ name: ' ', onlyShowPlaceholder: true }]
                            }
                            this.setState({ shortCutData: res.data.data }, () => {
                                this.sliceShortcutData(true)
                            })
                        } else {
                            window.IDM.message.error(res.data.message)
                        }
                    })
                    .catch(function (error) {})

                }
                break
            case 'pageCommonInterface':
                //使用通用接口直接跳过，在setContextValue执行
                break
            case 'customFunction':
                var params = this.commonParam()
                if (this.state.propData.customFunction && this.state.propData.customFunction.length > 0) {
                    try {
                        const funcName: string | undefined = this.state.propData.customFunction[0]?.name
                        const resValue =
                            funcName &&
                            window[funcName].call(this, {
                                ...params,
                                ...this.state.propData.customFunction[0].param,
                                moduleObject: this.state.moduleObject
                            })
                        this.setState(
                            {
                                shortCutData: this.getExpressData(
                                    this.state.propData.dataName,
                                    this.state.propData.dataFiled,
                                    resValue
                                )
                            },
                            () => {
                                this.sliceShortcutData(true)
                            }
                        )
                    } catch (error) {}
                }
                break
        }
    }
    resizeContentWrapperHeight(wrapperHeight?: number) {
        let moduleHeight = this.state.propData.moduleHeight
        if (this.state.propData.heightType === 'adaptive' && wrapperHeight) {
            //自适应父级容器
            moduleHeight = wrapperHeight + 'px'
        }
        this.setState({ moduleHeight }, () => {
            this.sliceShortcutData()
        })
    }
    /**
     * 提供父级组件调用的刷新prop数据组件
     */
    propDataWatchHandle(propData) {
        const stateObj = { ...this.state, propData }
        this.setState(stateObj, () => {
            // setState是异步 需要放在回调里
            this.sliceShortcutData()
            this.convertThemeListAttrToStyleObject(stateObj)
            this.resizeContentWrapperHeight()
            this.loadIconFile()
            this.convertAttrToStyleObject(stateObj)
        })
    }
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
    sendBroadcastMessage(object) {
        window.IDM.broadcast && window.IDM.broadcast.send(object)
    }
    /**
     * 组件通信：接收消息的方法
     * @param {
     *  type:"发送消息的时候定义的类型，这里可以自己用来要具体做什么，统一规定的type：linkageResult（组件联动传结果值）、linkageDemand（组件联动传需求值）、linkageReload（联动组件重新加载）
     * 、linkageOpenDialog（打开弹窗）、linkageCloseDialog（关闭弹窗）、linkageShowModule（显示组件）、linkageHideModule（隐藏组件）、linkageResetDefaultValue（重置默认值）"
     *  message:{发送的时候传输的消息对象数据}
     *  messageKey:"消息数据的key值，代表数据类型是什么，常用于表单交互上，比如通过这个key判断是什么数据"
     *  isAcross:如果为true则代表发送来源是其他页面的组件，默认为false
     * } object
     */
    receiveBroadcastMessage(object) {
        console.log('组件收到消息', object)
        switch (object.type) {
            case 'regionResize':
                if (object.message && object.message.gridEleTarget) {
                    let gridEleTarget = object.message.gridEleTarget
                    if (gridEleTarget && gridEleTarget.offsetHeight) {
                        this.resizeContentWrapperHeight(gridEleTarget.offsetHeight)
                    }
                }
                break
            case 'pageResize':
                if (this.state.propData.heightType === 'fixed') {
                    this.sliceShortcutData()
                }
                break
            case 'websocket':
                const messageRefreshKey = this.state.propData.messageRefreshKey
                if (messageRefreshKey && object.message) {
                    // eslint-disable-next-line no-mixed-operators
                    const messageData =
                        (typeof object.message === 'string' && JSON.parse(object.message)) || object.message
                    const arr = Array.isArray(messageRefreshKey) ? messageRefreshKey : [messageRefreshKey]
                    if (messageData.badgeType && arr.includes(messageData.badgeType)) {
                        this.initData()
                    }
                }
                break
        }
    }

    replaceAction(action) {
        if (action.indexOf('../../') === 0) {
            return window.IDM.url.getWebPath(action.replace('../../', ''))
        } else {
            return action
        }
    }

    handleClickIcon() {
        if (this.props.env === 'develop') return
        this.setState({ commonFunctionShow: true })
    }

    handleCommonFunctionClose() {
        console.log(123)
        this.setState({ commonFunctionShow: false })
        this.initData()
    }

    handleCreateMenuClose() {
        this.setState({ createMenuShow: false })
        this.initData()
    }

    handleIconClassName(el) {
        if(el.onlyShowPlaceholder) return ''
        // 自定义
        const isCustom = this.state.propData.iconfontUrl ? true : false
        // 取自定义字段 默认 iconfont
        let fontFamily = isCustom && this.state.propData.iconFontFamily ? this.state.propData.iconFontFamily : ''
        // 取自定义前缀 默认icon-
        let prefix = isCustom && this.state.propData.iconPrefix ? this.state.propData.iconPrefix : ''
        let familyStr = `${fontFamily} ${prefix}`
        if (isCustom && el.icon) {
            return familyStr + el.icon
        }
        // 没有icon 不是自定义图标库 使用本地自带图标库
        return 'oa-menu-iconfont oa-menu-tuceng'
    }

    handleClickItem(item) {
        if (this.props.env !== 'production' || item.onlyShowPlaceholder) return
        if (this.state.propData.triggerComponents.length === 0) {
            return window.IDM.message.warning('请配置快捷菜单的联动组件')
        }
        this.setState({ isDisplayRight: false })
        if (item.script) {
            switch (item.script) {
                case 'newFile':
                    this.setState({ createMenuShow: true })
                    break
                case 'remind':
                    item.link = this.replaceAction('../../ctrl/remind/index')
                    this.sendBroadcastMessage({
                        type: 'addTab',
                        rangeModule: this.state.propData.triggerComponents.map((el) => el.moduleId),
                        message: item
                    })
                    break
            }
            return
        }
        if (item?.link?.indexOf('javascript') === 0) {
            eval(this.replaceAction(item.link).replace('javascript:', ''))
        } else {
            if (item.target === 'newmain') {
                let action = this.replaceAction(item.link)
                window.open(action, '_blank')
            } else {
                this.sendBroadcastMessage({
                    type: 'addTab',
                    rangeModule: this.state.propData.triggerComponents.map((el) => el.moduleId),
                    message: item
                })
            }
        }
    }
    // 设置角标显示/隐藏
    setMarker(id, number, type = 'show') {
            const element = $(`.idm-shortcut-menu-maker[data-mid=${id}]`)
            const pointClass = `idm-shortcut-menu-maker-point`
            // 显示角标
            if (this.state.propData.isShowBadge) {
                element.html(number)
                if (element.hasClass(pointClass)) element.removeClass(pointClass)
            } else {
                element.html('')
                if (!element.hasClass(pointClass)) element.addClass(pointClass)
            }
            element[type]()
    }
    // 这是item maker
    setItemMarker(isMarker, el, number) {
        if (isMarker) {
            this.setMarker(el.id, number)
        } else {
            this.setMarker(el.id, '', 'hide')
        }
    }
    // 发请求获取角标
    async requestBadgeMenu(item) {
        if (!item.badgeAction) return 0
        let badgeNumber: any = 0
        let res: any = null
        try {
            res = await window.IDM.http.get(item.badgeAction, { keepsilent: 1 })
        } catch (error) {}
        if (res && res.data.type === 'success') {
            badgeNumber =
                typeof res.data.data === 'string' || typeof res.data.data === 'number'
                    ? res.data.data
                    : res.data.data.count
            badgeNumber = parseInt(badgeNumber)
            if (badgeNumber > 99) badgeNumber = '99+'
        }
        return badgeNumber
    }

    // 递归刷新角标
    deepRefreshMenuBadge(menuList) {
        if (!menuList || menuList.length === 0) return
        Array.prototype.forEach.call(menuList, async (el) => {
            // 优化，如果不显示就不发请求
            if (this.props.env === 'develop') {
                this.setItemMarker(el.badgeActionTest, el, 66)
            } else {
                const number = await this.requestBadgeMenu(el)
                this.setItemMarker(number !== 0, el, number)
            }
            this.deepRefreshMenuBadge(el.children)
        })
    }

    render() {
        const { handleMouseEnter, handleMouseLeave } = this
        const { id } = this.props
        const { pageShortcutList, moduleHeight, propData, moduleObject } = this.state
        return (
            <>
                <div id={id} idm-ctrl='idm_module' className='idm-shortcut-menu' idm-ctrl-id={id}>
                    <div
                        className='idm-shortcut-menu-box-container'
                        style={{ left: 0, zIndex: 1000, height: moduleHeight, width: propData.width + 'px' }}
                        onMouseLeave={() => handleMouseLeave.call(this)}
                        onMouseEnter={() => handleMouseEnter.call(this, 'left')}
                    >
                        {pageShortcutList.length > 0 &&  pageShortcutList[0].map((el) => (
                            <div className={el.onlyShowPlaceholder ? 'no-hover idm-shortcut-menu-box' : 'idm-shortcut-menu-box'} key={el.id} onClick={() => this.handleClickItem(el)}>
                                <i className={`idm-shortcut-menu-icon ${this.handleIconClassName(el)}`}></i>
                                <div className='idm-shortcut-menu-text' title={el.name}>
                                    {el.name}
                                </div>
                                <i className='idm-shortcut-menu-maker' data-mid={el.id}></i>
                            </div>
                        ))}
                        {propData.bottomContent === 'addApplication' && (
                            <div className='idm-shortcut-menu-add'>
                                <i
                                    onClick={() => this.handleClickIcon()}
                                    className='oa-menu-iconfont oa-menu-zengjiatianjiajiahao idm-shortcut-menu-add-icon'
                                ></i>
                            </div>
                        )}
                    </div>
                    {pageShortcutList.length > 1 && pageShortcutList
                        .filter((el, index) => index !== 0)
                        .map((els, indexs) => {
                            return (
                                <div
                                    onMouseLeave={() => handleMouseLeave.call(this)}
                                    onMouseEnter={() => handleMouseEnter.call(this, 'right')}
                                    className='idm-shortcut-menu-box-container'
                                    key={indexs}
                                    style={this.getPositionStyle(indexs)}
                                >
                                    {els.map((item) => (
                                        <div
                                            className='idm-shortcut-menu-box'
                                            key={item.id}
                                            onClick={() => this.handleClickItem(item)}
                                        >
                                            <i
                                                className={`idm-shortcut-menu-icon ${this.handleIconClassName(item)}`}
                                            ></i>
                                            <div className='idm-shortcut-menu-text' title={item.name}>
                                                {item.name}
                                            </div>
                                            <i className='idm-shortcut-menu-maker' data-mid={item.id}></i>
                                        </div>
                                    ))}
                                </div>
                            )
                        })}
                </div>
                <CreateMenu
                    iconPrefix={propData.iconPrefix}
                    iconfontUrl={propData.iconfontUrl}
                    iconFontFamily={propData.iconFontFamily}
                    createMenuShow={this.state.createMenuShow}
                    handleCreateMenuClose={() => this.handleCreateMenuClose()}
                ></CreateMenu>
                <CommonFunction
                    iconPrefix={propData.iconPrefix}
                    iconfontUrl={propData.iconfontUrl}
                    iconFontFamily={propData.iconFontFamily}
                    commonFunctionShow={this.state.commonFunctionShow}
                    propData={propData}
                    moduleObject={moduleObject}
                    handleCommonFunctionClose={() => this.handleCommonFunctionClose()}
                ></CommonFunction>
            </>
        )
    }
}

export default IShortcutMenu
