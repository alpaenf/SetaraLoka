@php
    $title = $job->title ?? 'Lowongan Anda';
@endphp

<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ $title }}</title>
</head>
<body>
    <h2>{{ $status === 'approved' ? 'Lowongan Disetujui' : 'Lowongan Ditolak' }}</h2>

    <p>Judul: <strong>{{ $title }}</strong></p>

    @if($status === 'approved')
        <p>Lowongan Anda telah disetujui dan akan ditampilkan di platform.</p>
    @else
        <p>Lowongan Anda tidak disetujui oleh tim admin.</p>
        @if(!empty($reason))
            <p>Alasan: {{ $reason }}</p>
        @endif
    @endif

    <p>Terima kasih telah menggunakan SetaraLoka.</p>
</body>
</html>