const koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const koaBody = require('koa-body');
const nunjucks = require('nunjucks');
const fs = require('fs')
// const mysql = require('mysql2');

//模版引擎配置
nunjucks.configure('templates', {
    autoescape: true,
    watch: true,
    noCache: true
})

const app = new koa();
// let userId = 2;
// let users=[
//     {id:1, username:'章三',age:23},
//     {id:2, username:'里斯',age:26}
// ]

// 简单文本持久化数据：
//     对于少量的、结构简单且没有太多复杂操作需求的数据，我们可以使用类似 xml、json、yml……等，格式存储在一个文本文件中。

// 从外部文件系统中读取数据
// node.js中，如果使用 require 导入的是一个json格式的数据 JSON.parse ，node会自动的把该数据转成对象
let users = require('./data/users.json');
let userId = 0;
if (users.length > 0) {
    userId = users[users.length - 1].id;
}

//静态代理
app.use(koaStaticCache({
    prefix: '/public',
    dir: './public',
    dynamic: true,
    gzip: true
}))

// app.use(async (ctx,next) => {
//     ctx.body = 'Hello World';
//     await next();
// });

//路由
const router = new KoaRouter()
//查询用户列表
router.get('/users', async (ctx,next)=>{
    ctx.body = nunjucks.render('users.html', {
        users
    })
});

// 表单--用户
router.get('/add', async (ctx, next) => {
    ctx.body = nunjucks.render('add.html');
});
// 表单--添加用户 【
// 注意：缺点-当我们在终端停止运行，再次进入终端开启服务，
//      【那么users数据依旧只是默认的两条数据，如何保存Post提交到数据？引入 数据持久化概念】
router.post('/add', koaBody() ,async (ctx, next) => {
    // 将定义的数据-如users 提取到一个文件内--users.json
    let {username, age} = ctx.request.body;
    console.log("post/add______", ctx.request.body)
    users.push({
        id: ++userId,
        username,
        age
    })
    // 简单文本持久化数据：将新增的数据保存在users.json内，存起来;
    // 注意：如果对该数据进行操作，排序，增删改查等复杂的问题？就不是很友好了
    fs.writeFileSync('./data/users.json', JSON.parse(users))
    ctx.set('Content-Type', 'text/html;charset=utf-8');
    ctx.body = '添加成功';
});

app.use(router.routes());

app.listen(8888);