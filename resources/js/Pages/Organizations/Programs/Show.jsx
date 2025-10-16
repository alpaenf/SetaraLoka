import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import RoleShell from '@/Layouts/RoleShell';

export default function Show() {
  const { program } = usePage().props;
  return (
    <RoleShell role="organization">
      <Head title={program.title} />
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-xl font-semibold">{program.title}</h1>
          <div className="flex items-center gap-2">
            <Link href={route('organization.programs.edit', program.id)} className="px-3 py-2 text-sm rounded border">Edit</Link>
            <Link as="button" method="delete" href={route('organization.programs.destroy', program.id)} className="px-3 py-2 text-sm rounded border text-red-600">Hapus</Link>
          </div>
        </div>
        <div className="text-sm text-gray-500 mb-2">Status: {program.status || 'draft'} · {program.created_at}</div>
        <div className="prose max-w-none">
          {program.description ? (
            <p className="whitespace-pre-line">{program.description}</p>
          ) : (
            <p className="text-gray-500 italic">Belum ada deskripsi.</p>
          )}
        </div>
      </div>
    </RoleShell>
  );
}
