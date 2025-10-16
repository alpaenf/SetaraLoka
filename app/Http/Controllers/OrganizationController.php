<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    public function programs(Request $request)
    {
        $user = $request->user();

        $posts = Post::query()
            ->where('user_id', $user->id)
            ->latest()
            ->take(12)
            ->get(['id','title','body','created_at'])
            ->map(function ($p) {
                return [
                    'id' => $p->id,
                    'title' => $p->title,
                    'description' => (string) str($p->body)->stripTags()->limit(160),
                    'created_at' => $p->created_at?->toDateTimeString(),
                ];
            });

        return Inertia::render('Organizations/Programs', [
            'programs' => $posts,
        ]);
    }

    public function events(Request $request)
    {
        $user = $request->user();
        $events = Event::query()
            ->where('user_id', $user->id)
            ->withCount('interestedUsers')
            ->latest('start_at')
            ->take(12)
            ->get(['id','title','start_at','end_at'])
            ->map(function ($e) {
                return [
                    'id' => $e->id,
                    'title' => $e->title,
                    'date' => $e->start_at ? Carbon::parse($e->start_at)->toDateTimeString() : null,
                    'interested_count' => $e->interested_users_count ?? 0,
                ];
            });

        return Inertia::render('Organizations/Events', [
            'events' => $events,
        ]);
    }

    public function profile(Request $request)
    {
        $user = $request->user();
        $now = Carbon::now();

        $eventsCount = Event::where('user_id', $user->id)->count();
        $upcomingCount = Event::where('user_id', $user->id)
            ->where(function ($q) use ($now) {
                $q->whereNull('start_at')->orWhere('start_at', '>=', $now);
            })->count();
        $participantsTotal = Event::where('user_id', $user->id)
            ->withCount('interestedUsers')
            ->get()
            ->sum('interested_users_count');

        $profile = [
            'name' => $user->name,
            'city' => $user->city ?? null,
            'description' => $user->bio ?? null,
            'stats' => [
                'events_total' => $eventsCount,
                'upcoming_total' => $upcomingCount,
                'participants_total' => $participantsTotal,
            ],
        ];

        return Inertia::render('Organizations/Profile', [
            'profile' => $profile,
        ]);
    }
}
