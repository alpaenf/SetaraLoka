import CompanyShell from '../../Layouts/CompanyShell';
import { useEffect, useState } from 'react';
import SkeletonCard from '../../Components/SkeletonCard';
import Sparkline from '../../Components/Sparkline';
import { router } from '@inertiajs/react';

export default function Company() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const refresh = () => {
    fetch('/company/dashboard/stats')
      .then(r => r.json())
      .then(json => { setStats(json); setLoading(false); })
      .catch(()=>{});
  };
  useEffect(() => {
    let active = true;
    fetch('/company/dashboard/stats')
      .then(r => r.json())
      .then(json => { if (active) { setStats(json); setLoading(false); } })
      .catch(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const togglePublish = (id) => {
    router.post(route('company.jobs.toggle', id), {}, { preserveScroll: true, onFinish: () => refresh() });
  };

  const metrics = stats?.metrics;
  const recentJobs = stats?.recent_jobs || [];
  const profile = stats?.profile;
  const recentApplicants = stats?.recent_applicants || [];
  const topJobs = stats?.top_jobs || [];

  return (
    <CompanyShell>
      <header className="mb-8 space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Perusahaan</h1>
        <p className="text-gray-600">Kelola lowongan inklusif & branding employer ramah disabilitas.</p>
      </header>
      <section aria-labelledby="metrics-company" className="mb-8">
        <h2 id="metrics-company" className="sr-only">Statistik</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loading && Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          {!loading && metrics && (
            <>
              <div className="rounded-lg border bg-white/60 backdrop-blur p-4 shadow-sm flex flex-col">
                <div className="text-sm font-medium text-gray-500">Total Lowongan</div>
                <div className="mt-2 text-2xl font-semibold">{metrics.total_jobs}</div>
                <div className="mt-1 text-xs text-gray-500">Published {metrics.published_jobs} • Draft {metrics.draft_jobs}</div>
              </div>
              <div className="rounded-lg border bg-white/60 backdrop-blur p-4 shadow-sm flex flex-col">
                <div className="text-sm font-medium text-gray-500">Total Pelamar</div>
                <div className="mt-2 text-2xl font-semibold">{metrics.total_applications}</div>
                <div className="mt-1 text-xs text-gray-500">7 Hari: {metrics.applications_last7}</div>
              </div>
              <div className="rounded-lg border bg-white/60 backdrop-blur p-4 shadow-sm flex flex-col">
                <div className="text-sm font-medium text-gray-500">Publikasi Rate</div>
                <div className="mt-2 text-2xl font-semibold">{metrics.total_jobs ? Math.round((metrics.published_jobs / metrics.total_jobs) * 100) : 0}%</div>
                <div className="mt-1 text-xs text-gray-500">Draft {metrics.draft_jobs}</div>
              </div>
              <div className="rounded-lg border bg-white/60 backdrop-blur p-4 shadow-sm flex flex-col">
                <div className="text-sm font-medium text-gray-500">Aktivitas</div>
                <div className="mt-2 text-xs text-gray-500">Pergerakan pelamar 7 hari terakhir</div>
                <div className="mt-2"><Sparkline data={[metrics.applications_last7]} stroke="#06b6d4" /></div>
              </div>
            </>
          )}
        </div>
      </section>
      {profile && (
        <section aria-labelledby="company-profile" className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="rounded-lg border bg-white/60 backdrop-blur p-4 shadow-sm col-span-1">
            <div className="text-sm font-medium text-gray-500">Profil Perusahaan</div>
            <div className="mt-2 text-lg font-semibold">{profile.company_name}</div>
            <div className="mt-1 text-xs text-gray-500">Status: {profile.verification_status}</div>
            <div className="mt-2 text-sm">Kelengkapan profil: <strong>{profile.completeness}%</strong></div>
            {profile.verification_notes && <div className="mt-2 text-xs text-red-700">Catatan: {profile.verification_notes}</div>}
          </div>
          <div className="rounded-lg border bg-white/60 backdrop-blur p-4 shadow-sm col-span-1 lg:col-span-2">
            <div className="flex items-center justify-between"><div className="text-sm font-medium text-gray-500">Pelamar Terbaru</div><a href={route('company.applicants.index') ?? '#'} className="text-xs text-cyan-700">Lihat semua</a></div>
            <div className="mt-2 divide-y">
              {recentApplicants.length === 0 && <div className="p-3 text-sm text-gray-500">Belum ada pelamar.</div>}
              {recentApplicants.map(a => (
                <div key={a.id} className="p-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-800">{a.applicant_name}</div>
                    <div className="text-xs text-gray-500">{a.job_title} • {a.applicant_email}</div>
                  </div>
                  <div className="text-xs text-gray-500">{a.status}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {topJobs.length > 0 && (
        <section aria-labelledby="top-jobs" className="mb-8">
          <h2 id="top-jobs" className="text-lg font-semibold mb-3">Lowongan Paling Banyak Pelamar</h2>
          <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
            {topJobs.map(j=> (
              <div key={j.id} className="rounded border bg-white/60 p-3"> 
                <div className="font-medium text-gray-800 truncate">{j.title}</div>
                <div className="text-xs text-gray-500">{j.applications_count} pelamar</div>
              </div>
            ))}
          </div>
        </section>
      )}
      <section aria-labelledby="jobs-overview">
        <h2 id="jobs-overview" className="text-lg font-semibold mb-3 flex items-center justify-between">Lowongan Terbaru
          <a href={route().has('company.jobs.index') ? route('company.jobs.index') : '#'} className="text-xs font-normal text-cyan-700 hover:underline">Lihat semua</a>
        </h2>
        <div className="divide-y border rounded-md bg-white/60 backdrop-blur" aria-live="polite">
          {loading && Array.from({ length: 3 }).map((_,i)=>(
            <div key={i} className="p-4 animate-pulse flex items-center justify-between"><div className="h-3 bg-gray-200 rounded w-1/3"/><div className="h-4 bg-gray-200 rounded w-16"/></div>
          ))}
          {!loading && recentJobs.length === 0 && (
            <div className="p-4 text-sm text-gray-500">Belum ada lowongan.</div>
          )}
          {!loading && recentJobs.map(j => {
            const statusClass = j.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
            return (
              <div key={j.id} className="p-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-gray-800 truncate" title={j.title}>{j.title}</p>
                  <p className="text-xs text-gray-500">{j.employment_type}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">{j.applications_count} pelamar</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusClass}`}>{j.published ? 'Published' : 'Draft'}</span>
                  {route().has('company.jobs.toggle') && (
                    <button onClick={()=>togglePublish(j.id)} className="text-xs px-2 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50">{j.published ? 'Unpublish' : 'Publish'}</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section aria-labelledby="company-tips" className="space-y-2 mt-8">
        <h2 id="company-tips" className="text-lg font-semibold">Tips Inklusi</h2>
        <ul className="list-disc ml-5 text-sm text-indigo-700">
          <li>Gunakan deskripsi pekerjaan dengan bahasa inklusif.</li>
          <li>Sertakan akomodasi rekrutmen.</li>
          <li>Highlight kebijakan aksesibilitas kantor.</li>
        </ul>
      </section>
    </CompanyShell>
  );
}
