const Koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const koaBody = require('koa-body');
const nunjucks = require('nunjucks');
const mysql = require('mysql2/promise');
const queryString = require('querystring');




nunjucks.configure('templates', {
    autoescape: true,
    watch: true,
    noCache: true
});

const app = new Koa();

// 生成签名字符串所使用的秘钥
app.keys = ['kkb'];

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
        // ctx.throw(401, '没有权限');
    }

    await next();
})

// 静态代理
app.use(koaStaticCache({
    prefix: '/public',
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
            database: 'kkb-db'
        });
    }

    await next();
})


// 路由
const router = new KoaRouter();


// 登录
router.get('/login', async (ctx, next) => {
    ctx.body = nunjucks.render('login.html');
})

router.post('/login', koaBody(), async (ctx, next) => {
    let {username, password} = ctx.request.body;

    // 使用 username 对数据库的 users 表进行查询
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


app.use(router.routes());

app.listen(8888);
