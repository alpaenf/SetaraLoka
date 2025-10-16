<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Job;
use App\Models\Resume;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens, HasRoles;
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
        use HasApiTokens, HasRoles;

        public const ROLE_PENYANDANG_DISABILITAS = 'penyandang_disabilitas';
        public const ROLE_RELAWAN = 'relawan';
        public const ROLE_PERUSAHAAN = 'perusahaan';
        public const ROLE_LEMBAGA_SOSIAL = 'lembaga_sosial';
        public const ROLE_ADMIN = 'admin';

        public function posts()
        {
            return $this->hasMany(Post::class);
        }

        public function comments()
        {
            return $this->hasMany(Comment::class);
        }

        public function jobPostings()
        {
            return $this->hasMany(Job::class, 'user_id');
        }

        public function resumes()
        {
            return $this->hasMany(Resume::class);
        }
     */
    public const ROLE_PENYANDANG_DISABILITAS = 'penyandang_disabilitas';
    public const ROLE_RELAWAN = 'relawan';
    public const ROLE_PERUSAHAAN = 'perusahaan';
    public const ROLE_LEMBAGA_SOSIAL = 'lembaga_sosial';
    public const ROLE_ADMIN = 'admin';

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function jobPostings()
    {
        return $this->hasMany(Job::class, 'user_id');
    }

    public function resumes()
    {
        return $this->hasMany(Resume::class);
    }

    public function interestedEvents()
    {
        return $this->belongsToMany(Event::class, 'event_interests')->withTimestamps()->withPivot('verified_at');
    }

    public function jobApplications()
    {
        return $this->hasMany(JobApplication::class);
    }

    /**
     * Scope to only relawan users.
     */
    public function scopeRelawan($query)
    {
        return $query->whereHas('roles', function ($q) {
            $q->where('name', self::ROLE_RELAWAN);
        });
    }

    protected $fillable = [
        'name',
        'email',
        'password',
        'kategori_disabilitas',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
