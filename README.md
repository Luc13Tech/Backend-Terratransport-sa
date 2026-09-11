# Terratransport — Backend

API Node.js / Express pour la plateforme Terratransport & Industrie Mobile.
Gère la flotte, les services, le contenu éditable des pages, l'authentification
admin, et l'upload d'images vers Cloudinary.

## Stack

- Node.js + Express
- MongoDB (via Mongoose)
- Cloudinary (stockage des images)
- JWT (authentification admin)

## Installation locale

```bash
npm install
cp .env.example .env
```

Remplis `.env` avec :
- `MONGODB_URI` : ta chaîne de connexion MongoDB Atlas
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` : depuis le dashboard Cloudinary
- `JWT_SECRET` : une longue chaîne aléatoire (ex: générée avec `openssl rand -hex 32`)
- `SEED_SECRET` : une autre chaîne aléatoire, sert uniquement à protéger les routes de seed
- `FRONTEND_URL` : l'URL de ton site (ex: `https://terratransport-sa.com`)

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:4000`.

## Premier démarrage — initialiser la base de données

Ces deux appels ne doivent être faits **qu'une seule fois**, juste après le
premier déploiement, sur une base vide.

**1. Créer le premier compte admin :**
```bash
curl -X POST "https://TON-BACKEND.onrender.com/api/seed/admin?secret=TA_SEED_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"name":"Luc Deguenon","email":"admin@terratransport-sa.com","password":"un-mot-de-passe-solide"}'
```

**2. Importer les véhicules, services et contenus actuels :**
```bash
curl -X POST "https://TON-BACKEND.onrender.com/api/seed/data?secret=TA_SEED_SECRET"
```

Si la base contient déjà des données, cette route refuse d'agir (pour éviter
les doublons) — c'est normal et volontaire.

## Routes principales

| Méthode | Route | Accès | Description |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Connexion admin, renvoie un token |
| GET | `/api/auth/me` | Protégé | Vérifie le token, renvoie le profil admin |
| GET | `/api/vehicles?category=camions` | Public | Liste des véhicules publiés |
| GET | `/api/vehicles/admin/all` | Protégé | Tous les véhicules (admin) |
| POST/PUT/DELETE | `/api/vehicles` | Protégé | Créer / modifier / supprimer un véhicule |
| GET | `/api/services` | Public | Liste des services publiés |
| POST/PUT/DELETE | `/api/services` | Protégé | Créer / modifier / supprimer un service |
| GET | `/api/content?page=home` | Public | Blocs de texte d'une page |
| PUT | `/api/content/:key` | Protégé | Modifier un bloc de texte |
| POST | `/api/upload` | Protégé | Envoie une image à Cloudinary (form-data, champ `image`) |
| POST | `/api/upload/delete` | Protégé | Supprime une image Cloudinary (body: `{ publicId }`) |

Toutes les routes protégées attendent un header :
```
Authorization: Bearer <token reçu au login>
```

## Déploiement sur Render

1. Nouveau **Web Service** connecté à ce dépôt GitHub
2. Build Command : `npm install`
3. Start Command : `npm start`
4. Ajoute toutes les variables de `.env.example` dans l'onglet **Environment** de Render
5. Une fois déployé, exécute les deux appels de seed ci-dessus avec l'URL Render

## Sécurité

- `.env` n'est jamais commité (voir `.gitignore`)
- Les routes de seed sont protégées par `SEED_SECRET` et refusent d'écraser des données existantes
- Les mots de passe admin sont hashés avec bcrypt, jamais stockés en clair
