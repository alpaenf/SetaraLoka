import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { navForRole, resolvePrimaryRole, ROLE_ACCENTS, getAccentClasses } from '@/config/nav';
import ApplicationLogo from '@/Components/ApplicationLogo';
import submitLogout from '@/utils/logout';

export default function Navbar({ role: explicitRole }) {
  const { auth, notifications } = usePage().props;
  const user = auth?.user;
  const role = explicitRole || resolvePrimaryRole(user) || 'disabled';
  const items = navForRole(role);
  const accentKey = ROLE_ACCENTS[role] || 'violet';
  const accentClasses = getAccentClasses(accentKey);
  const [open, setOpen] = useState(false);

  // Normalize a simple accent name for constructing utility classes where needed
  const accent = accentKey === 'company-gradient' ? 'cyan' : accentKey;
  const accentRing = `focus-visible:outline-none focus-visible:ring-2 ${accentClasses.ring} focus-visible:ring-offset-2`;
  const activeBg = accentKey === 'company-gradient' ? 'bg-cyan-50' : `bg-${accent}-50`;
  const activeText = accentKey === 'company-gradient' ? 'text-cyan-700' : `text-${accent}-700`;

  return (
  <nav className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm" aria-label="Primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6 min-w-0">
            <Link href="/" className="flex items-center gap-2" aria-label="Beranda">
              <ApplicationLogo srcLight="/images/logo.png" srcDark="/images/logo.png" className="block h-8 w-auto rounded-sm bg-white" />
              <span className="hidden font-semibold sm:inline">
                <span className="text-cyan-600">Setara</span>
                <span className="text-amber-600">Loka</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-1" role="menubar">
              {items.filter(i => route().has(i.routeName)).map(i => {
                const active = route().current(i.routeName + '*');
                const isNotif = i.routeName === 'notifications.index';
                const unread = notifications?.unread_count || 0;
                return (
                  <Link
                    key={i.routeName}
                    href={route(i.routeName)}
                    onClick={(e) => { /* fallback if needed */ if (e.metaKey || e.ctrlKey) return; }}
                    className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${active ? `${activeBg} ${activeText}` : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'} ${accentRing}`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span className="flex items-center gap-2">{i.label}</span>
                    {isNotif && unread > 0 && (
                      <span className={`absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-${accent}-600 text-white text-[10px] px-1 min-w-[1.15rem] h-5`}>{unread}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700 truncate max-w-[10rem]" title={user.name}>{user.name}</span>
                <button onClick={submitLogout} className={`px-3 py-1.5 text-sm rounded-md ml-1 ${accentClasses.bg} ${accentClasses.text} ${accentClasses.hoverBg} transition ${accentRing}`} aria-label="Logout">Logout</button>
              </div>
            )}
            <button onClick={() => setOpen(o => !o)} className={`md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 ${accentRing}`} aria-expanded={open} aria-label="Toggle menu">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path className={!open ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                <path className={open ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile panel */}
      {open && (
        <div className="md:hidden border-t border-gray-100" role="menu">
          <div className="px-2 py-3 space-y-1">
            {items.filter(i => route().has(i.routeName)).map(i => {
              const active = route().current(i.routeName + '*');
              const isNotif = i.routeName === 'notifications.index';
              const unread = notifications?.unread_count || 0;
              return (
                <Link key={i.routeName} href={route(i.routeName)} onClick={() => { setOpen(false); }} className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${active ? `bg-${accent}-50 text-${accent}-700` : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`} aria-current={active ? 'page' : undefined}>
                  {i.label}
                  {isNotif && unread > 0 && (
                    <span className={`ml-auto inline-flex items-center justify-center rounded-full bg-${accent}-600 text-white text-[10px] px-1 min-w-[1.15rem] h-5`}>{unread}</span>
                  )}
                </Link>
              );
            })}
          </div>
          {user && (
            <div className="border-t border-gray-100 px-4 py-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate" title={user.name}>{user.name}</p>
                <p className="text-xs text-gray-500 truncate" title={user.email}>{user.email}</p>
              </div>
              <button onClick={submitLogout} className={`px-3 py-1.5 text-sm rounded-md ${accentClasses.bg} ${accentClasses.text} ${accentClasses.hoverBg} transition ${accentRing}`}>Logout</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
