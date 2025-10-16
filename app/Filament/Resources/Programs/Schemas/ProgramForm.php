<?php

namespace App\Filament\Resources\Programs\Schemas;

use Filament\Schemas\Components\Card;
use Filament\Schemas\Components\Textarea;
use Filament\Schemas\Components\TextInput;
use Filament\Schemas\Components\Select;
use Filament\Schemas\Schema;

class ProgramForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Card::make()->schema([
                    TextInput::make('title')->required()->label('Judul Program'),
                    Textarea::make('description')->rows(4)->label('Deskripsi'),
                    Select::make('user_id')->relationship('user', 'name')->label('Pemilik (Lembaga)'),
                ]),
            ]);
    }
}
