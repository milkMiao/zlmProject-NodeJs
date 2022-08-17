#!/usr/bin/env node
// 第一行作用：指定解释器类型 【bin文件夹-作为入口】
// console.log('全局Cli 666');

//定制【命令行】界面，如终端输入kkb，回车就能看到命令行的一些信息！！！
// shell脚本

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
    .action(require('../lib/refresh'))
program
    .command('serve')
    .description('serve')
    .action(require('../lib/serve'))
program.parse(process.argv) //必不可少的一步