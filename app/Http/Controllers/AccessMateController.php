<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AccessMateController extends Controller
{
    public function summarize(Request $request)
    {
        $request->validate(['text' => 'required|string|min:10']);
        $apiKey = config('services.huggingface.api_key');
        $model = config('services.huggingface.summarization_model');
        $url = rtrim(config('services.huggingface.base_url'),'/')."/{$model}";
        $res = Http::withHeaders([
            'Authorization' => "Bearer {$apiKey}",
            'Content-Type' => 'application/json',
        ])->timeout(20)->post($url, [
            'inputs' => $request->string('text'),
        ]);

        if (!$res->ok()) {
            Log::warning('HF summarize error', ['status' => $res->status(), 'body' => $res->body()]);
            return response()->json(['error' => 'AI service unavailable'], 503);
        }
        return response()->json($res->json());
    }

    public function tts(Request $request)
    {
        $request->validate(['text' => 'required|string|min:1']);
        $apiKey = config('services.huggingface.api_key');
        $model = config('services.huggingface.tts_model');
        $url = rtrim(config('services.huggingface.base_url'),'/')."/{$model}";
        $res = Http::withHeaders([
            'Authorization' => "Bearer {$apiKey}",
            'Content-Type' => 'application/json',
        ])->timeout(20)->post($url, [
            'inputs' => $request->string('text'),
        ]);

        if (!$res->ok()) {
            Log::warning('HF tts error', ['status' => $res->status(), 'body' => $res->body()]);
            return response()->json(['error' => 'AI service unavailable'], 503);
        }

        return response($res->body(), 200)->header('Content-Type', $res->header('Content-Type', 'audio/mpeg'));
    }
}
