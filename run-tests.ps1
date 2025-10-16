# SetaraLoka - Quick Automated Testing Script
# Run all feature tests and generate report
# Date: October 17, 2025

Write-Host "`n=== SetaraLoka Automated Testing Suite ===" -ForegroundColor Cyan
Write-Host "Date: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')`n" -ForegroundColor Gray

# Check environment
Write-Host "[1/7] Checking environment..." -ForegroundColor Yellow
if (-not (Test-Path "artisan")) {
    Write-Host "ERROR: Not in Laravel root directory!" -ForegroundColor Red
    exit 1
}
Write-Host "  OK - Laravel project detected`n" -ForegroundColor Green

# Clear caches
Write-Host "[2/7] Clearing caches..." -ForegroundColor Yellow
php artisan config:clear | Out-Null
php artisan cache:clear | Out-Null
Write-Host "  OK - Caches cleared`n" -ForegroundColor Green

# Check database
Write-Host "[3/7] Checking database..." -ForegroundColor Yellow
$dbCheck = php artisan db:show 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  OK - Database connected`n" -ForegroundColor Green
} else {
    Write-Host "  WARNING - Database connection issue`n" -ForegroundColor Yellow
}

# Build assets
Write-Host "[4/7] Building frontend assets..." -ForegroundColor Yellow
npm run build | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "  OK - Assets compiled`n" -ForegroundColor Green
} else {
    Write-Host "  WARNING - Build had issues`n" -ForegroundColor Yellow
}

# Check component files
Write-Host "[5/7] Checking component files..." -ForegroundColor Yellow
$components = @(
    "resources/js/Components/TextSelectionTTS.jsx",
    "resources/js/Components/AccessMate.jsx",
    "resources/js/Components/MapWidget.jsx",
    "resources/js/Pages/Dashboards/DisabledUser.jsx",
    "resources/js/Pages/Disability/Category.jsx"
)

$missing = 0
foreach ($comp in $components) {
    if (Test-Path $comp) {
        Write-Host "  OK - $($comp.Split('/')[-1])" -ForegroundColor Green
    } else {
        Write-Host "  MISSING - $comp" -ForegroundColor Red
        $missing++
    }
}
if ($missing -eq 0) {
    Write-Host "`n" -NoNewline
} else {
    Write-Host "  ERROR: $missing components missing`n" -ForegroundColor Red
}

# Run tests
Write-Host "[6/7] Running PHPUnit tests...`n" -ForegroundColor Yellow

Write-Host "  >> Test Suite 1: Disability Category Flow" -ForegroundColor Cyan
php artisan test tests/Feature/DisabilityCategoryFlowTest.php --stop-on-failure
$test1 = $LASTEXITCODE
Write-Host ""

Write-Host "  >> Test Suite 2: Resume Builder" -ForegroundColor Cyan
php artisan test tests/Feature/ResumeBuilderTest.php --stop-on-failure
$test2 = $LASTEXITCODE
Write-Host ""

Write-Host "  >> Test Suite 3: Job and Event Filtering" -ForegroundColor Cyan
php artisan test tests/Feature/JobEventFilteringTest.php --stop-on-failure
$test3 = $LASTEXITCODE
Write-Host ""

Write-Host "  >> Test Suite 4: AccessMate Features" -ForegroundColor Cyan
php artisan test tests/Feature/AccessMateTest.php --stop-on-failure
$test4 = $LASTEXITCODE
Write-Host ""

# Generate report
Write-Host "[7/7] Test Results Summary`n" -ForegroundColor Yellow

$passed = 0
if ($test1 -eq 0) { $passed++ }
if ($test2 -eq 0) { $passed++ }
if ($test3 -eq 0) { $passed++ }
if ($test4 -eq 0) { $passed++ }

Write-Host "  Test Suite 1 (Category Flow):  $(if($test1 -eq 0){'PASSED'}else{'FAILED'})" -ForegroundColor $(if($test1 -eq 0){'Green'}else{'Red'})
Write-Host "  Test Suite 2 (Resume Builder):  $(if($test2 -eq 0){'PASSED'}else{'FAILED'})" -ForegroundColor $(if($test2 -eq 0){'Green'}else{'Red'})
Write-Host "  Test Suite 3 (Job Filtering):   $(if($test3 -eq 0){'PASSED'}else{'FAILED'})" -ForegroundColor $(if($test3 -eq 0){'Green'}else{'Red'})
Write-Host "  Test Suite 4 (AccessMate):      $(if($test4 -eq 0){'PASSED'}else{'FAILED'})" -ForegroundColor $(if($test4 -eq 0){'Green'}else{'Red'})

Write-Host "`n  TOTAL: $passed / 4 tests passed`n" -ForegroundColor $(if($passed -eq 4){'Green'}else{'Yellow'})

if ($passed -eq 4) {
    Write-Host "SUCCESS: All automated tests passed!`n" -ForegroundColor Green
    Write-Host "Next Steps:" -ForegroundColor Cyan
    Write-Host "  1. Start server: php artisan serve" -ForegroundColor White
    Write-Host "  2. Login as: disabled@setaraloka.test / password" -ForegroundColor White
    Write-Host "  3. Follow TESTING_CHECKLIST.md for manual tests`n" -ForegroundColor White
    
    Write-Host "Critical Manual Tests:" -ForegroundColor Yellow
    Write-Host "  - Text Selection TTS (select text -> Bacakan button)" -ForegroundColor White
    Write-Host "  - AccessMate AI panel (floating button)" -ForegroundColor White
    Write-Host "  - Voice-to-Text in forum" -ForegroundColor White
    Write-Host "  - MapWidget for mobility category`n" -ForegroundColor White
} else {
    Write-Host "FAILED: Some tests did not pass" -ForegroundColor Red
    Write-Host "Please review error messages above`n" -ForegroundColor Yellow
}

Write-Host "=== Testing Complete: $(Get-Date -Format 'HH:mm:ss') ===" -ForegroundColor Cyan
Write-Host ""
