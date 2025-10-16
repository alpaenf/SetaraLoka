// Helper to perform a standard POST logout using a native form submit.
// This avoids single-page fetch/logout CSRF issues in some environments.
export default function submitLogout() {
    const token = document.querySelector('meta[name="csrf-token"]')?.content || '';
    const logoutUrl = (typeof route === 'function') ? route('logout') : '/logout';

    // Try native form POST first (most robust: includes cookies automatically)
    try {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = logoutUrl;
        form.style.display = 'none';

        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = '_token';
        input.value = token;
        form.appendChild(input);

        document.body.appendChild(form);
        form.submit();

        // Safety redirect in case submission doesn't navigate (rare)
        setTimeout(() => { if (document.visibilityState !== 'hidden') { window.location = '/'; } }, 1500);
        return;
    } catch (e) {
        console.warn('Native logout form submit failed, falling back to XHR methods', e);
    }

    // If Inertia is available, use it (it should include CSRF header but include _token as extra safety)
    if (window?.Inertia) {
        return window.Inertia.post(logoutUrl, { _token: token }, {
            onSuccess: () => { window.location = '/'; },
            onError: () => { window.location.reload(); }
        });
    }

    // Try fetch with credentials and explicit CSRF header + payload
    try {
        fetch(logoutUrl, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token,
            },
            body: JSON.stringify({ _token: token })
        }).then(res => {
            if (res.ok) {
                window.location = '/';
            } else {
                // on failure try axios if available
                if (window?.axios) {
                    window.axios.post(logoutUrl, { _token: token })
                        .then(() => { window.location = '/'; })
                        .catch(() => { window.location.reload(); });
                } else {
                    window.location.reload();
                }
            }
        }).catch(() => {
            if (window?.axios) {
                window.axios.post(logoutUrl, { _token: token })
                    .then(() => { window.location = '/'; })
                    .catch(() => { window.location.reload(); });
            } else {
                alert('Logout gagal. Silakan coba lagi.');
            }
        });
    } catch (e) {
        console.error('Logout: unexpected error in fallback', e);
        if (window?.axios) {
            window.axios.post(logoutUrl, { _token: token })
                .then(() => { window.location = '/'; })
                .catch(() => { window.location.reload(); });
        } else {
            alert('Logout gagal. Silakan coba lagi.');
        }
    }
}
