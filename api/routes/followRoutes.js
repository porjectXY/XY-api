import { Router } from 'express'
import User from '../models/User.js'
import Service from '../services/Service.js'

const userService = new Service(User)

const followRouter = Router({ mergeParams: true })

followRouter.get('/:userId/followData', async (req, res) => {
  try {
    const user = await userService.getById(req.params.userId)
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }
    res.json({
      avatar: user.avatar,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      followers: user.followers,
      following: user.following
    })
  } catch (error) {
    console.error('Error fetching follow data:', error)
    res.status(500).json({ msg: 'Server Error' })
  }
})

export default followRouter
