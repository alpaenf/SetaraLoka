<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\CompanyProfile;
use Carbon\Carbon;

class CompanyDashboardStatsController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = $request->user();
        $jobsQuery = Job::where('user_id', $user->id);
        $totalJobs = (clone $jobsQuery)->count();
        $publishedJobs = (clone $jobsQuery)->whereNotNull('published_at')->count();
        $draftJobs = $totalJobs - $publishedJobs;
        $totalApplications = JobApplication::whereHas('job', fn($q)=>$q->where('user_id',$user->id))->count();
        $weekAgo = Carbon::now()->subDays(7);
        $applicationsLast7 = JobApplication::whereHas('job', fn($q)=>$q->where('user_id',$user->id))
            ->where('created_at','>=',$weekAgo)->count();
        $recentJobs = $jobsQuery->withCount('applications')->latest()->limit(5)->get()->map(function($job){
            return [
                'id' => $job->id,
                'title' => $job->title,
                'published' => (bool)$job->published_at,
                'employment_type' => $job->employment_type,
                'applications_count' => $job->applications_count,
            ];
        });

        // Company profile info & completeness score
        $profile = CompanyProfile::where('user_id', $user->id)->first();
        $profileData = null;
        if ($profile) {
            $fields = ['company_name','description','website','address','phone','official_email','contact_person','logo_path'];
            $filled = 0;
            foreach ($fields as $f) { if (!empty($profile->{$f})) $filled++; }
            $completeness = round(($filled / count($fields)) * 100);
            $profileData = [
                'id' => $profile->id,
                'company_name' => $profile->company_name,
                'verification_status' => $profile->verification_status,
                'verification_notes' => $profile->verification_notes,
                'completeness' => $completeness,
            ];
        }

        // Recent applicants (latest 5 across company's jobs)
        $recentApplicants = JobApplication::whereHas('job', fn($q)=>$q->where('user_id',$user->id))
            ->with(['user:id,name,email','job:id,title'])
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn($a)=>[
                'id' => $a->id,
                'applicant_name' => $a->user?->name,
                'applicant_email' => $a->user?->email,
                'job_title' => $a->job?->title,
                'status' => $a->status,
                'applied_at' => $a->created_at->toDateTimeString(),
            ]);

        // Top jobs by applications
        $topJobs = $jobsQuery->withCount('applications')->orderByDesc('applications_count')->limit(5)->get()->map(fn($j)=>[
            'id' => $j->id,
            'title' => $j->title,
            'applications_count' => $j->applications_count,
        ]);
        return response()->json([
            'metrics' => [
                'total_jobs' => $totalJobs,
                'published_jobs' => $publishedJobs,
                'draft_jobs' => $draftJobs,
                'total_applications' => $totalApplications,
                'applications_last7' => $applicationsLast7,
            ],
            'recent_jobs' => $recentJobs,
            'profile' => $profileData,
            'recent_applicants' => $recentApplicants,
            'top_jobs' => $topJobs,
        ]);
    }
}
