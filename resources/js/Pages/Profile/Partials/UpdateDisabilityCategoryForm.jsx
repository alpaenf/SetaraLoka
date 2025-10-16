import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

export default function UpdateDisabilityCategoryForm({ className = '' }) {
    const { auth } = usePage().props;
    const user = auth.user;
    
    // Only show for penyandang_disabilitas role
    const hasDisabledRole = user?.roles?.some(role => role.name === 'penyandang_disabilitas');
    
    if (!hasDisabledRole) {
        return null;
    }

    const [showConfirmation, setShowConfirmation] = useState(false);

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        kategori_disabilitas: user.kategori_disabilitas || '',
    });

    const categories = [
        {
            value: 'tidak_bisa_berjalan',
            label: 'Mobilitas - Tidak Bisa Berjalan',
            description: 'Akses fitur: Remote jobs, MapWidget, filter wheelchair accessible',
            icon: '♿',
            color: 'bg-cyan-50 border-cyan-200 hover:border-cyan-400',
            available: true,
        },
        {
            value: 'tidak_bisa_berbicara',
            label: 'Komunikasi - Tidak Bisa Berbicara',
            description: 'Akses fitur: Text-to-Speech, AccessMate AI, Voice-to-Text',
            icon: '💬',
            color: 'bg-teal-50 border-teal-200 hover:border-teal-400',
            available: true,
        },
        {
            value: 'tidak_bisa_melihat',
            label: 'Visual - Tidak Bisa Melihat',
            description: 'Fitur dalam pengembangan',
            icon: '👁️',
            color: 'bg-gray-50 border-gray-200',
            available: false,
        },
        {
            value: 'tidak_bisa_mendengar',
            label: 'Pendengaran - Tidak Bisa Mendengar',
            description: 'Fitur dalam pengembangan',
            icon: '👂',
            color: 'bg-gray-50 border-gray-200',
            available: false,
        },
    ];

    const currentCategory = categories.find(cat => cat.value === user.kategori_disabilitas);
    const selectedCategory = categories.find(cat => cat.value === data.kategori_disabilitas);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // If changing category, show confirmation
        if (data.kategori_disabilitas !== user.kategori_disabilitas) {
            setShowConfirmation(true);
        }
    };

    const confirmChange = () => {
        patch(route('profile.update.category'), {
            onSuccess: () => {
                setShowConfirmation(false);
            },
            preserveScroll: true,
        });
    };

    const cancelChange = () => {
        setShowConfirmation(false);
        setData('kategori_disabilitas', user.kategori_disabilitas || '');
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Kategori Disabilitas
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Pilih kategori disabilitas Anda untuk mengakses fitur yang sesuai dengan kebutuhan Anda.
                </p>
            </header>

            {/* Current Category Display */}
            {currentCategory && (
                <div className="mt-4 p-4 bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200 rounded-lg">
                    <div className="flex items-start gap-3">
                        <span className="text-3xl">{currentCategory.icon}</span>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                Kategori Saat Ini: {currentCategory.label}
                                <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
                                    Aktif
                                </span>
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                                {currentCategory.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="kategori_disabilitas" value="Pilih Kategori Baru" />

                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categories.map((category) => (
                            <label
                                key={category.value}
                                className={`
                                    relative block cursor-pointer rounded-xl border-2 p-4 transition-all
                                    ${category.available ? category.color : 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'}
                                    ${data.kategori_disabilitas === category.value ? 'ring-2 ring-cyan-500 border-cyan-500' : ''}
                                `}
                            >
                                <input
                                    type="radio"
                                    name="kategori_disabilitas"
                                    value={category.value}
                                    checked={data.kategori_disabilitas === category.value}
                                    onChange={(e) => setData('kategori_disabilitas', e.target.value)}
                                    disabled={!category.available}
                                    className="sr-only"
                                />
                                
                                <div className="flex items-start gap-3">
                                    <span className="text-3xl">{category.icon}</span>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold text-gray-900">
                                                {category.label}
                                            </h4>
                                            {!category.available && (
                                                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                                                    Coming Soon
                                                </span>
                                            )}
                                            {category.available && data.kategori_disabilitas === category.value && (
                                                <svg className="w-5 h-5 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>

                    <InputError className="mt-2" message={errors.kategori_disabilitas} />
                </div>

                {/* Warning if changing category */}
                {data.kategori_disabilitas && data.kategori_disabilitas !== user.kategori_disabilitas && (
                    <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4">
                        <div className="flex gap-3">
                            <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <div className="flex-1">
                                <h4 className="font-semibold text-yellow-800">Perhatian</h4>
                                <p className="text-sm text-yellow-700 mt-1">
                                    Mengubah kategori akan mengubah fitur yang tersedia di dashboard Anda. 
                                    Dashboard akan disesuaikan dengan kategori baru setelah perubahan disimpan.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton 
                        disabled={processing || !data.kategori_disabilitas || data.kategori_disabilitas === user.kategori_disabilitas}
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Tersimpan.</p>
                    </Transition>
                </div>
            </form>

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        {/* Background overlay */}
                        <div 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                            aria-hidden="true"
                            onClick={cancelChange}
                        ></div>

                        {/* Modal panel */}
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                        Konfirmasi Perubahan Kategori
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500 mb-3">
                                            Anda akan mengubah kategori dari:
                                        </p>
                                        <div className="space-y-2">
                                            {currentCategory && (
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="text-xl">{currentCategory.icon}</span>
                                                    <span className="font-medium text-gray-700">{currentCategory.label}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center justify-center">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                </svg>
                                            </div>
                                            {selectedCategory && (
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="text-xl">{selectedCategory.icon}</span>
                                                    <span className="font-medium text-cyan-700">{selectedCategory.label}</span>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500 mt-3">
                                            Fitur dashboard akan berubah sesuai kategori baru. Apakah Anda yakin?
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
                                <button
                                    type="button"
                                    onClick={confirmChange}
                                    disabled={processing}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Ya, Ubah Kategori'}
                                </button>
                                <button
                                    type="button"
                                    onClick={cancelChange}
                                    disabled={processing}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:mt-0 sm:w-auto sm:text-sm"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
