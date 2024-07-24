import { Router } from 'express'
import profileRouter from './profileRoutes.js'
import postRouter from './postRoutes.js'
import { getUser } from '../controllers/userController.js'
import followRouter from './followRoutes.js'

const userRouter = Router()

userRouter.get('/', getUser)

userRouter.use('/', profileRouter)
userRouter.use('/', postRouter)
userRouter.use('/:userId/posts', postRouter)
userRouter.use('/', followRouter)

export default userRouter
