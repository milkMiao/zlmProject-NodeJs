const Koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const KoaRouter = require('@koa/router');
const koaBody = require('koa-body');
const nunjucks = require('nunjucks');

nunjucks.configure('templates', { autoescape: true, watch: true, noCache: true });

let maxUserId = 2;
let users = [
    {id: 1, username: 'haizi'},
    {id: 2, username: 'zMouse'}
]

const app = new Koa();

app.use(koaStaticCache({
    prefix: '/static',
    dir: './public',
    dynamic: true,
    gzip: true
}));

// 动态资源
let router = new KoaRouter();

router.get('/', async (ctx, next) => {
    ctx.body = '首页';
});

router.get('/users', async (ctx, next) => {
    // let str = users.map(user => {
    //     return `
    //         <li>${user.username}</li>
    //     `
    // }).join('');

    // ctx.body =nunjucks.renderString(fs.readFileSync('./templates/users.html').toString(), {users});

    ctx.body = nunjucks.render('users.html', {users});
});

router.get('/add', async (ctx, next) => {
    // ctx.body = nunjucks.renderString(fs.readFileSync('./templates/add.html').toString(), {});
    ctx.body = nunjucks.render('add.html', {});
});


// 默认情况下，koaBody 中间件会解析提交过来的正文数据，并把解析后的数据转成对象存储到 ctx.request.body 属性中
router.post('/add', koaBody(), async (ctx, next) => {
    // console.log(ctx.request.body);

    let {username} = ctx.request.body;

    users.push({
        id: ++maxUserId,
        username
    });

    ctx.body = '添加成功';
});

app.use(router.routes());


app.listen(8888);
