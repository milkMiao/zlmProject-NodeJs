// buffer创建
// new Buffer()
let bufferA = Buffer.alloc(10);
// console.log(bufferA); //二进制 <Buffer 00 00 00 00 00 00 00 00 00 00>

let bufferB = Buffer.from("大家好");
// console.log(bufferB); //十六进制 <Buffer e5 a4 a7 e5 ae b6 e5 a5 bd>

let bufferC = Buffer.from([0xe5,0xa4,0xa7,0xe5,0xae,0xb6,0xe5,0xa5,0xbd]);//字符编码
// console.log(bufferC.toString()); //大家好

let buffer1 = Buffer.from([0xe5,0xa4,0xa7,0xe5]);
let buffer2 = Buffer.from([0xae,0xb6,0xe5,0xa5,0xbd]);
// console.log(buffer1.toString());
let newbuffer = Buffer.concat([buffer1,buffer2]);
// console.log(newbuffer.toString()); //大家好

let { StringDecoder } = require("string_decoder");//解决乱码问题--性能优于上面
let decoder =  new StringDecoder();
let res1 = decoder.write(buffer1);
let res2 = decoder.write(buffer2);
console.log(res1+res2); //大家好
// console.log(res2);