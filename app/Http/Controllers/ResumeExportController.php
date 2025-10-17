<?php

namespace App\Http\Controllers;

use App\Models\Resume;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ResumeExportController extends Controller
{
    use AuthorizesRequests;

    public function show(Resume $resume)
    {
        // Check if user can view this resume (owner or admin)
        $this->authorize('view', $resume);
        
        // Generate PDF
        $pdf = Pdf::loadView('pdf.resume', ['resume' => $resume]);
        
        // Return as download with dynamic filename
        $filename = str($resume->title)->slug() . '-' . now()->format('Y-m-d') . '.pdf';
        return $pdf->download($filename);
    }
}
