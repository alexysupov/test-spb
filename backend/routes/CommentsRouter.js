import { Router} from 'express'
import { authorization, identification } from "../middleware/index.js";
import CommentsController from "../controllers/CommentsController.js";

const router = new Router()

router.get('/', CommentsController.getAllComments)
router.get('/:postId', CommentsController.getPostComments)
router.post('/:postId', identification, CommentsController.createComment)
router.delete('/:commentId', authorization, CommentsController.deleteComment)

export default router