<?php

namespace App\Http\Controllers;

use App\Models\OrganizationProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganizationProfileController extends Controller
{
    public function show(Request $request)
    {
        $profile = OrganizationProfile::firstOrCreate(
            ['user_id' => $request->user()->id],
            ['org_name' => $request->user()->name]
        );
        return Inertia::render('Organizations/Profile', [
            'profile' => [
                'org_name' => $profile->org_name,
                'city' => $profile->city,
                'website' => $profile->website,
                'phone' => $profile->phone,
                'email' => $profile->email,
                'address' => $profile->address,
                'description' => $profile->description,
                'logo_url' => $profile->logo_path ? asset('storage/' . ltrim($profile->logo_path, '/')) : null,
            ],
        ]);
    }

    public function edit(Request $request)
    {
        $profile = OrganizationProfile::firstOrCreate(
            ['user_id' => $request->user()->id],
            ['org_name' => $request->user()->name]
        );
        return Inertia::render('Organizations/ProfileEdit', [
            'profile' => $profile,
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'org_name' => 'required|string|max:255',
            'city' => 'nullable|string|max:255',
            'website' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',
        ]);
        $profile = OrganizationProfile::firstOrCreate(
            ['user_id' => $request->user()->id],
            ['org_name' => $request->user()->name]
        );
        if ($request->hasFile('logo')) {
            $data['logo_path'] = $request->file('logo')->store('org-logos', 'public');
        }
        $profile->update($data);
        return redirect()->route('organization.profile')->with('status', 'Profil diperbarui.');
    }

    public function destroyLogo(Request $request)
    {
        $profile = OrganizationProfile::firstOrCreate(
            ['user_id' => $request->user()->id],
            ['org_name' => $request->user()->name]
        );
        if ($profile->logo_path) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($profile->logo_path);
            $profile->logo_path = null;
            $profile->save();
        }
        return back()->with('status', 'Logo dihapus.');
    }
}
