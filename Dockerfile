FROM node:18-alpine

WORKDIR /app

# Install dependencies for the app
RUN npm install express@4.18.2 cors@2.8.5

# Copy only the JavaScript file
COPY backend/src/index.js ./index.js

EXPOSE 8000

ENV NODE_ENV=production
ENV PORT=8000

# Run directly with node
CMD ["node", "index.js"]
