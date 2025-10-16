<?php

namespace App\Http\Controllers;

use App\Models\Resume;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ResumeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $resumes = Resume::where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Resumes/Index', [
            'resumes' => $resumes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Resumes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'profile' => 'required|array',
            'profile.full_name' => 'required|string|max:255',
            'profile.email' => 'required|email|max:255',
            'profile.phone' => 'nullable|string|max:20',
            'profile.address' => 'nullable|string|max:500',
            'profile.summary' => 'nullable|string|max:1000',
            'education' => 'nullable|array',
            'experience' => 'nullable|array',
            'skills' => 'nullable|array',
        ]);

        $slug = Str::slug($validated['title']) . '-' . Str::random(6);

        $resume = Resume::create([
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'profile' => $validated['profile'],
            'education' => $validated['education'] ?? [],
            'experience' => $validated['experience'] ?? [],
            'skills' => $validated['skills'] ?? [],
            'slug' => $slug,
        ]);

        return redirect()->route('resumes.show', $resume->slug)
            ->with('success', 'Resume berhasil dibuat!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Resume $resume)
    {
        if ($resume->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Resumes/Show', [
            'resume' => $resume
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Resume $resume)
    {
        if ($resume->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Resumes/Edit', [
            'resume' => $resume
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Resume $resume)
    {
        if ($resume->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'profile' => 'required|array',
            'profile.full_name' => 'required|string|max:255',
            'profile.email' => 'required|email|max:255',
            'profile.phone' => 'nullable|string|max:20',
            'profile.address' => 'nullable|string|max:500',
            'profile.summary' => 'nullable|string|max:1000',
            'education' => 'nullable|array',
            'experience' => 'nullable|array',
            'skills' => 'nullable|array',
        ]);

        $resume->update([
            'title' => $validated['title'],
            'profile' => $validated['profile'],
            'education' => $validated['education'] ?? [],
            'experience' => $validated['experience'] ?? [],
            'skills' => $validated['skills'] ?? [],
        ]);

        return redirect()->route('resumes.show', $resume->slug)
            ->with('success', 'Resume berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Resume $resume)
    {
        if ($resume->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $resume->delete();

        return redirect()->route('resumes.index')
            ->with('success', 'Resume berhasil dihapus!');
    }
}
