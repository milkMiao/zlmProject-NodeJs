const koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const koaRouter = require('koa-router');
const koaBody = require('koa-body');

const config = require('./config');
const databaseMiddleware = require('./middlewares/database');
const tplMiddleware = require('./middlewares/tempalte');
const userMiddleware = require('./middlewares/user');
const authMiddleware = require('./middlewares/auth');//校验用户-授权

const server= new koa();
const router = new koaRouter();

// cookie sign key
server.keys = config.user.cookieSignKey;

//静态资源代理
server.use(koaStaticCache(config.static));

// 用户
server.use(userMiddleware());

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
        user: ctx.state.user,
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
    let categoryService = ctx.state.services.category;
    let categories = await categoryService.getCategories();

    ctx.render('signup.html', {
        user: ctx.state.user,
        categories
    }) 
});
//注册提交处理页面
router.post('/signup', koaBody(), async (ctx, next)=>{
    let {username, password,repassword} = ctx.request.body;
    console.log("注册：", ctx.request.body)

    let categoryService = ctx.state.services.category;
    let categories = await categoryService.getCategories();

    if(!username || !password || !repassword){
        return ctx.render('message.html',{
            user: ctx.state.user,
            categories,
            message: '注册失败',
            reasons: ['注册信息填写不正确！'],
            url:'javascript: window.history.back();'
        });
    }
    if(password !== repassword){
        return ctx.render('message.html',{
            user: ctx.state.user,
            categories,
            message: '注册失败',
            reasons: ['两次输入密码不一致～'],
            url:'javascript: window.history.back();'
        });
    }

    let userService = ctx.state.services.user;
    let user = await userService.getUserByUsername(username);
    console.log('注册提交---user:', user)

    if (user) {
        return ctx.render('message.html', {
            user: ctx.state.user,
            categories,
            message: '注册失败',
            reasons: ['用户名已经被注册了'],
            url: 'javascript:window.history.back();'
        })
    }

    //注册处理
    let loginUser = await userService.signup(username, password);
    console.log("注册处理：", loginUser)

    if (!loginUser) {
        return ctx.render('message.html', {
            user: ctx.state.user,
            categories,
            message: '注册失败',
            reasons: [''],
            url: 'javascript:window.history.back();'
        })
    }

    ctx.render('message.html', {
        user: ctx.state.user,
        categories,
        message: '注册成功',
        url: '/signin'
    });
});
//登陆页面
router.get('/signin', async (ctx, next)=>{
    let categoryService = ctx.state.services.category;
    let categories = await categoryService.getCategories();

    ctx.render('signin.html', {
        user: ctx.state.user,
        categories,
    }) 
});
//登陆提交页面
router.post('/signin', koaBody(), async (ctx, next)=>{
    let { username, password } = ctx.request.body;

    let categoryService = ctx.state.services.category;
    let categories = await categoryService.getCategories();

    if (!username || !password) {
        return ctx.render('message.html', {
            user: ctx.state.user,
            categories,
            message: '登录失败',
            reasons: ['登录信息填写不正确'],
            url: 'javascript:window.history.back();'
        })
    }

    let userService = ctx.state.services.user;
    let user = await userService.getUserByUsername(username);

    // 验证密码是否一致
    if (!user || user.password != password) {
        return ctx.render('message.html', {
            user: ctx.state.user,
            categories,
            message: '登录失败',
            reasons: ['用户不存在', '密码错误'],
            url: 'javascript:window.history.back()'
        })
    }
    
    //登陆签名
    ctx.cookies.set('user', JSON.stringify({
        id: user.id,
        username: user.username
    }), {
        signed: true
    });

    ctx.render('message.html', {
        user: ctx.state.user,
        categories,
        message: '登录成功',
        url: '/'
    })
});
//个人中心页面
router.get('/user',authMiddleware(), async (ctx, next)=>{
    let categoryService = ctx.state.services.category;
    let categories = await categoryService.getCategories();

    let userService = ctx.state.services.user;
    let user = await userService.getUserByUsername(ctx.state.user.username);
    // console.log("个人中心页面user:", user)
    // console.log("ctx.state.user:", ctx.state.user)
    
    ctx.render('user.html', {
        user: { ...ctx.state.user, avatar: user.avatar , sex: user.sex},
        categories
    })
});
//个人中心--上传头像
router.post('/avatar', koaBody({
    multipart: true,
    formidable: {
        uploadDir: './public/avatar',
        keepExtensions: true
    }
}), async (ctx, next) => {
    let avatar = ctx.request.files.avatar;
    let userService = ctx.state.services.user;

    //头像路径截取处理
    let index = null, path =''
    if(avatar.filepath){
        index = avatar.filepath.indexOf('public')//从public开始截取
        path = avatar.filepath.substring(index)
    }
    console.log('头像1', index, path)
    let rs = await userService.postAvatar(ctx.state.user.id, path);

    ctx.redirect('/user');
});
//商品详情页——评论提交 [authMiddleware 登陆的权限]
router.post('/comment', authMiddleware(), koaBody(), async (ctx, next) => {
    let { itemId, content } = ctx.request.body;
    console.log('123', ctx.request.body);

    let categoryService = ctx.state.services.category;
    let categories = await categoryService.getCategories();

    if (!content) {
        return ctx.render('message.html', {
            user: ctx.state.user,
            categories,
            message: '评论失败',
            reasons: ['评论内容不能为空'],
            url: 'javascript:window.history.back()'
        })
    }

    let commentService = ctx.state.services.comment;
    let commentId = await commentService.postComment(itemId, ctx.state.user.id, content);
    console.log('评论提交', commentId)

    return ctx.render('message.html', {
        user: ctx.state.user,
        categories,
        message: '评论成功',
        reasons: [''],
        url: `/detail/${itemId}`
    })
});
server.use(router.routes());

server.listen(config.server.port, ()=>{
    console.log(`服务启动成功：http://localhost:${config.server.port}`);
});
