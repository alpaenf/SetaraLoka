<?php

namespace App\Filament\Resources\Volunteers\Tables;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use App\Models\User;

class VolunteersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->query(function (Builder $query) {
                // Ensure the relawan scope is called on an Eloquent builder from the User model
                return \App\Models\User::query()->relawan();
            })
            ->columns([
                TextColumn::make('id')->label('ID')->sortable(),
                TextColumn::make('name')->label('Nama')->searchable()->sortable(),
                TextColumn::make('email')->label('Email')->searchable(),
            ])
            ->filters([
                // optional filters
            ]);
    }
}
