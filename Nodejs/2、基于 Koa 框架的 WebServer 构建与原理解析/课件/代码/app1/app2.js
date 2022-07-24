// require koa
const Koa = require('koa');

// 初始化一个 koa 对象（Application）
const app = new Koa();

/**
 * fn1() {fn2() { fn3()}}
 */

// 注册中间件
app.use((ctx, next) => {
    console.log('中间件 - 1');
    ctx.body = ' 11111';

    next();

    ctx.body += ' 11111over';
});
app.use((ctx, next) => {
    console.log('中间件 - 2');
    ctx.body += ' 2222';

    next();

    ctx.body += ' 2222over'
});
app.use((ctx, next) => {
    console.log('中间件 - 3');
    ctx.body += ' 3333';

    next();

    ctx.body += ' 3333over'
});

// 使用 app 对象来创建一个 webserver
/**
 * http.createServer((req, res) => {})
 *
 * (new Http.Server().on('request', (req, res) => {}))
 */
app.listen(8888);
