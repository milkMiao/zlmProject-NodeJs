//数据库中间件
const mysql = require('mysql2/promise');
const getCategoryServices = require('../services/category') //数据库表的服务services（Tab分类获取）
const getItemsServices = require('../services/item') //获取某个Tab分类，下的全部商品信息

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
                category: getCategoryServices(db),
                item: getItemsServices(db),
            }
        }
        ctx.state.db = db;
        ctx.state.services = services;
        
        await next();
    }
}