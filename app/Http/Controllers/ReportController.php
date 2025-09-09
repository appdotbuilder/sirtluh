<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\House;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    /**
     * Display reports dashboard.
     */
    public function index()
    {
        // Only supervisors and admins can access reports
        $user = auth()->user();
        if (!$user->isSupervisor() && !$user->isAdmin()) {
            abort(403, 'Anda tidak memiliki akses untuk melihat laporan.');
        }

        // Overall statistics
        $stats = [
            'total_houses' => House::count(),
            'pending_houses' => House::pending()->count(),
            'valid_houses' => House::valid()->count(),
            'repaired_houses' => House::repaired()->count(),
            'rejected_houses' => House::where('status', 'rejected')->count(),
        ];

        // Houses by district
        $byDistrict = House::select('district', DB::raw('count(*) as total'))
            ->whereNotNull('district')
            ->groupBy('district')
            ->orderBy('total', 'desc')
            ->get();

        // Houses by status and district
        $statusByDistrict = House::select('district', 'status', DB::raw('count(*) as total'))
            ->whereNotNull('district')
            ->groupBy('district', 'status')
            ->orderBy('district')
            ->get()
            ->groupBy('district');

        // Recent activity
        $recentActivity = House::with(['surveyor', 'validator'])
            ->latest('updated_at')
            ->limit(10)
            ->get();

        // Monthly trend (last 6 months)
        $monthlyTrend = House::select(
                DB::raw('YEAR(created_at) as year'),
                DB::raw('MONTH(created_at) as month'),
                DB::raw('COUNT(*) as total')
            )
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get();

        return Inertia::render('reports/index', [
            'stats' => $stats,
            'byDistrict' => $byDistrict,
            'statusByDistrict' => $statusByDistrict,
            'recentActivity' => $recentActivity,
            'monthlyTrend' => $monthlyTrend,
        ]);
    }

    /**
     * Generate detailed report.
     */
    public function show(Request $request)
    {
        // Only supervisors and admins can access detailed reports
        $user = auth()->user();
        if (!$user->isSupervisor() && !$user->isAdmin()) {
            abort(403, 'Anda tidak memiliki akses untuk melihat laporan.');
        }

        $query = House::with(['surveyor', 'validator']);

        // Apply filters
        if ($request->district) {
            $query->where('district', $request->district);
        }
        if ($request->village) {
            $query->where('village', $request->village);
        }
        if ($request->status) {
            $query->where('status', $request->status);
        }
        if ($request->date_from) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }
        if ($request->date_to) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $houses = $query->latest()->paginate(50);

        // Get filter options
        $districts = House::distinct()->pluck('district')->filter()->sort()->values();
        $villages = House::distinct()->pluck('village')->filter()->sort()->values();

        return Inertia::render('reports/detailed', [
            'houses' => $houses,
            'districts' => $districts,
            'villages' => $villages,
            'filters' => $request->only(['district', 'village', 'status', 'date_from', 'date_to']),
        ]);
    }
}