import CompanyShell from '@/Layouts/CompanyShell';
import { useForm, usePage } from '@inertiajs/react';

export default function CompanyProfileEdit() {
  const { profile } = usePage().props;
  const { data, setData, post, processing, errors } = useForm({
    company_name: profile.company_name || '',
    industry: profile.industry || '',
    description: profile.description || '',
    address: profile.address || '',
    city: profile.city || '',
    phone: profile.phone || '',
    official_email: profile.official_email || '',
    website: profile.website || '',
    linkedin: profile.linkedin || '',
    instagram: profile.instagram || '',
    logo: null,
  });
  const submit = (e) => {
    e.preventDefault();
    post(route('company.profile.update'), { forceFormData: true });
  };
  return (
    <CompanyShell>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Edit Profil Perusahaan</h1>
        <form onSubmit={submit} className="bg-white rounded border p-4 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Perusahaan</label>
              <input value={data.company_name} onChange={e=> setData('company_name', e.target.value)} className="w-full border rounded px-3 py-2 text-sm" />
              {errors.company_name && <p className="text-red-600 text-sm mt-1">{errors.company_name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bidang Usaha / Industri</label>
              <input value={data.industry} onChange={e=> setData('industry', e.target.value)} placeholder="Misal: IT, Pendidikan, Logistik" className="w-full border rounded px-3 py-2 text-sm" />
              {errors.industry && <p className="text-red-600 text-sm mt-1">{errors.industry}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Telepon</label>
              <input value={data.phone} onChange={e=> setData('phone', e.target.value)} className="w-full border rounded px-3 py-2 text-sm" />
              {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Alamat</label>
              <input value={data.address} onChange={e=> setData('address', e.target.value)} className="w-full border rounded px-3 py-2 text-sm" />
              {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Kota / Wilayah Operasi</label>
              <input value={data.city} onChange={e=> setData('city', e.target.value)} className="w-full border rounded px-3 py-2 text-sm" />
              {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Deskripsi</label>
              <textarea value={data.description} onChange={e=> setData('description', e.target.value)} className="w-full border rounded px-3 py-2 text-sm" rows={5} />
              {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
            </div>
            <div className="sm:col-span-2 grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email Resmi</label>
                <input value={data.official_email} onChange={e=> setData('official_email', e.target.value)} type="email" className="w-full border rounded px-3 py-2 text-sm" />
                {errors.official_email && <p className="text-red-600 text-sm mt-1">{errors.official_email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Website Resmi</label>
                <input value={data.website} onChange={e=> setData('website', e.target.value)} placeholder="https://" className="w-full border rounded px-3 py-2 text-sm" />
                {errors.website && <p className="text-red-600 text-sm mt-1">{errors.website}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">LinkedIn</label>
                <input value={data.linkedin} onChange={e=> setData('linkedin', e.target.value)} placeholder="https://linkedin.com/company/..." className="w-full border rounded px-3 py-2 text-sm" />
                {errors.linkedin && <p className="text-red-600 text-sm mt-1">{errors.linkedin}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Instagram</label>
                <input value={data.instagram} onChange={e=> setData('instagram', e.target.value)} placeholder="https://instagram.com/..." className="w-full border rounded px-3 py-2 text-sm" />
                {errors.instagram && <p className="text-red-600 text-sm mt-1">{errors.instagram}</p>}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Logo (PNG/JPG, maks 2MB)</label>
              <input type="file" accept="image/*" onChange={e=> setData('logo', e.target.files[0])} className="block text-sm" />
              {errors.logo && <p className="text-red-600 text-sm mt-1">{errors.logo}</p>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button disabled={processing} className="px-4 py-2 rounded bg-cyan-600 text-white">Simpan</button>
            <a href={route('company.profile.show')} className="text-sm underline">Batal</a>
          </div>
        </form>
      </div>
    </CompanyShell>
  );
}
