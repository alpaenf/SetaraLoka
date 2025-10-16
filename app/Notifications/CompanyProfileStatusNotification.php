<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\DatabaseMessage;

class CompanyProfileStatusNotification extends Notification
{
    use Queueable;

    public $profile;
    public $status;

    public function __construct($profile, $status)
    {
        $this->profile = $profile;
        $this->status = $status;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return new DatabaseMessage([
            'company_profile_id' => $this->profile->id,
            'status' => $this->status,
            'message' => $this->status === 'approved' ? 'Profil perusahaan Anda telah disetujui.' : 'Profil perusahaan Anda ditolak.',
        ]);
    }
}
