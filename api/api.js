import express from 'express'
import authRouter from './routes/authRoutes.js'

const api = express()
api.use(express.json())

api.get('/test', (req, res) => {
  res.json({
    msg: 'Api Online'
  })
})

api.use('/auth', authRouter)

export default api
