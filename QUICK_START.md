# MEMORA - Quick Start Guide

## 🚀 Start in 2 Minutes

### Option 1: Local Development (Recommended)

```bash
# 1. Clone & Install
git clone <repo-url>
cd MEMORA
npm install

# 2. Setup Database
createdb memora

# 3. Configure Environment
cp .env.example .env
# Edit .env with your Telegram Bot Token

# 4. Run Migrations
npm run migrate -w backend

# 5. Start Development
npm run dev

# Done! 
# Frontend: http://localhost:3000
# Backend:  http://localhost:3001
```

### Option 2: Docker (One Command)

```bash
# Make sure Docker is running, then:
docker-compose up

# Frontend: http://localhost:3000
# Backend:  http://localhost:3001
# Database: postgres://memora:memora@localhost:5432/memora
```

## 📱 Setup Telegram Bot (2 min)

1. Open Telegram → Search [@BotFather](https://t.me/botfather)
2. Send `/newbot`
3. Choose bot name (e.g., "MemoraBot")
4. Choose bot username (e.g., "@memora_bot")
5. Copy the token → Paste in `.env` as `TELEGRAM_BOT_TOKEN`

**Done!** Bot is ready to test.

## ✅ What Works Now (MVP)

- ✅ Telegram login (no password needed)
- ✅ Home screen with balance display
- ✅ Token discovery & search
- ✅ Token details page
- ✅ Buy/Sell/Swap UI (demo)
- ✅ Send/Receive screens
- ✅ Leaderboard & traders
- ✅ Activity history
- ✅ User profile & settings
- ✅ Beautiful animations
- ✅ Dark mode
- ✅ Premium UI design

## 🎯 Next Steps (Optional)

### Connect Real Trading
```bash
# Install Solana integration
npm install @solana/web3.js @solana/spl-token

# Update .env
SOLANA_RPC_URL=https://api.devnet.solana.com
SOLANA_NETWORK=devnet
```

### Connect Real Prices
```bash
# Integrate Jupiter or Coingecko API
# See docs/SETUP.md for details
```

### Deploy to Production
```bash
# See docs/DEPLOYMENT.md for:
# - Railway (1-click deploy)
# - Heroku (Git push deploy)
# - Docker (Custom deploy)
```

## 📊 Project Stats

- **Frontend**: Next.js 14 + React 18 + Tailwind CSS
- **Backend**: Express.js + PostgreSQL + TypeScript
- **Pages**: 15+ fully designed screens
- **Components**: 30+ reusable UI components
- **Lines of Code**: 8000+
- **Setup Time**: 2 minutes

## 🏗️ What's Included

```
MEMORA/
├── 🎨 Premium Design System
├── 📱 15+ Ready-to-Use Pages
├── 🔐 Telegram Authentication
├── 💾 Full Database Schema
├── 🚀 Express Backend API
├── 📦 Docker Setup
└── 📚 Complete Documentation
```

## 🆘 Troubleshooting

### "Database connection failed"
```bash
# Start PostgreSQL
# macOS with Homebrew:
brew services start postgresql

# Or verify DATABASE_URL in .env
```

### "Cannot find module"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### "Port 3000 already in use"
```bash
# Change port in .env
PORT=3002
```

## 💡 Key Features Tour

| Feature | Location | Status |
|---------|----------|--------|
| Login | `/` | ✅ Working |
| Home | `/home` | ✅ Ready |
| Discover | `/discover` | ✅ Ready |
| Trading | `/buy`, `/swap` | ✅ UI Ready |
| Leaderboard | `/leaderboard` | ✅ Ready |
| Profile | `/profile` | ✅ Ready |

## 📖 Documentation

- `README.md` - Full overview
- `INSTALL.md` - Installation guide
- `docs/SETUP.md` - Detailed setup
- `docs/DEPLOYMENT.md` - Production deploy

## 🎉 You're Ready!

Your premium Telegram Mini App is ready to use.

**Test it:**
1. Open your bot in Telegram
2. Press the menu button
3. Select "MEMORA"
4. Login with Telegram
5. Explore all features

## 🤝 Support

- Issues? Check docs/
- Questions? Read README.md
- Bug? Open GitHub issue

---

**Happy coding! 🚀**

Built with ❤️ for the Telegram community.
