import CompanyShell from '@/Layouts/CompanyShell';
import { Link, usePage } from '@inertiajs/react';

export default function CompanyProfileShow() {
  const { profile, flash } = usePage().props;
  const status = profile.verification_status;
  const statusLabel = status === 'approved' ? 'Disetujui' : status === 'rejected' ? 'Ditolak' : 'Menunggu Verifikasi';
  const statusClass = status === 'approved' ? 'bg-emerald-100 text-emerald-700' : status === 'rejected' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800';

  return (
    <CompanyShell>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Profil Perusahaan</h1>
            <p className="text-sm text-gray-600">Lengkapi profil agar dapat membuka lowongan.</p>
          </div>
          <Link href={route('company.profile.edit')} className="px-3 py-1.5 text-sm rounded bg-cyan-600 text-white">Edit Profil</Link>
        </div>
        {flash?.success && <div className="rounded border border-green-200 bg-green-50 text-green-700 px-3 py-2 text-sm">{flash.success}</div>}
        {flash?.error && <div className="rounded border border-amber-200 bg-amber-50 text-amber-700 px-3 py-2 text-sm">{flash.error}</div>}

        <div className="bg-white rounded border p-4 space-y-3">
          <div className="flex items-start gap-4">
            {profile.logo_path ? (
              <img
                src={"/storage/" + profile.logo_path}
                alt="Logo Perusahaan"
                className="w-20 h-20 rounded object-cover border"
                onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src='data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9ca3af" font-size="10">No Logo</text></svg>'); }}
              />
            ) : (
              <div className="w-20 h-20 rounded bg-gray-100 border flex items-center justify-center text-gray-400">No Logo</div>
            )}
            <div>
              <div className="text-xl font-semibold">{profile.company_name}</div>
              <div className="mt-1 text-xs inline-flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full ${statusClass}`}>{statusLabel}</span>
                {profile.verified_at && <span className="text-gray-500">Diverifikasi: {new Date(profile.verified_at).toLocaleString('id-ID')}</span>}
              </div>
            </div>
          </div>
          {profile.description && <p className="text-sm text-gray-700 whitespace-pre-wrap">{profile.description}</p>}
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div><span className="text-gray-500">Bidang Usaha/Industri:</span> {profile.industry || '-'}</div>
            <div><span className="text-gray-500">Kota/Wilayah:</span> {profile.city || '-'}</div>
            <div><span className="text-gray-500">Telepon/WhatsApp:</span> {profile.phone || '-'}</div>
            <div><span className="text-gray-500">Email Resmi:</span> {profile.official_email || '-'}</div>
            <div><span className="text-gray-500">Website Resmi:</span> {profile.website ? <a className="text-cyan-700 underline" href={profile.website} target="_blank" rel="noreferrer">{profile.website}</a> : '-'}</div>
            <div className="space-x-2">
              <span className="text-gray-500">Media Sosial:</span>
              {profile.linkedin ? <a className="text-cyan-700 underline" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> : <span className="text-gray-500">LinkedIn -</span>}
              {profile.instagram ? <a className="text-cyan-700 underline" href={profile.instagram} target="_blank" rel="noreferrer">Instagram</a> : <span className="text-gray-500">Instagram -</span>}
            </div>
            <div className="sm:col-span-2"><span className="text-gray-500">Alamat Kantor:</span> {profile.address || '-'}</div>
          </div>
          {profile.verification_notes && (
            <div className="text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded p-2">Catatan: {profile.verification_notes}</div>
          )}
        </div>
      </div>
    </CompanyShell>
  );
}
