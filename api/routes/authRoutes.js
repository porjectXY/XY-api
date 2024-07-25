import { Router } from 'express'
import { login, register, me, checkUserName } from '../controllers/authController.js'
import { authUser } from '../middleWares/authValidator.js'
import validateBody from '../middleWares/validateBody.js'
import registerUserSchema from '../validators/registerUserSchema.js'

const authRouter = Router()

authRouter.post('/register', validateBody(registerUserSchema), register)
authRouter.post('/login', login)
authRouter.get('/check-username/:username', checkUserName)

authRouter.get('/me', authUser(), me)

export default authRouter
