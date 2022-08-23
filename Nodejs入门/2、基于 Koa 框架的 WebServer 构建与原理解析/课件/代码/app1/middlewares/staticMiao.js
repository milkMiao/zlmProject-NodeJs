const url = require('url')
const fs = require('fs')

module.exports = function(options){
    // Object.assign: 浅拷贝、对象属性的合并[将源对象里的属性添加到目标对象去]
    // 第一个花括号叫目标对象，后边的叫源对象；
    let opts = Object.assign({},{ 
        prefix: '/public', //前缀
        dir: './public'
    }, options)
    console.log("opts：", opts, "options：", options) 
    //{ prefix: '/public',dir: './public' } { prefix: '/public' }

    //中间件函数
    return async function(ctx , next){
        console.log('static body_______',ctx.body)
        console.log('static url_______',ctx.url)
    
        const urlObj = url.parse(ctx.url)
        if (urlObj.pathname.startsWith(opts.prefix)) {
        // 静态资源
            try{
                //readFileSync得到一个二进制文件内容，toString转换成字符串
                let lastPointIndexOf = urlObj.pathname.lastIndexOf('.')
                let suffix = urlObj.pathname.substring(lastPointIndexOf) //截取后缀操作 .html .png这种
    
                const content= fs.readFileSync(`.${urlObj.pathname}`)
                // console.log('content打印：', content)//直接打印整个1.html其他网页内容
                
                //设置响应头-- 识别图片 或者 html文件
                // 如访问： http://localhost:8888/static/1.html
                switch(suffix){
                    case '.html':
                        // res.setHeader('Content-type','text/html;charset=utf-8')
                        ctx.set('Content-type','text/html;charset=utf-8')
                        break;
                    case '.css':
                        // res.setHeader('Content-type','text/css;charset=utf-8')
                        ctx.set('Content-type','text/css;charset=utf-8')
                        break;
                    case '.png':
                        // res.setHeader('Content-type','image/png;charset=utf-8')
                        ctx.set('Content-type','image/png;charset=utf-8')
                        break;
                    default :
                        // res.setHeader('Content-type','text/plain')
                        ctx.set('Content-type','text/plain')
                        break;
                }
    
                // res.write('Hello'); //写入数据
                // res.end(content);//结束写入数据
                ctx.body = content;
            } catch{
                // 返回一个404的状态码与提示页面
                // res.statusCode = 404;
                // res.setHeader('Content-Type', 'text/html; charset=utf-8');
                // res.end('<h1>页面丢失了</h1>');
    
                ctx.status = 404;
                ctx.set('Content-Type', 'text/html; charset=utf-8');
                ctx.body ='<h1>页面丢失了</h1>'
            }
        } else{
            //动态资源
            console.log('动态资源进入：')
            await next();
        }
    }
}