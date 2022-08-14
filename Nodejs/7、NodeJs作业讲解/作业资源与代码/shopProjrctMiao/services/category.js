module.exports = (db)=>{
    return {
        //获取所有--Tab头部分类信息(如：手机，笔记本，电视等)
        getCategories: async ()=>{
            let [categories] = await db.query(
                'SELECT `id`, `name` FROM `categories`'
            )
            return categories;
        },
    }
};