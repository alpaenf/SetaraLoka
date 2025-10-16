import RoleShell from '@/Layouts/RoleShell';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Create() {
  const { programs } = usePage().props;
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    start_at: '',
    end_at: '',
    location_name: '',
    latitude: '',
    longitude: '',
    image: null,
    program_id: '',
    categories_input: '', // comma-separated input for UX
  });

  const submit = (e) => {
    e.preventDefault();
    // Transform categories_input -> categories array
    const cats = (data.categories_input || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    const payload = { ...data, categories: cats };
    delete payload.categories_input;
    post(route('organization.events.store'), { data: payload, forceFormData: true });
  };

  return (
    <RoleShell role="organization">
      <Head title="Buat Acara" />
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-xl font-semibold mb-4">Buat Acara</h1>
        <form onSubmit={submit} className="space-y-4 bg-white p-4 rounded-md border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Program (opsional)</label>
              <select className="mt-1 w-full rounded border-gray-300" value={data.program_id} onChange={e => setData('program_id', e.target.value)}>
                <option value="">— Tidak ada —</option>
                {programs?.map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
              {errors.program_id && <div className="text-sm text-red-600">{errors.program_id}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium">Kategori (pisahkan koma)</label>
              <input className="mt-1 w-full rounded border-gray-300" placeholder="Edukasi, Pelatihan" value={data.categories_input} onChange={e => setData('categories_input', e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Judul</label>
            <input name="title" required className="mt-1 w-full rounded border-gray-300" value={data.title} onChange={e => setData('title', e.target.value)} />
            {errors.title && <div className="text-sm text-red-600">{errors.title}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium">Deskripsi</label>
            <textarea className="mt-1 w-full rounded border-gray-300" rows="6" value={data.description} onChange={e => setData('description', e.target.value)} />
            {errors.description && <div className="text-sm text-red-600">{errors.description}</div>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Mulai</label>
              <input type="datetime-local" className="mt-1 w-full rounded border-gray-300" value={data.start_at} onChange={e => setData('start_at', e.target.value)} />
              {errors.start_at && <div className="text-sm text-red-600">{errors.start_at}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium">Selesai</label>
              <input type="datetime-local" className="mt-1 w-full rounded border-gray-300" value={data.end_at} onChange={e => setData('end_at', e.target.value)} />
              {errors.end_at && <div className="text-sm text-red-600">{errors.end_at}</div>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Lokasi</label>
            <input className="mt-1 w-full rounded border-gray-300" value={data.location_name} onChange={e => setData('location_name', e.target.value)} />
            {errors.location_name && <div className="text-sm text-red-600">{errors.location_name}</div>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Latitude</label>
              <input className="mt-1 w-full rounded border-gray-300" value={data.latitude} onChange={e => setData('latitude', e.target.value)} />
              {errors.latitude && <div className="text-sm text-red-600">{errors.latitude}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium">Longitude</label>
              <input className="mt-1 w-full rounded border-gray-300" value={data.longitude} onChange={e => setData('longitude', e.target.value)} />
              {errors.longitude && <div className="text-sm text-red-600">{errors.longitude}</div>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Gambar (pamflet)</label>
            <input type="file" accept="image/*" className="mt-1 w-full" onChange={e => setData('image', e.target.files[0])} />
            {errors.image && <div className="text-sm text-red-600">{errors.image}</div>}
          </div>
          <div className="flex items-center gap-2">
            <button disabled={processing} className="px-3 py-2 rounded bg-amber-600 text-white text-sm hover:bg-amber-500 disabled:opacity-50">Simpan</button>
            <Link href={route('organization.events')} className="px-3 py-2 rounded border text-sm">Batal</Link>
          </div>
        </form>
      </div>
    </RoleShell>
  );
}
