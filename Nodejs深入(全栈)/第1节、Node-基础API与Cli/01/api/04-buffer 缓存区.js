// 读取数据类型为Buffer
// Buffer - 用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互。 八位字节组
// 成的数组，可以有效的在JS中存储二进制数据

// 创建一个长度为10字节以0填充的Buffer
const buf1 = Buffer.alloc(10)
console.log(buf1) //10个字节 <Buffer 00 00 00 00 00 00 00 00 00 00>

// 创建一个Buffer包含ascii.
// ascii 查询 http://ascii.911cha.com/
const buf2 = Buffer.from('a')//英文字符
console.log(buf2, buf2.toString()) //<Buffer 61>  a 

// 创建Buffer包含UTF-8字节
// UFT-8：一种变长的编码方案，使用 1~6 个字节来存储； 
// UFT-32：一种固定长度的编码方案，不管字符编号大小，始终使用 4 个字节来存储； 
// UTF-16：介于 UTF-8 和 UTF-32 之间，使用 2 个或者 4 个字节来存储，长度既固定又可变。
const buf3 = Buffer.from('中')//中文字符
console.log(buf3) // <Buffer e4 b8 ad>

// 合并Buffer
const buf4 = Buffer.concat([buf2,buf3])
console.log(buf4, buf4.toString()) //<Buffer 61 e4 b8 ad>  a中