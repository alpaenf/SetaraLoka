import { useState, useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';

export default function AccessMate() {
  const { auth } = usePage().props;
  const kategori = auth?.user?.kategori_disabilitas;
  
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [activeTab, setActiveTab] = useState('tts');
  
  const synth = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.speechSynthesis) {
        synth.current = window.speechSynthesis;
      }
    }
  }, []);

  const speak = (textToSpeak) => {
    if (!synth.current || !textToSpeak) return;
    synth.current.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'id-ID';
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    synth.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synth.current) {
      synth.current.cancel();
      setIsSpeaking(false);
    }
  };

  const summarizeText = () => {
    if (!text.trim()) return;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length <= 3) {
      setSummary(text);
      return;
    }
    const first = sentences[0];
    const middle = sentences[Math.floor(sentences.length / 2)];
    const last = sentences[sentences.length - 1];
    setSummary(`${first}. ${middle}. ${last}.`);
  };

  if (kategori !== 'tidak_bisa_berbicara') return null;

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 text-white rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-end p-6 pointer-events-none">
          <div className="pointer-events-auto w-full max-w-md bg-white rounded-2xl shadow-2xl border-2 border-cyan-200">
            <div className="bg-gradient-to-r from-cyan-500 to-teal-600 p-6 text-white flex justify-between items-center">
              <h2 className="text-2xl font-bold">AccessMate</h2>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex border-b">
              <button onClick={() => setActiveTab('tts')} className={`flex-1 py-3 font-medium ${activeTab === 'tts' ? 'bg-white border-b-2 border-cyan-600 text-cyan-600' : 'text-gray-600'}`}>
                Text-to-Speech
              </button>
              <button onClick={() => setActiveTab('summarize')} className={`flex-1 py-3 font-medium ${activeTab === 'summarize' ? 'bg-white border-b-2 border-cyan-600 text-cyan-600' : 'text-gray-600'}`}>
                Ringkas Teks
              </button>
            </div>
            <div className="p-6">
              {activeTab === 'tts' && (
                <div className="space-y-4">
                  <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} className="w-full px-4 py-3 border-2 rounded-xl" placeholder="Ketik teks..." />
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => speak(text)} disabled={!text || isSpeaking} className="px-6 py-3 rounded-xl bg-cyan-500 text-white"> {isSpeaking ? 'Membaca...' : 'Bacakan'}</button>
                    <button onClick={stopSpeaking} disabled={!isSpeaking} className="px-6 py-3 rounded-xl bg-red-500 text-white"> Berhenti</button>
                  </div>
                </div>
              )}
              {activeTab === 'summarize' && (
                <div className="space-y-4">
                  <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} className="w-full px-4 py-3 border-2 rounded-xl" placeholder="Teks untuk diringkas..." />
                  <button onClick={summarizeText} disabled={!text} className="w-full px-6 py-3 rounded-xl bg-teal-500 text-white font-bold hover:bg-teal-600 disabled:bg-gray-300"> Ringkas Teks</button>
                  {summary && (
                    <div className="bg-cyan-50 p-5 rounded-xl border-2 border-cyan-200">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-gray-900">Ringkasan</h3>
                        <button onClick={() => speak(summary)} className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-medium">
                          Bacakan
                        </button>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
