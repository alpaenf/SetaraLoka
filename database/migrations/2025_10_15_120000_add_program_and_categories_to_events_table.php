<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            if (!Schema::hasColumn('events', 'program_id')) {
                $table->foreignId('program_id')->nullable()->after('user_id')->constrained('programs')->nullOnDelete();
            }
            if (!Schema::hasColumn('events', 'categories')) {
                $table->json('categories')->nullable()->after('image_path');
            }
        });
    }

    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            if (Schema::hasColumn('events', 'program_id')) {
                $table->dropConstrainedForeignId('program_id');
            }
            if (Schema::hasColumn('events', 'categories')) {
                $table->dropColumn('categories');
            }
        });
    }
};
