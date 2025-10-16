import RoleShell from '../../Layouts/RoleShell';
import { useEffect, useState, useCallback } from 'react';
import { Link } from '@inertiajs/react';
import SkeletonCard from '../../Components/SkeletonCard';
import Sparkline from '../../Components/Sparkline';
import A11yControls from '../../Components/A11yControls';
import MapWidget from '../../Components/MapWidget';

export default function DisabledUser({ kategori }) {
  // Suggestions berdasarkan kategori
  const suggestions = kategori === 'tidak_bisa_berjalan' 
    ? [
        'Cari lowongan kerja remote-friendly',
        'Ikuti pelatihan online yang fleksibel',
        'Cek aksesibilitas lokasi acara',
      ]
    : [
        'Gunakan Text Selection TTS - pilih teks lalu klik "Bacakan"',
        'Gunakan AccessMate untuk ringkasan konten',
        'Filter lowongan dengan "Komunikasi Teks"',
      ];
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [stats, setStats] = useState(null);
  const [feed, setFeed] = useState({ posts: [], events: [], jobs: [] });
  const [mapPoints, setMapPoints] = useState([]);
  const [prefs, setPrefs] = useState({ fontStep: 0, highContrast: false, darkMode: false });
  const handlePrefs = useCallback(p => setPrefs(p), []);
  useEffect(() => {
    let active = true;
    Promise.all([
      fetch('/dashboard/stats').then(r => r.json()).then(j => ({ type: 'stats', data: j })),
      fetch('/dashboard/disabled/data').then(r => r.json()).then(j => ({ type: 'feed', data: j })),
      fetch('/api/map/points').then(r => r.json()).then(j => ({ type: 'map', data: j.points || [] })),
    ])
      .then(results => {
        if (!active) return;
        for (const r of results) {
          if (r.type === 'stats') { setStats(r.data); setLoadingStats(false); }
          if (r.type === 'feed') { setFeed(r.data); setLoadingFeed(false); }
          if (r.type === 'map') { setMapPoints(r.data); }
        }
      })
      .catch(() => { if (active) { setLoadingStats(false); setLoadingFeed(false); } });
    return () => { active = false; };
  }, []);
  const fontScaleClass = ['text-base', 'text-lg', 'text-xl', 'text-2xl'][prefs.fontStep] || 'text-base';
  const highContrastClass = prefs.highContrast ? 'hc-mode' : '';
  const gradient = prefs.highContrast ? 'bg-white' : 'bg-gradient-to-br from-gray-50 to-blue-50';
  
  return (
  <RoleShell role="disabled" highContrast={prefs.highContrast} darkMode={prefs.darkMode}>
      <div className={`${fontScaleClass} ${highContrastClass} leading-relaxed transition-colors min-h-screen ${gradient}`}>
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start gap-6">
          <div className="flex-1 min-w-[260px]">
            <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-gray-900">
              Dashboard {kategori === 'tidak_bisa_berjalan' ? 'Mobilitas' : 'Komunikasi'}
            </h1>
            <p className="text-gray-600 max-w-2xl">
              {kategori === 'tidak_bisa_berjalan' 
                ? 'Akses lowongan remote, pelatihan online, dan acara yang ramah aksesibilitas.' 
                : 'Nikmati fitur text-to-speech, navigasi suara, dan ringkasan otomatis untuk kemudahan komunikasi.'}
            </p>
          </div>
          <div className="shrink-0"><A11yControls onChange={handlePrefs} /></div>
        </div>

        {/* Conditional Layout based on kategori */}
        {kategori === 'tidak_bisa_berbicara' ? (
          // Layout for tidak_bisa_berbicara - NO MAP, focus on communication features
          <div className="space-y-6">
            {/* Quick Actions untuk Komunikasi */}
            <section aria-labelledby="quick-actions" className="grid gap-4 md:grid-cols-3">
              <Link
                href={route('posts.index')}
                className="group p-6 rounded-xl border-2 border-gray-200 bg-white hover:bg-cyan-600 hover:border-cyan-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 group-hover:bg-white flex items-center justify-center transition-all">
                    <svg className="w-6 h-6 text-white group-hover:text-cyan-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-white transition-colors">Forum Diskusi</h3>
                </div>
                <p className="text-sm text-gray-600 group-hover:text-white leading-relaxed mb-3 transition-colors">
                  Gunakan Text Selection TTS untuk membaca postingan. Pilih teks dan klik "Bacakan".
                </p>
                <div className="text-teal-600 group-hover:text-white font-semibold text-sm group-hover:underline transition-colors">
                  Buka Forum →
                </div>
              </Link>

              <Link
                href={route('jobs.index')}
                className="group p-6 rounded-xl border-2 border-gray-200 bg-white hover:bg-cyan-600 hover:border-cyan-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 group-hover:bg-white flex items-center justify-center transition-all">
                    <svg className="w-6 h-6 text-white group-hover:text-cyan-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-white transition-colors">Lowongan Kerja</h3>
                </div>
                <p className="text-sm text-gray-600 group-hover:text-white leading-relaxed mb-3 transition-colors">
                  Filter lowongan dengan komunikasi teks. Perusahaan yang mendukung chat/email.
                </p>
                <div className="text-blue-600 group-hover:text-white font-semibold text-sm group-hover:underline transition-colors">
                  Cari Lowongan →
                </div>
              </Link>

              <Link
                href={route('events.index')}
                className="group p-6 rounded-xl border-2 border-gray-200 bg-white hover:bg-cyan-600 hover:border-cyan-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 group-hover:bg-white flex items-center justify-center transition-all">
                    <svg className="w-6 h-6 text-white group-hover:text-cyan-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-white transition-colors">Acara & Events</h3>
                </div>
                <p className="text-sm text-gray-600 group-hover:text-white leading-relaxed mb-3 transition-colors">
                  Filter acara dengan live caption. Mudah mengikuti seminar dan workshop.
                </p>
                <div className="text-purple-600 group-hover:text-white font-semibold text-sm group-hover:underline transition-colors">
                  Lihat Acara →
                </div>
              </Link>
            </section>

            {/* Stats & Suggestions Row */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <section aria-labelledby="stats">
                  <h2 id="stats" className="text-sm font-semibold tracking-wide text-gray-500 uppercase mb-4">Statistik</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {loadingStats && Array.from({ length: 2 }).map((_, i) => <SkeletonCard key={i} />)}
                    {!loadingStats && stats && (
                      <>
                        <div className="rounded-xl border-2 border-gray-200 bg-white shadow-sm p-5 hc-surface hover:shadow-md transition-shadow" tabIndex={0} aria-label={`Total posting ${stats.totals.posts}`}>
                          <div className="text-xs font-medium text-gray-500 uppercase">Posting Forum</div>
                          <div className="mt-2 text-3xl font-bold text-gray-900">{stats.totals.posts}</div>
                          <div className="mt-3"><Sparkline data={stats.series.posts} stroke={prefs.highContrast ? '#000' : '#14b8a6'} /></div>
                        </div>
                        <div className="rounded-xl border-2 border-gray-200 bg-white shadow-sm p-5 hc-surface hover:shadow-md transition-shadow" tabIndex={0}>
                          <div className="text-xs font-medium text-gray-500 uppercase">Aktivitas Hari Ini</div>
                          <div className="mt-2 text-3xl font-bold text-gray-900">12</div>
                          <div className="mt-3 text-sm text-gray-600">Baca, komentar, dan lamar</div>
                        </div>
                      </>
                    )}
                  </div>
                </section>
              </div>

              <section aria-labelledby="suggestions">
                <h2 id="suggestions" className="text-sm font-semibold tracking-wide text-gray-500 uppercase mb-4">Saran</h2>
                <ul className="space-y-3">
                  {suggestions.map((s, i) => (
                    <li key={s} className={`group px-4 py-3 rounded-xl border-2 bg-white hover:bg-cyan-600 hover:border-cyan-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 shadow-sm font-medium hc-surface text-sm ${
                      i === 0 ? 'border-teal-200 text-teal-700' : i === 1 ? 'border-blue-200 text-blue-700' : 'border-purple-200 text-purple-700'
                    } group-hover:text-white`}>
                      <span className="group-hover:text-white transition-colors">{s}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Activity feed */}
            <section aria-labelledby="feed">
              <div className="flex items-center justify-between mb-4">
                <h2 id="feed" className="text-lg font-semibold tracking-tight text-gray-900">Aktivitas Terbaru</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-3">
                  <h3 className="font-medium text-sm text-gray-500 uppercase">Posting</h3>
                  {loadingFeed ? <SkeletonCard lines={3} /> : (
                    <ul className="space-y-2">
                      {feed.posts.map(p => <li key={p.id} className="p-3 rounded-xl border bg-white hover:border-teal-300 shadow-sm font-medium hc-surface text-sm transition-colors">{p.title}</li>)}
                      {feed.posts.length === 0 && <li className="text-gray-500 text-sm">Belum ada posting.</li>}
                    </ul>
                  )}
                </div>
                <div className="space-y-3">
                  <h3 className="font-medium text-sm text-gray-500 uppercase">Event</h3>
                  {loadingFeed ? <SkeletonCard lines={3} /> : (
                    <ul className="space-y-2">
                      {feed.events.map(e => <li key={e.id} className="p-3 rounded-xl border bg-white hover:border-purple-300 shadow-sm hc-surface text-sm transition-colors"><span className="block font-medium">{e.title}</span><span className="text-xs text-gray-600">{e.date}</span></li>)}
                      {feed.events.length === 0 && <li className="text-gray-500 text-sm">Belum ada event.</li>}
                    </ul>
                  )}
                </div>
                <div className="space-y-3">
                  <h3 className="font-medium text-sm text-gray-500 uppercase">Lowongan</h3>
                  {loadingFeed ? <SkeletonCard lines={3} /> : (
                    <ul className="space-y-2">
                      {feed.jobs.map(j => <li key={j.id} className="p-3 rounded-xl border bg-white hover:border-blue-300 shadow-sm font-medium hc-surface text-sm transition-colors">{j.title}</li>)}
                      {feed.jobs.length === 0 && <li className="text-gray-500 text-sm">Belum ada lowongan.</li>}
                    </ul>
                  )}
                </div>
              </div>
            </section>

            {/* Tools */}
            <section aria-labelledby="tools">
              <h2 id="tools" className="text-lg font-semibold tracking-tight mb-4 text-gray-900">Alat & Fitur</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group p-6 rounded-xl border-2 border-gray-200 bg-white hover:bg-cyan-600 hover:border-cyan-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="font-semibold flex items-center gap-2 text-gray-900 group-hover:text-white text-lg mb-3 transition-colors">
                    Text Selection TTS
                  </div>
                  <p className="text-sm text-gray-600 group-hover:text-white leading-relaxed transition-colors">
                    Pilih teks di mana saja, klik tombol "Bacakan" yang muncul. Suara Indonesia yang natural.
                  </p>
                </div>
                <div className="group p-6 rounded-xl border-2 border-gray-200 bg-white hover:bg-cyan-600 hover:border-cyan-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="font-semibold flex items-center gap-2 text-gray-900 group-hover:text-white text-lg mb-3 transition-colors">
                    AccessMate AI
                  </div>
                  <p className="text-sm text-gray-600 group-hover:text-white leading-relaxed transition-colors">
                    Ringkas konten panjang dengan AI. Klik tombol floating di kanan bawah untuk membuka.
                  </p>
                </div>
                <div className="group p-6 rounded-xl border-2 border-gray-200 bg-white hover:bg-cyan-600 hover:border-cyan-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="font-semibold text-gray-900 group-hover:text-white text-lg mb-3 transition-colors">Resume PDF</div>
                  <p className="text-sm text-gray-600 group-hover:text-white leading-relaxed transition-colors">
                    Bangun CV inklusif dan unduh PDF siap dibagikan ke perusahaan.
                  </p>
                </div>
              </div>
            </section>
          </div>
        ) : (
          // Redesigned Layout for tidak_bisa_berjalan (Mobilitas) - WITH MAP & Cyan/Amber theme
          <div className="space-y-6">
            {/* Quick Actions untuk Mobilitas dengan Cyan & Amber */}
            <section aria-labelledby="quick-actions" className="grid gap-4 md:grid-cols-3">
              <Link
                href={route('jobs.index')}
                className="group p-6 rounded-xl border-2 border-gray-200 bg-white hover:bg-cyan-600 hover:border-cyan-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-100 group-hover:bg-white flex items-center justify-center transition-all">
                    <svg className="w-6 h-6 text-cyan-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-white transition-colors">Remote Jobs</h3>
                </div>
                <p className="text-sm text-gray-600 group-hover:text-white leading-relaxed mb-3 transition-colors">
                  Lowongan work-from-home dan hybrid untuk fleksibilitas maksimal.
                </p>
                <div className="text-cyan-600 group-hover:text-white font-semibold text-sm group-hover:underline transition-colors">
                  Cari Lowongan →
                </div>
              </Link>

              <Link
                href={route('events.index')}
                className="group p-6 rounded-xl border-2 border-gray-200 bg-white hover:bg-amber-600 hover:border-amber-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 group-hover:bg-white flex items-center justify-center transition-all">
                    <svg className="w-6 h-6 text-amber-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-white transition-colors">Acara Aksesibel</h3>
                </div>
                <p className="text-sm text-gray-600 group-hover:text-white leading-relaxed mb-3 transition-colors">
                  Event dengan akses kursi roda, ramp, dan fasilitas ramah disabilitas.
                </p>
                <div className="text-amber-600 group-hover:text-white font-semibold text-sm group-hover:underline transition-colors">
                  Lihat Acara →
                </div>
              </Link>

              <Link
                href={route('posts.index')}
                className="group p-6 rounded-xl border-2 border-gray-200 bg-white hover:bg-cyan-600 hover:border-cyan-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-100 group-hover:bg-white flex items-center justify-center transition-all">
                    <svg className="w-6 h-6 text-cyan-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-white transition-colors">Forum Diskusi</h3>
                </div>
                <p className="text-sm text-gray-600 group-hover:text-white leading-relaxed mb-3 transition-colors">
                  Berbagi pengalaman dan tips dengan komunitas penyandang disabilitas.
                </p>
                <div className="text-cyan-600 group-hover:text-white font-semibold text-sm group-hover:underline transition-colors">
                  Buka Forum →
                </div>
              </Link>
            </section>

            {/* Map & Stats Section */}
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="rounded-xl border-2 border-amber-200 bg-white shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3">
                    <h2 className="text-white font-bold text-lg flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Peta Lokasi Aksesibel
                    </h2>
                    <p className="text-amber-100 text-sm mt-1">Temukan tempat dengan akses kursi roda dan ramp</p>
                  </div>
                  <MapWidget height={340} points={mapPoints} />
                </div>
              </div>

              <div className="lg:col-span-4 space-y-4">
                <section aria-labelledby="stats">
                  <h2 id="stats" className="text-sm font-semibold tracking-wide text-gray-500 uppercase mb-4">Statistik</h2>
                  <div className="space-y-4">
                    {loadingStats && Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
                    {!loadingStats && stats && (
                      <>
                        <div className="rounded-xl border-2 border-gray-200 bg-white shadow-sm p-5 hc-surface hover:bg-cyan-600 hover:border-cyan-600 hover:shadow-xl transition-all duration-300 group" tabIndex={0} aria-label={`Total posting ${stats.totals.posts}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-xs font-semibold text-gray-600 group-hover:text-white uppercase tracking-wide transition-colors">Posting Forum</div>
                            <div className="w-8 h-8 rounded-lg bg-cyan-100 group-hover:bg-white flex items-center justify-center transition-all">
                              <svg className="w-4 h-4 text-cyan-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                            </div>
                          </div>
                          <div className="text-3xl font-black text-gray-900 group-hover:text-white transition-colors">{stats.totals.posts}</div>
                          <div className="mt-3"><Sparkline data={stats.series.posts} stroke="#0891b2" /></div>
                        </div>

                        <div className="rounded-xl border-2 border-gray-200 bg-white shadow-sm p-5 hc-surface hover:bg-amber-600 hover:border-amber-600 hover:shadow-xl transition-all duration-300 group" tabIndex={0}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-xs font-semibold text-gray-600 group-hover:text-white uppercase tracking-wide transition-colors">Aktivitas Hari Ini</div>
                            <div className="w-8 h-8 rounded-lg bg-amber-100 group-hover:bg-white flex items-center justify-center transition-all">
                              <svg className="w-4 h-4 text-amber-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                          </div>
                          <div className="text-3xl font-black text-gray-900 group-hover:text-white transition-colors">12</div>
                          <div className="mt-2 text-sm text-gray-600 group-hover:text-white font-medium transition-colors">Baca, komentar, lamar</div>
                        </div>

                        <div className="rounded-xl border-2 border-gray-200 bg-white shadow-sm p-5 hc-surface hover:bg-cyan-600 hover:border-cyan-600 hover:shadow-xl transition-all duration-300 group" tabIndex={0}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-xs font-semibold text-gray-600 group-hover:text-white uppercase tracking-wide transition-colors">Remote Jobs</div>
                            <div className="w-8 h-8 rounded-lg bg-cyan-100 group-hover:bg-white flex items-center justify-center transition-all">
                              <svg className="w-4 h-4 text-cyan-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                            </div>
                          </div>
                          <div className="text-3xl font-black text-gray-900 group-hover:text-white transition-colors">24</div>
                          <div className="mt-2 text-sm text-gray-600 group-hover:text-white font-medium transition-colors">Work from home</div>
                        </div>
                      </>
                    )}
                  </div>
                </section>
              </div>
            </div>

            {/* Suggestions dengan Cyan & Amber */}
            <section aria-labelledby="suggestions">
              <h2 id="suggestions" className="text-lg font-semibold tracking-tight text-gray-900 mb-4">Saran Untuk Anda</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {suggestions.map((s, i) => (
                  <div key={s} className={`group px-5 py-4 rounded-xl border-2 border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                    i === 0 
                      ? 'hover:bg-cyan-600 hover:border-cyan-600' 
                      : i === 1 
                      ? 'hover:bg-amber-600 hover:border-amber-600' 
                      : 'hover:bg-cyan-600 hover:border-cyan-600'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 transition-colors ${
                        i === 0 ? 'bg-cyan-500 group-hover:bg-white' : i === 1 ? 'bg-amber-500 group-hover:bg-white' : 'bg-cyan-500 group-hover:bg-white'
                      }`}></div>
                      <span className="font-semibold text-sm leading-relaxed text-gray-900 group-hover:text-white transition-colors">{s}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Activity feed dengan Cyan & Amber accents */}
            <section aria-labelledby="feed">
              <h2 id="feed" className="text-lg font-semibold tracking-tight text-gray-900 mb-4">Aktivitas Terbaru</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-sm text-cyan-900 uppercase tracking-wide">Posting</h3>
                  </div>
                  {loadingFeed ? <SkeletonCard lines={3} /> : (
                    <ul className="space-y-2">
                      {feed.posts.map(p => <li key={p.id} className="p-3 rounded-xl border-2 border-cyan-100 bg-white hover:border-cyan-300 hover:shadow-md shadow-sm font-medium hc-surface text-sm transition-all">{p.title}</li>)}
                      {feed.posts.length === 0 && <li className="text-gray-500 text-sm">Belum ada posting.</li>}
                    </ul>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-sm text-amber-900 uppercase tracking-wide">Event</h3>
                  </div>
                  {loadingFeed ? <SkeletonCard lines={3} /> : (
                    <ul className="space-y-2">
                      {feed.events.map(e => <li key={e.id} className="p-3 rounded-xl border-2 border-amber-100 bg-white hover:border-amber-300 hover:shadow-md shadow-sm hc-surface text-sm transition-all"><span className="block font-medium">{e.title}</span><span className="text-xs text-gray-600">{e.date}</span></li>)}
                      {feed.events.length === 0 && <li className="text-gray-500 text-sm">Belum ada event.</li>}
                    </ul>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-sm text-cyan-900 uppercase tracking-wide">Lowongan</h3>
                  </div>
                  {loadingFeed ? <SkeletonCard lines={3} /> : (
                    <ul className="space-y-2">
                      {feed.jobs.map(j => <li key={j.id} className="p-3 rounded-xl border-2 border-cyan-100 bg-white hover:border-cyan-300 hover:shadow-md shadow-sm font-medium hc-surface text-sm transition-all">{j.title}</li>)}
                      {feed.jobs.length === 0 && <li className="text-gray-500 text-sm">Belum ada lowongan.</li>}
                    </ul>
                  )}
                </div>
              </div>
            </section>

            {/* Tools dengan gradient Cyan & Amber */}
            <section aria-labelledby="tools">
              <h2 id="tools" className="text-lg font-semibold tracking-tight mb-4 text-gray-900">Alat & Fitur Aksesibilitas</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link 
                  href={route('jobs.index')}
                  className="group p-6 rounded-xl border-2 border-gray-200 bg-white hover:bg-cyan-600 hover:border-cyan-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-100 group-hover:bg-white flex items-center justify-center mb-4 transition-all">
                    <svg className="w-6 h-6 text-cyan-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div className="font-bold text-lg text-gray-900 group-hover:text-white mb-2 transition-colors">
                    Remote Work Hub
                  </div>
                  <p className="text-sm text-gray-600 group-hover:text-white leading-relaxed transition-colors">
                    Temukan lowongan work-from-home, hybrid, dan pelatihan online yang tidak memerlukan mobilitas fisik.
                  </p>
                </Link>

                <Link
                  href={route('resumes.index')}
                  className="group p-6 rounded-xl border-2 border-gray-200 bg-white hover:bg-amber-600 hover:border-amber-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-100 group-hover:bg-white flex items-center justify-center mb-4 transition-all">
                    <svg className="w-6 h-6 text-amber-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="font-bold text-lg text-gray-900 group-hover:text-white mb-2 transition-colors">
                    Resume Builder
                  </div>
                  <p className="text-sm text-gray-600 group-hover:text-white leading-relaxed transition-colors">
                    Buat CV profesional dengan template inklusif dan unduh PDF siap dibagikan ke perusahaan.
                  </p>
                </Link>

                <Link
                  href={route('posts.index')}
                  className="group p-6 rounded-xl border-2 border-gray-200 bg-white hover:bg-cyan-600 hover:border-cyan-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-100 group-hover:bg-white flex items-center justify-center mb-4 transition-all">
                    <svg className="w-6 h-6 text-cyan-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="font-bold text-lg text-gray-900 group-hover:text-white mb-2 transition-colors">
                    Panduan & Forum
                  </div>
                  <p className="text-sm text-gray-600 group-hover:text-white leading-relaxed transition-colors">
                    Akses panduan, tips, tutorial dan diskusi dengan komunitas untuk meningkatkan aksesibilitas.
                  </p>
                </Link>
              </div>
            </section>
          </div>
        )}
      </div>
    </RoleShell>
  );
}
