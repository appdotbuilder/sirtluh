<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HouseController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ValidationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // House management routes
    Route::resource('houses', HouseController::class);
    
    // Validation routes (for supervisors and admins)
    Route::controller(ValidationController::class)->group(function () {
        Route::get('/validation', 'index')->name('validation.index');
        Route::get('/validation/{house}', 'show')->name('validation.show');
        Route::post('/validation/{house}', 'store')->name('validation.store');
    });
    
    // Report routes (for supervisors and admins)
    Route::controller(ReportController::class)->group(function () {
        Route::get('/reports', 'index')->name('reports.index');
        Route::get('/reports/detailed', 'show')->name('reports.detailed');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';