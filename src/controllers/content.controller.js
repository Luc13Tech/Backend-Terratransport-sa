import Content from '../models/Content.js'

// GET /api/content?page=home — public
export async function listContent(req, res) {
  const { page } = req.query
  const filter = page ? { page } : {}
  const items = await Content.find(filter).sort({ page: 1, key: 1 })

  // Le frontend public préfère recevoir un objet { clé: valeur } plutôt
  // qu'un tableau, pour aller chercher directement content['home.hero.title']
  const asMap = {}
  for (const item of items) {
    asMap[item.key] = item.value
  }
  res.json(asMap)
}

// GET /api/content/admin?page=home — protégé, renvoie les objets complets (avec labels, types) pour l'interface d'édition
export async function listContentForAdmin(req, res) {
  const { page } = req.query
  const filter = page ? { page } : {}
  const items = await Content.find(filter).sort({ page: 1, key: 1 })
  res.json(items)
}

// PUT /api/content/:key — protégé, met à jour (ou crée si absent) un bloc de contenu
export async function upsertContent(req, res) {
  const { key } = req.params
  const { value, page, label, type } = req.body

  const content = await Content.findOneAndUpdate(
    { key },
    { value, page, label, type },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  )
  res.json(content)
}
