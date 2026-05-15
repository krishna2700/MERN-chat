# Loja de Produtos Full-Stack

Uma aplicação de loja de produtos MERN (MongoDB, Express, React, Node.js) completa com funcionalidade CRUD. Os produtos podem ser criados, lidos, atualizados e excluídos por meio de uma API REST limpa com suporte do MongoDB.

## Demo ao vivo

[https://full-stack-project-deployment-product.onrender.com/](https://full-stack-project-deployment-product.onrender.com/)

## Stack de Tecnologias

- **Frontend:** React, Vite
- **Backend:** Node.js, Express.js
- **Banco de dados:** MongoDB (Mongoose ODM)
- **Implantação:** Render.com

## Estrutura do Projeto

```
├── backend/
│   ├── config/       # Conexão com o banco de dados
│   ├── controllers/  # Lógica das rotas
│   ├── models/       # Esquemas Mongoose
│   ├── routes/       # Rotas da API
│   └── server.js     # Ponto de entrada
├── frontend/         # Aplicação React
└── package.json
```

## Primeiros Passos

### Pré-requisitos

- Node.js v18+
- Conta no MongoDB Atlas (ou MongoDB local)

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/krishna2700/Full-Stack-Project-Deployment--Product-Store.git
cd Full-Stack-Project-Deployment--Product-Store

# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Crie um arquivo .env na raiz com:
# MONGO_URI=sua_string_de_conexão_mongodb
# PORT=5000

# Executar em modo de desenvolvimento
npm run dev
```

## Endpoints da API

| Método | Endpoint           | Descrição                |
|--------|--------------------|--------------------------|
| GET    | /api/products      | Obter todos os produtos  |
| POST   | /api/products      | Criar um produto         |
| PUT    | /api/products/:id  | Atualizar um produto     |
| DELETE | /api/products/:id  | Excluir um produto       |

## Licença

MIT
