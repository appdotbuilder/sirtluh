import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/components/app-layout';

interface House {
    id: number;
    address: string;
    owner_name: string;
    owner_phone: string | null;
    status: string;
    assessment_score: number;
    district: string | null;
    village: string | null;
    surveyor: {
        name: string;
    };
    validator?: {
        name: string;
    };
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    total: number;
    per_page: number;
    current_page: number;
}

interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface HousesIndexProps {
    houses: {
        data: House[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    districts: string[];
    villages: string[];
    stats: {
        total: number;
        pending: number;
        valid: number;
        repaired: number;
    };
    filters: {
        status?: string;
        district?: string;
        village?: string;
        search?: string;
    };
    [key: string]: unknown;
}

export default function HousesIndex({ houses, stats, filters }: HousesIndexProps) {
    const { auth } = usePage<{ auth: { user: AuthUser } }>().props;
    const userRole = auth.user.role;

    const [search, setSearch] = useState(filters.search || '');

    const handleFilter = (key: string, value: string) => {
        router.get('/houses', {
            ...filters,
            [key]: value === 'all' ? '' : value,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/houses', {
            ...filters,
            search: search,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            valid: 'bg-green-100 text-green-800 border-green-200',
            repaired: 'bg-blue-100 text-blue-800 border-blue-200',
            rejected: 'bg-red-100 text-red-800 border-red-200'
        };
        const labels = {
            pending: 'Menunggu',
            valid: 'Valid',
            repaired: 'Diperbaiki',
            rejected: 'Ditolak'
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${badges[status as keyof typeof badges]}`}>
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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            🏠 Data Rumah Tidak Layak Huni
                        </h1>
                        <p className="text-gray-600 mt-1">
                            {userRole === 'surveyor' ? 'Data survey yang Anda input' : 'Semua data rumah tidak layak huni'}
                        </p>
                    </div>
                    {userRole === 'surveyor' && (
                        <Link href="/houses/create">
                            <Button className="flex items-center gap-2">
                                ➕ Tambah Data Rumah
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Statistics */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Total Rumah</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-yellow-600">Menunggu</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.pending}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-green-600">Valid</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.valid}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-blue-600">Diperbaiki</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.repaired}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>🔍 Filter & Pencarian</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Search */}
                            <form onSubmit={handleSearch} className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Cari berdasarkan alamat atau nama pemilik..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Button type="submit">Cari</Button>
                            </form>

                            {/* Filter buttons */}
                            <div className="flex flex-wrap gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">Status:</span>
                                    <button
                                        onClick={() => handleFilter('status', 'all')}
                                        className={`px-3 py-1 rounded-md text-sm ${!filters.status ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
                                    >
                                        Semua
                                    </button>
                                    <button
                                        onClick={() => handleFilter('status', 'pending')}
                                        className={`px-3 py-1 rounded-md text-sm ${filters.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}
                                    >
                                        Menunggu
                                    </button>
                                    <button
                                        onClick={() => handleFilter('status', 'valid')}
                                        className={`px-3 py-1 rounded-md text-sm ${filters.status === 'valid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
                                    >
                                        Valid
                                    </button>
                                    <button
                                        onClick={() => handleFilter('status', 'repaired')}
                                        className={`px-3 py-1 rounded-md text-sm ${filters.status === 'repaired' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
                                    >
                                        Diperbaiki
                                    </button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Houses Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {houses.data.map((house) => (
                        <Card key={house.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg line-clamp-2">{house.address}</CardTitle>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Pemilik: {house.owner_name}
                                        </p>
                                        {house.owner_phone && (
                                            <p className="text-sm text-gray-500">📞 {house.owner_phone}</p>
                                        )}
                                    </div>
                                    {getStatusBadge(house.status)}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Skor Penilaian:</span>
                                        <span className={`font-bold ${getScoreColor(house.assessment_score)}`}>
                                            {house.assessment_score}
                                        </span>
                                    </div>
                                    
                                    {house.district && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Kecamatan:</span>
                                            <span className="text-sm">{house.district}</span>
                                        </div>
                                    )}
                                    
                                    {house.village && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Desa:</span>
                                            <span className="text-sm">{house.village}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Surveyor:</span>
                                        <span className="text-sm">{house.surveyor.name}</span>
                                    </div>

                                    {house.validator && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Validator:</span>
                                            <span className="text-sm">{house.validator.name}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-sm text-gray-500">
                                            {new Date(house.created_at).toLocaleDateString('id-ID')}
                                        </span>
                                        <Link href={`/houses/${house.id}`}>
                                            <Button variant="outline" size="sm">
                                                Lihat Detail
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {houses.data.length === 0 && (
                    <Card>
                        <CardContent className="text-center py-12">
                            <div className="text-6xl mb-4">🏠</div>
                            <h3 className="text-xl font-semibold mb-2">Tidak Ada Data</h3>
                            <p className="text-gray-600 mb-4">
                                {filters.search || filters.status || filters.district || filters.village
                                    ? 'Tidak ada data yang sesuai dengan filter yang dipilih.'
                                    : 'Belum ada data rumah yang diinput.'
                                }
                            </p>
                            {userRole === 'surveyor' && !filters.search && !filters.status && (
                                <Link href="/houses/create">
                                    <Button>Tambah Data Rumah Pertama</Button>
                                </Link>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {houses.data.length > 0 && houses.meta.total > houses.meta.per_page && (
                    <div className="flex justify-center">
                        <div className="flex gap-2">
                            {houses.links.map((link, index) => (
                                <button
                                    key={index}
                                    onClick={() => link.url && router.get(link.url)}
                                    disabled={!link.url}
                                    className={`px-3 py-2 text-sm rounded-md ${
                                        link.active
                                            ? 'bg-blue-500 text-white'
                                            : link.url
                                            ? 'bg-white text-blue-500 border border-blue-500 hover:bg-blue-50'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}