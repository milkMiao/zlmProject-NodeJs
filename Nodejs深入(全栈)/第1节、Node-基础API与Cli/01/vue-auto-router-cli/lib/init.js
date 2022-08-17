const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk') //命令行染色

const { clone } = require('./download')
//子进程方法，重新封装
const spawn = async (...args) => {
    const { spawn } = require('child_process')//导出原始的spawn方法
    return new Promise(resolve => {
        //1、子进程执行这个方法，输出流对接
        const proc = spawn(...args)
        proc.stdout.pipe(process.stdout)//主进程流
        proc.stderr.pipe(process.stderr)//异常流
        proc.on('close', () => {//进程执行完毕
            resolve()
        })
    })
}
const log = content => console.log(chalk.green(content)) //绿色命令行
module.exports = async name => {
    // 打印欢迎画面
    clear()
    const data = await figlet('KKB Welcome')
    log(data)

    // 创建项目
    log(`🚀创建项目:` + name)
    // 克隆代码
    await clone('github:su37josephxia/vue-template', name)

    //安装依赖 npm i ===》子进程执行shell
    //输出流对接 promise 
    log('安装依赖')
    await spawn('cnpm', ['install'], { cwd: `./${name}` })

    log(`
        👌安装完成：
        To get Start:
        ===========================
            cd ${name}
            npm run serve
        ===========================
    `)

    //自动打开进程 【例如：npm start】
    const open = require('open')
    open('http://localhost:8080')
    await spawn('npm', ['run', 'serve'], { cwd: `./${name}` })
}