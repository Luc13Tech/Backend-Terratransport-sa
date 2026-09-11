import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    imagePublicId: { type: String, default: '' },
    // Nom d'icône lucide-react à utiliser côté frontend (ex: "Mountain", "Truck", "Fuel")
    icon: { type: String, default: 'Truck' },
    link: { type: String, default: '' }, // ex: "/hydrocarbures"
    linkLabel: { type: String, default: '' },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
)

serviceSchema.index({ order: 1 })

export default mongoose.model('Service', serviceSchema)
