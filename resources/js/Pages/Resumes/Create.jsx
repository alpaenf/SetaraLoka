import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PlusCircle, Trash2, ArrowLeft, Save } from 'lucide-react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        profile: {
            full_name: auth.user.name || '',
            email: auth.user.email || '',
            phone: auth.user.phone || '',
            address: '',
            summary: '',
        },
        education: [],
        experience: [],
        skills: [],
    });

    const addEducation = () => {
        setData('education', [
            ...data.education,
            { school: '', degree: '', field: '', start_year: '', end_year: '', description: '' }
        ]);
    };

    const removeEducation = (index) => {
        setData('education', data.education.filter((_, i) => i !== index));
    };

    const updateEducation = (index, field, value) => {
        const newEducation = [...data.education];
        newEducation[index][field] = value;
        setData('education', newEducation);
    };

    const addExperience = () => {
        setData('experience', [
            ...data.experience,
            { company: '', position: '', location: '', start_date: '', end_date: '', description: '', is_current: false }
        ]);
    };

    const removeExperience = (index) => {
        setData('experience', data.experience.filter((_, i) => i !== index));
    };

    const updateExperience = (index, field, value) => {
        const newExperience = [...data.experience];
        newExperience[index][field] = value;
        setData('experience', newExperience);
    };

    const addSkill = () => {
        setData('skills', [...data.skills, '']);
    };

    const removeSkill = (index) => {
        setData('skills', data.skills.filter((_, i) => i !== index));
    };

    const updateSkill = (index, value) => {
        const newSkills = [...data.skills];
        newSkills[index] = value;
        setData('skills', newSkills);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('resumes.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('resumes.index')}
                        className="p-2 text-gray-600 transition-colors rounded-lg hover:bg-gray-100 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Buat Resume Baru
                    </h2>
                </div>
            }
        >
            <Head title="Buat Resume" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Judul Resume */}
                        <div className="p-6 bg-white shadow-sm sm:rounded-lg">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">Judul Resume</h3>
                            <div>
                                <InputLabel htmlFor="title" value="Judul *" />
                                <TextInput
                                    id="title"
                                    type="text"
                                    className="block w-full mt-1"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Contoh: Full Stack Developer - John Doe"
                                    required
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            </div>
                        </div>

                        {/* Profil */}
                        <div className="p-6 bg-white shadow-sm sm:rounded-lg">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">Profil Pribadi</h3>
                            <div className="space-y-4">
                                <div>
                                    <InputLabel htmlFor="full_name" value="Nama Lengkap *" />
                                    <TextInput
                                        id="full_name"
                                        type="text"
                                        className="block w-full mt-1"
                                        value={data.profile.full_name}
                                        onChange={(e) => setData('profile', { ...data.profile, full_name: e.target.value })}
                                        required
                                    />
                                    {errors['profile.full_name'] && <p className="mt-1 text-sm text-red-600">{errors['profile.full_name']}</p>}
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <InputLabel htmlFor="email" value="Email *" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            className="block w-full mt-1"
                                            value={data.profile.email}
                                            onChange={(e) => setData('profile', { ...data.profile, email: e.target.value })}
                                            required
                                        />
                                        {errors['profile.email'] && <p className="mt-1 text-sm text-red-600">{errors['profile.email']}</p>}
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="phone" value="Telepon" />
                                        <TextInput
                                            id="phone"
                                            type="tel"
                                            className="block w-full mt-1"
                                            value={data.profile.phone}
                                            onChange={(e) => setData('profile', { ...data.profile, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="address" value="Alamat" />
                                    <TextInput
                                        id="address"
                                        type="text"
                                        className="block w-full mt-1"
                                        value={data.profile.address}
                                        onChange={(e) => setData('profile', { ...data.profile, address: e.target.value })}
                                        placeholder="Kota, Negara"
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="summary" value="Ringkasan Profil" />
                                    <textarea
                                        id="summary"
                                        rows={4}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                                        value={data.profile.summary}
                                        onChange={(e) => setData('profile', { ...data.profile, summary: e.target.value })}
                                        placeholder="Deskripsikan diri Anda, pengalaman, dan tujuan karir..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Pendidikan */}
                        <div className="p-6 bg-white shadow-sm sm:rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Pendidikan</h3>
                                <button
                                    type="button"
                                    onClick={addEducation}
                                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-cyan-700 transition-colors bg-cyan-100 rounded-lg hover:bg-cyan-200"
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    Tambah Pendidikan
                                </button>
                            </div>

                            {data.education.length === 0 ? (
                                <p className="text-sm text-center text-gray-500">Belum ada pendidikan ditambahkan</p>
                            ) : (
                                <div className="space-y-4">
                                    {data.education.map((edu, index) => (
                                        <div key={index} className="p-4 border-2 border-gray-200 rounded-lg">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-sm font-medium text-gray-600">Pendidikan #{index + 1}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeEducation(index)}
                                                    className="p-1 text-red-600 transition-colors rounded hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <TextInput
                                                        placeholder="Nama Sekolah/Universitas"
                                                        value={edu.school}
                                                        onChange={(e) => updateEducation(index, 'school', e.target.value)}
                                                    />
                                                    <TextInput
                                                        placeholder="Gelar/Jurusan"
                                                        value={edu.degree}
                                                        onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                                    />
                                                </div>
                                                <TextInput
                                                    placeholder="Bidang Studi"
                                                    value={edu.field}
                                                    onChange={(e) => updateEducation(index, 'field', e.target.value)}
                                                />
                                                <div className="grid grid-cols-2 gap-3">
                                                    <TextInput
                                                        placeholder="Tahun Mulai"
                                                        value={edu.start_year}
                                                        onChange={(e) => updateEducation(index, 'start_year', e.target.value)}
                                                    />
                                                    <TextInput
                                                        placeholder="Tahun Selesai"
                                                        value={edu.end_year}
                                                        onChange={(e) => updateEducation(index, 'end_year', e.target.value)}
                                                    />
                                                </div>
                                                <textarea
                                                    rows={2}
                                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                                                    placeholder="Deskripsi atau prestasi..."
                                                    value={edu.description}
                                                    onChange={(e) => updateEducation(index, 'description', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Pengalaman */}
                        <div className="p-6 bg-white shadow-sm sm:rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Pengalaman Kerja</h3>
                                <button
                                    type="button"
                                    onClick={addExperience}
                                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-amber-700 transition-colors bg-amber-100 rounded-lg hover:bg-amber-200"
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    Tambah Pengalaman
                                </button>
                            </div>

                            {data.experience.length === 0 ? (
                                <p className="text-sm text-center text-gray-500">Belum ada pengalaman ditambahkan</p>
                            ) : (
                                <div className="space-y-4">
                                    {data.experience.map((exp, index) => (
                                        <div key={index} className="p-4 border-2 border-gray-200 rounded-lg">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-sm font-medium text-gray-600">Pengalaman #{index + 1}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeExperience(index)}
                                                    className="p-1 text-red-600 transition-colors rounded hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <TextInput
                                                        placeholder="Nama Perusahaan"
                                                        value={exp.company}
                                                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                                    />
                                                    <TextInput
                                                        placeholder="Posisi/Jabatan"
                                                        value={exp.position}
                                                        onChange={(e) => updateExperience(index, 'position', e.target.value)}
                                                    />
                                                </div>
                                                <TextInput
                                                    placeholder="Lokasi"
                                                    value={exp.location}
                                                    onChange={(e) => updateExperience(index, 'location', e.target.value)}
                                                />
                                                <div className="grid grid-cols-2 gap-3">
                                                    <TextInput
                                                        type="month"
                                                        placeholder="Bulan/Tahun Mulai"
                                                        value={exp.start_date}
                                                        onChange={(e) => updateExperience(index, 'start_date', e.target.value)}
                                                    />
                                                    <TextInput
                                                        type="month"
                                                        placeholder="Bulan/Tahun Selesai"
                                                        value={exp.end_date}
                                                        onChange={(e) => updateExperience(index, 'end_date', e.target.value)}
                                                        disabled={exp.is_current}
                                                    />
                                                </div>
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={exp.is_current}
                                                        onChange={(e) => updateExperience(index, 'is_current', e.target.checked)}
                                                        className="text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                                                    />
                                                    <span className="text-sm text-gray-700">Saat ini bekerja di sini</span>
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                                                    placeholder="Deskripsi tanggung jawab dan pencapaian..."
                                                    value={exp.description}
                                                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Skills */}
                        <div className="p-6 bg-white shadow-sm sm:rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Keterampilan</h3>
                                <button
                                    type="button"
                                    onClick={addSkill}
                                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-cyan-700 transition-colors bg-cyan-100 rounded-lg hover:bg-cyan-200"
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    Tambah Skill
                                </button>
                            </div>

                            {data.skills.length === 0 ? (
                                <p className="text-sm text-center text-gray-500">Belum ada keterampilan ditambahkan</p>
                            ) : (
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    {data.skills.map((skill, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <TextInput
                                                placeholder="Nama keterampilan"
                                                value={skill}
                                                onChange={(e) => updateSkill(index, e.target.value)}
                                                className="flex-1"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeSkill(index)}
                                                className="p-2 text-red-600 transition-colors rounded hover:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-3">
                            <Link
                                href={route('resumes.index')}
                                className="inline-flex items-center justify-center flex-1 gap-2 px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-300 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center flex-1 gap-2 px-4 py-3 text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-lg hover:from-cyan-700 hover:to-cyan-800 hover:shadow-lg disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                {processing ? 'Menyimpan...' : 'Simpan Resume'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
