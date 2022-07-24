// require koa
const Koa = require('koa');

// 初始化一个 koa 对象（Application）
const app = new Koa();


// 注册中间件
app.use((ctx) => {
    console.log('中间件 - 1');

    ctx.body = '这是返回的内容1';
});

app.use((ctx) => {
    console.log('中间件 - 2');

    ctx.body = '这是返回的内容2';
});

// 使用 app 对象来创建一个 webserver
/**
 * http.createServer((req, res) => {})
 *
 * (new Http.Server().on('request', (req, res) => {}))
 */
app.listen(8888);
