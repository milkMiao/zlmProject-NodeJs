#!/usr/bin/env node
// Command : 类，我们需要实例化给类，通过给实例化对象来完成我们对当前程序的信息解析和处理（CLI）
const { Command } = require('commander');
const program = new Command();
// const { program } = require('commander');

// 设置命令解析的选项信息
program.option('-v,--version', '查看版本');
program.option('-p,--port [port]', '端口', '8888');

// 执行动作
program.action((opts) => {
    console.log(`程序开始运行`, opts)
    if (opts.version) {
        console.log(`version: 1.0.0`)
    }
});

// 开始解析
program.parse();






