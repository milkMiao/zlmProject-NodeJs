const Koa = require('koa');
const koaStaticCache = require('koa-static-cache'); //静态资源代理服务
const KoaRouter = require('koa-router');//引入路由模块
const koaBody = require('koa-body');
const nunjucks = require('nunjucks');
const mysql = require('mysql2/promise');
const queryString = require('querystring');

nunjucks.configure('templates', { //模版引擎配置
    autoescape: true,
    watch: true,
    noCache: true
});

// Application：当前应用程序对象，即 new Koa() 得到的实例对象，
//              保存了应用全局状态以及其他对象，后面的Context、Reqeust、Response对象都是该对象下的子对象。

// 中间件
// .use(callbakc) callback函数中有2个参数，context和next，
//                每一次请求都会包装一个context对象，每一个中间件都是一个迭代器，需要调用next方法进入下一次迭代；
// 异步中间件，.use(async callback) 就是在callback函数前加一个async关键字，配合callback函数中 await 使用即可；
const app = new Koa();

// 生成签名字符串所使用的秘钥
app.keys = ['kkb'];
//注册中间件函数
app.use(async (ctx, next) => {
    try {
        ctx.state.user = JSON.parse(ctx.cookies.get('user', {
            // 对当前的这个cookie进行签名验证
            // 把当前的cookie 和 app.keys 中存储的秘钥进行一次 hash 运算
            // 然后把计算得到的hash 值和前端发送的hash签名 进行对比，看是否一致
            signed: true
        }));
        ctx.state.user.username = decodeURI(ctx.state.user.username);
        // console.log(ctx.state.user);
    } catch (e) {
        ctx.throw(401, '没有权限');
    }

    await next();
})

//常见中间件如下：
// koa-static-cache：静态文件代理服务
// koa-router：路由
// koa-swig：模版引擎
// koa-bodyparse：body解析
// koa-multer：formData解析

// 静态代理
// 主要有请求，则通过 koaStaticCache 进行处理
app.use(koaStaticCache({
    prefix: '/public', //如果当前请求的url是以 /public开始，则作为静态资源请求
    dir: './public',
    dynamic: true,
    gzip: true
}));

// 数据链接
let connection = null;
app.use(async (ctx, next) => {
    if (!connection) {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345678',
            database: 'kkb-db-nodejs'
        });
    }
    await next();
})


// 路由：创建路由实例对象
const router = new KoaRouter();

// 登录
router.get('/login', async (ctx, next) => {
    ctx.body = nunjucks.render('login.html');
})

router.post('/login', koaBody(), async (ctx, next) => {
    let {username, password} = ctx.request.body;

    // 使用 username 对数据库的 users 表进行查询
    // await 异步请求/查询数据库
    let sql = "select * from `users` where `username`=?";
    let [[user]] = await connection.query(sql, [username]);

    if (!user) {
        return ctx.body = '用户名不存在';
    }
    if (user.password !== password) {
        return ctx.body = '密码错误';
    }

    ctx.cookies.set('user', JSON.stringify({
        id: user.id,
        username: encodeURI(user.username)
    }), {
        // 会根据 app.keys 中设置的秘钥和cookie, 通过hash得到一个hash字符串
        signed: true,
        expires: new Date('2021-12-12'),
        maxAge: 360000
    })

    ctx.set('content-type', 'text/html;charset=utf-8');
    ctx.body = `登陆成功 <a href="/user/${user.id}">进入个人中心</a>`;
})

// 个人中心页面
router.get('/user/:id(\\d+)', async (ctx, next) => {
    if (!ctx.state.user) {
        return ctx.body = '你没有权限';
    }
    // /user/:id =>  动态路由
    let {id} = ctx.request.params;

    // console.log(id)
    let sql = "select * from `users` where `id`=?";
    let [[user]] = await connection.query(sql, [id]);

    if (!user) {
        return ctx.body = '用户不存在';
    }

    ctx.body = nunjucks.render('user.html', {
        user
    });
})

//中间件 koaBody
router.post('/edit', koaBody({
    multipart: true,
    formidable: {
        uploadDir: './public/avatar',
        keepExtensions: true
    }
}), async (ctx, next) => {
    if (!ctx.state.user) {
        return ctx.body = '你没有权限';
    }

    let {id, age, gender} = ctx.request.body;
    let {avatar} = ctx.request.files;
    // console.log(id, age, gender, avatar);

    let sql = "update `users` set `age`=?, `gender`=?";

    let prepared = [age, gender];
    if (avatar) {
        sql += ", `avatar`=?";
        prepared.push(avatar.path);
    }

    sql += " where `id`=?";

    let res = await connection.query(sql, [...prepared, id]);

    ctx.set('content-type', 'text/html;charset=utf-8');
    ctx.body = `修改成功, <a href="/user/${id}">返回个人中心</a>`;
})

//给应用注册指定的路由中间件
app.use(router.routes());

//监听当前电脑的地址以及端口
app.listen(8888);
