import RoleShell from '@/Layouts/RoleShell';
import { Head, Link } from '@inertiajs/react';

export default function OrganizationEvents({ events = [] }) {
  return (
    <RoleShell role="organization">
      <Head title="Acara Lembaga" />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Acara Lembaga</h1>
        <Link href={route('events.index')} className="text-sm text-amber-700 hover:underline">Lihat Semua Acara</Link>
      </div>
      {events.length === 0 ? (
        <p className="text-gray-600">Belum ada acara yang dibuat.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((e) => (
            <li key={e.id} className="rounded-lg border bg-white p-4 shadow-sm">
              <div className="font-medium text-gray-900">{e.title}</div>
              <div className="text-sm text-gray-600 mt-1">{e.date}</div>
              <Link href={route('events.show', e.id)} className="text-sm text-amber-700 hover:underline mt-2 inline-block">Detail</Link>
            </li>
          ))}
        </ul>
      )}
    </RoleShell>
  );
}
