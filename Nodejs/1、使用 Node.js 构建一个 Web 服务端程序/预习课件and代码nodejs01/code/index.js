// AMD sea.js  CMD require.js
console.log("我是index.js");

//require从哪里来？是node内部的
let Ma = require("./Ma"); //1、直接引入文件
// console.log(a);
console.log(Ma.a)

let cai = new Ma.Person();
cai.hobby();

require("./home");//2、引入文件夹的方式（home文件夹）

//3、 node_modules里的模块; 注意不需要加上（./的方式访问）
let {a,b} = require("mytest");
// console.log(a);
b();

require("mytest")
const http = require("http");

// npm:包管理器
// dependencies:运行依赖jquery、vue、react  ；devDependencies：开发依赖 sass less；
