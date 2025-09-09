import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/components/app-layout';

interface HouseFormData {
    address: string;
    owner_name: string;
    owner_phone: string;
    uninhabitable_criteria: string;
    description: string;
    assessment_score: number;
    latitude: string;
    longitude: string;
    district: string;
    village: string;
    [key: string]: string | number | boolean | null | undefined | File | File[];
}

export default function CreateHouse() {
    const { data, setData, post, processing, errors } = useForm<HouseFormData>({
        address: '',
        owner_name: '',
        owner_phone: '',
        uninhabitable_criteria: '',
        description: '',
        assessment_score: 50,
        latitude: '',
        longitude: '',
        district: '',
        village: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/houses');
    };

    const criteriaOptions = [
        'Dinding retak parah',
        'Atap bocor',
        'Lantai tanah',
        'Ventilasi tidak memadai',
        'Sanitasi buruk',
        'Struktur bangunan lemah',
        'Tidak ada akses air bersih',
        'Ruang terlalu sempit',
        'Pencahayaan tidak memadai',
        'Tidak ada kamar mandi',
    ];

    const handleCriteriaChange = (criteria: string, checked: boolean) => {
        const currentCriteria = data.uninhabitable_criteria.split(', ').filter(Boolean);
        if (checked) {
            if (!currentCriteria.includes(criteria)) {
                currentCriteria.push(criteria);
            }
        } else {
            const index = currentCriteria.indexOf(criteria);
            if (index > -1) {
                currentCriteria.splice(index, 1);
            }
        }
        setData('uninhabitable_criteria', currentCriteria.join(', '));
    };

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        ➕ Tambah Data Rumah Tidak Layak Huni
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Masukkan data lengkap rumah yang akan disurvey
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>🏠 Informasi Dasar</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Alamat Lengkap *
                                </label>
                                <textarea
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                    placeholder="Masukkan alamat lengkap rumah..."
                                />
                                {errors.address && (
                                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nama Pemilik *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.owner_name}
                                        onChange={(e) => setData('owner_name', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nama pemilik rumah"
                                    />
                                    {errors.owner_name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.owner_name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nomor Telepon
                                    </label>
                                    <input
                                        type="tel"
                                        value={data.owner_phone}
                                        onChange={(e) => setData('owner_phone', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nomor telepon pemilik"
                                    />
                                    {errors.owner_phone && (
                                        <p className="text-red-500 text-sm mt-1">{errors.owner_phone}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Kecamatan
                                    </label>
                                    <input
                                        type="text"
                                        value={data.district}
                                        onChange={(e) => setData('district', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nama kecamatan"
                                    />
                                    {errors.district && (
                                        <p className="text-red-500 text-sm mt-1">{errors.district}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Desa/Kelurahan
                                    </label>
                                    <input
                                        type="text"
                                        value={data.village}
                                        onChange={(e) => setData('village', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nama desa/kelurahan"
                                    />
                                    {errors.village && (
                                        <p className="text-red-500 text-sm mt-1">{errors.village}</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Assessment */}
                    <Card>
                        <CardHeader>
                            <CardTitle>🔍 Penilaian Kondisi</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Kriteria Ketidaklayakan *
                                </label>
                                <div className="grid md:grid-cols-2 gap-2">
                                    {criteriaOptions.map((criteria) => {
                                        const isChecked = data.uninhabitable_criteria.includes(criteria);
                                        return (
                                            <label key={criteria} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={(e) => handleCriteriaChange(criteria, e.target.checked)}
                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-700">{criteria}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                                {errors.uninhabitable_criteria && (
                                    <p className="text-red-500 text-sm mt-1">{errors.uninhabitable_criteria}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Skor Penilaian * (1-100)
                                </label>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="range"
                                        min="1"
                                        max="100"
                                        value={data.assessment_score}
                                        onChange={(e) => setData('assessment_score', parseInt(e.target.value))}
                                        className="flex-1"
                                    />
                                    <div className="w-16 text-center">
                                        <input
                                            type="number"
                                            min="1"
                                            max="100"
                                            value={data.assessment_score}
                                            onChange={(e) => setData('assessment_score', parseInt(e.target.value) || 1)}
                                            className="w-full px-2 py-1 border border-gray-300 rounded text-center"
                                        />
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    Skor 1-30: Ringan | 31-60: Sedang | 61-80: Berat | 81-100: Sangat Berat
                                </p>
                                {errors.assessment_score && (
                                    <p className="text-red-500 text-sm mt-1">{errors.assessment_score}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Deskripsi Kondisi
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={4}
                                    placeholder="Deskripsikan kondisi detail rumah..."
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Location */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📍 Lokasi Geografis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Latitude
                                    </label>
                                    <input
                                        type="text"
                                        value={data.latitude}
                                        onChange={(e) => setData('latitude', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Contoh: -7.7956"
                                    />
                                    {errors.latitude && (
                                        <p className="text-red-500 text-sm mt-1">{errors.latitude}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Longitude
                                    </label>
                                    <input
                                        type="text"
                                        value={data.longitude}
                                        onChange={(e) => setData('longitude', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Contoh: 110.3695"
                                    />
                                    {errors.longitude && (
                                        <p className="text-red-500 text-sm mt-1">{errors.longitude}</p>
                                    )}
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                💡 Gunakan GPS atau Google Maps untuk mendapatkan koordinat yang akurat
                            </p>
                        </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            Batal
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan Data Rumah'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}