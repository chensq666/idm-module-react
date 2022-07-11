'use strict';

const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const resolve = (...file) => path.resolve(__dirname, ...file)
const log = (message) => console.log(chalk.green(`${message}`))
const successLog = (message) => console.log(chalk.blue(`${message}`))
const errorLog = (error) => console.log(chalk.red(`${error}`))
const jsonObj = require('../public/static/config.json')
const dayjs = require('dayjs')
// 导入模板
const { reactTemplate, jsonTemplate, configItem } = require('./template')
// 生成文件
const generateFile = (path, data, isExists = true) => {
    if (fs.existsSync(path) && isExists) {
        errorLog(`${path}文件已存在`)
        return
    }
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, 'utf8', (err) => {
            if (err) {
                errorLog(err.message)
                reject(err)
            } else {
                resolve(true)
            }
        })
    })
}

log(`Please enter the IDM component's className/comName to be generated, like ITest/文本`)
process.stdin.on('data', async (chunk) => {
    const inputStr = String(chunk).trim().toString()
    const dataArray = inputStr && inputStr.split('/')
    if(!Array.isArray(dataArray) || dataArray.length !== 2) {
        log('Please enter the correct data format')
        return
    }
    // 组件类名
    const className = dataArray[0]
    // 组件中文名
    const comName = dataArray[1]
    // 组件路径
    const componentPath = resolve('../src/components')
    // react文件
    const reactFile = resolve(componentPath, `${className}.tsx`)
    // json文件
    const jsonFile = resolve('../public/static/attributes', `${className}.json`)
    // configJson文件
    const configJson = resolve('../public/static/config.json')
    // 判断组件文件夹是否存在
    let fileExists = fs.existsSync(reactFile)
    if (fileExists) {
        errorLog(`${className} react component already exists, please re-enter`)
        return
    }
    // 配置json是否存在
    fileExists = fs.existsSync(jsonFile)
    if (fileExists) {
        errorLog(`${className} json already exists, please re-enter`)
        return
    }
    // static/config.json内是否已经配置
    const configIndex = jsonObj.module.findIndex(el => el.className === className || el.comName === comName)
    if(configIndex > -1) {
        errorLog(`static/config.json already exists, please re-enter`)
        return
    }

    try {
        const packageName = jsonObj.className
        log(`Generating react file ${reactFile}`)
        await generateFile(reactFile, reactTemplate(className))
        log(`Generating json file ${jsonFile}`)
        await generateFile(jsonFile, jsonTemplate({comName, className, packageName }))
        const configItemObj = configItem({comName, className, packageName})
        jsonObj.module.push(configItemObj)
        jsonObj.lasttime = dayjs().format('YYYY-MM-DD HH:mm:ss')
        const jsonConfigStr = JSON.stringify(jsonObj)
        log(`Adding ${configJson}`)
        await generateFile(configJson, jsonConfigStr ,false)
        successLog(`${inputStr} component generated success`)

    } catch (e) {
        errorLog(e.message)
    }
    process.stdin.emit('end')
})
process.stdin.on('end', () => {
    log('exit')
    process.exit()
})
