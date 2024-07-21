// import Post from '../models/Post.js'
import User from '../models/User.js'
import Service from '../services/Service.js'

// const servicePost = new Service(Post)
const serviceUser = new Service(User)

const search = async (req, res) => {
  try {
    const { searchTerm } = req.query
    if (!searchTerm) {
      return res.status(400).json({ message: 'Search term is required' })
    }

    /* const postQuery = {
      post: { $regex: searchTerm, $options: 'i' }
    } */

    const userQuery = {
      username: { $regex: searchTerm, $options: 'i' }
    }

    // const posts = await servicePost.get(postQuery)
    const users = await serviceUser.get(userQuery)

    res.json({ users })
  } catch (error) {
    console.error('Error in search:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export {
  search
}
