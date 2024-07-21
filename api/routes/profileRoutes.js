import { Router } from 'express'
import { getProfile, updateProfile } from '../controllers/profileController.js'

const profileRouter = Router({ mergeParams: true })

profileRouter.get('/:userId/profile', getProfile)
profileRouter.patch('/profile', updateProfile)

export default profileRouter
