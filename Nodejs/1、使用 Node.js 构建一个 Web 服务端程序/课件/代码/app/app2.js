// 使用 Node.js 内置 require 方法引入核心模块 -> http
const http = require('http');

// fs模块
const fs = require('fs');

// 创建一个 Server 对象
// const server = new http.Server();

// 如上面new的方式没有任何的区别
// 也可以使用 createServer 方法创建一个 Server 对象
// const server = http.createServer(() => {
//     console.log(`有客户端请求`);
// });

const server = http.createServer();

// 注册 request 事件回调函数，当有客户端连接请求被监听到的时候执行回调
server.on('request', (req, res) => {
    console.log(`有客户端请求`);

    // 获取请求相关信息
    // 当前请求的 url 字符串
    console.log(req.url);

    // 写入数据
    res.write('Hello');
    // 结束数据写入
    res.end();
});

// 指定当前 Server 需要监听的主机
server.listen(8888, '0.0.0.0', () => {
    console.log(`服务器启动成功`);
});
