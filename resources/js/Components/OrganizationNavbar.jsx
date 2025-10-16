import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import submitLogout from '@/utils/logout';
import { ROLE_ACCENTS, getAccentClasses } from '@/config/nav';

export default function OrganizationNavbar() {
  const { auth, notifications } = usePage().props;
  const user = auth?.user;
  const [open, setOpen] = useState(false);

  const items = [
    { label: 'Dashboard', route: 'dashboard.lembaga' },
    { label: 'Program', route: 'organization.programs' },
    { label: 'Acara Kami', route: 'organization.events' },
    { label: 'Profil', route: 'organization.profile' },
    { label: 'Notifikasi', route: 'notifications.index' },
  ];
  const exists = (r) => route().has(r);
  const unread = notifications?.unread_count || 0;
  const accentKey = ROLE_ACCENTS['organization'] || 'amber';
  const accentClasses = getAccentClasses(accentKey);
  return (
    <nav className={`fixed inset-x-0 top-0 z-50 border-b border-gray-200 ${accentClasses.bg.replace('bg-','bg-')} bg-white/95 backdrop-blur-sm shadow-sm`} aria-label="Organization primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href={route('dashboard.lembaga')} className="flex items-center gap-2" aria-label="SetaraLoka">
              <ApplicationLogo srcLight="/images/logo.png" srcDark="/images/logo.png" className="h-8 w-auto rounded-sm bg-white" />
              <span className="hidden sm:inline font-semibold tracking-tight">
                <span className="text-cyan-600">Setara</span>
                <span className="text-amber-600">Loka</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {items.filter(i => exists(i.route)).map(i => {
                const active = route().current(i.route + '*');
                const isNotif = i.route === 'notifications.index';
                return (
                  <Link key={i.route} href={route(i.route)} className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${active ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`} aria-current={active ? 'page' : undefined}>
                    {i.label}
                    {isNotif && unread > 0 && (
                      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-amber-600 text-white text-[10px] px-1 min-w-[1.15rem] h-5">{unread}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user && <span className="text-sm text-gray-700 max-w-[10rem] truncate" title={user.name}>{user.name}</span>}
            <button onClick={submitLogout} className={`px-3 py-1.5 rounded-md ${accentClasses.bg} ${accentClasses.text} ${accentClasses.hoverBg} text-sm focus:outline-none ${accentClasses.ring} focus:ring-offset-2`}>Logout</button>
            <button onClick={() => setOpen(o => !o)} className="md:hidden p-2 rounded-md hover:bg-gray-100 text-gray-600" aria-label="Menu" aria-expanded={open}>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-100">
          <div className="px-2 py-3 space-y-1">
            {items.filter(i => exists(i.route)).map(i => {
              const active = route().current(i.route + '*');
              const isNotif = i.route === 'notifications.index';
              return (
                <Link key={i.route} href={route(i.route)} onClick={() => setOpen(false)} className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${active ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                  {i.label}
                  {isNotif && unread > 0 && (
                    <span className="ml-auto inline-flex items-center justify-center rounded-full bg-amber-600 text-white text-[10px] px-1 min-w-[1.15rem] h-5">{unread}</span>
                  )}
                </Link>
              );
            })}
            <button onClick={submitLogout} className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${accentClasses.bg} ${accentClasses.text} ${accentClasses.hoverBg}`}>Logout</button>
          </div>
        </div>
      )}
    </nav>
  );
}
