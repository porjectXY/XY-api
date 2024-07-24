import User from '../models/User.js'
import Post from '../models/Post.js'
import Comment from '../models/Comment.js'
import Service from '../services/Service.js'

const serviceUser = new Service(User)
const servicePost = new Service(Post)
const serviceComment = new Service(Comment)

const getProfile = async (req, res) => {
  try {
    const user = await serviceUser.getById(req.params.userId).select('-password')
    if (!user) {
      return res.status(404).json({
        msg: 'User not found'
      })
    }
    const posts = await servicePost.get({ userId: req.params.userId })

    const comments = await serviceComment.get({ userId: req.params.userId })

    res.status(200).json({
      user,
      posts,
      comments
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    })
  }
}

const updateProfile = async (req, res) => {
  try {
    const { bio, avatar } = req.body
    const user = await serviceUser.updateById(req.user._id, { bio, avatar })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

export {
  getProfile,
  updateProfile
}
