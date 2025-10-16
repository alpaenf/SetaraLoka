// Central navigation registry mapping roles to navigation items.
// Each item: { label, routeName, icon (optional emoji), roles?: override inclusion }
// Roles: admin, company, organization, volunteer, disabled

export const ROLE_ORDER = ['volunteer', 'disabled', 'company', 'organization', 'admin'];

export const ROLE_ACCENTS = {
  disabled: 'cyan',
  volunteer: 'emerald',
  // company uses combined cyan + amber accent for a professional gradient
  company: 'company-gradient',
  organization: 'amber',
  admin: 'rose',
};

// Return Tailwind utility class strings for a role accent.
export function getAccentClasses(accentKey) {
  switch (accentKey) {
    case 'company-gradient':
      return {
        bg: 'bg-gradient-to-r from-cyan-500 to-amber-400',
        hoverBg: 'hover:from-cyan-600 hover:to-amber-500',
        ring: 'focus-visible:ring-cyan-400',
        text: 'text-white'
      };
    default:
      // default single color key (emerald, violet, amber, rose, cyan, etc.)
      return {
        bg: (k => `bg-${k}-600`)(accentKey),
        hoverBg: (k => `hover:bg-${k}-500`)(accentKey),
        ring: (k => `focus-visible:ring-${k}-500`)(accentKey),
        text: 'text-white'
      };
  }
}

// Base items reused across roles
const base = {
  // dashboard routeName disesuaikan per role nanti saat cloning array
  dashboard: { label: 'Dashboard', routeName: 'dashboard', icon: '🏠' },
  posts: { label: 'Forum', routeName: 'posts.index', icon: '💬' },
  events: { label: 'Acara', routeName: 'events.index', icon: '🗓️' },
  jobs: { label: 'Lowongan', routeName: 'jobs.index', icon: '💼' },
  resumes: { label: 'Resume', routeName: 'resumes.index', icon: '📄' },
  notifications: { label: 'Notifikasi', routeName: 'notifications.index', icon: '🔔' },
  resources: { label: 'Sumber Daya', routeName: 'resources.index', icon: '📚' }, // to implement later
  programs: { label: 'Program', routeName: 'organization.programs', icon: '📋' },
  organizationEvents: { label: 'Acara Kami', routeName: 'organization.events', icon: '🗓️' },
  profile: { label: 'Profil', routeName: 'organization.profile', icon: '👤' },
  volunteerProfile: { label: 'Profil', routeName: 'volunteer.profile', icon: '👤' },
  disabledProfile: { label: 'Profil', routeName: 'disabled.profile', icon: '👤' },
  volunteerOpportunities: { label: 'Peluang', routeName: 'volunteer.opportunities', icon: '🤝' },
  volunteerCertificates: { label: 'Sertifikat', routeName: 'volunteer.certificates', icon: '📜' },
};

export const ROLE_NAV = {
  disabled: [{ ...base.dashboard, routeName: 'dashboard.disabilitas' }, base.posts, base.events, base.jobs, base.resumes, base.disabledProfile, base.notifications],
  volunteer: [
    { ...base.dashboard, routeName: 'dashboard.relawan' },
    base.jobs,
    base.volunteerOpportunities,
    base.posts,
    base.events,
    base.resumes,
    base.volunteerProfile,
    base.volunteerCertificates,
    base.notifications
  ],
  company: [{ ...base.dashboard, routeName: 'dashboard.perusahaan' }, base.posts, base.events, base.jobs, base.notifications],
  organization: [
    { ...base.dashboard, routeName: 'dashboard.lembaga' },
    base.programs,
    base.organizationEvents,
    base.profile,
    base.notifications
  ],
  admin: [base.dashboard, base.posts, base.events, base.jobs, base.notifications], // admin tetap generic /dashboard redirect ke filament
};

export function resolvePrimaryRole(user) {
  if (!user) return null;
  // Prefer normalized role names from backend
  const roleNames = user.role_names_normalized || user.role_names || user.roles || [];
  if (Array.isArray(roleNames)) {
    for (const r of ROLE_ORDER) {
      if (roleNames.includes(r)) return r;
    }
  } else if (typeof roleNames === 'string') {
    return ROLE_ORDER.includes(roleNames) ? roleNames : null;
  }
  return null;
}

export function navForRole(role) {
  return ROLE_NAV[role] || ROLE_NAV['disabled'];
}
