FROM node:18-alpine

WORKDIR /app

# Copy files
COPY package.json package-lock.json ./
COPY backend backend/

# Install dependencies
RUN npm install

# Build
RUN npm run build

EXPOSE 8000

ENV NODE_ENV=production
ENV PORT=8000

# Start using npm start from backend
CMD ["npm", "start"]
