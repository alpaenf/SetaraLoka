<?php

namespace App\Filament\Resources\Jobs\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Actions\Action;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Mail;
use App\Mail\JobStatusChanged;
use App\Notifications\JobStatusNotification;

class JobsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user_id')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('title')
                    ->searchable(),
                TextColumn::make('company')
                    ->searchable(),
                TextColumn::make('employment_type')
                    ->searchable(),
                TextColumn::make('latitude')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('longitude')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('location_name')
                    ->searchable(),
                BadgeColumn::make('status')->label('Status')->colors([
                    'secondary' => 'pending',
                    'success' => 'approved',
                    'danger' => 'canceled',
                ])->sortable(),
                TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                Action::make('approve')
                    ->label('Approve')
                    ->action(function ($record) {
                        $record->status = 'approved';
                        $record->published_at = now();
                        $record->save();

                        // Send notification/email if possible
                        try {
                            if ($record->user && $record->user->email) {
                                Mail::to($record->user->email)->queue(new JobStatusChanged($record, 'approved'));
                                $record->user->notify(new JobStatusNotification($record, 'approved'));
                            }
                        } catch (\Throwable $e) {
                            // ignore mail failures here
                        }
                    })->requiresConfirmation(),
                Action::make('reject')
                    ->label('Reject')
                    ->form([
                        \Filament\Forms\Components\Textarea::make('reason')->label('Alasan Penolakan')->required(),
                    ])
                    ->action(function ($record, array $data) {
                        $record->status = 'canceled';
                        // store optional rejection note if column exists
                        if (isset($record->rejection_notes)) {
                            $record->rejection_notes = $data['reason'] ?? 'Ditolak oleh admin';
                        }
                        $record->save();

                        try {
                            if ($record->user && $record->user->email) {
                                Mail::to($record->user->email)->queue(new JobStatusChanged($record, 'rejected', $data['reason'] ?? null));
                                $record->user->notify(new JobStatusNotification($record, 'rejected'));
                            }
                        } catch (\Throwable $e) {
                            // ignore
                        }
                    })->requiresConfirmation(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
