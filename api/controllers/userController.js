import User from '../models/User.js'
import Post from '../models/Post.js'
import Comment from '../models/Comment.js'
import Service from '../services/Service.js'

const serviceUser = new Service(User)
const servicePost = new Service(Post)
const serviceComment = new Service(Comment)

const getUser = async (req, res) => {
  try {
    const users = await serviceUser.get().select('-password')
    if (!users) {
      return res.status(404).json({ msg: 'user not found' })
    }
    res.status(200).json({ msg: 'user:', users })
  } catch (error) {
    res.status(500).json({
      msg: 'user not found',
      Error: error.message
    })
  }
}

const getUserById = async (req, res) => {
  const { userId } = req.params
  try {
    const user = await serviceUser.getById(userId).select('-password')
    if (!user) {
      return res.status(404).json({ msg: 'User not found ' })
    }

    const posts = await servicePost.get({ userId: user._id }).populate('comments').exec()

    const postIds = posts.map(post => post._id)
    const comments = await serviceComment.get({ postId: { $in: postIds } }).exec()

    const postsWithComments = posts.map(post => ({
      ...post.toObject(),
      comments: comments.filter(comment => comment.postId.equals(post._id))
    }))

    res.status(200).json({ user, posts: postsWithComments })
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ msg: 'server error', Error: error.message })
  }
}

export {
  getUser,
  getUserById
}
