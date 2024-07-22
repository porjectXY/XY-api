import { Router } from 'express'
import { faker } from '@faker-js/faker'
import User from '../models/User.js'
import Post from '../models/Post.js'
import Comment from '../models/Comment.js'

const testRouter = Router()

const USER_COUNT = 30
const POST_COUNT = 30
const COMMENT_COUNT = 100

const createFakeUser = () => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    bio: faker.lorem.sentence(),
    avatar: faker.image.avatar()
  }
}

const createFakePost = (userIds) => {
  return {
    userId: faker.helpers.arrayElement(userIds),
    content: faker.lorem.paragraph()
  }
}

const createFakeComment = (userIds, postIds) => {
  return {
    userId: faker.helpers.arrayElement(userIds),
    postId: faker.helpers.arrayElement(postIds),
    content: faker.lorem.sentence()
  }
}

testRouter.get('/faker', async (_req, res) => {
  const userArray = []
  const postArray = []
  const commentArray = []

  for (let i = 0; i < USER_COUNT; i++) {
    userArray.push(User.create(createFakeUser()))
  }
  const createdUsers = await Promise.all(userArray)
  const userIds = createdUsers.map(user => user._id)

  for (let i = 0; i < POST_COUNT; i++) {
    postArray.push(Post.create(createFakePost(userIds)))
  }

  const createdPosts = await Promise.all(postArray)
  const postIds = createdPosts.map(post => post._id)

  for (let i = 0; i < COMMENT_COUNT; i++) {
    commentArray.push(Comment.create(createFakeComment(userIds, postIds)))
  }

  const comments = await Promise.all(commentArray)

  return res.json({
    msg: 'DB',
    users: createdUsers.length,
    posts: createdPosts.length,
    comments: comments.length

  })
})

export default testRouter
