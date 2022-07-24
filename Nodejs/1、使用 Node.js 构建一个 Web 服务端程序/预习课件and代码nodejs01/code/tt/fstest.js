

const fs = require("fs");
// fs.rmdirSync("11");
// fs.readdir("11",(err,data)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//         let path = ".";
//         for(let i =0;i<data.length;i++){
//             let urlPath = path+"/"+data[i];
//             let stat =  fs.statSync(urlPath);
//             console.log(stat);
//         }
//     }
// })
// 删除非空文件夹
removeDir("11");
function removeDir(path) {
    // fs.readdir(path,(err,data)=>{
    //     if(err){
    //         return console.log(err);
    //     }
    //     for(let i=0;i<data.length;i++){
    //         let pathUrl = path + "/" + data[i];
    //         let stat = fs.statSync(pathUrl);
    //        if(stat.isDirectory()){
    //            console.log("是目录");
    //            removeDir(pathUrl);
    //        }else{
    //            console.log("是文件");
    //            fs.unlinkSync(pathUrl);
    //        }
    //     }
    // })
    let res = fs.existsSync(path);
    if(res){
    let data = fs.readdirSync(path);
    // console.log(res);
    for (let i = 0; i < data.length; i++) {
        let pathUrl = path + "/" + data[i];
        let stat = fs.statSync(pathUrl);
        
        if (stat.isDirectory()) {
            console.log("是目录");
            removeDir(pathUrl);
        } else {
            console.log("是文件");
            fs.unlinkSync(pathUrl);
        }
    }
    fs.rmdirSync(path);
}else{
    console.log("当前目录不存在！")
}
}