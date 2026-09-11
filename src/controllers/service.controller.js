import Service from '../models/Service.js'
import cloudinary from '../config/cloudinary.js'

export async function listServices(req, res) {
  const services = await Service.find({ published: true }).sort({ order: 1, createdAt: 1 })
  res.json(services)
}

export async function listAllServices(req, res) {
  const services = await Service.find().sort({ order: 1, createdAt: 1 })
  res.json(services)
}

export async function createService(req, res) {
  const service = await Service.create(req.body)
  res.status(201).json(service)
}

export async function updateService(req, res) {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!service) return res.status(404).json({ error: 'Service introuvable.' })
  res.json(service)
}

export async function deleteService(req, res) {
  const service = await Service.findByIdAndDelete(req.params.id)
  if (!service) return res.status(404).json({ error: 'Service introuvable.' })

  if (service.imagePublicId) {
    try {
      await cloudinary.uploader.destroy(service.imagePublicId)
    } catch (err) {
      console.warn('Suppression Cloudinary échouée pour', service.imagePublicId, err.message)
    }
  }

  res.json({ success: true })
}
