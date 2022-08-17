const fs = require('fs')

// I/O处理其实分为两部分：网络请求，文件读写/硬盘读写

// 同步方式
const data = fs.readFileSync('./config.json') // ./download.js
console.log('1',data) 
// buffer处理二进制问题：【默认解析utf-8】
//二进制： <Buffer 7b 0a 20 20 20 20 22 61 22 3a 20 22 e5 b0 
// 8f e8 8a b1 e7 8c ab 22 2c 0a 20 20 20 20 22 62 22
// 3a 20 22 e5 a4 a7 e7 8b ae e5 ad 90 22 2c 0a 20 20 20 20 ... 18 more bytes>
console.log('2', data.toString()) //转换成文本

// 异步方式 【node里的回调，错误优先处理】
// 异步请求处理可以写成这样，多个异步？见下---promisify
fs.readFile('./download.js',(err,data) => {
    if(err) throw err
    console.log("异步-后打印", data) //2
})
console.log("异步-先打印") //1
// <Buffer 6d 6f 64 75 6c 65 2e 65 78 70 6f 72 74 73 2e 63 6c 6f 
// 6e 65 20 3d 20 61 73 79 6e 63 20 66 75 6e 
// 63 74 69 6f 6e 20 63 6c 6f 6e 65 28 72 65 70 6f 2c 20 ... 586 more bytes>

(async ()=>{
    const fs = require('fs');
    const {promisify} = require('util') //util内置模块

    const readFile = promisify(fs.readFile)// promisify：输入一个函数，输出一个函数
    const data = await readFile('./config.json')

    console.log('promisify', data.toString())
})()



