<?php

namespace App\Http\Middleware;

use App\Models\CompanyProfile;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureCompanyProfileVerified
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        if (!$user) {
            return redirect()->route('login');
        }
        // Only enforce for perusahaan role
        if (!$user->hasRole('perusahaan')) {
            return $next($request);
        }
        $profile = CompanyProfile::where('user_id', $user->id)->first();
        if (!$profile) {
            return redirect()->route('company.profile.edit')
                ->with('error', 'Lengkapi profil perusahaan terlebih dahulu untuk mengakses fitur lowongan.');
        }
        if ($profile->verification_status !== 'approved') {
            return redirect()->route('company.profile.show')
                ->with('error', 'Profil perusahaan Anda belum diverifikasi admin. Menunggu persetujuan.');
        }
        return $next($request);
    }
}
