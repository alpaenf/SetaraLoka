import RoleShell from '@/Layouts/RoleShell';
import { Head, Link, router } from '@inertiajs/react';

export default function Certificates({ certificates, filters = {}, years = [] }) {
  const items = Array.isArray(certificates) ? certificates : (certificates?.data || []);
  const links = Array.isArray(certificates) ? [] : (certificates?.links || []);
  const year = filters.year || '';

  const onYearChange = (e) => {
    const value = e.target.value;
    router.get(
      window.location.pathname,
      value ? { year: value } : {},
      { preserveScroll: true, preserveState: true, replace: true }
    );
  };

  return (
    <RoleShell role="volunteer">
      <Head title="Sertifikat Relawan" />
      <div className="flex items-center justify-between mb-4 gap-4">
        <h1 className="text-2xl font-semibold">Sertifikat</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="year" className="text-sm text-gray-600">Tahun</label>
          <select
            id="year"
            value={year}
            onChange={onYearChange}
            className="border rounded-md px-2 py-1 text-sm bg-white"
          >
            <option value="">Semua</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-600">Belum ada sertifikat.</p>
      ) : (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((c) => (
              <li key={c.id} className="rounded-lg border bg-white p-4 shadow-sm">
                <div className="font-medium text-gray-900">{c.title}</div>
                <div className="text-sm text-gray-600">Diterbitkan oleh {c.issuer}</div>
                <div className="text-xs text-gray-500 mt-1">{c.issued_at}</div>
                <div className="mt-3">
                  <Link href={route('volunteer.certificate.pdf', c.id)} className="text-sm text-emerald-700 hover:underline">Unduh PDF</Link>
                </div>
              </li>
            ))}
          </ul>

          {links.length > 0 && (
            <nav className="mt-6 flex flex-wrap items-center gap-2" aria-label="Pagination">
              {links.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.url || '#'}
                  preserveScroll
                  className={[
                    'px-3 py-1 rounded border text-sm',
                    link.active ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-700 hover:bg-gray-50',
                    !link.url ? 'opacity-50 cursor-default pointer-events-none' : '',
                  ].join(' ')}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </nav>
          )}
        </>
      )}
    </RoleShell>
  );
}
