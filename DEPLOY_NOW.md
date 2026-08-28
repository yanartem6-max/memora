# 🚀 DEPLOY MEMORA NOW - Step by Step

## Quick Start (5 minutes to Live)

### Option A: Deploy to Railway (Easiest) ⭐

#### Step 1: Prepare GitHub Repository

```bash
cd d:\MEMORA

# Initialize git
git init
git config user.email "you@example.com"
git config user.name "Your Name"

# Add all files
git add .

# Create initial commit
git commit -m "Initial MEMORA deployment"

# Rename branch to main
git branch -M main
```

#### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Create repository named `memora`
3. **Copy the remote URL** (looks like: `https://github.com/YOUR_USERNAME/memora.git`)

#### Step 3: Push to GitHub

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/memora.git
git push -u origin main
```

#### Step 4: Deploy on Railway

1. Go to https://railway.app
2. Click **"New Project"**
3. Select **"Deploy from GitHub"**
4. Connect your GitHub account (if not already)
5. Select `memora` repository
6. Click **"Deploy"**

**Railway starts building! ⏳ Wait 3-5 minutes...**

#### Step 5: Configure Environment Variables

Once deployed, in Railway dashboard:

1. Go to **Variables**
2. Add these variables:

```
TELEGRAM_BOT_TOKEN=<get_from_@BotFather>
JWT_SECRET=<random_32_characters>
ENCRYPTION_KEY=<random_32_characters>
NODE_ENV=production
```

**To get TELEGRAM_BOT_TOKEN:**
- Open Telegram
- Search for @BotFather
- Send `/newbot`
- Follow prompts
- Copy your bot token

#### Step 6: Get Your Live URL

In Railway dashboard:
- Go to your project
- Click **"Deployments"**
- Find your domain (looks like: `memora-production.up.railway.app`)

**Your app is now LIVE!** 🎉

---

### Option B: Deploy to Heroku

#### Step 1: Create Heroku Account

1. Go to https://www.heroku.com
2. Sign up (free account)
3. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli

#### Step 2: Deploy

```bash
cd d:\MEMORA

# Login to Heroku
heroku login

# Create app
heroku create memora-app

# Set environment variables
heroku config:set TELEGRAM_BOT_TOKEN=your_token
heroku config:set JWT_SECRET=your_secret
heroku config:set NODE_ENV=production

# Deploy from GitHub
git push heroku main
```

#### Step 3: Get Your URL

```bash
heroku open
# Your app URL opens in browser
```

---

### Option C: Deploy to DigitalOcean App Platform

#### Step 1: Create DigitalOcean Account

1. Go to https://www.digitalocean.com
2. Create account
3. Add payment method

#### Step 2: Deploy

1. Go to App Platform
2. Click **"Create App"**
3. Select GitHub source
4. Choose `memora` repository
5. Configure build settings
6. Set environment variables
7. Deploy

---

## After Deployment

### 1. Verify App is Running

```bash
curl https://your-app-url/health
# Should return: {"status":"ok"}
```

### 2. Update Telegram Bot

In @BotFather:
```
/setmenubutton
Select your bot
Enter: https://your-app-url
```

### 3. Test the App

Open in browser:
```
https://your-app-url
```

You should see MEMORA login screen!

---

## Environment Variables Reference

| Variable | Required | Example |
|----------|----------|---------|
| TELEGRAM_BOT_TOKEN | Yes | `123456:ABC-DEF` |
| JWT_SECRET | Yes | `randomstring32charsminimum` |
| ENCRYPTION_KEY | Yes | `randomstring32charsminimum` |
| NODE_ENV | Yes | `production` |
| DATABASE_URL | Auto | Auto-provided by Railway |
| SOLANA_RPC_URL | No | `https://api.mainnet-beta.solana.com` |
| SOLANA_NETWORK | No | `mainnet-beta` |

---

## Troubleshooting

### "Build Failed"
- Check Railway logs
- Verify all required environment variables
- Check Dockerfile.deploy syntax

### "App Crashes on Deploy"
```bash
# Check logs
railway logs
# or
heroku logs --tail
```

### "Database Connection Error"
- DATABASE_URL should be auto-set by Railway
- If not, create PostgreSQL addon manually
- Run migrations: `npm run init-db -w backend`

### "Bot Not Responding"
- Verify TELEGRAM_BOT_TOKEN is correct
- Ensure bot is public (@BotFather → /setprivacy)
- Check webhook URL in Railway dashboard

---

## Costs

### Railway (Recommended)
- **Free tier**: $5/month credit (covers MVP)
- **After free**: ~$5-20/month for small app

### Heroku
- **Free tier**: Dyno hours limited (discontinued)
- **Paid**: ~$5-50/month minimum

### DigitalOcean
- **Starter**: $12/month
- **Scalable up**: Add more resources as needed

---

## Next Steps After Deployment

1. ✅ Test login with Telegram
2. ✅ Explore all screens
3. ✅ Test navigation
4. ✅ Setup monitoring
5. ✅ Configure custom domain (optional)
6. ✅ Setup alerts

---

## Getting Your Own Domain (Optional)

1. Buy domain from Namecheap, GoDaddy, etc
2. Point DNS to your deployment
3. SSL certificate auto-provisioned (Railway/Heroku)

---

## Support

- Railway Docs: https://docs.railway.app
- Heroku Docs: https://devcenter.heroku.com
- MEMORA Docs: See DEPLOY_GUIDE.md

---

## Summary

**You now have:**
- ✅ Production-ready code
- ✅ Deployment config
- ✅ Database setup
- ✅ Step-by-step guide
- ✅ Live deployment option

**Next: Follow Option A, B, or C above to go live!**

🚀 **Your app will be live in 5 minutes!**
