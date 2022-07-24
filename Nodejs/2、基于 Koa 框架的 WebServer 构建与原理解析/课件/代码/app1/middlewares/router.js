module.exports = function() {

    return async function (ctx, next) {

        console.log('动态路由处理') ;

        ctx.body = '登录';

        await next();
    }
}
