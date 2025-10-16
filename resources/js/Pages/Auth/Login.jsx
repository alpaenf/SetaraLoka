import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
    <GuestLayout imagePosition="right" imageSrc="/images/login.jpg">
            <Head title="Masuk" />

            <div className="mb-6 text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">Masuk</h2>
                <p className="mt-2 text-sm text-gray-600">Selamat datang kembali di komunitas SetaraLoka</p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 p-3 rounded-lg">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" className="text-gray-700 font-semibold" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 rounded-lg"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" className="text-gray-700 font-semibold" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 rounded-lg"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                            className="text-cyan-600 focus:ring-cyan-500"
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Ingat saya
                        </span>
                    </label>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-bold py-3 px-4 rounded-lg hover:from-cyan-700 hover:to-cyan-800 transition duration-200 shadow-lg disabled:opacity-50"
                    >
                        Masuk
                    </button>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-cyan-600 hover:text-cyan-700 font-semibold"
                        >
                            Lupa password?
                        </Link>
                    )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-center text-sm text-gray-600 mb-3">
                        Belum punya akun?
                    </p>
                    <Link
                        href={route('register')}
                        className="block w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-3 px-4 rounded-lg hover:from-amber-600 hover:to-amber-700 transition duration-200 shadow-lg text-center"
                    >
                        Daftar Sekarang
                    </Link>
                </div>
            </form>
    </GuestLayout>
    );
}
