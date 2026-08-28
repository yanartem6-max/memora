# MEMORA Installation Guide

## ⚡ Quick Start (3 Steps)

### Step 1: Clone & Install Dependencies

```bash
git clone <repository-url> MEMORA
cd MEMORA
npm install
```

### Step 2: Setup Environment

```bash
cp .env.example .env
```

Edit `.env` and add:
- Telegram Bot Token (from @BotFather)
- PostgreSQL connection string
- API URLs

### Step 3: Run Development Server

```bash
# Terminal 1
npm run dev

# Opens http://localhost:3000
```

## 🗂️ What's Included

✅ **Frontend** - Premium Next.js UI with Design System
✅ **Backend** - Express API with PostgreSQL
✅ **Database** - Full schema with migrations
✅ **Telegram** - Native Mini App integration
✅ **Components** - 30+ ready-to-use UI components
✅ **Routing** - 15+ pages with full navigation
✅ **Auth** - Telegram authentication
✅ **Styling** - Tailwind CSS + custom themes

## 📋 System Requirements

- Node.js 18+
- PostgreSQL 14+
- Redis (optional)
- 500MB disk space

## 🔧 Full Setup

```bash
# 1. Install dependencies
npm install

# 2. Create database
createdb memora

# 3. Run migrations
npm run migrate -w backend

# 4. Start servers
npm run dev

# Frontend: http://localhost:3000
# Backend:  http://localhost:3001
```

## 📱 Telegram Setup

1. Message @BotFather on Telegram
2. Use `/newbot` and follow prompts
3. Copy bot token to `.env`
4. Bot is ready to use

## ✨ Features Ready to Use

- 🏠 Home screen with balance
- 🔍 Token discovery & search
- 💳 Buy/Sell/Swap interface
- 📤 Send/Receive crypto
- 👥 Trader profiles & leaderboard
- 📊 Activity history
- ⚙️ User settings
- 🎨 Premium UI & animations

## 🚀 Next Steps

1. Customize branding (logo, colors)
2. Connect Solana RPC
3. Integrate price feeds
4. Deploy to production
5. Launch Telegram bot

## 📚 Documentation

- `README.md` - Project overview
- `docs/SETUP.md` - Detailed setup
- `docs/API.md` - API documentation
- `docs/DEPLOYMENT.md` - Production deployment

## ⚠️ Important Notes

- Free tier: No transaction fees for MVP
- Solana: Devnet by default
- Database: Local PostgreSQL for dev
- Telegram: Test with test bot first

## 🆘 Troubleshooting

### Database Connection Failed
```bash
# Check PostgreSQL
psql -U postgres
\l  # List databases
```

### Port Already in Use
```bash
# Change port in .env
PORT=3002
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## 📞 Support

- Issues? Check README.md
- Questions? See docs/
- Bug report? Open GitHub issue

---

**Ready to build with MEMORA? Start coding! 🎉**
