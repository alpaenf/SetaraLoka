import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ posts }) {
  const { data, setData, post, processing, reset, errors } = useForm({
    title: '',
    content: '',
    visibility: 'public',
  });
  const [listening, setListening] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);

  const startDictation = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return alert('Speech Recognition not supported');
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = 'id-ID';
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setData('content', (data.content ? data.content + ' ' : '') + transcript);
    };
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.start();
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('posts.store'), {
      onSuccess: () => {
        reset();
        setShowNewPost(false);
      },
    });
  };

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 backdrop-blur-sm bg-opacity-90">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Forum</h1>
            <p className="text-sm text-gray-600 mt-1">Diskusi & berbagi pengalaman</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* New Post Button - Sticky */}
          {!showNewPost && (
            <div className="sticky top-[88px] z-20 bg-white border-b border-gray-200 p-4">
              <button 
                onClick={() => setShowNewPost(true)}
                className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                  {posts.data[0]?.user?.name?.charAt(0) || 'U'}
                </div>
                <span className="text-gray-500 text-left flex-1">Apa yang ingin Anda bagikan?</span>
                <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          )}

          {/* New Post Form */}
          {showNewPost && (
            <div className="sticky top-[88px] z-20 bg-white border-b border-gray-200 shadow-lg">
              <form onSubmit={submit} className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {posts.data[0]?.user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="flex-1 space-y-3">
                    <input 
                      className="w-full text-xl font-semibold border-0 border-b border-gray-200 focus:border-cyan-600 focus:ring-0 px-0 py-2 placeholder-gray-400" 
                      value={data.title} 
                      onChange={e=>setData('title', e.target.value)} 
                      placeholder="Judul topik..." 
                      autoFocus
                    />
                    <textarea 
                      className="w-full border-0 focus:ring-0 px-0 py-2 placeholder-gray-400 resize-none" 
                      value={data.content} 
                      onChange={e=>setData('content', e.target.value)} 
                      placeholder="Bagikan pemikiran Anda..."
                      rows={4}
                    />
                  </div>
                </div>

                {(errors.title || errors.content) && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
                    {errors.content && <p className="text-red-600 text-sm">{errors.content}</p>}
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <button 
                      type="button" 
                      onClick={startDictation}
                      className={`p-2 rounded-lg transition-colors ${listening ? 'bg-red-100 text-red-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                      title="Voice-to-Text"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </button>
                    <select 
                      value={data.visibility} 
                      onChange={e=>setData('visibility', e.target.value)} 
                      className="text-sm border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-cyan-500"
                    >
                      <option value="public">🌍 Publik</option>
                      <option value="private">🔒 Privat</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      type="button"
                      onClick={() => {
                        setShowNewPost(false);
                        reset();
                      }}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                    >
                      Batal
                    </button>
                    <button 
                      type="submit"
                      disabled={processing || !data.title || !data.content} 
                      className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {processing ? 'Memposting...' : 'Posting'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Posts Feed */}
          <div className="divide-y divide-gray-200">
            {posts.data.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-gray-600">Belum ada posting di forum</p>
                <p className="text-sm text-gray-500 mt-1">Jadilah yang pertama memulai diskusi!</p>
              </div>
            ) : (
              posts.data.map(p => (
                <Link
                  key={p.id}
                  href={route('posts.show', p.id)}
                  className="block bg-white hover:bg-gray-50 transition-colors"
                >
                  <article className="p-4">
                    {/* Post Header */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {p.user?.name?.charAt(0) || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-gray-900">{p.user?.name}</span>
                          <span className="text-gray-500 text-sm">·</span>
                          <span className="text-gray-500 text-sm">{new Date(p.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                          {p.visibility === 'private' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                              </svg>
                              Privat
                            </span>
                          )}
                        </div>
                        
                        {/* Post Content */}
                        <div className="mt-2">
                          <h2 className="text-lg font-bold text-gray-900 line-clamp-2">{p.title}</h2>
                          <p className="text-gray-700 mt-1 line-clamp-3 leading-relaxed">{p.content}</p>
                        </div>

                        {/* Post Stats */}
                        <div className="flex items-center gap-4 mt-3 text-gray-500">
                          <div className="flex items-center gap-1.5 text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>{p.comments_count || 0}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>{p.views || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))
            )}
          </div>

          {/* Pagination */}
          {posts.links && posts.links.length > 3 && (
            <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between">
              <div className="flex gap-2">
                {posts.links.map((link, idx) => (
                  link.url ? (
                    <Link
                      key={idx}
                      href={link.url}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        link.active 
                          ? 'bg-cyan-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  ) : (
                    <span 
                      key={idx}
                      className="px-3 py-1 text-sm text-gray-400"
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
