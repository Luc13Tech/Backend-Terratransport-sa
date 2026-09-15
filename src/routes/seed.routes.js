import { Router } from 'express'
import { seedData, seedAdmin, seedContentAndPartners } from '../controllers/seed.controller.js'

const router = Router()

router.post('/data', seedData)
router.post('/admin', seedAdmin)
router.post('/content-partners', seedContentAndPartners)

export default router
