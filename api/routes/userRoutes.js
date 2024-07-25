import { Router } from 'express'
import profileRouter from './profileRoutes.js'
import postRouter from './postRoutes.js'
import { getUser, getUserById } from '../controllers/userController.js'
import followRouter from './followRoutes.js'
import followingRouter from './followingRoutes.js'

const userRouter = Router()

userRouter.get('/', getUser)
userRouter.get('/:userId', getUserById)

userRouter.use('/', profileRouter)
userRouter.use('/', postRouter)
userRouter.use('/:userId/posts', postRouter)
userRouter.use('/', followRouter)
userRouter.use('/', followingRouter)

export default userRouter
