import RoleShell from '@/Layouts/RoleShell';
import { Head, Link } from '@inertiajs/react';

export default function Programs({ programs = [] }) {
  return (
    <RoleShell role="organization">
      <Head title="Program Lembaga" />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Program Lembaga</h1>
        <Link href="#" className="text-sm text-amber-700 hover:underline">Tambah Program (coming soon)</Link>
      </div>
      {programs.length === 0 ? (
        <p className="text-gray-600">Belum ada program yang terdaftar.</p>
      ) : (
        <ul className="space-y-3">
          {programs.map((p) => (
            <li key={p.id} className="rounded-lg border bg-white p-4 shadow-sm">
              <div className="font-medium text-gray-900">{p.title}</div>
              <div className="text-sm text-gray-600">{p.description}</div>
            </li>
          ))}
        </ul>
      )}
    </RoleShell>
  );
}
