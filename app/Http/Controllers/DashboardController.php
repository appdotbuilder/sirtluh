<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\House;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $user = auth()->user();

        // Role-specific statistics
        $stats = [];
        
        if ($user->isAdmin()) {
            $stats = [
                'total_houses' => House::count(),
                'pending_validation' => House::pending()->count(),
                'valid_houses' => House::valid()->count(),
                'repaired_houses' => House::repaired()->count(),
                'total_users' => User::count(),
                'active_surveyors' => User::surveyors()->active()->count(),
            ];
        } elseif ($user->isSupervisor()) {
            $stats = [
                'total_houses' => House::count(),
                'pending_validation' => House::pending()->count(),
                'valid_houses' => House::valid()->count(),
                'repaired_houses' => House::repaired()->count(),
                'my_validations' => House::where('validator_id', $user->id)->count(),
            ];
        } else { // Surveyor
            $stats = [
                'my_surveys' => House::where('surveyor_id', $user->id)->count(),
                'pending_validation' => House::where('surveyor_id', $user->id)->pending()->count(),
                'validated_surveys' => House::where('surveyor_id', $user->id)->valid()->count(),
                'repaired_surveys' => House::where('surveyor_id', $user->id)->repaired()->count(),
            ];
        }

        // Recent houses based on user role
        $recentHousesQuery = House::with(['surveyor', 'validator']);
        
        if ($user->isSurveyor()) {
            $recentHousesQuery->where('surveyor_id', $user->id);
        }
        
        $recentHouses = $recentHousesQuery->latest()->limit(5)->get();

        // Pending validation houses for supervisors
        $pendingValidation = [];
        if ($user->isSupervisor() || $user->isAdmin()) {
            $pendingValidation = House::with(['surveyor'])
                ->pending()
                ->latest()
                ->limit(5)
                ->get();
        }

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentHouses' => $recentHouses,
            'pendingValidation' => $pendingValidation,
            'userRole' => $user->role,
        ]);
    }
}