# MEMORA Application Testing Script

param(
    [string]$AppUrl = "https://memora-production.up.railway.app"
)

Write-Host "🧪 MEMORA Application Testing" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""

if (-not $AppUrl) {
    Write-Host "Usage: .\run-tests.ps1 -AppUrl 'https://your-app-url'" -ForegroundColor Yellow
    exit 1
}

$testsPassed = 0
$testsFailed = 0

# Helper function to run test
function Test-Endpoint {
    param(
        [string]$Name,
        [string]$Url,
        [int]$ExpectedStatus = 200,
        [string]$Headers = $null
    )
    
    Write-Host "Testing: $Name" -ForegroundColor Yellow
    
    try {
        $params = @{
            Uri = $Url
            TimeoutSec = 10
            ErrorAction = 'Stop'
        }
        
        if ($Headers) {
            $params['Headers'] = $Headers
        }
        
        $response = Invoke-WebRequest @params
        
        if ($response.StatusCode -eq $ExpectedStatus -or ($response.StatusCode -ge 200 -and $response.StatusCode -lt 300)) {
            Write-Host "  ✅ PASS - Status: $($response.StatusCode)" -ForegroundColor Green
            return $true
        }
    } catch {
        Write-Host "  ❌ FAIL - $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Test 1: Health Endpoint
Write-Host ""
Write-Host "Test Suite 1: Health Checks" -ForegroundColor Cyan
Write-Host "---" -ForegroundColor Cyan

if (Test-Endpoint -Name "Health Endpoint" -Url "$AppUrl/health") {
    $testsPassed++
} else {
    $testsFailed++
}

# Test 2: Frontend Load
Write-Host ""
Write-Host "Test Suite 2: Frontend" -ForegroundColor Cyan
Write-Host "---" -ForegroundColor Cyan

if (Test-Endpoint -Name "Frontend Page Load" -Url $AppUrl) {
    $testsPassed++
} else {
    $testsFailed++
}

# Test 3: API Endpoints
Write-Host ""
Write-Host "Test Suite 3: API Endpoints" -ForegroundColor Cyan
Write-Host "---" -ForegroundColor Cyan

$endpoints = @(
    @{ Name = "Tokens API"; Url = "$AppUrl/api/tokens" },
    @{ Name = "Traders API"; Url = "$AppUrl/api/traders" },
    @{ Name = "Auth Endpoint"; Url = "$AppUrl/api/auth/telegram" }
)

foreach ($endpoint in $endpoints) {
    if (Test-Endpoint -Name $endpoint.Name -Url $endpoint.Url) {
        $testsPassed++
    } else {
        $testsFailed++
    }
}

# Summary
Write-Host ""
Write-Host "==============================" -ForegroundColor Cyan
Write-Host "Test Results" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host "✅ Passed: $testsPassed" -ForegroundColor Green
Write-Host "❌ Failed: $testsFailed" -ForegroundColor Red

if ($testsFailed -eq 0) {
    Write-Host ""
    Write-Host "🎉 All tests passed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Open app in browser: $AppUrl" -ForegroundColor Cyan
    Write-Host "2. Test Telegram login" -ForegroundColor Cyan
    Write-Host "3. Navigate all pages" -ForegroundColor Cyan
    Write-Host "4. See TEST_APPLICATION.md for full test suite" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "⚠️  Some tests failed" -ForegroundColor Yellow
    Write-Host "Check Railway logs for details" -ForegroundColor Cyan
}

Write-Host ""
