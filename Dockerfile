FROM node:18-alpine

WORKDIR /app

# Copy files
COPY backend/package.json backend/package-lock.json ./
COPY backend/src ./src
COPY backend/tsconfig.json ./

# Install dependencies
RUN npm install

# Build TypeScript
RUN npx tsc

# Verify dist exists
RUN ls -la dist/

EXPOSE 8000

ENV NODE_ENV=production
ENV PORT=8000

# Direct node command - no npm
CMD ["node", "dist/index.js"]
