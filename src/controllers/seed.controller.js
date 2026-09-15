import Vehicle from '../models/Vehicle.js'
import Service from '../models/Service.js'
import Content from '../models/Content.js'
import Admin from '../models/Admin.js'
import Partner from '../models/Partner.js'
import { buildSeedVehicles, buildSeedServices, buildSeedContent, buildSeedPartners } from '../utils/seedData.js'

function checkSeedSecret(req, res) {
  const provided = req.query.secret || req.body.secret
  if (!provided || provided !== process.env.SEED_SECRET) {
    res.status(403).json({ error: 'Clé de seed invalide ou manquante (?secret=...).' })
    return false
  }
  return true
}

// POST /api/seed/data?secret=... — remplit véhicules, services et contenu
// (n'écrase rien : à n'exécuter qu'une seule fois, sur une base vide)
export async function seedData(req, res) {
  if (!checkSeedSecret(req, res)) return

  const existingVehicles = await Vehicle.countDocuments()
  const existingServices = await Service.countDocuments()

  if (existingVehicles > 0 || existingServices > 0) {
    return res.status(409).json({
      error:
        'La base contient déjà des données (véhicules ou services). Seed annulé pour éviter les doublons. Vide les collections manuellement si tu veux relancer.',
    })
  }

  const vehicles = await Vehicle.insertMany(buildSeedVehicles())
  const services = await Service.insertMany(buildSeedServices())

  const contentItems = buildSeedContent()
  for (const item of contentItems) {
    await Content.findOneAndUpdate({ key: item.key }, item, { upsert: true })
  }

  res.json({
    success: true,
    vehicles: vehicles.length,
    services: services.length,
    content: contentItems.length,
  })
}

// POST /api/seed/admin?secret=... — crée le tout premier compte admin
// Body attendu: { name, email, password }
export async function seedAdmin(req, res) {
  if (!checkSeedSecret(req, res)) return

  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email et password sont requis.' })
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Le mot de passe doit faire au moins 8 caractères.' })
  }

  const existing = await Admin.findOne({ email: email.toLowerCase().trim() })
  if (existing) {
    return res.status(409).json({ error: 'Un administrateur existe déjà avec cet email.' })
  }

  const passwordHash = await Admin.hashPassword(password)
  const admin = await Admin.create({ name, email: email.toLowerCase().trim(), passwordHash })

  res.status(201).json({ success: true, admin: { id: admin._id, email: admin.email, name: admin.name } })
}

// POST /api/seed/content-partners?secret=... — met à jour/complète les blocs
// de contenu (upsert, sans risque à relancer) et crée les partenaires s'il
// n'y en a pas encore. Séparé de seedData() car vehicles/services existent
// déjà et bloqueraient sinon avec une erreur 409.
export async function seedContentAndPartners(req, res) {
  if (!checkSeedSecret(req, res)) return

  const contentItems = buildSeedContent()
  for (const item of contentItems) {
    await Content.findOneAndUpdate({ key: item.key }, item, { upsert: true })
  }

  const existingPartners = await Partner.countDocuments()
  let partnersCreated = 0
  if (existingPartners === 0) {
    const partners = await Partner.insertMany(buildSeedPartners())
    partnersCreated = partners.length
  }

  res.json({
    success: true,
    content: contentItems.length,
    partnersCreated,
    partnersSkipped: existingPartners > 0,
  })
}
