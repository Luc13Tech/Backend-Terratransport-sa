import { Router } from 'express'
import {
  listPartners,
  listAllPartners,
  createPartner,
  updatePartner,
  deletePartner,
} from '../controllers/partner.controller.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', listPartners)
router.get('/admin/all', requireAuth, listAllPartners)
router.post('/', requireAuth, createPartner)
router.put('/:id', requireAuth, updatePartner)
router.delete('/:id', requireAuth, deletePartner)

export default router
