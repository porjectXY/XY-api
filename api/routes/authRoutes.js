import { Router } from 'express'
import { login, register, me } from '../controllers/authController.js'
import { authUser } from '../middleWares/authValidator.js'

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)

authRouter.get('/me', authUser(), me)

export default authRouter
