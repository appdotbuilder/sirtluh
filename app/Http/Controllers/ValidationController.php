<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ValidateHouseRequest;
use App\Models\House;
use Inertia\Inertia;

class ValidationController extends Controller
{
    /**
     * Display houses pending validation.
     */
    public function index()
    {
        // Only supervisors and admins can access validation
        $user = auth()->user();
        if (!$user->isSupervisor() && !$user->isAdmin()) {
            abort(403, 'Anda tidak memiliki akses untuk validasi data.');
        }

        $houses = House::with(['surveyor'])
            ->pending()
            ->latest()
            ->paginate(12);

        return Inertia::render('validation/index', [
            'houses' => $houses,
        ]);
    }

    /**
     * Show validation form for a house.
     */
    public function show(House $house)
    {
        // Only supervisors and admins can validate
        $user = auth()->user();
        if (!$user->isSupervisor() && !$user->isAdmin()) {
            abort(403, 'Anda tidak memiliki akses untuk validasi data.');
        }

        $house->load(['surveyor', 'photos']);

        return Inertia::render('validation/show', [
            'house' => $house,
        ]);
    }

    /**
     * Store validation result.
     */
    public function store(ValidateHouseRequest $request, House $house)
    {
        // Only supervisors and admins can validate
        $user = auth()->user();
        if (!$user->isSupervisor() && !$user->isAdmin()) {
            abort(403, 'Anda tidak memiliki akses untuk validasi data.');
        }

        $house->update([
            'status' => $request->status,
            'validator_id' => auth()->id(),
            'validated_at' => now(),
            'validation_notes' => $request->validation_notes,
        ]);

        $statusText = $request->status === 'valid' ? 'divalidasi' : 'ditolak';
        
        return redirect()->route('validation.index')
            ->with('success', "Data rumah berhasil {$statusText}.");
    }
}