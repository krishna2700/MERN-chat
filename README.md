# Full-Stack Product Store

A full-stack MERN (MongoDB, Express, React, Node.js) product store application with full CRUD functionality. Products can be created, read, updated, and deleted through a clean REST API backed by MongoDB.

## Live Demo

[https://full-stack-project-deployment-product.onrender.com/](https://full-stack-project-deployment-product.onrender.com/)

## Tech Stack

- **Frontend:** React, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Deployment:** Render.com

## Project Structure

```
├── backend/
│   ├── config/       # Database connection
│   ├── controllers/  # Route logic
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API routes
│   └── server.js     # Entry point
├── frontend/         # React application
└── package.json
```

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### Installation

```bash
# Clone the repository
git clone https://github.com/krishna2700/Full-Stack-Project-Deployment--Product-Store.git
cd Full-Stack-Project-Deployment--Product-Store

# Install dependencies
npm install

# Set up environment variables
# Create a .env file in the root with:
# MONGO_URI=your_mongodb_connection_string
# PORT=5000

# Run in development
npm run dev
```

## API Endpoints

| Method | Endpoint           | Description         |
|--------|--------------------|---------------------|
| GET    | /api/products      | Get all products    |
| POST   | /api/products      | Create a product    |
| PUT    | /api/products/:id  | Update a product    |
| DELETE | /api/products/:id  | Delete a product    |

## License

MIT
