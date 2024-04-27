import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide username'],
    maxlength: 50,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    maxlength: 150,
  }
}, { timestamps: true })


UserSchema.index({ username: 'text', password: 'text' });

export default mongoose.model('User', UserSchema)