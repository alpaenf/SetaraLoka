import React, { useEffect, useState } from 'react';

const FONT_STEPS = [0, 2, 4, 6]; // tailwind text size increments via custom class scaling

export default function A11yControls({ onChange }) {
  const [fontStep, setFontStep] = useState(0);
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('a11y_prefs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed.fontStep === 'number') setFontStep(parsed.fontStep);
        if (typeof parsed.highContrast === 'boolean') setHighContrast(parsed.highContrast);
        if (typeof parsed.darkMode === 'boolean') setDarkMode(parsed.darkMode);
      } catch {}
    }
    if (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('a11y_prefs', JSON.stringify({ fontStep, highContrast, darkMode }));
    onChange?.({ fontStep, highContrast, darkMode });
  }, [fontStep, highContrast, darkMode]);

  const incr = () => setFontStep(s => Math.min(s + 1, FONT_STEPS.length - 1));
  const decr = () => setFontStep(s => Math.max(s - 1, 0));

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 rounded-md bg-white/70 dark:bg-slate-800/80 backdrop-blur border shadow-sm text-xs" aria-label="Kontrol aksesibilitas">
      <div className="flex items-center gap-1" aria-label="Ukuran teks">
        <button onClick={decr} disabled={fontStep === 0} className="px-2 py-1 rounded bg-gray-100 dark:bg-slate-700 disabled:opacity-40">A-</button>
        <span className="px-1 select-none">Teks</span>
        <button onClick={incr} disabled={fontStep === FONT_STEPS.length - 1} className="px-2 py-1 rounded bg-gray-100 dark:bg-slate-700 disabled:opacity-40">A+</button>
      </div>
      <div className="h-4 w-px bg-gray-300 dark:bg-slate-600" aria-hidden="true" />
      <button onClick={() => setHighContrast(v => !v)} className={`px-2 py-1 rounded ${highContrast ? 'bg-black text-white' : 'bg-gray-100 dark:bg-slate-700'}`}>{highContrast ? 'Kontras Normal' : 'Kontras Tinggi'}</button>
      <div className="h-4 w-px bg-gray-300 dark:bg-slate-600" aria-hidden="true" />
      <button onClick={() => setDarkMode(v => !v)} className={`px-2 py-1 rounded ${darkMode ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-slate-700'}`}>{darkMode ? 'Mode Terang' : 'Mode Gelap'}</button>
    </div>
  );
}
