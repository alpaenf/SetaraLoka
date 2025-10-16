<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends Factory<Event>
 */
class EventFactory extends Factory
{
    protected $model = Event::class;

    public function definition(): array
    {
        $start = $this->faker->dateTimeBetween('-30 days', '+60 days');
        $end = (clone $start)->modify('+'.mt_rand(1,8).' hours');
        return [
            'user_id' => User::inRandomOrder()->value('id') ?? User::factory(),
            'title' => $this->faker->catchPhrase(),
            'description' => $this->faker->paragraphs(mt_rand(1,3), true),
            'start_at' => $start,
            'end_at' => $end,
            'latitude' => $this->faker->optional()->latitude(-11,6),
            'longitude' => $this->faker->optional()->longitude(95, 141),
            'location_name' => $this->faker->optional()->city(),
        ];
    }
}
