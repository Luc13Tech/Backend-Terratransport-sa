import mongoose from 'mongoose'

// Modèle générique pour tous les blocs de texte éditables du site (hero, mission,
// vision, paragraphes de la page hydrocarbures, etc.). Chaque bloc a une clé
// unique (ex: "home.hero.title") que le frontend utilise pour aller chercher
// la bonne valeur, et l'admin peut éditer via une liste organisée par page.
const contentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    page: { type: String, required: true, trim: true }, // ex: "home", "about", "hydrocarbures"
    label: { type: String, required: true, trim: true }, // nom lisible pour l'admin
    // "text" pour un champ simple, "richtext" pour un paragraphe plus long,
    // "list" pour un tableau de chaînes (ex: liste à puces)
    type: { type: String, enum: ['text', 'richtext', 'list'], default: 'text' },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
)

contentSchema.index({ page: 1 })

export default mongoose.model('Content', contentSchema)
