<?php

namespace App\Filament\Resources\Resumes\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ResumeForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('user_id')
                    ->required()
                    ->numeric(),
                TextInput::make('title')
                    ->required()
                    ->default('My Resume'),
                TextInput::make('profile'),
                TextInput::make('education'),
                TextInput::make('experience'),
                TextInput::make('skills'),
                TextInput::make('slug')
                    ->required(),
            ]);
    }
}
