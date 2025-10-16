import '../css/app.css';
import 'leaflet/dist/leaflet.css'; // Leaflet map styles
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
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
