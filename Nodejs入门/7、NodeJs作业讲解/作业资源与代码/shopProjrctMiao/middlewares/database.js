//数据库---中间件
const mysql = require('mysql2/promise');
const getCategoryServices = require('../services/category') //数据库表的服务services（Tab分类获取）
const getItemsServices = require('../services/item') //获取某个Tab分类，下的全部商品信息
const getCommentServices = require('../services/comment') //商品详情--评价
const getUserServices = require('../services/user') //用户信息（哪个用户评价的）

let db;
let services;
module.exports = (config) =>{
    return async (ctx,next) =>{
        /**
         * 避免每次请求都执行这个中间件时候--都链接一下数据库，这样后果不堪设想，
         * 所以增加判断，控制一下；
        **/
        if(!db){
            db = await mysql.createConnection(config);
            services = { //映射到-数据库表的服务
                category: getCategoryServices(db),//Tab分类(如：手机，电视，电脑)；【对应数据库：categories】
                item: getItemsServices(db), //某个Tab对应的具体商品集合；【对应数据库：items】
                comment: getCommentServices(db), //商品详情评价；【对应数据库：comments】
                user: getUserServices(db),   // 【对应数据库：users】
            }
        }
        ctx.state.db = db;
        ctx.state.services = services;
        
        await next();
    }
}