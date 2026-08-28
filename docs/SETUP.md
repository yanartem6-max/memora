# MEMORA Setup Guide

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis 7+
- Git

## Quick Start (5 minutes)

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd MEMORA
npm install
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb memora

# Run migrations
npm run migrate -w backend
```

### 3. Environment Setup

```bash
cp .env.example .env

# Edit .env with:
# - TELEGRAM_BOT_TOKEN (from @BotFather)
# - Database URL
# - JWT Secret
```

### 4. Start Development

```bash
# Terminal 1: Frontend
cd frontend
npm run dev

# Terminal 2: Backend
cd backend
npm run dev

# Visit http://localhost:3000
```

## Telegram Bot Setup

1. **Create Bot**
   - Message [@BotFather](https://t.me/botfather)
   - Use `/newbot` command
   - Get your bot token

2. **Set Bot Commands**
   ```
   /start - Open MEMORA
   /help - Get help
   /settings - App settings
   ```

3. **Web App Configuration**
   - Use `/setmenubutton` to add menu button
   - Point to: `https://your-domain/home`

## Project Structure

```
MEMORA/
├── frontend/
│   ├── app/                    # Next.js routes
│   │   ├── page.tsx           # Splash/Login
│   │   ├── home/              # Home screen
│   │   ├── discover/          # Token discovery
│   │   ├── activity/          # Transaction history
│   │   ├── profile/           # User profile
│   │   ├── buy/sell/swap/     # Trading
│   │   ├── send/receive/      # Transfers
│   │   ├── leaderboard/       # Top traders
│   │   ├── trader/            # Trader profiles
│   │   └── token/             # Token details
│   ├── components/            # Reusable UI
│   ├── lib/                   # Utilities
│   └── styles/                # Global styles
│
├── backend/
│   ├── src/
│   │   ├── routes/            # API endpoints
│   │   ├── controllers/       # Business logic
│   │   ├── models/            # Database queries
│   │   ├── middleware/        # Auth, validation
│   │   ├── services/          # Solana, WebSocket
│   │   ├── utils/             # Helpers
│   │   └── config/            # Configuration
│   └── migrations/            # Database migrations
│
└── docs/                       # Documentation
```

## Key Features

### Phase 1 (MVP)
- ✅ Telegram authentication
- ✅ USDT wallet
- ✅ Home screen with balance
- ✅ Token discovery
- ✅ Buy/Sell/Swap UI
- ✅ Send/Receive

### Phase 2
- Trading execution on Solana
- Real-time price updates (WebSocket)
- Transaction broadcast

### Phase 3
- Social feed
- Trader profiles & follow
- Leaderboard

### Phase 4
- Price alerts
- Watchlist
- Advanced analytics

## API Endpoints

### Authentication
- `POST /api/auth/telegram` - Login with Telegram

### Wallet
- `GET /api/wallet` - Get wallet info
- `GET /api/wallet/balance` - Get USDT balance
- `GET /api/wallet/address` - Get wallet address

### Tokens
- `GET /api/tokens/trending` - Trending tokens
- `GET /api/tokens/new` - New tokens
- `GET /api/tokens/memecoins` - Memecoins
- `GET /api/tokens/search?q=MEME` - Search
- `GET /api/tokens/:id` - Token details

### Traders
- `GET /api/traders/leaderboard` - Leaderboard
- `GET /api/traders/:username` - Trader profile
- `POST /api/traders/:id/follow` - Follow trader

## Development Commands

```bash
# Frontend
npm run dev -w frontend      # Dev server
npm run build -w frontend    # Production build
npm run lint -w frontend     # Lint code

# Backend
npm run dev -w backend       # Dev server
npm run build -w backend     # Compile TypeScript
npm run migrate -w backend   # Run migrations
npm run lint -w backend      # Lint code

# Database
npm run migrate -w backend
npm run migrate:rollback -w backend
```

## Environment Variables

```bash
# Frontend
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=your_bot_token
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Backend
PORT=3001
DATABASE_URL=postgresql://user:pass@localhost:5432/memora
JWT_SECRET=your_secret_key
TELEGRAM_BOT_TOKEN=your_bot_token
SOLANA_RPC_URL=https://api.devnet.solana.com
SOLANA_NETWORK=devnet
REDIS_URL=redis://localhost:6379
```

## Database Schema

Key tables:
- `users` - User accounts
- `wallets` - Wallet accounts
- `tokens` - Cryptocurrency data
- `transactions` - User transactions
- `traders` - Trader profiles
- `trades` - Trade records
- `followers` - Follow relationships
- `watchlist` - Favorite tokens
- `price_alerts` - Price notifications

## Security

✅ Telegram authentication verification
✅ JWT tokens
✅ Input validation & sanitization
✅ Rate limiting
✅ HTTPS in production
✅ Environment variable encryption
✅ SQL injection prevention

## Performance

- Response times: < 500ms
- Database queries: Indexed
- Caching: Redis ready
- WebSocket: Real-time updates
- CDN: Static assets

## Deployment

### Local
```bash
npm install
npm run migrate -w backend
npm run dev
```

### Production (Railway/Heroku)
```bash
npm run build
npm start
```

See DEPLOYMENT.md for cloud setup.

## Testing

```bash
# Frontend tests
npm run test -w frontend

# Backend tests
npm run test -w backend

# E2E tests
npm run test:e2e
```

## Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL is running
psql -U postgres

# Verify DATABASE_URL
echo $DATABASE_URL
```

### Telegram Auth Fails
- Verify `TELEGRAM_BOT_TOKEN` is correct
- Check bot is public (`/setprivacy`)
- Test with @BotFather `/test` command

### Frontend Won't Load
- Clear browser cache
- Check `NEXT_PUBLIC_API_URL`
- Verify backend is running

## Support

- 📖 Docs: https://docs.memora.app
- 💬 Telegram: @MEMORA_support
- 🐛 Issues: GitHub Issues
- 📧 Email: support@memora.app

## License

MIT License - See LICENSE file

## Next Steps

1. ✅ Clone repository
2. ✅ Setup environment
3. ✅ Run migrations
4. ✅ Start dev server
5. ⏭️ Test Telegram bot
6. ⏭️ Implement trading logic
7. ⏭️ Deploy to production

**Happy coding! 🚀**
