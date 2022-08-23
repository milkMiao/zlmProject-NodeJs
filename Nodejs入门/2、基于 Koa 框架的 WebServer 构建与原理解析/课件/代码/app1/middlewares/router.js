module.exports = function() {

    return async function (ctx, next) {
        console.log('动态路由处理') ;

        ctx.body = '<h1>动态路由处理</h1>';

        await next();
    }
}
