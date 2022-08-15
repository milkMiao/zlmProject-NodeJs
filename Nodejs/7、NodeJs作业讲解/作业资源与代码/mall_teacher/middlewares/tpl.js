const nunjucks = require('nunjucks');

module.exports = (config) => {
    return async (ctx, next) => {
        let tpl = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(config.dir),
            {
                noCache: true
            }
        );
        ctx.render = (...args) => {
            ctx.body = tpl.render(...args);
        }
        await next();
    }
}