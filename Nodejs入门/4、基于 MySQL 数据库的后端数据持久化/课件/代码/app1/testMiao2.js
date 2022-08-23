const koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const koaBody = require('koa-body');
const nunjucks = require('nunjucks');
const mysql = require('mysql2/promise'); //node中使用mysql的promise版本
// 使用mySql进行数据持久化 【MySql，Oracle，MSSQL，Redis，MongoDB，SQLLite，等等】

//模版引擎配置
nunjucks.configure('templates', {
    autoescape: true,
    watch: true,
    noCache: true
})


const app = new koa();

//静态代理
app.use(koaStaticCache({
    prefix: '/public',
    dir: './public',
    dynamic: true,
    gzip: true
}))

//连接数据库
let connection = null;
app.use(async (ctx,next)=>{
    if(!connection){
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345678',
            database: 'kkb-db-nodejs' //具体链接的哪个数据库
        });
    }
    await next();
})

//路由
const router = new KoaRouter();

//查询数据库数据:
// query 的返回值取决于执行的 sql 语句的类型：insert，select...
/*
* [ [], [] ]
* 第一个数据：查询出来的所有的数据的集合,集合中的数据被包装成了一个对象 TextRow ，和普通对象没有太大的区别
* 第二个数组：是执行该sql对应的查询信息
* 例如：[ TextRow { id: 6, username: '里斯' },TextRow { id: 7, username: '章三' } ]
* */

router.get('/users', async (ctx,next)=>{
    let {gender, age, page} = ctx.request.query;

    // 分页功能实现
    page = page || 1; //当前页
    let limit = 2;  // 每页显示的条数
    let offset = (page - 1) * limit;// 起始查询条数

    let sql = "select count(`id`) as `count` from `users`";// 查询所有的数据总数，并计算出总的页数
    let [[{count}]] = await connection.query(sql);
    let pages = Math.ceil(count / limit); //共分几页展示数据

    sql = "select `id`, `username`, `age`, `gender` from `users` limit ? offset ?"; //从offset起，查询limit条数据
    console.log(count)
    console.log(pages)
    let [users] = await connection.query(
        sql,
        [limit, offset]  // [] 中的值对应着 sql 语句中的 ？
    );

    // console.log(users);

    //方法一：其中 *表示通配符，能查询所有的字段，不建议使用
    // let [users] = await connection.query(
    //     "SELECT * FROM `kkb-db-nodejs`.users;" 
    // );
    // console.log("res____1", users)
    
    //方法二：http://localhost:8888/users?gender=男&age=20
    // let [users] = await connection.query(
    //     // http://localhost:8888/users?gender=男&age=10
    //     //排序：desc降序，asc升序 
    //     //数据查询限制 limit 1 offset 2  只能查一条数据，从第二条数据后开始

    //     // "SELECT `id`,`username`, `age`, `gender` FROM `users` where `gender`='男' " 
    //     "SELECT `id`,`username`, `age`, `gender` FROM `users` where `gender`=? and `age`>=? order by `id` desc  ", //预处理操作
    //     [gender, age] //数组中的值对应该sql语句中的?
    // )
    console.log('res____users2', users)
    ctx.body = nunjucks.render('users.html', {
        users,
        page,
        pages,
        limit,
        offset
    })
})

//查询具体数据
router.get('/edit', async (ctx, next) => {
    let {id} = ctx.request.query;

    let sql = "select * from `users` where `id`=? limit 1";
    let [[user]] = await connection.query(sql, [id]);

    console.log("查看数据 edit-get",user)

    ctx.body = nunjucks.render('edit.html', {
        user
    });
})
//更新数据（编辑）
router.post('/edit', koaBody(), async (ctx, next) => {
    // let {id} = ctx.request.query;
    let {id, username, age, gender} = ctx.request.body;

    console.log("更新数据 edit-post",id)

    let sql = "update `users` set `username`=?, `age`=?, `gender`=? where `id`=?";
    let res = await connection.query(sql, [username, age, gender, id]);

    console.log(res);

    ctx.set('Content-Type', 'text/html;charset=utf-8');
    ctx.body = `编辑成功 <br> <a href="/edit?id=${id}">继续编辑</a> <br> <a href="/users">返回用户列表页面</a>`;
})

//删除数据
router.get('/delete', async (ctx,netx)=>{
    let {id} = ctx.request.query;

    let sql = "delete from `users` where `id`=?";
    let res = await connection.query(sql, [id]);

    console.log("删除——————", res)
    ctx.set('Content-Type', 'text/html;charset=utf-8')
    ctx.body = `删除成功 <br> <a href="/users">返回用户列表页面</a>`;
})


router.get('/add', async (ctx, next) => {
    ctx.body = nunjucks.render('add.html');
});

/**
 * 如果query执行的是insert into，那么返回值就是一个数组：包含两项
 * 1、数组中的第一个值的一个对象 ResultSetHeader
 * [
        ResultSetHeader {
            fieldCount: 0,
            affectedRows: 1, //插入的数据条数
            insertId: 10,    //插入的数据当前的自增ID
            info: '',
            serverStatus: 2,
            warningStatus: 0
        },
        undefined
    ]
    * */ 
//向数据库插入数据
router.post('/add', koaBody() ,async (ctx, next) => {
    let {username, age, gender} = ctx.request.body;
    console.log("post/add______", ctx.request.body)

    let res = await connection.query(
        //方法一：插入数据
        // "insert into `users`(`username`) values("+username+") " //values变量值填充数据

        //方法二：插入数据
        // ?表示 数组中的每一个值，对应替换sql语句中每一个?
        "insert into `users`(`username`, `age`, `gender`) values(?, ?, ?) ", //预处理
        [username, age, gender]
    )
    console.log('res____add', res)

    ctx.set('Content-Type', 'text/html;charset=utf-8');
    ctx.body = '添加成功 <br> <a href="/add">继续添加</a> <br> <a href="/users">返回用户列表页面</a>';
});
app.use(router.routes())

app.listen(8888)