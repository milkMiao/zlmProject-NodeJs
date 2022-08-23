class Item {

    constructor(id, title, checked=false, collect=false) {
        this.id = id;
        this.title = title;
        this._checked = checked;
        this._collect = collect;
    }

    get checked() {
        return this._checked
    }

    set checked(value) {
        if (typeof value !== 'boolean') {
            throw new Error('checked 的值必须是一个 boolean 类型');
        }
        this._checked = value;
    }

    get collect() {
        return this._collect;
    }

    set collect(value) {
        this._collect = value;
    }
}

export default Item
