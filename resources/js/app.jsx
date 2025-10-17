import '../css/app.css';
import 'leaflet/dist/leaflet.css'; // Leaflet map styles
import './bootstrap';

import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
// OneSignal web SDK via window.OneSignal if loaded separately

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);

                if (window?.OneSignal) {
                        window.OneSignal = window.OneSignal || [];
                        window.OneSignal.push(function() {
                            window.OneSignal.init({
                                appId: import.meta.env.VITE_ONESIGNAL_APP_ID,
                                safari_web_id: import.meta.env.VITE_ONESIGNAL_SAFARI_ID,
                                notifyButton: { enable: true },
                            });
                        });
                }
    },
    progress: {
        color: '#4B5563',
    },
});

// Global error handler for CSRF token mismatch (419)
router.on('error', (event) => {
    // Check if it's a 419 error (CSRF token mismatch)
    if (event.detail?.response?.status === 419) {
        console.warn('CSRF token expired, reloading page...');
        if (confirm('Sesi Anda telah berakhir. Halaman akan dimuat ulang untuk melanjutkan.')) {
            window.location.reload();
        }
    }
});
