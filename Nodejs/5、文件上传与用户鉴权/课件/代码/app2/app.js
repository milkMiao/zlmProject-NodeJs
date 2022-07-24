const http = require('http');

const server = http.createServer();

// server.on('request', (req, res) => {
//     console.log('请求方式：', req.method);
//     console.log('HTTP协议版本', req.httpVersion);
//     console.log('请求URL：', req.url);
//
//     console.log('请求头信息：', req.headers);
//
//
//
//
//
//     res.end('hello')
// })


// server.on('request', async (req, res) => {
//     // 当前请求的 URL 就是一组数据，服务端可以根据不同的 URL 数据做不同事情，返回不同的结果
//     if (req.url == '/') {
//         res.end('index');
//     }
//
//     if (req.url == '/register') {
//         res.end('register');
//     }
//
//     // 动态路由
//     let dyRouter = /\/item\/(?<id>\d+)/gi.exec(req.url);
//     console.log(dyRouter);
//     if (dyRouter) {
//         let { id } = dyRouter.groups;
//
//         res.end(`id: ${id}`);
//     }
// });


server.on('request', (req, res) => {
    // http://localhost:8888/users?page=1&limit=10
    const u = new URL(`${req.headers.host}${req.url}`);
    const query = u.searchParams;
    console.log(`page: ${query.get('page')} , limit: ${query.get('limit')}`);
});


server.listen(8888);
