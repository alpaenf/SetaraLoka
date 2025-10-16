<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;
use App\Models\Job;
use App\Models\User;

class EventsAndJobsSeeder extends Seeder
{
    public function run(): void
    {
        // Ensure some organizers (lembaga_sosial, relawan) and companies (perusahaan) exist
    // Spatie: use role([...]) to get users having any of the roles
    $organizerIds = User::role([User::ROLE_LEMBAGA_SOSIAL, User::ROLE_RELAWAN])->pluck('id')->all();
        $companyPosterIds = User::role(User::ROLE_PERUSAHAAN)->pluck('id')->all();

        if (!empty($organizerIds) && Event::count() === 0) {
            $placeholders = [
                'https://source.unsplash.com/800x600/?community',
                'https://source.unsplash.com/800x600/?conference',
                'https://source.unsplash.com/800x600/?volunteer',
                'https://source.unsplash.com/800x600/?team',
                'https://source.unsplash.com/800x600/?career',
            ];
            Event::factory(15)->create()->each(function($ev) use ($placeholders) {
                $ev->image_path = $placeholders[array_rand($placeholders)];
                $ev->save();
            });
        }

        if (!empty($companyPosterIds) && Job::count() === 0) {
            Job::factory(20)->create();
        }
    }
}
