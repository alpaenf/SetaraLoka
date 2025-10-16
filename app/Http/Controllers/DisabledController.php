<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\JobApplication;
use App\Models\Event;

class DisabledController extends Controller
{
    public function profile()
    {
        $user = auth()->user();
        
        // Get statistics
        $stats = [
            'posts' => Post::where('user_id', $user->id)->count(),
            'events' => Event::whereHas('participants', function($q) use ($user) {
                $q->where('user_id', $user->id);
            })->count(),
            'applications' => JobApplication::where('user_id', $user->id)->count(),
        ];

        return Inertia::render('Disabled/Profile', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'kategori_disabilitas' => $user->kategori_disabilitas ?? 'tidak_bisa_berbicara',
                'bio' => $user->bio ?? '',
                'skills' => $user->skills ?? '',
                'phone' => $user->phone ?? '',
                'city' => $user->city ?? '',
                'photo_url' => $user->profile_photo_path ? asset('storage/' . $user->profile_photo_path) : null,
            ],
            'stats' => $stats,
        ]);
    }

    public function updateProfile(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . auth()->id(),
            'kategori_disabilitas' => 'required|in:tidak_bisa_berbicara,tidak_bisa_berjalan',
            'bio' => 'nullable|string|max:1000',
            'skills' => 'nullable|string|max:500',
            'phone' => 'nullable|string|max:20',
            'city' => 'nullable|string|max:100',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = auth()->user();

        // Handle photo upload
        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($user->profile_photo_path) {
                \Storage::disk('public')->delete($user->profile_photo_path);
            }

            // Store new photo
            $path = $request->file('photo')->store('profile-photos', 'public');
            $validated['profile_photo_path'] = $path;
        }

        $user->update($validated);

        return back()->with('success', 'Profil berhasil diperbarui');
    }
}

