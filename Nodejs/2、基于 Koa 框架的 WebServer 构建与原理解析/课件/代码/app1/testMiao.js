/**
 * 基于Koa框架的webServe的创建--多个中间件执行问题
*/
const koa = require('koa')
const app = new koa(); //初始化一个Koa对象(Application)

//注册中间件，其中--- ctx表示：上下文对象
// fn1(){ fn2(){ fn3()... } }  外层越靠近公共逻辑处理，越里层越接近细致的逻辑处理
// use中间件：使用的是Promise封装的，下面介绍一下异步中间件！！！
app.use((ctx,next)=>{
    console.log("中间件1——————————1后续业务逻辑代码均在此处理");
    ctx.body = "这是返回的内容1"  //等价 ctx.response.body

    next();
})
//再注册一个中间件2和3
app.use((ctx, next)=>{
    console.log("中间件——————————2");
    ctx.body = "这是返回的内容2"

    next();
})
app.use((ctx)=>{
    console.log("中间件——————————3");
    ctx.body = "这是返回的内容3"
})
//注意：注册了两个中间件，你会发现只能看见第一个中间件的打印，后续的中间件不做处理～
//     如果想要访问第二个，第三个中间件，怎么处理？----引入洋葱模型

//如上三个中间件执行顺序打印：
// 第一步：中间件1——————————1后续业务逻辑代码均在此处理
// 第二步：中间件——————————2
// 第三步：中间件——————————3


/**
 * 使用app对象创建一个webServer,老方法
 * http.createServer((req, res)=>{})
 * (new Http.Server()).on('require', (eq, res)=>{})
*/
app.listen(8888);

