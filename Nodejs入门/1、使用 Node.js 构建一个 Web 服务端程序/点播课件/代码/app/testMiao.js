//1、 使用Node.js内置的require 方法引入核心模块 =》 http
const http = require('http');
const fs = require('fs'); // fs模块
const url = require('url');
const { nunjucks } = require('./nunjucks');

//2、创建一个 server对象
// const server = new http.server();
//2-1、创建一个 server对象的另一种方法createServer创建，与如上方法没有任何区别
const server = http.createServer();

// 路由表
const routesMap = new Map();
routesMap.set('/', async (req, res) => {
  res.setHeader('Content-Type', 'text/html;charset="utf-8"');
  res.end('首页');
});
routesMap.set('/list', async (req, res) => {
  res.setHeader('Content-Type', 'text/html;charset="utf-8"');
  res.end('列表');
});

//定义users
let users =[
    {id:'1',username:'花猫🐱'},
    {id:'2',username:'紫薯🍠'},
    {id:'3',username:'番茄🍅'}
]
//方法一：
// routesMap.set('/', async (req, res) => {
//     res.setHeader('Content-Type', 'text/html;charset="utf-8"');
//     res.end(`
//         <ul>
//           ${users.map(u => {
//             return `<li>${u.username}</li>`
//           }).join('')}
//         </ul>
//     `);
// });
//方法二：
routesMap.set('/', async (req, res) => {
    res.setHeader('Content-Type', 'text/html;charset="utf-8"');
    let userListHtml = users.map(u => {
            return `<li>${u.username}</li>`
          }).join('');
    let template = fs.readFileSync('./template/index.html').toString() //得到的就是模版文本内容
    let content = nunjucks.renderString(template , { users })
    // console.log(content)
    res.end(content)
    // res.end( template.replace(/${users}/gi, userListHtml) );
});


//4、使用事件回调处理请求
//注册request 事件回调函数，当有客户端连接请求 被监听到的时候执行回调
// const server =  http.createServer(()=>{
//     console.log('有客户端请求');
// });
server.on('request', async (req , res)=>{ //如上创建 + 回调函数 其实是等价的
    //请求连接：http://localhost:8888/1.html
    // url获取方法一：
    console.log('有客户端请求');
    console.log("req打印：", req.url) // 使用 URI(URL) 定位不同的资源；  /1.html 和 /favicon.ico

    // url获取方法二：
    //使用Nodejs里的url模块的提供的工具方法解析 url
    const urlObj = url.parse(req.url)
    console.log('urlObj打印', urlObj)

    // url获取方法三：
    //使用whatwg / WHATWG（HTML5） 中的 URL API 解析 URL 字符串
    // const urlObj2 = new URL(req.url)
    // console.log('urlObj2打印', urlObj2)

    // 自定义一套基于url的规则，来区分当前的静态资源与动态资源
    // 1、静态资源
    if(urlObj.pathname.startsWith('/static')){ 
        try{
            //readFileSync得到一个二进制文件内容，toString转换成字符串
            // const content= fs.readFileSync('./resources/1.html').toString()
            // const content= fs.readFileSync(`./resources${req.url}`).toString()
            // const content= fs.readFileSync(`./resources${urlObj.pathname}`).toString()
            // const content= fs.readFileSync(`.${urlObj.pathname}`).toString()
            let lastPointIndexOf = urlObj.pathname.lastIndexOf('.')
            let suffix = urlObj.pathname.substring(lastPointIndexOf) //截取后缀操作 .html .png这种

            const content= fs.readFileSync(`.${urlObj.pathname}`) //.toString()
            console.log('content打印：', content)//直接打印整个1.html/其他网页内容
            
            //设置响应头-- 识别图片 或者 html文件
            // 如访问： http://localhost:8888/static/1.png
            switch(suffix){
                case '.html':
                    res.setHeader('Content-type','text/html;charset=utf-8')
                    break;
                case '.css':
                    res.setHeader('Content-type','text/css;charset=utf-8')
                    break;
                case '.png':
                    res.setHeader('Content-type','image/png;charset=utf-8')
                    break;
                default :
                    res.setHeader('Content-type','text/plain')
                    break;
            }

            // res.write('Hello'); //写入数据
            res.end(content);//结束写入数据
        } catch{
            res.end('Hello~'); //静态资源
            // res.end(Date.now().toString()); //动态资源
        }
    } else {
    //2、动态资源
        if (urlObj.pathname == '/now') {
            res.end(Date.now().toString());
        }

        // 根据当前的 pathname 指定 routeMap 中对应的函数
        let routeHandler = routesMap.get(urlObj.pathname);
        if (routeHandler) {
            await routeHandler(req, res);
        }else {
            // 告知客户端你应该重新发送请求，新的请求地址在 Location 头中。
            // res.statusCode = 302;
            // res.setHeader('Location', '/');
            // res.end();

            // 返回一个404的状态码与提示页面
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end('<h1>页面丢失了</h1>');
        }
    }
    
})

//3、指定当前server, 需要监听的主机
server.listen(8888,'0.0.0.0',()=>{
    console.log('服务器启动成功～')
})

