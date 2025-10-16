import RoleShell from '../../Layouts/RoleShell';
import { useEffect, useState, useCallback } from 'react';
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
        'Gunakan AccessMate untuk membaca konten',
        'Aktifkan navigasi dengan suara',
        'Ringkas teks panjang dengan AI',
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
  const gradient = prefs.highContrast ? 'bg-white' : 'bg-white';
  return (
  <RoleShell role="disabled" highContrast={prefs.highContrast} darkMode={prefs.darkMode}>
      <div className={`${fontScaleClass} ${highContrastClass} leading-relaxed ${gradient} transition-colors`}>
        <div className="mb-8 flex flex-wrap items-start gap-6">
          <div className="flex-1 min-w-[260px]">
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">
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

        {/* Top grid: stats + suggestions + map */}
        <div className="grid gap-6 lg:grid-cols-12 mb-12">
          <div className="lg:col-span-4 space-y-6">
            <section aria-labelledby="stats" className="space-y-4">
              <h2 id="stats" className="text-sm font-semibold tracking-wide text-gray-500 uppercase">Gambaran</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {loadingStats && Array.from({ length: 1 }).map((_, i) => <SkeletonCard key={i} />)}
                {!loadingStats && stats && (
                  <div className="rounded-lg border bg-white shadow-sm p-4 hc-surface" tabIndex={0} aria-label={`Total posting ${stats.totals.posts}`}>
                    <div className="text-xs font-medium text-gray-500">Posting</div>
                    <div className="mt-1 text-2xl font-bold">{stats.totals.posts}</div>
                    <div className="mt-2"><Sparkline data={stats.series.posts} stroke={prefs.highContrast ? '#000' : '#6366f1'} /></div>
                  </div>
                )}
              </div>
            </section>
            <section aria-labelledby="suggestions" className="space-y-3">
              <h2 id="suggestions" className="text-sm font-semibold tracking-wide text-gray-500 uppercase">Saran</h2>
              <ul className="space-y-2">
                {suggestions.map(s => <li key={s} className="px-4 py-3 rounded-lg border bg-white shadow-sm text-indigo-700 font-medium hc-surface text-sm">{s}</li>)}
              </ul>
            </section>
          </div>
          <div className="lg:col-span-8">
            <MapWidget height={340} points={mapPoints} />
          </div>
        </div>

        {/* Activity feed */}
        <section aria-labelledby="feed" className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <h2 id="feed" className="text-lg font-semibold tracking-tight">Aktivitas Terbaru</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-3">
              <h3 className="font-medium text-sm text-gray-500 uppercase">Posting</h3>
              {loadingFeed ? <SkeletonCard lines={3} /> : (
                <ul className="space-y-2">
                  {feed.posts.map(p => <li key={p.id} className="p-3 rounded-lg border bg-white shadow-sm font-medium hc-surface text-sm">{p.title}</li>)}
                  {feed.posts.length === 0 && <li className="text-gray-500 text-sm">Belum ada posting.</li>}
                </ul>
              )}
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-sm text-gray-500 uppercase">Event</h3>
              {loadingFeed ? <SkeletonCard lines={3} /> : (
                <ul className="space-y-2">
                  {feed.events.map(e => <li key={e.id} className="p-3 rounded-lg border bg-white shadow-sm hc-surface text-sm"><span className="block font-medium">{e.title}</span><span className="text-xs text-gray-600">{e.date}</span></li>)}
                  {feed.events.length === 0 && <li className="text-gray-500 text-sm">Belum ada event.</li>}
                </ul>
              )}
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-sm text-gray-500 uppercase">Lowongan</h3>
              {loadingFeed ? <SkeletonCard lines={3} /> : (
                <ul className="space-y-2">
                  {feed.jobs.map(j => <li key={j.id} className="p-3 rounded-lg border bg-white shadow-sm font-medium hc-surface text-sm">{j.title}</li>)}
                  {feed.jobs.length === 0 && <li className="text-gray-500 text-sm">Belum ada lowongan.</li>}
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* Tools */}
        <section aria-labelledby="tools" className="mb-8">
          <h2 id="tools" className="text-lg font-semibold tracking-tight mb-4">Alat & Fitur</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {kategori === 'tidak_bisa_berbicara' && (
              <div className="p-5 rounded-lg border bg-white shadow-sm hc-surface">
                <div className="font-semibold flex items-center gap-2">
                  🗣️ AccessMate (Text-to-Speech)
                </div>
                <p className="text-xs mt-2 text-gray-600 leading-relaxed">
                  Membacakan teks, meringkas konten, dan navigasi dengan perintah suara. Klik tombol floating di kanan bawah.
                </p>
              </div>
            )}
            {kategori === 'tidak_bisa_berjalan' && (
              <div className="p-5 rounded-lg border bg-white shadow-sm hc-surface">
                <div className="font-semibold flex items-center gap-2">
                  🦽 Remote Work Hub
                </div>
                <p className="text-xs mt-2 text-gray-600 leading-relaxed">
                  Lowongan kerja remote-friendly dan acara daring yang tidak memerlukan mobilitas fisik.
                </p>
              </div>
            )}
            <div className="p-5 rounded-lg border bg-white shadow-sm hc-surface">
              <div className="font-semibold">Resume PDF</div>
              <p className="text-xs mt-2 text-gray-600 leading-relaxed">Bangun CV inklusif dan unduh PDF siap dibagikan.</p>
            </div>
            <div className="p-5 rounded-lg border bg-white shadow-sm hc-surface">
              <div className="font-semibold">Sumber Daya Aksesibilitas</div>
              <p className="text-xs mt-2 text-gray-600 leading-relaxed">Panduan, tips, dan tutorial untuk meningkatkan aksesibilitas digital.</p>
            </div>
          </div>
        </section>
      </div>
    </RoleShell>
  );
}
