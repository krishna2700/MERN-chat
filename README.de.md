# Full-Stack Produktshop

Eine vollständige MERN (MongoDB, Express, React, Node.js) Produktshop-Anwendung mit vollständiger CRUD-Funktionalität. Produkte können über eine saubere REST-API, die von MongoDB unterstützt wird, erstellt, gelesen, aktualisiert und gelöscht werden.

## Live-Demo

[https://full-stack-project-deployment-product.onrender.com/](https://full-stack-project-deployment-product.onrender.com/)

## Technologie-Stack

- **Frontend:** React, Vite
- **Backend:** Node.js, Express.js
- **Datenbank:** MongoDB (Mongoose ODM)
- **Bereitstellung:** Render.com

## Projektstruktur

```
├── backend/
│   ├── config/       # Datenbankverbindung
│   ├── controllers/  # Routenlogik
│   ├── models/       # Mongoose-Schemata
│   ├── routes/       # API-Routen
│   └── server.js     # Einstiegspunkt
├── frontend/         # React-Anwendung
└── package.json
```

## Erste Schritte

### Voraussetzungen

- Node.js v18+
- MongoDB Atlas-Konto (oder lokales MongoDB)

### Installation

```bash
# Repository klonen
git clone https://github.com/krishna2700/Full-Stack-Project-Deployment--Product-Store.git
cd Full-Stack-Project-Deployment--Product-Store

# Abhängigkeiten installieren
npm install

# Umgebungsvariablen einrichten
# Erstelle eine .env-Datei im Stammverzeichnis mit:
# MONGO_URI=deine_mongodb_verbindungszeichenfolge
# PORT=5000

# Im Entwicklungsmodus starten
npm run dev
```

## API-Endpunkte

| Methode | Endpunkt           | Beschreibung              |
|---------|--------------------|---------------------------|
| GET     | /api/products      | Alle Produkte abrufen     |
| POST    | /api/products      | Ein Produkt erstellen     |
| PUT     | /api/products/:id  | Ein Produkt aktualisieren |
| DELETE  | /api/products/:id  | Ein Produkt löschen       |

## Lizenz

MIT
