module.exports = (db)=>{
    return {
        //获取所有--Tab头部分类信息--下的商品
        getItems: async (categoryId, page=1, limit=5)=>{
            let [[{count}]] = await db.query(
                'SELECT count(`id`) as `count` FROM `items` WHERE `category_id`=?',
                [categoryId]
            )

            let pages=Math.ceil(count / limit); //总页数，总条数count, 每页limit条数据限制
            page = Math.max(1, page);
            page = Math.min(page, pages);
            let offest = (page-1) * limit > 0 ? (page-1) * limit : -(page-1) * limit;
            console.log('count:',count,'page:',page, 'pages:',pages, 'offest:',offest)

            let[items] = await db.query(
                'SELECT `id`, `category_id` as `categoryId`, `name`, `price`, `cover`,`description` FROM `items` WHERE `category_id`=? LIMIT ? OFFSET ?',
                [categoryId, limit, offest]
            )
            console.log("items商品", items)

            return {
                page,
                pages,
                limit,
                count,
                items
            }
        },

        //获取某个Tab下--具体商品详情
        getItem: async (id)=>{

        }
    }
};