<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sertifikat Partisipasi</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; margin: 0; padding: 0; }
        .wrap { padding: 40px; text-align: center; }
        .card { border: 6px double #10b981; padding: 40px; }
        h1 { margin: 0 0 8px; font-size: 32px; color: #111827; }
        h2 { margin: 8px 0 24px; font-size: 20px; font-weight: normal; color: #374151; }
        .name { font-size: 28px; font-weight: bold; color: #111827; margin: 24px 0; }
        .event { font-size: 18px; color: #111827; margin: 12px 0; }
        .meta { font-size: 14px; color: #4b5563; margin-top: 24px; }
        .footer { margin-top: 40px; display: flex; justify-content: space-between; align-items: center; }
        .sig { text-align: left; }
        .brand { color: #10b981; font-weight: bold; }
    </style>
    </head>
<body>
    <div class="wrap">
        <div class="card">
            <h1>Sertifikat Partisipasi</h1>
            <h2>Menyatakan bahwa</h2>
            <div class="name">{{ $user->name }}</div>
            <div class="event">Telah berpartisipasi dalam kegiatan <strong>{{ $event->title }}</strong></div>
            <div class="meta">Diterbitkan pada {{ $issued_at }} oleh {{ $issuer }}</div>
            <div class="footer">
                <div class="sig">
                    <div>__________________________</div>
                    <div>Penanggung Jawab</div>
                </div>
                <div class="brand">SetaraLoka</div>
            </div>
        </div>
    </div>
</body>
</html>
