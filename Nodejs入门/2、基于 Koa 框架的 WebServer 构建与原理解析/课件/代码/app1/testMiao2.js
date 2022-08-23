/**
 * 基于Koa框架的webServe的创建-异步
*/
const koa = require('koa')
const app = new koa();

//模拟用户登陆数据
let user= { id:1 , username: '张三'}

//注册中间件--异步 async await
app.use(async (ctx , next)=>{
    console.log("中间件1——————————1");
    if(!user){
        ctx.body = "没有权限"  //等价 ctx.response.body
    } else{
        await next();  
        ctx.body = `<h1>大海与小蕊的照片</h1>`
    }
});
app.use((ctx,next)=>{
    console.log("中间件1——————————2");
    //读取数据库（异步）
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            ctx.body = '大海与小蕊的照片2';
            resolve(); // reject()
        },1000)
    });
});

app.listen(8888);

