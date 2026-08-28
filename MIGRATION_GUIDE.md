# Database Migrations Guide

## Automatic Migration on Deploy

Railway automatically runs migrations using the `Procfile`:

```
release: npm run init-db -w backend
web: npm start -w backend
```

This means:
1. When you deploy, Railway runs `npm run init-db`
2. This creates all tables automatically
3. Then starts the web server

**No manual database setup needed!**

---

## Manual Migration (Local Development)

```bash
# Create database first
createdb memora

# Run migrations
npm run migrate -w backend

# Verify tables created
psql -d memora -c "\dt"
```

---

## Rollback (If Needed)

```bash
npm run migrate:rollback -w backend
```

This drops all tables and recreates them.

---

## Database Schema

Created tables:
- `users` - User accounts
- `wallets` - Crypto wallets
- `assets` - Token balances
- `tokens` - Token metadata
- `token_prices` - Price history
- `transactions` - Transaction records
- `traders` - Trader profiles
- `trades` - Trade records
- `followers` - Follow relationships
- `watchlist` - Favorite tokens
- `price_alerts` - Price notifications
- `settings` - User preferences
- And more...

---

## Database Reset

To completely reset database:

```bash
npm run migrate:rollback -w backend
npm run migrate -w backend
```

**Warning**: This deletes all data!

---

## Troubleshooting

### "Database connection failed"
- Ensure DATABASE_URL environment variable is set
- Verify PostgreSQL is running
- Check credentials in DATABASE_URL

### "Migration timeout"
- First migration can take a while
- Railway gives 5 minutes
- If it fails, check logs: `railway logs`

### "Table already exists"
- Migrations are idempotent
- Safe to run multiple times
- Won't recreate existing tables

---

## Production Database

Railway creates managed PostgreSQL automatically:
- Auto-backup
- Auto-scaling
- Automatic failover
- HTTPS connections
- One-click restore

No manual database administration needed!

---

**Migrations run automatically on deploy.** ✅
