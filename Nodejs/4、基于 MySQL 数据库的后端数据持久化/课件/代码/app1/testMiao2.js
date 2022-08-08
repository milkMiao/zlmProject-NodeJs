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
router.get('/users', async (ctx,next)=>{
    // query 的返回值取决于执行的 sql 语句的类型：insert，select...
    /*
    * [ [], [] ]
    * 第一个数据：查询出来的所有的数据的集合,集合中的数据被包装成了一个对象 TextRow ，和普通对象没有太大的区别
    * 第二个数组：是执行该sql对应的查询信息
    * 例如：[ TextRow { id: 6, username: '里斯' },TextRow { id: 7, username: '章三' } ]
    * */
    let [users] = await connection.query(
        "SELECT * FROM `kkb-db-nodejs`.users;"
    );
    console.log("res____", users) //[ TextRow { id: 6, username: '里斯' },TextRow { id: 7, username: '章三' } ]
  
    ctx.body = nunjucks.render('users.html', {
        users
    })
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
        //方法一：
        // "insert into `users`(`username`) values("+username+") " //values变量值填充数据

        //方法二：
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