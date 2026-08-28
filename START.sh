#!/bin/bash

# MEMORA - Quick Start Script
# This script sets up MEMORA in one command

echo "🚀 MEMORA - Starting Setup..."
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"
echo "✅ npm $(npm --version) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Dependencies installed"
echo ""

# Check .env file
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env created"
    echo ""
    echo "⚠️  Please add your TELEGRAM_BOT_TOKEN to .env"
    echo "   Get it from @BotFather on Telegram"
    echo ""
fi

# Create database
echo "🗄️  Setting up database..."
createdb memora 2>/dev/null || echo "ℹ️  Database might already exist"

# Run migrations
echo "📋 Running database migrations..."
npm run migrate -w backend

echo ""
echo "✅ Setup complete!"
echo ""
echo "📌 Next steps:"
echo "   1. Add TELEGRAM_BOT_TOKEN to .env"
echo "   2. Run: npm run dev"
echo "   3. Open: http://localhost:3000"
echo ""
echo "🎉 Happy coding!"
