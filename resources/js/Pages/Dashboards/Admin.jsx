import DashboardLayout from '../../Layouts/DashboardLayout';
import { useEffect, useState } from 'react';
import Sparkline from '../../Components/Sparkline';
import SkeletonCard from '../../Components/SkeletonCard';

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    let active = true;
    fetch('/dashboard/stats')
      .then(r => r.json())
      .then(json => { if (active) { setData(json); setLoading(false); } })
      .catch(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const cards = loading ? [] : [
    { title: 'Pengguna', value: data.totals.users, desc: 'Total user terdaftar' },
    { title: 'Posting', value: data.totals.posts, desc: 'Total posting' },
    { title: 'Event', value: data.totals.events, desc: 'Total event' },
    { title: 'Lowongan', value: data.totals.jobs, desc: 'Total lowongan' },
  ];

  return (
    <DashboardLayout title="Panel Admin" description="Kelola seluruh resource & moderasi konten.">
      <section aria-labelledby="admin-metrics">
        <h2 id="admin-metrics" className="sr-only">Statistik</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loading && Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          {!loading && cards.map(c => (
            <div key={c.title} className="rounded-lg border bg-white/60 backdrop-blur p-4 shadow-sm flex flex-col">
              <div className="text-sm font-medium text-gray-500">{c.title}</div>
              <div className="mt-2 text-2xl font-semibold">{c.value}</div>
              <div className="mt-1 text-xs text-gray-500">{c.desc}</div>
              {c.title === 'Posting' && <div className="mt-2"><Sparkline data={data.series.posts} stroke="#6366f1" /></div>}
              {c.title === 'Event' && <div className="mt-2"><Sparkline data={data.series.events} stroke="#16a34a" /></div>}
            </div>
          ))}
        </div>
      </section>
      <section aria-labelledby="admin-actions" className="space-y-3">
        <h2 id="admin-actions" className="text-lg font-semibold">Aksi Cepat</h2>
        <ul className="list-disc ml-5 text-sm text-indigo-700">
          <li>Review laporan konten</li>
          <li>Sinkron data event</li>
          <li>Audit peran & izin</li>
        </ul>
      </section>
      {/* admin extra cards removed per request */}
    </DashboardLayout>
  );
}
