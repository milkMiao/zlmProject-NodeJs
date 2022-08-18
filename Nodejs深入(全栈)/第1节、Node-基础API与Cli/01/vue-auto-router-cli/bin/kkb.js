#!/usr/bin/env node
// 第一行作用：#指定脚本解释器为node 【bin文件夹-作为入口】
// console.log('全局Cli 666');

//定制【命令行】界面，如终端输入kkb，回车就能看到命令行的一些信息！！！
// shell脚本

// # 将npm 模块链接到对应的运行项目中去
// npm link

const program = require('commander')
program.version(require('../package').version)//版本号
program
    .command('init <name>')
    .description('init project')
    .action(
        require('../lib/init')
    )
program
    .command('refresh')
    .description('refresh routers...')
    .action(require('../lib/refresh'))//引入lib/refresh文件【自编码】 执行kkb refresh看菜单是否能出来？
program
    .command('serve')
    .description('serve')
    .action(require('../lib/serve'))
program.parse(process.argv) //必不可少的一步