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

  return (
    <DashboardLayout role="volunteer" title="Dashboard Relawan" description="Temukan peluang kontribusi bermakna.">
      <section aria-labelledby="vol-metrics" className="mb-6">
        <h2 id="vol-metrics" className="sr-only">Statistik</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading && Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          {!loading && (
            <>
              <div className="rounded-lg border bg-white/60 backdrop-blur p-4 shadow-sm">
                <div className="text-sm font-medium text-gray-500">Jam Kontribusi</div>
                <div className="mt-2 text-2xl font-semibold">{data.totals.hours}</div>
              </div>
              <div className="rounded-lg border bg-white/60 backdrop-blur p-4 shadow-sm">
                <div className="text-sm font-medium text-gray-500">Event Diminati</div>
                <div className="mt-2 text-2xl font-semibold">{data.totals.interested_events}</div>
              </div>
              <div className="rounded-lg border bg-white/60 backdrop-blur p-4 shadow-sm">
                <div className="text-sm font-medium text-gray-500">Sertifikat</div>
                <div className="mt-2 text-2xl font-semibold">{data.totals.certificates}</div>
              </div>
            </>
          )}
        </div>
      </section>
      <section aria-labelledby="vol-ops">
        <h2 id="vol-ops" className="text-lg font-semibold mb-3">Peluang Disarankan</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {loading && Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          {!loading && data.suggested_opportunities.map(o => (
            <div key={o.id} className="p-4 border rounded-md bg-white/60 backdrop-blur">
              <div className="font-medium text-gray-900">{o.title}</div>
              {o.start_at && <div className="text-xs mt-1 text-gray-600">Mulai: {o.start_at}</div>}
              <p className="text-sm text-gray-600 mt-1 line-clamp-3">{o.description}</p>
              <div className="mt-3 flex items-center gap-3">
                <Link href={route('events.show', o.id)} className="text-sm text-emerald-700 hover:underline">Detail</Link>
                <button
                  onClick={() => toggleInterest(o.id)}
                  className={`text-sm px-2.5 py-1 rounded border ${o.interested ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'text-gray-700 hover:bg-gray-50 border-gray-300'}`}
                >
                  {o.interested ? 'Batal Minat' : 'Minati'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section aria-labelledby="vol-tips" className="space-y-2 mt-6">
        <h2 id="vol-tips" className="text-lg font-semibold">Tips</h2>
        <ul className="list-disc ml-5 text-sm text-indigo-700">
            <li>Tingkatkan profil dengan keahlian relevan.</li>
            <li>Ikuti event untuk memperluas jejaring.</li>
            <li>Gunakan resume PDF untuk lamaran.</li>
        </ul>
      </section>
    </DashboardLayout>
  );
}
