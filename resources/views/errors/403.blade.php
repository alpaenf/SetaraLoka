@extends('errors::minimal')

@section('title', 'Akses Ditolak')
@section('code', '403')
@section('message')
<div class="text-center space-y-6">
  <h1 class="text-3xl font-bold text-gray-800">Tidak memiliki izin</h1>
  <p class="text-gray-600">Anda tidak diperbolehkan mengakses halaman ini. Jika Anda merasa ini kesalahan, hubungi administrator.</p>
  <a href="/" class="inline-block px-5 py-3 bg-indigo-600 text-white rounded shadow hover:bg-indigo-500">Kembali ke Beranda</a>
</div>
@endsection
