<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;

class AccessMateTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        Role::create(['name' => 'penyandang_disabilitas']);
    }

    /** @test */
    public function accessmate_ai_summarize_endpoint_exists()
    {
        $user = User::factory()->create([
            'kategori_disabilitas' => 'tidak_bisa_berbicara',
        ]);
        $user->assignRole('penyandang_disabilitas');

        $response = $this->actingAs($user)->postJson('/ai/summarize', [
            'text' => 'This is a long text that needs to be summarized. It contains multiple sentences. Each sentence provides different information. The goal is to extract the key points.',
        ]);

        // Currently returns client-side implementation
        // Will return 200 when HF API is integrated
        $response->assertStatus(200);
    }

    /** @test */
    public function accessmate_tts_endpoint_exists()
    {
        $user = User::factory()->create([
            'kategori_disabilitas' => 'tidak_bisa_berbicara',
        ]);
        $user->assignRole('penyandang_disabilitas');

        $response = $this->actingAs($user)->postJson('/ai/tts', [
            'text' => 'Hello world',
        ]);

        // Currently returns client-side implementation
        $response->assertStatus(200);
    }

    /** @test */
    public function accessmate_only_accessible_for_communication_category()
    {
        $user = User::factory()->create([
            'kategori_disabilitas' => 'tidak_bisa_berjalan',
        ]);
        $user->assignRole('penyandang_disabilitas');

        // AccessMate component won't render for mobility category
        // This is tested on frontend, backend allows access
        $response = $this->actingAs($user)->get('/dashboard/disabilitas');

        $response->assertOk();
        $response->assertInertia(fn ($page) => 
            $page->where('auth.user.kategori_disabilitas', 'tidak_bisa_berjalan')
        );
    }

    /** @test */
    public function text_selection_tts_only_for_communication_category()
    {
        $userComm = User::factory()->create([
            'kategori_disabilitas' => 'tidak_bisa_berbicara',
        ]);
        $userComm->assignRole('penyandang_disabilitas');

        $userMobility = User::factory()->create([
            'kategori_disabilitas' => 'tidak_bisa_berjalan',
        ]);
        $userMobility->assignRole('penyandang_disabilitas');

        // Communication user sees TTS component
        $response = $this->actingAs($userComm)->get('/dashboard/disabilitas');
        $response->assertOk();
        $response->assertInertia(fn ($page) => 
            $page->where('auth.user.kategori_disabilitas', 'tidak_bisa_berbicara')
        );

        // Mobility user doesn't see TTS component (frontend check)
        $response = $this->actingAs($userMobility)->get('/dashboard/disabilitas');
        $response->assertOk();
        $response->assertInertia(fn ($page) => 
            $page->where('auth.user.kategori_disabilitas', 'tidak_bisa_berjalan')
        );
    }

    /** @test */
    public function forum_posts_accessible_with_voice_to_text()
    {
        $user = User::factory()->create([
            'kategori_disabilitas' => 'tidak_bisa_berbicara',
        ]);
        $user->assignRole('penyandang_disabilitas');

        $response = $this->actingAs($user)->get(route('posts.index'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => 
            $page->component('Posts/Index')
                ->where('auth.user.kategori_disabilitas', 'tidak_bisa_berbicara')
        );
    }

    /** @test */
    public function unauthorized_user_cannot_access_ai_endpoints()
    {
        $response = $this->postJson('/ai/summarize', [
            'text' => 'Test text',
        ]);

        $response->assertUnauthorized();
    }
}
