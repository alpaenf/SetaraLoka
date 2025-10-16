import React from 'react';
import RoleShell from '@/Layouts/RoleShell';

export default function DashboardLayout({ title, description, children, actions, role }) {
  return (
  <RoleShell role={role}>
      <main className="p-6 space-y-6" aria-labelledby="page-title">
        <header className="space-y-1">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 id="page-title" className="text-3xl font-bold tracking-tight">{title}</h1>
              {description && <p className="text-gray-600">{description}</p>}
            </div>
            <div className="flex items-center gap-2">
              {actions}
            </div>
          </div>
        </header>
        <div className="space-y-8">
          {children}
        </div>
      </main>
    </RoleShell>
  );
}
