import RoleShell from '@/Layouts/RoleShell';
import { Head, Link } from '@inertiajs/react';

export default function OrganizationProfile({ profile = {} }) {
  return (
    <RoleShell role="organization">
      <Head title="Profil Lembaga" />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Profil Lembaga</h1>
        <Link href={route('organization.profile.edit')} className="px-3 py-2 text-sm rounded-md bg-amber-600 text-white hover:bg-amber-500">Edit</Link>
      </div>
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="flex items-start gap-4 mb-4">
          {profile.logo_url ? (
            <img src={profile.logo_url} alt="Logo" className="h-20 w-20 object-cover rounded border" />
          ) : (
            <div className="h-20 w-20 rounded border flex items-center justify-center text-xs text-gray-400">No Logo</div>
          )}
          <div>
            <div className="text-lg font-semibold">{profile.org_name || '—'}</div>
            <div className="text-sm text-gray-600">{profile.city || '—'}</div>
            <div className="text-sm text-gray-600">
              {profile.website && (<a className="hover:underline" href={profile.website} target="_blank" rel="noreferrer">{profile.website}</a>)}
            </div>
          </div>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm text-gray-600">Telepon</dt>
            <dd className="font-medium text-gray-900">{profile.phone || '—'}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-600">Email</dt>
            <dd className="font-medium text-gray-900">{profile.email || '—'}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm text-gray-600">Alamat</dt>
            <dd className="font-medium text-gray-900">{profile.address || '—'}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm text-gray-600">Deskripsi</dt>
            <dd className="text-gray-900 whitespace-pre-line">{profile.description || '—'}</dd>
          </div>
        </dl>
      </div>
    </RoleShell>
  );
}
