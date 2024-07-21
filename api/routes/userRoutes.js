import { Router } from 'express'
import { getUser } from '../controllers/userController.js'
import profileRouter from './profileRoutes.js'

const userRouter = Router()

userRouter.get('/', getUser)

userRouter.use('/', profileRouter)

export default userRouter
