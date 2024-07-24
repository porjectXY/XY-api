import { Router } from 'express'
import { login, register, me, checkUserName } from '../controllers/authController.js'
import { authUser } from '../middleWares/authValidator.js'

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.get('/check-username/:username', checkUserName)

authRouter.get('/me', authUser(), me)

export default authRouter
