
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children, imagePosition = 'right', imageSrc = null }) {
    // imagePosition: 'right' | 'left'
    const isLeft = imagePosition === 'left';
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-amber-50 py-8 px-4">
            <div className="w-full max-w-5xl">
                <div className="mb-6 flex items-center justify-center">
                    <Link href="/" className="flex items-center justify-center space-x-3">
                        <img 
                            src="/images/logo.png" 
                            alt="SetaraLoka Logo" 
                            className="h-16 w-auto"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%230891b2'/%3E%3Ctext x='32' y='38' font-size='24' text-anchor='middle' fill='white' font-weight='bold'%3ESL%3C/text%3E%3C/svg%3E";
                            }}
                        />
                        <span className="text-2xl font-extrabold">
                            <span className="text-cyan-600">Setara</span>
                            <span className="text-amber-600">Loka</span>
                        </span>
                    </Link>
                </div>

                <div className="overflow-hidden bg-white shadow-xl sm:rounded-2xl border border-cyan-100">
                    <div className={`flex flex-col md:flex-row ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        {/* Form pane */}
                        <div className="w-full md:w-1/2 px-8 py-10 sm:px-12 sm:py-12">
                            {children}
                        </div>

                        {/* Illustration / promo pane */}
                        <div className="hidden md:block md:w-1/2">
                            <div className={`h-full w-full flex items-center justify-center p-8 rounded-tr-2xl rounded-br-2xl ${isLeft ? 'md:rounded-tl-2xl md:rounded-bl-2xl md:rounded-tr-none md:rounded-br-none' : ''}`}>
                                    {imageSrc ? (
                                        <img src={imageSrc} alt="Auth illustration" className="object-cover w-full h-full" />
                                    ) : (
                                        <div className={`w-full h-full rounded-2xl flex items-center justify-center text-white p-8 ${isLeft ? 'bg-gradient-to-r from-amber-500 to-rose-400' : 'bg-gradient-to-l from-amber-500 to-rose-400'}`}>
                                        <div className="max-w-md text-center">
                        <h3 className="text-3xl font-extrabold">Hello, Friend!</h3>
                        <p className="mt-3 text-sm opacity-90">Enter your personal details and start the journey with us.</p>
                                                <div className="mt-6">
                                                    <Link href="/" className="inline-block border border-white text-white px-5 py-2 rounded-full text-sm">Learn More</Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <Link href="/" className="text-cyan-600 hover:text-cyan-700 font-semibold">
                        ← Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    );
}
