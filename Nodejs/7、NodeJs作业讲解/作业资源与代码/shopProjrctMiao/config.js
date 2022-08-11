//配置文件
module.exports = {
    //服务器相关配置
    server: {
        port: 8888
    },
    //静态文件相关配置
    static: {
        prefix: '/public',
        dir: '/public',
        gzip: true,
        dynamic: true
    },
    //数据库相关配置
    database:{
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '12345678',
        database: 'kkb-mall'
    },

    //模版引擎相关配置
    tempalte:{
        dir: './template'
    },
    //登陆成功--cookie密钥
    user: {
        cookieSignKey: ['kkb-mall']
    }
}