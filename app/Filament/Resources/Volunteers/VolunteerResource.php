<?php

namespace App\Filament\Resources\Volunteers;

use App\Filament\Resources\Volunteers\Pages\ListVolunteers;
use App\Filament\Resources\Volunteers\Pages\ViewVolunteer;
use App\Filament\Resources\Volunteers\Pages\EditVolunteer;
use App\Filament\Resources\Volunteers\Tables\VolunteersTable;
use App\Models\User;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Tables\Table;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Filters\TrashedFilter;

class VolunteerResource extends Resource
{
    protected static ?string $model = User::class;

    protected static UnitEnum|string|null $navigationGroup = 'Relawan';
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedUsers;

    public static function table(Table $table): Table
    {
        return VolunteersTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListVolunteers::route('/'),
            'view' => ViewVolunteer::route('/{record}'),
            'edit' => EditVolunteer::route('/{record}/edit'),
        ];
    }
}
