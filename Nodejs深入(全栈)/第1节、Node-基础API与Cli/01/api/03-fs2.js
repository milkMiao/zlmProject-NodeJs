(async ()=>{
    const fs = require('fs');

    const {promisify} = require('util') //util内置模块
    const readFile = promisify(fs.readFile)
    const data = await readFile('./config.json')

    console.log('data', data.toString())
})()