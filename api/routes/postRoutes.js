import { Router } from 'express'
import { createPost, getPosts, getPostsUserById } from '../controllers/postController.js'
import commentRouter from './commentRoutes.js'
import { authUser } from '../middleWares/authValidator.js'

const postRouter = Router({ mergeParams: true })

postRouter.get('/', getPosts)
postRouter.get('/profile', getPostsUserById)
postRouter.post('/:userId/posts', authUser(), createPost)

postRouter.use('/:postId/comments', commentRouter)

export default postRouter
