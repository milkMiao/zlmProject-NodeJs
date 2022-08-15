//商品详情-评价
module.exports = (db)=>{
    return {
        //获取商品详情--评价信息
        getComments: async (itemId, page=1, limit=5)=>{
            let [[{ count }]] = await db.query(
                "SELECT count(`id`) as `count` FROM `comments` WHERE `item_id` = ?",
                [itemId]
            );
            let pages = Math.ceil(count / limit);
            page = Math.max(1,page);
            page = Math.min(page, pages);
            let offset = (page-1)*limit;

            let [comments] = await db.query(
                "SELECT `comments`.`id`,`comments`.`item_id` as `itemId`, `comments`.`user_id` as `userId`, `comments`.`content`, `comments`.`created_at` as `createdAt`,`users`.`username`, `users`.`avatar` FROM `comments` LEFT JOIN `users` ON `comments`.`user_id`=`users`.`id` WHERE `item_id` = ? LIMIT ? OFFSET ?",
                [itemId, limit, offset]
            )
            return {
                count,//总页数
                page,//当前页
                pages,//多少页数
                limit,//每页几条数据
                comments//当前商品--评价信息集合
            }

        },
        //评价提交
        postComment: async (itemId, userId, content) => {
            let [{ insertId }] = await db.query(
                "INSERT INTO `comments` (`item_id`, `user_id`, `content` ) VALUES (?,?,?)",
                [itemId, userId, content]
            )
            return insertId;
        }
    }
};