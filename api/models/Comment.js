import { Schema, model } from 'mongoose'

const commentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  }

}, { timestamps: true })

export default model('Comment', commentSchema)
