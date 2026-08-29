FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY backend backend/

RUN npm install

WORKDIR /app/backend

RUN npm install

RUN npm run build

WORKDIR /app

EXPOSE 8000

ENV NODE_ENV=production
ENV PORT=8000

CMD ["npm", "start"]
