import DashboardLayout from '../../Layouts/DashboardLayout';
import { useEffect, useState } from 'react';
import SkeletonCard from '../../Components/SkeletonCard';
import { Link, router } from '@inertiajs/react';

export default function Volunteer() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ totals: { hours: 0, interested_events: 0, certificates: 0 }, suggested_opportunities: [] });

  useEffect(() => {
    let active = true;
    fetch('/dashboard/volunteer/data')
      .then(r => r.json())
      .then(json => { if (active) { setData(json); setLoading(false); } })
      .catch(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const toggleInterest = (id) => {
    router.post(route('events.interest', id), {}, { preserveScroll: true });
  };

  const quickActions = [
    { label: 'Cari Peluang', href: route('volunteer.opportunities'), gradient: 'from-cyan-500 to-cyan-600' },
    { label: 'Event Saya', href: route('events.index'), gradient: 'from-amber-500 to-amber-600' },
    { label: 'Sertifikat', href: route('volunteer.certificates'), gradient: 'from-cyan-600 to-amber-500' },
    { label: 'Profil', href: route('volunteer.profile'), gradient: 'from-amber-600 to-cyan-500' },
  ];

  return (
    <DashboardLayout role="volunteer" title="Dashboard Relawan" description="Berkontribusi, berkembang, berdampak.">
      
      {/* Hero Section */}
      <div className="relative mb-8 rounded-2xl bg-gradient-to-br from-cyan-500 via-cyan-600 to-amber-500 p-8 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl -ml-24 -mb-24" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Selamat Datang, Relawan!</h1>
          <p className="text-cyan-50 text-lg">Temukan peluang baru dan buat dampak nyata di komunitas.</p>
        </div>
      </div>

      {/* Quick Actions */}
      <section aria-labelledby="quick-actions" className="mb-8">
        <h2 id="quick-actions" className="text-xl font-bold text-gray-800 mb-4">Akses Cepat</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, idx) => (
            <Link
              key={idx}
              href={action.href}
              className="group relative overflow-hidden rounded-xl bg-white border-2 border-gray-200 p-6 hover:border-cyan-300 hover:shadow-2xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative z-10">
                <div className="font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">{action.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section aria-labelledby="vol-metrics" className="mb-8">
        <h2 id="vol-metrics" className="text-xl font-bold text-gray-800 mb-4">Statistik Kontribusi</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {loading && Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          {!loading && (
            <>
              <div className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="text-sm font-medium text-gray-600 mb-2">Jam Kontribusi</div>
                  <div className="text-3xl font-bold text-gray-900">{data.totals.hours}</div>
                  <div className="text-xs text-gray-500 mt-1">Total jam relawan</div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="text-sm font-medium text-gray-600 mb-2">Event Diminati</div>
                  <div className="text-3xl font-bold text-gray-900">{data.totals.interested_events}</div>
                  <div className="text-xs text-gray-500 mt-1">Acara yang Anda ikuti</div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-100 via-amber-100 to-cyan-200 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="text-sm font-medium text-gray-600 mb-2">Sertifikat</div>
                  <div className="text-3xl font-bold text-gray-900">{data.totals.certificates}</div>
                  <div className="text-xs text-gray-500 mt-1">Pencapaian Anda</div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Opportunities */}
      <section aria-labelledby="vol-ops">
        <div className="flex items-center justify-between mb-4">
          <h2 id="vol-ops" className="text-xl font-bold text-gray-800">Peluang Relawan</h2>
          <Link href={route('volunteer.opportunities')} className="text-sm text-cyan-600 hover:text-cyan-700 font-medium hover:underline">
            Lihat Semua
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading && Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          {!loading && data.suggested_opportunities.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              <p>Belum ada peluang tersedia saat ini.</p>
            </div>
          )}
          {!loading && data.suggested_opportunities.map(o => (
            <div key={o.id} className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-lg hover:border-cyan-300 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <div className="font-semibold text-gray-900 mb-1 line-clamp-2">{o.title}</div>
              {o.start_at && <div className="text-xs text-gray-500 mb-2">{o.start_at}</div>}
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">{o.description}</p>
              <div className="flex items-center gap-2">
                <Link 
                  href={route('events.show', o.id)} 
                  className="flex-1 text-center text-sm py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-sm"
                >
                  Detail
                </Link>
                <button
                  onClick={() => toggleInterest(o.id)}
                  className={`text-sm px-3 py-2 rounded-lg font-medium transition-all ${
                    o.interested 
                      ? 'bg-amber-100 text-amber-700 border border-amber-300 hover:bg-amber-200' 
                      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {o.interested ? 'Minati' : 'Tandai'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}
