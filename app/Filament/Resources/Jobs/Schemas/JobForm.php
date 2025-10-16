<?php

namespace App\Filament\Resources\Jobs\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class JobForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('user_id')
                    ->required()
                    ->numeric(),
                TextInput::make('title')
                    ->required(),
                TextInput::make('company'),
                Textarea::make('description')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('employment_type'),
                TextInput::make('latitude')
                    ->numeric(),
                TextInput::make('longitude')
                    ->numeric(),
                TextInput::make('location_name'),
                DateTimePicker::make('published_at'),
            ]);
    }
}
