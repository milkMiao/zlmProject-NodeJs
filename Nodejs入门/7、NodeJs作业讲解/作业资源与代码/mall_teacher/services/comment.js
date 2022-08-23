module.exports = (db) => {

    return {
        getComments: async (itemId, page = 1, limit = 5) => {
            let [[{ count }]] = await db.query(
                "SELECT count(`id`) as `count` FROM `comments` WHERE `item_id` = ?",
                [itemId]
            )

            let pages = Math.ceil(count / limit);
            page = Math.max(1, page);
            page = Math.min(page, pages);
            let offset = (page - 1) * limit;

            let [comments] = await db.query(
                "SELECT `comments`.`id`,`comments`.`item_id` as `itemId`, `comments`.`user_id` as `userId`, `comments`.`content`, `comments`.`created_at` as `createdAt`,`users`.`username`, `users`.`avatar` FROM `comments` LEFT JOIN `users` ON `comments`.`user_id`=`users`.`id` WHERE `item_id` = ? LIMIT ? OFFSET ?",
                [itemId, limit, offset]
            )

            return {
                page,
                pages,
                limit,
                count,
                comments
            }
        },

        postComment: async (itemId, userId, content) => {
            let [{ insertId }] = await db.query(
                "INSERT INTO `comments` (`item_id`, `user_id`, `content`, `created_at`) VALUES (?,?,?,?)",
                [itemId, userId, content, Date.now()]
            )
            return insertId;
        }

    }
}