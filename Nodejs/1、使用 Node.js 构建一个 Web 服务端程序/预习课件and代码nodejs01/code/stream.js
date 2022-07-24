// stream 流；
const fs = require("fs");
// let res = fs.readFileSync("1.txt");
// console.log(res.toString());
let rs = fs.createReadStream("1.txt");
let ws = fs.createWriteStream("2.txt");//写入流
rs.pipe(ws);//管道

let num = 0;
let str = "";
rs.on("data",chunk=>{
    num++;
    str += chunk;
    // console.log(chunk);
    console.log(num);
})
// 流完成了；
rs.on("end",()=>{
    console.log(str);
})

// 流会把数据分成64kb的小文件传输；
// 创建一个65kb的文件；
let buffer = Buffer.alloc(64*1024);
fs.writeFile("64kb",buffer,err=>{
    if(err){
        return console.log(err);
    }
    console.log("写入成功");
})