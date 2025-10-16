import { useState, useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';

export default function TextSelectionTTS() {
  const { auth } = usePage().props;
  const kategori = auth?.user?.kategori_disabilitas;
  
  const [selectedText, setSelectedText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const synth = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      synth.current = window.speechSynthesis;
    }
  }, []);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection.toString().trim();
      
      if (text.length > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        setSelectedText(text);
        setButtonPosition({
          x: rect.left + rect.width / 2,
          y: rect.top - 50
        });
        setShowButton(true);
      } else {
        setShowButton(false);
        setSelectedText('');
      }
    };

    const handleClickOutside = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        // Delay to allow button click to register
        setTimeout(() => {
          if (!isSpeaking) {
            setShowButton(false);
            setSelectedText('');
          }
        }, 100);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('touchend', handleSelection);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('touchend', handleSelection);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSpeaking]);

  const speak = () => {
    if (!synth.current || !selectedText) return;
    
    // Stop any ongoing speech
    synth.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(selectedText);
    utterance.lang = 'id-ID';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setShowButton(false);
      setSelectedText('');
      window.getSelection().removeAllRanges();
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
    };
    
    synth.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synth.current) {
      synth.current.cancel();
      setIsSpeaking(false);
      setShowButton(false);
      setSelectedText('');
      window.getSelection().removeAllRanges();
    }
  };

  // Only render for tidak_bisa_berbicara category
  if (kategori !== 'tidak_bisa_berbicara') return null;

  return (
    <>
      {showButton && (
        <div
          ref={buttonRef}
          className="fixed z-50 animate-in fade-in zoom-in duration-200"
          style={{
            left: `${buttonPosition.x}px`,
            top: `${buttonPosition.y}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="bg-white rounded-lg shadow-2xl border-2 border-cyan-500 overflow-hidden">
            {!isSpeaking ? (
              <button
                onClick={speak}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-medium hover:from-cyan-600 hover:to-teal-700 transition-all"
                title="Bacakan teks yang dipilih"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                <span className="text-sm">Bacakan</span>
                {selectedText.length > 50 && (
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded">
                    {selectedText.length} karakter
                  </span>
                )}
              </button>
            ) : (
              <button
                onClick={stopSpeaking}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:from-red-600 hover:to-red-700 transition-all"
                title="Hentikan pembacaan"
              >
                <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Hentikan</span>
              </button>
            )}
          </div>
          
          {/* Tooltip Arrow */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-3 h-3 bg-cyan-500 rotate-45 border-r-2 border-b-2 border-cyan-500"></div>
        </div>
      )}
    </>
  );
}
