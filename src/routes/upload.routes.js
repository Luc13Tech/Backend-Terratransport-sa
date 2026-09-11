import { Router } from 'express'
import { uploadImage, deleteImage } from '../controllers/upload.controller.js'
import { requireAuth } from '../middleware/auth.js'
import upload from '../middleware/upload.js'

const router = Router()

router.post('/', requireAuth, upload.single('image'), uploadImage)
router.post('/delete', requireAuth, deleteImage)

export default router
