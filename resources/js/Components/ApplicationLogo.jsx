import { useEffect, useState } from 'react';

export default function ApplicationLogo({
    variant = 'auto', // 'auto' | 'light' | 'dark'
    alt = 'SetaraLoka',
    priority = false,
    // Optional custom sources to try first
    srcLight = undefined, // string | string[]
    srcDark = undefined, // string | string[]
    fallbackText = 'SetaraLoka',
    ...props
}) {
    const [resolvedVariant, setResolvedVariant] = useState(variant === 'auto' ? 'light' : variant);

    // Resolve variant based on system/theme when variant === 'auto'
    useEffect(() => {
        if (variant !== 'auto') {
            setResolvedVariant(variant);
            return;
        }
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
            setResolvedVariant('light');
            return;
        }
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const update = () => setResolvedVariant(mq.matches ? 'dark' : 'light');
        update();
        if (mq.addEventListener) mq.addEventListener('change', update);
        else if (mq.addListener) mq.addListener(update);
        return () => {
            if (mq.removeEventListener) mq.removeEventListener('change', update);
            else if (mq.removeListener) mq.removeListener(update);
        };
    }, [variant]);

    // Candidate sources (prefer provided overrides, then variant-aware, then legacy fallbacks)
    const normalize = (v) => v == null ? [] : (Array.isArray(v) ? v : [v]);
    const preferred = resolvedVariant === 'dark' ? normalize(srcDark) : normalize(srcLight);
    const base = resolvedVariant === 'dark' ? 'logo-white' : 'logo';
    const candidates = [
        // 1) Explicit overrides supplied via props
        ...preferred,
        // 2) Variant-aware preferred options
        `/images/${base}.svg`, `/image/${base}.svg`,
        `/images/${base}.png`, `/image/${base}.png`,
        `/images/${base}.webp`, `/image/${base}.webp`,
        // 3) Legacy non-variant paths for backward compatibility
        '/images/logo.svg', '/image/logo.svg',
        '/images/logo.webp', '/image/logo.webp',
        '/images/logo.png', '/image/logo.png',
    ];

    const [idx, setIdx] = useState(0);
    const src = candidates[Math.min(idx, candidates.length - 1)];

    const onError = (e) => {
        if (idx < candidates.length - 1) {
            setIdx(i => i + 1);
        } else {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="32" viewBox="0 0 96 32">`
                + `<rect width="100%" height="100%" fill="${resolvedVariant === 'dark' ? '#111827' : '#f3f4f6'}"/>`
                + `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${resolvedVariant === 'dark' ? '#6b7280' : '#9ca3af'}" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="12">${fallbackText}</text>`
                + `</svg>`
            );
        }
    };

    return (
        <img
            src={src}
            alt={alt}
            onError={onError}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchpriority={priority ? 'high' : 'auto'}
            {...props}
        />
    );
}
