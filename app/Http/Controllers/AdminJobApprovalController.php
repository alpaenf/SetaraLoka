<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class AdminJobApprovalController extends Controller
{
    public function approve(Request $request, Job $job)
    {
        // Only admin via middleware; just set status approved
        $job->status = 'approved';
        $job->save();
        return back()->with('success', 'Lowongan disetujui.');
    }

    public function cancel(Request $request, Job $job)
    {
        $job->status = 'canceled';
        if ($request->filled('reason')) {
            $job->cancellation_reason = $request->input('reason');
        }
        $job->save();
        return back()->with('success', 'Lowongan dibatalkan.');
    }
}
