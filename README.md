# タスク管理アプリケーション

このプロジェクトは、タスク管理のためのフルスタックアプリケーションです。

## 使用技術

### フロントエンド

- Next.js
- TypeScript
- React

### バックエンド

- Node.js
- Express
- TypeScript
- Prisma (ORM)
- MySQL

### インフラ

- Docker
- Docker Compose

## 環境構築

### 必要条件

- Docker
- Docker Compose

### 起動方法

1. リポジトリをクローン

```bash
git clone [リポジトリのURL]
cd task-manager-app
```

2. コンテナのビルドと起動

```bash
docker-compose up --build
```

3. アプリケーションにアクセス

- フロントエンド: http://localhost:3000
- バックエンド API: http://localhost:4000

## 開発環境のセットアップ

### フロントエンド

```bash
cd frontend
npm install
npm run dev
```

### バックエンド

```bash
cd backend
npm install
npm run dev
```

## データベース

MySQL を使用しています。
