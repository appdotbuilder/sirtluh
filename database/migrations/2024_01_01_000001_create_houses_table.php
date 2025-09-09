<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('houses', function (Blueprint $table) {
            $table->id();
            $table->string('address');
            $table->string('owner_name');
            $table->string('owner_phone')->nullable();
            $table->text('uninhabitable_criteria');
            $table->text('description')->nullable();
            $table->integer('assessment_score')->default(0);
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->enum('status', ['pending', 'valid', 'repaired', 'rejected'])->default('pending');
            $table->foreignId('surveyor_id')->constrained('users');
            $table->foreignId('validator_id')->nullable()->constrained('users');
            $table->timestamp('validated_at')->nullable();
            $table->text('validation_notes')->nullable();
            $table->string('district')->nullable();
            $table->string('village')->nullable();
            $table->timestamps();
            
            // Indexes for performance
            $table->index('status');
            $table->index('surveyor_id');
            $table->index('validator_id');
            $table->index(['district', 'village']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('houses');
    }
};