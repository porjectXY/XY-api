import express from 'express'
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import postRouter from './routes/postRoutes.js'
import searchRouter from './routes/searchRoutes.js'
import notificationRouter from './routes/notificationRoutes.js'

const api = express()
api.use(express.json())

api.get('/test', (req, res) => {
  res.json({
    msg: 'Api Online'
  })
})

api.use('/auth', authRouter)
api.use('/users', userRouter)
api.use('/posts', postRouter)
api.use('/search', searchRouter)
api.use('/notifications', notificationRouter)

export default api
