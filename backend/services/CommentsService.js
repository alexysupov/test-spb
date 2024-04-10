import {Comments, Users} from "../models/index.js";

class CommentsService {
    async getAllComments() {
        try {
            return await Comments.findAll({
                order: [['createdAt', 'DESC']]
            })
        }
        catch (e) {
            throw Error('Error get all comments')
        }
    }

    async getPostComments(postId) {
        try {
            return await Comments.findAll({
                order: [['createdAt', 'DESC']],
                where: { postId },
                include: [{
                    model: Users,
                    attributes: ['id', 'username']
                }]
            })
        }
        catch (e) {
            throw Error('Error get post comments')
        }
    }

    async createComment({ postId, userId, text }) {
        try {
            return await Comments.create({
                postId,
                userId,
                text
            })
        } catch (e) {
            throw Error('Error create comment')
        }
    }

    async deleteComment(commentId) {
        try {
            return await Comments.destroy({ where: { id: commentId } })
        } catch (e) {
            throw Error('Error delete comment')
        }

    }
}

export default new CommentsService()