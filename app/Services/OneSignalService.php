<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class OneSignalService
{
    public static function notify(array $playerIds, string $title, string $message, array $data = []): bool
    {
        $appId = config('services.onesignal.app_id');
        $key = config('services.onesignal.rest_api_key');
        if (!$appId || !$key || empty($playerIds)) return false;
        $res = Http::withHeaders([
            'Authorization' => 'Basic '.$key,
            'Content-Type' => 'application/json',
        ])->post(config('services.onesignal.api_url').'/notifications', [
            'app_id' => $appId,
            'include_external_user_ids' => $playerIds,
            'headings' => ['en' => $title],
            'contents' => ['en' => $message],
            'data' => $data,
        ]);
        return $res->ok();
    }
}
