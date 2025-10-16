<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('event_interests', function (Blueprint $table) {
            if (!Schema::hasColumn('event_interests', 'verified_at')) {
                $table->timestamp('verified_at')->nullable()->after('updated_at');
            }
        });
    }

    public function down(): void
    {
        Schema::table('event_interests', function (Blueprint $table) {
            if (Schema::hasColumn('event_interests', 'verified_at')) {
                $table->dropColumn('verified_at');
            }
        });
    }
};
