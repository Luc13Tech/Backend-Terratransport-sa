import Partner from '../models/Partner.js'

export async function listPartners(req, res) {
  const partners = await Partner.find({ published: true }).sort({ order: 1, createdAt: 1 })
  res.json(partners)
}

export async function listAllPartners(req, res) {
  const partners = await Partner.find().sort({ order: 1, createdAt: 1 })
  res.json(partners)
}

export async function createPartner(req, res) {
  const partner = await Partner.create(req.body)
  res.status(201).json(partner)
}

export async function updatePartner(req, res) {
  const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!partner) return res.status(404).json({ error: 'Partenaire introuvable.' })
  res.json(partner)
}

export async function deletePartner(req, res) {
  const partner = await Partner.findByIdAndDelete(req.params.id)
  if (!partner) return res.status(404).json({ error: 'Partenaire introuvable.' })
  res.json({ success: true })
}
