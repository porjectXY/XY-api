import Notification from '../models/Notification.js'
import User from '../models/User.js'
import Service from '../services/Service.js'
import Post from '../models/Post.js'
import Comment from '../models/Comment.js'

const notificationService = new Service(Notification)
const userService = new Service(User)
const postService = new Service(Post)
const commentService = new Service(Comment)

export const followUser = async (req, res) => {
  try {
    const { userId, followUserId } = req.body

    const user = await userService.getById(userId)
    if (!user.following.includes(followUserId)) {
      user.following.push(followUserId)
      await user.save()

      const notificationData = {
        userId: followUserId,
        type: 'follow',
        message: `${user.username} started following you`,
        relatedUserId: userId
      }
      await notificationService.create(notificationData)

      res.status(200).json({ message: 'Followed successfully' })
    } else {
      res.status(400).json({ message: 'Already following this user' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const addComment = async (req, res) => {
  try {
    const { postId, userId, commentText } = req.body

    const post = await postService.getById(postId)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const newComment = await commentService.create({
      postId,
      userId,
      content: commentText
    })
    await newComment.save()

    post.comments.push(newComment._id)
    await post.save()

    const postAuthor = await userService.getById(post.userId)
    if (!postAuthor) {
      return res.status(404).json({ message: 'Author not found' })
    }

    const notificationData = {
      userId: post.userId,
      type: 'comment',
      message: `${userId} commented on your post`,
      relatedUserId: userId,
      postId
    }
    await notificationService.create(notificationData)

    res.status(200).json({ message: 'Comment added successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
