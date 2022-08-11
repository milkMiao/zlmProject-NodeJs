const koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const koaRouter = require('koa-router');
const koaBody = require('koa-body');

const config = require('./config');
const databaseMiddleware = require('./middlewares/database');
const tplMiddleware = require('./middlewares/tempalte');

const server= new koa();
const router = new koaRouter();

//静态资源代理
server.use(koaStaticCache(config.static));

//数据库中间件
server.use(databaseMiddleware(config.database));

//模版引擎中间件
server.use(tplMiddleware(config.tempalte));

//路由
//首页
router.get('/', async (ctx,next)=>{

});
//列表页面
router.get('/list/:categoryId', async (ctx,next)=>{

});
//详情页面
router.get('/detail/:itemId', async (ctx,next)=>{

});
//注册页面
router.get('/signup', async (ctx,next)=>{

});
//注册提交处理页面
router.post('/signup', async (ctx,next)=>{

});
//登陆页面
router.get('/signin', async (ctx,next)=>{

});
//登陆提交页面
router.post('/signin', async (ctx,next)=>{

});
//个人中心页面
router.get('/user', async (ctx,next)=>{

});
//个人中心--上传头像
router.post('/avatar', async (ctx,next)=>{

});
//评论
router.post('/comment', async (ctx,next)=>{

});
server.use(router.routes());

server.listen(config.server.port, ()=>{
    console.log(`服务启动成功：http://localhost:${config.server.port}`);
});
