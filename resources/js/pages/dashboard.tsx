import React from 'react';
import { Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/app-layout';

interface House {
    id: number;
    address: string;
    owner_name: string;
    status: string;
    assessment_score: number;
    surveyor: {
        name: string;
    };
    validator?: {
        name: string;
    };
    created_at: string;
}

interface DashboardProps {
    stats: Record<string, number>;
    recentHouses: House[];
    pendingValidation: House[];
    userRole: string;
    [key: string]: unknown;
}

export default function Dashboard({ stats, recentHouses, pendingValidation, userRole }: DashboardProps) {
    const getStatusBadge = (status: string) => {
        const badges = {
            pending: 'bg-yellow-100 text-yellow-800',
            valid: 'bg-green-100 text-green-800',
            repaired: 'bg-blue-100 text-blue-800',
            rejected: 'bg-red-100 text-red-800'
        };
        const labels = {
            pending: 'Menunggu',
            valid: 'Valid',
            repaired: 'Diperbaiki',
            rejected: 'Ditolak'
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${badges[status as keyof typeof badges]}`}>
                {labels[status as keyof typeof labels]}
            </span>
        );
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-red-600 font-bold';
        if (score >= 60) return 'text-orange-600 font-semibold';
        return 'text-yellow-600';
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold">📊 Dashboard</h1>
                    <p className="text-gray-600">
                        Sistem Informasi Rekapitulasi Rumah Tidak Layak Huni
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {Object.entries(stats).map(([key, value]) => {
                        const statConfig = {
                            total_houses: { label: 'Total Rumah', icon: '🏠', color: 'blue' },
                            pending_validation: { label: 'Menunggu Validasi', icon: '⏳', color: 'yellow' },
                            valid_houses: { label: 'Rumah Valid', icon: '✅', color: 'green' },
                            repaired_houses: { label: 'Sudah Diperbaiki', icon: '🔧', color: 'blue' },
                            my_surveys: { label: 'Survey Saya', icon: '📝', color: 'purple' },
                            validated_surveys: { label: 'Survey Valid', icon: '✅', color: 'green' },
                            repaired_surveys: { label: 'Survey Diperbaiki', icon: '🔧', color: 'blue' },
                            my_validations: { label: 'Validasi Saya', icon: '👨‍🏫', color: 'indigo' },
                            total_users: { label: 'Total Pengguna', icon: '👥', color: 'gray' },
                            active_surveyors: { label: 'Surveyor Aktif', icon: '👨‍🔧', color: 'green' },
                        };
                        
                        const config = statConfig[key as keyof typeof statConfig];
                        if (!config) return null;

                        return (
                            <Card key={key} className="hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {config.label}
                                    </CardTitle>
                                    <span className="text-2xl">{config.icon}</span>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{value}</div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Recent Houses */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                📋 {userRole === 'surveyor' ? 'Survey Terbaru Saya' : 'Data Rumah Terbaru'}
                            </CardTitle>
                            <CardDescription>
                                {userRole === 'surveyor' ? 'Data survey yang telah Anda input' : 'Data rumah yang baru diinput'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recentHouses.length > 0 ? (
                                <div className="space-y-4">
                                    {recentHouses.map((house) => (
                                        <div key={house.id} className="flex items-start justify-between p-3 border rounded-lg">
                                            <div className="flex-1">
                                                <h4 className="font-medium">{house.address}</h4>
                                                <p className="text-sm text-gray-600">
                                                    Pemilik: {house.owner_name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Surveyor: {house.surveyor.name}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    {getStatusBadge(house.status)}
                                                    <span className={`text-sm ${getScoreColor(house.assessment_score)}`}>
                                                        Skor: {house.assessment_score}
                                                    </span>
                                                </div>
                                            </div>
                                            <Link href={`/houses/${house.id}`}>
                                                <Button variant="outline" size="sm">
                                                    Lihat
                                                </Button>
                                            </Link>
                                        </div>
                                    ))}
                                    <div className="text-center pt-2">
                                        <Link href="/houses">
                                            <Button variant="outline">Lihat Semua</Button>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-6 text-gray-500">
                                    <p>Belum ada data rumah</p>
                                    {userRole === 'surveyor' && (
                                        <Link href="/houses/create" className="mt-2">
                                            <Button>Tambah Data Rumah</Button>
                                        </Link>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Pending Validation - Only for Supervisor and Admin */}
                    {(userRole === 'supervisor' || userRole === 'admin') && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    ⏳ Menunggu Validasi
                                </CardTitle>
                                <CardDescription>
                                    Data rumah yang perlu divalidasi
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {pendingValidation.length > 0 ? (
                                    <div className="space-y-4">
                                        {pendingValidation.map((house) => (
                                            <div key={house.id} className="flex items-start justify-between p-3 border rounded-lg border-yellow-200 bg-yellow-50">
                                                <div className="flex-1">
                                                    <h4 className="font-medium">{house.address}</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Pemilik: {house.owner_name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Surveyor: {house.surveyor.name}
                                                    </p>
                                                    <span className={`text-sm ${getScoreColor(house.assessment_score)}`}>
                                                        Skor: {house.assessment_score}
                                                    </span>
                                                </div>
                                                <Link href={`/validation/${house.id}`}>
                                                    <Button size="sm">
                                                        Validasi
                                                    </Button>
                                                </Link>
                                            </div>
                                        ))}
                                        <div className="text-center pt-2">
                                            <Link href="/validation">
                                                <Button variant="outline">Lihat Semua</Button>
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-6 text-gray-500">
                                        <p>🎉 Tidak ada data yang menunggu validasi</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            🚀 Aksi Cepat
                        </CardTitle>
                        <CardDescription>
                            Akses cepat ke fitur-fitur utama
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 md:grid-cols-4">
                            {userRole === 'surveyor' && (
                                <Link href="/houses/create">
                                    <Button className="w-full h-auto flex-col gap-2 p-4">
                                        <span className="text-2xl">➕</span>
                                        <span>Tambah Data Rumah</span>
                                    </Button>
                                </Link>
                            )}
                            
                            <Link href="/houses">
                                <Button variant="outline" className="w-full h-auto flex-col gap-2 p-4">
                                    <span className="text-2xl">🏠</span>
                                    <span>Lihat Data Rumah</span>
                                </Button>
                            </Link>

                            {(userRole === 'supervisor' || userRole === 'admin') && (
                                <>
                                    <Link href="/validation">
                                        <Button variant="outline" className="w-full h-auto flex-col gap-2 p-4">
                                            <span className="text-2xl">✅</span>
                                            <span>Validasi Data</span>
                                        </Button>
                                    </Link>
                                    
                                    <Link href="/reports">
                                        <Button variant="outline" className="w-full h-auto flex-col gap-2 p-4">
                                            <span className="text-2xl">📊</span>
                                            <span>Laporan</span>
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}