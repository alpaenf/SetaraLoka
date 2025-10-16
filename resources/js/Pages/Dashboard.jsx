import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Sparkline from '@/Components/Sparkline';

export default function Dashboard() {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        fetch(route('dashboard.stats'))
            .then(r => r.ok ? r.json() : Promise.reject(r))
            .then(json => { if (mounted) { setStats(json); setLoading(false); }})
            .catch(() => { if (mounted) { setError('Gagal memuat statistik'); setLoading(false); }});
        return () => { mounted = false; };
    }, []);

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Welcome strip */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm text-gray-500">Selamat datang kembali,</div>
                            <div className="text-2xl font-semibold text-gray-900">{user?.name || 'Pengguna'}</div>
                        </div>
                        <div className="flex gap-2">
                            <Link href={route('organization.events')} className="px-3 py-2 text-sm rounded-md border hover:bg-gray-50">Kelola Acara</Link>
                            <Link href={route('organization.programs')} className="px-3 py-2 text-sm rounded-md border hover:bg-gray-50">Kelola Program</Link>
                        </div>
                    </div>

                    {/* Stat cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {loading ? (
                            [...Array(4)].map((_, i) => (
                                <div key={i} className="rounded-lg border bg-white p-4 animate-pulse h-28" />
                            ))
                        ) : error ? (
                            <div className="col-span-4 text-sm text-red-600">{error}</div>
                        ) : (
                            <>
                                <StatCard label="Pengguna" value={stats?.totals?.users} />
                                <StatCard label="Posting" value={stats?.totals?.posts} series={stats?.series?.posts} color="#2563eb" />
                                <StatCard label="Acara" value={stats?.totals?.events} series={stats?.series?.events} color="#059669" />
                                <StatCard label="Lowongan" value={stats?.totals?.jobs} />
                            </>
                        )}
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <QuickLink title="Buat Acara" href={route('organization.events.create')} desc="Tambah acara baru untuk lembaga Anda" />
                        <QuickLink title="Buat Program" href={route('organization.programs.create')} desc="Kelola inisiatif/seri kegiatan" />
                        <QuickLink title="Profil Lembaga" href={route('organization.profile.edit')} desc="Perbarui logo dan informasi lembaga" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ label, value = 0, series = [], color = '#2563eb' }) {
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
