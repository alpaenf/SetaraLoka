<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CompanyProfileStatusChanged extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $profile;
    public $status;

    public function __construct($profile, $status)
    {
        $this->profile = $profile;
        $this->status = $status;
    }

    public function build()
    {
        $subject = $this->status === 'approved' ? 'Perusahaan Anda telah diverifikasi' : 'Perusahaan Anda ditolak';

        return $this->subject($subject)
            ->view('emails.company_profile_status')
            ->with(['profile' => $this->profile, 'status' => $this->status]);
    }
}
