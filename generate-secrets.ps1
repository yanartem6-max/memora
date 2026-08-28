# Generate secure secrets for MEMORA deployment

Write-Host "🔐 Generating secure secrets for MEMORA..." -ForegroundColor Green
Write-Host ""

# Generate JWT_SECRET (random 32 characters)
$jwtSecret = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
Write-Host "JWT_SECRET: $jwtSecret" -ForegroundColor Cyan
Write-Host ""

# Generate ENCRYPTION_KEY (random 32 characters)
$encKey = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
Write-Host "ENCRYPTION_KEY: $encKey" -ForegroundColor Cyan
Write-Host ""

Write-Host "✅ Secrets generated!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Add these to Railway dashboard:" -ForegroundColor Yellow
Write-Host "  1. JWT_SECRET=$jwtSecret"
Write-Host "  2. ENCRYPTION_KEY=$encKey"
Write-Host "  3. TELEGRAM_BOT_TOKEN=<get from @BotFather>"
Write-Host "  4. NODE_ENV=production"
Write-Host ""
Write-Host "📍 Get TELEGRAM_BOT_TOKEN from @BotFather on Telegram" -ForegroundColor Yellow
