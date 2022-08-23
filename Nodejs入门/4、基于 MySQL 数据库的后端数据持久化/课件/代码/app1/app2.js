const Koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const koaBody = require('koa-body');
const nunjucks = require('nunjucks');
const fs = require('fs');

nunjucks.configure('templates', {
    autoescape: true,
    watch: true,
    noCache: true
});

// let userId = 2;
// let users = [
//     {
//         "id": 1,
//         "username": "DaHai"
//     },
//     {
//         "id": 2,
//         "username": "zMouse"
//     }
// ];

// 从外部文件系统中读取数据
// node.js中，如果使用 require 导入的是一个json格式的数据，node会自动的把该数据转成对象
let users = require('./data/users.json');
let userId = 0;

if (users.length > 0) {
    userId = users[users.length - 1].id;
}

// console.log(users, userId);


const app = new Koa();



// 静态代理
app.use(koaStaticCache({
    prefix: '/public',
    dir: './public',
    dynamic: true,
    gzip: true
}));


// 路由
const router = new KoaRouter();


router.get('/users', async (ctx, next) => {

    ctx.body = nunjucks.render('users.html', {
        users
    });
});

router.get('/add', async (ctx, next) => {
    ctx.body = nunjucks.render('add.html');
});

router.post('/add', koaBody(), async (ctx, next) => {
    let {username} = ctx.request.body;

    users.push({
        id: ++userId,
        username
    });

    fs.writeFileSync('./data/users.json', JSON.stringify(users));


    ctx.body = '添加成功';
})

app.use(router.routes());

app.listen(8888);
