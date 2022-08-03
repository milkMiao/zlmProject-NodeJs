//中间件实现---静态and动态
const koa = require('koa');
const static = require('./middlewares/staticMiao')
const router = require('./middlewares/router')

const app = new koa();

//静态资源中间件--复用，见 middlewares/staticMiao 文件编码!!!
app.use(
    static({prefix: '/public'})
)

//动态资源路由中间件---见 middlewares/router 文件编码!!!
app.use(router())

app.listen(8888);
