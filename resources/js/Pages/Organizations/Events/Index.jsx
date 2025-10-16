import RoleShell from '@/Layouts/RoleShell';
import { Head, Link, usePage, router } from '@inertiajs/react';

export default function Index() {
  const { events, filters, programs } = usePage().props;
  const submitFilter = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const q = form.get('q') || undefined;
    const from = form.get('from') || undefined;
    const to = form.get('to') || undefined;
    const program_id = form.get('program_id') || undefined;
    const category = form.get('category') || undefined;
    router.get(route('organization.events'), { q, from, to, program_id, category }, { preserveState: true });
  };
  return (
    <RoleShell role="organization">
      <Head title="Acara Lembaga" />
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Acara Lembaga</h1>
          <Link href={route('organization.events.create')} className="px-3 py-2 text-sm rounded-md bg-amber-600 text-white hover:bg-amber-500">Buat Acara</Link>
        </div>
        <form onSubmit={submitFilter} className="mb-4 grid grid-cols-1 md:grid-cols-6 gap-3">
          <input name="q" defaultValue={filters?.q || ''} placeholder="Cari judul/desk..." className="rounded border-gray-300" />
          <input type="date" name="from" defaultValue={filters?.from || ''} className="rounded border-gray-300" />
          <input type="date" name="to" defaultValue={filters?.to || ''} className="rounded border-gray-300" />
          <select name="program_id" defaultValue={filters?.program_id || ''} className="rounded border-gray-300">
            <option value="">Semua Program</option>
            {programs?.map(p => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
          <input name="category" defaultValue={filters?.category || ''} placeholder="Kategori" className="rounded border-gray-300" />
          <div className="flex gap-2">
            <button className="px-3 py-2 text-sm rounded-md border">Filter</button>
            <Link href={route('organization.events')} className="px-3 py-2 text-sm rounded-md border">Reset</Link>
          </div>
        </form>
        {events?.data?.length ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.data.map(e => (
              <li key={e.id} className="rounded-lg border bg-white overflow-hidden shadow-sm hover:shadow transition">
                <Link href={route('organization.events.show', e.id)} className="block">
                  {e.image_url ? (
                    <img src={e.image_url} alt="Pamflet" className="h-40 w-full object-cover" />
                  ) : (
                    <div className="h-40 w-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center text-amber-700 text-sm">Tidak ada gambar</div>
                  )}
                </Link>
                <div className="p-3">
                  <Link href={route('organization.events.show', e.id)} className="font-medium text-gray-900 hover:underline line-clamp-2">{e.title}</Link>
                  {e.program && (
                    <div className="mt-1 text-[11px] text-amber-700">Program: {e.program.title}</div>
                  )}
                  {e.categories?.length ? (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {e.categories.map((c, idx) => (
                        <Link
                          key={idx}
                          href={route('organization.events', { ...filters, category: c || undefined })}
                          className="px-2 py-0.5 text-[11px] rounded-full bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                        >{c}</Link>
                      ))}
                    </div>
                  ) : null}
                  {e.description && (
                    <div className="mt-1 text-sm text-gray-700 line-clamp-2">{e.description}</div>
                  )}
                  <div className="mt-2 text-xs text-gray-600 space-y-0.5">
                    <div>{e.start_at || 'Tanpa Jadwal'}{e.end_at ? ` — ${e.end_at}` : ''}</div>
                    <div>{e.location_name || 'Lokasi TBA'}</div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Link href={route('organization.events.edit', e.id)} className="px-2 py-1 text-xs rounded border hover:bg-gray-50">Edit</Link>
                    <Link href={route('events.participants.index', { event: e.id })} className="px-2 py-1 text-xs rounded border hover:bg-gray-50">Peserta</Link>
                    <Link
                      as="button"
                      method="delete"
                      href={route('organization.events.destroy', e.id)}
                      onClick={(ev) => { if (!confirm('Hapus acara ini? Tindakan ini tidak dapat dibatalkan.')) ev.preventDefault(); }}
                      className="px-2 py-1 text-xs rounded border text-red-700 hover:bg-red-50"
                    >
                      Hapus
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500">Belum ada acara.</div>
        )}
        {events?.links && (
          <nav className="mt-4 flex flex-wrap gap-2">
            {events.links.map((l, idx) => (
              <Link key={idx} href={l.url || ''} dangerouslySetInnerHTML={{ __html: l.label }} className={`px-3 py-1.5 text-sm rounded border ${l.active ? 'bg-amber-50 border-amber-300 text-amber-700' : 'hover:bg-gray-50'}`} />
            ))}
          </nav>
        )}
      </div>
    </RoleShell>
  );
}
