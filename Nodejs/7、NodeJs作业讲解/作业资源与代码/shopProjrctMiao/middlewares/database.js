//数据库中间件
// const { createConnection } = require('mysql2');
const mysql = require('mysql2/promise');

let db;
module.exports = (config) =>{
    return async (ctx,neext) =>{
        /**
         * 避免每次请求都执行这个中间件时候--都链接一下数据库，这样后果不堪设想，
         * 所以增加判断，控制一下；
        **/
        if(!db){
            db = await createConnection(config);
        }

    }
}