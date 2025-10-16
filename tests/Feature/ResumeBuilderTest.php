<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Resume;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;

class ResumeBuilderTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        Role::create(['name' => 'penyandang_disabilitas']);
    }

    /** @test */
    public function user_can_create_resume()
    {
        $user = User::factory()->create();
        $user->assignRole('penyandang_disabilitas');

        $response = $this->actingAs($user)->post(route('resumes.store'), [
            'full_name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '08123456789',
            'address' => 'Jakarta',
            'summary' => 'Experienced developer',
            'education' => json_encode([
                ['degree' => 'S1', 'institution' => 'UI', 'year' => '2020']
            ]),
            'experience' => json_encode([
                ['title' => 'Developer', 'company' => 'Tech Co', 'start_date' => '2020-01', 'end_date' => '2023-01', 'description' => 'Built apps']
            ]),
            'skills' => json_encode(['PHP', 'JavaScript', 'React']),
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('resumes', [
            'user_id' => $user->id,
            'full_name' => 'John Doe',
            'email' => 'john@example.com',
        ]);
    }

    /** @test */
    public function resume_slug_is_generated_automatically()
    {
        $user = User::factory()->create();
        $user->assignRole('penyandang_disabilitas');

        $this->actingAs($user)->post(route('resumes.store'), [
            'full_name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '08123456789',
            'address' => 'Jakarta',
            'summary' => 'Developer',
            'education' => json_encode([]),
            'experience' => json_encode([]),
            'skills' => json_encode(['PHP']),
        ]);

        $resume = Resume::where('user_id', $user->id)->first();
        $this->assertNotNull($resume->slug);
        $this->assertStringContainsString('john-doe', $resume->slug);
    }

    /** @test */
    public function user_can_update_resume()
    {
        $user = User::factory()->create();
        $user->assignRole('penyandang_disabilitas');
        
        $resume = Resume::factory()->create([
            'user_id' => $user->id,
            'full_name' => 'John Doe',
        ]);

        $response = $this->actingAs($user)->put(route('resumes.update', $resume->slug), [
            'full_name' => 'Jane Doe',
            'email' => $resume->email,
            'phone' => $resume->phone,
            'address' => $resume->address,
            'summary' => $resume->summary,
            'education' => $resume->education,
            'experience' => $resume->experience,
            'skills' => $resume->skills,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('resumes', [
            'id' => $resume->id,
            'full_name' => 'Jane Doe',
        ]);
    }

    /** @test */
    public function user_can_delete_own_resume()
    {
        $user = User::factory()->create();
        $user->assignRole('penyandang_disabilitas');
        
        $resume = Resume::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->delete(route('resumes.destroy', $resume->slug));

        $response->assertRedirect();
        $this->assertSoftDeleted('resumes', ['id' => $resume->id]);
    }

    /** @test */
    public function user_cannot_delete_others_resume()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $user1->assignRole('penyandang_disabilitas');
        $user2->assignRole('penyandang_disabilitas');
        
        $resume = Resume::factory()->create(['user_id' => $user1->id]);

        $response = $this->actingAs($user2)->delete(route('resumes.destroy', $resume->slug));

        $response->assertForbidden();
        $this->assertDatabaseHas('resumes', ['id' => $resume->id]);
    }

    /** @test */
    public function user_can_view_own_resume()
    {
        $user = User::factory()->create();
        $user->assignRole('penyandang_disabilitas');
        
        $resume = Resume::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get(route('resumes.show', $resume->slug));

        $response->assertOk();
        $response->assertInertia(fn ($page) => 
            $page->component('Resumes/Show')
                ->where('resume.full_name', $resume->full_name)
        );
    }

    /** @test */
    public function user_can_export_resume_as_pdf()
    {
        $user = User::factory()->create();
        $user->assignRole('penyandang_disabilitas');
        
        $resume = Resume::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get(route('resumes.pdf', $resume->slug));

        $response->assertOk();
        $response->assertHeader('Content-Type', 'application/pdf');
    }

    /** @test */
    public function resume_requires_full_name()
    {
        $user = User::factory()->create();
        $user->assignRole('penyandang_disabilitas');

        $response = $this->actingAs($user)->post(route('resumes.store'), [
            'full_name' => '',
            'email' => 'test@example.com',
            'phone' => '08123456789',
        ]);

        $response->assertSessionHasErrors('full_name');
    }

    /** @test */
    public function resume_requires_valid_email()
    {
        $user = User::factory()->create();
        $user->assignRole('penyandang_disabilitas');

        $response = $this->actingAs($user)->post(route('resumes.store'), [
            'full_name' => 'John Doe',
            'email' => 'invalid-email',
            'phone' => '08123456789',
        ]);

        $response->assertSessionHasErrors('email');
    }
}
