<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DisabilityCategoryController extends Controller
{
    /**
     * Tampilkan halaman pemilihan kategori disabilitas
     */
    public function show()
    {
        $user = auth()->user();
        
        // Jika user sudah memilih kategori, redirect ke dashboard
        if ($user->kategori_disabilitas) {
            return redirect()->route('dashboard.disabilitas');
        }
        
        return Inertia::render('Disability/Category');
    }
    
    /**
     * Simpan pilihan kategori disabilitas
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kategori' => 'required|in:tidak_bisa_berjalan,tidak_bisa_berbicara',
        ]);
        
        $user = auth()->user();
        $user->kategori_disabilitas = $validated['kategori'];
        $user->save();
        
        return redirect()->route('dashboard.disabilitas')
            ->with('success', 'Kategori disabilitas berhasil disimpan. Selamat datang di SetaraLoka!');
    }
}
