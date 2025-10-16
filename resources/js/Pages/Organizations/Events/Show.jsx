import RoleShell from '@/Layouts/RoleShell';
import { Head, Link, usePage } from '@inertiajs/react';
import QRCode from 'qrcode.react';

export default function Show() {
  const { event } = usePage().props;
  return (
    <RoleShell role="organization">
      <Head title={event.title} />
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-xl font-semibold">{event.title}</h1>
          <div className="flex items-center gap-2">
            <Link href={route('organization.events.edit', event.id)} className="px-3 py-2 text-sm rounded border">Edit</Link>
            <Link as="button" method="delete" href={route('organization.events.destroy', event.id)} className="px-3 py-2 text-sm rounded border text-red-600">Hapus</Link>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Link href={route('events.participants.index', { event: event.id })} className="px-3 py-1.5 text-xs rounded border hover:bg-gray-50">Kelola Peserta</Link>
          <Link href={route('events.show', { event: event.id })} className="px-3 py-1.5 text-xs rounded border hover:bg-gray-50">Lihat Halaman Publik</Link>
        </div>
        <div className="rounded-md border bg-white p-3 mb-4">
          <div className="text-sm font-medium mb-2">QR Check-in</div>
          <div className="flex items-center gap-4">
            <QRCode value={route('events.checkin', { event: event.id }, true)} size={112} />
            <div className="text-xs text-gray-600 break-all">
              <div className="mb-2">Tautan check-in (ditandatangani):</div>
              <code>{route('events.checkin', { event: event.id }, true)}</code>
              <div className="mt-2 flex gap-2">
                <button onClick={() => navigator.clipboard.writeText(route('events.checkin', { event: event.id }, true))} className="px-2 py-1 rounded border text-xs hover:bg-gray-50">Salin Link</button>
              </div>
            </div>
          </div>
        </div>
        {event.image_url && (
          <img src={event.image_url} alt="Pamflet" className="mb-3 w-full max-h-64 object-cover rounded border" />
        )}
        <div className="text-sm text-gray-500 mb-2">{event.start_at || 'Tanpa Jadwal'}{event.end_at ? ` - ${event.end_at}` : ''} · {event.location_name || 'Lokasi TBA'}</div>
        <div className="prose max-w-none">
          {event.description ? (
            <p className="whitespace-pre-line">{event.description}</p>
          ) : (
            <p className="text-gray-500 italic">Belum ada deskripsi.</p>
          )}
        </div>
      </div>
    </RoleShell>
  );
}
