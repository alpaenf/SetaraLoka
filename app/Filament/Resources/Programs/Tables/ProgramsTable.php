<?php

namespace App\Filament\Resources\Programs\Tables;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ProgramsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->label('ID')->sortable(),
                TextColumn::make('title')->label('Judul')->searchable()->sortable(),
                TextColumn::make('user.name')->label('Lembaga')->sortable(),
                TextColumn::make('created_at')->label('Dibuat')->dateTime()->sortable(),
            ])
            ->filters([
                // TrashedFilter removed because Program model does not use SoftDeletes
            ]);
    }
}
