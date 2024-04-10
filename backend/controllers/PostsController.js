import PostsService from "../services/PostsService.js";

class PostsController {
    async getAllPosts(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query

            const posts = await PostsService.getAllPosts(page, limit, req.userId)
            res.status(200).json(posts)
        }
        catch ({ message }) {
            res.status(400).json({ message })
        }
    }

    async getOnePost(req, res) {
        try {
            const { postId } = req.params

            const post = await PostsService.getOnePost(postId, req.userId)

            if (!post) {
                return res.status(404).json({
                    message: 'Not found'
                })
            }

            res.status(200).json(post)
        }
        catch ({ message }) {
            res.status(400).json({ message })
        }
    }

    async createPost(req, res) {
        try {
            const { title, text } = req.body

            const post = await PostsService.createPost(req.userId, {
                title,
                text
            })

            res.status(200).json(post)
        }
        catch ({ message }) {
            res.status(400).json({ message })
        }
    }
}

export default new PostsController()