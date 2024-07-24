import { Router } from 'express'
import User from '../models/User.js'

const followRouter = Router({ mergeParams: true })

followRouter.get('/:userId/followData', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('followers', 'username avatar')
      .populate('following', 'username avatar')
      .exec()

    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }

    res.json({
      avatar: user.avatar,
      username: user.username,
      bio: user.bio,
      followers: user.followers.map(follower => ({
        id: follower._id,
        username: follower.username,
        avatar: follower.avatar
      })),
      following: user.following.map(following => ({
        id: following._id,
        username: following.username,
        avatar: following.avatar
      }))
    })
  } catch (error) {
    console.error('Error fetching follow data:', error)
    res.status(500).json({ msg: 'Server Error' })
  }
})

export default followRouter
