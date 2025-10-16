import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    const roles = [
        {
            name: 'Relawan',
            description: 'Temukan kesempatan volunteer, ikuti program sosial, dan berkontribusi untuk masyarakat.',
            features: ['Cari program volunteer', 'Tracking partisipasi', 'Sertifikat digital'],
            color: 'from-blue-500 to-cyan-500',
        },
        {
            name: 'Organisasi',
            description: 'Kelola program volunteer, rekrut relawan, dan tingkatkan dampak sosial organisasi Anda.',
            features: ['Buat program volunteer', 'Kelola peserta', 'Dashboard analytics'],
            color: 'from-green-500 to-emerald-500',
        },
        {
            name: 'Perusahaan',
            description: 'Posting lowongan CSR, temukan talent volunteer berpengalaman, dan bangun employer branding.',
            features: ['Post lowongan kerja', 'Lihat resume pelamar', 'Verifikasi perusahaan'],
            color: 'from-amber-500 to-orange-500',
        },
        {
            name: 'Disabilitas',
            description: 'Akses program inklusif, temukan peluang volunteer yang ramah disabilitas, dan kembangkan potensi diri.',
            features: ['Program aksesibel', 'Komunitas inklusif', 'Pelatihan & sertifikasi'],
            color: 'from-purple-500 to-pink-500',
        },
    ];

    return (
        <>
            <Head title="SetaraLoka - Platform Volunteer & CSR Indonesia" />
            <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-amber-50">
                {/* Header */}
                <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src="/images/logo.png" alt="SetaraLoka" className="h-20 w-auto" />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">SetaraLoka</h1>
                                <p className="text-sm text-gray-500">Platform Volunteer & CSR</p>
                            </div>
                        </div>
                        <nav className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition font-medium"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="px-4 py-2 text-gray-700 hover:text-cyan-600 transition font-medium"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition font-medium"
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Banner Section */}
                <section className="relative h-[500px] overflow-hidden">
                    <div className="absolute inset-0">
                        <img 
                            src="/images/banner1.jpg" 
                            alt="SetaraLoka Banner" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="500"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" text-anchor="middle" fill="%236b7280" font-size="24" font-family="Arial">Banner Image</text></svg>';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/80 to-amber-900/60"></div>
                    </div>
                    <div className="relative h-full flex items-center justify-center text-center px-4">
                        <div className="max-w-4xl">
                            <div className="inline-block mb-4 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                                <span className="text-white font-semibold text-lg">Platform Komunitas Volunteer & CSR</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
                                Bersama Membangun<br />Indonesia Lebih Baik
                            </h1>
                            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
                                Bergabunglah dengan komunitas relawan, organisasi sosial, dan perusahaan<br />yang peduli dampak sosial di Indonesia
                            </p>
                            {!auth.user && (
                                <div className="flex items-center justify-center gap-4">
                                    <Link
                                        href={route('register')}
                                        className="px-8 py-4 bg-white text-cyan-600 rounded-lg hover:bg-gray-100 transition font-bold text-lg shadow-xl"
                                    >
                                        Mulai Sekarang
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition font-bold text-lg"
                                    >
                                        Masuk
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                        Komunitas Volunteer & CSR Terbesar di Indonesia
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                        SetaraLoka adalah platform komunitas yang mempertemukan ribuan relawan, ratusan organisasi sosial, 
                        dan puluhan perusahaan untuk bersama-sama menciptakan dampak sosial yang nyata. 
                        Temukan peluang volunteer, kelola program CSR, dan jadilah bagian dari gerakan perubahan positif.
                    </p>
                </section>

                {/* Roles Preview */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-900 mb-3">Pilih Peran Anda dalam Komunitas</h3>
                        <p className="text-gray-600">Bergabunglah dengan ribuan anggota komunitas SetaraLoka dan mulai berkontribusi untuk Indonesia</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {roles.map((role) => (
                            <div
                                key={role.name}
                                className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-600"
                            >
                                <h4 className="text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-white transition-colors">{role.name}</h4>
                                <p className="text-base font-medium text-gray-700 mb-5 leading-relaxed group-hover:text-white transition-colors">{role.description}</p>
                                <ul className="space-y-2">
                                    {role.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-base font-semibold text-gray-800 group-hover:text-white transition-colors">
                                            <svg className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Disability Categories Info Banner */}
                    <div className="mt-16 mb-16">
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg">
                            <div className="flex flex-col md:flex-row items-start gap-8">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-cyan-600 rounded-xl flex items-center justify-center">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-sm font-bold rounded-lg">
                                            Platform Inklusif
                                        </span>
                                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-lg">
                                            2 Kategori Tersedia
                                        </span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                                        Fitur Aksesibilitas untuk Penyandang Disabilitas
                                    </h3>
                                    <p className="text-base text-gray-600 mb-4 leading-relaxed">
                                        Saat ini tersedia <span className="font-bold text-cyan-600">2 kategori aksesibilitas</span> dengan 
                                        fitur khusus seperti <span className="font-semibold">AccessMate AI Assistant</span>, 
                                        <span className="font-semibold"> Text-to-Speech</span>, dan 
                                        <span className="font-semibold"> Navigasi Suara</span>. 
                                        Kami terus mengembangkan untuk kategori lainnya.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                            <span className="text-sm font-semibold text-gray-700">Mobilitas</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                                            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                            </svg>
                                            <span className="text-sm font-semibold text-gray-700">Komunikasi</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            <span className="text-sm font-medium text-gray-500">+3 Kategori Segera Hadir</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Platform Features Section */}
                    <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12">
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-3 text-center">Fitur Lengkap untuk Komunitas Kami</h3>
                        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                            Platform yang dirancang khusus untuk mendukung kolaborasi dan pertumbuhan komunitas volunteer & CSR
                        </p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Verifikasi Akun</h4>
                                    <p className="text-sm text-gray-600">Sistem verifikasi untuk memastikan kredibilitas organisasi dan perusahaan</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Sertifikat Digital</h4>
                                    <p className="text-sm text-gray-600">Dapatkan sertifikat otomatis setelah menyelesaikan program volunteer</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Profil Volunteer</h4>
                                    <p className="text-sm text-gray-600">Kelola riwayat partisipasi dan portofolio kegiatan volunteer Anda</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Dashboard Analytics</h4>
                                    <p className="text-sm text-gray-600">Monitor dampak sosial dan statistik program secara real-time</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Notifikasi Real-time</h4>
                                    <p className="text-sm text-gray-600">Dapatkan update langsung untuk program, aplikasi, dan pengumuman</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Komunitas Inklusif</h4>
                                    <p className="text-sm text-gray-600">Platform ramah disabilitas dengan fitur aksesibilitas lengkap</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonials Section */}
                    <div className="mt-16">
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-3 text-center">Suara Komunitas Kami</h3>
                        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                            Kisah inspiratif dari anggota komunitas SetaraLoka yang telah membuat perbedaan
                        </p>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                                        AS
                                    </div>
                                    <div className="ml-3">
                                        <h4 className="font-bold text-gray-900">Andi Setiawan</h4>
                                        <p className="text-sm text-gray-500">Relawan Aktif</p>
                                    </div>
                                </div>
                                <div className="flex mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    "Platform yang sangat membantu saya menemukan program volunteer yang sesuai minat. Sertifikat digitalnya juga berguna untuk CV!"
                                </p>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                                        RD
                                    </div>
                                    <div className="ml-3">
                                        <h4 className="font-bold text-gray-900">Rina Dewi</h4>
                                        <p className="text-sm text-gray-500">Koordinator Organisasi</p>
                                    </div>
                                </div>
                                <div className="flex mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    "Mengelola program volunteer jadi jauh lebih mudah dengan dashboard analytics. Bisa lihat impact secara real-time!"
                                </p>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                                        BP
                                    </div>
                                    <div className="ml-3">
                                        <h4 className="font-bold text-gray-900">Budi Prasetyo</h4>
                                        <p className="text-sm text-gray-500">HR Manager</p>
                                    </div>
                                </div>
                                <div className="flex mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    "Rekrutmen CSR jadi lebih efisien. Kandidat yang apply sudah terverifikasi dan punya track record volunteer yang jelas."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Section */}
                    <div className="mt-16 bg-white rounded-2xl p-12 text-black border border-gray-100">
                        <h3 className="text-3xl font-extrabold mb-3 text-center text-gray-900">Komunitas SetaraLoka dalam Angka</h3>
                        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                            Bersama-sama, kita telah membangun komunitas volunteer & CSR terbesar di Indonesia
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-5xl font-extrabold mb-2 text-gray-900">1,250+</div>
                                <div className="text-gray-700 text-lg font-medium">Anggota Komunitas Relawan</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-extrabold mb-2 text-gray-900">350+</div>
                                <div className="text-gray-700 text-lg font-medium">Organisasi dalam Komunitas</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-extrabold mb-2 text-gray-900">180+</div>
                                <div className="text-gray-700 text-lg font-medium">Program Komunitas Berjalan</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-extrabold mb-2 text-gray-900">95+</div>
                                <div className="text-gray-700 text-lg font-medium">Perusahaan Komunitas Partner</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                {/* Contact Us (Social Media + Map) */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="text-center md:text-left">
                            <h4 className="text-2xl font-bold text-black mb-2">Hubungi Kami</h4>
                            <p className="text-black mb-4">Ikuti dan hubungi SetaraLoka melalui saluran sosial media kami untuk update kegiatan dan peluang terbaru.</p>
                            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                                <a href="https://facebook.com/SetaraLoka" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border text-black hover:bg-gray-100 shadow-sm">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.1c0-2.2 1.3-3.4 3.3-3.4.95 0 1.95.17 1.95.17v2.1h-1.07c-1.05 0-1.37.65-1.37 1.32v1.58h2.34l-.37 2.9h-1.97v7A10 10 0 0022 12z"/></svg>
                                </a>
                                <a href="https://instagram.com/SetaraLoka" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border text-black hover:bg-gray-100 shadow-sm">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.2A4.8 4.8 0 1016.8 13 4.8 4.8 0 0012 8.2zm6.4-3.6a1.2 1.2 0 11-1.2 1.2 1.2 1.2 0 011.2-1.2zM12 10.6A1.4 1.4 0 1113.4 12 1.4 1.4 0 0112 10.6z"/></svg>
                                </a>
                                <a href="https://twitter.com/SetaraLoka" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border text-black hover:bg-gray-100 shadow-sm">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 5.92c-.63.28-1.3.48-2 .57a3.48 3.48 0 001.52-1.92 7 7 0 01-2.22.85 3.46 3.46 0 00-5.9 3.15 9.82 9.82 0 01-7.14-3.62 3.46 3.46 0 001.07 4.61 3.42 3.42 0 01-1.57-.43v.04a3.46 3.46 0 002.78 3.39c-.5.14-1.03.16-1.56.06a3.46 3.46 0 003.23 2.4A6.94 6.94 0 012 19.54a9.78 9.78 0 005.29 1.55c6.35 0 9.83-5.26 9.83-9.83v-.45A7.05 7.05 0 0022 5.92z"/></svg>
                                </a>
                                <a href="https://linkedin.com/company/SetaraLoka" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border text-black hover:bg-gray-100 shadow-sm">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 11.02 0h-.02zM3 8.98h3.96V21H3zM8.5 8.98H12v1.63h.06c.48-.9 1.65-1.84 3.4-1.84 3.64 0 4.31 2.4 4.31 5.51V21h-3.96v-5.04c0-1.2-.02-2.73-1.67-2.73-1.67 0-1.92 1.3-1.92 2.65V21H8.5z"/></svg>
                                </a>
                                <a href="mailto:hello@setaraloka.id" aria-label="Email" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border text-black hover:bg-gray-100 shadow-sm">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2.99 6.75v10.5A2.75 2.75 0 005.74 20h12.52a2.75 2.75 0 002.74-2.75V6.75A2.75 2.75 0 0018.26 4H5.74A2.75 2.75 0 002.99 6.75zm2.75-.25h12.52l-6.26 4.09L5.74 6.5z"/></svg>
                                </a>
                            </div>

                            <p className="text-sm text-gray-600">Alamat: Jl. Contoh No.123, Jakarta, Indonesia</p>
                            <p className="text-sm text-gray-600">Telepon: (021) 1234-5678</p>
                            <p className="text-sm text-gray-600 mb-2">Email: <a href="mailto:hello@setaraloka.id" className="text-cyan-600">hello@setaraloka.id</a></p>
                            <p className="text-sm"><a href="https://maps.app.goo.gl/v9ojTqoxcQ2TLPbEA" target="_blank" rel="noopener noreferrer" className="text-cyan-600 font-medium">Buka di Google Maps</a></p>
                        </div>

                        <div className="w-full h-48 md:h-64 rounded-md overflow-hidden">
                            <iframe
                                title="Lokasi SetaraLoka"
                                src="https://www.google.com/maps?q=-7.409263572921212,109.33470063575872&z=15&output=embed"
                                className="w-full h-full border-0"
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </section>

                <footer className="border-t bg-gray-50 mt-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600 text-sm">
                        <p>&copy; {new Date().getFullYear()} SetaraLoka. Platform Volunteer & CSR Indonesia.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}

