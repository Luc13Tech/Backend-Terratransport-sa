import { Router } from 'express'
import { seedData, seedAdmin } from '../controllers/seed.controller.js'

const router = Router()

router.post('/data', seedData)
router.post('/admin', seedAdmin)

export default router
