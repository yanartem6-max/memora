# MEMORA Deployment Status Check Script

param(
    [string]$AppUrl = "https://memora-production.up.railway.app"
)

Write-Host "🔍 MEMORA Deployment Status Check" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if URL is provided
if (-not $AppUrl) {
    Write-Host "Usage: .\check-deployment.ps1 -AppUrl 'https://your-app-url'" -ForegroundColor Yellow
    Write-Host "Example: .\check-deployment.ps1 -AppUrl 'https://memora-production.up.railway.app'" -ForegroundColor Yellow
    exit 1
}

Write-Host "Checking app: $AppUrl" -ForegroundColor Yellow
Write-Host ""

# Check Health Endpoint
Write-Host "📋 1. Checking health endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$AppUrl/health" -TimeoutSec 10 -ErrorAction Stop
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Health check passed" -ForegroundColor Green
        $health = $response.Content | ConvertFrom-Json
        Write-Host "   Status: $($health.status)" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Health check failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Check Frontend
Write-Host "📋 2. Checking frontend..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri $AppUrl -TimeoutSec 10 -ErrorAction Stop
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Frontend is accessible" -ForegroundColor Green
        if ($response.Content -match "MEMORA|Telegram|Login") {
            Write-Host "   App content detected" -ForegroundColor Green
        }
    }
} catch {
    Write-Host "❌ Frontend check failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Check API Endpoints
Write-Host "📋 3. Checking API endpoints..." -ForegroundColor Yellow

$endpoints = @(
    "/api/auth/telegram",
    "/api/tokens",
    "/api/wallet",
    "/api/traders"
)

foreach ($endpoint in $endpoints) {
    try {
        $response = Invoke-WebRequest -Uri "$AppUrl$endpoint" -TimeoutSec 10 -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200 -or $response.StatusCode -eq 401) {
            Write-Host "✅ $endpoint - responds" -ForegroundColor Green
        }
    } catch {
        Write-Host "⚠️  $endpoint - no response" -ForegroundColor Yellow
    }
}

Write-Host ""

# Check SSL Certificate
Write-Host "📋 4. Checking SSL certificate..." -ForegroundColor Yellow
try {
    $request = [System.Net.HttpWebRequest]::Create($AppUrl)
    $request.GetResponse() | Out-Null
    $cert = $request.ServicePoint.Certificate
    if ($cert) {
        $certExpiry = [System.Security.Cryptography.X509Certificates.X509Certificate2]($cert).NotAfter
        $daysLeft = ($certExpiry - (Get-Date)).Days
        Write-Host "✅ SSL Certificate valid" -ForegroundColor Green
        Write-Host "   Expires in $daysLeft days" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  Could not check certificate: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""

# Database Check (via API)
Write-Host "📋 5. Checking database connectivity..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$AppUrl/api/tokens" -TimeoutSec 10 -ErrorAction SilentlyContinue
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Database is accessible" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  Database check inconclusive" -ForegroundColor Yellow
}

Write-Host ""

# Summary
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "✅ DEPLOYMENT STATUS CHECK COMPLETE" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Open in browser: $AppUrl" -ForegroundColor Cyan
Write-Host "2. Test Telegram login" -ForegroundColor Cyan
Write-Host "3. Explore all screens" -ForegroundColor Cyan
Write-Host "4. Check Railway dashboard for logs" -ForegroundColor Cyan
Write-Host ""
