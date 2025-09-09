<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreHouseRequest;
use App\Http\Requests\UpdateHouseRequest;
use App\Http\Requests\ValidateHouseRequest;
use App\Models\House;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HouseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = House::with(['surveyor', 'validator'])
            ->when($request->status, fn($q, $status) => $q->where('status', $status))
            ->when($request->district, fn($q, $district) => $q->where('district', 'like', "%{$district}%"))
            ->when($request->village, fn($q, $village) => $q->where('village', 'like', "%{$village}%"))
            ->when($request->search, function($q, $search) {
                $q->where(function($query) use ($search) {
                    $query->where('address', 'like', "%{$search}%")
                          ->orWhere('owner_name', 'like', "%{$search}%");
                });
            });

        // Filter berdasarkan role user
        $user = auth()->user();
        if ($user->isSurveyor()) {
            $query->where('surveyor_id', $user->id);
        }

        $houses = $query->latest()->paginate(12);

        // Get unique districts and villages for filter options
        $districts = House::distinct()->pluck('district')->filter()->sort()->values();
        $villages = House::distinct()->pluck('village')->filter()->sort()->values();

        // Get statistics
        $stats = [
            'total' => House::count(),
            'pending' => House::pending()->count(),
            'valid' => House::valid()->count(),
            'repaired' => House::repaired()->count(),
        ];

        return Inertia::render('houses/index', [
            'houses' => $houses,
            'districts' => $districts,
            'villages' => $villages,
            'stats' => $stats,
            'filters' => $request->only(['status', 'district', 'village', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('houses/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHouseRequest $request)
    {
        $house = House::create([
            ...$request->validated(),
            'surveyor_id' => auth()->id(),
            'status' => 'pending',
        ]);

        return redirect()->route('houses.show', $house)
            ->with('success', 'Data rumah berhasil ditambahkan dan menunggu validasi.');
    }

    /**
     * Display the specified resource.
     */
    public function show(House $house)
    {
        $house->load(['surveyor', 'validator', 'photos']);

        return Inertia::render('houses/show', [
            'house' => $house,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(House $house)
    {
        // Only allow surveyor who created the house or admin/supervisor to edit
        $user = auth()->user();
        if (!$user->isAdmin() && !$user->isSupervisor() && $house->surveyor_id !== $user->id) {
            abort(403, 'Anda tidak memiliki akses untuk mengedit data ini.');
        }

        return Inertia::render('houses/edit', [
            'house' => $house,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHouseRequest $request, House $house)
    {
        // Only allow surveyor who created the house or admin/supervisor to update
        $user = auth()->user();
        if (!$user->isAdmin() && !$user->isSupervisor() && $house->surveyor_id !== $user->id) {
            abort(403, 'Anda tidak memiliki akses untuk mengubah data ini.');
        }

        $house->update($request->validated());

        return redirect()->route('houses.show', $house)
            ->with('success', 'Data rumah berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(House $house)
    {
        // Only allow admin or supervisor to delete
        $user = auth()->user();
        if (!$user->isAdmin() && !$user->isSupervisor()) {
            abort(403, 'Anda tidak memiliki akses untuk menghapus data ini.');
        }

        $house->delete();

        return redirect()->route('houses.index')
            ->with('success', 'Data rumah berhasil dihapus.');
    }
}