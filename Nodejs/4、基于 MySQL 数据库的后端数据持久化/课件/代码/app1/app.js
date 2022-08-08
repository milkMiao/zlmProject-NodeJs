const Koa = require('koa');
const koaStaticCache = require('koa-static-cache');//静态资源中间件 
const KoaRouter = require('koa-router');
const koaBody = require('koa-body');
const nunjucks = require('nunjucks');//模版引擎
const mysql = require('mysql2/promise');

//模版引擎配置
nunjucks.configure('templates', {
    autoescape: true,
    watch: true,
    noCache: true
});

const app = new Koa();

// 只要有请求，则通过koaStaticCache进行处理
// 静态代理
app.use(koaStaticCache({
    prefix: '/public',//如果当前请求的url是以/public开始，则作为静态资源请求
    dir: './public', //服务器上存放静态资源的目录
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
router.get('/users', async (ctx, next) => {
    let {gender, age, page} = ctx.request.query;

    let where = '';
    let prepared = [];

    if (gender) {
        where = ' where `gender`=?';
        prepared.push(gender);
    }

    if (age) {
        age = Number(age);
        where += where ? ' and `age`<?' : ' where `age`<?';
        prepared.push(age);
    }


    // let users = [];

    // query 的返回值取决于执行的 sql 语句的类型：insert，select...
    /*
    * [ [], [] ]
    * 第一个数据：查询出来的所有的数据的集合
    *   集合中的数据被包装成了一个对象 TextRow ，和普通对象没有太大的区别
    * 第二个数组是执行该sql对应的查询信息
    * */
    // let sql = "SELECT `id`,`username`,`age`,`gender` FROM `users`" + where + ' order by `age` asc, `id` desc limit 2 offset 1';
    // let sql = "select `id`, `username`, `age`, `gender` from `users` limit 2 offset 1";
    // let sql = "select `id`, `username`, `age`, `gender` from `users` limit 1,2";
    // let sql = "select `id`, `username`, `age`, `gender` from `users`";

    // 分页
    // 每页显示的条数
    let limit = 2;
    page = page || 1;
    // 起始查询条数
    let offset = (page - 1) * limit;

    // 查询所有的数据总数，并计算出总的页数
    let sql = "select count(`id`) as `count` from `users`";
    let [[{count}]] = await connection.query(sql);
    // console.log(count)
    let pages = Math.ceil(count / limit);
    // console.log(pages)

    sql = "select `id`, `username`, `age`, `gender` from `users` limit ? offset ?";
    prepared = [limit, offset];

    // console.log(sql, prepared)
    let [users] = await connection.query(
        sql,
        // [] 中的值对应着 sql 语句中的 ？
        prepared
    );

    // console.log(users);

    ctx.body = nunjucks.render('users.html', {
        users,
        page,
        pages,
        limit,
        offset
    });
});

router.get('/add', async (ctx, next) => {
    ctx.body = nunjucks.render('add.html');
});

router.post('/add', koaBody(), async (ctx, next) => {
    let {username, age, gender} = ctx.request.body;

    // 向数据库中插入数据
    /**
     * 如果 query 执行的 insert into ，那么返回值是一个数组
     * 数组中的第一个值是一个对象 （ResultSetHeader）
     *  affectedRows: 插入的数据条数
     *  insertId：插入的数据当前的自增ID
     */
    let [{affectedRows, insertId}] = await connection.query(
        "insert into `users` (`username`, `age`, `gender`) values (?, ?, ?)",
        // 下面数组中的每一个值对应替换sql语句中每一个？
        [username, age, gender]
    )


    // console.log(res);

    ctx.set('Content-Type', 'text/html;charset=utf-8');
    ctx.body = '添加成功 <br> <a href="/add">继续添加</a> <br> <a href="/users">返回用户列表页面</a>';
})

router.get('/edit', async (ctx, next) => {
    let {id} = ctx.request.query;

    let sql = "select * from `users` where `id`=? limit 1";
    let [[user]] = await connection.query(sql, [id]);

    // console.log(user)

    ctx.body = nunjucks.render('edit.html', {
        user
    });
})

router.post('/edit', koaBody(), async (ctx, next) => {
    // let {id} = ctx.request.query;
    let {id, username, age, gender} = ctx.request.body;

    // console.log(id)

    let sql = "update `users` set `username`=?, `age`=?, `gender`=? where `id`=?";
    let res = await connection.query(sql, [username, age, gender, id]);

    console.log(res);

    ctx.set('Content-Type', 'text/html;charset=utf-8');
    ctx.body = `编辑成功 <br> <a href="/edit?id=${id}">继续编辑</a> <br> <a href="/users">返回用户列表页面</a>`;
})

router.get('/delete', async (ctx, next) => {
    let {id} = ctx.request.query;

    let sql = "delete from `users` where `id`=?";
    let res = await connection.query(sql, [id]);

    console.log(res);

    ctx.set('Content-Type', 'text/html;charset=utf-8');
    ctx.body =`删除成功 <br> <a href="/users">返回用户列表页面</a>`;
})

app.use(router.routes());

app.listen(8888);
