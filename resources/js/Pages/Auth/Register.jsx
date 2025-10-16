import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register({ roles = [] }) {
    const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: roles[0] ?? 'penyandang_disabilitas',
        _token: csrf,
    });

    const submit = (e) => {
        e.preventDefault();
        // Include _token in payload to satisfy CSRF protection even if headers are stripped
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
            preserveScroll: true,
        });
    };

    return (
    <GuestLayout imagePosition="left" imageSrc="/images/register.jpg">
            <Head title="Daftar" />

            <div className="mb-6 text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">Daftar</h2>
                <p className="mt-2 text-sm text-gray-600">Bergabunglah dengan komunitas SetaraLoka</p>
            </div>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" className="text-gray-700 font-semibold" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 rounded-lg"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" className="text-gray-700 font-semibold" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 rounded-lg"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="role" value="Peran" className="text-gray-700 font-semibold" />

                    <select 
                        id="role" 
                        name="role" 
                        value={data.role} 
                        onChange={(e)=>setData('role', e.target.value)} 
                        className="mt-1 block w-full border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 rounded-lg shadow-sm"
                    >
                        {roles.map(r => (
                            <option key={r} value={r}>{r.replace(/_/g,' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                        ))}
                    </select>

                    <InputError message={errors.role} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" className="text-gray-700 font-semibold" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 rounded-lg"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Password"
                        className="text-gray-700 font-semibold"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 rounded-lg"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-bold py-3 px-4 rounded-lg hover:from-cyan-700 hover:to-cyan-800 transition duration-200 shadow-lg disabled:opacity-50"
                    >
                        Daftar
                    </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-center text-sm text-gray-600 mb-3">
                        Sudah punya akun?
                    </p>
                    <Link
                        href={route('login')}
                        className="block w-full bg-white text-cyan-600 font-bold py-3 px-4 rounded-lg border-2 border-cyan-600 hover:bg-cyan-50 transition duration-200 text-center"
                    >
                        Masuk di Sini
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
