import RoleShell from '@/Layouts/RoleShell';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function ProfileEdit() {
  const { profile } = usePage().props;
  const { data, setData, post, processing, errors } = useForm({
    org_name: profile?.org_name || '',
    city: profile?.city || '',
    website: profile?.website || '',
    phone: profile?.phone || '',
    email: profile?.email || '',
    address: profile?.address || '',
    description: profile?.description || '',
    logo: null,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('organization.profile.update'), { forceFormData: true });
  };

  return (
    <RoleShell role="organization">
      <Head title="Edit Profil Lembaga" />
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-xl font-semibold mb-4">Edit Profil Lembaga</h1>
        <form onSubmit={submit} className="space-y-4 bg-white p-4 rounded-md border">
          <div>
            <label className="block text-sm font-medium">Nama Lembaga</label>
            <input className="mt-1 w-full rounded border-gray-300" value={data.org_name} onChange={e => setData('org_name', e.target.value)} />
            {errors.org_name && <div className="text-sm text-red-600">{errors.org_name}</div>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Kota</label>
              <input className="mt-1 w-full rounded border-gray-300" value={data.city} onChange={e => setData('city', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium">Website</label>
              <input className="mt-1 w-full rounded border-gray-300" value={data.website} onChange={e => setData('website', e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Telepon</label>
              <input className="mt-1 w-full rounded border-gray-300" value={data.phone} onChange={e => setData('phone', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input className="mt-1 w-full rounded border-gray-300" type="email" value={data.email} onChange={e => setData('email', e.target.value)} />
              {errors.email && <div className="text-sm text-red-600">{errors.email}</div>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Alamat</label>
            <input className="mt-1 w-full rounded border-gray-300" value={data.address} onChange={e => setData('address', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Deskripsi</label>
            <textarea className="mt-1 w-full rounded border-gray-300" rows="6" value={data.description} onChange={e => setData('description', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Logo</label>
            {profile.logo_url && (
              <div className="flex items-center gap-3 mt-1">
                <img src={profile.logo_url} alt="Logo" className="h-16 w-16 object-cover rounded border" />
                <Link as="button" method="delete" href={route('organization.profile.logo.destroy')} className="px-2 py-1 text-xs rounded border text-red-600 hover:bg-red-50">Hapus Logo</Link>
              </div>
            )}
            <input type="file" accept="image/*" className="mt-1 w-full" onChange={e => setData('logo', e.target.files[0])} />
            {errors.logo && <div className="text-sm text-red-600">{errors.logo}</div>}
          </div>
          <div className="flex items-center gap-2">
            <button disabled={processing} className="px-3 py-2 rounded bg-amber-600 text-white text-sm hover:bg-amber-500 disabled:opacity-50">Simpan</button>
            <Link href={route('organization.profile')} className="px-3 py-2 rounded border text-sm">Batal</Link>
          </div>
        </form>
      </div>
    </RoleShell>
  );
}
