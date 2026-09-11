import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

export async function login(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis.' })
  }

  const admin = await Admin.findOne({ email: email.toLowerCase().trim() })
  if (!admin) {
    return res.status(401).json({ error: 'Identifiants incorrects.' })
  }

  const valid = await admin.checkPassword(password)
  if (!valid) {
    return res.status(401).json({ error: 'Identifiants incorrects.' })
  }

  const token = jwt.sign(
    { id: admin._id, email: admin.email, name: admin.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  res.json({ token, admin: { id: admin._id, email: admin.email, name: admin.name } })
}

// Vérifie qu'un token est toujours valide (utilisé au chargement de l'admin)
export async function me(req, res) {
  const admin = await Admin.findById(req.admin.id).select('-passwordHash')
  if (!admin) return res.status(404).json({ error: 'Administrateur introuvable.' })
  res.json({ admin })
}
