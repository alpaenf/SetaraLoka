<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition(): array
    {
        $visibility = $this->faker->randomElement(['public','private']);

        return [
            'user_id' => User::inRandomOrder()->value('id') ?? User::factory(),
            'title' => $this->faker->sentence(mt_rand(3,7)),
            'content' => collect(range(1, mt_rand(2,6)))->map(fn()=>$this->faker->paragraph(mt_rand(2,5)))->implode("\n\n"),
            'visibility' => $visibility,
        ];
    }
}
