<?php

namespace Database\Seeders;

use App\Models\House;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::factory()->create([
            'name' => 'Administrator',
            'email' => 'admin@example.com',
            'role' => 'admin',
            'is_active' => true,
        ]);

        // Create supervisor users
        $supervisor1 = User::factory()->create([
            'name' => 'Dr. Ahmad Supervisor',
            'email' => 'supervisor1@example.com',
            'role' => 'supervisor',
            'is_active' => true,
        ]);

        $supervisor2 = User::factory()->create([
            'name' => 'Ir. Siti Supervisor',
            'email' => 'supervisor2@example.com',
            'role' => 'supervisor',
            'is_active' => true,
        ]);

        // Create surveyor users
        $surveyors = User::factory(8)->create([
            'role' => 'surveyor',
            'is_active' => true,
        ]);

        // Create houses with different statuses
        $allSurveyors = $surveyors->concat([$supervisor1, $supervisor2, $admin]);
        
        // Pending houses (need validation)
        House::factory(15)->create([
            'status' => 'pending',
            'surveyor_id' => $surveyors->random()->id,
            'validator_id' => null,
            'validated_at' => null,
            'validation_notes' => null,
        ]);

        // Valid houses
        House::factory(25)->create([
            'status' => 'valid',
            'surveyor_id' => $surveyors->random()->id,
            'validator_id' => [$supervisor1->id, $supervisor2->id][array_rand([0, 1])],
            'validated_at' => fake()->dateTimeBetween('-60 days', '-1 day'),
            'validation_notes' => 'Data telah diverifikasi dan sesuai dengan kondisi lapangan.',
        ]);

        // Repaired houses
        House::factory(10)->create([
            'status' => 'repaired',
            'surveyor_id' => $surveyors->random()->id,
            'validator_id' => [$supervisor1->id, $supervisor2->id][array_rand([0, 1])],
            'validated_at' => fake()->dateTimeBetween('-120 days', '-30 days'),
            'validation_notes' => 'Rumah telah selesai diperbaiki dan layak huni.',
        ]);

        // Rejected houses
        House::factory(5)->create([
            'status' => 'rejected',
            'surveyor_id' => $surveyors->random()->id,
            'validator_id' => [$supervisor1->id, $supervisor2->id][array_rand([0, 1])],
            'validated_at' => fake()->dateTimeBetween('-30 days', '-1 day'),
            'validation_notes' => 'Data tidak sesuai dengan kondisi lapangan. Perlu survey ulang.',
        ]);
    }
}