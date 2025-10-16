import { useForm, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import RoleShell from '@/Layouts/RoleShell';
import CompanyShell from '@/Layouts/CompanyShell';
import { resolvePrimaryRole } from '@/config/nav';

export default function Index({ notifications }) {
  const { post } = useForm();
  const { auth } = usePage().props;
  const role = auth?.user?.primary_role || resolvePrimaryRole(auth?.user) || 'disabled';
  const markAll = (e) => { e.preventDefault(); post(route('notifications.readAll')); };
  const sendTest = (e) => { e.preventDefault(); post(route('push.test')); };
  const [subscribed, setSubscribed] = useState(false);
  const [permission, setPermission] = useState(typeof Notification !== 'undefined' ? Notification.permission : 'default');

  useEffect(() => {
    let interval;
    function check() {
      try {
        if (window.OneSignal) {
          window.OneSignal.isSubscribed().then(setSubscribed);
        }
        setPermission(typeof Notification !== 'undefined' ? Notification.permission : 'unknown');
      } catch {}
    }
    check();
    interval = setInterval(check, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleSub = async () => {
    if (!window.OneSignal) return;
    if (permission === 'default') {
      try { await window.OneSignal.Notifications.requestPermission(); } catch {}
    }
    if (subscribed) {
      try { await window.OneSignal.logout(); setSubscribed(false); } catch (e) { console.warn(e); }
    } else {
      try { await window.OneSignal.login(window?.Laravel?.user?.id || undefined); setSubscribed(true); } catch (e) { console.warn(e); }
    }
  };

  const Container = role === 'company' ? CompanyShell : RoleShell;
  return (
    <Container role={role}>
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Notifikasi</h1>
          <div className="flex flex-wrap gap-2">
            <button onClick={markAll} className="px-3 py-2 bg-gray-800 text-white rounded text-sm">Tandai semua terbaca</button>
            <button onClick={sendTest} className="px-3 py-2 bg-indigo-600 text-white rounded text-sm">Test Push</button>
            <button onClick={toggleSub} className="px-3 py-2 bg-teal-600 text-white rounded text-sm">
              {subscribed ? 'Unsubscribe Push' : 'Subscribe Push'} ({permission})
            </button>
          </div>
        </div>
        <ul className="mt-4 space-y-2">
          {notifications.map(n => (
            <li key={n.id} className="border rounded p-3 bg-white dark:bg-slate-800 shadow-sm">
              <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">{new Date(n.created_at).toLocaleString()}</div>
              <div className="text-sm">{n.data?.message}</div>
              {n.data?.post_id && <Link className="text-indigo-600 underline text-sm" href={route('posts.show', n.data.post_id)}>Lihat posting</Link>}
            </li>
          ))}
          {notifications.length === 0 && <li className="text-sm text-gray-500">Belum ada notifikasi.</li>}
        </ul>
      </div>
    </Container>
  );
}
