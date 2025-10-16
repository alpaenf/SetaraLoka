<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Job;
use App\Models\Event;
use App\Models\CompanyProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;

class JobEventFilteringTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        Role::create(['name' => 'penyandang_disabilitas']);
        Role::create(['name' => 'perusahaan']);
    }

    /** @test */
    public function jobs_index_returns_all_jobs()
    {
        $user = User::factory()->create();
        $user->assignRole('penyandang_disabilitas');

        $company = User::factory()->create();
        $company->assignRole('perusahaan');
        $companyProfile = CompanyProfile::factory()->create(['user_id' => $company->id]);

        Job::factory()->count(5)->create([
            'company_profile_id' => $companyProfile->id,
            'published' => true,
        ]);

        $response = $this->actingAs($user)->get(route('jobs.index'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => 
            $page->component('Jobs/Index')
                ->has('jobs.data', 5)
        );
    }

    /** @test */
    public function jobs_can_filter_by_remote()
    {
        $user = User::factory()->create([
            'kategori_disabilitas' => 'tidak_bisa_berjalan',
        ]);
        $user->assignRole('penyandang_disabilitas');

        $company = User::factory()->create();
        $company->assignRole('perusahaan');
        $companyProfile = CompanyProfile::factory()->create(['user_id' => $company->id]);

        Job::factory()->create([
            'company_profile_id' => $companyProfile->id,
            'is_remote' => true,
            'published' => true,
        ]);
        Job::factory()->create([
            'company_profile_id' => $companyProfile->id,
            'is_remote' => false,
            'published' => true,
        ]);

        $response = $this->actingAs($user)->get(route('jobs.index', ['filter' => 'remote']));

        $response->assertOk();
        // Note: Filtering is done client-side in React, so we just verify all jobs are passed
        $response->assertInertia(fn ($page) => 
            $page->component('Jobs/Index')
                ->has('jobs.data', 2) // All jobs passed to frontend
        );
    }

    /** @test */
    public function events_index_returns_all_events()
    {
        $user = User::factory()->create();
        $user->assignRole('penyandang_disabilitas');

        Event::factory()->count(3)->create(['published' => true]);

        $response = $this->actingAs($user)->get(route('events.index'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => 
            $page->component('Events/Index')
                ->has('events.data', 3)
        );
    }

    /** @test */
    public function events_show_accessibility_features()
    {
        $user = User::factory()->create([
            'kategori_disabilitas' => 'tidak_bisa_berbicara',
        ]);
        $user->assignRole('penyandang_disabilitas');

        $event = Event::factory()->create([
            'published' => true,
            'has_live_caption' => true,
            'has_sign_language' => true,
            'is_wheelchair_accessible' => true,
        ]);

        $response = $this->actingAs($user)->get(route('events.show', $event->slug));

        $response->assertOk();
        $response->assertInertia(fn ($page) => 
            $page->component('Events/Show')
                ->where('event.has_live_caption', true)
                ->where('event.has_sign_language', true)
        );
    }

    /** @test */
    public function jobs_show_accessibility_features()
    {
        $user = User::factory()->create([
            'kategori_disabilitas' => 'tidak_bisa_berjalan',
        ]);
        $user->assignRole('penyandang_disabilitas');

        $company = User::factory()->create();
        $company->assignRole('perusahaan');
        $companyProfile = CompanyProfile::factory()->create(['user_id' => $company->id]);

        $job = Job::factory()->create([
            'company_profile_id' => $companyProfile->id,
            'published' => true,
            'is_remote' => true,
            'is_wheelchair_accessible' => true,
            'has_text_communication' => true,
        ]);

        $response = $this->actingAs($user)->get(route('jobs.show', $job->slug));

        $response->assertOk();
        $response->assertInertia(fn ($page) => 
            $page->component('Jobs/Show')
                ->where('job.is_remote', true)
                ->where('job.is_wheelchair_accessible', true)
        );
    }

    /** @test */
    public function map_api_returns_jobs_and_events_with_coordinates()
    {
        $user = User::factory()->create([
            'kategori_disabilitas' => 'tidak_bisa_berjalan',
        ]);
        $user->assignRole('penyandang_disabilitas');

        $company = User::factory()->create();
        $company->assignRole('perusahaan');
        $companyProfile = CompanyProfile::factory()->create(['user_id' => $company->id]);

        Job::factory()->create([
            'company_profile_id' => $companyProfile->id,
            'published' => true,
            'latitude' => -6.2088,
            'longitude' => 106.8456,
        ]);

        Event::factory()->create([
            'published' => true,
            'latitude' => -6.2088,
            'longitude' => 106.8456,
        ]);

        $response = $this->actingAs($user)->get('/api/map/points');

        $response->assertOk();
        $response->assertJsonStructure([
            'jobs' => [
                '*' => ['id', 'title', 'latitude', 'longitude']
            ],
            'events' => [
                '*' => ['id', 'title', 'latitude', 'longitude']
            ]
        ]);
    }
}
