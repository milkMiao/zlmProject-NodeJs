// buffer 创建
// 直接创建
// let buffer = Buffer.alloc(10);
// console.log(buffer);
// let buffer = Buffer.from("大家好");
// console.log(buffer);
// let buffer = Buffer.from([0xe5,0xa4,0xa7,0xe5,0xae,0xb6,0xe5,0xa5,0xbd]);
// console.log(buffer.toString());
// const stringDecoder = require("string_decoder").StringDecoder
// const decoder = new stringDecoder(); 
// let buffer1 = Buffer.from([0xe5,0xa4,0xa7,0xe5,0xae]);
// // console.log(buffer1.toString());
// let buffer2 = Buffer.from([0xb6,0xe5,0xa5,0xbd]);
// // console.log(buffer2.toString());
// // let newBuffer = Buffer.concat([buffer1,buffer2]);
// // console.log(newBuffer.toString());
// // let str1 = decoder.write(buffer1);
// let str2 = decoder.write(buffer2);
// // console.log(str1);
// console.log(str2);
const fs = require("fs");
// let buffer = Buffer.alloc(1024*65);
// fs.writeFile("65kb.txt",buffer,(err)=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log("写入成功");
// })
// let rs = fs.createReadStream("65kb.txt");
// let num = 0;
// rs.on("data",chunk=>{
//     num++;
//     console.log(chunk);
//     console.log(num);
// })
// let ws = fs.createWriteStream("test.txt");
// rs.pipe(ws);

// let buffer = Buffer.from("大家好");
// console.log(buffer+"");
