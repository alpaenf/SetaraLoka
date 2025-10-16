import DashboardLayout from '../../Layouts/DashboardLayout';
import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import SkeletonCard from '../../Components/SkeletonCard';
import Sparkline from '../../Components/Sparkline';

export default function Organization() {
  const { auth } = usePage().props;
  const user = auth?.user;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    let active = true;
    fetch(route('dashboard.stats'))
      .then(r => r.ok ? r.json() : Promise.reject(r))
      .then(json => { if (active) { setData(json); setLoading(false); } })
      .catch(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  return (
    <DashboardLayout
      role="organization"
      title="Dashboard Lembaga"
      description={`Selamat datang, ${user?.name || 'Lembaga'}. Kelola acara, program, dan profil Anda dari satu tempat.`}
      actions={
        <div className="flex gap-2">
          <Link href={route('organization.events.create')} className="px-3 py-2 text-sm rounded-md border hover:bg-gray-50">Buat Acara</Link>
          <Link href={route('organization.programs.create')} className="px-3 py-2 text-sm rounded-md border hover:bg-gray-50">Buat Program</Link>
        </div>
      }
    >
      {/* Statistik */}
      <section aria-labelledby="org-metrics" className="mb-2">
        <h2 id="org-metrics" className="sr-only">Statistik</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            <>
              <Stat label="Pengguna" value={data?.totals?.users} />
              <Stat label="Posting" value={data?.totals?.posts} series={data?.series?.posts} color="#6366f1" />
              <Stat label="Acara" value={data?.totals?.events} series={data?.series?.events} color="#16a34a" />
              <Stat label="Lowongan" value={data?.totals?.jobs} />
            </>
          )}
        </div>
      </section>

      {/* Aksi cepat */}
      <section aria-labelledby="org-quick" className="mb-2">
        <h2 id="org-quick" className="sr-only">Aksi cepat</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <QuickLink title="Kelola Acara" href={route('organization.events')} desc="Lihat, edit, dan kelola acara lembaga" />
          <QuickLink title="Kelola Program" href={route('organization.programs')} desc="Kelola inisiatif/seri kegiatan" />
          <QuickLink title="Profil Lembaga" href={route('organization.profile.edit')} desc="Perbarui logo dan informasi lembaga" />
        </div>
      </section>

      {/* Agenda (placeholder ringan) */}
      <section aria-labelledby="org-agenda" className="mt-4">
        <h2 id="org-agenda" className="text-lg font-semibold mb-3">Agenda Mendatang</h2>
        <div className="rounded-md border bg-white p-4 text-sm text-gray-600">
          Sinkronisasi agenda spesifik lembaga bisa ditambahkan selanjutnya. Untuk sekarang, Anda dapat membuat acara baru atau melihat daftar acara aktif Anda di halaman Kelola Acara.
        </div>
      </section>
    </DashboardLayout>
  );
}

function Stat({ label, value = 0, series = [], color = '#2563eb' }) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-gray-900">{value}</div>
      {series?.length ? (
        <div className="mt-2">
          <Sparkline data={series} stroke={color} height={36} />
        </div>
      ) : null}
    </div>
  );
}

function QuickLink({ title, href, desc }) {
  return (
    <Link href={href} className="rounded-lg border bg-white p-4 hover:shadow-sm transition block">
      <div className="font-medium text-gray-900">{title}</div>
      <div className="text-sm text-gray-600 mt-1">{desc}</div>
    </Link>
  );
}
