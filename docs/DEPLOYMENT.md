# MEMORA Deployment Guide

## Production Deployment

### 1. Railway (Recommended for MVP)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Create project
railway init

# Configure environment
railway variables

# Set these variables:
# DATABASE_URL=postgresql://...
# TELEGRAM_BOT_TOKEN=your_token
# JWT_SECRET=secure_secret_here
# NODE_ENV=production

# Deploy
railway up
```

### 2. Heroku

```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login

# Create app
heroku create memora-app

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Add Redis
heroku addons:create heroku-redis:premium-0

# Set config
heroku config:set JWT_SECRET=your_secret
heroku config:set TELEGRAM_BOT_TOKEN=your_token

# Deploy
git push heroku main
```

### 3. Docker Deployment

```dockerfile
# Dockerfile.backend
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build -w backend

EXPOSE 3001

CMD ["npm", "start", "-w", "backend"]
```

```bash
docker build -t memora-backend -f Dockerfile.backend .
docker run -e DATABASE_URL=... memora-backend
```

## Database Backups

```bash
# PostgreSQL backup
pg_dump memora > memora_backup.sql

# Restore
psql memora < memora_backup.sql

# Automated backups (Heroku)
heroku pg:backups:capture
heroku pg:backups:download
```

## Monitoring

```bash
# Heroku logs
heroku logs --tail

# Error tracking (Sentry)
npm install @sentry/node
```

## Performance Optimization

- Enable gzip compression
- Use CDN for static assets
- Database query optimization
- Connection pooling
- Redis caching

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Database backups
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Input validation
- [ ] Logging enabled

## Post-Deployment

1. Test all endpoints
2. Monitor error rates
3. Check response times
4. Verify backup schedule
5. Setup alerts

See README.md for local setup.
