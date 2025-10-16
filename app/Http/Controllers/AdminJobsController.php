<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminJobsController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->query('status', 'pending');

        $companyId = $request->query('company_id');
        $company = null;

        $baseQuery = Job::query();

        // Status counts for tabs
        $statusCountsRaw = (clone $baseQuery)
            ->selectRaw('COALESCE(status, "pending") as status_key, COUNT(*) as aggregate')
            ->groupBy('status_key')
            ->pluck('aggregate', 'status_key')
            ->toArray();
        $statusCounts = [
            'approved' => (int)($statusCountsRaw['approved'] ?? 0),
            'pending' => (int)($statusCountsRaw['pending'] ?? 0),
            'canceled' => (int)($statusCountsRaw['canceled'] ?? 0),
            'total' => (int) ((clone $baseQuery)->count()),
        ];

        $query = clone $baseQuery;
        if ($companyId) {
            $profile = \App\Models\CompanyProfile::find($companyId);
            if ($profile) {
                $company = $profile;
                // jobs posted by the company's user
                $query->where('user_id', $profile->user_id);
            }
        }
        if (in_array($status, ['approved','pending','canceled'])) {
            $query->where(function($q) use ($status) {
                if ($status === 'pending') {
                    $q->whereNull('status')->orWhere('status', 'pending');
                } else {
                    $q->where('status', $status);
                }
            });
        }

        // Optional search by title/company
        if ($search = $request->query('q')) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('company', 'like', "%{$search}%");
            });
        }

        $jobs = $query->with('user')
            ->latest()
            ->paginate(15)
            ->appends($request->query())
            ->through(function($job) {
                return [
                    'id' => $job->id,
                    'title' => $job->title,
                    'company' => $job->company,
                    'employment_type' => $job->employment_type,
                    'published' => (bool)$job->published_at,
                    'published_at' => $job->published_at,
                    'status' => $job->status ?? 'pending',
                    'disability_only' => (bool)$job->disability_only,
                    'accommodations' => $job->accommodations,
                    'created_at' => $job->created_at?->toDateTimeString(),
                    'author' => $job->user?->name,
                ];
            });

        return Inertia::render('Admin/Jobs/Index', [
            'jobs' => $jobs,
            'status' => $status,
            'status_counts' => $statusCounts,
            'filters' => [
                'q' => $request->query('q')
            ],
            'company' => $company ? [ 'id' => $company->id, 'name' => $company->company_name ] : null,
        ]);
    }
}
