import mongoose from 'mongoose'

const vehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['camions', 'citernes', 'bus', 'semi-remorques', 'vehicules'],
    },
    // Produit transporté — uniquement pertinent pour la catégorie "citernes" (Gasoil / Fioul)
    product: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    image: { type: String, required: true }, // URL Cloudinary (ou URL statique existante en transition)
    imagePublicId: { type: String, default: '' }, // pour pouvoir supprimer l'image sur Cloudinary
    specs: { type: [String], default: [] },
    order: { type: Number, default: 0 }, // ordre d'affichage dans la catégorie
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
)

vehicleSchema.index({ category: 1, order: 1 })

export default mongoose.model('Vehicle', vehicleSchema)
