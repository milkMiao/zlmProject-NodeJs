module.exports = (db) => {
    return {

        getUserByUsername: async (username) => {
            let [[user]] = await db.query(
                "SELECT `id`, `username`, `password`, `avatar` FROM `users` WHERE `username` = ?",
                [username]
            )
            return user;
        },

        signup: async (username, password) => {
            let [{ insertId }] = await db.query(
                "INSERT INTO `users` (`username`, `password`) VALUES (?, ?)",
                [username, password]
            )

            if (!insertId) {
                return null;
            }

            return {
                id: insertId,
                username
            }
        },

        postAvatar: async (id, avatar) => {
            await db.query(
                "UPDATE `users` SET `avatar` = ? WHERE `id` = ?",
                [avatar, id]
            );
            return true;
        }

    }
}