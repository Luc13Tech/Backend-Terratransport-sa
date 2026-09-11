import { Router } from 'express'
import {
  listServices,
  listAllServices,
  createService,
  updateService,
  deleteService,
} from '../controllers/service.controller.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', listServices)
router.get('/admin/all', requireAuth, listAllServices)
router.post('/', requireAuth, createService)
router.put('/:id', requireAuth, updateService)
router.delete('/:id', requireAuth, deleteService)

export default router
