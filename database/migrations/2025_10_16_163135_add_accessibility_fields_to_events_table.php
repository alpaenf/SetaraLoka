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
        Schema::table('events', function (Blueprint $table) {
            $table->enum('location_type', ['online', 'hybrid', 'offline'])->default('offline')->after('location_name');
            $table->boolean('is_wheelchair_accessible')->default(false)->after('location_type');
            $table->boolean('has_live_caption')->default(false)->after('is_wheelchair_accessible');
            $table->integer('max_participants')->nullable()->after('has_live_caption');
            $table->integer('participants_count')->default(0)->after('max_participants');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn([
                'location_type',
                'is_wheelchair_accessible', 
                'has_live_caption',
                'max_participants',
                'participants_count'
            ]);
        });
    }
};
