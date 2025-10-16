<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $table = 'job_postings';

    protected $fillable = [
        'user_id','title','company','description','employment_type','latitude','longitude','location_name','published_at','salary_min','salary_max','requirements','benefits','status','disability_only','accommodations','cancellation_reason'
    ];

    protected $casts = [
        'disability_only' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }
}
