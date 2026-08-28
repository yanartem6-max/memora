@echo off
REM MEMORA - Quick Start Script for Windows

echo 🚀 MEMORA - Starting Setup...
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+
    exit /b 1
)

REM Check npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed. Please install npm
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✅ Node.js %NODE_VERSION% detected
echo ✅ npm %NPM_VERSION% detected
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

echo.
echo ✅ Dependencies installed
echo.

REM Check .env file
if not exist .env (
    echo 📝 Creating .env file...
    copy .env.example .env
    echo ✅ .env created
    echo.
    echo ⚠️  Please add your TELEGRAM_BOT_TOKEN to .env
    echo    Get it from @BotFather on Telegram
    echo.
)

REM Run migrations
echo 📋 Running database migrations...
call npm run migrate -w backend

echo.
echo ✅ Setup complete!
echo.
echo 📌 Next steps:
echo    1. Add TELEGRAM_BOT_TOKEN to .env
echo    2. Run: npm run dev
echo    3. Open: http://localhost:3000
echo.
echo 🎉 Happy coding!
