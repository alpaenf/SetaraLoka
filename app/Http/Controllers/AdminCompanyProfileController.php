<?php

namespace App\Http\Controllers;

use App\Models\CompanyProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminCompanyProfileController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->query('status', 'pending');
        $query = CompanyProfile::query();
        if (in_array($status, ['pending','approved','rejected'])) {
            $query->where('verification_status', $status);
        }
        if ($q = $request->query('q')) {
            $query->where(function($x) use ($q) {
                $x->where('company_name','like',"%$q%");
            });
        }
        $profiles = $query->latest()->paginate(15)->appends($request->query());
        return Inertia::render('Admin/Companies/Index', [
            'profiles' => $profiles,
            'status' => $status,
            'filters' => [ 'q' => $q ?? '' ],
        ]);
    }

    public function approve(CompanyProfile $profile)
    {
        $profile->verification_status = 'approved';
        $profile->verified_at = now();
        $profile->verification_notes = null;
        $profile->save();
        return back()->with('success', 'Profil perusahaan disetujui.');
    }

    public function reject(Request $request, CompanyProfile $profile)
    {
        $request->validate(['notes' => 'nullable|string']);
        $profile->verification_status = 'rejected';
        $profile->verified_at = null;
        $profile->verification_notes = $request->input('notes');
        $profile->save();
        return back()->with('success', 'Profil perusahaan ditolak.');
    }
}
