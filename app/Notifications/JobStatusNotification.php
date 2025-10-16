<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\DatabaseMessage;

class JobStatusNotification extends Notification
{
    use Queueable;

    public $job;
    public $status;

    public function __construct($job, $status)
    {
        $this->job = $job;
        $this->status = $status;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'job_id' => $this->job->id,
            'title' => $this->job->title,
            'status' => $this->status,
            'message' => $this->status === 'approved' ? 'Lowongan Anda telah disetujui.' : 'Lowongan Anda ditolak oleh admin.',
        ];
    }
}
