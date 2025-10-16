import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import RoleShell from '@/Layouts/RoleShell';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    status: 'draft',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('organization.programs.store'));
  };

  return (
    <RoleShell role="organization">
      <Head title="Buat Program" />
      <div className="max-w-3xl mx-auto p-4">
        <div className="mb-4">
          <h1 className="text-xl font-semibold">Buat Program</h1>
        </div>
        <form onSubmit={submit} className="space-y-4 bg-white p-4 rounded-md border">
          <div>
            <label className="block text-sm font-medium">Judul</label>
            <input type="text" className="mt-1 w-full rounded border-gray-300" value={data.title} onChange={e => setData('title', e.target.value)} />
            {errors.title && <div className="text-sm text-red-600">{errors.title}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium">Deskripsi</label>
            <textarea className="mt-1 w-full rounded border-gray-300" rows="6" value={data.description} onChange={e => setData('description', e.target.value)} />
            {errors.description && <div className="text-sm text-red-600">{errors.description}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select className="mt-1 w-full rounded border-gray-300" value={data.status} onChange={e => setData('status', e.target.value)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            {errors.status && <div className="text-sm text-red-600">{errors.status}</div>}
          </div>
          <div className="flex items-center gap-2">
            <button disabled={processing} className="px-3 py-2 rounded bg-amber-600 text-white text-sm hover:bg-amber-500 disabled:opacity-50">Simpan</button>
            <Link href={route('organization.programs')} className="px-3 py-2 rounded border text-sm">Batal</Link>
          </div>
        </form>
      </div>
    </RoleShell>
  );
}
