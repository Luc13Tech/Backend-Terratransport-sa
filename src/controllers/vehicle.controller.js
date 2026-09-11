import Vehicle from '../models/Vehicle.js'
import cloudinary from '../config/cloudinary.js'

// GET /api/vehicles?category=camions — public, utilisé par le site
export async function listVehicles(req, res) {
  const { category } = req.query
  const filter = { published: true }
  if (category) filter.category = category

  const vehicles = await Vehicle.find(filter).sort({ category: 1, order: 1, createdAt: 1 })
  res.json(vehicles)
}

// GET /api/vehicles/all — protégé, utilisé par l'admin (inclut les non publiés)
export async function listAllVehicles(req, res) {
  const vehicles = await Vehicle.find().sort({ category: 1, order: 1, createdAt: 1 })
  res.json(vehicles)
}

export async function getVehicle(req, res) {
  const vehicle = await Vehicle.findById(req.params.id)
  if (!vehicle) return res.status(404).json({ error: 'Véhicule introuvable.' })
  res.json(vehicle)
}

// POST /api/vehicles — protégé
export async function createVehicle(req, res) {
  const vehicle = await Vehicle.create(req.body)
  res.status(201).json(vehicle)
}

// PUT /api/vehicles/:id — protégé
export async function updateVehicle(req, res) {
  const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!vehicle) return res.status(404).json({ error: 'Véhicule introuvable.' })
  res.json(vehicle)
}

// DELETE /api/vehicles/:id — protégé, supprime aussi l'image sur Cloudinary
export async function deleteVehicle(req, res) {
  const vehicle = await Vehicle.findByIdAndDelete(req.params.id)
  if (!vehicle) return res.status(404).json({ error: 'Véhicule introuvable.' })

  if (vehicle.imagePublicId) {
    try {
      await cloudinary.uploader.destroy(vehicle.imagePublicId)
    } catch (err) {
      console.warn('Suppression Cloudinary échouée pour', vehicle.imagePublicId, err.message)
    }
  }

  res.json({ success: true })
}
