//stream - 是用于与node中流数据交互的接口
//二进制友好，图片操作
const fs = require('fs')
const rs = fs.createReadStream('./img.png')
const ws = fs.createWriteStream('./img2.png')
rs.pipe(ws) //管道