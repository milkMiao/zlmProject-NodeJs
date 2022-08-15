const koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const koaRouter = require('koa-router');
const koaBody = require('koa-body');

const config = require('./config');
const databaseMiddleware = require('./middlewares/database');
const tplMiddleware = require('./middlewares/tempalte');
const userMiddleware = require('./middlewares/user');
// const authMiddleware = require('./middlewares/auth');

const server= new koa();
const router = new koaRouter();

// cookie sign key
server.keys = config.user.cookieSignKey;

//静态资源代理
server.use(koaStaticCache(config.static));

// 用户
server.use(userMiddleware());
//权限
// server.use(authMiddleware());

//数据库中间件
server.use(databaseMiddleware(config.database));

//模版引擎中间件
server.use(tplMiddleware(config.tempalte));

//路由
//首页
router.get('/', async (ctx, next)=>{
    //获取Tab分类信息 middlewares/database内，ctx.state.services的设置
    let categoryService = ctx.state.services.category;
    //获取具体Tab分类信息--下的商品
    let itemService = ctx.state.services.item;

    let categories = await categoryService.getCategories();//Tab分类信息
    let categoryItems = []; //结构如：[ {categoryId:1, categoryName:'', items:[]} , {}, {} ...]

    for(let i=0; i< categories.length; i++){
        let category = categories[i];
        let {items} = await itemService.getItems(category.id)
        categoryItems.push({
            categoryId: category.id,
            categoryName: category.name,
            items
        })
    }

    // console.log("获取Tab分类信息_categories", categories);
    // console.log("获取某个Tab分类商品_categoryItems", categoryItems)
    ctx.render('index.html', {
        categories,
        categoryItems
    })
});
//列表页面
router.get('/list/:categoryId', async (ctx, next)=>{
    let { categoryId } = ctx.params;
    let { page, limit } = ctx.query;
    categoryId = Number(categoryId);
    page = Number(page) || 1;
    limit = Number(limit) || 4;

    let categoryService = ctx.state.services.category;
    let categories = await categoryService.getCategories();

    let category = categories.find(c => c.id == categoryId);

    let itemService = ctx.state.services.item;

    let items = await itemService.getItems(categoryId, page, limit);

    ctx.render('list.html', {
        user: ctx.state.user,
        categories,
        category,
        items
    }) 
});
//详情页面
router.get('/detail/:itemId', async (ctx, next)=>{
    let { itemId } = ctx.params;
    let { page, limit } = ctx.query;
    itemId = Number(itemId);
    page = Number(page) || 1;
    limit = Number(limit) || 4;

    //Tab具体分类
    let categoryService = ctx.state.services.category;
    let categories = await categoryService.getCategories();

    //某个具体Tab对应的商品集合
    let itemService = ctx.state.services.item;
    let item = await itemService.getItem(itemId);
    let category = categories.find(c => c.id == item.categoryId);

    //商品详情-评价
    let commentService = ctx.state.services.comment;
    let commentsObj = await commentService.getComments(item.id, page, limit);
    
    commentsObj.comments = commentsObj.comments.map(comment => {
        let d = new Date(comment.createdAt);
        return {
            ...comment,
            createAtByDate: `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
        }
    })
    console.log("评价：", commentsObj)
    console.log('user', ctx.state.user)
    ctx.render('detail.html', {
        user: ctx.state.user,
        categories,
        category,
        item,
        commentsObj
    })
});
//注册页面
router.get('/signup', async (ctx, next)=>{

});
//注册提交处理页面
router.post('/signup', async (ctx, next)=>{

});
//登陆页面
router.get('/signin', async (ctx, next)=>{

});
//登陆提交页面
router.post('/signin', async (ctx, next)=>{

});
//个人中心页面
router.get('/user', async (ctx, next)=>{

});
//个人中心--上传头像
router.post('/avatar', async (ctx, next)=>{

});
//评论
router.post('/comment', async (ctx, next)=>{

});
server.use(router.routes());

server.listen(config.server.port, ()=>{
    console.log(`服务启动成功：http://localhost:${config.server.port}`);
});
