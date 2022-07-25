const fs = require("fs"); //文件操作
// 增删改查；
// 1.文件操作  2.目录操作；
//文件操作
// fs.writeFile("1.txt","我是写入的文字",function(err){
//     if(err){
//         return console.log(err);
//     }
//     console.log("写入成功");
// })

//a:追加写入；w 写入；r：读取；
// fs.writeFile("1.txt","我是追加的文字",{flag:"a"},function(err){
//     if(err){
//         return console.log(err);
//     }
//     console.log("写入成功");
// })

// // 文件读取
// fs.readFile("1.txt","utf8",(err,data)=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log(data);
// })
// fs.readFile("1.txt",(err,data)=>{
//         if(err){
//             return console.log(err);
//         }
//         console.log(data.toString());
// })

// 所有文件操作 没有加Sync都是异步 否则是同步；
// let data = fs.readFileSync("1.txt");//返回值是 buffer
// console.log(data.toString());

// // 修改；（修改名称）;
// fs.rename("1.txt","2.txt",err=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log("修改成功");
// });

// // 删除；
// fs.unlink("2.txt",(err)=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log("删除成功");
// })

// // 复制； 先读取 在写入 的过程；
// fs.copyFile("index.html","myindex.html",err=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log("复制成功！");
// })

// // 复制
// function mycopy(src,dest){
//    fs.writeFileSync(dest,fs.readFileSync(src));
// }
// mycopy("index.html","test.html");

// 目录操作
// 创建目录
fs.mkdir("11",err=>{
    if(err){
        return console.log(err);
    }
    console.log("创建成功");
})
// 修改目录名称
fs.rename("11", "22", err => {
    if (err) {
        return console.log(err);
    }
    console.log("修改成功");
})
// 读取目录；
fs.readdir("22",(err,data)=>{
    if(err){
        return console.log(err);
    }
    console.log(data);
})
// 删除目录(空文件夹/目录)
fs.rmdir("11",err=>{
    if(err){
        return console.log(err);
    }
    console.log("删除成功");
})

// 判断文件或者目录是否存在
fs.exists("index.html",exists=>{
    console.log(exists);
})
// 获取文件或者目录的详细信息；
fs.stat("index.html",(err,stat)=>{
    if(err){
        return console.log(err);
    }
    // console.log(stat);
    // 判断文件是否是文件
    // let res = stat.isFile();
    // 是否是一个文件夹；
    let res = stat.isDirectory();
    console.log(res);
})

// 删除非空文件夹（里面有文件和文件夹，很多类型文件）
// 先把目录里的文件删除-->删除空目录；
// 22文件夹
function removeDir(path){
   let data = fs.readdirSync(path);
    // ["33文件夹","1.txt","2.html"];
   for(let i=0;i<data.length;i++){
        // 是文件或者是目录； --->?文件 直接删除？目录继续查找；  
        let url = path + "/" + data[i]; //  22/33目录
        let stat =  fs.statSync(url);
        if(stat.isDirectory()){
            //目录 继续查找；
            removeDir(url);
        }else{
            // 文件 删除
            fs.unlinkSync(url);
        }
   }
    //  删除空目录--rmdirSync同步删除，rmdir异步删除需要增加一个回掉函数
   fs.rmdirSync(path);
}
removeDir("22");
