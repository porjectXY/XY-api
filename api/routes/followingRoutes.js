import { Router } from 'express'
import Post from '../models/Post.js'
import User from '../models/User.js'
import mongoose from 'mongoose'
import { authUser } from '../middleWares/authValidator.js'

const followingRouter = Router()

// Obtener posts de los usuarios seguidos por el usuario logueado
followingRouter.get('/followings/posts', authUser(), async (req, res) => {
  try {
    // Obtener el ID del usuario logueado desde req.user.id
    const loggedInUserId = req.user.id

    // Buscar el usuario logueado
    const loggedInUser = await User.findById(loggedInUserId).exec()

    if (!loggedInUser) {
      return res.status(404).json({ msg: 'User not found' })
    }

    // Obtener los IDs de los usuarios seguidos
    const followingUserIds = loggedInUser.following

    if (followingUserIds.length === 0) {
      return res.json({ followingPosts: [] })
    }

    // Convertir los IDs de los usuarios seguidos a ObjectId
    const followingUserObjectIds = followingUserIds.map(id => mongoose.Types.ObjectId(id))

    // Buscar los posts de los usuarios seguidos y popular el campo userId con la información del usuario
    const followingPosts = await Post.find({ userId: { $in: followingUserObjectIds } })
      .populate('userId', 'username avatar') // Ajusta los campos que quieres incluir del usuario
      .exec()

    res.json({
      followingPosts: followingPosts.map(post => ({
        id: post._id,
        userId: post.userId._id, // Aquí aseguramos que solo se incluya el ID del usuario
        username: post.userId.username, // Incluimos el nombre de usuario del autor del post
        avatar: post.userId.avatar, // Incluimos el avatar del autor del post
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
