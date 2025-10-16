<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_name',
        'industry',
        'logo_path',
        'description',
        'website',
        'city',
        'address',
        'phone',
        'official_email',
        'contact_person',
        'linkedin',
        'instagram',
        'verification_status',
        'verification_notes',
        'verified_at',
    ];

    protected $casts = [
        'verified_at' => 'datetime',
        'verification_documents' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
