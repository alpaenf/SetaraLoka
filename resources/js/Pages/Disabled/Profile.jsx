import RoleShell from '@/Layouts/RoleShell';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function DisabledProfile({ user, stats }) {
  const [isEditing, setIsEditing] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  
  const { data, setData, post, processing, errors } = useForm({
    name: user.name || '',
    email: user.email || '',
    kategori_disabilitas: user.kategori_disabilitas || 'tidak_bisa_berbicara',
    bio: user.bio || '',
    skills: user.skills || '',
    phone: user.phone || '',
    city: user.city || '',
    photo: null,
    _method: 'PUT',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('disabled.profile.update'), {
      preserveScroll: true,
      forceFormData: true,
      onSuccess: () => {
        setIsEditing(false);
        setPhotoPreview(null);
      },
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData('photo', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setData('photo', null);
    setPhotoPreview(null);
  };

  const kategoriOptions = [
    { value: 'tidak_bisa_berbicara', label: 'Tidak Bisa Berbicara', icon: '💬', description: 'Kesulitan komunikasi verbal' },
    { value: 'tidak_bisa_berjalan', label: 'Tidak Bisa Berjalan', icon: '🦽', description: 'Kesulitan mobilitas fisik' },
  ];

  return (
    <RoleShell role="disabled">
      <Head title="Profil Saya" />
      
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profil Saya</h1>
            <p className="text-gray-600 mt-1">Kelola informasi pribadi dan preferensi aksesibilitas Anda</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
              isEditing
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-lg hover:-translate-y-0.5'
            }`}
          >
            {isEditing ? 'Batal' : 'Edit Profil'}
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo Profile */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Foto Profil
              </h2>

              <div className="flex items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
                    {photoPreview || user.photo_url ? (
                      <img 
                        src={photoPreview || user.photo_url} 
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-4xl font-bold">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                  {isEditing && (photoPreview || user.photo_url) && (
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition shadow-lg"
                      title="Hapus foto"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Upload Area */}
                {isEditing ? (
                  <div className="flex-1">
                    <label className="block">
                      <div className="group cursor-pointer">
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-cyan-500 hover:bg-cyan-50 transition-all">
                          <svg className="w-12 h-12 mx-auto text-gray-400 group-hover:text-cyan-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="mt-2 text-sm font-medium text-gray-700 group-hover:text-cyan-700">
                            Klik untuk upload foto
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            PNG, JPG, GIF maksimal 2MB
                          </p>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                    </label>
                    {errors.photo && (
                      <p className="text-red-600 text-sm mt-2">{errors.photo}</p>
                    )}
                  </div>
                ) : (
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{user.email}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-700 border border-cyan-200">
                        {user.kategori_disabilitas === 'tidak_bisa_berbicara' ? '💬 Komunikasi' : '🦽 Mobilitas'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Informasi Dasar */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Informasi Dasar
              </h2>

              {!isEditing ? (
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 uppercase">Nama Lengkap</dt>
                    <dd className="mt-1 text-lg font-semibold text-gray-900">{user.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 uppercase">Email</dt>
                    <dd className="mt-1 text-lg text-gray-900">{user.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 uppercase">Nomor Telepon</dt>
                    <dd className="mt-1 text-lg text-gray-900">{user.phone || '-'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 uppercase">Kota</dt>
                    <dd className="mt-1 text-lg text-gray-900">{user.city || '-'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 uppercase">Bio</dt>
                    <dd className="mt-1 text-gray-700 leading-relaxed">{user.bio || 'Belum ada bio'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 uppercase">Keahlian</dt>
                    <dd className="mt-1 text-gray-700">{user.skills || 'Belum ada keahlian'}</dd>
                  </div>
                </dl>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      value={data.name}
                      onChange={e => setData('name', e.target.value)}
                      className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:ring focus:ring-cyan-200 transition"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={data.email}
                      onChange={e => setData('email', e.target.value)}
                      className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:ring focus:ring-cyan-200 transition"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                    <input
                      type="text"
                      value={data.phone}
                      onChange={e => setData('phone', e.target.value)}
                      placeholder="08xxxxxxxxxx"
                      className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:ring focus:ring-cyan-200 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kota</label>
                    <input
                      type="text"
                      value={data.city}
                      onChange={e => setData('city', e.target.value)}
                      placeholder="Nama kota"
                      className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:ring focus:ring-cyan-200 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      value={data.bio}
                      onChange={e => setData('bio', e.target.value)}
                      rows={4}
                      placeholder="Ceritakan tentang diri Anda..."
                      className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:ring focus:ring-cyan-200 transition resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Keahlian</label>
                    <input
                      type="text"
                      value={data.skills}
                      onChange={e => setData('skills', e.target.value)}
                      placeholder="Contoh: Design, Programming, Writing"
                      className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:ring focus:ring-cyan-200 transition"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50"
                  >
                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </button>
                </form>
              )}
            </div>

            {/* Kategori Disabilitas */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Kategori Disabilitas
              </h2>

              {!isEditing ? (
                <div className="space-y-3">
                  {kategoriOptions.map(option => (
                    <div
                      key={option.value}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        data.kategori_disabilitas === option.value
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-gray-200 bg-gray-50 opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{option.icon}</div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-600">{option.description}</div>
                        </div>
                        {data.kategori_disabilitas === option.value && (
                          <svg className="w-6 h-6 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {kategoriOptions.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setData('kategori_disabilitas', option.value)}
                      className={`group w-full p-4 rounded-xl border-2 transition-all hover:shadow-lg hover:-translate-y-0.5 ${
                        data.kategori_disabilitas === option.value
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-gray-200 bg-white hover:border-cyan-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{option.icon}</div>
                        <div className="flex-1 text-left">
                          <div className="font-bold text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-600">{option.description}</div>
                        </div>
                        {data.kategori_disabilitas === option.value && (
                          <svg className="w-6 h-6 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                  {errors.kategori_disabilitas && (
                    <p className="text-red-600 text-sm">{errors.kategori_disabilitas}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Stats & Quick Links */}
          <div className="space-y-6">
            {/* Statistik Aktivitas */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Statistik Aktivitas</h2>
              <div className="space-y-4">
                <div className="group p-4 rounded-xl border-2 border-gray-200 bg-white hover:bg-cyan-600 hover:border-cyan-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-sm font-medium text-gray-500 group-hover:text-white uppercase transition-colors">Posting Forum</div>
                  <div className="text-3xl font-bold text-gray-900 group-hover:text-white mt-1 transition-colors">{stats?.posts || 0}</div>
                </div>

                <div className="group p-4 rounded-xl border-2 border-gray-200 bg-white hover:bg-cyan-600 hover:border-cyan-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-sm font-medium text-gray-500 group-hover:text-white uppercase transition-colors">Event Diikuti</div>
                  <div className="text-3xl font-bold text-gray-900 group-hover:text-white mt-1 transition-colors">{stats?.events || 0}</div>
                </div>

                <div className="group p-4 rounded-xl border-2 border-gray-200 bg-white hover:bg-cyan-600 hover:border-cyan-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-sm font-medium text-gray-500 group-hover:text-white uppercase transition-colors">Lamaran Terkirim</div>
                  <div className="text-3xl font-bold text-gray-900 group-hover:text-white mt-1 transition-colors">{stats?.applications || 0}</div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Akses Cepat</h2>
              <div className="space-y-2">
                <a
                  href={route('posts.index')}
                  className="group flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 bg-white hover:bg-cyan-600 hover:border-cyan-600 hover:shadow-lg transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-cyan-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="font-medium text-gray-900 group-hover:text-white transition-colors">Forum</span>
                </a>

                <a
                  href={route('jobs.index')}
                  className="group flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 bg-white hover:bg-cyan-600 hover:border-cyan-600 hover:shadow-lg transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-cyan-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-gray-900 group-hover:text-white transition-colors">Lowongan</span>
                </a>

                <a
                  href={route('events.index')}
                  className="group flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 bg-white hover:bg-cyan-600 hover:border-cyan-600 hover:shadow-lg transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-cyan-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-gray-900 group-hover:text-white transition-colors">Acara</span>
                </a>

                <a
                  href={route('dashboard.disabilitas')}
                  className="group flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 bg-white hover:bg-cyan-600 hover:border-cyan-600 hover:shadow-lg transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-cyan-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="font-medium text-gray-900 group-hover:text-white transition-colors">Dashboard</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleShell>
  );
}
