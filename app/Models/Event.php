<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id','program_id','title','description','start_at','end_at','latitude','longitude','location_name','image_path','categories',
        'location_type','is_wheelchair_accessible','has_live_caption','max_participants','participants_count'
    ];

    protected $casts = [
        'start_at' => 'datetime',
        'end_at' => 'datetime',
        'categories' => 'array',
        'is_wheelchair_accessible' => 'boolean',
        'has_live_caption' => 'boolean',
    ];

    protected $appends = [
        'image_url',
    ];

    public function getImageUrlAttribute()
    {
        return $this->image_path ? asset('storage/' . ltrim($this->image_path, '/')) : null;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function program()
    {
        return $this->belongsTo(Program::class);
    }

    public function interestedUsers()
    {
        return $this->belongsToMany(User::class, 'event_interests')->withTimestamps()->withPivot('verified_at');
    }
}
