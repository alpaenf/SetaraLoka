<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Support\Arr;

class ForumSeeder extends Seeder
{
    public function run(): void
    {
        if (Post::count() > 0) {
            return; // avoid duplicating on repeated seed runs
        }

        // Create posts with varying authors
        $userIds = User::pluck('id')->all();
        if (empty($userIds)) return;

        $postCount = 40; // adjustable volume
        Post::factory($postCount)->create()->each(function(Post $post) use ($userIds) {
            // Randomize visibility bias towards public
            if (rand(0,9) < 8) {
                $post->visibility = 'public';
                $post->save();
            }

            // Top-level comments 0-6
            $topLevel = rand(0,6);
            for ($i=0; $i < $topLevel; $i++) {
                $comment = Comment::factory()->create([
                    'post_id' => $post->id,
                    'user_id' => Arr::random($userIds),
                ]);
                // Replies 0-3 each (depth 2)
                $replies = rand(0,3);
                for ($r=0; $r < $replies; $r++) {
                    $reply = Comment::factory()->create([
                        'post_id' => $post->id,
                        'user_id' => Arr::random($userIds),
                        'parent_id' => $comment->id,
                    ]);
                    // Occasional nested reply depth 3
                    if (rand(0,10) > 8) {
                        Comment::factory()->create([
                            'post_id' => $post->id,
                            'user_id' => Arr::random($userIds),
                            'parent_id' => $reply->id,
                        ]);
                    }
                }
            }
        });
    }
}
