import { Router } from 'express'
import { addComment } from '../controllers/commentController.js'

const commentRouter = Router({ mergeParams: true })

commentRouter.post('/', addComment)

export default commentRouter
