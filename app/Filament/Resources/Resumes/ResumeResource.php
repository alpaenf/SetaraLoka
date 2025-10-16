<?php

namespace App\Filament\Resources\Resumes;

use App\Filament\Resources\Resumes\Pages\CreateResume;
use App\Filament\Resources\Resumes\Pages\EditResume;
use App\Filament\Resources\Resumes\Pages\ListResumes;
use App\Filament\Resources\Resumes\Pages\ViewResume;
use App\Filament\Resources\Resumes\Schemas\ResumeForm;
use App\Filament\Resources\Resumes\Schemas\ResumeInfolist;
use App\Filament\Resources\Resumes\Tables\ResumesTable;
use App\Models\Resume;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ResumeResource extends Resource
{
    protected static ?string $model = Resume::class;

    protected static UnitEnum|string|null $navigationGroup = 'Publik';
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static ?string $recordTitleAttribute = 'resource';

    public static function form(Schema $schema): Schema
    {
        return ResumeForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return ResumeInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ResumesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListResumes::route('/'),
            'create' => CreateResume::route('/create'),
            'view' => ViewResume::route('/{record}'),
            'edit' => EditResume::route('/{record}/edit'),
        ];
    }
}
