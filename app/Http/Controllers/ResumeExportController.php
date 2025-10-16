<?php

namespace App\Http\Controllers;

use App\Models\Resume;
use Barryvdh\DomPDF\Facade\Pdf;

class ResumeExportController extends Controller
{
    public function show(Resume $resume)
    {
        $this->authorize('view', $resume);
        $pdf = Pdf::loadView('pdf.resume', ['resume' => $resume]);
        return $pdf->download('resume.pdf');
    }
}
