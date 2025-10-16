import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowLeft, Edit, Download, Trash2, Mail, Phone, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';

export default function Show({ auth, resume }) {
    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus resume ini?')) {
            router.delete(route('resumes.destroy', resume.slug));
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const [year, month] = dateString.split('-');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        return `${months[parseInt(month) - 1]} ${year}`;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('resumes.index')}
                            className="p-2 text-gray-600 transition-colors rounded-lg hover:bg-gray-100 hover:text-gray-900"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Preview Resume
                        </h2>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-auto">
                        <Link
                            href={route('resumes.edit', resume.slug)}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg hover:from-amber-700 hover:to-amber-800 hover:shadow-lg"
                        >
                            <Edit className="w-4 h-4" />
                            <span className="hidden sm:inline">Edit</span>
                        </Link>
                        <a
                            href={route('resumes.pdf', resume.slug)}
                            target="_blank"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-700 hover:to-green-800 hover:shadow-lg"
                        >
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Download PDF</span>
                        </a>
                        <button
                            onClick={handleDelete}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 hover:shadow-lg"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Hapus</span>
                        </button>
                    </div>
                </div>
            }
        >
            <Head title={resume.title} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    {/* Resume Preview - Print Ready */}
                    <div className="p-8 bg-white shadow-sm sm:rounded-lg print:shadow-none">
                        {/* Header */}
                        <div className="pb-6 mb-6 border-b-2 border-cyan-600">
                            <h1 className="mb-2 text-3xl font-bold text-gray-900">
                                {resume.profile?.full_name || 'Nama Tidak Tersedia'}
                            </h1>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                {resume.profile?.email && (
                                    <div className="flex items-center gap-1">
                                        <Mail className="w-4 h-4" />
                                        <span>{resume.profile.email}</span>
                                    </div>
                                )}
                                {resume.profile?.phone && (
                                    <div className="flex items-center gap-1">
                                        <Phone className="w-4 h-4" />
                                        <span>{resume.profile.phone}</span>
                                    </div>
                                )}
                                {resume.profile?.address && (
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{resume.profile.address}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Summary */}
                        {resume.profile?.summary && (
                            <div className="mb-6">
                                <h2 className="flex items-center gap-2 mb-3 text-xl font-semibold text-cyan-700">
                                    <Award className="w-5 h-5" />
                                    Ringkasan Profil
                                </h2>
                                <p className="leading-relaxed text-gray-700 whitespace-pre-line">
                                    {resume.profile.summary}
                                </p>
                            </div>
                        )}

                        {/* Experience */}
                        {resume.experience && resume.experience.length > 0 && (
                            <div className="mb-6">
                                <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-cyan-700">
                                    <Briefcase className="w-5 h-5" />
                                    Pengalaman Kerja
                                </h2>
                                <div className="space-y-4">
                                    {resume.experience.map((exp, index) => (
                                        <div key={index} className="relative pl-4 border-l-2 border-cyan-300">
                                            <div className="mb-1">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {exp.position}
                                                </h3>
                                                <div className="flex items-center justify-between text-sm text-gray-600">
                                                    <span className="font-medium">{exp.company}</span>
                                                    {exp.location && <span>{exp.location}</span>}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {formatDate(exp.start_date)} - {exp.is_current ? 'Sekarang' : formatDate(exp.end_date)}
                                                </div>
                                            </div>
                                            {exp.description && (
                                                <p className="mt-2 text-gray-700 whitespace-pre-line">
                                                    {exp.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Education */}
                        {resume.education && resume.education.length > 0 && (
                            <div className="mb-6">
                                <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-cyan-700">
                                    <GraduationCap className="w-5 h-5" />
                                    Pendidikan
                                </h2>
                                <div className="space-y-4">
                                    {resume.education.map((edu, index) => (
                                        <div key={index} className="relative pl-4 border-l-2 border-amber-300">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {edu.school}
                                            </h3>
                                            <div className="text-sm text-gray-600">
                                                <span className="font-medium">{edu.degree}</span>
                                                {edu.field && <span> - {edu.field}</span>}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {edu.start_year && edu.end_year && `${edu.start_year} - ${edu.end_year}`}
                                            </div>
                                            {edu.description && (
                                                <p className="mt-2 text-gray-700">
                                                    {edu.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Skills */}
                        {resume.skills && resume.skills.length > 0 && (
                            <div className="mb-6">
                                <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-cyan-700">
                                    <Award className="w-5 h-5" />
                                    Keterampilan
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {resume.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 text-sm font-medium text-cyan-700 bg-cyan-100 rounded-full"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Footer */}
                        <div className="pt-6 mt-6 text-xs text-center text-gray-400 border-t border-gray-200">
                            Resume dibuat menggunakan SetaraLoka Resume Builder
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style jsx>{`
                @media print {
                    header, nav, button, .print\\:hidden {
                        display: none !important;
                    }
                    body {
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
