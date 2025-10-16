<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;

class VolunteerCertificateController extends Controller
{
    public function download(Request $request, Event $event)
    {
        $user = $request->user();
        abort_unless($user, 403);

    // Must be interested and verified; event must have ended
    $interested = $user->interestedEvents()->where('event_id', $event->id)->exists();
    abort_unless($interested, 403, 'Anda belum mengikuti event ini.');
    $verified = $user->interestedEvents()->where('event_id', $event->id)->wherePivotNotNull('verified_at')->exists();
    abort_unless($verified, 403, 'Kehadiran Anda belum diverifikasi panitia.');

        $ended = $event->end_at && Carbon::parse($event->end_at)->isPast();
        abort_unless($ended, 403, 'Sertifikat tersedia setelah acara selesai.');

        $data = [
            'user' => $user,
            'event' => $event->load('user:id,name'),
            'issued_at' => Carbon::parse($event->end_at)->toFormattedDateString(),
            'issuer' => optional($event->user)->name ?: 'SetaraLoka',
        ];

        $pdf = Pdf::loadView('pdf.certificate', $data)->setPaper('a4', 'landscape');
        $filename = 'sertifikat-' . str($event->title)->slug('-') . '.pdf';
        return $pdf->download($filename);
    }
}
