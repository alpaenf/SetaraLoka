import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function JobShow({ job, applied, roles }) {
  const { auth } = usePage().props;
  const kategori = auth?.user?.kategori_disabilitas;
  
  const { data, setData, post, processing, progress, errors, reset } = useForm({
    cv: null,
    cover_letter: '',
  });
  const [showForm, setShowForm] = useState(!applied);

  const submit = (e) => {
    e.preventDefault();
    post(route('jobs.apply', job.id), {
      forceFormData: true,
      onSuccess: () => { 
        reset(); 
        setShowForm(false); 
      },
    });
  };

  const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header Sticky */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 backdrop-blur-sm bg-opacity-95">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.history.back()}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Kembali"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="font-bold text-gray-900">Detail Lowongan</h1>
                  <p className="text-xs text-gray-500">{job.company || 'Perusahaan'}</p>
                </div>
              </div>

              {/* Admin Actions */}
              {roles?.includes('admin') && (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => router.post(route('admin.jobs.approve', job.id), { _token: csrf })} 
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => { 
                      const reason = prompt('Alasan pembatalan (opsional):'); 
                      router.post(route('admin.jobs.cancel', job.id), { _token: csrf, reason }); 
                    }} 
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header Card */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 border-b border-gray-200">
              <div className="flex items-start gap-6">
                {/* Company Logo */}
                <div className="w-20 h-20 rounded-2xl bg-white shadow-md flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-bold text-cyan-600">
                    {job.company?.charAt(0) || 'J'}
                  </span>
                </div>

                {/* Job Info */}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h2>
                  {job.company && (
                    <p className="text-lg text-gray-700 font-medium mb-4">{job.company}</p>
                  )}

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    {job.employment_type && (
                      <span className="px-3 py-1.5 bg-white text-gray-700 text-sm font-medium rounded-lg shadow-sm">
                        {job.employment_type}
                      </span>
                    )}
                    {job.disability_only && (
                      <span className="px-3 py-1.5 bg-violet-600 text-white text-sm font-bold rounded-lg shadow-sm">
                        Disabilitas
                      </span>
                    )}
                    {(job.is_remote || job.employment_type === 'remote') && kategori === 'tidak_bisa_berjalan' && (
                      <span className="px-3 py-1.5 bg-green-600 text-white text-sm font-bold rounded-lg shadow-sm">
                        💻 Remote/WFH
                      </span>
                    )}
                    {job.is_wheelchair_accessible && kategori === 'tidak_bisa_berjalan' && (
                      <span className="px-3 py-1.5 bg-purple-600 text-white text-sm font-bold rounded-lg shadow-sm">
                        ♿ Wheelchair Accessible
                      </span>
                    )}
                    {job.has_text_communication && kategori === 'tidak_bisa_berbicara' && (
                      <span className="px-3 py-1.5 bg-teal-600 text-white text-sm font-bold rounded-lg shadow-sm">
                        💬 Text Communication
                      </span>
                    )}
                    {applied && (
                      <span className="px-3 py-1.5 bg-green-600 text-white text-sm font-bold rounded-lg shadow-sm">
                        ✓ Sudah Lamar
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Location & Salary */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                {job.location_name && (
                  <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                    <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <div className="text-xs text-gray-500">Lokasi</div>
                      <div className="font-semibold text-gray-900">{job.location_name}</div>
                    </div>
                  </div>
                )}
                {(job.salary_min || job.salary_max) && (
                  <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="text-xs text-gray-500">Gaji</div>
                      <div className="font-bold text-green-600">
                        Rp{job.salary_min?.toLocaleString('id-ID')} - Rp{job.salary_max?.toLocaleString('id-ID')}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Job Details */}
            <div className="p-8 space-y-6">
              {/* Description */}
              {job.description && (
                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Deskripsi Pekerjaan
                  </h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{job.description}</p>
                  </div>
                </section>
              )}

              {/* Requirements */}
              {job.requirements && (
                <section className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    Kualifikasi
                  </h3>
                  <ul className="space-y-2">
                    {job.requirements.split(/\n|\.\s/).filter(Boolean).map((r, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{r.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Benefits */}
              {job.benefits && (
                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                    Benefit & Fasilitas
                  </h3>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {job.benefits.split(/\n|\.\s/).filter(Boolean).map((b, i) => (
                      <li key={i} className="flex items-start gap-3 bg-green-50 rounded-lg p-3">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 text-sm">{b.replace(/^[*-]\s?/, '').trim()}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Accommodations - Highlight for disability users */}
              {job.accommodations && (
                <section className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Akomodasi Disabilitas
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {job.accommodations}
                  </p>
                </section>
              )}

              {/* Application Form */}
              <div className="pt-6 border-t border-gray-200">
                {applied ? (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="font-bold text-green-900">Lamaran Terkirim!</h4>
                        <p className="text-sm text-green-700">Anda sudah melamar pekerjaan ini.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowForm(v => !v)}
                      className="text-sm text-green-700 underline hover:text-green-900"
                    >
                      {showForm ? 'Sembunyikan Form' : 'Buka Form Lagi'}
                    </button>
                  </div>
                ) : (
                  roles?.includes('perusahaan') || roles?.includes('admin') ? (
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
                      <p className="text-orange-700">Akun perusahaan/admin tidak dapat melamar</p>
                    </div>
                  ) : !showForm ? (
                    <button
                      onClick={() => setShowForm(true)}
                      className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-lg font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    >
                      Lamar Sekarang →
                    </button>
                  ) : null
                )}

                {/* Application Form */}
                {showForm && !roles?.includes('perusahaan') && !roles?.includes('admin') && (
                  <form onSubmit={submit} className="mt-6 space-y-5 bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Form Lamaran</h4>
                    
                    {/* CV Upload */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Upload CV (PDF) <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={e => setData('cv', e.target.files[0])}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 cursor-pointer"
                        required
                      />
                      {errors.cv && <p className="text-red-600 text-sm mt-2">{errors.cv}</p>}
                      <p className="text-xs text-gray-500 mt-2">Format PDF, maksimal 5MB</p>
                    </div>

                    {/* Cover Letter */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Cover Letter (opsional)
                      </label>
                      <textarea
                        className="w-full border border-gray-300 rounded-lg p-4 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        rows={6}
                        value={data.cover_letter}
                        onChange={e => setData('cover_letter', e.target.value)}
                        placeholder="Ceritakan mengapa Anda cocok untuk posisi ini..."
                      />
                      {errors.cover_letter && <p className="text-red-600 text-sm mt-2">{errors.cover_letter}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center gap-4">
                      <button
                        type="submit"
                        disabled={processing}
                        className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {processing ? 'Mengirim...' : 'Kirim Lamaran'}
                      </button>
                      
                      {processing && progress && (
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-3 rounded-full bg-gray-200 overflow-hidden">
                            <div
                              className="h-full bg-green-500 transition-all"
                              style={{ width: `${progress.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-600">{progress.percentage}%</span>
                        </div>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
