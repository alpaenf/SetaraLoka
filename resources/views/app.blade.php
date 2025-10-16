<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
            <link rel="manifest" href="/manifest.webmanifest">
            @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
            @if(env('ONESIGNAL_APP_ID'))
                <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
                <script>
                    window.addEventListener('load', async () => {
                        try {
                            if (!window.OneSignal) return;
                            const OneSignal = window.OneSignal || [];
                            OneSignal.push(function() {
                                OneSignal.init({
                                    appId: '{{ env('ONESIGNAL_APP_ID') }}',
                                });
                            });
                            @auth
                            OneSignal.push(async function() {
                                try {
                                    await OneSignal.login('{{ auth()->id() }}');
                                } catch (e) { console.warn('OneSignal login failed', e); }
                            });
                            @endauth
                        } catch (e) {
                            console.warn('OneSignal init error', e);
                        }
                    });
                </script>
            @endif
            <script>
                if ('serviceWorker' in navigator) {
                    window.addEventListener('load', async () => {
                        try {
                            const reg = await navigator.serviceWorker.register('/service-worker.js');
                            // Prompt update check
                            reg.update && reg.update();
                            // Reload the page when a new SW takes control (to get fresh manifest/asset URLs)
                            let refreshing = false;
                            navigator.serviceWorker.addEventListener('controllerchange', () => {
                                if (refreshing) return; refreshing = true; window.location.reload();
                            });
                        } catch (e) { console.warn('SW register failed', e); }
                    });
                }
                @auth
                window.Laravel = window.Laravel || {};
                window.Laravel.user = { id: {{ auth()->id() }}, name: @json(auth()->user()->name) };
                @endauth
            </script>
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        <div id="a11y-live" class="sr-only" aria-live="polite" aria-atomic="true"></div>
        @inertia
            @if(session('status'))
            <script>
                window.a11yAnnounce && window.a11yAnnounce(@json(session('status')));
                // lightweight toast
                (function(msg){
                  const t=document.createElement('div');
                  t.textContent=msg; t.style.position='fixed'; t.style.bottom='1rem'; t.style.right='1rem'; t.style.background='#1f2937'; t.style.color='white'; t.style.padding='0.75rem 1rem'; t.style.borderRadius='0.5rem'; t.style.boxShadow='0 4px 10px rgba(0,0,0,0.2)'; t.style.zIndex=9999;
                  document.body.appendChild(t); setTimeout(()=>t.remove(), 3500);
                })(@json(session('status')));
            </script>
            @endif
        <script>
            // Example: expose helper to announce messages for screen readers
            window.a11yAnnounce = function(msg){
                const region = document.getElementById('a11y-live');
                if (!region) return;
                region.textContent = '';
                setTimeout(()=>{ region.textContent = msg; }, 50);
            }
        </script>
    </body>
</html>
