<?php

namespace App\Http\Controllers;

use App\Models\Program;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganizationProgramsController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $programs = Program::where('user_id', $user->id)
            ->latest()
            ->paginate(10)
            ->through(function ($p) {
                return [
                    'id' => $p->id,
                    'title' => $p->title,
                    'status' => $p->status,
                    'created_at' => optional($p->created_at)->toDateTimeString(),
                ];
            });
        return Inertia::render('Organizations/Programs/Index', [
            'programs' => $programs,
        ]);
    }

    public function create()
    {
        return Inertia::render('Organizations/Programs/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:draft,published',
        ]);
        $program = Program::create([
            'user_id' => $request->user()->id,
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'status' => $request->input('status', 'draft'),
        ]);
    return redirect()->route('organization.programs')->with('status', 'Program dibuat.');
    }

    public function show(Program $program)
    {
        $this->authorizeProgram($program);
        return Inertia::render('Organizations/Programs/Show', [
            'program' => [
                'id' => $program->id,
                'title' => $program->title,
                'description' => $program->description,
                'status' => $program->status,
                'created_at' => optional($program->created_at)->toDateTimeString(),
            ]
        ]);
    }

    public function edit(Program $program)
    {
        $this->authorizeProgram($program);
        return Inertia::render('Organizations/Programs/Edit', [
            'program' => [
                'id' => $program->id,
                'title' => $program->title,
                'description' => $program->description,
                'status' => $program->status,
            ]
        ]);
    }

    public function update(Request $request, Program $program)
    {
        $this->authorizeProgram($program);
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:draft,published',
        ]);
        $program->update($request->only('title', 'description', 'status'));
    return redirect()->route('organization.programs')->with('status', 'Program diperbarui.');
    }

    public function destroy(Program $program)
    {
        $this->authorizeProgram($program);
        $program->delete();
    return redirect()->route('organization.programs')->with('status', 'Program dihapus.');
    }

    private function authorizeProgram(Program $program)
    {
        $user = auth()->user();
        abort_unless($user && $user->id === $program->user_id, 403);
    }
}
