import React, { useMemo } from 'react';
import { usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import VolunteerNavbar from '@/Components/VolunteerNavbar';
import OrganizationNavbar from '@/Components/OrganizationNavbar';
import AccessMate from '@/Components/AccessMate';
import { resolvePrimaryRole, ROLE_ACCENTS, getAccentClasses } from '@/config/nav';

export default function RoleShell({ children, role: explicitRole, highContrast = false, darkMode = false }) {
  const { auth } = usePage().props;
  const user = auth?.user;
  
  // Validate that the user actually has the requested role
  const userRoles = user?.role_names_normalized || [];
  const requestedRole = explicitRole || user?.primary_role || resolvePrimaryRole(user);
  
  // If an explicit role is requested but the user doesn't have it, ignore it and use their primary role
  const hasRequestedRole = requestedRole && userRoles.includes(requestedRole);
  const role = (explicitRole && !hasRequestedRole) 
    ? (user?.primary_role || resolvePrimaryRole(user) || 'disabled')
    : (requestedRole || 'disabled');
    
  const accentKey = ROLE_ACCENTS[role] || 'violet';
  const accent = getAccentClasses(accentKey);

  // Could inject CSS variables if needed later.
  const className = useMemo(() => 'min-h-screen bg-gray-50 text-gray-900 flex flex-col', []);

  return (
    <div className={className + (highContrast ? ' hc-mode' : '') + (darkMode ? ' dark' : '')} data-role={role} data-hc={highContrast ? '1' : '0'} data-dark={darkMode ? '1' : '0'}>
      {/* Use the unified Navbar for all roles to ensure consistent UI and logout behavior. */}
      <Navbar role={role} />
      <div className="flex-1 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 pt-20" id="main-content" tabIndex={-1}>
        {children}
      </div>
      {role === 'disabled' && <AccessMate />}
    </div>
  );
}
