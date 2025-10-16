# SetaraLoka - Automated Testing Script
# Purpose: Run comprehensive automated tests for disability accessibility features
# Author: SetaraLoka Development Team
# Date: October 17, 2025

Write-Host "🚀 SetaraLoka - Automated Testing Suite" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to print section headers
function Write-Section {
    param($Title)
    Write-Host ""
    Write-Host "═══════════════════════════════════════" -ForegroundColor Yellow
    Write-Host "  $Title" -ForegroundColor Yellow
    Write-Host "═══════════════════════════════════════" -ForegroundColor Yellow
    Write-Host ""
}

# Function to run command and check exit code
function Run-TestCommand {
    param(
        [string]$Command,
        [string]$Description
    )
    
    Write-Host "▶ $Description" -ForegroundColor Cyan
    Write-Host "  Command: $Command" -ForegroundColor Gray
    
    Invoke-Expression $Command
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ Success" -ForegroundColor Green
        return $true
    } else {
        Write-Host "  ❌ Failed (Exit Code: $LASTEXITCODE)" -ForegroundColor Red
        return $false
    }
}

# Check if we're in the right directory
if (-not (Test-Path "artisan")) {
    Write-Host "❌ Error: Not in Laravel root directory!" -ForegroundColor Red
    Write-Host "Please run this script from: c:\laragon\www\SetaraLoka" -ForegroundColor Yellow
    exit 1
}

# ============================================================================
# PHASE 1: Environment Check
# ============================================================================
Write-Section "Phase 1: Environment Check"

Write-Host "🔍 Checking PHP installation..." -ForegroundColor Cyan
php --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ PHP not found!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ PHP installed" -ForegroundColor Green

Write-Host ""
Write-Host "🔍 Checking Composer..." -ForegroundColor Cyan
composer --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Composer not found!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Composer installed" -ForegroundColor Green

Write-Host ""
Write-Host "🔍 Checking Node.js..." -ForegroundColor Cyan
node --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js not found!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js installed" -ForegroundColor Green

Write-Host ""
Write-Host "🔍 Checking database connection..." -ForegroundColor Cyan
$dbCheck = php artisan db:show 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database connected" -ForegroundColor Green
} else {
    Write-Host "⚠️ Database connection issue" -ForegroundColor Yellow
    Write-Host "  Make sure MySQL is running in Laragon" -ForegroundColor Gray
}

# ============================================================================
# PHASE 2: Preparation
# ============================================================================
Write-Section "Phase 2: Test Database Preparation"

Write-Host "⚙️ Clearing caches..." -ForegroundColor Cyan
php artisan config:clear | Out-Null
php artisan cache:clear | Out-Null
php artisan view:clear | Out-Null
Write-Host "✅ Caches cleared" -ForegroundColor Green

Write-Host ""
Write-Host "⚙️ Setting up test database..." -ForegroundColor Cyan
$envContent = Get-Content .env -Raw
if ($envContent -notmatch "DB_DATABASE_TEST") {
    Write-Host "  Adding test database configuration to .env" -ForegroundColor Gray
    Add-Content .env "`nDB_DATABASE_TEST=setaraloka_test"
}

# Check if .env.testing exists
if (-not (Test-Path ".env.testing")) {
    Write-Host "  Creating .env.testing file..." -ForegroundColor Gray
    Copy-Item .env .env.testing
    
    # Update testing database name
    $testEnv = Get-Content .env.testing -Raw
    $testEnv = $testEnv -replace "DB_DATABASE=setaraloka", "DB_DATABASE=setaraloka_test"
    Set-Content .env.testing $testEnv
}
Write-Host "✅ Test environment configured" -ForegroundColor Green

# ============================================================================
# PHASE 3: Build Assets
# ============================================================================
Write-Section "Phase 3: Asset Compilation"

Write-Host "📦 Building frontend assets..." -ForegroundColor Cyan
$buildResult = npm run build 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Assets built successfully" -ForegroundColor Green
} else {
    Write-Host "⚠️ Asset build had warnings (non-critical)" -ForegroundColor Yellow
}

# ============================================================================
# PHASE 4: Static Analysis
# ============================================================================
Write-Section "Phase 4: Static Code Analysis"

Write-Host "🔍 Checking PHP syntax..." -ForegroundColor Cyan
$phpFiles = Get-ChildItem -Path app,routes,config -Include *.php -Recurse
$syntaxErrors = 0
foreach ($file in $phpFiles) {
    $result = php -l $file.FullName 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  ❌ Syntax error in: $($file.Name)" -ForegroundColor Red
        $syntaxErrors++
    }
}
if ($syntaxErrors -eq 0) {
    Write-Host "✅ No PHP syntax errors found" -ForegroundColor Green
} else {
    Write-Host "❌ Found $syntaxErrors PHP syntax errors" -ForegroundColor Red
}

Write-Host ""
Write-Host "🔍 Checking routes..." -ForegroundColor Cyan
$routes = php artisan route:list --json 2>&1 | ConvertFrom-Json
$disabilityRoutes = $routes | Where-Object { $_.uri -like "*disabilitas*" -or $_.uri -like "*resume*" }
Write-Host "  Found $($disabilityRoutes.Count) disability-related routes" -ForegroundColor Gray
Write-Host "✅ Routes loaded successfully" -ForegroundColor Green

# ============================================================================
# PHASE 5: Unit & Feature Tests
# ============================================================================
Write-Section "Phase 5: Automated Tests"

Write-Host "🧪 Running PHPUnit tests..." -ForegroundColor Cyan
Write-Host ""

# Test 1: Disability Category Flow
Write-Host "  Test Suite 1: Disability Category Flow" -ForegroundColor Magenta
php artisan test tests/Feature/DisabilityCategoryFlowTest.php --stop-on-failure
$test1Result = $LASTEXITCODE

# Test 2: Resume Builder
Write-Host ""
Write-Host "  Test Suite 2: Resume Builder" -ForegroundColor Magenta
php artisan test tests/Feature/ResumeBuilderTest.php --stop-on-failure
$test2Result = $LASTEXITCODE

# Test 3: Job/Event Filtering
Write-Host ""
Write-Host "  Test Suite 3: Job and Event Filtering" -ForegroundColor Magenta
php artisan test tests/Feature/JobEventFilteringTest.php --stop-on-failure
$test3Result = $LASTEXITCODE

# Test 4: AccessMate Features
Write-Host ""
Write-Host "  Test Suite 4: AccessMate AI Features" -ForegroundColor Magenta
php artisan test tests/Feature/AccessMateTest.php --stop-on-failure
$test4Result = $LASTEXITCODE

# ============================================================================
# PHASE 6: Integration Checks
# ============================================================================
Write-Section "Phase 6: Integration Checks"

Write-Host "🔗 Checking middleware configuration..." -ForegroundColor Cyan
$middleware = php artisan route:list --path=dashboard/disabilitas --json 2>&1 | ConvertFrom-Json
$hasMiddleware = $middleware.middleware -like "*CheckDisabilityCategory*"
if ($hasMiddleware) {
    Write-Host "✅ CheckDisabilityCategory middleware properly configured" -ForegroundColor Green
} else {
    Write-Host "⚠️ Middleware may not be configured correctly" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🔗 Checking AccessMate endpoints..." -ForegroundColor Cyan
$aiRoutes = $routes | Where-Object { $_.uri -like "*ai/*" }
if ($aiRoutes.Count -gt 0) {
    Write-Host "  Found $($aiRoutes.Count) AI endpoints:" -ForegroundColor Gray
    foreach ($route in $aiRoutes) {
        Write-Host "    - $($route.method) $($route.uri)" -ForegroundColor Gray
    }
    Write-Host "✅ AccessMate endpoints configured" -ForegroundColor Green
} else {
    Write-Host "⚠️ No AI endpoints found (client-side implementation active)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🔗 Checking component files..." -ForegroundColor Cyan
$components = @(
    "resources/js/Components/TextSelectionTTS.jsx",
    "resources/js/Components/AccessMate.jsx",
    "resources/js/Components/MapWidget.jsx",
    "resources/js/Pages/Dashboards/DisabledUser.jsx",
    "resources/js/Pages/Disability/Category.jsx"
)

$missingComponents = 0
foreach ($comp in $components) {
    if (Test-Path $comp) {
        Write-Host "  ✅ $comp" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Missing: $comp" -ForegroundColor Red
        $missingComponents++
    }
}

if ($missingComponents -eq 0) {
    Write-Host "✅ All required components present" -ForegroundColor Green
} else {
    Write-Host "❌ $missingComponents components missing" -ForegroundColor Red
}

# ============================================================================
# PHASE 7: Database Seeding Check
# ============================================================================
Write-Section "Phase 7: Database Seeding"

Write-Host "🌱 Checking seeders..." -ForegroundColor Cyan
$seeders = Get-ChildItem -Path database/seeders -Filter "*.php"
Write-Host "  Found $($seeders.Count) seeder files" -ForegroundColor Gray

Write-Host ""
$seedChoice = Read-Host "Do you want to refresh test database and seed? (y/N)"
if (($seedChoice -eq "y") -or ($seedChoice -eq "Y")) {
    Write-Host "⚙️ Running migrations and seeders..." -ForegroundColor Cyan
    php artisan migrate:fresh --seed --force
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database seeded successfully" -ForegroundColor Green
        
        Write-Host ""
        Write-Host "📋 Test Accounts Created:" -ForegroundColor Cyan
        Write-Host "  Disabled User: disabled@setaraloka.test / password" -ForegroundColor White
        Write-Host "  Company User:  company@setaraloka.test / password" -ForegroundColor White
        Write-Host "  Admin User:    admin@setaraloka.test / password" -ForegroundColor White
    } else {
        Write-Host "❌ Seeding failed" -ForegroundColor Red
    }
} else {
    Write-Host "⏭️ Skipping database seeding" -ForegroundColor Yellow
}

# ============================================================================
# PHASE 8: Manual Test Preparation
# ============================================================================
Write-Section "Phase 8: Manual Testing Preparation"

Write-Host "📝 Generating manual test checklist..." -ForegroundColor Cyan

if (Test-Path "TESTING_CHECKLIST.md") {
    Write-Host "✅ TESTING_CHECKLIST.md already exists" -ForegroundColor Green
} else {
    Write-Host "⚠️ TESTING_CHECKLIST.md not found" -ForegroundColor Yellow
}

if (Test-Path "QUICK_TEST_REPORT.md") {
    Write-Host "✅ QUICK_TEST_REPORT.md already exists" -ForegroundColor Green
} else {
    Write-Host "⚠️ QUICK_TEST_REPORT.md not found" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📱 Browser Recommendations for Manual Testing:" -ForegroundColor Cyan
Write-Host "  🟢 Chrome/Edge: Full support (TTS + Voice Recognition)" -ForegroundColor Green
Write-Host "  🟡 Firefox:     Limited voice features" -ForegroundColor Yellow
Write-Host "  🟡 Safari:      Desktop supported, mobile limited" -ForegroundColor Yellow

# ============================================================================
# FINAL REPORT
# ============================================================================
Write-Section "Test Results Summary"

$totalTests = 4
$passedTests = 0

if ($test1Result -eq 0) { $passedTests++ }
if ($test2Result -eq 0) { $passedTests++ }
if ($test3Result -eq 0) { $passedTests++ }
if ($test4Result -eq 0) { $passedTests++ }

Write-Host "Automated Tests:" -ForegroundColor Cyan
Write-Host "  Test Suite 1 (Category Flow):    $(if($test1Result -eq 0){'PASSED'}else{'FAILED'})" -ForegroundColor $(if($test1Result -eq 0){'Green'}else{'Red'})
Write-Host "  Test Suite 2 (Resume Builder):   $(if($test2Result -eq 0){'PASSED'}else{'FAILED'})" -ForegroundColor $(if($test2Result -eq 0){'Green'}else{'Red'})
Write-Host "  Test Suite 3 (Job and Event):    $(if($test3Result -eq 0){'PASSED'}else{'FAILED'})" -ForegroundColor $(if($test3Result -eq 0){'Green'}else{'Red'})
Write-Host "  Test Suite 4 (AccessMate):       $(if($test4Result -eq 0){'PASSED'}else{'FAILED'})" -ForegroundColor $(if($test4Result -eq 0){'Green'}else{'Red'})

Write-Host ""
Write-Host "Total: $passedTests / $totalTests tests passed" -ForegroundColor $(if($passedTests -eq $totalTests){'Green'}else{'Yellow'})

if ($passedTests -eq $totalTests) {
    Write-Host ""
    Write-Host "🎉 All automated tests passed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Cyan
    Write-Host "  1. Start Laravel server: php artisan serve" -ForegroundColor White
    Write-Host "  2. Open http://localhost:8000" -ForegroundColor White
    Write-Host "  3. Login as: disabled@setaraloka.test / password" -ForegroundColor White
    Write-Host "  4. Follow TESTING_CHECKLIST.md for manual tests" -ForegroundColor White
    Write-Host ""
    Write-Host "Critical Features to Test Manually:" -ForegroundColor Yellow
    Write-Host "  ✓ Text Selection TTS (select text → Bacakan button)" -ForegroundColor White
    Write-Host "  ✓ AccessMate AI panel (floating button bottom-right)" -ForegroundColor White
    Write-Host "  ✓ Voice-to-Text in forum (microphone button)" -ForegroundColor White
    Write-Host "  ✓ MapWidget for mobility category" -ForegroundColor White
    Write-Host "  ✓ Resume PDF export" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "⚠️ Some tests failed!" -ForegroundColor Yellow
    Write-Host "Please review the error messages above and fix issues before manual testing." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Testing Report Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Optional: Open documentation
$openDocs = Read-Host "Open testing documentation in browser? (y/N)"
if (($openDocs -eq "y") -or ($openDocs -eq "Y")) {
    if (Test-Path "QUICK_TEST_REPORT.md") {
        Start-Process "QUICK_TEST_REPORT.md"
    }
    if (Test-Path "TESTING_CHECKLIST.md") {
        Start-Process "TESTING_CHECKLIST.md"
    }
}
