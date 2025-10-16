import RoleShell from '@/Layouts/RoleShell';
import { Head, Link, router } from '@inertiajs/react';

export default function VolunteerProfile({ profile, recentCertificates = [], upcoming = [] }) {
  const p = profile || {};
  const toggleInterest = (id) => router.post(route('events.interest', id), {}, { preserveScroll: true });
  return (
    <RoleShell role="volunteer">
      <Head title="Profil Relawan" />
      <h1 className="text-2xl font-semibold mb-4">Profil Relawan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="text-lg font-medium mb-2">Informasi Dasar</h2>
          <dl className="text-sm">
            <dt className="text-gray-500">Nama</dt>
            <dd className="mb-2 text-gray-900">{p.name || '-'}</dd>
            <dt className="text-gray-500">Kota</dt>
            <dd className="mb-2 text-gray-900">{p.city || '-'}</dd>
            <dt className="text-gray-500">Bidang Minat</dt>
            <dd className="mb-2 text-gray-900">{(p.interests || []).join(', ') || '-'}</dd>
          </dl>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="text-lg font-medium mb-2">Statistik Kontribusi</h2>
          <ul className="text-sm text-gray-700 list-disc pl-4">
            <li>Total jam relawan: {p.hours || 0}</li>
            <li>Acara diikuti: {p.events || 0}</li>
            <li>Sertifikat: {p.certificates || 0}</li>
          </ul>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="text-lg font-medium mb-2">Sertifikat Terbaru</h2>
          {recentCertificates.length === 0 ? (
            <p className="text-gray-600 text-sm">Belum ada sertifikat.</p>
          ) : (
            <ul className="space-y-3">
              {recentCertificates.map(c => (
                <li key={c.id} className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium text-gray-900">{c.title}</div>
                    <div className="text-xs text-gray-500">{c.issued_at} • {c.issuer}</div>
                  </div>
                  <Link href={c.pdf_url} className="text-sm text-emerald-700 hover:underline">Unduh</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="text-lg font-medium mb-2">Peluang Mendatang</h2>
          {upcoming.length === 0 ? (
            <p className="text-gray-600 text-sm">Belum ada rekomendasi.</p>
          ) : (
            <ul className="space-y-3">
              {upcoming.map(o => (
                <li key={o.id} className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium text-gray-900">{o.title}</div>
                    {o.start_at && <div className="text-xs text-gray-500">Mulai: {o.start_at}</div>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={route('events.show', o.id)} className="text-sm text-emerald-700 hover:underline">Detail</Link>
                    <button onClick={() => toggleInterest(o.id)} className={`text-sm px-2.5 py-1 rounded border ${o.interested ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'text-gray-700 hover:bg-gray-50 border-gray-300'}`}>{o.interested ? 'Batal' : 'Minati'}</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </RoleShell>
  );
}
