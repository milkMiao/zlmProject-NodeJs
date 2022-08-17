module.exports = function promisify(fn) {//fn输入一个函数，return输出一个函数
    return function (...args) {
        return new Promise(function (resolve,reject) {
            args.push(function (err,...arg) {
                if(err){
                    reject(err)
                }else{
                    resolve(...arg);
                }
            });
            fn.apply(null, args);
        })
    }
}