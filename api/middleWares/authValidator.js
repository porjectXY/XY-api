import jwt from 'jwt-simple'
import { token as tokenConfig } from '../config/index.js'
import User from '../models/User.js'
import Service from '../services/Service.js'

const userService = new Service(User)

export const authUser = () => async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({
      msg: 'missing token header'
    })
  }

  try {
    const payload = jwt.decode(token, tokenConfig.secret)

    const user = await userService.getById(payload.userId).select(
      '-password -isActive'
    )

    if (!user) {
      return res.status(401).json({
        msg: 'Invalid token, user not found'
      })
    }

    req.user = user

    next()
  } catch (error) {
    console.error(error)
    return res.status(403).json({
      msg: 'Invalid token'
    })
  }
}
