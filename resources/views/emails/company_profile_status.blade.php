<html>
<body>
    <p>Halo {{ $profile->company_name }},</p>

    @if($status === 'approved')
        <p>Profil perusahaan Anda telah diverifikasi oleh tim SetaraLoka. Terima kasih!</p>
    @else
        <p>Maaf, profil perusahaan Anda belum disetujui. Silakan cek catatan verifikasi atau hubungi admin.</p>
    @endif

    <p>Salam,<br/>Tim SetaraLoka</p>
</body>
</html>