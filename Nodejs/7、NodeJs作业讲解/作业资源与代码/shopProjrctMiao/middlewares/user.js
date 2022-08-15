module.exports = () => {
    return async (ctx, next) => {
        try {
            ctx.state.user = JSON.parse(ctx.cookies.get('user', {
                signed: true
            }));
        } catch (e) { }
        await next();
    }
}