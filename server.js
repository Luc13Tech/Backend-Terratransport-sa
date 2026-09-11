import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './src/config/db.js'

import authRoutes from './src/routes/auth.routes.js'
import vehicleRoutes from './src/routes/vehicle.routes.js'
import serviceRoutes from './src/routes/service.routes.js'
import contentRoutes from './src/routes/content.routes.js'
import uploadRoutes from './src/routes/upload.routes.js'
import seedRoutes from './src/routes/seed.routes.js'

const app = express()

app.use(
  cors({
    origin: process.env.FRONTEND_URL || '*',
  })
)
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'terratransport-backend' })
})
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRoutes)
app.use('/api/vehicles', vehicleRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/seed', seedRoutes)

// Gestionnaire d'erreurs générique (attrape aussi les erreurs multer, ex: fichier trop lourd)
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ error: err.message || 'Erreur serveur.' })
})

const PORT = process.env.PORT || 4000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Serveur Terratransport démarré sur le port ${PORT}`)
  })
})
