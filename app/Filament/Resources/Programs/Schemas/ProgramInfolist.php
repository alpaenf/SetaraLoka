<?php

namespace App\Filament\Resources\Programs\Schemas;

use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\View\TextView;
use Filament\Schemas\Schema;

class ProgramInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->schema([
            Grid::make()->schema([
                TextView::make('title')->label('Judul'),
                TextView::make('description')->label('Deskripsi'),
            ]),
        ]);
    }
}
