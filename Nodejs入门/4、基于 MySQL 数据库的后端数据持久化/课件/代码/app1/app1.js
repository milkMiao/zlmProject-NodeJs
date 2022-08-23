const Koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const koaBody = require('koa-body');
const nunjucks = require('nunjucks');

nunjucks.configure('templates', {
    autoescape: true,
    watch: true,
    noCache: true
});

let userId = 2;
let users = [
    {
        "id": 1,
        "username": "DaHai"
    },
    {
        "id": 2,
        "username": "zMouse"
    }
];

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


    ctx.body = '添加成功';
})

app.use(router.routes());

app.listen(8888);
