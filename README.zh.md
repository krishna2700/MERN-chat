# 全栈产品商店

一个完整的 MERN（MongoDB、Express、React、Node.js）产品商店应用，具备完整的 CRUD 功能。可通过 MongoDB 支持的简洁 REST API 对产品进行创建、读取、更新和删除操作。

## 在线演示

[https://full-stack-project-deployment-product.onrender.com/](https://full-stack-project-deployment-product.onrender.com/)

## 技术栈

- **前端：** React、Vite
- **后端：** Node.js、Express.js
- **数据库：** MongoDB（Mongoose ODM）
- **部署：** Render.com

## 项目结构

```
├── backend/
│   ├── config/       # 数据库连接
│   ├── controllers/  # 路由逻辑
│   ├── models/       # Mongoose 模型
│   ├── routes/       # API 路由
│   └── server.js     # 入口文件
├── frontend/         # React 应用
└── package.json
```

## 快速开始

### 前提条件

- Node.js v18+
- MongoDB Atlas 账号（或本地 MongoDB）

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/krishna2700/Full-Stack-Project-Deployment--Product-Store.git
cd Full-Stack-Project-Deployment--Product-Store

# 安装依赖
npm install

# 配置环境变量
# 在根目录创建 .env 文件，内容如下：
# MONGO_URI=你的_mongodb_连接字符串
# PORT=5000

# 启动开发环境
npm run dev
```

## API 接口

| 方法   | 接口               | 描述         |
|--------|--------------------|--------------|
| GET    | /api/products      | 获取所有产品 |
| POST   | /api/products      | 创建产品     |
| PUT    | /api/products/:id  | 更新产品     |
| DELETE | /api/products/:id  | 删除产品     |

## 许可证

MIT
