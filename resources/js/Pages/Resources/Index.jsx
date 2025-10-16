import React from 'react';
import RoleShell from '@/Layouts/RoleShell';

export default function ResourcesIndex({ sections }) {
  return (
    <RoleShell>
      <h1 className="text-2xl font-bold mb-6">Sumber Daya</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections?.map(sec => (
          <div key={sec.title} className="p-5 bg-white rounded-lg border shadow-sm flex flex-col">
            <h2 className="text-lg font-semibold mb-3">{sec.title}</h2>
            <ul className="text-sm space-y-1">
              {sec.items.map(it => <li key={it} className="list-disc ml-4 marker:text-indigo-500">{it}</li>)}
            </ul>
          </div>
        ))}
        {(!sections || sections.length === 0) && <p className="text-gray-500 text-sm">Belum ada konten.</p>}
      </div>
    </RoleShell>
  );
}
