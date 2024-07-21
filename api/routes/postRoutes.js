import { Router } from 'express'
import { createPost, getPosts, getPostsUserById } from '../controllers/postController.js'

const postRouter = Router({ mergeParams: true })

postRouter.get('/', getPosts)
postRouter.get('/profile', getPostsUserById)
postRouter.post('/:userId/posts', createPost)

export default postRouter
