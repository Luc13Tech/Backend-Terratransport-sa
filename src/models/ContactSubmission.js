import mongoose from 'mongoose'

const contactSubmissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    category: { type: String, default: '' },
    message: { type: String, default: '' },
    // On garde une trace même si l'envoi se fait finalement via WhatsApp côté client
    sentToWhatsapp: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.model('ContactSubmission', contactSubmissionSchema)
