import mongoose from 'mongoose'

const partnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
)

partnerSchema.index({ order: 1 })

export default mongoose.model('Partner', partnerSchema)
