import User from '../models/User.js'
import Service from '../services/Service.js'
import { token as tokenConfig } from '../config/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jwt-simple'

const serviceUser = new Service(User)

const register = async (req, res) => {
  const user = req.body

  if (!user || !user.password) {
    return res.status(400).json({
      msg: 'User data or password missing'
    })
  }

  try {
    user.password = await bcrypt.hash(user.password, 10)
    const newUser = await serviceUser.create(user)
    newUser.password = undefined
    return res.json({
      msg: 'User created',
      user
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Error creating user',
      error
    })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await serviceUser.getOne({
    email
  })
  if (!user) {
    return res.status(404).json({
      msg: 'User not found'
    })
  }
  const passwordMatched = await bcrypt.compare(password, user.password)
  if (passwordMatched) {
    const payload = {
      userId: user._id
    }
    const token = jwt.encode(payload, tokenConfig.secret)
    return res.json({
      msg: 'login succes',
      token
    })
  } else {
    return res.status(401).json({
      msg: 'Invalid credentials'
    })
  }
}

const me = (req, res) => {
  return res.json({
    user: req.user
  })
}

export {
  register,
  login,
  me
}
