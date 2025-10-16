<?php

namespace Database\Factories;

use App\Models\Job;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Job>
 */
class JobFactory extends Factory
{
    protected $model = Job::class;

    public function definition(): array
    {
        $types = ['full-time','part-time','contract','internship','volunteer'];
        $min = $this->faker->numberBetween(3000000, 9000000);
        $max = $min + $this->faker->numberBetween(1000000, 7000000);
        return [
            'user_id' => User::inRandomOrder()->value('id') ?? User::factory(),
            'title' => $this->faker->jobTitle(),
            'company' => $this->faker->company(),
            'description' => collect(range(1, mt_rand(2,5)))->map(fn()=> $this->faker->paragraph())->implode("\n\n"),
            'employment_type' => $this->faker->randomElement($types),
            'latitude' => $this->faker->optional()->latitude(-11,6),
            'longitude' => $this->faker->optional()->longitude(95,141),
            'location_name' => $this->faker->optional()->city(),
            'published_at' => $this->faker->optional()->dateTimeBetween('-15 days','now'),
            'salary_min' => $min,
            'salary_max' => $max,
            'requirements' => $this->faker->sentences(mt_rand(3,6), true),
            'benefits' => collect($this->faker->words(mt_rand(3,6)))->map(fn($w)=>"- ".$w)->implode("\n"),
        ];
    }
}
