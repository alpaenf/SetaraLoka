import RoleShell from '@/Layouts/RoleShell';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Opportunities({ opportunities, filters = { q: '' } }) {
  const [q, setQ] = useState(filters.q || '');
  const isEmpty = !opportunities || (Array.isArray(opportunities) ? opportunities.length === 0 : (opportunities.data || []).length === 0);
  const items = Array.isArray(opportunities) ? opportunities : (opportunities?.data || []);
  const links = Array.isArray(opportunities) ? [] : (opportunities?.links || []);

  const submitSearch = (e) => {
    e.preventDefault();
    router.get(route('volunteer.opportunities'), { q }, { preserveState: true, preserveScroll: true });
  };

  const toggleInterest = (id) => {
    router.post(route('events.interest', id), {}, { preserveScroll: true });
  };

  return (
    <RoleShell role="volunteer">
      <Head title="Peluang Relawan" />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h1 className="text-2xl font-semibold">Peluang Relawan</h1>
        <div className="flex items-center gap-3">
          <form onSubmit={submitSearch} className="flex items-center gap-2">
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari peluang..."
              className="border rounded px-3 py-1.5 text-sm"
            />
            <button type="submit" className="bg-emerald-600 text-white text-sm px-3 py-1.5 rounded">Cari</button>
          </form>
          <Link href={route('events.index')} className="text-sm text-emerald-700 hover:underline">Lihat Acara</Link>
        </div>
      </div>
      {isEmpty ? (
        <p className="text-gray-600">Belum ada peluang relawan untuk saat ini.</p>
      ) : (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((o) => (
              <li key={o.id} className="rounded-lg border bg-white p-4 shadow-sm">
                <h3 className="font-medium text-gray-900">{o.title}</h3>
                {o.start_at && <div className="text-xs text-gray-500">Mulai: {o.start_at}</div>}
                <p className="text-sm text-gray-600 line-clamp-3 mt-1">{o.description}</p>
                <div className="mt-3 flex items-center gap-3">
                  <Link href={route('events.show', o.id)} className="text-sm text-emerald-700 hover:underline">Detail</Link>
                  <button
                    onClick={() => toggleInterest(o.id)}
                    className={`text-sm px-2.5 py-1 rounded border ${o.interested ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'text-gray-700 hover:bg-gray-50 border-gray-300'}`}
                  >
                    {o.interested ? 'Batal Minat' : 'Minati'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {links.length > 0 && (
            <nav className="mt-6 flex flex-wrap items-center gap-2">
              {links.map((l, idx) => (
                <Link
                  key={idx}
                  href={l.url || '#'}
                  preserveScroll
                  className={`text-sm px-2.5 py-1 rounded ${l.active ? 'bg-emerald-600 text-white' : 'text-emerald-700 hover:bg-emerald-50'}`}
                  disabled={!l.url}
                  dangerouslySetInnerHTML={{ __html: l.label }}
                />
              ))}
            </nav>
          )}
        </>
      )}
    </RoleShell>
  );
}
