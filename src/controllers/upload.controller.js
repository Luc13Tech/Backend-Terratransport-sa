import cloudinary from '../config/cloudinary.js'

// POST /api/upload — protégé, champ de formulaire "image"
export async function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'Aucune image reçue.' })
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'terratransport' },
        (err, result) => (err ? reject(err) : resolve(result))
      )
      stream.end(req.file.buffer)
    })

    res.json({ url: result.secure_url, publicId: result.public_id })
  } catch (err) {
    console.error('Erreur upload Cloudinary :', err.message)
    res.status(500).json({ error: "Échec de l'envoi de l'image." })
  }
}

// POST /api/upload/delete — protégé, body: { publicId }
export async function deleteImage(req, res) {
  const { publicId } = req.body
  if (!publicId) {
    return res.status(400).json({ error: 'publicId requis.' })
  }
  try {
    await cloudinary.uploader.destroy(publicId)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: "Échec de la suppression de l'image." })
  }
}
