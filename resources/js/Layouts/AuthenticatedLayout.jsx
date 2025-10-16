import RoleShell from '@/Layouts/RoleShell';
import TextSelectionTTS from '@/Components/TextSelectionTTS';
import { usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
  // Determine role from user props (primary_role shared in middleware)
  const user = usePage().props.auth.user;
  const primary = user?.primary_role;
  return (
    <RoleShell role={mapRole(primary)}>
      {header && (
        <div className="mb-6 border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-semibold tracking-tight">{header}</div>
          </div>
        </div>
      )}
      {children}
      <TextSelectionTTS />
    </RoleShell>
  );
}

function mapRole(r) {
  if (!r) return 'disabled';
  // Map backend role names to our simplified keys used in ROLE_NAV
  switch (r) {
    case 'penyandang_disabilitas': return 'disabled';
    case 'relawan': return 'volunteer';
    case 'perusahaan': return 'company';
    case 'lembaga_sosial': return 'organization';
    case 'admin': return 'admin';
    default: return 'disabled';
  }
}
