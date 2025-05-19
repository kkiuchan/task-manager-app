# === Build Stage ===
FROM node:18 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate && npm run build

# === Production Stage ===
FROM node:18 AS runner
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# 本番依存のみインストール（node_modulesはコピーしない）
RUN npm install --production
EXPOSE 4000
CMD ["node", "dist/index.js"]