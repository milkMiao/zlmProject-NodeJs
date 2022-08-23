//中间件实现---静态and动态资源中间件---npm安装使用
// nunjucks 模版引擎 参考链接：https://nunjucks.bootcss.com/getting-started.html
const koa = require('koa');
const koaStaticCache = require('koa-static-cache');// npm i koa-static-cache
const KoaRouter = require('koa-router'); // npm i koa-router
const koaBody = require('koa-body'); // npm i koa-body
const nunjucks = require('nunjucks'); // npm i nunjucks 模版引擎！！！【数据和模版直接进行结合】
const fs = require('fs')

//自定义的中间件
// const static = require('./middlewares/staticMiao')
// const router = require('./middlewares/router')

//使用 nunjucks 模版引擎，来渲染数据
//nunjucks 脚本设置
nunjucks.configure('templates', { autoescape: true, watch: true, noCache: true }); 

// let str= nunjucks.renderString('<h1>{{username}}</h1>', {username: '渣渣辉'})
// console.log(str)

let maxUserId = 2;
let users = [
    {id: 1, username: 'haizi'},
    {id: 2, username: 'zMouse'}
]

//npm内的中间件插件
const app = new koa();
//1、静态资源--【静态文件代理】
app.use(koaStaticCache({
    prefix: '/static',
    dir: './public',
    dynamic: true,
    gzip: true
}));


//2、动态资源--Get,Post
let router = new KoaRouter();
router.get('/', async (ctx, next) => {
    ctx.body = '首页';
});

//nunjucks 模版引擎的使用
router.get('/users', async (ctx, next) => {
    // let str = users.map(user => {
    //     return `
    //         <li>${user.username}</li>
    //     `
    // }).join('');

    // html内容--抽离到模版里， nunjucks 模版引擎的使用
    // users这个数据，直接丢给模版引擎就行了
    // ctx.body = nunjucks.renderString(fs.readFileSync('./templates/users.html').toString(), {users})

    //如上---等价替换：需要添加一下 nunjucks.configure 脚本配置
    ctx.body = nunjucks.render('users.html', {users});
});

router.get('/add', async (ctx, next) => {
    // ctx.body = '用户列表';
    let str = users.map(user => {
        return `
            <li>${user.username}</li>
        `
    }).join('');
    // html内容--抽离到模版里， nunjucks 模版引擎的使用
    // 未使用模版引擎
    ctx.body = `
        <!doctype html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport"
                    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Document</title>
            </head>
            <body>
                <ul>
                    ${str} 
                </ul> 
                <form action="/add" method="post">
                    <p><input type="post"  name="username"/></p>
                    <button>提交</button>
                </form>
            </body>
        </html>
    `;
});

//注意：默认情况下，KoaBody中间件解析提交过来的正文数据，并把解析过的数据转化成对象存储在 ctx.request.body属性里
router.post('/add', koaBody(), async (ctx,next)=>{ // koa-body中间件的使用
    let {username} = ctx.request.body
    users.push({
        id: ++maxUserId,
        username
    })
    ctx.body = '添加成功！'
});

// 注册中间件
app.use( router.routes() );

app.listen(8888);