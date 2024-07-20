import { Schema, model } from 'mongoose'

const userSchema = new Schema({

  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    maxlength: 250
  },
  avatar: {
    type: String
  },
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  isActive: {
    type: Boolean,
    required: true,
    default: true
  }

}, { timestamps: true })

export default model('User', userSchema)
