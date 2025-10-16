import { Link, usePage, router } from '@inertiajs/react';
import CompanyShell from '@/Layouts/CompanyShell';

export default function CompanyJobsIndex() {
  const { jobs, flash, status_counts } = usePage().props;
  const togglePublish = (id) => {
    router.post(route('company.jobs.toggle', id), {}, { preserveScroll: true });
  };
  return (
    <CompanyShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lowongan Saya</h1>
          <p className="text-sm text-gray-600">Kelola dan pantau performa lowongan pekerjaan Anda.</p>
        </div>
        {route().has('company.jobs.create') && (
          <Link href={route('company.jobs.create')} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-600 text-white text-sm font-medium shadow hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2">
            <span>Buat Lowongan</span>
          </Link>
        )}
      </div>
      {flash?.success && (
        <div className="mb-4 rounded-md bg-green-50 border border-green-200 px-4 py-2 text-sm text-green-700">{flash.success}</div>
      )}
      {status_counts && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="rounded-md border bg-white p-4">
            <div className="text-xs text-gray-500">Total</div>
            <div className="mt-1 text-2xl font-semibold">{status_counts.total}</div>
          </div>
          <div className="rounded-md border bg-white p-4">
            <div className="text-xs text-gray-500">Disetujui</div>
            <div className="mt-1 text-2xl font-semibold text-green-600">{status_counts.approved}</div>
          </div>
          <div className="rounded-md border bg-white p-4">
            <div className="text-xs text-gray-500">Menunggu</div>
            <div className="mt-1 text-2xl font-semibold text-yellow-600">{status_counts.pending}</div>
          </div>
          <div className="rounded-md border bg-white p-4">
            <div className="text-xs text-gray-500">Dibatalkan</div>
            <div className="mt-1 text-2xl font-semibold text-red-600">{status_counts.canceled}</div>
          </div>
        </div>
      )}
      <div className="overflow-x-auto bg-white/70 backdrop-blur border rounded-md">
        <table className="min-w-full text-sm" aria-label="Tabel lowongan perusahaan">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-2 font-medium">Judul</th>
              <th className="text-left px-4 py-2 font-medium">Tipe</th>
              <th className="text-left px-4 py-2 font-medium">Lokasi</th>
              <th className="text-left px-4 py-2 font-medium">Gaji</th>
              <th className="text-left px-4 py-2 font-medium">Pelamar</th>
              <th className="text-left px-4 py-2 font-medium">Status</th>
              <th className="text-left px-4 py-2 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {jobs.data.length === 0 && (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center text-gray-500">Belum ada lowongan.</td>
              </tr>
            )}
            {jobs.data.map(job => {
              const salary = job.salary_min ? (job.salary_max ? `${job.salary_min} - ${job.salary_max}` : job.salary_min) : '-';
              const publishLabel = job.published ? 'Terbit' : 'Draft';
              const publishClass = job.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
              const status = job.status || 'pending';
              const statusLabel = status === 'approved' ? 'Disetujui' : status === 'canceled' ? 'Dibatalkan' : 'Menunggu';
              const statusClass = status === 'approved' ? 'bg-emerald-100 text-emerald-700' : status === 'canceled' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800';
              return (
                <tr key={job.id} className="hover:bg-gray-50/60">
                  <td className="px-4 py-2 font-medium text-gray-800">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span>{job.title}</span>
                      {job.disability_only && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">Disabilitas</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2">{job.employment_type}</td>
                  <td className="px-4 py-2">{job.location_name || '-'}</td>
                  <td className="px-4 py-2">{salary}</td>
                  <td className="px-4 py-2">{job.applications_count}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${statusClass}`}>{statusLabel}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${publishClass}`}>{publishLabel}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    {route().has('company.jobs.edit') && <Link href={route('company.jobs.edit', job.id)} className="text-xs px-2 py-1 rounded border border-cyan-300 text-cyan-700 hover:bg-cyan-50">Edit</Link>}
                    <button type="button" onClick={()=>togglePublish(job.id)} className="text-xs px-2 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50">{job.published ? 'Unpublish' : 'Publish'}</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <div>Menampilkan {jobs.data.length} dari {jobs.total} lowongan</div>
        <div className="flex gap-1">
          {jobs.links.map((l,i) => (
            <Link key={i} href={l.url || ''} className={`px-2 py-1 rounded border text-xs ${l.active ? 'bg-cyan-600 border-cyan-600 text-white' : 'bg-white border-gray-200 hover:bg-gray-50'}`} dangerouslySetInnerHTML={{ __html: l.label }} />
          ))}
        </div>
      </div>
    </CompanyShell>
  );
}
