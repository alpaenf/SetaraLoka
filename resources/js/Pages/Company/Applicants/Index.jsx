import { usePage, Link } from '@inertiajs/react';
import CompanyShell from '@/Layouts/CompanyShell';
import { useState } from 'react';

export default function CompanyApplicantsIndex() {
  const { applications, jobs, filters, statuses } = usePage().props;
  const [jobId, setJobId] = useState(filters.job_id || '');
  const [status, setStatus] = useState(filters.status || '');

  const handleFilter = () => {
    const params = {};
    if (jobId) params.job_id = jobId;
    if (status) params.status = status;
    window.location = route('company.applicants.index', params);
  };

  return (
    <CompanyShell>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pelamar</h1>
          <p className="text-sm text-gray-600">Lihat dan kelola pelamar untuk semua lowongan Anda.</p>
        </div>
      </div>
      <div className="mb-4 flex gap-4 items-end">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Lowongan</label>
          <select value={jobId} onChange={e=>setJobId(e.target.value)} className="rounded border-gray-300 text-sm">
            <option value="">Semua</option>
            {jobs.map(j=>(<option key={j.id} value={j.id}>{j.title}</option>))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
          <select value={status} onChange={e=>setStatus(e.target.value)} className="rounded border-gray-300 text-sm">
            <option value="">Semua</option>
            {statuses.map(s=>(<option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>))}
          </select>
        </div>
        <button onClick={handleFilter} className="px-3 py-1.5 rounded bg-cyan-600 text-white text-sm font-medium">Filter</button>
      </div>
      <div className="overflow-x-auto bg-white/70 backdrop-blur border rounded-md">
        <table className="min-w-full text-sm" aria-label="Tabel pelamar perusahaan">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-2 font-medium">Lowongan</th>
              <th className="text-left px-4 py-2 font-medium">Nama</th>
              <th className="text-left px-4 py-2 font-medium">Email</th>
              <th className="text-left px-4 py-2 font-medium">Status</th>
              <th className="text-left px-4 py-2 font-medium">Tanggal Apply</th>
              <th className="text-left px-4 py-2 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {applications.data.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">Belum ada pelamar.</td>
              </tr>
            )}
            {applications.data.map(app => {
              const statusClass = app.status === 'submitted' ? 'bg-yellow-100 text-yellow-700' : app.status === 'reviewed' ? 'bg-blue-100 text-blue-700' : app.status === 'shortlisted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
              return (
                <tr key={app.id} className="hover:bg-gray-50/60">
                  <td className="px-4 py-2 font-medium text-gray-800">{app.job?.title}</td>
                  <td className="px-4 py-2">{app.user?.name}</td>
                  <td className="px-4 py-2">{app.user?.email}</td>
                  <td className="px-4 py-2"><span className={`text-xs px-2 py-1 rounded-full ${statusClass}`}>{app.status}</span></td>
                  <td className="px-4 py-2">{new Date(app.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-2 space-x-2">
                    <a href={app.cv_path ? `/storage/${app.cv_path}` : '#'} target="_blank" rel="noopener" className="text-xs px-2 py-1 rounded border border-cyan-300 text-cyan-700 hover:bg-cyan-50">CV</a>
                    {/* Future: status update dropdown/button */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <div>Menampilkan {applications.data.length} dari {applications.total} pelamar</div>
        <div className="flex gap-1">
          {applications.links.map((l,i) => (
            <Link key={i} href={l.url || ''} className={`px-2 py-1 rounded border text-xs ${l.active ? 'bg-cyan-600 border-cyan-600 text-white' : 'bg-white border-gray-200 hover:bg-gray-50'}`} dangerouslySetInnerHTML={{ __html: l.label }} />
          ))}
        </div>
      </div>
    </CompanyShell>
  );
}
