# フルスタック商品ストア

MongoDB、Express、React、Node.js（MERN）を使用した、完全な CRUD 機能を備えたフルスタック商品ストアアプリケーションです。MongoDB をバックエンドとするクリーンな REST API を通じて、商品の作成・読み取り・更新・削除が可能です。

## ライブデモ

[https://full-stack-project-deployment-product.onrender.com/](https://full-stack-project-deployment-product.onrender.com/)

## 技術スタック

- **フロントエンド:** React、Vite
- **バックエンド:** Node.js、Express.js
- **データベース:** MongoDB（Mongoose ODM）
- **デプロイ:** Render.com

## プロジェクト構成

```
├── backend/
│   ├── config/       # データベース接続
│   ├── controllers/  # ルートロジック
│   ├── models/       # Mongoose スキーマ
│   ├── routes/       # API ルート
│   └── server.js     # エントリーポイント
├── frontend/         # React アプリケーション
└── package.json
```

## はじめに

### 必要条件

- Node.js v18 以上
- MongoDB Atlas アカウント（またはローカル MongoDB）

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/krishna2700/Full-Stack-Project-Deployment--Product-Store.git
cd Full-Stack-Project-Deployment--Product-Store

# 依存関係をインストール
npm install

# 環境変数を設定
# ルートディレクトリに .env ファイルを作成し、以下を記述：
# MONGO_URI=mongodb接続文字列
# PORT=5000

# 開発モードで起動
npm run dev
```

## API エンドポイント

| メソッド | エンドポイント      | 説明               |
|----------|--------------------|-------------------|
| GET      | /api/products      | 全商品を取得       |
| POST     | /api/products      | 商品を作成         |
| PUT      | /api/products/:id  | 商品を更新         |
| DELETE   | /api/products/:id  | 商品を削除         |

## ライセンス

MIT
