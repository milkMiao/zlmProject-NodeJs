import data from './data.js';
import Item from './Item.js'
import List from './List.js'

function fn1() {

}

function fn2() {

}

// window.document.body.addEventListener('click', fn1)
// window.document.body.addEventListener('click', fn2, {
//     capture: true,
//     once: true,
//     passive: true
// })

// 创建一个歌单
window.myList = new List();
// 数据初始化
data.forEach(d => {
    // 根据数据创建一堆的歌曲
    let item = new Item(d.id, d.title, d.checked, d.collect);
    // console.log(item);
    // 歌单.添加(歌曲)
    myList.add(item)
})

// class 组件 {
//     render() {
//
//     }
// }
//
// class 歌单组件 extends 组件 {
//     render() {
//         .....
//     }
// }
//
// class 收藏夹组件 extends 组件 {
//     render() {
//         ...
//     }
// }
//
// // 删除
// 歌单.删除(歌曲)
// 歌单视图.渲染()
//
// // 收藏
// 收藏夹.添加(歌曲)
// 收藏夹.删除(歌曲)
// 收藏夹视图.渲染()

// console.log(myList)


