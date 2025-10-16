import React, { useState } from 'react';
import RoleShell from '@/Layouts/RoleShell';
import { usePage } from '@inertiajs/react';
import { resolvePrimaryRole, ROLE_ACCENTS, getAccentClasses } from '@/config/nav';
import { Link, router } from '@inertiajs/react';

export default function JobsIndex({ jobs, applied, filters }) {
  const { auth } = usePage().props;
  const role = resolvePrimaryRole(auth?.user) || 'disabled';
  const accentKey = ROLE_ACCENTS[role] || 'violet';
  const accentClasses = getAccentClasses(accentKey);
  const accentRing = accentClasses.ring;
  const accentText = accentKey === 'company-gradient' ? 'text-cyan-600' : `text-${accentKey}-600`;
  const [localFilters, setLocalFilters] = useState({
    q: filters?.q || '',
    type: filters?.type || '',
    min_salary: filters?.min_salary || '',
    max_salary: filters?.max_salary || '',
    disability_only: filters?.disability_only ?? true,
    acc_wheelchair: filters?.acc_wheelchair ?? false,
    acc_screen_reader: filters?.acc_screen_reader ?? false,
    acc_flexible_hours: filters?.acc_flexible_hours ?? false,
  });

  const submitFilters = (e) => {
    e.preventDefault();
    router.get(route('jobs.index'), localFilters, { preserveState: true, replace: true });
  };
  const applyQuick = (id) => {
    router.post(route('jobs.show', id));
  };
  return (
    <RoleShell>
      <h1 className="text-2xl font-bold mb-4">Lowongan Terbaru</h1>
  <form onSubmit={submitFilters} className="mb-6 grid gap-4 md:grid-cols-6 bg-white p-4 rounded border shadow-sm" aria-label="Filter lowongan">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium mb-1">Pencarian</label>
          <input type="text" value={localFilters.q} onChange={e=>setLocalFilters(f=>({...f,q:e.target.value}))} className="w-full border rounded px-2 py-1 text-sm" placeholder="Judul / perusahaan / lokasi" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Tipe</label>
            <select value={localFilters.type} onChange={e=>setLocalFilters(f=>({...f,type:e.target.value}))} className="w-full border rounded px-2 py-1 text-sm">
              <option value="">Semua</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="volunteer">Volunteer</option>
            </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Gaji Min</label>
          <input type="number" value={localFilters.min_salary} onChange={e=>setLocalFilters(f=>({...f,min_salary:e.target.value}))} className="w-full border rounded px-2 py-1 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Gaji Max</label>
          <input type="number" value={localFilters.max_salary} onChange={e=>setLocalFilters(f=>({...f,max_salary:e.target.value}))} className="w-full border rounded px-2 py-1 text-sm" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-medium mb-1">Akomodasi</label>
          <div className="flex flex-wrap gap-3 text-sm">
            <label className="inline-flex items-center gap-2"><input type="checkbox" checked={!!localFilters.acc_wheelchair} onChange={e=>setLocalFilters(f=>({...f, acc_wheelchair: e.target.checked}))} className={`rounded border-gray-300 ${accentText} ${accentRing}`} /> Kursi roda</label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" checked={!!localFilters.acc_screen_reader} onChange={e=>setLocalFilters(f=>({...f, acc_screen_reader: e.target.checked}))} className={`rounded border-gray-300 ${accentText} ${accentRing}`} /> Screen reader</label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" checked={!!localFilters.acc_flexible_hours} onChange={e=>setLocalFilters(f=>({...f, acc_flexible_hours: e.target.checked}))} className={`rounded border-gray-300 ${accentText} ${accentRing}`} /> Jam fleksibel</label>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Fokus Disabilitas</label>
          <div className="flex items-center gap-2">
            <input id="disability_only" type="checkbox" checked={!!localFilters.disability_only} onChange={e=>setLocalFilters(f=>({...f, disability_only: e.target.checked}))} className={`rounded border-gray-300 ${accentText} ${accentRing}`} />
            <label htmlFor="disability_only" className="text-sm">Hanya lowongan untuk penyandang disabilitas</label>
          </div>
        </div>
        <div className="md:col-span-6 flex gap-2">
          <button type="submit" className={`px-4 py-2 ${accentClasses.bg} ${accentClasses.text} ${accentClasses.hoverBg} text-sm rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ${accentRing}`}>Terapkan</button>
          <button type="button" onClick={()=> { setLocalFilters({q:'',type:'',min_salary:'',max_salary:'',disability_only:true, acc_wheelchair:false, acc_screen_reader:false, acc_flexible_hours:false}); router.get(route('jobs.index'), {}, { replace:true }); }} className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300">Reset</button>
        </div>
      </form>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {jobs?.data?.map(job => {
          const isApplied = applied?.includes(job.id);
          return (
            <div key={job.id} className="bg-white border rounded-lg p-4 flex flex-col shadow-sm">
              <div className="flex-1">
                <h2 className="font-semibold text-gray-800 line-clamp-2">{job.title}</h2>
                {job.company && <p className="text-xs text-gray-500 mt-0.5">{job.company}</p>}
                <div className="mt-2 text-xs text-gray-600 space-x-2">
                  {job.employment_type && <span className="px-2 py-0.5 bg-gray-100 rounded-full">{job.employment_type}</span>}
                  {job.location_name && <span>{job.location_name}</span>}
                  {job.disability_only && <span className="px-2 py-0.5 bg-violet-100 text-violet-700 rounded-full">Disabilitas</span>}
                </div>
                {(job.salary_min || job.salary_max) && (
                  <div className="mt-2 text-sm font-medium text-green-700">
                    Rp{job.salary_min?.toLocaleString('id-ID')} - Rp{job.salary_max?.toLocaleString('id-ID')}
                  </div>
                )}
                {job.description && <p className="text-sm text-gray-600 mt-2 line-clamp-3">{job.description}</p>}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Link href={route('jobs.show', job.id)} className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">Detail</Link>
                <Link href={route('jobs.show', job.id)} className={`px-3 py-1.5 rounded text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${isApplied ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-blue-600'}`}>{isApplied ? 'Sudah Lamar' : 'Lamar'}</Link>
              </div>
            </div>
          );
        })}
        {(!jobs || jobs.data.length === 0) && <p className="text-gray-500 text-sm">Belum ada lowongan.</p>}
      </div>
      {jobs?.links && jobs.links.length > 0 && (
        <nav className="flex flex-wrap gap-2 mt-6" aria-label="Navigasi halaman lowongan">
          {jobs.links.map((l,i)=>(
            <button key={i} disabled={!l.url} onClick={()=> l.url && router.visit(l.url, { preserveScroll:true, preserveState:true })} className={`px-3 py-1 rounded text-sm border ${l.active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-gray-50'} ${!l.url ? 'opacity-40 cursor-not-allowed' : ''}`} dangerouslySetInnerHTML={{ __html: l.label }} />
          ))}
        </nav>
      )}
    </RoleShell>
  );
}
