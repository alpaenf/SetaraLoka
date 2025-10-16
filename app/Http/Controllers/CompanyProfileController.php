<?php

namespace App\Http\Controllers;

use App\Models\CompanyProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CompanyProfileController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();
        $profile = CompanyProfile::firstOrCreate(
            ['user_id' => $user->id],
            ['company_name' => $user->name]
        );
        return Inertia::render('Company/Profile/Show', [
            'profile' => $profile,
        ]);
    }

    public function edit(Request $request)
    {
        $user = $request->user();
        $profile = CompanyProfile::firstOrCreate(
            ['user_id' => $user->id],
            ['company_name' => $user->name]
        );
        return Inertia::render('Company/Profile/Edit', [
            'profile' => $profile,
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();
        $profile = CompanyProfile::firstOrCreate(['user_id' => $user->id]);
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'industry' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'phone' => 'nullable|string|max:50',
            'official_email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'linkedin' => 'nullable|url|max:255',
            'instagram' => 'nullable|url|max:255',
            'logo' => 'nullable|file|image|max:2048',
        ]);
        if ($request->hasFile('logo')) {
            if ($profile->logo_path) {
                Storage::disk('public')->delete($profile->logo_path);
            }
            $path = $request->file('logo')->store('company-logos', 'public');
            $profile->logo_path = $path;
        }
    $profile->company_name = $validated['company_name'];
    $profile->industry = $validated['industry'] ?? null;
    $profile->description = $validated['description'] ?? null;
    $profile->address = $validated['address'] ?? null;
    $profile->city = $validated['city'] ?? null;
    $profile->phone = $validated['phone'] ?? null;
    $profile->official_email = $validated['official_email'] ?? null;
    $profile->website = $validated['website'] ?? null;
    $profile->linkedin = $validated['linkedin'] ?? null;
    $profile->instagram = $validated['instagram'] ?? null;
        // Reset to pending when edited if previously rejected or pending
        if ($profile->verification_status !== 'approved') {
            $profile->verification_status = 'pending';
            $profile->verified_at = null;
        }
        $profile->save();

        return redirect()->route('company.profile.show')->with('success', 'Profil perusahaan diperbarui. Menunggu verifikasi admin.');
    }
}
