# MEMORA Deployment Preparation Script

Write-Host "Starting MEMORA deployment preparation..." -ForegroundColor Cyan

# Check Git
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git not found!" -ForegroundColor Red
    exit 1
}

# Initialize Git
if (!(Test-Path ".git")) {
    git init
    git config user.email "deploy@memora.app"
    git config user.name "MEMORA Deployer"
    Write-Host "Git repository initialized" -ForegroundColor Green
}

# Add files
git add -A
Write-Host "Files staged for commit" -ForegroundColor Green

# Create commit
$status = git status --porcelain
if ($status.Length -gt 0) {
    git commit -m "MEMORA deployment: Ready for production"
    Write-Host "Commit created successfully" -ForegroundColor Green
}

Write-Host ""
Write-Host "Next: Push to GitHub and deploy to Railway" -ForegroundColor Yellow
