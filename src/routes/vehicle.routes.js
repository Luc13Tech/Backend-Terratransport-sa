import { Router } from 'express'
import {
  listVehicles,
  listAllVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from '../controllers/vehicle.controller.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Publiques (utilisées par le site)
router.get('/', listVehicles)
router.get('/:id', getVehicle)

// Protégées (utilisées par l'admin)
router.get('/admin/all', requireAuth, listAllVehicles)
router.post('/', requireAuth, createVehicle)
router.put('/:id', requireAuth, updateVehicle)
router.delete('/:id', requireAuth, deleteVehicle)

export default router
