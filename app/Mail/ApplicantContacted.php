<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ApplicantContacted extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $application;
    public $subjectText;
    public $messageText;

    public function __construct($application, $subject, $message)
    {
        $this->application = $application;
        $this->subjectText = $subject;
        $this->messageText = $message;
    }

    public function build()
    {
        return $this->subject($this->subjectText)
            ->view('emails.applicant_contacted')
            ->with(['application' => $this->application, 'message' => $this->messageText]);
    }
}
