<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureFilamentAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        if (!$user || !$user->hasRole(User::ROLE_ADMIN)) {
            abort(403);
        }
        return $next($request);
    }
}
