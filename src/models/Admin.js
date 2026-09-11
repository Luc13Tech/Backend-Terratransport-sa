import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
)

adminSchema.methods.checkPassword = function (candidate) {
  return bcrypt.compare(candidate, this.passwordHash)
}

adminSchema.statics.hashPassword = function (plain) {
  return bcrypt.hash(plain, 10)
}

export default mongoose.model('Admin', adminSchema)
