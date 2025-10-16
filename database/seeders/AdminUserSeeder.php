<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
            // Read admin credentials from environment with sensible defaults for local dev
            $email = env('ADMIN_EMAIL', 'admin@setaraloka.test');
            $name = env('ADMIN_NAME', 'Admin');
            $password = env('ADMIN_PASSWORD', 'password');
            $verify = filter_var(env('ADMIN_EMAIL_VERIFIED', true), FILTER_VALIDATE_BOOL);

            // Find existing admin by email or create a new one
            $admin = User::where('email', $email)->first();
            $created = false;

            if (!$admin) {
                $admin = new User();
                $admin->email = $email;
                $admin->name = $name;
                $admin->password = Hash::make($password);
                if ($verify) {
                    $admin->email_verified_at = now();
                }
                $admin->save();
                $created = true;
            } else {
                // Update name if provided via env
                if (!empty($name) && $admin->name !== $name) {
                    $admin->name = $name;
                }
                // Update password only if ADMIN_PASSWORD explicitly provided (even if same as default)
                if (env('ADMIN_PASSWORD') !== null) {
                    $admin->password = Hash::make($password);
                }
                // Set verified if requested
                if ($verify && !$admin->email_verified_at) {
                    $admin->email_verified_at = now();
                }
                $admin->save();
            }

            // Ensure the user has the admin role
            if (!$admin->hasRole(User::ROLE_ADMIN)) {
                $admin->assignRole(User::ROLE_ADMIN);
            }

            // Console output for visibility
            if (property_exists($this, 'command') && $this->command) {
                $this->command->info(
                    ($created ? 'Created' : 'Updated') .
                    " admin user: {$admin->email} (role: " . User::ROLE_ADMIN . ")"
                );
            }
    }
}
