import { Schema, model } from 'mongoose'

const postSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, ref: 'User', required: true
  },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  isActive: {
    type: Boolean,
    required: true,
    default: true
  }

}, { timestamps: true })

export default model('Post', postSchema)
