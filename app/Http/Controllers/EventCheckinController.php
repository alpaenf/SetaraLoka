<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EventCheckinController extends Controller
{
    public function __invoke(Request $request, Event $event)
    {
        // Requires signed URL via route middleware
        $user = $request->user();
        if (!$user) {
            return redirect()->route('login');
        }

        // Mark verified_at now for this user's interest if exists; if not interested yet, attach then verify
        $exists = $user->interestedEvents()->where('event_id', $event->id)->exists();
        if (!$exists) {
            $user->interestedEvents()->attach($event->id, ['created_at' => now(), 'updated_at' => now()]);
        }
        $user->interestedEvents()->updateExistingPivot($event->id, ['verified_at' => Carbon::now()]);

        return redirect()->route('events.show', $event->id)->with('success', 'Check-in berhasil. Kehadiran Anda telah diverifikasi.');
    }
}
