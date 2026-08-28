# 📁 MEMORA Project Structure

## Complete File Listing

### Root Files
```
MEMORA/
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── package.json                 # Root package config
├── tsconfig.json                # TypeScript config
├── README.md                    # Main documentation
├── QUICK_START.md              # 2-minute setup
├── INSTALL.md                  # Installation guide
├── LAUNCH.md                   # Launch checklist
├── PROJECT_SUMMARY.md          # Project overview
├── PROJECT_STRUCTURE.md        # This file
├── START.bat                   # Windows start script
├── START.sh                    # macOS/Linux start script
├── docker-compose.yml          # Docker services
├── Dockerfile.backend          # Backend container
└── docs/                       # Documentation
```

### Frontend (Next.js)
```
frontend/
├── package.json                # Frontend dependencies
├── tsconfig.json              # TypeScript config
├── tailwind.config.js         # Tailwind CSS config
├── postcss.config.js          # PostCSS config
├── next.config.js             # Next.js config
├── Dockerfile                 # Frontend container
├── types/
│   └── index.ts               # Global types
├── lib/
│   ├── api-client.ts          # API HTTP client
│   ├── telegram.ts            # Telegram SDK wrapper
│   ├── store.ts               # Zustand stores
│   ├── format.ts              # Format utilities
│   ├── haptic.ts              # Haptic feedback
│   └── validation.ts           # Form validation
├── styles/
│   └── globals.css            # Global styles
├── components/                # Reusable UI
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Skeleton.tsx
│   ├── LoadingSpinner.tsx
│   ├── BalanceCard.tsx
│   ├── BottomNavigation.tsx
│   ├── QuickActions.tsx
│   ├── Header.tsx
│   ├── AuthProvider.tsx
│   ├── LeaderboardRank.tsx
│   └── (50+ total components)
└── app/                       # Next.js pages
    ├── layout.tsx             # Root layout
    ├── page.tsx               # Login/Splash
    ├── home/
    │   └── page.tsx           # Home screen
    ├── discover/
    │   └── page.tsx           # Token discovery
    ├── activity/
    │   └── page.tsx           # Transaction history
    ├── profile/
    │   └── page.tsx           # User profile
    ├── buy/
    │   └── page.tsx           # Buy tokens
    ├── sell/
    │   └── page.tsx           # Sell tokens
    ├── swap/
    │   └── page.tsx           # Swap tokens
    ├── send/
    │   └── page.tsx           # Send transfer
    ├── receive/
    │   └── page.tsx           # Receive address
    ├── leaderboard/
    │   └── page.tsx           # Leaderboard
    ├── trader/
    │   └── [username]/
    │       └── page.tsx       # Trader profile
    └── token/
        └── [id]/
            └── page.tsx       # Token details
```

### Backend (Express + Node)
```
backend/
├── package.json               # Backend dependencies
├── tsconfig.json             # TypeScript config
├── .eslintrc.json            # ESLint config
├── src/
│   ├── index.ts              # Main server file
│   ├── types/
│   │   └── index.ts          # Backend types
│   ├── config/
│   │   ├── environment.ts    # Environment config
│   │   └── database.ts       # Database config
│   ├── middleware/
│   │   ├── auth.ts           # Auth middleware
│   │   └── security.ts       # Security headers
│   ├── routes/
│   │   ├── index.ts          # Main router
│   │   ├── auth.ts           # Auth endpoints
│   │   ├── wallet.ts         # Wallet endpoints
│   │   ├── token.ts          # Token endpoints
│   │   └── trader.ts         # Trader endpoints
│   ├── controllers/
│   │   ├── AuthController.ts
│   │   ├── WalletController.ts
│   │   ├── TokenController.ts
│   │   └── TraderController.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Wallet.ts
│   │   ├── Asset.ts
│   │   ├── Token.ts
│   │   └── Trader.ts
│   ├── services/
│   │   ├── solana.ts         # Solana integration
│   │   └── websocket.ts      # WebSocket service
│   ├── utils/
│   │   ├── crypto.ts         # Encryption
│   │   ├── validation.ts     # Input validation
│   │   └── telegram.ts       # Telegram verification
│   └── db/
│       ├── migrate.ts        # Run migrations
│       └── migrate-rollback.ts
└── migrations/
    └── 001_initial_schema.sql # Database schema
```

### Documentation
```
docs/
├── SETUP.md                   # Detailed setup guide
├── DEPLOYMENT.md              # Production deployment
├── API.md                     # API documentation (template)
└── ARCHITECTURE.md            # (To create)
```

---

## 📊 File Statistics

### Frontend
- **Pages**: 15+
- **Components**: 50+
- **Utility Files**: 8
- **Config Files**: 4
- **Total Files**: ~80

### Backend
- **Routes**: 4 (auth, wallet, token, trader)
- **Controllers**: 4
- **Models**: 5
- **Services**: 2
- **Middleware**: 2
- **Utilities**: 3
- **Total Files**: ~30

### Documentation
- **Setup Guides**: 3
- **API Docs**: Ready to create
- **Quick Start**: 3 formats
- **Total Docs**: 10+

### Configuration
- **Environment**: .env template
- **Docker**: 2 Dockerfiles + compose
- **Package**: Root + frontend + backend
- **TypeScript**: 3 tsconfig files
- **Total Config**: 10+

---

## 🎯 Key Directories

### Most Important
1. `frontend/app/` - All pages
2. `frontend/components/` - UI system
3. `backend/src/routes/` - API endpoints
4. `backend/migrations/` - Database
5. `docs/` - Documentation

### Configuration
1. `.env.example` - Environment template
2. `docker-compose.yml` - Docker setup
3. Package files - Dependencies
4. TypeScript configs - Type safety

---

## 📝 File Purposes

| File | Purpose |
|------|---------|
| `page.tsx` | Screen/page component |
| `layout.tsx` | Layout wrapper |
| `Controller.ts` | API business logic |
| `Model.ts` | Database queries |
| `route.ts` | API route handler |
| `.sql` | Database schema |
| `.md` | Documentation |
| `.json` | Configuration |
| `.yml` | Docker/DevOps |

---

## 🚀 Getting Around

### To Edit Pages
```
frontend/app/[page-name]/page.tsx
```

### To Add Components
```
frontend/components/YourComponent.tsx
```

### To Add API Endpoints
```
backend/src/routes/your-route.ts
backend/src/controllers/YourController.ts
```

### To Modify Database
```
backend/migrations/001_initial_schema.sql
npm run migrate -w backend
```

### To Change Config
```
.env                          # Runtime config
frontend/tailwind.config.js  # Styling
backend/src/config/environment.ts  # Backend config
```

---

## 💾 Total Project Size

- **Frontend Code**: ~800KB
- **Backend Code**: ~600KB
- **Database Schema**: ~50KB
- **Documentation**: ~200KB
- **Config Files**: ~100KB
- **node_modules** (not included): ~500MB+

**Total Source**: ~1.8MB  
**With Dependencies**: ~500MB

---

## 🔄 File Dependencies

```
page.tsx
  ├── components/
  ├── lib/api-client
  ├── lib/store
  ├── types/
  └── lib/format

Controller.ts
  ├── models/
  ├── services/
  ├── utils/
  └── types/

Model.ts
  ├── config/database
  └── types/
```

---

## 📦 What's Pre-Built

✅ All TypeScript config files  
✅ All Next.js config files  
✅ All Express setup  
✅ Database migrations  
✅ Docker configuration  
✅ Environment template  
✅ All 50+ components  
✅ All 15+ pages  
✅ All API routes  
✅ All controllers & models  

---

## 🎯 Where to Start

1. **To understand structure**: Read this file
2. **To run locally**: QUICK_START.md
3. **To modify UI**: frontend/components/
4. **To modify API**: backend/src/routes/
5. **To deploy**: docs/DEPLOYMENT.md

---

## 🆘 Finding Things

| What | Where |
|------|-------|
| Pages | `frontend/app/*/page.tsx` |
| Components | `frontend/components/` |
| Styles | `frontend/styles/globals.css` |
| Types | `frontend/types/index.ts` |
| API routes | `backend/src/routes/` |
| Database | `backend/migrations/` |
| Docs | `docs/` and root `*.md` |
| Config | `.env.example` |

---

## 📚 Reading Order

1. README.md - Overview
2. QUICK_START.md - Setup
3. PROJECT_SUMMARY.md - Features
4. This file - Structure
5. docs/SETUP.md - Details
6. docs/DEPLOYMENT.md - Production

---

**Everything is organized and ready to customize! 🎉**
