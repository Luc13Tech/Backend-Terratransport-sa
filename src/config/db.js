import mongoose from 'mongoose'

export async function connectDB() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI manquant dans les variables d\'environnement.')
    process.exit(1)
  }

  try {
    await mongoose.connect(uri)
    console.log('MongoDB connecté.')
  } catch (err) {
    console.error('Échec de connexion à MongoDB :', err.message)
    process.exit(1)
  }
}
