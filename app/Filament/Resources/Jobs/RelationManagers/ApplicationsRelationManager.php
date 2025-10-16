<?php

namespace App\Filament\Resources\Jobs\RelationManagers;

use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Actions\Action;
use Filament\Tables\Table;
use App\Mail\ApplicantContacted;
use Illuminate\Support\Facades\Mail;

class ApplicationsRelationManager extends RelationManager
{
    protected static string $relationship = 'applications';

    protected static ?string $recordTitleAttribute = 'user.name';

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')->label('Nama')->searchable(),
                TextColumn::make('user.email')->label('Email')->searchable(),
                TextColumn::make('cv_path')->label('CV')->formatStateUsing(fn($state) => $state ? 'Ada' : 'Tidak'),
                BadgeColumn::make('status')->colors(['primary'=>'pending','success'=>'accepted','danger'=>'rejected']),
                TextColumn::make('created_at')->label('Diajukan')->dateTime()->sortable(),
            ])
            ->filters([
                // optional filters
            ])
            ->headerActions([
                // optionally add actions
            ])
            ->recordActions([
                Action::make('view_cv')->label('Lihat CV')->url(fn($record) => $record->cv_path ? asset('storage/' . $record->cv_path) : null)->openUrlInNewTab(),
                Action::make('contact')->label('Hubungi')->form([
                    \Filament\Forms\Components\TextInput::make('subject')->required(),
                    \Filament\Forms\Components\Textarea::make('message')->required(),
                ])->action(function ($record, array $data) {
                    if ($record->user && $record->user->email) {
                        Mail::to($record->user->email)->queue(new ApplicantContacted($record, $data['subject'], $data['message']));
                    }
                }),
                Action::make('accept')->label('Terima')->action(function ($record) {
                    $record->status = 'accepted';
                    $record->save();
                })->requiresConfirmation(),
                Action::make('reject')->label('Tolak')->action(function ($record) {
                    $record->status = 'rejected';
                    $record->save();
                })->requiresConfirmation(),
            ]);
    }
}
