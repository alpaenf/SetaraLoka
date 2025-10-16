import RoleShell from '@/Layouts/RoleShell';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';

export default function Participants({ event, participants = [], checkinUrl }) {
  const onVerify = (userId) => router.post(route('events.participants.verify', { event: event.id, userId }), {}, { preserveScroll: true });
  const onUnverify = (userId) => router.post(route('events.participants.unverify', { event: event.id, userId }), {}, { preserveScroll: true });
  const [copied, setCopied] = useState(false);
  const copyUrl = async () => {
    try { await navigator.clipboard.writeText(checkinUrl); setCopied(true); setTimeout(()=>setCopied(false), 2000); } catch {}
  };
  return (
    <RoleShell>
      <Head title={`Peserta: ${event.title}`} />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Peserta – {event.title}</h1>
        <Link href={route('events.show', event.id)} className="text-sm text-emerald-700 hover:underline">Kembali ke Event</Link>
      </div>
      <div className="mb-6 p-4 border rounded-md bg-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-sm text-gray-600">QR Check-in (berlaku 12 jam):</div>
            <div className="mt-2">
              <QRCode value={checkinUrl} size={160} includeMargin />
            </div>
          </div>
          <div className="max-w-full break-all text-xs text-gray-600">
            <div className="mb-2">{checkinUrl}</div>
            <button onClick={copyUrl} className="px-3 py-1.5 rounded border text-sm bg-gray-100 hover:bg-gray-200">{copied ? 'Disalin ✓' : 'Salin Link'}</button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white rounded-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3 border-b">Nama</th>
              <th className="text-left p-3 border-b">Email</th>
              <th className="text-left p-3 border-b">Tertarik</th>
              <th className="text-left p-3 border-b">Verifikasi</th>
              <th className="text-left p-3 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {participants.length === 0 && (
              <tr>
                <td className="p-3 text-gray-600" colSpan={5}>Belum ada peserta.</td>
              </tr>
            )}
            {participants.map(p => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.name}</td>
                <td className="p-3 text-gray-600">{p.email}</td>
                <td className="p-3 text-gray-600">{p.interested_at || '-'}</td>
                <td className="p-3">
                  {p.verified_at ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-emerald-100 text-emerald-700">Terverifikasi</span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700">Belum</span>
                  )}
                </td>
                <td className="p-3 flex items-center gap-2">
                  {p.verified_at ? (
                    <button onClick={() => onUnverify(p.id)} className="text-sm px-2.5 py-1 rounded border text-gray-700 hover:bg-gray-50">Batalkan</button>
                  ) : (
                    <button onClick={() => onVerify(p.id)} className="text-sm px-2.5 py-1 rounded border bg-emerald-600 text-white hover:bg-emerald-700">Verifikasi</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </RoleShell>
  );
}
