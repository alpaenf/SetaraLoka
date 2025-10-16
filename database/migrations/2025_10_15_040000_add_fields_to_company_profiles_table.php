<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('company_profiles', function (Blueprint $table) {
            $table->string('industry')->nullable()->after('company_name');
            $table->string('city')->nullable()->after('address');
            $table->string('official_email')->nullable()->after('phone');
            $table->string('linkedin')->nullable()->after('website');
            $table->string('instagram')->nullable()->after('linkedin');
        });
    }

    public function down(): void
    {
        Schema::table('company_profiles', function (Blueprint $table) {
            $table->dropColumn(['industry','city','official_email','linkedin','instagram']);
        });
    }
};
