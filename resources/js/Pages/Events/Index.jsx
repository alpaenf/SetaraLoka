import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, router, usePage } from '@inertiajs/react';

export default function EventsIndex({ events }) {
  const { auth } = usePage().props;
  const kategori = auth?.user?.kategori_disabilitas;
  
  const [filter, setFilter] = useState('all');
  const [accessibilityFilter, setAccessibilityFilter] = useState('all');

  const toggleInterest = (id) => {
    router.post(route('events.interest', id), {}, { preserveScroll: true });
  };

  // Filter events based on category
  const filteredEvents = events?.data?.filter(ev => {
    // Location filter (for mobility category)
    if (kategori === 'tidak_bisa_berjalan') {
      if (filter === 'online' && ev.location_type !== 'online') return false;
      if (filter === 'hybrid' && ev.location_type !== 'hybrid') return false;
      if (accessibilityFilter === 'wheelchair' && !ev.is_wheelchair_accessible) return false;
    }
    
    // Communication filter (for tidak_bisa_berbicara category)
    if (kategori === 'tidak_bisa_berbicara') {
      if (filter === 'captioned' && !ev.has_live_caption) return false;
    }
    
    return true;
  });

  const getLocationBadge = (locationType) => {
    const badges = {
      online: { color: 'bg-green-100 text-green-700', icon: '💻', label: 'Online' },
      hybrid: { color: 'bg-blue-100 text-blue-700', icon: '🔄', label: 'Hybrid' },
      offline: { color: 'bg-gray-100 text-gray-700', icon: '📍', label: 'Offline' }
    };
    return badges[locationType] || badges.offline;
  };

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

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 backdrop-blur-sm bg-opacity-95">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Acara & Event</h1>
                <p className="text-sm text-gray-600 mt-1">Temukan acara yang sesuai dengan minat Anda</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{filteredEvents?.length || 0} acara</span>
              </div>
            </div>

            {/* Filters for Mobility Category */}
            {kategori === 'tidak_bisa_berjalan' && (
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'all' 
                      ? 'bg-cyan-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Semua Acara
                </button>
                <button
                  onClick={() => setFilter('online')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'online' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  💻 Online Only
                </button>
                <button
                  onClick={() => setFilter('hybrid')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'hybrid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🔄 Hybrid
                </button>
                <button
                  onClick={() => setAccessibilityFilter(accessibilityFilter === 'wheelchair' ? 'all' : 'wheelchair')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    accessibilityFilter === 'wheelchair' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ♿ Wheelchair Accessible
                </button>
              </div>
            )}

            {/* Filters for Communication Category */}
            {kategori === 'tidak_bisa_berbicara' && (
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'all' 
                      ? 'bg-cyan-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Semua Acara
                </button>
                <button
                  onClick={() => setFilter('captioned')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'captioned' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  💬 Live Caption
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Events Grid */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          {filteredEvents && filteredEvents.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map(ev => {
                const interested = ev.is_interested;
                const locationBadge = getLocationBadge(ev.location_type);
                const daysUntil = calculateDaysUntil(ev.start_at);
                const capacity = ev.max_participants ? (ev.participants_count / ev.max_participants) * 100 : null;

                return (
                  <div 
                    key={ev.id} 
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden hover:shadow-lg transition-all group"
                  >
                    {/* Event Image */}
                    <div className="relative h-48 bg-gradient-to-br from-cyan-100 to-blue-100 overflow-hidden">
                      {ev.image_path ? (
                        <img 
                          src={ev.image_path} 
                          alt={ev.title} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-16 h-16 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}

                      {/* Badges Overlay */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${locationBadge.color} backdrop-blur-sm shadow-sm`}>
                          {locationBadge.label}
                        </span>
                        
                        {ev.is_wheelchair_accessible && kategori === 'tidak_bisa_berjalan' && (
                          <span className="px-2 py-1 rounded-lg text-xs font-medium bg-purple-100 text-purple-700 backdrop-blur-sm shadow-sm">
                            ♿ Accessible
                          </span>
                        )}
                        
                        {ev.has_live_caption && kategori === 'tidak_bisa_berbicara' && (
                          <span className="px-2 py-1 rounded-lg text-xs font-medium bg-teal-100 text-teal-700 backdrop-blur-sm shadow-sm">
                            💬 Live Caption
                          </span>
                        )}
                      </div>

                      {/* Interest Count */}
                      {ev.interested_users_count > 0 && (
                        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium shadow-sm flex items-center gap-1">
                          <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          <span>{ev.interested_users_count}</span>
                        </div>
                      )}

                      {/* Already Interested Badge */}
                      {interested && (
                        <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Tertarik
                        </div>
                      )}
                    </div>

                    {/* Event Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      {/* Title */}
                      <h2 className="font-bold text-lg line-clamp-2 text-gray-900 mb-2">{ev.title}</h2>

                      {/* Date & Location */}
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-cyan-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <div className="flex-1">
                            <span className="font-medium">
                              {ev.start_at 
                                ? new Date(ev.start_at).toLocaleDateString('id-ID', { 
                                    day: 'numeric', 
                                    month: 'long', 
                                    year: 'numeric' 
                                  })
                                : 'Tanggal belum ditentukan'}
                            </span>
                            {daysUntil && (
                              <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                                {daysUntil}
                              </span>
                            )}
                          </div>
                        </div>

                        {ev.location_name && (
                          <div className="flex items-start gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="line-clamp-2">{ev.location_name}</span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      {ev.description && (
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4">{ev.description}</p>
                      )}

                      {/* Capacity Progress Bar */}
                      {capacity !== null && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span>Peserta</span>
                            <span className="font-medium">{ev.participants_count}/{ev.max_participants}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all ${
                                capacity >= 90 ? 'bg-red-500' : capacity >= 70 ? 'bg-orange-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min(capacity, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="mt-auto pt-3 border-t border-gray-100 flex items-center gap-2">
                        <Link 
                          href={route('events.show', ev.id)} 
                          className="flex-1 text-center px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-medium hover:shadow-lg transition-all"
                        >
                          Detail
                        </Link>
                        
                        <button
                          type="button"
                          onClick={() => toggleInterest(ev.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            interested 
                              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          title={interested ? 'Batalkan Minat' : 'Tandai Tertarik'}
                        >
                          <svg className="w-5 h-5" fill={interested ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>

                        {ev.has_certificate && (
                          <Link
                            href={route('volunteer.certificate.pdf', ev.id)}
                            className="px-4 py-2 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 text-sm font-medium transition-all"
                            title="Unduh Sertifikat"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-600 font-medium">
                {filter !== 'all' ? 'Tidak ada acara dengan filter ini' : 'Belum ada acara tersedia'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {filter !== 'all' ? 'Coba ubah filter untuk melihat acara lainnya' : 'Acara baru akan segera ditambahkan'}
              </p>
            </div>
          )}

          {/* Pagination */}
          {events?.links && events.links.length > 3 && (
            <div className="mt-8 flex items-center justify-center">
              <div className="flex gap-2">
                {events.links.map((link, idx) => (
                  link.url ? (
                    <button
                      key={idx}
                      onClick={() => router.visit(link.url, { preserveScroll: true, preserveState: true })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        link.active 
                          ? 'bg-cyan-600 text-white' 
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  ) : (
                    <span 
                      key={idx}
                      className="px-4 py-2 text-sm text-gray-400"
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
