

// 写
// fs.writeFile("1.txt","some value..",function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("添加成功");
//     }
// })
// 读取
// fs.readFile("1.txt","utf-8",function(err,data){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data)
//     }
// })
// 复制
// fs.copyFileSync("1.txt","2.txt");


// 删除
// fs.unlink("1.txt",err=>{
//     if(err){
//        return console.log(err);
//     }
//     console.log("删除成功");
// })

// 修改文件名
// fs.rename("2.txt","3.txt",err=>{
//     if(err){
//         console.log(err);
//     }
//     console.log("修改成功")
// });



// let buffer = new Buffer(10);
// console.log(buffer);
// let buffer = Buffer.alloc(10);
// console.log(buffer);
//文件操作
const fs = require("fs");
const http = require("http");
const url = require("url");
let server = http.createServer((req, res) => {
    let urlObj = url.parse(req.url, true);
    if(urlObj.pathname=="/"){
        console.log(urlObj)
    //    let result =  fs.readFileSync("./test.html");
      let result = fs.createReadStream("./test.html");
    //   console.log(result);
    result.pipe(res);
    }else if(urlObj.pathname=="/test"){
        let str = "";
        req.on("data",chunk=>{
            str += chunk;
            // console.log(chunk)
        })
        req.on("end",()=>{
            let boundary = req.headers['content-type'].split("=")[1];
            // console.log(boundary);
            console.log("??",str);
            // let arr = str.split(boundary);
            // console.log(arr);
            getFormData(str,boundary);
        })
        res.setHeader("content-type","text/html;charset=utf8");
        res.end("提交了");
    }
})
server.listen(3000);


function getFormData(str,boundary){
    let receiveData = {};
    let arr =  str.split(boundary);
    arr.forEach(v=>{
        let line = v.split("; ");
        let reg = /Content-Type:\s\w+\/\w+\r\n\r\n$/g;
        
        let line2 = v.split(reg);
        console.log("///-",line2);
        if(line[1]){
            // console.log(line[1].split("=")[0]);
            let keyName = line[1].split("=")[1].replace(/[\r\n--"]/g,"");  
            // console.log(keyName);
            // receiveData[keyName] = 
        }

        // let nameObj = line[1].split("=");
        // console.log(nameObj);
        // receiveData[line[0]] = line[1];
    })
    console.log(receiveData);
}
