module.exports = (db) => {
    return {
        // 获取所有分类信息
        getCategories: async () => {
            let [categories] = await db.query(
                "SELECT `id`, `name` FROM `categories`"
            )
            return categories;
        }
    }
}