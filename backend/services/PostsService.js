import {Posts, Users} from "../models/index.js";

class PostsService {
    async getAllPosts(page = 1, limit = 10, userId = null) {
        try {
            return await Posts.findAndCountAll({
                offset: limit * (page - 1),
                order: [['id', 'DESC']],
                limit,
            })
        }
        catch ({ message }) {
            throw Error(message)
        }
    }

    async getOnePost(postId, userId) {
        try {
            return await Posts.findByPk(postId, {
                include: [
                    {
                        model: Users,
                        attributes: ['username']
                    }
                ],
            })
        }
        catch ({ message }) {
            throw Error(message)
        }
    }

    async createPost(userId, postData) {
        try {
            return await Posts.create({ userId, ...postData })
        }
        catch ({ message }) {
            throw Error(message)
        }
    }
}

export default new PostsService()