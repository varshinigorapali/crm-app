# ---- Build frontend ----
FROM node:20-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# ---- Build backend & final image ----
FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --omit=dev
COPY backend/ ./
COPY --from=frontend /app/frontend/build ./../frontend/build

EXPOSE 5000
CMD ["node", "server.js"]
