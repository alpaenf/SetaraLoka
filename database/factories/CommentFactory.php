<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Comment>
 */
class CommentFactory extends Factory
{
    protected $model = Comment::class;

    public function definition(): array
    {
        return [
            'post_id' => Post::inRandomOrder()->value('id') ?? Post::factory(),
            'user_id' => User::inRandomOrder()->value('id') ?? User::factory(),
            'parent_id' => null, // set in seeder when creating nested replies
            'content' => $this->faker->sentences(mt_rand(1,3), true),
        ];
    }
}
