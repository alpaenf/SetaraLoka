<?php

namespace App\Filament\Resources\CompanyProfiles\Tables;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Actions\Action;
use Illuminate\Support\Facades\Mail;
use App\Mail\CompanyProfileStatusChanged;
use App\Notifications\CompanyProfileStatusNotification;
use Filament\Tables\Table;

class CompanyProfilesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->label('ID')->sortable(),
                TextColumn::make('company_name')->label('Perusahaan')->searchable()->sortable(),
                TextColumn::make('user.email')->label('Pemilik')->searchable(),
                BadgeColumn::make('verification_status')->label('Status')->colors([
                    'secondary' => 'pending',
                    'success' => 'approved',
                    'danger' => 'rejected',
                ])->sortable(),
                TextColumn::make('verified_at')->label('Diverifikasi')->dateTime()->sortable(),
                TextColumn::make('contact_person')->label('Contact Person')->sortable()->searchable(),
                TextColumn::make('verification_documents')->label('Dokumen')->formatStateUsing(fn($docs) => is_array($docs) ? count($docs) . ' file' : ($docs ? 1 : 0)),
            ])
            ->actions([
                Action::make('approve')->label('Approve')->action(function ($record) {
                    $record->verification_status = 'approved';
                    $record->verified_at = now();
                    $record->save();

                    // Send email
                    if ($record->user && $record->user->email) {
                        Mail::to($record->user->email)->queue(new CompanyProfileStatusChanged($record, 'approved'));
                        $record->user->notify(new CompanyProfileStatusNotification($record, 'approved'));
                    }
                })->requiresConfirmation(),
                Action::make('reject')
                    ->label('Reject')
                    ->form([
                        \Filament\Forms\Components\Textarea::make('reason')->label('Alasan Penolakan')->required(),
                    ])
                    ->action(function ($record, array $data) {
                        $record->verification_status = 'rejected';
                        $record->verification_notes = $data['reason'] ?? 'Ditolak oleh admin';
                        $record->save();

                        if ($record->user && $record->user->email) {
                            Mail::to($record->user->email)->queue(new CompanyProfileStatusChanged($record, 'rejected'));
                            $record->user->notify(new CompanyProfileStatusNotification($record, 'rejected'));
                        }
                    })->requiresConfirmation(),
            ]);
    }
}
