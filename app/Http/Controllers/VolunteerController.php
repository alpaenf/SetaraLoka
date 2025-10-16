<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class VolunteerController extends Controller
{
    /**
     * List volunteer opportunities (use upcoming events as opportunities)
     */
    public function opportunities(Request $request)
    {
        $now = Carbon::now();
        $user = $request->user();
        $q = (string) $request->query('q', '');

        $interestedIds = $user
            ? $user->interestedEvents()->pluck('events.id')->all()
            : [];

        $events = Event::query()
            ->when(true, function ($qbuilder) use ($now) {
                // Upcoming or undated events
                $qbuilder->where(function ($qq) use ($now) {
                    $qq->whereNull('start_at')
                       ->orWhere('start_at', '>=', $now);
                });
            })
            ->when(strlen($q) > 0, function ($qb) use ($q) {
                $qb->where(function ($qq) use ($q) {
                    $qq->where('title', 'like', "%$q%")
                       ->orWhere('description', 'like', "%$q%");
                });
            })
            ->latest('start_at')
            ->select('id', 'title', 'description', 'start_at', 'end_at')
            ->paginate(12)
            ->through(function ($e) use ($interestedIds) {
                return [
                    'id' => $e->id,
                    'title' => $e->title,
                    'description' => (string) str($e->description)->limit(240),
                    'start_at' => $e->start_at ? Carbon::parse($e->start_at)->toDateTimeString() : null,
                    'end_at' => $e->end_at ? Carbon::parse($e->end_at)->toDateTimeString() : null,
                    'interested' => in_array($e->id, $interestedIds, true),
                ];
            });

        return Inertia::render('Volunteers/Opportunities', [
            'opportunities' => $events,
            'filters' => ['q' => $q],
        ]);
    }

    /**
     * Show volunteer profile summary for the authenticated user
     */
    public function profile(Request $request)
    {
        $user = $request->user();
        $now = Carbon::now();

        // All interested events (for count)
        $interested = $user->interestedEvents()
            ->select('events.id', 'events.title', 'events.start_at', 'events.end_at')
            ->get();

        // Verified finished events for hours and certificate count
        $verifiedFinished = $user->interestedEvents()
            ->wherePivotNotNull('verified_at')
            ->whereNotNull('events.end_at')
            ->where('events.end_at', '<=', $now)
            ->get(['events.id','events.start_at','events.end_at']);

        $hours = $verifiedFinished->reduce(function ($carry, $event) use ($now) {
            $start = $event->start_at ? Carbon::parse($event->start_at) : null;
            $end = $event->end_at ? Carbon::parse($event->end_at) : null;
            if ($start && $end && $end->lessThanOrEqualTo($now)) {
                $diff = $end->floatDiffInHours($start);
                $carry += max(0, (float) $diff);
            }
            return $carry;
        }, 0.0);

        $certificatesCount = $verifiedFinished->count();

        // Recent certificates (verified + finished)
        $recentCertified = $user->interestedEvents()
            ->with('user:id,name')
            ->wherePivotNotNull('verified_at')
            ->whereNotNull('events.end_at')
            ->where('events.end_at', '<=', $now)
            ->orderByDesc('events.end_at')
            ->take(6)
            ->get(['events.id','events.title','events.end_at','events.user_id'])
            ->map(function ($e) {
                return [
                    'id' => $e->id,
                    'title' => $e->title,
                    'issuer' => optional($e->user)->name ?: 'SetaraLoka',
                    'issued_at' => $e->end_at ? Carbon::parse($e->end_at)->toDateTimeString() : null,
                    'pdf_url' => route('volunteer.certificate.pdf', $e->id),
                ];
            });

        // Upcoming opportunities suggestions
        $interestedIds = $user->interestedEvents()->pluck('events.id')->all();
        $upcoming = \App\Models\Event::query()
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

        $profile = [
            'name' => $user->name,
            'city' => $user->city ?? null,
            'interests' => method_exists($user, 'interests') ? $user->interests : [],
            'hours' => round($hours, 1),
            'events' => $interested->count(),
            'certificates' => $certificatesCount,
        ];

        return Inertia::render('Volunteers/Profile', [
            'profile' => $profile,
            'recentCertificates' => $recentCertified,
            'upcoming' => $upcoming,
        ]);
    }

    /**
     * Certificates listing (verified + finished) with year filter and pagination
     */
    public function certificates(Request $request)
    {
        $user = $request->user();
        $now = Carbon::now();

        $year = (int) $request->query('year', 0);
        $query = $user->interestedEvents()
            ->with('user:id,name')
            ->wherePivotNotNull('verified_at')
            ->whereNotNull('events.end_at')
            ->where('events.end_at', '<=', $now);

        if ($year > 0) {
            $query->whereYear('events.end_at', $year);
        }

        $events = $query->orderByDesc('events.end_at')
            ->paginate(12, ['events.id','events.title','events.end_at','events.user_id'])
            ->withQueryString()
            ->through(function ($e) {
                return [
                    'id' => $e->id,
                    'title' => $e->title,
                    'issuer' => optional($e->user)->name ?: 'SetaraLoka',
                    'issued_at' => $e->end_at ? Carbon::parse($e->end_at)->toDateTimeString() : null,
                ];
            });

        $startYear = (int) $now->year;
        $endYear = max($startYear - 5, 2000);
        $years = range($startYear, $endYear, -1);

        return Inertia::render('Volunteers/Certificates', [
            'certificates' => $events,
            'filters' => [ 'year' => $year ?: '' ],
            'years' => $years,
        ]);
    }
}
