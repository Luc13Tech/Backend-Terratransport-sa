import multer from 'multer'

// On garde le fichier en mémoire (pas sur disque) puis on l'envoie directement
// à Cloudinary dans le contrôleur — plus simple et plus sûr sur un service
// comme Render où le disque n'est pas persistant.
const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8 Mo max par image
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Seuls les fichiers image sont acceptés.'))
    }
    cb(null, true)
  },
})

export default upload
