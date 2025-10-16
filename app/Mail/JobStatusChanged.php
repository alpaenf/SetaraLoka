<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class JobStatusChanged extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $job;
    public $status;
    public $reason;

    public function __construct($job, $status, $reason = null)
    {
        $this->job = $job;
        $this->status = $status;
        $this->reason = $reason;
    }

    public function build()
    {
        $subject = $this->status === 'approved' ? 'Lowongan Anda telah disetujui' : 'Lowongan Anda ditolak';

        return $this->subject($subject)
            ->view('emails.job_status_changed')
            ->with(['job' => $this->job, 'status' => $this->status, 'reason' => $this->reason]);
    }
}
