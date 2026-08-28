# 🚀 MEMORA - Running the Project

## Current Status

✅ **npm install completed successfully**

## Next Steps

### Option 1: Run Frontend Only (Recommended for Testing UI)

```bash
cd d:\MEMORA\frontend
npm run dev
```

Then open: http://localhost:3000

### Option 2: Run Backend Only

```bash
cd d:\MEMORA\backend
npm run build
npm start
```

Backend will be at: http://localhost:3001

### Option 3: Run Both (Requires Database)

```bash
# Terminal 1
npm run dev -w frontend

# Terminal 2
npm run dev -w backend
```

## Prerequisites

### For Backend
- PostgreSQL database (optional for testing)
- `.env` file configured

### For Frontend
- No additional requirements
- Works standalone

## Quick Start

### Frontend Only (No Database Needed)
```bash
cd d:\MEMORA
npm install
cd frontend
npm run dev
```

Opens at: http://localhost:3000

### Testing

You can test:
- ✅ UI components
- ✅ Navigation
- ✅ Pages and screens
- ✅ Responsive design
- ✅ Dark mode
- ⚠️ Backend integration (will need mock server or actual backend)

## Important Files

- `frontend/` - React/Next.js application
- `backend/` - Express.js API server
- `.env.example` - Environment template (copy to `.env`)

## Notes

- Backend requires PostgreSQL setup
- Frontend works standalone for UI testing
- Telegram SDK ready but bot token needed for full testing

---

**Let's build something amazing! 🎉**
