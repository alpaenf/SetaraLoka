<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\OneSignalService;

class PushTestController extends Controller
{
    public function send(Request $request)
    {
        $user = $request->user();
        $ok = OneSignalService::notify([
            (string) $user->id,
        ], 'Test Push', 'Hello ' . ($user->name ?? 'there') . '! This is a test push.', [
            'type' => 'test',
        ]);
        return back()->with('status', $ok ? 'Push sent' : 'Push failed');
    }
}
