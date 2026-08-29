FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
COPY backend/package.json backend/
COPY backend/tsconfig.json backend/
COPY backend/src backend/src/

# Install all dependencies
RUN npm install

# Build backend
WORKDIR /app/backend
RUN npm run build

# Back to root
WORKDIR /app

EXPOSE 8000

ENV NODE_ENV=production
ENV PORT=8000

CMD ["npm", "start"]
