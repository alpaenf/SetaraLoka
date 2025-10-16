<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Post;
use App\Models\Event;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use App\Models\CompanyProfile;

class DashboardStatsController extends Controller
{
    public function __invoke(Request $request)
    {
        $days = 14;
        $now = now();
        $from = $now->copy()->subDays($days - 1)->startOfDay();

        // Cache for 30s to reduce queries
        $data = Cache::remember('dashboard_stats_'.$from->timestamp, 30, function () use ($from, $days) {
            $dates = collect(range(0, $days - 1))
                ->map(fn($i) => $from->copy()->addDays($i));

            $series = fn($model) => $dates->map(function (Carbon $d) use ($model) {
                return [
                    'date' => $d->toDateString(),
                    'count' => $model::whereBetween('created_at', [$d->copy()->startOfDay(), $d->copy()->endOfDay()])->count()
                ];
            });

            return [
                'totals' => [
                    'users' => User::count(),
                    'posts' => Post::count(),
                    'events' => Event::count(),
                    'jobs' => Job::count(),
                ],
                'admin' => [
                    'pending_company_verifications' => CompanyProfile::where('verification_status', 'pending')->count(),
                    'pending_job_approvals' => Job::where('status','pending')->count(),
                    'recent_registrations' => User::latest()->limit(5)->get(['id','name','email','created_at']),
                    'recent_companies_pending' => CompanyProfile::where('verification_status','pending')->latest()->limit(5)->get(['id','company_name','user_id','created_at']),
                ],
                'series' => [
                    'posts' => $series(Post::class),
                    'events' => $series(Event::class),
                ],
            ];
        });

        return response()->json($data);
    }
}
