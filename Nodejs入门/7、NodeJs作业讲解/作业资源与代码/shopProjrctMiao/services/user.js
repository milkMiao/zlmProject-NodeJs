module.exports = (db)=>{
    return {
        //校验当前用户名是否已经注册
        getUserByUsername: async (username)=>{
            let [[user]] = await db.query(
                "SELECT `id`, `username`, `password`, `avatar`, `sex` FROM  `users` WHERE `username`=? ",
                [username]
            )
            return user;
        },
        //注册
        signup: async (username, password)=>{
            let [{insertId}] = await db.query(
                "INSERT INTO `users` (`username`, `password`) VALUES (?, ?)",
                [username,password]
            )
            if(!insertId){
                return null;
            }
            return {
                insertId,
                username
            }
        },
        
        //上传头像
        postAvatar: async (id, avatar) => {
            await db.query(
                "UPDATE `users` SET `avatar` = ? WHERE `id` = ?",
                [avatar, id]
            );
            return true;
        }


    }
};