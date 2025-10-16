import CompanyShell from '../../Layouts/CompanyShell';
import { useEffect, useState } from 'react';
import SkeletonCard from '../../Components/SkeletonCard';
import Sparkline from '../../Components/Sparkline';
import { router } from '@inertiajs/react';

export default function Company() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState(null);
  const [profile, setProfile] = useState(null);
  const [recentApplicants, setRecentApplicants] = useState([]);
  const [topJobs, setTopJobs] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);

  const refresh = () => {
    fetch('/company/dashboard/stats')
      .then((r) => r.json())
      .then((json) => {
        setMetrics(json.metrics || {});
        setProfile(json.profile || null);
        setRecentApplicants(json.recent_applicants || []);
        setTopJobs(json.top_jobs || []);
        setRecentJobs(json.recent_jobs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    let active = true;
    fetch('/company/dashboard/stats')
      .then((r) => r.json())
      .then((json) => {
        if (!active) return;
        setMetrics(json.metrics || {});
        setProfile(json.profile || null);
        setRecentApplicants(json.recent_applicants || []);
        setTopJobs(json.top_jobs || []);
        setRecentJobs(json.recent_jobs || []);
        setLoading(false);
      })
      .catch(() => active && setLoading(false));

    return () => { active = false; };
  }, []);

  const togglePublish = (jobId) => {
    fetch(`/company/jobs/${jobId}/toggle`, { method: 'POST' })
      .then(() => refresh())
      .catch(() => {});
  };

  return (
    <CompanyShell>
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Perusahaan</h1>
            <p className="text-gray-600">Kelola lowongan inklusif & employer branding yang ramah disabilitas.</p>
          </div>
          <div className="flex items-center gap-3">
            <a href={route('company.jobs.create')} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg">Buat Lowongan</a>
            <a href={route('company.applicants.index')} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg">Lihat Pelamar</a>
          </div>
        </div>
      </header>

      <section className="mb-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading && Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          {!loading && metrics && (
            <>
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-semibold text-gray-600 uppercase">Total Lowongan</div>
                  <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                </div>
                <div className="text-3xl font-black text-gray-900">{metrics.total_jobs}</div>
                <div className="text-sm text-gray-500 mt-2">Published {metrics.published_jobs}  Draft {metrics.draft_jobs}</div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-semibold text-gray-600 uppercase">Total Pelamar</div>
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7a4 4 0 014-4h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7z"/></svg>
                  </div>
                </div>
                <div className="text-3xl font-black text-gray-900">{metrics.total_applications}</div>
                <div className="text-sm text-gray-500 mt-2">7 Hari: {metrics.applications_last7}</div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-semibold text-gray-600 uppercase">Publikasi Rate</div>
                  <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6"/></svg>
                  </div>
                </div>
                <div className="text-3xl font-black text-gray-900">{metrics.total_jobs ? Math.round((metrics.published_jobs / metrics.total_jobs) * 100) : 0}%</div>
                <div className="text-sm text-gray-500 mt-2">Draft {metrics.draft_jobs}</div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-semibold text-gray-600 uppercase">Aktivitas</div>
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18"/></svg>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mt-2">Pergerakan pelamar 7 hari terakhir</div>
                <div className="mt-3"><Sparkline data={[metrics.applications_last7]} stroke="#06b6d4" /></div>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-medium text-gray-600">Profil Perusahaan</div>
          <div className="mt-2 text-lg font-semibold">{profile?.company_name}</div>
          <div className="mt-1 text-xs text-gray-500">Status: {profile?.verification_status}</div>
          <div className="mt-2 text-sm">Kelengkapan profil: <strong>{profile?.completeness}%</strong></div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between"><div className="text-sm font-medium text-gray-500">Pelamar Terbaru</div><a href={route('company.applicants.index') ?? '#'} className="text-xs text-cyan-700">Lihat semua</a></div>
          <div className="mt-2 divide-y">
            {recentApplicants.length === 0 && <div className="p-3 text-sm text-gray-500">Belum ada pelamar.</div>}
            {recentApplicants.map(a => (
              <div key={a.id} className="p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-800">{a.applicant_name}</div>
                  <div className="text-xs text-gray-500">{a.job_title}  {a.applicant_email}</div>
                </div>
                <div className="text-xs text-gray-500">{a.status}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {topJobs.length > 0 && (
        <section aria-labelledby="top-jobs" className="mb-8">
          <h2 id="top-jobs" className="text-lg font-semibold mb-3">Lowongan Paling Banyak Pelamar</h2>
          <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
            {topJobs.map(j=> (
              <div key={j.id} className="rounded-xl border bg-white p-3 shadow-sm"> 
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
        <div className="divide-y border rounded-md bg-white p-0" aria-live="polite">
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
