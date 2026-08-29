FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY backend/package.json backend/package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy JavaScript source (pre-compiled)
COPY backend/src/index.js ./index.js

EXPOSE 8000

ENV NODE_ENV=production
ENV PORT=8000

# Direct node - no build needed
CMD ["node", "index.js"]
