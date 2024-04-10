import { Router} from 'express'
import { identification } from "../middleware/index.js";
import PostsController from "../controllers/PostsController.js";


const router = new Router()

router.get('/', identification, PostsController.getAllPosts)
router.get('/:postId', identification, PostsController.getOnePost)
router.post('/', identification, PostsController.createPost)

export default router