<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\User;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            User::ROLE_PENYANDANG_DISABILITAS,
            User::ROLE_RELAWAN,
            User::ROLE_PERUSAHAAN,
            User::ROLE_LEMBAGA_SOSIAL,
            User::ROLE_ADMIN,
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }
    }
}
