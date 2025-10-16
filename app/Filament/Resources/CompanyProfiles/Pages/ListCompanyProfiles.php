<?php

namespace App\Filament\Resources\CompanyProfiles\Pages;

use App\Filament\Resources\CompanyProfiles\CompanyProfileResource;
use Filament\Resources\Pages\ListRecords;

class ListCompanyProfiles extends ListRecords
{
    protected static string $resource = CompanyProfileResource::class;
}
