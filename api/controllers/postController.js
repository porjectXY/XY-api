import Post from '../models/Post.js'
import Service from '../services/Service.js'

const servicePost = new Service(Post)

const createPost = async (req, res) => {
  try {
    const { content } = req.body
    const { userId } = req.params
    const newPost = await servicePost.create({ userId, content })
    if (!newPost) {
      return res.status(404).json({
        msg: 'no public post'
      })
    }
    res.status(201).json({
      msg: 'Post created',
      post: newPost
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Error creating post',
      error: error.message
    })
  }
}

const getPosts = async (req, res) => {
  try {
    const posts = await servicePost.get().populate('userId', 'username') // Asegúrate de que 'userId' está referenciado en el modelo
      .select('userId username content comments likes')
    if (!posts) {
      return res.status(404).json({
        msg: 'posts is no founds'
      })
    }
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getPostsUserById = async (req, res) => {
  try {
    const { userId } = req.params
    const posts = await servicePost.get({ userId }).populate('userId', 'username') // Asegúrate de que 'userId' está referenciado en el modelo
      .select('userId username content comments likes')
    if (!posts || posts.length === 0) {
      return res.status(404).json({
        msg: 'Posts not foud'
      })
    }
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export {
  createPost,
  getPosts,
  getPostsUserById
}
