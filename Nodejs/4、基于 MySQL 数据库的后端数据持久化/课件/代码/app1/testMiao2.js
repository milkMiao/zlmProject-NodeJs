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
    * */
    let [users] = await connection.query(
        "SELECT * FROM `kkb-db-nodejs`.users;"
    );
    console.log("res____", users)
    //[ TextRow { id: 6, username: '里斯' },TextRow { id: 7, username: '章三' } ]
  
    ctx.body = nunjucks.render('users.html', {
        users
    })
})


router.get('/add', async (ctx, next) => {
    ctx.body = nunjucks.render('add.html');
});
router.post('/add', koaBody() ,async (ctx, next) => {
    let {username, age} = ctx.request.body;
    console.log("post/add______", ctx.request.body)

    ctx.body = '提交数据'
});
app.use(router.routes())

app.listen(8888)