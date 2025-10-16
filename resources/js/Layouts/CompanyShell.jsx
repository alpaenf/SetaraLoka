import React from 'react';
import CompanyNavbar from '@/Components/CompanyNavbar';
import { Link, usePage } from '@inertiajs/react';

export default function CompanyShell({ children }) {
  const { company_profile } = usePage().props;
  const needsSetup = !company_profile || (company_profile && company_profile.exists === false) || (company_profile && company_profile.verification_status !== 'approved');
  const pending = company_profile && company_profile.exists !== false && company_profile.verification_status === 'pending';
  const rejected = company_profile && company_profile.verification_status === 'rejected';
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col" data-role="company">
      <CompanyNavbar />
      {needsSetup && (
        <div className={`w-full ${pending ? 'bg-amber-50 border-amber-200 text-amber-800' : rejected ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-cyan-50 border-cyan-200 text-cyan-800'} border-t border-b`}> 
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm flex items-center justify-between gap-3 flex-wrap">
            <div>
              {pending ? 'Profil perusahaan Anda sedang menunggu verifikasi admin.' : rejected ? 'Profil perusahaan Anda ditolak. Mohon perbaiki sesuai catatan dan ajukan ulang.' : 'Lengkapi profil perusahaan Anda dan ajukan verifikasi untuk membuka lowongan.'}
            </div>
            <div className="flex items-center gap-2">
              <Link href={route('company.profile.show')} className="px-3 py-1.5 rounded border border-gray-300 bg-white text-gray-700 text-xs">Lihat Profil</Link>
              <Link href={route('company.profile.edit')} className="px-3 py-1.5 rounded bg-cyan-600 text-white text-xs">{pending ? 'Perbarui' : 'Lengkapi Profil'}</Link>
            </div>
          </div>
        </div>
      )}
      <main role="main" id="main-content" tabIndex={-1} className="flex-1 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 pt-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2">
        {children}
      </main>
      {/* AccessMate intentionally hidden for company role */}
    </div>
  );
}
