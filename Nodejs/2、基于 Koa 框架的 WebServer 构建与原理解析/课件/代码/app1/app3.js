// require koa
const Koa = require('koa');

// 初始化一个 koa 对象（Application）
const app = new Koa();

// 模拟用户登录数据
// let user = null;
let user = {id: 1, username: 'zMouse'};

app.use(async (ctx, next) => {
    if (!user) {
        ctx.body = '没有权限';
    } else {
        await next();
        ctx.body = `<h1>${ctx.body}</h1>`;
    }
});
app.use((ctx, next) => {
    // 比如读取数据库（异步）
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            ctx.body = '大海和小蕊的照片';
            resolve(); // or reject()
        }, 1000)
    });
});

// 使用 app 对象来创建一个 webserver
/**
 * http.createServer((req, res) => {})
 *
 * (new Http.Server().on('request', (req, res) => {}))
 */
app.listen(8888);
