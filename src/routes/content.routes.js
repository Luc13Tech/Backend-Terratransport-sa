import { Router } from 'express'
import { listContent, listContentForAdmin, upsertContent } from '../controllers/content.controller.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', listContent)
router.get('/admin', requireAuth, listContentForAdmin)
router.put('/:key', requireAuth, upsertContent)

export default router
