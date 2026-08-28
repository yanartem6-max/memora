# 🚀 MEMORA Deployment Guide

## Quick Deployment to Railway (2 minutes)

### Option 1: Using GitHub (Recommended)

**Step 1: Create GitHub Repository**
```bash
cd d:\MEMORA
git init
git add .
git commit -m "Initial MEMORA commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/memora.git
git push -u origin main
```

**Step 2: Connect to Railway**
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Connect your GitHub account
5. Select the `memora` repository
6. Click Deploy

**Step 3: Add Environment Variables**
In Railway dashboard:
- Add `TELEGRAM_BOT_TOKEN` (get from @BotFather)
- Add `JWT_SECRET` (generate random string)
- Add `DATABASE_URL` (Railway PostgreSQL will auto-provide)
- Database will be created automatically

**Step 4: Wait for Deployment**
- Railway will build and deploy automatically
- Takes ~5 minutes
- Check status in Railway dashboard

---

### Option 2: Using Railway CLI (Manual)

**Step 1: Initialize Railway Project**
```bash
cd d:\MEMORA
railway init
# Follow prompts to create new project
```

**Step 2: Link to Project**
```bash
railway link
# Select your project from list
```

**Step 3: Set Environment Variables**
```bash
railway variables set TELEGRAM_BOT_TOKEN=your_token_here
railway variables set JWT_SECRET=your_secret_here
railway variables set NODE_ENV=production
```

**Step 4: Deploy**
```bash
railway up
```

---

### Option 3: Docker to Any Host (Heroku, DigitalOcean, etc)

**Build Docker Image**
```bash
docker build -f Dockerfile.deploy -t memora:latest .
```

**Test Locally**
```bash
docker run -e TELEGRAM_BOT_TOKEN=your_token \
  -e JWT_SECRET=your_secret \
  -p 3001:3001 \
  memora:latest
```

**Push to Docker Hub**
```bash
docker tag memora:latest your_docker_username/memora:latest
docker push your_docker_username/memora:latest
```

**Deploy to Heroku**
```bash
heroku login
heroku create memora-app
heroku container:push web
heroku container:release web
```

---

## Environment Variables Required

```env
# Required
TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
JWT_SECRET=your_secret_key_min_32_chars
NODE_ENV=production

# Database (auto-provided by Railway PostgreSQL)
DATABASE_URL=postgresql://user:pass@host:5432/db

# Optional
PORT=3001
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_NETWORK=mainnet-beta
```

---

## Post-Deployment Steps

### 1. Database Setup
Railway automatically creates PostgreSQL and runs migrations

### 2. Test the Deployment
```bash
curl https://your-app.up.railway.app/health
# Should return: {"status":"ok"}
```

### 3. Get Your URL
- Railway provides: `https://your-app.up.railway.app`
- Use this for your Telegram bot webhook

### 4. Update Telegram Bot
In @BotFather:
```
/setmenubutton
# Select your bot
# Enter URL: https://your-app.up.railway.app
```

---

## Monitoring

### Railway Dashboard
- Real-time logs
- Resource usage
- Deployment history
- Environment variables

### Check Logs
```bash
railway logs
# Live logs from your deployment
```

### Restart
```bash
railway status
railway down
railway up
```

---

## Troubleshooting

### Build Failed
- Check Dockerfile.deploy syntax
- Verify all environment variables
- Check docker build locally first

### Deploy Failed
- Check Railway logs: `railway logs`
- Verify environment variables are set
- Check Telegram bot token is valid

### App Crashes After Deploy
- Check logs: `railway logs`
- Verify DATABASE_URL is correct
- Ensure migrations ran successfully

### Database Connection Error
- Railway creates PostgreSQL automatically
- Check if DATABASE_URL env var is set
- Migrations run on first deploy

---

## Production Best Practices

✅ Use Railway managed PostgreSQL (auto-provided)  
✅ Set strong JWT_SECRET (min 32 chars)  
✅ Use production Solana RPC  
✅ Enable HTTPS (Railway does this automatically)  
✅ Monitor logs regularly  
✅ Setup alerting  
✅ Backup database regularly  

---

## Costs

### Railway Free Tier
- $5 free credits/month
- Enough for small MVP
- Includes: Compute + Database + Storage

### After Free Tier
- Pay-as-you-go pricing
- Typically $5-50/month for small app
- Scales with usage

---

## Custom Domain

1. In Railway dashboard
2. Go to Project Settings
3. Add custom domain
4. Update DNS records
5. HTTPS certificate auto-provisioned

---

## Rollback

If deployment breaks:
```bash
railway rollback
# Automatic rollback to previous deploy
```

---

## Next Steps

1. ✅ Choose deployment option
2. ✅ Follow steps above
3. ✅ Get your live URL
4. ✅ Test the app
5. ✅ Setup monitoring

---

**Your app will be live in minutes!** 🎉

Questions? Check Railway docs: https://docs.railway.app
