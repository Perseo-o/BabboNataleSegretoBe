FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build || (echo "BUILD FAILED" && cat /app/npm-debug.log 2>/dev/null && exit 1)
RUN ls -la dist/ || echo "dist non esiste"

FROM node:22-alpine AS base
WORKDIR /opt
COPY package*.json ./
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev
RUN npm install
COPY . .
RUN npm rebuild better-sqlite3 
EXPOSE 3002
ENV PATH /opt/node_modules/.bin:$PATH
CMD ["npm", "run", "start:dev"]