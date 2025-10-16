import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Category() {
    const [selected, setSelected] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = [
        {
            value: 'tidak_bisa_berjalan',
            title: 'Mobilitas',
            subtitle: 'Aksesibilitas Fisik',
            description: 'Akses ke pekerjaan remote, acara online, dan informasi lokasi yang accessible',
            features: [
                'Pekerjaan remote & hybrid',
                'Acara daring dengan akses penuh',
                'Pelatihan online fleksibel',
                'Peta lokasi accessible'
            ],
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
            gradient: 'from-blue-500 via-cyan-500 to-teal-500',
            bgPattern: 'bg-gradient-to-br from-blue-50 to-cyan-50',
            available: true
        },
        {
            value: 'tidak_bisa_berbicara',
            title: 'Komunikasi',
            subtitle: 'Dukungan Asisten AI',
            description: 'Fitur text-to-speech untuk mendengarkan konten dan komunikasi berbasis teks',
            features: [
                'AccessMate AI Assistant',
                'Text-to-Speech Indonesia',
                'Ringkasan konten otomatis',
                'Komunikasi berbasis teks'
            ],
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
            ),
            gradient: 'from-teal-500 via-emerald-500 to-green-500',
            bgPattern: 'bg-gradient-to-br from-teal-50 to-emerald-50',
            available: true
        },
        {
            value: 'coming_soon_visual',
            title: 'Visual',
            subtitle: 'Aksesibilitas Penglihatan',
            description: 'Screen reader, high contrast mode, dan navigasi keyboard',
            features: [
                'Screen reader optimization',
                'High contrast display',
                'Keyboard navigation',
                'Voice command interface'
            ],
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            ),
            gradient: 'from-purple-500 via-pink-500 to-rose-500',
            bgPattern: 'bg-gradient-to-br from-purple-50 to-pink-50',
            available: false
        },
        {
            value: 'coming_soon_hearing',
            title: 'Pendengaran',
            subtitle: 'Aksesibilitas Audio',
            description: 'Subtitle otomatis, visual alerts, dan komunikasi berbasis teks',
            features: [
                'Real-time subtitling',
                'Visual notification system',
                'Sign language support',
                'Text-based communication'
            ],
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
            ),
            gradient: 'from-orange-500 via-amber-500 to-yellow-500',
            bgPattern: 'bg-gradient-to-br from-orange-50 to-amber-50',
            available: false
        },
        {
            value: 'coming_soon_cognitive',
            title: 'Kognitif',
            subtitle: 'Aksesibilitas Pemahaman',
            description: 'Simplified content, step-by-step guides, dan assistive reading',
            features: [
                'Simplified language mode',
                'Step-by-step tutorials',
                'Content summarization',
                'Reading assistance tools'
            ],
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            gradient: 'from-indigo-500 via-violet-500 to-purple-500',
            bgPattern: 'bg-gradient-to-br from-indigo-50 to-violet-50',
            available: false
        }
    ];

    const availableCount = categories.filter(c => c.available).length;
    const totalCount = categories.length;

    const handleSubmit = () => {
        if (!selected) return;
        
        // Check if selected category is available
        const selectedCategory = categories.find(c => c.value === selected);
        if (!selectedCategory || !selectedCategory.available) return;
        
        setIsSubmitting(true);
        router.post(route('disability.category.store'), {
            kategori: selected
        }, {
            onFinish: () => setIsSubmitting(false),
            onError: () => setIsSubmitting(false)
        });
    };

    const handleCategoryClick = (category) => {
        if (category.available) {
            setSelected(category.value);
        }
    };

    return (
        <>
            <Head title="Pilih Kategori Disabilitas" />
            
            <div className="min-h-screen bg-white">
                {/* Top Bar */}
                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 px-6 shadow-lg">
                    <div className="max-w-6xl mx-auto flex items-center gap-4">
                        <img 
                            src="/Images/logo.png" 
                            alt="SetaraLoka" 
                            className="w-10 h-10 object-contain"
                        />
                        <div>
                            <h1 className="text-xl font-bold">SetaraLoka</h1>
                            <p className="text-xs text-cyan-100">Platform Inklusif Indonesia</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 py-12">
                    {/* Info Banner */}
                    <div className="mb-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center text-white">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {availableCount} Kategori Tersedia
                                </h3>
                                <p className="text-gray-700">
                                    Saat ini tersedia <span className="font-semibold text-cyan-600">{availableCount} dari {totalCount} kategori</span> aksesibilitas. 
                                    Kami terus mengembangkan fitur baru untuk memenuhi kebutuhan yang lebih beragam.
                                </p>
                                <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                                    <svg className="w-4 h-4 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Kategori baru akan segera hadir</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Header Section */}
                    <div className="mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Pilih Kategori Aksesibilitas
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl">
                            Kami menyediakan pengalaman yang disesuaikan dengan kebutuhan Anda. 
                            Pilih kategori untuk mengaktifkan fitur yang tepat.
                        </p>
                    </div>

                    {/* Category Cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {categories.map((category) => (
                            <div
                                key={category.value}
                                onClick={() => handleCategoryClick(category)}
                                className={`
                                    group relative overflow-hidden rounded-3xl transition-all duration-300
                                    ${!category.available 
                                        ? 'opacity-60 cursor-not-allowed' 
                                        : 'cursor-pointer hover:shadow-xl hover:scale-[1.02]'
                                    }
                                    ${selected === category.value && category.available
                                        ? 'shadow-2xl scale-[1.02]'
                                        : 'shadow-lg'
                                    }
                                `}
                            >
                                {/* Coming Soon Badge */}
                                {!category.available && (
                                    <div className="absolute top-4 right-4 z-20">
                                        <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                            Coming Soon
                                        </div>
                                    </div>
                                )}

                                {/* Card Background */}
                                <div className="bg-white border border-gray-200 p-8 min-h-[420px] flex flex-col relative">
                                    {/* Overlay for disabled cards */}
                                    {!category.available && (
                                        <div className="absolute inset-0 bg-gray-50/80 backdrop-blur-[1px] z-10"></div>
                                    )}

                                    {/* Header Section */}
                                    <div className="flex items-start justify-between mb-6 relative z-0">
                                        <div className="flex-1">
                                            <div className="text-gray-500 text-sm font-medium mb-1">
                                                {category.subtitle}
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                                {category.title}
                                            </h3>
                                        </div>
                                        <div className={`
                                            p-3 rounded-xl text-white
                                            ${category.value.includes('tidak_bisa_berjalan') ? 'bg-blue-600' : ''}
                                            ${category.value.includes('tidak_bisa_berbicara') ? 'bg-teal-600' : ''}
                                            ${category.value.includes('visual') ? 'bg-purple-600' : ''}
                                            ${category.value.includes('hearing') ? 'bg-orange-600' : ''}
                                            ${category.value.includes('cognitive') ? 'bg-indigo-600' : ''}
                                            ${selected === category.value && category.available ? 'shadow-lg' : ''}
                                        `}>
                                            {category.icon}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-700 mb-6 leading-relaxed relative z-0">
                                        {category.description}
                                    </p>

                                    {/* Features List */}
                                    <div className="space-y-3 flex-1">
                                        {category.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <div className={`
                                                    w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0
                                                    ${category.value.includes('tidak_bisa_berjalan') ? 'bg-blue-100 text-blue-600' : ''}
                                                    ${category.value.includes('tidak_bisa_berbicara') ? 'bg-teal-100 text-teal-600' : ''}
                                                    ${category.value.includes('visual') ? 'bg-purple-100 text-purple-600' : ''}
                                                    ${category.value.includes('hearing') ? 'bg-orange-100 text-orange-600' : ''}
                                                    ${category.value.includes('cognitive') ? 'bg-indigo-100 text-indigo-600' : ''}
                                                `}>
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                                    </svg>
                                                </div>
                                                <span className="text-gray-800 font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Selection Indicator */}
                                    <div className="mt-6 pt-6 border-t border-gray-200 relative z-0">
                                        {selected === category.value && category.available ? (
                                            <div className={`
                                                flex items-center justify-center gap-2 
                                                text-white font-bold py-3 rounded-xl
                                                ${category.value.includes('tidak_bisa_berjalan') ? 'bg-blue-600' : ''}
                                                ${category.value.includes('tidak_bisa_berbicara') ? 'bg-teal-600' : ''}
                                            `}>
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                                </svg>
                                                <span>Dipilih</span>
                                            </div>
                                        ) : (
                                            <div className={`text-center font-medium py-3 ${category.available ? 'text-gray-500' : 'text-gray-400'}`}>
                                                {category.available ? 'Klik untuk memilih' : 'Segera Hadir'}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Border Effect */}
                                {selected === category.value && category.available && (
                                    <div className={`
                                        absolute inset-0 rounded-3xl opacity-20 pointer-events-none border-2
                                        ${category.value.includes('tidak_bisa_berjalan') ? 'border-blue-600' : ''}
                                        ${category.value.includes('tidak_bisa_berbicara') ? 'border-teal-600' : ''}
                                    `}></div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col items-center gap-6">
                        <button
                            onClick={handleSubmit}
                            disabled={!selected || isSubmitting}
                            className={`
                                relative overflow-hidden px-16 py-5 rounded-2xl font-bold text-lg 
                                transition-all duration-300 disabled:cursor-not-allowed
                                ${selected && !isSubmitting
                                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1'
                                    : 'bg-gray-200 text-gray-400'
                                }
                            `}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-3">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Menyimpan Preferensi...
                                </span>
                            ) : (
                                'Lanjutkan'
                            )}
                        </button>
                        
                        {!selected && (
                            <p className="text-gray-500">
                                Pilih kategori untuk melanjutkan
                            </p>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-16 pt-8 border-t border-gray-200">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                            </svg>
                            <span>Preferensi dapat diubah kapan saja melalui pengaturan profil</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
