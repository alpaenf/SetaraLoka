<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Program;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganizationEventsController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $q = $request->string('q')->toString();
        $from = $request->date('from');
        $to = $request->date('to');
        $programId = $request->integer('program_id');
        $category = $request->string('category')->toString();
        $events = Event::where('user_id', $user->id)
            ->when($q, function ($query) use ($q) {
                $query->where(function ($w) use ($q) {
                    $w->where('title', 'like', "%$q%")
                      ->orWhere('description', 'like', "%$q%");
                });
            })
            ->when($from, fn($q2) => $q2->whereDate('start_at', '>=', $from))
            ->when($to, fn($q2) => $q2->whereDate('end_at', '<=', $to))
            ->when($programId, fn($q2) => $q2->where('program_id', $programId))
            ->when($category, function ($q2) use ($category) {
                $q2->whereJsonContains('categories', $category);
            })
            ->latest('start_at')
            ->paginate(10)
            ->withQueryString()
            ->through(function ($e) {
                return [
                    'id' => $e->id,
                    'title' => $e->title,
                    'description' => $e->description,
                    'start_at' => optional($e->start_at)->format('Y-m-d H:i'),
                    'end_at' => optional($e->end_at)->format('Y-m-d H:i'),
                    'location_name' => $e->location_name,
                    'image_url' => $e->image_url,
                    'program' => $e->program ? [ 'id' => $e->program->id, 'title' => $e->program->title ] : null,
                    'categories' => $e->categories ?? [],
                ];
            });
        $programs = Program::where('user_id', $user->id)->orderBy('title')->get(['id','title']);
        return Inertia::render('Organizations/Events/Index', [
            'events' => $events,
            'filters' => [
                'q' => $q,
                'from' => $from?->format('Y-m-d'),
                'to' => $to?->format('Y-m-d'),
                'program_id' => $programId ?: null,
                'category' => $category ?: null,
            ],
            'programs' => $programs,
        ]);
    }

    public function create()
    {
        $programs = Program::where('user_id', auth()->id())->orderBy('title')->get(['id','title']);
        return Inertia::render('Organizations/Events/Create', [
            'programs' => $programs,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_at' => 'nullable|date',
            'end_at' => 'nullable|date|after_or_equal:start_at',
            'location_name' => 'nullable|string|max:255',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'image' => 'nullable|image|max:2048',
            'program_id' => 'nullable|exists:programs,id',
            'categories' => 'nullable|array',
            'categories.*' => 'string|max:50',
        ]);
        $data['user_id'] = $request->user()->id;
        // Ensure program belongs to user if provided
        if (!empty($data['program_id'])) {
            $owned = Program::where('id', $data['program_id'])->where('user_id', $request->user()->id)->exists();
            if (!$owned) unset($data['program_id']);
        }
        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('events', 'public');
        }
        $event = Event::create($data);
        return redirect()->route('organization.events')->with('status', 'Acara dibuat.');
    }

    public function show(Event $event)
    {
        $this->authorizeEvent($event);
        return Inertia::render('Organizations/Events/Show', [
            'event' => [
                'id' => $event->id,
                'title' => $event->title,
                'description' => $event->description,
                'start_at' => optional($event->start_at)->format('Y-m-d H:i'),
                'end_at' => optional($event->end_at)->format('Y-m-d H:i'),
                'location_name' => $event->location_name,
                'latitude' => $event->latitude,
                'longitude' => $event->longitude,
                'image_url' => $event->image_url,
                'program' => $event->program ? ['id' => $event->program->id, 'title' => $event->program->title] : null,
                'categories' => $event->categories ?? [],
            ],
        ]);
    }

    public function edit(Event $event)
    {
        $this->authorizeEvent($event);
        $programs = Program::where('user_id', auth()->id())->orderBy('title')->get(['id','title']);
        return Inertia::render('Organizations/Events/Edit', [
            'event' => [
                'id' => $event->id,
                'title' => $event->title,
                'description' => $event->description,
                'start_at' => optional($event->start_at)->format('Y-m-d\TH:i'),
                'end_at' => optional($event->end_at)->format('Y-m-d\TH:i'),
                'location_name' => $event->location_name,
                'latitude' => $event->latitude,
                'longitude' => $event->longitude,
                'program_id' => $event->program_id,
                'categories' => $event->categories ?? [],
            ],
            'programs' => $programs,
        ]);
    }

    public function update(Request $request, Event $event)
    {
        $this->authorizeEvent($event);
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_at' => 'nullable|date',
            'end_at' => 'nullable|date|after_or_equal:start_at',
            'location_name' => 'nullable|string|max:255',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'image' => 'nullable|image|max:2048',
            'program_id' => 'nullable|exists:programs,id',
            'categories' => 'nullable|array',
            'categories.*' => 'string|max:50',
        ]);
        if (!empty($data['program_id'])) {
            $owned = Program::where('id', $data['program_id'])->where('user_id', $request->user()->id)->exists();
            if (!$owned) unset($data['program_id']);
        }
        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('events', 'public');
        }
        $event->update($data);
        return redirect()->route('organization.events')->with('status', 'Acara diperbarui.');
    }

    public function destroy(Event $event)
    {
        $this->authorizeEvent($event);
        $event->delete();
        return redirect()->route('organization.events')->with('status', 'Acara dihapus.');
    }

    public function destroyImage(Event $event)
    {
        $this->authorizeEvent($event);
        if ($event->image_path) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($event->image_path);
            $event->image_path = null;
            $event->save();
        }
        return back()->with('status', 'Gambar dihapus.');
    }

    private function authorizeEvent(Event $event)
    {
        $user = auth()->user();
        abort_unless($user && $event->user_id === $user->id, 403);
    }
}
