<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\House>
 */
class HouseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $districts = ['Bantul', 'Kretek', 'Imogiri', 'Jetis', 'Dlingo', 'Banguntapan', 'Sewon', 'Kasihan'];
        $villages = ['Wonokromo', 'Tamantirto', 'Panggungharjo', 'Wukirsari', 'Timbulharjo', 'Sitimulyo'];
        $criteria = [
            'Dinding retak parah',
            'Atap bocor',
            'Lantai tanah',
            'Ventilasi tidak memadai',
            'Sanitasi buruk',
            'Struktur bangunan lemah',
            'Tidak ada akses air bersih'
        ];

        return [
            'address' => fake()->streetAddress() . ', ' . fake()->city(),
            'owner_name' => fake()->name(),
            'owner_phone' => fake()->phoneNumber(),
            'uninhabitable_criteria' => fake()->randomElements($criteria, random_int(2, 4))[0] . ', ' . 
                                      fake()->randomElements($criteria, random_int(2, 4))[1],
            'description' => fake()->paragraph(),
            'assessment_score' => fake()->numberBetween(10, 90),
            'latitude' => fake()->latitude(-8.2, -7.8), // Yogyakarta area
            'longitude' => fake()->longitude(110.1, 110.5),
            'status' => fake()->randomElement(['pending', 'valid', 'repaired', 'rejected']),
            'surveyor_id' => User::factory(),
            'district' => fake()->randomElement($districts),
            'village' => fake()->randomElement($villages),
        ];
    }

    /**
     * Indicate that the house is pending validation.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'validator_id' => null,
            'validated_at' => null,
            'validation_notes' => null,
        ]);
    }

    /**
     * Indicate that the house is valid.
     */
    public function valid(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'valid',
            'validator_id' => User::factory(),
            'validated_at' => fake()->dateTimeBetween('-30 days', 'now'),
            'validation_notes' => 'Data telah diverifikasi dan sesuai dengan kondisi lapangan.',
        ]);
    }

    /**
     * Indicate that the house has been repaired.
     */
    public function repaired(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'repaired',
            'validator_id' => User::factory(),
            'validated_at' => fake()->dateTimeBetween('-60 days', '-30 days'),
            'validation_notes' => 'Rumah telah selesai diperbaiki.',
        ]);
    }
}