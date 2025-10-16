<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\User;
use Inertia\Inertia;

class CompanyApplicantsController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $jobId = $request->input('job_id');
        $status = $request->input('status');
        $jobs = Job::where('user_id', $user->id)->get(['id','title']);
        $query = JobApplication::with(['job:id,title','user:id,name,email'])
            ->whereHas('job', fn($q)=>$q->where('user_id',$user->id));
        if ($jobId) {
            $query->where('job_id', $jobId);
        }
        if ($status) {
            $query->where('status', $status);
        }
        $applications = $query->latest()->paginate(20)->appends($request->only(['job_id','status']));
        return Inertia::render('Company/Applicants/Index', [
            'applications' => $applications,
            'jobs' => $jobs,
            'filters' => [
                'job_id' => $jobId,
                'status' => $status,
            ],
            'statuses' => ['submitted','reviewed','shortlisted','rejected'],
        ]);
    }
}
