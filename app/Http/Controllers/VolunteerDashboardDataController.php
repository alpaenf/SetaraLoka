<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;

class VolunteerDashboardDataController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = $request->user();
        $now = Carbon::now();

        // Interested events
        $interested = $user->interestedEvents()
            ->select('events.id', 'events.title', 'events.start_at', 'events.end_at')
            ->get();

        // Hours from finished events
        $hours = $interested->reduce(function ($carry, $event) use ($now) {
            $start = $event->start_at ? Carbon::parse($event->start_at) : null;
            $end = $event->end_at ? Carbon::parse($event->end_at) : null;
            if ($start && $end && $end->lessThanOrEqualTo($now)) {
                $diff = $end->floatDiffInHours($start);
                $carry += max(0, (float) $diff);
            }
            return $carry;
        }, 0.0);

        // Certificates require verified attendance
        $verifiedInterested = $user->interestedEvents()->wherePivotNotNull('verified_at')->get(['events.id','events.end_at']);
        $certificates = $verifiedInterested->filter(function ($e) use ($now) {
            return $e->end_at && Carbon::parse($e->end_at)->lessThanOrEqualTo($now);
        })->count();

        // Suggested opportunities: upcoming or undated
        $interestedIds = $interested->pluck('id')->all();
        $suggested = Event::query()
            ->where(function ($qq) use ($now) {
                $qq->whereNull('start_at')
                   ->orWhere('start_at', '>=', $now);
            })
            ->latest('start_at')
            ->select('id','title','description','start_at')
            ->take(6)
            ->get()
            ->map(function ($e) use ($interestedIds) {
                return [
                    'id' => $e->id,
                    'title' => $e->title,
                    'description' => (string) str($e->description)->limit(140),
                    'start_at' => $e->start_at ? Carbon::parse($e->start_at)->toDateTimeString() : null,
                    'interested' => in_array($e->id, $interestedIds, true),
                ];
            });

        return response()->json([
            'totals' => [
                'hours' => round($hours, 1),
                'interested_events' => $interested->count(),
                'certificates' => $certificates,
            ],
            'suggested_opportunities' => $suggested,
        ]);
    }
}
