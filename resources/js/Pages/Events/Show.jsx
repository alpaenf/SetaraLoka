import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function EventShow({ event, isInterested, isRegistered = false, canManageParticipants = false }) {
  const { auth } = usePage().props;
  const kategori = auth?.user?.kategori_disabilitas;
  const [processing, setProcessing] = useState(false);

  const toggleInterest = () => {
    router.post(route('events.interest', event.id), {}, { preserveScroll: true });
  };

  const handleRegister = () => {
    if (processing) return;
    setProcessing(true);
    router.post(route('events.register', event.id), {}, {
      preserveScroll: true,
      onFinish: () => setProcessing(false)
    });
  };

  const getLocationBadge = (locationType) => {
    const badges = {
      online: { color: 'bg-green-100 text-green-700 border-green-200', label: 'Online' },
      hybrid: { color: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Hybrid' },
      offline: { color: 'bg-gray-100 text-gray-700 border-gray-200', label: 'Offline' }
    };
    return badges[locationType] || badges.offline;
  };

  const locationBadge = getLocationBadge(event.location_type);
  const capacity = event.max_participants ? (event.participants_count / event.max_participants) * 100 : null;
  const isFull = capacity >= 100;

  const calculateDaysUntil = (dateString) => {
    if (!dateString) return null;
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Sudah lewat';
    if (diffDays === 0) return 'Hari ini';
    if (diffDays === 1) return 'Besok';
    if (diffDays <= 7) return `${diffDays} hari lagi`;
    return null;
  };

  const daysUntil = calculateDaysUntil(event.start_at);

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header Sticky */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 backdrop-blur-sm bg-opacity-95">
          <div className="max-w-4xl mx-auto px-4 py-3">
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
              <div className="flex-1">
                <h1 className="font-bold text-gray-900">Detail Acara</h1>
                <p className="text-xs text-gray-500">oleh {event.user?.name || 'Penyelenggara'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Event Image */}
            <div className="relative h-80 bg-gradient-to-br from-cyan-100 to-blue-100">
              {event.image_url ? (
                <img 
                  src={event.image_url} 
                  alt={event.title} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-24 h-24 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${locationBadge.color} border backdrop-blur-sm shadow-sm`}>
                  {locationBadge.label}
                </span>
                
                {event.is_wheelchair_accessible && kategori === 'tidak_bisa_berjalan' && (
                  <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-purple-100 text-purple-700 border border-purple-200 backdrop-blur-sm shadow-sm">
                    Wheelchair Accessible
                  </span>
                )}
                
                {event.has_live_caption && kategori === 'tidak_bisa_berbicara' && (
                  <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-teal-100 text-teal-700 border border-teal-200 backdrop-blur-sm shadow-sm">
                    Live Caption
                  </span>
                )}

                {isRegistered && (
                  <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-green-600 text-white border border-green-700 shadow-lg">
                    Sudah Terdaftar
                  </span>
                )}
              </div>

              {/* Status Badge */}
              {daysUntil && (
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {daysUntil}
                </div>
              )}
            </div>

            {/* Event Details */}
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{event.interested_users_count || 0} orang tertarik</span>
                </div>
              </div>

              {/* Date & Time */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {event.start_at 
                        ? new Date(event.start_at).toLocaleDateString('id-ID', { 
                            weekday: 'long',
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })
                        : 'Tanggal belum ditentukan'}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {event.start_at && new Date(event.start_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      {event.end_at && ' - ' + new Date(event.end_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>

                {event.location_name && (
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <div className="font-semibold text-gray-900">Lokasi</div>
                      <div className="text-sm text-gray-600 mt-1">{event.location_name}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {event.description && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Tentang Acara</h3>
                  <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {event.description}
                  </div>
                </div>
              )}

              {/* Capacity */}
              {capacity !== null && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Kapasitas Peserta</h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Peserta Terdaftar</span>
                      <span className="font-bold text-gray-900">{event.participants_count}/{event.max_participants}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          capacity >= 100 ? 'bg-red-500' : capacity >= 90 ? 'bg-orange-500' : capacity >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(capacity, 100)}%` }}
                      ></div>
                    </div>
                    {isFull && (
                      <p className="text-sm text-red-600 font-medium mt-2">Acara sudah penuh</p>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-3">
                  {/* Register Button - Primary */}
                  {!isRegistered && (
                    <button
                      onClick={handleRegister}
                      disabled={processing || isFull}
                      className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                        isFull
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-lg hover:-translate-y-0.5'
                      }`}
                    >
                      {processing ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Mendaftar...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {isFull ? 'Acara Penuh' : 'Daftar Ikut Acara'}
                        </>
                      )}
                    </button>
                  )}

                  {isRegistered && (
                    <div className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-100 border-2 border-green-600 text-green-700 font-bold">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Anda Sudah Terdaftar
                    </div>
                  )}

                  {/* Interest Button */}
                  <button
                    onClick={toggleInterest}
                    className={`px-6 py-3 rounded-xl font-medium transition-all ${
                      isInterested
                        ? 'bg-red-100 text-red-700 hover:bg-red-200 border-2 border-red-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200'
                    }`}
                  >
                    <svg className="w-5 h-5 inline" fill={isInterested ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>

                  {/* Certificate Button */}
                  {event.has_certificate && (
                    <Link
                      href={route('volunteer.certificate.pdf', event.id)}
                      className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-all flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Sertifikat
                    </Link>
                  )}

                  {/* Manage Participants (for organizers) */}
                  {canManageParticipants && (
                    <Link
                      href={route('events.participants.index', event.id)}
                      className="px-6 py-3 rounded-xl bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition-all flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Kelola Peserta
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
