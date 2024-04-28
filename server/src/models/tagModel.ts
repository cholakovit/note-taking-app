
import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'
  }]
}, { timestamps: true })

//TagSchema.index({ tag: 'text' })
TagSchema.index({ name: 1 });

export default mongoose.model('Tag', TagSchema)




