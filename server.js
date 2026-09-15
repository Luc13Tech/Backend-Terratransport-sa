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
import partnerRoutes from './src/routes/partner.routes.js'

const app = express()

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://terratransport-sa.com',
  'https://www.terratransport-sa.com',
]
  .filter(Boolean)
  .map((o) => o.replace(/\/$/, '')) // enlève un éventuel "/" final qui casserait la comparaison

app.use(
  cors({
    origin: (origin, callback) => {
      // Pas d'origine = outil comme curl/Hoppscotch ou requête same-origin : on laisse passer.
      if (!origin) return callback(null, true)
      const normalized = origin.replace(/\/$/, '')
      if (allowedOrigins.includes(normalized)) return callback(null, true)
      console.warn('CORS refusé pour l\'origine :', origin)
      return callback(new Error('Non autorisé par CORS'))
    },
    credentials: true,
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
app.use('/api/partners', partnerRoutes)

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
