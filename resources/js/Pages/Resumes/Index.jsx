import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PlusCircle, FileText, Edit, Trash2, Eye, Download } from 'lucide-react';

export default function Index({ auth, resumes }) {
    const handleDelete = (slug) => {
        if (confirm('Apakah Anda yakin ingin menghapus resume ini?')) {
            router.delete(route('resumes.destroy', slug));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between pr-4">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Resume Saya
                    </h2>
                    <Link
                        href={route('resumes.create')}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg hover:from-amber-700 hover:to-amber-800 hover:shadow-lg ml-6 md:ml-12"
                    >
                        <PlusCircle className="w-4 h-4" />
                        Buat Resume Baru
                    </Link>
                </div>
            }
        >
            <Head title="Resume Saya" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {resumes.length === 0 ? (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="flex flex-col items-center justify-center p-12 text-center">
                                <FileText className="w-16 h-16 mb-4 text-gray-300" />
                                <h3 className="mb-2 text-lg font-medium text-gray-900">
                                    Belum Ada Resume
                                </h3>
                                <p className="mb-6 text-gray-600">
                                    Mulai buat resume profesional Anda sekarang!
                                </p>
                                <Link
                                    href={route('resumes.create')}
                                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg hover:from-amber-700 hover:to-amber-800 hover:shadow-lg"
                                >
                                    <PlusCircle className="w-5 h-5" />
                                    Buat Resume Pertama
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {resumes.map((resume) => (
                                <div
                                    key={resume.id}
                                    className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-xl hover:-translate-y-1"
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <FileText className="w-8 h-8 text-cyan-600" />
                                            <span className="px-2 py-1 text-xs font-medium text-cyan-700 bg-cyan-100 rounded-full">
                                                {new Date(resume.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        
                                        <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2">
                                            {resume.title}
                                        </h3>
                                        
                                        {resume.profile?.full_name && (
                                            <p className="mb-4 text-sm text-gray-600">
                                                {resume.profile.full_name}
                                            </p>
                                        )}

                                        <div className="flex gap-2 pt-4 border-t border-gray-100">
                                            <Link
                                                href={route('resumes.show', resume.slug)}
                                                className="flex items-center justify-center flex-1 gap-1 px-3 py-2 text-xs font-medium text-gray-700 transition-all duration-300 bg-white border border-gray-300 rounded-lg hover:bg-cyan-600 hover:text-white hover:border-cyan-600"
                                                title="Lihat"
                                            >
                                                <Eye className="w-4 h-4" />
                                                <span className="hidden sm:inline">Lihat</span>
                                            </Link>
                                            
                                            <Link
                                                href={route('resumes.edit', resume.slug)}
                                                className="flex items-center justify-center flex-1 gap-1 px-3 py-2 text-xs font-medium text-gray-700 transition-all duration-300 bg-white border border-gray-300 rounded-lg hover:bg-amber-600 hover:text-white hover:border-amber-600"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                                <span className="hidden sm:inline">Edit</span>
                                            </Link>
                                            
                                            <a
                                                href={route('resumes.pdf', resume.slug)}
                                                className="flex items-center justify-center flex-1 gap-1 px-3 py-2 text-xs font-medium text-gray-700 transition-all duration-300 bg-white border border-gray-300 rounded-lg hover:bg-green-600 hover:text-white hover:border-green-600"
                                                title="Download PDF"
                                                target="_blank"
                                            >
                                                <Download className="w-4 h-4" />
                                                <span className="hidden sm:inline">PDF</span>
                                            </a>
                                            
                                            <button
                                                onClick={() => handleDelete(resume.slug)}
                                                className="flex items-center justify-center px-3 py-2 text-xs font-medium text-gray-700 transition-all duration-300 bg-white border border-gray-300 rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600"
                                                title="Hapus"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
