//模版引擎---中间件
const nunjucks = require('nunjucks'); //模版引擎【Node，浏览器中做模版引擎都可】

module.exports = (config) =>{
    return async (ctx, next) =>{
        let tpl = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(config.dir),
            {
                noCache : true
            }
        );
        ctx.render = (...args)=>{
            ctx.body = tpl.render(...args)
        };
        await next();
    }
}