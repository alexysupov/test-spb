import CommentsService from "../services/CommentsService.js";

class CommentsController {
    async getAllComments(req, res, next) {
        try {
            const data = await CommentsService.getAllComments()
            res.status(200).json(data)
        }
        catch (error) {
            res.status(400).json(error)
        }
    }

    async getPostComments(req, res, next) {
        const { postId } = req.params

        try {
            const data = await CommentsService.getPostComments(postId)
            res.status(200).json(data)
        }
        catch (error) {
            res.status(400).json(error)
        }
    }

    async createComment(req, res, next) {
        const { postId } = req.params
        const { userId } = req
        const { text } = req.body

        try {
            const data = await CommentsService.createComment({
                postId,
                userId,
                text
            })
            res.status(200).json(data)
        }
        catch (error) {
            res.status(400).json(error)
        }
    }

    async deleteComment(req, res, next) {
        const { commentId } = req.params

        try {
            const data = await CommentsService.deleteComment(commentId)
            res.status(200).json(data)
        }
        catch (error) {
            res.status(400).json(error)
        }
    }
}

export default new CommentsController()