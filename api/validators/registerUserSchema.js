import joi from 'joi'
import User from '../models/User.js'

const userNotExists = async (email, helpers) => {
  const user = await User.findOne({ email })
  if (user != null) {
    return helpers.error('user.userAlreadyExists', { v: email })
  }
  return email
}

const registerUserSchema = joi.object({
  email: joi.string().email().external(userNotExists).required(),
  password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+]{8,16}$'))
    .required(),
  username: joi.string().required(),
  bio: joi.string().max(250).optional(),
  lastName: joi.string().required(),
  firstName: joi.string().required()
})

export default registerUserSchema
