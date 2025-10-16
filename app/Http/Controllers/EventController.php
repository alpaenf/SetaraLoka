<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class EventController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $interestedIds = $user ? $user->interestedEvents()->pluck('events.id')->all() : [];
        $events = Event::withCount('interestedUsers')->latest()->paginate(9);
        $now = now();
        // Fetch verified attendance ids
        $verifiedIds = $user ? $user->interestedEvents()->wherePivotNotNull('verified_at')->pluck('events.id')->all() : [];
        $events->getCollection()->transform(function ($ev) use ($interestedIds, $verifiedIds, $now) {
            $ev->is_interested = in_array($ev->id, $interestedIds, true);
            $ev->has_certificate = $ev->end_at && Carbon::parse($ev->end_at)->lessThanOrEqualTo($now) && in_array($ev->id, $verifiedIds, true);
            return $ev;
        });
        return Inertia::render('Events/Index', [
            'events' => $events,
        ]);
    }

    public function show(Event $event)
    {
        $event->loadCount('interestedUsers')->load('user');
        $user = auth()->user();
        $isInterested = $user?->interestedEvents()->where('event_id', $event->id)->exists();
    $verified = $user?->interestedEvents()->where('event_id', $event->id)->wherePivotNotNull('verified_at')->exists();
    $event->has_certificate = $event->end_at && Carbon::parse($event->end_at)->isPast() && $verified;
        $canManageParticipants = ($event->user_id && $user && $event->user_id === $user->id) || ($user && $user->hasRole('admin'));
        return Inertia::render('Events/Show', [
            'event' => $event,
            'isInterested' => $isInterested,
            'canManageParticipants' => $canManageParticipants,
        ]);
    }

    public function toggleInterest(Event $event)
    {
        $user = auth()->user();
        if (!$user) return back();
        if ($user->interestedEvents()->where('event_id', $event->id)->exists()) {
            $user->interestedEvents()->detach($event->id);
        } else {
            $user->interestedEvents()->attach($event->id);
        }
        return back();
    }
}
