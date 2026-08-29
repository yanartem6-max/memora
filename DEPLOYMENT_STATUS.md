# 📊 MEMORA Deployment Status Check

## How to Check Deployment Status

### Option 1: Railway Dashboard (Real-time)

1. Go to https://railway.app/dashboard
2. Select your project: `memora`
3. Check deployment status:
   - 🟢 **Green** = Running
   - 🟡 **Yellow** = Building
   - 🔴 **Red** = Failed

### Option 2: Using PowerShell Script

```bash
cd d:\MEMORA
.\check-deployment.ps1 -AppUrl "https://your-app-url"
```

Example:
```bash
.\check-deployment.ps1 -AppUrl "https://memora-production.up.railway.app"
```

This checks:
- ✅ Health endpoint
- ✅ Frontend accessibility
- ✅ API endpoints
- ✅ SSL certificate
- ✅ Database connectivity

### Option 3: Manual Verification

#### 1. Check Health Status

```bash
curl https://your-app-url/health

# Expected response:
# {"status":"ok"}
```

#### 2. Check Frontend

Open in browser:
```
https://your-app-url
```

You should see:
- MEMORA logo
- Login screen
- Telegram login button

#### 3. Test API Endpoints

```bash
# Get tokens list
curl https://your-app-url/api/tokens

# Get trader info
curl https://your-app-url/api/traders

# Check auth endpoint
curl https://your-app-url/api/auth/telegram
```

---

## Deployment Status Indicators

### ✅ Everything Works

- Frontend loads
- Health endpoint responds
- API endpoints accessible
- SSL certificate valid
- Database connected

### ⚠️ Frontend Works, API Fails

- Check database connection
- Verify environment variables
- Check Railway logs

### ❌ Everything Fails

- Deployment might still be running
- Check Railway logs for errors
- Verify GitHub push was successful

---

## Reading Railway Logs

### In Railway Dashboard

1. Go to your project
2. Click **"Deployments"**
3. Select latest deployment
4. Click **"Logs"** tab
5. Look for errors

### Common Log Messages

```
✅ "Server running on port 8000"
   → Backend started successfully

✅ "Database initialized"
   → Migrations completed

✅ "Telegram webhook registered"
   → Bot is ready

❌ "ECONNREFUSED"
   → Database connection failed

❌ "Cannot find module"
   → Build issue - check package.json

❌ "TELEGRAM_BOT_TOKEN not set"
   → Missing environment variable
```

---

## Deployment Timeline

### Typical Timeline

| Time | Event |
|------|-------|
| 0:00 | Deploy starts |
| 0:30 | Building code |
| 1:00 | Installing dependencies |
| 1:30 | Running build script |
| 2:00 | Creating Docker image |
| 2:30 | Starting migrations |
| 3:00 | Deploying container |
| 3:30 | Health checks |
| 4:00 | ✅ App live! |

---

## Checking Deployment Success

### Sign 1: URL Works
```
✅ https://your-app-url responds
```

### Sign 2: Health Endpoint
```bash
curl https://your-app-url/health
# Returns: {"status":"ok"}
```

### Sign 3: Frontend Loads
```
✅ Page loads without errors
✅ Telegram button visible
✅ No 500 errors
```

### Sign 4: Database Ready
```bash
curl https://your-app-url/api/tokens
# Returns: JSON data (even if empty)
```

### Sign 5: No Errors in Logs
```
✅ Check Railway → Deployments → Logs
✅ No ERROR or FATAL messages
```

---

## If Deployment Failed

### Step 1: Check Logs

```
Railway Dashboard → Deployments → Latest → Logs
```

### Step 2: Look for Error Pattern

| Error | Solution |
|-------|----------|
| `ENOMEM` | Out of memory - check plan |
| `ECONNREFUSED` | Database not connected |
| `Module not found` | Dependencies not installed |
| `Port already in use` | App crashed - restart |
| `Timeout` | Build took too long |

### Step 3: Fix and Redeploy

```bash
# Fix issue in code
# Commit and push
git add .
git commit -m "Fix deployment issue"
git push origin main

# Railway auto-redeploys
```

---

## Environment Variables Check

In Railway Dashboard:

1. Go to **"Variables"** tab
2. Verify these are set:

```
✅ NODE_ENV = production
✅ TELEGRAM_BOT_TOKEN = (has value)
✅ JWT_SECRET = (has value)
✅ ENCRYPTION_KEY = (has value)
✅ DATABASE_URL = (auto-set by Railway)
```

---

## Database Status

### Check Database Connection

```bash
# Via Railway Dashboard:
1. Go to project
2. Look for "PostgreSQL" resource
3. Check if it shows "Connected"
```

### Verify Migrations Ran

In Railway logs, look for:
```
✅ "Database initialized"
✅ "Migration completed"
✅ "12 tables created"
```

---

## Performance Check

### Response Times (Healthy)

- Health: `< 100ms`
- API: `< 500ms`
- Frontend: `< 2s`

### Resource Usage (Railway Dashboard)

- CPU: `< 50%`
- Memory: `< 200MB`
- Network: Normal

---

## Testing the Deployment

### 1. Test Frontend

```bash
# Open in browser
https://your-app-url

# Verify:
- Page loads
- Telegram button visible
- No console errors (F12)
```

### 2. Test Telegram Login

```bash
# In Telegram:
1. Find bot (@memora or your bot name)
2. Click "Start"
3. Should show login screen
4. Click "Login"
5. Should authenticate
```

### 3. Test Navigation

After login:
- ✅ Navigate to Home
- ✅ Navigate to Discover
- ✅ Navigate to Activity
- ✅ Navigate to Leaderboard
- ✅ Navigate to Profile

### 4. Test API

```bash
# Get current user
curl -H "Authorization: Bearer TOKEN" \
  https://your-app-url/api/auth/me

# Get tokens
curl https://your-app-url/api/tokens

# Get traders
curl https://your-app-url/api/traders
```

---

## Monitoring After Deployment

### Setup Alerts

In Railway Dashboard:
1. Go to project
2. Click "Alerts"
3. Enable notifications for:
   - Deployment failures
   - High CPU usage
   - High memory usage
   - Database issues

### View Logs Regularly

```bash
# Railway CLI
railway logs

# Or in dashboard:
Dashboard → Deployments → Latest → Logs
```

---

## Status Summary Checklist

- [ ] App deployed on Railway
- [ ] Health endpoint responding
- [ ] Frontend loads without errors
- [ ] API endpoints accessible
- [ ] Database connected
- [ ] SSL certificate valid
- [ ] Environment variables set
- [ ] Logs show no errors
- [ ] Telegram login works
- [ ] Navigation works on all pages

✅ **When all items checked: Deployment successful!**

---

## Getting Help

### Railway Support
- Docs: https://docs.railway.app
- Discord: https://discord.gg/railway

### Telegram Mini Apps
- Docs: https://core.telegram.org/bots/webapps

### MEMORA
- Deployment Guide: DEPLOYMENT_STEPS.md
- Setup Guide: DEPLOY_NOW.md
- Troubleshooting: Check logs

---

**Deployment complete when all checks pass!** ✅
