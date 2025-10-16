<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('kategori_disabilitas', ['tidak_bisa_berjalan', 'tidak_bisa_berbicara'])
                ->nullable()
                ->after('email_verified_at')
                ->comment('Kategori disabilitas: tidak_bisa_berjalan atau tidak_bisa_berbicara');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('kategori_disabilitas');
        });
    }
};
