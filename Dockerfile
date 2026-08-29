FROM node:18-alpine

WORKDIR /app

# Copy backend files
COPY backend/package.json backend/package-lock.json ./

# Install dependencies FIRST
RUN npm install --production

# Copy source
COPY backend/src ./src
COPY backend/tsconfig.json ./

# Compile TypeScript  
RUN npx tsc

EXPOSE 8000

ENV NODE_ENV=production
ENV PORT=8000

# Start
CMD ["node", "dist/index.js"]
