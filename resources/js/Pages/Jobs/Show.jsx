import RoleShell from '@/Layouts/RoleShell';
import { useForm, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';

export default function JobShow({ job, applied, roles }) {
  const { data, setData, post, processing, progress, errors, reset } = useForm({
    cv: null,
    cover_letter: '',
  });
  const [showForm, setShowForm] = useState(!applied);

  const submit = (e) => {
    e.preventDefault();
    post(route('jobs.apply', job.id), {
      forceFormData: true,
      onSuccess: () => { reset(); setShowForm(false); },
    });
  };
  const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';

  return (
    <RoleShell>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3 text-sm">
          <button onClick={() => history.back()} className="px-3 py-1.5 rounded bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">← Kembali</button>
          {roles?.includes('admin') && (
              <div className="ml-auto flex items-center gap-2">
              <button onClick={()=> router.post(route('admin.jobs.approve', job.id), { _token: csrf })} className="text-xs px-2 py-1 rounded border border-emerald-300 text-emerald-700 hover:bg-emerald-50">Approve</button>
              <button onClick={()=> { const reason = prompt('Alasan pembatalan (opsional):'); router.post(route('admin.jobs.cancel', job.id), { _token: csrf, reason }); }} className="text-xs px-2 py-1 rounded border border-rose-300 text-rose-700 hover:bg-rose-50">Cancel</button>
            </div>
          )}
        </div>
        <div className="bg-white rounded-lg border shadow-sm p-6 space-y-5">
          <header className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-800 leading-tight">{job.title}</h1>
            {job.company && <p className="text-sm text-gray-500">{job.company}</p>}
            <div className="flex flex-wrap gap-2 text-xs text-gray-600 mt-1">
              {job.employment_type && <span className="px-2 py-0.5 bg-gray-100 rounded-full">{job.employment_type}</span>}
              {job.location_name && <span>{job.location_name}</span>}
              {(job.salary_min || job.salary_max) && <span className="font-medium text-green-700">Rp{job.salary_min?.toLocaleString('id-ID')} - Rp{job.salary_max?.toLocaleString('id-ID')}</span>}
              {job.disability_only && <span className="px-2 py-0.5 bg-violet-100 text-violet-700 rounded-full">Disabilitas</span>}
            </div>
          </header>
          {job.description && <section><h2 className="font-semibold mb-1">Deskripsi</h2><p className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">{job.description}</p></section>}
          {job.requirements && <section><h2 className="font-semibold mb-1">Kualifikasi</h2><ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">{job.requirements.split(/\n|\.\s/).filter(Boolean).map((r,i)=>(<li key={i}>{r.trim()}</li>))}</ul></section>}
            {job.benefits && <section><h2 className="font-semibold mb-1">Benefit</h2><ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">{job.benefits.split(/\n|\.\s/).filter(Boolean).map((b,i)=>(<li key={i}>{b.replace(/^[*-]\s?/,'').trim()}</li>))}</ul></section>}
          {job.accommodations && (
            <section>
              <h2 className="font-semibold mb-1">Akomodasi untuk Disabilitas</h2>
              <p className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">{job.accommodations}</p>
            </section>
          )}

          <div className="pt-4 border-t">
            {applied ? (
              <div className="flex items-center gap-3">
                <span className="text-green-700 font-medium">Anda sudah melamar pekerjaan ini.</span>
                <button onClick={()=> setShowForm(v=>!v)} className="text-xs underline">{showForm ? 'Sembunyikan Form' : 'Buka Form Lagi'}</button>
              </div>
            ) : (
              roles?.includes('perusahaan') || roles?.includes('admin') ? (
                <div className="text-xs text-orange-600">(Akun perusahaan/admin tidak dapat melamar)</div>
              ) : (
                <button onClick={()=> setShowForm(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">Lamar Sekarang</button>
              )
            )}

            {showForm && (
              <form onSubmit={submit} className="mt-4 space-y-4" aria-label="Form Lamaran">
                <div>
                  <label className="block text-sm font-medium mb-1">Upload CV (PDF) *</label>
                  <input type="file" accept="application/pdf" onChange={e=> setData('cv', e.target.files[0])} className="block w-full text-sm" aria-required="true" />
                  {errors.cv && <p className="text-red-600 text-sm mt-1">{errors.cv}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cover Letter (opsional)</label>
                  <textarea className="w-full border rounded p-2 text-sm" rows={5} value={data.cover_letter} onChange={e=> setData('cover_letter', e.target.value)} placeholder="Tulis pesan singkat..." />
                  {errors.cover_letter && <p className="text-red-600 text-sm mt-1">{errors.cover_letter}</p>}
                </div>
                <div className="flex items-center gap-4">
                  <button disabled={processing} className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 disabled:opacity-60">Kirim Lamaran</button>
                  {processing && (
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <div className="w-40 h-2 rounded bg-gray-200 overflow-hidden">
                        <div className="h-full bg-green-500 animate-pulse" style={{ width: progress ? progress.percentage + '%' : '60%' }}></div>
                      </div>
                      <span>{progress?.percentage ?? 60}%</span>
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </RoleShell>
  );
}
