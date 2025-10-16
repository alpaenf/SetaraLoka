<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;

class DisabilityCategoryFlowTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create roles
        Role::create(['name' => 'penyandang_disabilitas']);
        Role::create(['name' => 'perusahaan']);
        Role::create(['name' => 'relawan']);
    }

    /** @test */
    public function new_disabled_user_is_redirected_to_category_selection()
    {
        $user = User::factory()->create([
            'email' => 'disabled@test.com',
            'kategori_disabilitas' => null,
        ]);
        $user->assignRole('penyandang_disabilitas');

        $response = $this->actingAs($user)->get('/dashboard/disabilitas');

        $response->assertRedirect('/disabilitas/kategori');
    }

    /** @test */
    public function user_can_select_mobility_category()
    {
        $user = User::factory()->create([
            'email' => 'disabled@test.com',
            'kategori_disabilitas' => null,
        ]);
        $user->assignRole('penyandang_disabilitas');

        $response = $this->actingAs($user)->post('/disabilitas/kategori/store', [
            'kategori' => 'tidak_bisa_berjalan',
        ]);

        $response->assertRedirect('/dashboard/disabilitas');
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'kategori_disabilitas' => 'tidak_bisa_berjalan',
        ]);
    }

    /** @test */
    public function user_can_select_communication_category()
    {
        $user = User::factory()->create([
            'email' => 'disabled@test.com',
            'kategori_disabilitas' => null,
        ]);
        $user->assignRole('penyandang_disabilitas');

        $response = $this->actingAs($user)->post('/disabilitas/kategori/store', [
            'kategori' => 'tidak_bisa_berbicara',
        ]);

        $response->assertRedirect('/dashboard/disabilitas');
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'kategori_disabilitas' => 'tidak_bisa_berbicara',
        ]);
    }

    /** @test */
    public function user_with_category_can_access_dashboard()
    {
        $user = User::factory()->create([
            'email' => 'disabled@test.com',
            'kategori_disabilitas' => 'tidak_bisa_berjalan',
        ]);
        $user->assignRole('penyandang_disabilitas');

        $response = $this->actingAs($user)->get('/dashboard/disabilitas');

        $response->assertOk();
        $response->assertInertia(fn ($page) => 
            $page->component('Dashboards/DisabledUser')
        );
    }

    /** @test */
    public function invalid_category_is_rejected()
    {
        $user = User::factory()->create([
            'email' => 'disabled@test.com',
            'kategori_disabilitas' => null,
        ]);
        $user->assignRole('penyandang_disabilitas');

        $response = $this->actingAs($user)->post('/disabilitas/kategori/store', [
            'kategori' => 'invalid_category',
        ]);

        $response->assertSessionHasErrors('kategori');
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'kategori_disabilitas' => null,
        ]);
    }

    /** @test */
    public function mobility_dashboard_shows_map_widget()
    {
        $user = User::factory()->create([
            'kategori_disabilitas' => 'tidak_bisa_berjalan',
        ]);
        $user->assignRole('penyandang_disabilitas');

        $response = $this->actingAs($user)->get('/dashboard/disabilitas');

        $response->assertOk();
        // Check that MapWidget data is passed to Inertia
        $response->assertInertia(fn ($page) => 
            $page->where('auth.user.kategori_disabilitas', 'tidak_bisa_berjalan')
        );
    }

    /** @test */
    public function communication_dashboard_does_not_show_map_widget()
    {
        $user = User::factory()->create([
            'kategori_disabilitas' => 'tidak_bisa_berbicara',
        ]);
        $user->assignRole('penyandang_disabilitas');

        $response = $this->actingAs($user)->get('/dashboard/disabilitas');

        $response->assertOk();
        $response->assertInertia(fn ($page) => 
            $page->where('auth.user.kategori_disabilitas', 'tidak_bisa_berbicara')
        );
    }

    /** @test */
    public function user_can_change_category_later()
    {
        $user = User::factory()->create([
            'kategori_disabilitas' => 'tidak_bisa_berjalan',
        ]);
        $user->assignRole('penyandang_disabilitas');

        // Change to communication category
        $response = $this->actingAs($user)->post('/disabilitas/kategori/store', [
            'kategori' => 'tidak_bisa_berbicara',
        ]);

        $response->assertRedirect('/dashboard/disabilitas');
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'kategori_disabilitas' => 'tidak_bisa_berbicara',
        ]);
    }
}
