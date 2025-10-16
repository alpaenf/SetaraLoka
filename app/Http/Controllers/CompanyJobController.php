<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class CompanyJobController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $baseQuery = Job::where('user_id', $user->id);
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

        $jobs = $baseQuery
            ->withCount('applications')
            ->latest()
            ->paginate(15)
            ->through(function($job) {
                return [
                    'id' => $job->id,
                    'title' => $job->title,
                    'employment_type' => $job->employment_type,
                    'published' => (bool)$job->published_at,
                    'published_at' => $job->published_at,
                    'status' => $job->status ?? 'pending',
                    'applications_count' => $job->applications_count,
                    'salary_min' => $job->salary_min,
                    'salary_max' => $job->salary_max,
                    'location_name' => $job->location_name,
                    'disability_only' => (bool)$job->disability_only,
                    'accommodations' => $job->accommodations,
                ];
            });
        return Inertia::render('Company/Jobs/Index', [
            'jobs' => $jobs,
            'status_counts' => $statusCounts,
        ]);
    }

    public function create()
    {
        return Inertia::render('Company/Jobs/Create');
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $validated = $this->validatePayload($request);
        Job::create(array_merge($validated, [
            'user_id' => $user->id,
            'company' => $user->name,
            'status' => 'pending',
            'published_at' => !empty($validated['publish']) ? now() : null,
            'requirements' => isset($validated['requirements']) ? implode("\n", $validated['requirements']) : null,
            'benefits' => isset($validated['benefits']) ? implode("\n", $validated['benefits']) : null,
        ]));
        return redirect()->route('company.jobs.index')->with('success', 'Lowongan berhasil dibuat.');
    }

    public function edit(Request $request, Job $job)
    {
        $this->authorizeOwnership($request, $job);
        return Inertia::render('Company/Jobs/Edit', [
            'job' => [
                'id' => $job->id,
                'title' => $job->title,
                'description' => $job->description,
                'employment_type' => $job->employment_type,
                'location_name' => $job->location_name,
                'latitude' => $job->latitude,
                'longitude' => $job->longitude,
                'salary_min' => $job->salary_min,
                'salary_max' => $job->salary_max,
                'requirements' => $job->requirements ? explode("\n", $job->requirements) : [],
                'benefits' => $job->benefits ? explode("\n", $job->benefits) : [],
                'published' => (bool)$job->published_at,
                'disability_only' => (bool)$job->disability_only,
                'accommodations' => $job->accommodations,
            ],
        ]);
    }

    public function update(Request $request, Job $job)
    {
        $this->authorizeOwnership($request, $job);
        $validated = $this->validatePayload($request, updating: true);
        $job->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'employment_type' => $validated['employment_type'],
            'location_name' => $validated['location_name'] ?? null,
            'latitude' => $validated['latitude'] ?? null,
            'longitude' => $validated['longitude'] ?? null,
            'salary_min' => $validated['salary_min'] ?? null,
            'salary_max' => $validated['salary_max'] ?? null,
            'requirements' => isset($validated['requirements']) ? implode("\n", $validated['requirements']) : null,
            'benefits' => isset($validated['benefits']) ? implode("\n", $validated['benefits']) : null,
            'disability_only' => $validated['disability_only'] ?? false,
            'accommodations' => $validated['accommodations'] ?? null,
        ]);
        if (array_key_exists('publish', $validated)) {
            if ($validated['publish'] && !$job->published_at) {
                $job->published_at = now();
            } elseif (!$validated['publish']) {
                $job->published_at = null;
            }
            $job->save();
        }
        return redirect()->route('company.jobs.index')->with('success', 'Lowongan diperbarui.');
    }

    public function togglePublish(Request $request, Job $job)
    {
        $this->authorizeOwnership($request, $job);
        if ($job->published_at) {
            $job->published_at = null;
        } else {
            $job->published_at = now();
        }
        $job->save();
        return back()->with('success', 'Status publikasi diperbarui.');
    }

    private function authorizeOwnership(Request $request, Job $job): void
    {
        if ($job->user_id !== $request->user()->id) {
            abort(403);
        }
    }

    private function validatePayload(Request $request, bool $updating = false): array
    {
        return $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'employment_type' => 'required|string|max:100',
            'location_name' => 'nullable|string|max:255',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'salary_min' => 'nullable|integer|min:0',
            'salary_max' => 'nullable|integer|min:0',
            'requirements' => 'nullable|array',
            'requirements.*' => 'string|max:500',
            'benefits' => 'nullable|array',
            'benefits.*' => 'string|max:500',
            'publish' => 'nullable|boolean',
            'disability_only' => 'nullable|boolean',
            'accommodations' => 'nullable|string',
        ]);
    }
}
