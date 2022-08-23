module.exports = (db) => {

    return {
        getItems: async (categoryId, page = 1, limit = 5) => {
            let [[{ count }]] = await db.query(
                "SELECT count(`id`) as `count` FROM `items` WHERE `category_id` = ?",
                [categoryId]
            )

            let pages = Math.ceil(count / limit);
            page = Math.max(1, page);
            page = Math.min(page, pages);
            let offset = (page - 1) * limit;

            let [items] = await db.query(
                "SELECT `id`,`category_id` as `categoryId`, `name`, `price`, `cover`, `description` FROM `items` WHERE `category_id` = ? LIMIT ? OFFSET ?",
                [categoryId, limit, offset]
            )

            return {
                page,
                pages,
                limit,
                count,
                items
            }
        },

        getItem: async (id) => {
            let [[item]] = await db.query(
                "SELECT `id`, `name`, `price`, `cover`, `description`, `category_id` as `categoryId` FROM `items` WHERE `id` = ?",
                [id]
            )

            return item;
        }
    }
}