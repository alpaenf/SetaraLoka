<?php

namespace App\Filament\Resources\CompanyProfiles;

use App\Filament\Resources\CompanyProfiles\Pages\ListCompanyProfiles;
use App\Filament\Resources\CompanyProfiles\Pages\ViewCompanyProfile;
use App\Filament\Resources\CompanyProfiles\Tables\CompanyProfilesTable;
use App\Models\CompanyProfile;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Tables\Table;
use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Support\Icons\Heroicon;

class CompanyProfileResource extends Resource
{
    protected static ?string $model = CompanyProfile::class;

    protected static UnitEnum|string|null $navigationGroup = 'Perusahaan';
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBriefcase;

    public static function table(Table $table): Table
    {
        return CompanyProfilesTable::configure($table);
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            TextInput::make('company_name')->required(),
            TextInput::make('website'),
            TextInput::make('phone'),
            TextInput::make('official_email'),
            TextInput::make('contact_person'),
            Textarea::make('description'),
            FileUpload::make('verification_documents')->multiple()->directory('company-docs'),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListCompanyProfiles::route('/'),
            'view' => ViewCompanyProfile::route('/{record}'),
            'edit' => Pages\EditCompanyProfile::route('/{record}/edit'),
        ];
    }
}
