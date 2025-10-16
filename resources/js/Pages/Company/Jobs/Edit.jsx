import { useForm, Link, usePage, router } from '@inertiajs/react';
import CompanyShell from '@/Layouts/CompanyShell';
import { useEffect, useState } from 'react';

export default function CompanyJobEdit() {
  const { job } = usePage().props;
  const { data, setData, put, processing, errors } = useForm({
    title: job.title || '',
    description: job.description || '',
    employment_type: job.employment_type || '',
    location_name: job.location_name || '',
    latitude: job.latitude || '',
    longitude: job.longitude || '',
    salary_min: job.salary_min || '',
    salary_max: job.salary_max || '',
    requirements: job.requirements?.length ? job.requirements : [''],
    benefits: job.benefits?.length ? job.benefits : [''],
    publish: job.published,
    disability_only: job.disability_only ?? true,
    accommodations: job.accommodations || '',
  });
  const [reqs, setReqs] = useState(data.requirements);
  const [bens, setBens] = useState(data.benefits);
  const [formError, setFormError] = useState('');
  const [summarizing, setSummarizing] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setFormError('');
    const min = Number(data.salary_min || 0);
    const max = Number(data.salary_max || 0);
    if (data.salary_min && data.salary_max && min > max) {
      setFormError('Gaji minimum tidak boleh lebih besar dari gaji maksimum.');
      return;
    }
    const payload = { ...data, requirements: reqs.filter(r => r.trim() !== ''), benefits: bens.filter(b => b.trim() !== '') };
    router.put(route('company.jobs.update', job.id), payload);
  };

  const updateReq = (i, val) => setReqs(o => o.map((r,idx)=> idx===i?val:r));
  const updateBen = (i, val) => setBens(o => o.map((r,idx)=> idx===i?val:r));
  const handlePasteToList = (setter) => (e) => {
    const text = e.clipboardData.getData('text');
    if (text && text.includes('\n')) {
      e.preventDefault();
      const lines = text.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
      setter(lines.length ? lines : ['']);
    }
  };
  const summarize = async () => {
    try {
      setSummarizing(true);
      const res = await fetch(route('ai.summarize'), { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content }, body: JSON.stringify({ text: data.description }) });
      if (!res.ok) throw new Error('Summarize gagal');
      const json = await res.json();
      const summary = json?.summary || json?.text || '';
      if (summary) setData('description', summary);
    } catch (e) { console.warn(e); }
    finally { setSummarizing(false); }
  };

  const salaryText = () => {
    const min = data.salary_min ? Number(data.salary_min) : null;
    const max = data.salary_max ? Number(data.salary_max) : null;
    if (min && max) return `Rp${min.toLocaleString('id-ID')} - Rp${max.toLocaleString('id-ID')}`;
    if (min) return `Mulai Rp${min.toLocaleString('id-ID')}`;
    if (max) return `Hingga Rp${max.toLocaleString('id-ID')}`;
    return '—';
  };

  return (
    <CompanyShell>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Lowongan</h1>
          <p className="text-sm text-gray-600">Perbarui informasi lowongan.</p>
        </div>
        <Link href={route('company.jobs.index')} className="text-sm text-cyan-700 hover:underline">Kembali</Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form onSubmit={submit} className="space-y-6 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Judul *</label>
            <input value={data.title} onChange={e=>setData('title', e.target.value)} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
            {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipe Pekerjaan *</label>
            <input value={data.employment_type} onChange={e=>setData('employment_type', e.target.value)} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
            {errors.employment_type && <p className="text-xs text-red-600 mt-1">{errors.employment_type}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Lokasi</label>
            <input value={data.location_name} onChange={e=>setData('location_name', e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
            {errors.location_name && <p className="text-xs text-red-600 mt-1">{errors.location_name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Latitude</label>
            <input value={data.latitude} onChange={e=>setData('latitude', e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
            {errors.latitude && <p className="text-xs text-red-600 mt-1">{errors.latitude}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Longitude</label>
            <input value={data.longitude} onChange={e=>setData('longitude', e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
            {errors.longitude && <p className="text-xs text-red-600 mt-1">{errors.longitude}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gaji Minimum</label>
            <input type="number" value={data.salary_min} onChange={e=>setData('salary_min', e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
            {errors.salary_min && <p className="text-xs text-red-600 mt-1">{errors.salary_min}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gaji Maksimum</label>
            <input type="number" value={data.salary_max} onChange={e=>setData('salary_max', e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
            {errors.salary_max && <p className="text-xs text-red-600 mt-1">{errors.salary_max}</p>}
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Deskripsi *</label>
            <textarea rows="6" value={data.description} onChange={e=>setData('description', e.target.value)} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
            <div className="mt-2 flex gap-2">
              <button type="button" onClick={summarize} disabled={summarizing || !data.description} className="px-3 py-1.5 rounded border border-cyan-300 text-cyan-700 text-xs hover:bg-cyan-50 disabled:opacity-50">{summarizing ? 'Merangkum...' : 'Rangkum Deskripsi'}</button>
            </div>
            {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
          </div>
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2">
              <input id="disability_only" type="checkbox" checked={data.disability_only} onChange={e=>setData('disability_only', e.target.checked)} className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
              <label htmlFor="disability_only" className="text-sm text-gray-700">Khusus Penyandang Disabilitas</label>
            </div>
            <p className="text-xs text-gray-500 mt-1">Centang jika lowongan ini diprioritaskan untuk penyandang disabilitas.</p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Persyaratan</label>
            <div className="space-y-2">
              {reqs.map((r,i)=>(
                <input key={i} value={r} onChange={e=>updateReq(i,e.target.value)} onPaste={handlePasteToList(setReqs)} placeholder={`Persyaratan ${i+1}`} className="w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
              ))}
              <button type="button" onClick={()=>setReqs(o=>[...o,''])} className="text-xs text-cyan-700 hover:underline">+ Tambah</button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Benefit</label>
            <div className="space-y-2">
              {bens.map((r,i)=>(
                <input key={i} value={r} onChange={e=>updateBen(i,e.target.value)} onPaste={handlePasteToList(setBens)} placeholder={`Benefit ${i+1}`} className="w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
              ))}
              <button type="button" onClick={()=>setBens(o=>[...o,''])} className="text-xs text-cyan-700 hover:underline">+ Tambah</button>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Akomodasi untuk Disabilitas</label>
            <textarea rows="4" value={data.accommodations} onChange={e=>setData('accommodations', e.target.value)} placeholder="Contoh: Akses kursi roda, interview via teks, jam kerja fleksibel" className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
            {errors.accommodations && <p className="text-xs text-red-600 mt-1">{errors.accommodations}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
            <input id="publish" type="checkbox" checked={data.publish} onChange={e=>setData('publish', e.target.checked)} className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
            <label htmlFor="publish" className="text-sm text-gray-700">Published</label>
        </div>
        <div>
          {formError && <div className="mb-3 text-sm text-red-600">{formError}</div>}
          <button disabled={processing} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-cyan-600 text-white text-sm font-medium shadow hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-50">
            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
        </form>
        <aside className="lg:col-span-1">
          <div className="sticky top-4 space-y-4">
            <div className="border rounded-lg bg-white shadow-sm p-4">
              <div className="text-xs text-gray-500 mb-1">Preview</div>
              <div className="font-semibold text-gray-800">{data.title || 'Judul Lowongan'}</div>
              <div className="text-xs text-gray-500">{data.location_name || 'Lokasi'}</div>
              <div className="mt-2 text-sm font-medium text-green-700">{salaryText()}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.employment_type && <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100">{data.employment_type}</span>}
                {data.disability_only && <span className="text-xs px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">Disabilitas</span>}
              </div>
              <p className="mt-3 text-xs text-gray-600 line-clamp-3">{data.description || 'Deskripsi singkat akan tampil di sini.'}</p>
              <div className="mt-3 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1 inline-block">Status: Menunggu persetujuan admin</div>
            </div>
            <div className="border rounded-lg bg-white shadow-sm p-4">
              <div className="font-semibold text-sm mb-2">Tips Inklusif</div>
              <ul className="text-xs text-gray-700 list-disc pl-5 space-y-1">
                <li>Gunakan bahasa yang jelas dan ramah.</li>
                <li>Jelaskan akomodasi yang tersedia.</li>
                <li>Hindari persyaratan fisik yang tidak relevan.</li>
                <li>Berikan opsi proses seleksi yang fleksibel.</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </CompanyShell>
  );
}
