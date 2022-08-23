#!/usr/bin/env node
// Command : 类，我们需要实例化给类，通过给实例化对象来完成我们对当前程序的信息解析和处理（CLI）
const { Command } = require('commander');
const packageJson = require('./package.json')
const fs = require('fs')
const chalk = require('chalk');
const validateNpmProjectName = require('validate-npm-package-name')
const inquirer = require('inquirer');
const execa = require('execa')
const open = require("open")


const program = new Command();
// const { program } = require('commander');

program.version(packageJson.version);
// 设置命令解析的选项信息
program.option('-p,--port [port]', '端口');

// 设置参数
// create-web-server app -p 9999
program.argument('[web-server-name]', 'web server 的名称，英文、数字、_组成');

// 执行动作，参数是一一对应的，选项会集中解析到对象，
program.action(async (webServerName, opts) => {
    // console.log(`程序开始运行`, a, opts)

    const promptOptions = [];

    promptOptions.push({
        type: "input",
        name: "serverName",
        message: "请输入应用名称",
        default: "app",
    });
    promptOptions.push({
        type: "input",
        name: "serverPort",
        message: "请输入应用端口",
        default: 8888,
    });
    promptOptions.push({
        type: "checkbox",
        name: "middlewares",
        message: "请选择要安装的中间件",
        choices: ['koa-static-cache', 'koa-router', 'koa-body'],
        default: ['koa-static-cache', 'koa-router'],
    });

    if (!webServerName) {
        // console.log(`不存在`);
    }

    const answer = await inquirer.prompt(promptOptions, {
        serverName: webServerName,
        serverPort: opts.port,
    });

    // 整合所有来源的用户输入和选择
    const options = {
        serverName: answer.serverName,
        serverPort: answer.serverPort,
        rootDirectory: process.cwd() + `/${answer.serverName}`,
        dependencies: ['nodemon', 'koa', ...answer.middlewares]
    }


    if (validateNpmProjectName(options.serverName).errors?.length) {
        console.error(chalk.red(`无效的项目名称：${options.serverName}`))
        process.exit(1);
    }

    try {
        fs.mkdirSync(options.serverName);
    } catch (e) {
        console.error(chalk.red.bgWhite(`${options.serverName} 已经存在了`))
        process.exit(1);
    }

    const cmd = `npm init -y`;
    execa.commandSync(cmd, {
        cwd: options.rootDirectory,
        stdio: ["ignore", "ignore", "ignore"],
    });

    // 安装依赖
    const dependeniesCmd = `npm install ${options.dependencies.join(' ')}`

    execa.commandSync(dependeniesCmd, {
        cwd: options.rootDirectory,
        stdio: ["inherit", "inherit", "inherit"],
    });

    // 生成入口文件
    const content = `
const minimist = require('minimist');
const Koa = require('koa');

const argv = minimist(process.argv.slice(2));

const app = new Koa();

app.use((ctx, next) => {
    ctx.body = 'Hello';
});

app.listen(argv.port, () => {
    console.log(\`服务启动成功：http://localhost:\${argv.port}\`);
});
`;
    const entryFile = options.rootDirectory + "/app.js";
    fs.writeFileSync(entryFile, content, {
        encoding: "utf-8",
    });

    // 打开浏览器
    await open(`http://localhost:${options.serverPort}`);

    // 启动应用
    const runCmd = `nodemon app.js --port=${options.serverPort}`;
    execa.commandSync(runCmd, {
        cwd: options.rootDirectory,
        stdio: ["inherit", "inherit", "inherit"],
    });


});


// 开始解析
program.parse();






