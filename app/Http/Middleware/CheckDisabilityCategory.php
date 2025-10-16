<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckDisabilityCategory
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();
        
        // Cek apakah user memiliki role penyandang_disabilitas
        if ($user && $user->hasRole('penyandang_disabilitas')) {
            // Jika belum memilih kategori, redirect ke halaman pemilihan
            if (!$user->kategori_disabilitas) {
                return redirect()->route('disability.category');
            }
        }
        
        return $next($request);
    }
}
