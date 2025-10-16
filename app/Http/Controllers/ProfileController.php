<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    /**
     * Update the user's disability category.
     */
    public function updateCategory(Request $request): RedirectResponse
    {
        $request->validate([
            'kategori_disabilitas' => [
                'required',
                'string',
                Rule::in(['tidak_bisa_berjalan', 'tidak_bisa_berbicara', 'tidak_bisa_melihat', 'tidak_bisa_mendengar']),
            ],
        ]);

        $user = $request->user();
        $oldCategory = $user->kategori_disabilitas;
        $newCategory = $request->kategori_disabilitas;

        $user->kategori_disabilitas = $newCategory;
        $user->save();

        // Log the category change
        \Log::info('Disability category changed', [
            'user_id' => $user->id,
            'old_category' => $oldCategory,
            'new_category' => $newCategory,
        ]);

        return Redirect::route('profile.edit')->with('status', 'category-updated');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
