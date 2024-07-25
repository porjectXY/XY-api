import { Router } from 'express'
import Post from '../models/Post.js'
import User from '../models/User.js'
import mongoose from 'mongoose'
import { authUser } from '../middleWares/authValidator.js'

const followingRouter = Router({ mergeParams: true })

followingRouter.get('/followings/posts', authUser(), async (req, res) => {
  try {
    const loggedInUserId = req.user.id

    const loggedInUser = await User.findById(loggedInUserId).exec()

    if (!loggedInUser) {
      return res.status(404).json({ msg: 'User not found' })
    }

    const followingUserIds = loggedInUser.following

    if (followingUserIds.length === 0) {
      return res.json({ followingPosts: [] })
    }

    const followingUserObjectIds = followingUserIds.map(id => mongoose.Types.ObjectId(id))

    const followingPosts = await Post.find({ userId: { $in: followingUserObjectIds } })
      .populate('userId', 'username avatar')
      .exec()

    res.json({
      followingPosts: followingPosts.map(post => ({
        id: post._id,
        userId: post.userId._id,
        username: post.userId.username,
        avatar: post.userId.avatar,
        content: post.content,
        timestamp: post.timestamp,
        comments: post.comments,
        likes: post.likes,
        isActive: post.isActive
      }))
    })
  } catch (error) {
    console.error('Error fetching following posts:', error)
    res.status(500).json({ msg: 'Server Error' })
  }
})

export default followingRouter
