# Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
COPY backend/package.json backend/
COPY frontend/package.json frontend/

# Install dependencies
RUN npm install

# Copy source code
COPY backend backend/
COPY frontend frontend/

# Build backend TypeScript
WORKDIR /app/backend
RUN npm run build

# Build frontend
WORKDIR /app/frontend
RUN npm run build || true

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy only production dependencies
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/backend/package.json ./backend/
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/src ./backend/src

# Install production dependencies only
RUN npm install --production

EXPOSE 8000

ENV NODE_ENV=production
ENV PORT=8000

CMD ["node", "backend/dist/index.js"]
