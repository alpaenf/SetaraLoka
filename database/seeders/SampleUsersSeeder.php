<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class SampleUsersSeeder extends Seeder
{
    public function run(): void
    {
        // Create a set of users for each non-admin role if not already present
        $roles = [
            User::ROLE_PENYANDANG_DISABILITAS => 8,
            User::ROLE_RELAWAN => 6,
            User::ROLE_PERUSAHAAN => 4,
            User::ROLE_LEMBAGA_SOSIAL => 4,
        ];

        foreach ($roles as $role => $count) {
            // Only create additional users if current count for role is below desired
            $existing = User::role($role)->count();
            $toCreate = max(0, $count - $existing);
            if ($toCreate === 0) continue;

            User::factory($toCreate)->create()->each(function($user) use ($role) {
                $user->assignRole($role);
            });
        }
    }
}
