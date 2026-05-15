# Tienda de Productos Full-Stack

Una aplicación de tienda de productos MERN (MongoDB, Express, React, Node.js) completa con funcionalidad CRUD. Los productos se pueden crear, leer, actualizar y eliminar a través de una API REST respaldada por MongoDB.

## Demo en vivo

[https://full-stack-project-deployment-product.onrender.com/](https://full-stack-project-deployment-product.onrender.com/)

## Tecnologías utilizadas

- **Frontend:** React, Vite
- **Backend:** Node.js, Express.js
- **Base de datos:** MongoDB (Mongoose ODM)
- **Despliegue:** Render.com

## Estructura del proyecto

```
├── backend/
│   ├── config/       # Conexión a la base de datos
│   ├── controllers/  # Lógica de rutas
│   ├── models/       # Esquemas Mongoose
│   ├── routes/       # Rutas de la API
│   └── server.js     # Punto de entrada
├── frontend/         # Aplicación React
└── package.json
```

## Comenzando

### Requisitos previos

- Node.js v18+
- Cuenta de MongoDB Atlas (o MongoDB local)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/krishna2700/Full-Stack-Project-Deployment--Product-Store.git
cd Full-Stack-Project-Deployment--Product-Store

# Instalar dependencias
npm install

# Configurar variables de entorno
# Crear un archivo .env en la raíz con:
# MONGO_URI=tu_cadena_de_conexión_mongodb
# PORT=5000

# Ejecutar en modo desarrollo
npm run dev
```

## Endpoints de la API

| Método | Endpoint           | Descripción          |
|--------|--------------------|----------------------|
| GET    | /api/products      | Obtener todos los productos |
| POST   | /api/products      | Crear un producto    |
| PUT    | /api/products/:id  | Actualizar un producto |
| DELETE | /api/products/:id  | Eliminar un producto |

## Licencia

MIT
