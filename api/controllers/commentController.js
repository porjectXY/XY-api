import Post from '../models/Post.js'
import Comment from '../models/Comment.js'
import Service from '../services/Service.js'

const servicePost = new Service(Post)
const serviceComment = new Service(Comment)

const addComment = async (req, res) => {
  try {
    const { postId, userId } = req.params
    const { content } = req.body
    const post = await servicePost.getById(postId)
    if (!post) {
      return res.status(404).json({
        msg: 'Post not found'
      })
    }
    const newComment = await serviceComment.create({ postId, userId, content })
    return res.status(201).json({
      msg: 'comment published',
      newComment
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      msg: 'Error adding comment',
      error: error.message
    })
  }
}

export {
  addComment
}
