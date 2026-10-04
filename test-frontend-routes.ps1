$routes = @(
    '/',
    '/login',
    '/register',
    '/verify-email',
    '/resend-verification',
    '/forgot-password',
    '/reset-password',
    '/learner/dashboard',
    '/learner/career',
    '/learner/learn',
    '/learner/ai-teacher',
    '/learner/skills',
    '/learner/assessments',
    '/learner/projects',
    '/learner/interview',
    '/learner/jobs',
    '/learner/portfolio',
    '/learner/analytics',
    '/learner/community',
    '/learner/settings',
    '/learner/coding',
    '/learner/readiness',
    '/learner/profile',
    '/learner/profile/intelligence',
    '/educator/dashboard',
    '/employer/dashboard',
    '/admin/dashboard'
)

$passed = 0
$failed = 0

foreach ($r in $routes) {
    try {
        $res = Invoke-WebRequest -Uri ("http://localhost:3000" + $r) -Method Get -UseBasicParsing -TimeoutSec 5
        if ($res.StatusCode -eq 200) {
            Write-Host "[PASS] $r -> 200 OK" -ForegroundColor Green
            $passed++
        } else {
            Write-Host "[WARN] $r -> Status $($res.StatusCode)" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "[FAIL] $r -> $($_.Exception.Message)" -ForegroundColor Red
        $failed++
    }
}

Write-Host "`nRoute Audit Summary: $passed Passed, $failed Failed."
