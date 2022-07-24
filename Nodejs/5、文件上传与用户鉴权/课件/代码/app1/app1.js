const Koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
// const koaBody = require('koa-body');
const nunjucks = require('nunjucks');
const mysql = require('mysql2/promise');
const queryString = require('querystring');


// 正文解析中间件
const koaBody = () => {
    return (ctx, next) => {

        return new Promise((resolve, reject) => {
            let data = '';

            // ctx.req => Node.js 中 http 模块的 IncomingMessage 对象
            // data 事件 : 接收数据过程中不断触发
            // chunk : 接收到的二进制buffer数据流
            ctx.req.on('data', async (chunk) => {
                // 把接收到的数据拼接在一起
                data += chunk.toString();
            });

            // end : 数据接收完成触发
            ctx.req.on('end', async () => {
                // ctx.is 是 Koa 中的 Reuqest 对象下封装提供的一个方法，用来验证当前请求中 `Content-Type` 中的值是否为参数中指定的值之一
                // Content-Type: application/json
                // ctx.is(['application/json', 'application/x-www-form-urlencoded']) 返回 application/json
                if (ctx.is('application/json')) {
                    // 对数据进行 JSON 解析
                    ctx.request.body = JSON.parse(data);
                } else if (ctx.is('application/x-www-form-urlencoded')) {
                    // 对数据进行 QueryString+urldecoded 解析
                    ctx.request.body = queryString.parse(data);
                } else {
                    // 如果没有满足上述处理，则默认使用原始字符串
                    ctx.request.body = data;
                }
                // 通过上述解析把解析后的结果保存到 ctx.request.body 中，以供后续中间件调用
                // koa-body 中间件的基本原理也是如此

                resolve();
            });
        }).then((res) => {
            return next();
        })

    }
}

nunjucks.configure('templates', {
    autoescape: true,
    watch: true,
    noCache: true
});

const app = new Koa();

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

router.post('/add', koaBody(), async (ctx, next) => {
    console.log('body', ctx.request.body);
    ctx.body = 'user';
});


app.use(router.routes());

app.listen(8888);
