import { Router } from 'express'
import { addComment, followUser } from '../controllers/notificationController.js'

const notificationRouter = Router()

notificationRouter.post('/follow', followUser)
notificationRouter.post('/comment', addComment)

export default notificationRouter
