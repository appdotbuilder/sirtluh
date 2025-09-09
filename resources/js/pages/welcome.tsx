import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            🏠 Sistem Informasi
                            <br />
                            <span className="text-blue-600">Rekapitulasi Rumah</span>
                            <br />
                            Tidak Layak Huni
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Platform digital untuk pendataan, validasi, dan pelaporan rumah tidak layak huni 
                            dengan sistem yang terintegrasi dan mudah digunakan.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/login">
                                <Button size="lg" className="w-full sm:w-auto">
                                    🔑 Masuk ke Sistem
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                    📝 Daftar Akun
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            🚀 Fitur Utama Sistem
                        </h2>
                        <p className="text-lg text-gray-600">
                            Solusi lengkap untuk mengelola data rumah tidak layak huni
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="text-4xl mb-4">📊</div>
                                <CardTitle className="text-xl">Pendataan Digital</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    Input data rumah tidak layak huni dengan form digital yang lengkap 
                                    termasuk foto dan koordinat GPS.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="text-4xl mb-4">✅</div>
                                <CardTitle className="text-xl">Validasi Data</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    Sistem validasi bertingkat dengan review supervisor 
                                    untuk memastikan akurasi data lapangan.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="text-4xl mb-4">📈</div>
                                <CardTitle className="text-xl">Laporan Real-time</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    Dashboard dan laporan yang dapat difilter berdasarkan 
                                    wilayah, status, dan kriteria lainnya.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="text-4xl mb-4">👥</div>
                                <CardTitle className="text-xl">Manajemen User</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    Sistem role-based dengan pembagian akses untuk 
                                    Admin, Supervisor, dan Petugas Pendata.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Role-based Features */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            🎯 Peran Pengguna
                        </h2>
                        <p className="text-lg text-gray-600">
                            Sistem dengan pembagian akses sesuai peran dan tanggung jawab
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg p-8 shadow-md">
                            <div className="text-center">
                                <div className="text-5xl mb-4">👨‍💼</div>
                                <h3 className="text-2xl font-bold text-blue-600 mb-4">Admin</h3>
                                <ul className="text-left space-y-2 text-gray-600">
                                    <li>✓ Kelola pengguna sistem</li>
                                    <li>✓ Akses semua data dan laporan</li>
                                    <li>✓ Konfigurasi sistem</li>
                                    <li>✓ Export data dan laporan</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-8 shadow-md">
                            <div className="text-center">
                                <div className="text-5xl mb-4">👨‍🏫</div>
                                <h3 className="text-2xl font-bold text-green-600 mb-4">Supervisor</h3>
                                <ul className="text-left space-y-2 text-gray-600">
                                    <li>✓ Validasi data survey</li>
                                    <li>✓ Lihat semua data rumah</li>
                                    <li>✓ Generate laporan rekapitulasi</li>
                                    <li>✓ Monitor progress survey</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-8 shadow-md">
                            <div className="text-center">
                                <div className="text-5xl mb-4">👨‍🔧</div>
                                <h3 className="text-2xl font-bold text-orange-600 mb-4">Petugas Pendata</h3>
                                <ul className="text-left space-y-2 text-gray-600">
                                    <li>✓ Input data rumah</li>
                                    <li>✓ Upload foto kondisi</li>
                                    <li>✓ Edit data yang diinput</li>
                                    <li>✓ Track status validasi</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Preview */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            📋 Jenis Rekapitulasi
                        </h2>
                        <p className="text-lg text-gray-600">
                            Berbagai format laporan untuk kebutuhan analisis
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    🗺️ Berdasarkan Wilayah
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Rekapitulasi per kecamatan, desa, dan RT/RW 
                                    untuk analisis distribusi geografis.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    🔍 Berdasarkan Kriteria
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Analisis berdasarkan jenis kerusakan dan 
                                    tingkat ketidaklayakan hunian.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    🔧 Status Perbaikan
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Tracking rumah yang sudah diperbaiki dan 
                                    progress program rehabilitasi.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 bg-blue-600">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Siap Memulai Pendataan Digital?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Bergabunglah dengan sistem yang sudah dipercaya untuk mengelola 
                        data rumah tidak layak huni secara efisien dan akurat.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/login">
                            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                🚀 Mulai Sekarang
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600">
                                📞 Hubungi Admin
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}