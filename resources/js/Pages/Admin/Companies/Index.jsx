import DashboardLayout from '../../../Layouts/DashboardLayout';
import { Link, router, useForm, usePage } from '@inertiajs/react';

export default function AdminCompaniesIndex() {
  const { profiles, status, filters, flash } = usePage().props;
  const { data, setData } = useForm({ q: filters?.q || '' });
  const goStatus = (s) => router.get(route('admin.companies.index'), { status: s, q: data.q }, { preserveState: true, replace: true });
  const onSearch = (e) => { e.preventDefault(); router.get(route('admin.companies.index'), { status, q: data.q }, { preserveState: true, replace: true }); };
  const approve = (id) => router.post(route('admin.companies.approve', id), {}, { preserveScroll: true });
  const reject = (id) => { const notes = prompt('Alasan penolakan (opsional):'); router.post(route('admin.companies.reject', id), { notes }, { preserveScroll: true }); };

  const tabs = [
    { key: 'pending', label: 'Menunggu' },
    { key: 'approved', label: 'Disetujui' },
    { key: 'rejected', label: 'Ditolak' },
    { key: 'all', label: 'Semua' },
  ];

  return (
    <DashboardLayout title="Verifikasi Perusahaan" description="Tinjau dan verifikasi profil perusahaan.">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {tabs.map(t => (
            <button key={t.key} onClick={() => goStatus(t.key)} className={`text-xs px-3 py-1.5 rounded-full border ${status === t.key ? 'bg-cyan-600 border-cyan-600 text-white' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>{t.label}</button>
          ))}
        </div>
        <form onSubmit={onSearch} className="flex items-center gap-2">
          <input type="search" value={data.q} onChange={e=> setData('q', e.target.value)} placeholder="Cari perusahaan..." className="border rounded px-3 py-1.5 text-sm" />
          <button className="px-3 py-1.5 text-sm rounded bg-cyan-600 text-white">Cari</button>
        </form>
      </div>

      <div className="overflow-x-auto bg-white/70 backdrop-blur border rounded-md mt-4">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-2 font-medium">Perusahaan</th>
              <th className="text-left px-4 py-2 font-medium">Website</th>
              <th className="text-left px-4 py-2 font-medium">Telepon</th>
              <th className="text-left px-4 py-2 font-medium">Status</th>
              <th className="text-left px-4 py-2 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {profiles.data.length === 0 && (
              <tr><td colSpan="5" className="px-4 py-6 text-center text-gray-500">Tidak ada data.</td></tr>
            )}
            {profiles.data.map(p => (
              <tr key={p.id} className="hover:bg-gray-50/60">
                <td className="px-4 py-2">
                  <div className="flex items-center gap-3">
                    {p.logo_path ? (
                      <img
                        src={"/storage/" + p.logo_path}
                        alt="logo"
                        className="w-8 h-8 rounded object-cover border"
                        onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src='data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><rect width="100%" height="100%" fill="#f3f4f6"/></svg>'); }}
                      />
                    ) : <div className="w-8 h-8 rounded bg-gray-100 border"/>}
                    <div className="font-medium text-gray-800">{p.company_name}</div>
                  </div>
                </td>
                <td className="px-4 py-2">{p.website ? <a href={p.website} target="_blank" className="text-cyan-700 underline">{p.website}</a> : '-'}</td>
                <td className="px-4 py-2">{p.phone || '-'}</td>
                <td className="px-4 py-2">{p.verification_status}</td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={() => approve(p.id)} className="text-xs px-2 py-1 rounded border border-emerald-300 text-emerald-700 hover:bg-emerald-50">Approve</button>
                  <button onClick={() => reject(p.id)} className="text-xs px-2 py-1 rounded border border-rose-300 text-rose-700 hover:bg-rose-50">Reject</button>
                  <a href={route('admin.jobs.index', { company_id: p.id })} className="text-xs px-2 py-1 rounded border border-sky-300 text-sky-700 hover:bg-sky-50">Tinjau Lowongan</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <div>Menampilkan {profiles.data.length} dari {profiles.total} perusahaan</div>
        <div className="flex gap-1">
          {profiles.links.map((l,i) => (
            <Link key={i} href={l.url || ''} className={`px-2 py-1 rounded border text-xs ${l.active ? 'bg-cyan-600 border-cyan-600 text-white' : 'bg-white border-gray-200 hover:bg-gray-50'}`} dangerouslySetInnerHTML={{ __html: l.label }} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
