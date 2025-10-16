<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminAccessTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Ensure roles exist (simple seed inline if seeder not auto run in tests)
        if (class_exists(\Spatie\Permission\Models\Role::class)) {
            \Spatie\Permission\Models\Role::findOrCreate(User::ROLE_ADMIN);
            \Spatie\Permission\Models\Role::findOrCreate(User::ROLE_RELAWAN);
        }
    }

    public function test_non_admin_cannot_access_admin_panel(): void
    {
        $user = User::factory()->create();
        $user->assignRole(User::ROLE_RELAWAN);
        $this->actingAs($user);
        $response = $this->get('/admin');
        $response->assertStatus(403);
    }

    public function test_admin_can_access_admin_panel(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole(User::ROLE_ADMIN);
        $this->actingAs($admin);
        $response = $this->get('/admin');
        $response->assertStatus(200);
    }
}
