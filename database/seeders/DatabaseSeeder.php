<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Order matters: roles -> admin -> sample users -> forum & other content
        $this->call([
            RoleSeeder::class,
            AdminUserSeeder::class,
            SampleUsersSeeder::class,
            ForumSeeder::class,
            EventsAndJobsSeeder::class,
        ]);
    }
}
