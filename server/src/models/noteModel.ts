
import mongoose from 'mongoose'

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide note title'],
    maxlength: 50,
  },
  description: {
    type: String,
    required: [true, 'Please provide note description'],
    maxlength: 200,
  },
  tags: {
    type: String,
    required: [true, 'Please provide note tags'],
  }
}, { timestamps: true })

export default mongoose.model('Note', NoteSchema)





