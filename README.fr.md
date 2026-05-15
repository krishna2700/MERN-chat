# Boutique de Produits Full-Stack

Une application de boutique de produits MERN (MongoDB, Express, React, Node.js) complète avec des fonctionnalités CRUD. Les produits peuvent être créés, lus, mis à jour et supprimés via une API REST soutenue par MongoDB.

## Démo en ligne

[https://full-stack-project-deployment-product.onrender.com/](https://full-stack-project-deployment-product.onrender.com/)

## Stack technologique

- **Frontend :** React, Vite
- **Backend :** Node.js, Express.js
- **Base de données :** MongoDB (Mongoose ODM)
- **Déploiement :** Render.com

## Structure du projet

```
├── backend/
│   ├── config/       # Connexion à la base de données
│   ├── controllers/  # Logique des routes
│   ├── models/       # Schémas Mongoose
│   ├── routes/       # Routes de l'API
│   └── server.js     # Point d'entrée
├── frontend/         # Application React
└── package.json
```

## Démarrage

### Prérequis

- Node.js v18+
- Compte MongoDB Atlas (ou MongoDB local)

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/krishna2700/Full-Stack-Project-Deployment--Product-Store.git
cd Full-Stack-Project-Deployment--Product-Store

# Installer les dépendances
npm install

# Configurer les variables d'environnement
# Créer un fichier .env à la racine avec :
# MONGO_URI=votre_chaîne_de_connexion_mongodb
# PORT=5000

# Lancer en mode développement
npm run dev
```

## Points d'accès de l'API

| Méthode | Endpoint           | Description              |
|---------|--------------------|--------------------------|
| GET     | /api/products      | Obtenir tous les produits |
| POST    | /api/products      | Créer un produit         |
| PUT     | /api/products/:id  | Mettre à jour un produit |
| DELETE  | /api/products/:id  | Supprimer un produit     |

## Licence

MIT
