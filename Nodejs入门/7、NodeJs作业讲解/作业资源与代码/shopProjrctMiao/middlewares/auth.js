module.exports = () => {
    return async (ctx, next) => {
        if (!ctx.state.user || ctx.state.user.id < 1) {
            ctx.redirect('/signin');
            return;
        }
        await next();
    }
}