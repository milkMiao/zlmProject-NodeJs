#!/usr/bin/env node

// console.log(`hello`)

// process : 获取到当前程序运行的进程相关的一些信息和数据
// process.argv : 当前程序运行的参数信息
// console.log(process.argv);

const version = 'v1.0.0'

if (process.argv[2] == '-v') {
    console.log(`version: ${version}`)
} else {
    console.log(`hello`)
}


