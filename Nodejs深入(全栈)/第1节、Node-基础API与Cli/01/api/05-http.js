const http = require('http')
const fs = require('fs')
const server = http.createServer((request, response) => {
    //getPrototypeChain：检测request，response分别什么类型？
    // console.log("request:", request)//数组集合
    // console.log("response:", response)

    // response.end('hello ...')

    const { url, method ,headers} = request
    if (url === '/' && method === 'GET'){
        // 静态页面服务
        fs.readFile('index.html',(err,data) => {
            if(err){
               response.writeHead(500, { 'Content-Type': 'text/html'})
               response.end('500 错误')
               return;
            }
            response.statusCode = 200
            response.setHeader('Content-Type','text/html')
            response.end(data)
        })
    }else if(url === '/users' && method === 'GET'){
        // Ajax服务
        response.writeHead(200,{
            'Content-Type': 'application/json'
        })
        response.end(JSON.stringify({name : 'laowang'}))
    }else if(method === 'GET' && headers.accept.indexOf('image/*') !== -1){
        // 图片文件服务
        fs.createReadStream('./'+url).pipe(response)
    }

})
server.listen(3000, ()=>{
    console.log("服务启动成功～")
}) //监听3000端口


// 打印原型链 
function getPrototypeChain(obj) { 
    var protoChain = []; 
    while (obj = Object.getPrototypeOf(obj)) {
        //返回给定对象的原型。如果没有继承属 性，则返回 null 。 
        protoChain.push(obj); 
    }
    protoChain.push(null); 
    return protoChain; 
}