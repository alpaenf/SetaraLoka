<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventParticipantsController extends Controller
{
    public function index(Event $event)
    {
        $this->authorizeEvent($event);

        $participants = $event->interestedUsers()
            ->select('users.id','users.name','users.email')
            ->withPivot('created_at','verified_at')
            ->orderByDesc('event_interests.created_at')
            ->get()
            ->map(function ($u) {
                return [
                    'id' => $u->id,
                    'name' => $u->name,
                    'email' => $u->email,
                    'interested_at' => optional($u->pivot->created_at)->toDateTimeString(),
                    'verified_at' => optional($u->pivot->verified_at)->toDateTimeString(),
                ];
            });

        $checkinUrl = \Illuminate\Support\Facades\URL::temporarySignedRoute('events.checkin', now()->addHours(12), ['event' => $event->id]);

        return Inertia::render('Events/Participants', [
            'event' => [ 'id' => $event->id, 'title' => $event->title ],
            'participants' => $participants,
            'checkinUrl' => $checkinUrl,
        ]);
    }

    public function verify(Request $request, Event $event, int $userId)
    {
        $this->authorizeEvent($event);
        $event->interestedUsers()->updateExistingPivot($userId, ['verified_at' => Carbon::now()]);
        return back();
    }

    public function unverify(Request $request, Event $event, int $userId)
    {
        $this->authorizeEvent($event);
        $event->interestedUsers()->updateExistingPivot($userId, ['verified_at' => null]);
        return back();
    }

    protected function authorizeEvent(Event $event): void
    {
        $user = auth()->user();
        abort_unless($user, 403);
        // Pengguna yang membuat event boleh mengelola; admin juga boleh
        $isOwner = $event->user_id && $event->user_id === $user->id;
        $isAdmin = $user->hasRole('admin');
        abort_unless($isOwner || $isAdmin, 403);
    }
}
