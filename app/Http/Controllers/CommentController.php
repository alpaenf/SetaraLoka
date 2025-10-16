<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use App\Notifications\NewCommentNotification;
use App\Services\OneSignalService;

class CommentController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'parent_id' => 'nullable|exists:comments,id',
        ]);
        $validated['user_id'] = $request->user()->id;
        $comment = $post->comments()->create($validated);
        $post->user->notify(new NewCommentNotification($comment));
        // Push notification (exclude if commenter is the post owner)
        if ($post->user_id !== $request->user()->id) {
            OneSignalService::notify([
                (string)$post->user_id,
            ], 'Komentar baru', 'Posting Anda mendapat komentar baru.', [
                'post_id' => $post->id,
                'comment_id' => $comment->id,
            ]);
        }
        return redirect()->route('posts.show', $post->id)
            ->with('success', 'Comment added')
            ->with('new_comment_id', $comment->id);
    }

    public function destroy(Comment $comment)
    {
        $this->authorize('delete', $comment);
        $comment->delete();
        return back()->with('success', 'Comment deleted');
    }
}
