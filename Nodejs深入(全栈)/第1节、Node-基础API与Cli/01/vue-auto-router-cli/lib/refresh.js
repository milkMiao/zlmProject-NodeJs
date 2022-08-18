// 约定路由功能
// 1、loader 文件扫描
// 2、代码模板渲染 hbs Mustache风格模板
const fs = require('fs')
const handlebars = require('handlebars')//引入模版
const chalk = require('chalk')
module.exports = async () => {
    // 获取页面列表
    const list =
        fs.readdirSync('./src/views')
            .filter(v => v !== 'Home.vue') //排除Home文件
            .map(v => ({
                name: v.replace('.vue', '').toLowerCase(), //去除扩展名.vue,转换小写
                file: v
            }))
    // 生成路由定义
    compile({
        list
    }, './src/router.js', './template/router.js.hbs')

    // 生成菜单
    compile({
        list
    }, './src/App.vue', './template/App.vue.hbs')



    /**
     * 编译模板文件
     * @param {*} meta   数据定义
     * @param {*} filePath 目标文件路径
     * @param {*} templatePath  模板文件路径
     */
    // 
    function compile(meta, filePath, templatePath) {
        if (fs.existsSync(templatePath)) {
            const content = fs.readFileSync(templatePath).toString() //导出模版
            const reslut = handlebars.compile(content)(meta)
            fs.writeFileSync(filePath, reslut)
        }
        console.log(chalk.red(`🚀${filePath} 创建成功`))
    }


}