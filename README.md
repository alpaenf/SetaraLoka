# SetaraLoka

Platform forum dan kolaborasi inklusif berbasis Laravel 12 + Inertia React + Tailwind, dengan fitur multi-role, forum, notifikasi (DB + OneSignal Push), AI Assistant (Hugging Face), Voice-to-Text, Resume PDF, peta interaktif, PWA, dan admin panel (Filament).

## Prasyarat
- PHP 8.3+, Composer
- Node.js 20+
- MySQL / MariaDB

## Setup Cepat
1. Salin env:
```powershell
cp .env.example .env
```
2. Set database di `.env`, lalu:
```powershell
php artisan key:generate
php artisan migrate
php artisan db:seed
```
3. Build frontend:
```powershell
npm install
npm run build
```
4. Jalankan server:
```powershell
php artisan serve
```

## Konfigurasi Layanan
- Sanctum: sudah terpasang via Breeze (Inertia React).
- Roles (Spatie Permission): Seeder membuat role: `penyandang_disabilitas`, `relawan`, `perusahaan`, `lembaga_sosial`, `admin`. Admin default: `admin@setaraloka.test / password` (ubah di produksi!).
- Hugging Face (AI AccessMate): set variabel berikut di `.env`:
	```
	HUGGINGFACE_API_KEY=your_token
	HF_SUMMARIZATION_MODEL=facebook/bart-large-cnn
	HF_TTS_MODEL=facebook/mms-tts-eng
	```
	Endpoint lokal:
	- POST `/ai/summarize` body: `{ text: "..." }`
	- POST `/ai/tts` body: `{ text: "..." }` (mengembalikan audio base64)
	Keduanya dibatasi rate limit `throttle:20,1` (20 request / menit / user).
- OneSignal (Push Web):
	```
	ONESIGNAL_APP_ID=xxxx
	ONESIGNAL_REST_API_KEY=xxxx
	ONESIGNAL_API_URL=https://api.onesignal.com
	```
	Aplikasi otomatis:
	- Inisialisasi & login external user id (user.id) di `app.blade.php`.
	- Halaman `/notifications` menyediakan tombol Subscribe / Unsubscribe + Test Push.
	- Server trigger push pada komentar baru (`CommentController`) ke pemilik posting.
	- Service Worker (`public/service-worker.js`) menangani `notificationclick` dan membuka `/posts/{post_id}` bila ada `post_id` di payload.
	- Endpoint uji: `POST /push/test` (harus login) untuk mengirim push ke diri sendiri.
- Filament Admin Panel: tersedia di `/admin` dan dilindungi middleware role admin.

## Fitur Utama
- Autentikasi multi-role + dashboard per peran.
- Forum (Post, Comment, Reply) + Voice-to-Text (Web Speech API) pada form post & komentar.
- Notifikasi internal (database) + push (OneSignal) saat komentar baru + test push manual.
- AccessMate: ringkas teks (summarization) + TTS (Hugging Face) + navigasi suara.
- Resume Builder PDF: route `/resumes/{resume}/pdf` (DOMPDF Blade template).
- Peta interaktif: `/map` (React-Leaflet) menampilkan Event & Job.
- PWA: manifest, cache dasar, offline fallback sederhana.
- Admin Panel: Filament v4 resources (Users, Posts, Events, Jobs, Resumes) hanya untuk role admin.

## Catatan
- Rate limit AI dapat disesuaikan di route (`throttle:20,1`).
- Pastikan domain / origin sudah ditambahkan di OneSignal Dashboard.
- Tambahkan HTTPS di produksi agar push & service worker optimal.
- Perlu penanganan error lanjutan (retries Hugging Face) untuk produksi.
- Gunakan queue untuk push massal / heavy tasks.

## Aksesibilitas
- Live region ARIA (`#a11y-live`) untuk pengumuman status dinamis (`window.a11yAnnounce`).
- Tombol forum & AccessMate disiapkan untuk keyboard; periksa kembali kontras warna.
- Disarankan audit tambahan dengan Lighthouse / axe DevTools.

## Skrip Pengembangan (opsional)
```powershell
npm run dev
```<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[WebReinvent](https://webreinvent.com/)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Jump24](https://jump24.co.uk)**
- **[Redberry](https://redberry.international/laravel/)**
- **[Active Logic](https://activelogic.com)**
- **[byte5](https://byte5.de)**
- **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
