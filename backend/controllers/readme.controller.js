// README Generator Controller
// Generates a README in any supported language on demand.

const SUPPORTED_LANGUAGES = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  zh: "Chinese (Simplified)",
  ja: "Japanese",
  pt: "Portuguese",
  ar: "Arabic",
  hi: "Hindi",
  ko: "Korean",
  it: "Italian",
  ru: "Russian",
};

const templates = {
  en: () => `# Full-Stack Product Store

A full-stack MERN (MongoDB, Express, React, Node.js) product store with full CRUD functionality.

## Live Demo

[https://full-stack-project-deployment-product.onrender.com/](https://full-stack-project-deployment-product.onrender.com/)

## Tech Stack

- **Frontend:** React, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Deployment:** Render.com

## Project Structure

\`\`\`
├── backend/
│   ├── config/       # Database connection
│   ├── controllers/  # Route logic
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API routes
│   └── server.js     # Entry point
├── frontend/         # React application
└── package.json
\`\`\`

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### Installation

\`\`\`bash
git clone https://github.com/krishna2700/Full-Stack-Project-Deployment--Product-Store.git
cd Full-Stack-Project-Deployment--Product-Store
npm install
# Create .env: MONGO_URI=your_connection_string, PORT=5000
npm run dev
\`\`\`

## API Endpoints

| Method | Endpoint           | Description         |
|--------|--------------------|---------------------|
| GET    | /api/products      | Get all products    |
| POST   | /api/products      | Create a product    |
| PUT    | /api/products/:id  | Update a product    |
| DELETE | /api/products/:id  | Delete a product    |

## License

MIT
`,

  es: () => `# Tienda de Productos Full-Stack

Una aplicación MERN (MongoDB, Express, React, Node.js) con funcionalidad CRUD completa.

## Demo en Vivo

[https://full-stack-project-deployment-product.onrender.com/](https://full-stack-project-deployment-product.onrender.com/)

## Tecnologías

- **Frontend:** React, Vite
- **Backend:** Node.js, Express.js
- **Base de datos:** MongoDB (Mongoose ODM)
- **Despliegue:** Render.com

## Estructura del Proyecto

\`\`\`
├── backend/
│   ├── config/       # Conexión a la base de datos
│   ├── controllers/  # Lógica de rutas
│   ├── models/       # Esquemas Mongoose
│   ├── routes/       # Rutas API
│   └── server.js     # Punto de entrada
├── frontend/         # Aplicación React
└── package.json
\`\`\`

## Instalación

\`\`\`bash
git clone https://github.com/krishna2700/Full-Stack-Project-Deployment--Product-Store.git
cd Full-Stack-Project-Deployment--Product-Store
npm install
# Crear .env: MONGO_URI=tu_cadena_de_conexion, PORT=5000
npm run dev
\`\`\`

## Endpoints de la API

| Método | Endpoint           | Descripción              |
|--------|--------------------|--------------------------|
| GET    | /api/products      | Obtener todos los productos |
| POST   | /api/products      | Crear un producto        |
| PUT    | /api/products/:id  | Actualizar un producto   |
| DELETE | /api/products/:id  | Eliminar un producto     |

## Licencia

MIT
`,

  fr: () => `# Boutique de Produits Full-Stack

Une application MERN (MongoDB, Express, React, Node.js) avec des fonctionnalités CRUD complètes.

## Démo en Direct

[https://full-stack-project-deployment-product.onrender.com/](https://full-stack-project-deployment-product.onrender.com/)

## Stack Technologique

- **Frontend :** React, Vite
- **Backend :** Node.js, Express.js
- **Base de données :** MongoDB (Mongoose ODM)
- **Déploiement :** Render.com

## Structure du Projet

\`\`\`
├── backend/
│   ├── config/       # Connexion à la base de données
│   ├── controllers/  # Logique des routes
│   ├── models/       # Schémas Mongoose
│   ├── routes/       # Routes API
│   └── server.js     # Point d'entrée
├── frontend/         # Application React
└── package.json
\`\`\`

## Installation

\`\`\`bash
git clone https://github.com/krishna2700/Full-Stack-Project-Deployment--Product-Store.git
cd Full-Stack-Project-Deployment--Product-Store
npm install
# Créez .env: MONGO_URI=votre_chaine_de_connexion, PORT=5000
npm run dev
\`\`\`

## Endpoints de l'API

| Méthode | Endpoint           | Description              |
|---------|--------------------|--------------------------|
| GET     | /api/products      | Obtenir tous les produits |
| POST    | /api/products      | Créer un produit         |
| PUT     | /api/products/:id  | Mettre à jour un produit |
| DELETE  | /api/products/:id  | Supprimer un produit     |

## Licence

MIT
`,

  de: () => `# Full-Stack-Produktshop

Eine MERN-Anwendung (MongoDB, Express, React, Node.js) mit vollständiger CRUD-Funktionalität.

## Live-Demo

[https://full-stack-project-deployment-product.onrender.com/](https://full-stack-project-deployment-product.onrender.com/)

## Tech-Stack

- **Frontend:** React, Vite
- **Backend:** Node.js, Express.js
- **Datenbank:** MongoDB (Mongoose ODM)
- **Bereitstellung:** Render.com

## Projektstruktur

\`\`\`
├── backend/
│   ├── config/       # Datenbankverbindung
│   ├── controllers/  # Routenlogik
│   ├── models/       # Mongoose-Schemas
│   ├── routes/       # API-Routen
│   └── server.js     # Einstiegspunkt
├── frontend/         # React-Anwendung
└── package.json
\`\`\`

## Installation

\`\`\`bash
git clone https://github.com/krishna2700/Full-Stack-Project-Deployment--Product-Store.git
cd Full-Stack-Project-Deployment--Product-Store
npm install
# .env erstellen: MONGO_URI=ihre_verbindungszeichenfolge, PORT=5000
npm run dev
\`\`\`

## API-Endpunkte

| Methode | Endpunkt           | Beschreibung             |
|---------|--------------------|--------------------------|
| GET     | /api/products      | Alle Produkte abrufen    |
| POST    | /api/products      | Ein Produkt erstellen    |
| PUT     | /api/products/:id  | Ein Produkt aktualisieren |
| DELETE  | /api/products/:id  | Ein Produkt löschen      |

## Lizenz

MIT
`,

  zh: () => `# 全栈产品商店

基于MERN（MongoDB、Express、React、Node.js）的全栈产品商店，支持完整的CRUD操作。

## 在线演示

[https://full-stack-project-deployment-product.onrender.com/](https://full-stack-project-deployment-product.onrender.com/)

## 技术栈

- **前端：** React, Vite
- **后端：** Node.js, Express.js
- **数据库：** MongoDB（Mongoose ODM）
- **部署：** Render.com

## 项目结构

\`\`\`
├── backend/
│   ├── config/       # 数据库连接
│   ├── controllers/  # 路由逻辑
│   ├── models/       # Mongoose模型
│   ├── routes/       # API路由
│   └── server.js     # 入口文件
├── frontend/         # React应用程序
└── package.json
\`\`\`

## 安装步骤

\`\`\`bash
git clone https://github.com/krishna2700/Full-Stack-Project-Deployment--Product-Store.git
cd Full-Stack-Project-Deployment--Product-Store
npm install
# 创建 .env: MONGO_URI=你的连接字符串, PORT=5000
npm run dev
\`\`\`

## API端点

| 方法   | 端点               | 描述         |
|--------|--------------------|--------------|
| GET    | /api/products      | 获取所有产品 |
| POST   | /api/products      | 创建产品     |
| PUT    | /api/products/:id  | 更新产品     |
| DELETE | /api/products/:id  | 删除产品     |

## 许可证

MIT
`,

  ja: () => `# フルスタック製品ストア

完全なCRUD機能を備えたMERN（MongoDB、Express、React、Node.js）フルスタック製品ストアです。

## ライブデモ

[https://full-stack-project-deployment-product.onrender.com/](https://full-stack-project-deployment-product.onrender.com/)

## 技術スタック

- **フロントエンド：** React, Vite
- **バックエンド：** Node.js, Express.js
- **データベース：** MongoDB（Mongoose ODM）
- **デプロイ：** Render.com

## プロジェクト構造

\`\`\`
├── backend/
│   ├── config/       # データベース接続
│   ├── controllers/  # ルートロジック
│   ├── models/       # Mongooseスキーマ
│   ├── routes/       # APIルート
│   └── server.js     # エントリーポイント
├── frontend/         # Reactアプリケーション
└── package.json
\`\`\`

## インストール

\`\`\`bash
git clone https://github.com/krishna2700/Full-Stack-Project-Deployment--Product-Store.git
cd Full-Stack-Project-Deployment--Product-Store
npm install
# .envを作成: MONGO_URI=接続文字列, PORT=5000
npm run dev
\`\`\`

## APIエンドポイント

| メソッド | エンドポイント     | 説明               |
|----------|--------------------|-------------------|
| GET      | /api/products      | 全製品を取得       |
| POST     | /api/products      | 製品を作成         |
| PUT      | /api/products/:id  | 製品を更新         |
| DELETE   | /api/products/:id  | 製品を削除         |

## ライセンス

MIT
`,

  pt: () => `# Loja de Produtos Full-Stack

Uma aplicação MERN (MongoDB, Express, React, Node.js) com funcionalidade CRUD completa.

## Demonstração ao Vivo

[https://full-stack-project-deployment-product.onrender.com/](https://full-stack-project-deployment-product.onrender.com/)

## Stack de Tecnologia

- **Frontend:** React, Vite
- **Backend:** Node.js, Express.js
- **Banco de Dados:** MongoDB (Mongoose ODM)
- **Implantação:** Render.com

## Estrutura do Projeto

\`\`\`
├── backend/
│   ├── config/       # Conexão com banco de dados
│   ├── controllers/  # Lógica das rotas
│   ├── models/       # Schemas Mongoose
│   ├── routes/       # Rotas da API
│   └── server.js     # Ponto de entrada
├── frontend/         # Aplicação React
└── package.json
\`\`\`

## Instalação

\`\`\`bash
git clone https://github.com/krishna2700/Full-Stack-Project-Deployment--Product-Store.git
cd Full-Stack-Project-Deployment--Product-Store
npm install
# Crie .env: MONGO_URI=sua_string_de_conexao, PORT=5000
npm run dev
\`\`\`

## Endpoints da API

| Método | Endpoint           | Descrição                 |
|--------|--------------------|---------------------------|
| GET    | /api/products      | Obter todos os produtos   |
| POST   | /api/products      | Criar um produto          |
| PUT    | /api/products/:id  | Atualizar um produto      |
| DELETE | /api/products/:id  | Excluir um produto        |

## Licença

MIT
`,

  ar: () => `# متجر المنتجات المتكامل

تطبيق MERN (MongoDB، Express، React، Node.js) متكامل مع وظائف CRUD الكاملة.

## عرض مباشر

[https://full-stack-project-deployment-product.onrender.com/](https://full-stack-project-deployment-product.onrender.com/)

## التقنيات المستخدمة

- **الواجهة الأمامية:** React، Vite
- **الواجهة الخلفية:** Node.js، Express.js
- **قاعدة البيانات:** MongoDB (Mongoose ODM)
- **النشر:** Render.com

## هيكل المشروع

\`\`\`
├── backend/
│   ├── config/       # اتصال قاعدة البيانات
│   ├── controllers/  # منطق المسارات
│   ├── models/       # مخططات Mongoose
│   ├── routes/       # مسارات API
│   └── server.js     # نقطة الدخول
├── frontend/         # تطبيق React
└── package.json
\`\`\`

## التثبيت

\`\`\`bash
git clone https://github.com/krishna2700/Full-Stack-Project-Deployment--Product-Store.git
cd Full-Stack-Project-Deployment--Product-Store
npm install
# أنشئ .env: MONGO_URI=سلسلة_الاتصال، PORT=5000
npm run dev
\`\`\`

## نقاط نهاية API

| الطريقة | نقطة النهاية       | الوصف                  |
|---------|--------------------|------------------------|
| GET     | /api/products      | الحصول على جميع المنتجات |
| POST    | /api/products      | إنشاء منتج             |
| PUT     | /api/products/:id  | تحديث منتج             |
| DELETE  | /api/products/:id  | حذف منتج               |

## الترخيص

MIT
`,

  hi: () => `# फुल-स्टैक प्रोडक्ट स्टोर

पूर्ण CRUD कार्यक्षमता के साथ एक MERN (MongoDB, Express, React, Node.js) फुल-स्टैक प्रोडक्ट स्टोर।

## लाइव डेमो

[https://full-stack-project-deployment-product.onrender.com/](https://full-stack-project-deployment-product.onrender.com/)

## टेक स्टैक

- **फ्रंटएंड:** React, Vite
- **बैकएंड:** Node.js, Express.js
- **डेटाबेस:** MongoDB (Mongoose ODM)
- **डिप्लॉयमेंट:** Render.com

## प्रोजेक्ट संरचना

\`\`\`
├── backend/
│   ├── config/       # डेटाबेस कनेक्शन
│   ├── controllers/  # रूट लॉजिक
│   ├── models/       # Mongoose स्कीमा
│   ├── routes/       # API रूट्स
│   └── server.js     # एंट्री पॉइंट
├── frontend/         # React एप्लिकेशन
└── package.json
\`\`\`

## इंस्टॉलेशन

\`\`\`bash
git clone https://github.com/krishna2700/Full-Stack-Project-Deployment--Product-Store.git
cd Full-Stack-Project-Deployment--Product-Store
npm install
# .env बनाएं: MONGO_URI=कनेक्शन_स्ट्रिंग, PORT=5000
npm run dev
\`\`\`

## API एंडपॉइंट्स

| मेथड  | एंडपॉइंट           | विवरण                   |
|-------|--------------------|-------------------------|
| GET   | /api/products      | सभी प्रोडक्ट प्राप्त करें |
| POST  | /api/products      | प्रोडक्ट बनाएं          |
| PUT   | /api/products/:id  | प्रोडक्ट अपडेट करें     |
| DELETE| /api/products/:id  | प्रोडक्ट हटाएं          |

## लाइसेंस

MIT
`,

  ko: () => `# 풀스택 제품 상점

전체 CRUD 기능을 갖춘 MERN(MongoDB, Express, React, Node.js) 풀스택 제품 상점입니다.

## 라이브 데모

[https://full-stack-project-deployment-product.onrender.com/](https://full-stack-project-deployment-product.onrender.com/)

## 기술 스택

- **프론트엔드:** React, Vite
- **백엔드:** Node.js, Express.js
- **데이터베이스:** MongoDB (Mongoose ODM)
- **배포:** Render.com

## 프로젝트 구조

\`\`\`
├── backend/
│   ├── config/       # 데이터베이스 연결
│   ├── controllers/  # 라우트 로직
│   ├── models/       # Mongoose 스키마
│   ├── routes/       # API 라우트
│   └── server.js     # 진입점
├── frontend/         # React 애플리케이션
└── package.json
\`\`\`

## 설치

\`\`\`bash
git clone https://github.com/krishna2700/Full-Stack-Project-Deployment--Product-Store.git
cd Full-Stack-Project-Deployment--Product-Store
npm install
# .env 생성: MONGO_URI=연결_문자열, PORT=5000
npm run dev
\`\`\`

## API 엔드포인트

| 메서드 | 엔드포인트         | 설명              |
|--------|--------------------|-------------------|
| GET    | /api/products      | 모든 제품 조회    |
| POST   | /api/products      | 제품 생성         |
| PUT    | /api/products/:id  | 제품 수정         |
| DELETE | /api/products/:id  | 제품 삭제         |

## 라이선스

MIT
`,

  it: () => `# Negozio di Prodotti Full-Stack

Un'applicazione MERN (MongoDB, Express, React, Node.js) con funzionalità CRUD complete.

## Demo Live

[https://full-stack-project-deployment-product.onrender.com/](https://full-stack-project-deployment-product.onrender.com/)

## Stack Tecnologico

- **Frontend:** React, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Deployment:** Render.com

## Struttura del Progetto

\`\`\`
├── backend/
│   ├── config/       # Connessione al database
│   ├── controllers/  # Logica delle route
│   ├── models/       # Schema Mongoose
│   ├── routes/       # Route API
│   └── server.js     # Punto di ingresso
├── frontend/         # Applicazione React
└── package.json
\`\`\`

## Installazione

\`\`\`bash
git clone https://github.com/krishna2700/Full-Stack-Project-Deployment--Product-Store.git
cd Full-Stack-Project-Deployment--Product-Store
npm install
# Crea .env: MONGO_URI=stringa_di_connessione, PORT=5000
npm run dev
\`\`\`

## Endpoint API

| Metodo | Endpoint           | Descrizione               |
|--------|--------------------|---------------------------|
| GET    | /api/products      | Ottieni tutti i prodotti  |
| POST   | /api/products      | Crea un prodotto          |
| PUT    | /api/products/:id  | Aggiorna un prodotto      |
| DELETE | /api/products/:id  | Elimina un prodotto       |

## Licenza

MIT
`,

  ru: () => `# Полностековый Магазин Продуктов

Полностековое приложение MERN (MongoDB, Express, React, Node.js) с полной функциональностью CRUD.

## Живая Демонстрация

[https://full-stack-project-deployment-product.onrender.com/](https://full-stack-project-deployment-product.onrender.com/)

## Технологический Стек

- **Фронтенд:** React, Vite
- **Бэкенд:** Node.js, Express.js
- **База данных:** MongoDB (Mongoose ODM)
- **Развёртывание:** Render.com

## Структура Проекта

\`\`\`
├── backend/
│   ├── config/       # Подключение к базе данных
│   ├── controllers/  # Логика маршрутов
│   ├── models/       # Схемы Mongoose
│   ├── routes/       # Маршруты API
│   └── server.js     # Точка входа
├── frontend/         # Приложение React
└── package.json
\`\`\`

## Установка

\`\`\`bash
git clone https://github.com/krishna2700/Full-Stack-Project-Deployment--Product-Store.git
cd Full-Stack-Project-Deployment--Product-Store
npm install
# Создайте .env: MONGO_URI=строка_подключения, PORT=5000
npm run dev
\`\`\`

## Конечные Точки API

| Метод  | Конечная точка     | Описание                     |
|--------|--------------------|------------------------------|
| GET    | /api/products      | Получить все продукты        |
| POST   | /api/products      | Создать продукт              |
| PUT    | /api/products/:id  | Обновить продукт             |
| DELETE | /api/products/:id  | Удалить продукт              |

## Лицензия

MIT
`,
};

// GET /api/readme/languages
export const getSupportedLanguages = (req, res) => {
  const languages = Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => ({ code, name }));
  res.json({ supportedLanguages: languages });
};

// POST /api/readme/generate  — body: { language: "es" }
export const generateReadme = (req, res) => {
  const { language } = req.body;
  if (!language) {
    return res.status(400).json({
      success: false,
      error: "Missing required field: language",
      hint: 'Send a POST body like { "language": "es" }',
      supportedLanguages: Object.keys(SUPPORTED_LANGUAGES),
    });
  }
  const lang = language.toLowerCase().trim();
  if (!templates[lang]) {
    return res.status(404).json({
      success: false,
      error: `Language code "${lang}" is not supported.`,
      supportedLanguages: Object.keys(SUPPORTED_LANGUAGES),
    });
  }
  const content = templates[lang]();
  return res.json({
    success: true,
    language: lang,
    languageName: SUPPORTED_LANGUAGES[lang],
    filename: lang === "en" ? "README.md" : `README.${lang}.md`,
    content,
    characterCount: content.length,
    lineCount: content.split("\n").length,
  });
};

// GET /api/readme/generate/:language  — returns raw Markdown download
export const generateReadmeRaw = (req, res) => {
  const lang = req.params.language.toLowerCase().trim();
  if (!templates[lang]) {
    return res.status(404).json({
      success: false,
      error: `Language code "${lang}" is not supported.`,
      supportedLanguages: Object.keys(SUPPORTED_LANGUAGES),
    });
  }
  const content = templates[lang]();
  const filename = lang === "en" ? "README.md" : `README.${lang}.md`;
  res
    .setHeader("Content-Type", "text/markdown; charset=utf-8")
    .setHeader("Content-Disposition", `attachment; filename="${filename}"`)
    .send(content);
};
