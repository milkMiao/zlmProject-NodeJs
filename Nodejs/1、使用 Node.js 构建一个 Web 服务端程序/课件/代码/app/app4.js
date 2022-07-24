// 使用 Node.js 内置 require 方法引入核心模块 -> http
const http = require('http');

const url = require('url');

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

    // 使用 Node.js 的 url 模块中提供的工具方法解析 url 字符串
    const urlObj = url.parse(req.url);
    console.log(urlObj);

    // 自定义一套基于url的规则来区分当前的静态资源与动态资源
    // /static/1.html
    if (urlObj.pathname.startsWith('/static')) {
        // 静态资源
        try {

            // 获取当前文件的后缀
            // /static/1.html
            let lastPointIndexOf = urlObj.pathname.lastIndexOf('.');
            let suffix = urlObj.pathname.substring(lastPointIndexOf);
            console.log('suffix', suffix);

            let content = fs.readFileSync(`.${urlObj.pathname}`);

            // 设置响应头
            // {'.html': 'text/html;charset=utf-8'}
            switch (suffix) {
                case '.html':
                    res.setHeader('Content-Type', 'text/html;charset=utf-8');
                    break;
                case '.css':
                    res.setHeader('Content-Type', 'text/css;charset=utf-8');
                    break;
                case '.png':
                    res.setHeader('Content-Type', 'image/png');
                    break;
                default:
                    res.setHeader('Content-Type', 'text/plain');
                    break;
            }

            res.end(content);
        } catch (e) {
            res.end(Math.random()+'');
        }
    } else {
        if (urlObj.pathname == '/now') {
            res.end(Date.now().toString());
        }
    }


});

// 指定当前 Server 需要监听的主机
server.listen(8888, '0.0.0.0', () => {
    console.log(`服务器启动成功`);
});
