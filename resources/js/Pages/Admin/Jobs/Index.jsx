import { Link, useForm, usePage, router } from '@inertiajs/react';
import DashboardLayout from '../../../Layouts/DashboardLayout';

export default function AdminJobsIndex() {
  const { jobs, status, status_counts, filters } = usePage().props;
  const { data, setData } = useForm({ q: filters?.q || '' });
  const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';

  const onSearch = (e) => {
    e.preventDefault();
    router.get(route('admin.jobs.index'), { ...filters, q: data.q, status }, { preserveState: true, replace: true });
  };

  const goStatus = (s) => {
    router.get(route('admin.jobs.index'), { ...filters, status: s, q: data.q }, { preserveState: true, replace: true });
  };

  const approve = (id) => router.post(route('admin.jobs.approve', id), { _token: csrf }, { preserveScroll: true });
  const cancel = (id) => {
    const reason = prompt('Alasan pembatalan (opsional):');
    router.post(route('admin.jobs.cancel', id), { _token: csrf, reason }, { preserveScroll: true });
  };

  const tabs = [
    { key: 'pending', label: 'Menunggu', count: status_counts?.pending || 0 },
    { key: 'approved', label: 'Disetujui', count: status_counts?.approved || 0 },
    { key: 'canceled', label: 'Dibatalkan', count: status_counts?.canceled || 0 },
    { key: 'all', label: 'Semua', count: status_counts?.total || 0 },
  ];

  return (
    <DashboardLayout title="Moderasi Lowongan" description="Tinjau, setujui, atau batalkan lowongan pekerjaan.">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {tabs.map(t => (
            <button key={t.key} onClick={() => goStatus(t.key)} className={`text-xs px-3 py-1.5 rounded-full border ${status === t.key ? 'bg-cyan-600 border-cyan-600 text-white' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
              {t.label} <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-700">{t.count}</span>
            </button>
          ))}
        </div>
        <form onSubmit={onSearch} className="flex items-center gap-2">
          <input
            type="search"
            value={data.q}
            onChange={e => setData('q', e.target.value)}
            placeholder="Cari judul/perusahaan..."
            className="border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring focus:ring-cyan-200"
          />
          <button type="submit" className="px-3 py-1.5 text-sm rounded bg-cyan-600 text-white hover:bg-cyan-500">Cari</button>
        </form>
      </div>

      <div className="overflow-x-auto bg-white/70 backdrop-blur border rounded-md">
        <table className="min-w-full text-sm" aria-label="Tabel lowongan untuk moderasi">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-2 font-medium">Judul</th>
              <th className="text-left px-4 py-2 font-medium">Perusahaan</th>
              <th className="text-left px-4 py-2 font-medium">Tipe</th>
              <th className="text-left px-4 py-2 font-medium">Status</th>
              <th className="text-left px-4 py-2 font-medium">Publikasi</th>
              <th className="text-left px-4 py-2 font-medium">Dibuat</th>
              <th className="text-left px-4 py-2 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {jobs.data.length === 0 && (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center text-gray-500">Tidak ada data.</td>
              </tr>
            )}
            {jobs.data.map(job => {
              const status = job.status || 'pending';
              const statusLabel = status === 'approved' ? 'Disetujui' : status === 'canceled' ? 'Dibatalkan' : 'Menunggu';
              const statusClass = status === 'approved' ? 'bg-emerald-100 text-emerald-700' : status === 'canceled' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800';
              const publishLabel = job.published ? 'Terbit' : 'Draft';
              const publishClass = job.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
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
                  <td className="px-4 py-2">{job.company}</td>
                  <td className="px-4 py-2">{job.employment_type}</td>
                  <td className="px-4 py-2"><span className={`text-xs px-2 py-1 rounded-full ${statusClass}`}>{statusLabel}</span></td>
                  <td className="px-4 py-2"><span className={`text-[10px] px-2 py-0.5 rounded-full ${publishClass}`}>{publishLabel}</span></td>
                  <td className="px-4 py-2">{job.created_at}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button type="button" onClick={() => approve(job.id)} className="text-xs px-2 py-1 rounded border border-emerald-300 text-emerald-700 hover:bg-emerald-50">Approve</button>
                    <button type="button" onClick={() => cancel(job.id)} className="text-xs px-2 py-1 rounded border border-rose-300 text-rose-700 hover:bg-rose-50">Cancel</button>
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
    </DashboardLayout>
  );
}
