import { Schema, model } from 'mongoose'

const notificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  message: { type: String },
  read: { type: Boolean, default: false },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  }

}, { timestamps: true })

export default model('Notification', notificationSchema)
