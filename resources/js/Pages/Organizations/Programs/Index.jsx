import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import RoleShell from '@/Layouts/RoleShell';

export default function Index() {
  const { programs } = usePage().props;
  return (
    <RoleShell role="organization">
      <Head title="Program Lembaga" />
      <div className="max-w-5xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Program Lembaga</h1>
          <Link href={route('organization.programs.create')} className="px-3 py-2 text-sm rounded-md bg-amber-600 text-white hover:bg-amber-500">Buat Program</Link>
        </div>
        {programs?.data?.length ? (
          <ul className="divide-y divide-gray-100 bg-white rounded-md border">
            {programs.data.map(p => (
              <li key={p.id} className="p-4 flex items-center justify-between">
                <div>
                  <Link href={route('organization.programs.show', p.id)} className="font-medium text-gray-900 hover:underline">{p.title}</Link>
                  <div className="text-xs text-gray-500">Status: {p.status || 'draft'} · {p.created_at}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={route('organization.programs.edit', p.id)} className="px-2 py-1 text-xs rounded border hover:bg-gray-50">Edit</Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500">Belum ada program.</div>
        )}
        {programs?.links && (
          <nav className="mt-4 flex flex-wrap gap-2">
            {programs.links.map((l, idx) => (
              <Link key={idx} href={l.url || ''} dangerouslySetInnerHTML={{ __html: l.label }} className={`px-3 py-1.5 text-sm rounded border ${l.active ? 'bg-amber-50 border-amber-300 text-amber-700' : 'hover:bg-gray-50'}`} />
            ))}
          </nav>
        )}
      </div>
    </RoleShell>
  );
}
