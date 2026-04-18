# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Vite は環境変数をビルド時に埋め込む
ARG VITE_DB_URL
ARG VITE_DB_KEY
ENV VITE_DB_URL=$VITE_DB_URL
ENV VITE_DB_KEY=$VITE_DB_KEY

RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
