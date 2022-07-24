class List {

    constructor() {
        this.items = [];
        this._checkedAll = false;
    }

    get checkedAll() {
        return this._checkedAll;
    }

    set checkedAll(value) {
        this._checkedAll = value;

        // 把当前 list 下的所有 item 的checked 设置为 与当前 list 的checkedAll 等同的状态
        this.items.forEach(item => {
            item.checked = this._checkedAll;
        });
    }


    // 添加
    add(item) {
        this.items.push(item);
    }

    // 移除
    remove() {

    }

    // 收藏
    fav() {

    }

}

export default List
