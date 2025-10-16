<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Event;
use App\Models\Job;
use Illuminate\Http\Request;

class DisabledDashboardDataController extends Controller
{
    public function __invoke(Request $request)
    {
        // Basic accessible feed: latest public posts, upcoming events, open jobs
        $posts = Post::latest()->select('id','title','created_at')->take(5)->get();
        $events = Event::orderBy('date','asc')->select('id','title','date')->whereDate('date','>=', now()->toDateString())->take(5)->get();
        $jobs = Job::latest()->select('id','title','created_at')->take(5)->get();
        return response()->json([
            'posts' => $posts,
            'events' => $events,
            'jobs' => $jobs,
        ]);
    }
}
