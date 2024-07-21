import { Router } from 'express'
import profileRouter from './profileRoutes.js'
import postRouter from './postRoutes.js'
import { getUser } from '../controllers/userController.js'

const userRouter = Router()

userRouter.get('/', getUser)

userRouter.use('/', profileRouter)
userRouter.use('/', postRouter)
userRouter.use('/:userId/posts', postRouter)

export default userRouter
