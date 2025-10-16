<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $query = Job::withCount('applications')
            ->whereNotNull('published_at')
            ->where('status', 'approved');
        // Filters
        if ($search = $request->input('q')) {
            $query->where(function($q) use ($search) {
                $q->where('title','like',"%$search%")
                  ->orWhere('company','like',"%$search%")
                  ->orWhere('location_name','like',"%$search%");
            });
        }
        if ($type = $request->input('type')) {
            $query->where('employment_type', $type);
        }
        if ($min = $request->input('min_salary')) {
            $query->where('salary_min','>=',(int)$min);
        }
        if ($max = $request->input('max_salary')) {
            $query->where(function($q) use ($max) {
                $q->whereNull('salary_max')->orWhere('salary_max','<=',(int)$max);
            });
        }
        // Accommodation filters (simple LIKE matches on accommodations text)
        $accomodationMap = [
            'acc_wheelchair' => ['kursi roda','wheelchair'],
            'acc_screen_reader' => ['screen reader','pembaca layar'],
            'acc_flexible_hours' => ['fleksibel','flexible hours','jam fleksibel'],
        ];
        foreach ($accomodationMap as $param => $keywords) {
            if (filter_var($request->input($param, false), FILTER_VALIDATE_BOOL)) {
                $query->where(function($q) use ($keywords) {
                    foreach ($keywords as $kw) {
                        $q->orWhere('accommodations','like','%'.$kw.'%');
                    }
                });
            }
        }
    // Disability-only default filter (enabled when param missing)
    // Default: true only for penyandang_disabilitas; for volunteer/others default to false
    $user = $request->user();
    $isDisabledRole = $user?->hasRole('penyandang_disabilitas');
    $defaultDisabilityOnly = $isDisabledRole ? true : false;
    $disabilityOnly = $request->has('disability_only') ? filter_var($request->input('disability_only'), FILTER_VALIDATE_BOOL) : $defaultDisabilityOnly;
        if ($disabilityOnly) {
            $query->where('disability_only', true);
        }
        $query->latest();
    $jobs = $query->paginate(12)->appends($request->only(['q','type','min_salary','max_salary','disability_only','acc_wheelchair','acc_screen_reader','acc_flexible_hours']));
        $appliedIds = auth()->user()?->jobApplications()->pluck('job_id')->all() ?? [];
        return Inertia::render('Jobs/Index', [
            'jobs' => $jobs,
            'applied' => $appliedIds,
            'filters' => [
                'q' => $search,
                'type' => $type,
                'min_salary' => $request->input('min_salary'),
                'max_salary' => $request->input('max_salary'),
                'disability_only' => $disabilityOnly,
                'acc_wheelchair' => (bool)filter_var($request->input('acc_wheelchair', false), FILTER_VALIDATE_BOOL),
                'acc_screen_reader' => (bool)filter_var($request->input('acc_screen_reader', false), FILTER_VALIDATE_BOOL),
                'acc_flexible_hours' => (bool)filter_var($request->input('acc_flexible_hours', false), FILTER_VALIDATE_BOOL),
            ],
        ]);
    }

    public function show(Job $job)
    {
        $job->load('user');
        $user = auth()->user();
        // Only show to public if approved + published; allow admin or owner to bypass
        $isAdmin = $user?->hasRole('admin');
        $isOwner = $user && $job->user_id === $user->id;
        if ((($job->status !== 'approved') || is_null($job->published_at)) && !$isAdmin && !$isOwner) {
            abort(404);
        }
        $applied = $user?->jobApplications()->where('job_id', $job->id)->exists();
        $roles = $user?->getRoleNames();
        return Inertia::render('Jobs/Show', [
            'job' => $job,
            'applied' => $applied,
            'roles' => $roles,
        ]);
    }

    public function apply(Request $request, Job $job)
    {
        $user = $request->user();
        // Enforce eligibility: only for approved & published jobs
        if ($job->status !== 'approved' || is_null($job->published_at)) {
            return back()->with('error', 'Lowongan belum tersedia untuk dilamar.');
        }
        // Block company/admin accounts from applying
        if ($user->hasRole('perusahaan') || $user->hasRole('admin')) {
            return back()->with('error', 'Akun perusahaan/admin tidak dapat melamar.');
        }
        if ($user->jobApplications()->where('job_id', $job->id)->exists()) {
            return back()->with('success', 'Anda sudah melamar pekerjaan ini.');
        }
        $validated = $request->validate([
            'cv' => 'required|file|mimes:pdf|max:2048',
            'cover_letter' => 'nullable|string',
        ]);
        $path = $validated['cv']->store('cvs','public');
        JobApplication::create([
            'job_id' => $job->id,
            'user_id' => $user->id,
            'cv_path' => $path,
            'cover_letter' => $validated['cover_letter'] ?? null,
            'status' => 'submitted',
        ]);
        return back()->with('success', 'Lamaran berhasil dikirim.');
    }
}
