const mysql = require('mysql2/promise');
const getCategoryService = require('../services/category');
const getItemService = require('../services/item');
const getUserService = require('../services/user');
const getCommentService = require('../services/comment');

let db;
let services;

module.exports = (config) => {
    return async (ctx, next) => {
        // 避免每次请求执行这个中间件的时候，都链接一下数据库
        if (!db) {
            db = await mysql.createConnection(config);
            services = {
                category: getCategoryService(db),
                item: getItemService(db),
                user: getUserService(db),
                comment: getCommentService(db),
            }
        }

        ctx.state.db = db;
        ctx.state.services = services;

        await next();
    }

}