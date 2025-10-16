<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\AccessMateController;
use App\Models\Event;
use App\Models\Job;
use App\Http\Controllers\ResumeExportController;
use App\Http\Controllers\NotificationController;
use App\Models\User;
use App\Http\Controllers\PushTestController;
use App\Http\Controllers\DashboardStatsController;
use App\Http\Controllers\DisabledDashboardDataController;
use App\Models\Event as EventModel;
use App\Models\Job as JobModel;
use App\Http\Controllers\JobController;
use App\Http\Controllers\EventController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// New role-based dashboard slugs
Route::middleware(['auth','verified'])->group(function() {
    Route::get('/dashboard', function() {
        $user = auth()->user();
        if ($user?->hasRole(User::ROLE_ADMIN)) {
            return redirect()->route('filament.admin.pages.dashboard'); // adjust if filament route different
        }
        
        // Special handling for penyandang_disabilitas: check if kategori selected
        if ($user?->hasRole(User::ROLE_PENYANDANG_DISABILITAS)) {
            if (!$user->kategori_disabilitas) {
                return redirect()->route('disability.category');
            }
            return redirect()->route('dashboard.disabilitas');
        }
        
        // Keep this ordering in sync with client-side role resolution (volunteer, disabled, company, organization, admin)
        $target = match(true) {
            $user?->hasRole(User::ROLE_RELAWAN) => 'dashboard.relawan',
            $user?->hasRole(User::ROLE_PERUSAHAAN) => 'dashboard.perusahaan',
            $user?->hasRole(User::ROLE_LEMBAGA_SOSIAL) => 'dashboard.lembaga',
            default => 'dashboard.disabilitas'
        };
        return redirect()->route($target);
    })->name('dashboard');

    // Disability category selection (must be before dashboard.disabilitas)
    Route::middleware(['role:' . User::ROLE_PENYANDANG_DISABILITAS])->group(function () {
        Route::get('/disabilitas/kategori', [\App\Http\Controllers\DisabilityCategoryController::class, 'show'])
            ->name('disability.category');
        Route::post('/disabilitas/kategori', [\App\Http\Controllers\DisabilityCategoryController::class, 'store'])
            ->name('disability.category.store');
    });

    Route::get('/dashboard/disabilitas', function() {
        return Inertia::render('Dashboards/DisabledUser', [
            'kategori' => auth()->user()->kategori_disabilitas,
        ]);
    })
        ->name('dashboard.disabilitas')
        ->middleware(['role:' . User::ROLE_PENYANDANG_DISABILITAS, \App\Http\Middleware\CheckDisabilityCategory::class]);
    
    Route::get('/dashboard/relawan', fn() => Inertia::render('Dashboards/Volunteer'))
        ->name('dashboard.relawan')
        ->middleware('role:' . User::ROLE_RELAWAN);
    
    Route::get('/dashboard/perusahaan', fn() => Inertia::render('Dashboards/Company'))
        ->name('dashboard.perusahaan')
        ->middleware('role:' . User::ROLE_PERUSAHAAN);
    
    Route::get('/dashboard/lembaga', fn() => Inertia::render('Dashboards/Organization'))
        ->name('dashboard.lembaga')
        ->middleware('role:' . User::ROLE_LEMBAGA_SOSIAL);

        // Map dynamic points (events & jobs with coordinates)
        Route::get('/api/map/points', function() {
            $events = \App\Models\Event::whereNotNull('latitude')->whereNotNull('longitude')
                ->select('id','title','latitude','longitude')->latest()->take(50)->get()
                ->map(fn($e) => [
                    'id' => 'event-'.$e->id,
                    'type' => 'event',
                    'title' => $e->title,
                    'latitude' => (float)$e->latitude,
                    'longitude' => (float)$e->longitude,
                ]);
            $jobs = \App\Models\Job::whereNotNull('latitude')->whereNotNull('longitude')
                ->select('id','title','latitude','longitude','company')->latest()->take(50)->get()
                ->map(fn($j) => [
                    'id' => 'job-'.$j->id,
                    'type' => 'job',
                    'title' => $j->title,
                    'latitude' => (float)$j->latitude,
                    'longitude' => (float)$j->longitude,
                ]);
            return response()->json([
                'points' => $events->concat($jobs)->values(),
            ]);
        })->name('api.map.points');
});
Route::middleware(['auth','verified'])->group(function () {
    Route::resource('posts', PostController::class);
    Route::post('posts/{post}/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::delete('comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');

    // Resume routes with slug binding
    Route::resource('resumes', \App\Http\Controllers\ResumeController::class)
        ->parameters(['resumes' => 'resume:slug']);
    
    // Resume PDF export (also use slug binding)
    Route::get('/resumes/{resume:slug}/pdf', [ResumeExportController::class, 'show'])->name('resumes.pdf');

    Route::post('/ai/summarize', [AccessMateController::class, 'summarize'])->middleware('throttle:20,1')->name('ai.summarize');
    Route::post('/ai/tts', [AccessMateController::class, 'tts'])->middleware('throttle:20,1')->name('ai.tts');

    Route::get('/map', function() {
        $events = Event::latest()->take(50)->get();
        $jobs = Job::latest()->take(50)->get();
        return Inertia::render('Explore/Map', [
            'events' => $events,
            'jobs' => $jobs,
        ]);
    })->name('map');

    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/mark-all-read', [NotificationController::class, 'markAllRead'])->name('notifications.readAll');

    // Test route to send a OneSignal push to the current user (uses external user id = auth id)
    Route::post('/push/test', [PushTestController::class, 'send'])->name('push.test');

    // Dashboard stats API
    Route::get('/dashboard/stats', DashboardStatsController::class)->name('dashboard.stats');
    Route::get('/dashboard/volunteer/data', \App\Http\Controllers\VolunteerDashboardDataController::class)->name('dashboard.volunteer.data');
    Route::get('/dashboard/disabled/data', DisabledDashboardDataController::class)->name('dashboard.disabled.data');

    // Disabled User Profile
    Route::middleware(['role:' . User::ROLE_PENYANDANG_DISABILITAS])->group(function() {
        Route::get('/disabilitas/profile', [\App\Http\Controllers\DisabledController::class, 'profile'])->name('disabled.profile');
        Route::put('/disabilitas/profile', [\App\Http\Controllers\DisabledController::class, 'updateProfile'])->name('disabled.profile.update');
    });

    // Events
    Route::get('/events', [EventController::class, 'index'])->name('events.index');
    Route::get('/events/{event}', [EventController::class, 'show'])->name('events.show');
    Route::post('/events/{event}/interest', [EventController::class, 'toggleInterest'])->name('events.interest');
    Route::post('/events/{event}/register', [EventController::class, 'register'])->name('events.register');
    // QR check-in (signed)
    Route::get('/events/{event}/checkin', [\App\Http\Controllers\EventCheckinController::class, '__invoke'])
        ->middleware('signed')
        ->name('events.checkin');
    // Event participants management (owner/admin)
    Route::get('/events/{event}/participants', [\App\Http\Controllers\EventParticipantsController::class, 'index'])->name('events.participants.index');
    Route::post('/events/{event}/participants/{userId}/verify', [\App\Http\Controllers\EventParticipantsController::class, 'verify'])->name('events.participants.verify');
    Route::post('/events/{event}/participants/{userId}/unverify', [\App\Http\Controllers\EventParticipantsController::class, 'unverify'])->name('events.participants.unverify');

    Route::get('/jobs', [JobController::class, 'index'])->name('jobs.index');
    Route::get('/jobs/{job}', [JobController::class, 'show'])->name('jobs.show');
    Route::post('/jobs/{job}/apply', [JobController::class, 'apply'])->name('jobs.apply');

    // Admin approvals for jobs
    Route::middleware([\Spatie\Permission\Middleware\RoleMiddleware::class . ':admin'])->group(function() {
        // Use a non-conflicting path for custom moderation page, keep name the same for compatibility
        Route::get('/admin/jobs/moderation', [\App\Http\Controllers\AdminJobsController::class, 'index'])->name('admin.jobs.index');
        Route::post('/admin/jobs/{job}/approve', [\App\Http\Controllers\AdminJobApprovalController::class, 'approve'])->name('admin.jobs.approve');
        Route::post('/admin/jobs/{job}/cancel', [\App\Http\Controllers\AdminJobApprovalController::class, 'cancel'])->name('admin.jobs.cancel');

        // Admin company profile verification
        Route::get('/admin/companies', [\App\Http\Controllers\AdminCompanyProfileController::class, 'index'])->name('admin.companies.index');
        Route::post('/admin/companies/{profile}/approve', [\App\Http\Controllers\AdminCompanyProfileController::class, 'approve'])->name('admin.companies.approve');
        Route::post('/admin/companies/{profile}/reject', [\App\Http\Controllers\AdminCompanyProfileController::class, 'reject'])->name('admin.companies.reject');
    });

    // Company job management (internal employer area) - protect with role middleware from spatie/permission
    Route::middleware([\Spatie\Permission\Middleware\RoleMiddleware::class . ':perusahaan'])->group(function() {
        // Company profile routes
        Route::get('/company/profile', [\App\Http\Controllers\CompanyProfileController::class, 'show'])->name('company.profile.show');
        Route::get('/company/profile/edit', [\App\Http\Controllers\CompanyProfileController::class, 'edit'])->name('company.profile.edit');
        Route::post('/company/profile', [\App\Http\Controllers\CompanyProfileController::class, 'update'])->name('company.profile.update');

        // Protect job management with verified profile
        Route::middleware('company.verified')->group(function() {
            Route::get('/company/dashboard/stats', \App\Http\Controllers\CompanyDashboardStatsController::class)->name('company.dashboard.stats');
            Route::get('/company/jobs', [\App\Http\Controllers\CompanyJobController::class, 'index'])->name('company.jobs.index');
            Route::get('/company/jobs/create', [\App\Http\Controllers\CompanyJobController::class, 'create'])->name('company.jobs.create');
            Route::post('/company/jobs', [\App\Http\Controllers\CompanyJobController::class, 'store'])->name('company.jobs.store');
            Route::get('/company/jobs/{job}/edit', [\App\Http\Controllers\CompanyJobController::class, 'edit'])->name('company.jobs.edit');
            Route::put('/company/jobs/{job}', [\App\Http\Controllers\CompanyJobController::class, 'update'])->name('company.jobs.update');
            Route::post('/company/jobs/{job}/toggle-publish', [\App\Http\Controllers\CompanyJobController::class, 'togglePublish'])->name('company.jobs.toggle');
            Route::get('/company/applicants', [\App\Http\Controllers\CompanyApplicantsController::class, 'index'])->name('company.applicants.index');
        });
    });

    Route::get('/resources', function() {
        return Inertia::render('Resources/Index', [
            'sections' => [
                ['title' => 'Panduan Aksesibilitas', 'items' => ['Desain Inklusif', 'Kontras Warna', 'Navigasi Keyboard']],
                ['title' => 'Kesiapan Kerja', 'items' => ['Tips Wawancara Inklusif', 'Adaptasi Alat Bantu']],
                ['title' => 'Dukungan Komunitas', 'items' => ['Forum Diskusi', 'Program Relawan']],
            ],
        ]);
    })->name('resources.index');

    // Volunteer-specific pages with real data
    Route::middleware([\Spatie\Permission\Middleware\RoleMiddleware::class . ':relawan'])->group(function () {
        Route::get('/relawan/peluang', [\App\Http\Controllers\VolunteerController::class, 'opportunities'])->name('volunteer.opportunities');
        Route::get('/relawan/profil', [\App\Http\Controllers\VolunteerController::class, 'profile'])->name('volunteer.profile');
        Route::get('/relawan/sertifikat', [\App\Http\Controllers\VolunteerController::class, 'certificates'])->name('volunteer.certificates');
        Route::get('/relawan/sertifikat/{event}/pdf', [\App\Http\Controllers\VolunteerCertificateController::class, 'download'])->name('volunteer.certificate.pdf');
    });

    // Organization-specific pages (basic placeholders wired to existing data)
    Route::middleware([\Spatie\Permission\Middleware\RoleMiddleware::class . ':lembaga_sosial'])->group(function () {
        // Programs CRUD
        Route::resource('/lembaga/programs', \App\Http\Controllers\OrganizationProgramsController::class)
            ->names([
                'index' => 'organization.programs',
                'create' => 'organization.programs.create',
                'store' => 'organization.programs.store',
                'show' => 'organization.programs.show',
                'edit' => 'organization.programs.edit',
                'update' => 'organization.programs.update',
                'destroy' => 'organization.programs.destroy',
            ]);
        // Backward-compat alias (old single page) -> redirect to new index
        Route::get('/lembaga/program', function() {
            return redirect()->route('organization.programs');
        })->name('organization.programs.legacy');
        // Events CRUD (organization-owned)
        Route::resource('/lembaga/events', \App\Http\Controllers\OrganizationEventsController::class)
            ->names([
                'index' => 'organization.events',
                'create' => 'organization.events.create',
                'store' => 'organization.events.store',
                'show' => 'organization.events.show',
                'edit' => 'organization.events.edit',
                'update' => 'organization.events.update',
                'destroy' => 'organization.events.destroy',
            ]);
        Route::delete('/lembaga/events/{event}/image', [\App\Http\Controllers\OrganizationEventsController::class, 'destroyImage'])->name('organization.events.image.destroy');
        // Backward-compat alias (old /lembaga/acara) -> redirect to new index
        Route::get('/lembaga/acara', function() { return redirect()->route('organization.events'); })
            ->name('organization.events.legacy');
        // Organization profile (separate model)
    Route::get('/lembaga/profil', [\App\Http\Controllers\OrganizationProfileController::class, 'show'])->name('organization.profile');
        Route::get('/lembaga/profil/edit', [\App\Http\Controllers\OrganizationProfileController::class, 'edit'])->name('organization.profile.edit');
    Route::post('/lembaga/profil', [\App\Http\Controllers\OrganizationProfileController::class, 'update'])->name('organization.profile.update');
    Route::delete('/lembaga/profil/logo', [\App\Http\Controllers\OrganizationProfileController::class, 'destroyLogo'])->name('organization.profile.logo.destroy');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile/category', [ProfileController::class, 'updateCategory'])->name('profile.update.category');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
