import { useForm, Link, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ post, comments, newCommentId }) {
  const { data, setData, post: postForm, processing, reset } = useForm({
    content: '',
    parent_id: null,
  });
  const [listening, setListening] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyingToUser, setReplyingToUser] = useState(null);
  const newCommentRef = useRef(null);
  
  useEffect(() => {
    if (newCommentId && newCommentRef.current) {
      newCommentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [newCommentId]);

  const startDictation = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      return alert('Speech Recognition tidak didukung di browser ini');
    }
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
    postForm(route('comments.store', post.id), {
      preserveScroll: true,
      onSuccess: () => { 
        reset(); 
        setReplyingTo(null);
        setReplyingToUser(null);
      },
    });
  };

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.visit(route('posts.index'));
    }
  };

  const handleReply = (commentId, userName) => {
    setReplyingTo(commentId);
    setReplyingToUser(userName);
    setData('parent_id', commentId);
    setTimeout(() => {
      const textarea = document.getElementById('comment-textarea');
      if (textarea) textarea.focus();
    }, 100);
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setReplyingToUser(null);
    setData('parent_id', null);
    reset('content');
  };

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header Sticky */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 backdrop-blur-sm bg-opacity-95">
          <div className="max-w-2xl mx-auto px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Kembali"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="font-bold text-gray-900">Thread</h1>
                <p className="text-xs text-gray-500">oleh {post.user?.name}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Main Post */}
          <article className="bg-white border-b border-gray-200 p-4">
            <div className="flex gap-3">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {post.user?.name?.charAt(0) || 'U'}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-gray-900">{post.user?.name}</span>
                  <span className="text-gray-500 text-sm">·</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(post.created_at).toLocaleDateString('id-ID', { 
                      day: 'numeric', 
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                  {post.visibility === 'private' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      Privat
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</div>

                {/* Post Stats */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-gray-500">
                  <div className="flex items-center gap-1.5 text-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="font-medium">{comments?.total || 0} Komentar</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Comment Form Sticky */}
          <div className="sticky top-[61px] z-20 bg-white border-b border-gray-200 p-4 shadow-sm">
            <form onSubmit={submit} className="space-y-3">
              {replyingTo && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    <span className="text-gray-700">Membalas <span className="font-semibold text-blue-700">{replyingToUser}</span></span>
                  </div>
                  <button 
                    type="button" 
                    onClick={cancelReply}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}

              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {post.user?.name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1">
                  <textarea 
                    id="comment-textarea"
                    className="w-full border-0 border-b border-gray-200 focus:border-cyan-600 focus:ring-0 px-0 py-2 placeholder-gray-400 resize-none" 
                    value={data.content} 
                    onChange={e=>setData('content', e.target.value)} 
                    placeholder={replyingTo ? 'Tulis balasan...' : 'Tulis komentar...'}
                    rows={2}
                  />
                  <div className="flex items-center justify-between mt-2">
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
                    <div className="flex items-center gap-2">
                      {replyingTo && (
                        <button 
                          type="button"
                          onClick={cancelReply}
                          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors text-sm"
                        >
                          Batal
                        </button>
                      )}
                      <button 
                        type="submit"
                        disabled={processing || !data.content.trim()} 
                        className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
                      >
                        {processing ? 'Mengirim...' : (replyingTo ? 'Balas' : 'Kirim')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Comments Section */}
          <div className="bg-white divide-y divide-gray-200">
            {comments?.data?.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">Belum ada komentar</p>
                <p className="text-sm text-gray-500 mt-1">Jadilah yang pertama berkomentar!</p>
              </div>
            ) : (
              comments.data.map(c => {
                const isNew = newCommentId && newCommentId === c.id;
                return (
                  <div 
                    key={c.id} 
                    ref={isNew ? newCommentRef : null} 
                    className={`p-4 transition-all ${isNew ? 'bg-green-50 border-l-4 border-green-500' : 'hover:bg-gray-50'}`}
                    id={`comment-${c.id}`}
                  >
                    <div className="flex gap-3">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {c.user?.name?.charAt(0) || 'U'}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{c.user?.name}</span>
                            <span className="text-gray-500 text-sm">·</span>
                            <span className="text-gray-500 text-sm">
                              {new Date(c.created_at).toLocaleDateString('id-ID', { 
                                day: 'numeric', 
                                month: 'short'
                              })}
                            </span>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => handleReply(c.id, c.user?.name)}
                            className="text-sm text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>
                            Balas
                          </button>
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{c.content}</p>

                        {/* Nested Replies */}
                        {c.replies && c.replies.length > 0 && (
                          <div className="mt-4 space-y-3 border-l-2 border-gray-200 pl-4">
                            {c.replies.map(r => (
                              <div key={r.id} className="flex gap-3" id={`comment-${r.id}`}>
                                <div className="flex-shrink-0">
                                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {r.user?.name?.charAt(0) || 'U'}
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-semibold text-gray-900 text-sm">{r.user?.name}</span>
                                      <span className="text-gray-500 text-xs">·</span>
                                      <span className="text-gray-500 text-xs">
                                        {new Date(r.created_at).toLocaleDateString('id-ID', { 
                                          day: 'numeric', 
                                          month: 'short'
                                        })}
                                      </span>
                                    </div>
                                    <button 
                                      type="button" 
                                      onClick={() => handleReply(r.id, r.user?.name)}
                                      className="text-xs text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1"
                                    >
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                      </svg>
                                      Balas
                                    </button>
                                  </div>
                                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{r.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Pagination */}
            {comments?.links && comments.links.length > 3 && (
              <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between">
                <div className="flex gap-2">
                  {comments.links.map((link, idx) => (
                    link.url ? (
                      <button
                        key={idx}
                        onClick={() => router.visit(link.url, { preserveScroll: true, preserveState: true })}
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
      </div>
    </AuthenticatedLayout>
  );
}
