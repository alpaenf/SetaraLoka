<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class OrganizationEventSeeder extends Seeder
{
    public function run(): void
    {
        // Try to find an organization user; fallback to first user
        $user = method_exists(User::class, 'role')
            ? User::role('lembaga_sosial')->first()
            : null;
        if (!$user) {
            $user = User::first();
            if (!$user) return; // no users
        }

        $titles = [
            'Aksi Bersih Pantai',
            'Donor Darah Peduli Sesama',
            'Pelatihan Literasi Digital',
            'Bazar UMKM Inklusif',
            'Penanaman Pohon Kota',
            'Kelas Isyarat Dasar',
            'Webinar Kesehatan Mental Online',
            'Workshop Desain Grafis Hybrid',
            'Talkshow Karir untuk Disabilitas',
            'Pelatihan Kewirausahaan Digital',
        ];

        // Accessibility configurations for each event
        $accessibilityConfig = [
            // Aksi Bersih Pantai - offline, wheelchair accessible
            ['location_type' => 'offline', 'wheelchair' => true, 'caption' => false, 'max' => 50, 'current' => 32],
            // Donor Darah - offline, not wheelchair accessible (butuh mobilitas)
            ['location_type' => 'offline', 'wheelchair' => false, 'caption' => false, 'max' => 100, 'current' => 67],
            // Pelatihan Literasi Digital - online, has caption
            ['location_type' => 'online', 'wheelchair' => true, 'caption' => true, 'max' => 200, 'current' => 145],
            // Bazar UMKM - offline, wheelchair accessible
            ['location_type' => 'offline', 'wheelchair' => true, 'caption' => false, 'max' => null, 'current' => 0],
            // Penanaman Pohon - offline, not wheelchair accessible (butuh aktivitas fisik)
            ['location_type' => 'offline', 'wheelchair' => false, 'caption' => false, 'max' => 75, 'current' => 28],
            // Kelas Isyarat - offline, wheelchair accessible, has caption
            ['location_type' => 'offline', 'wheelchair' => true, 'caption' => true, 'max' => 30, 'current' => 18],
            // Webinar Online - online, has caption
            ['location_type' => 'online', 'wheelchair' => true, 'caption' => true, 'max' => 500, 'current' => 342],
            // Workshop Hybrid - hybrid, wheelchair accessible, has caption
            ['location_type' => 'hybrid', 'wheelchair' => true, 'caption' => true, 'max' => 80, 'current' => 54],
            // Talkshow - online, has caption
            ['location_type' => 'online', 'wheelchair' => true, 'caption' => true, 'max' => 300, 'current' => 189],
            // Pelatihan Digital - hybrid, wheelchair accessible, has caption
            ['location_type' => 'hybrid', 'wheelchair' => true, 'caption' => true, 'max' => 100, 'current' => 73],
        ];

        foreach ($titles as $i => $title) {
            $color = ['#FFB020','#22C55E','#3B82F6','#EF4444','#8B5CF6','#06B6D4','#10B981','#F59E0B','#EC4899','#6366F1'][$i % 10];
            $svg = $this->bannerSvg($title, $color);
            $path = 'events/demo_'.($i+1).'.svg';
            Storage::disk('public')->put($path, $svg);

            $start = Carbon::now()->addDays($i + 1)->setTime(9, 0);
            $end = Carbon::now()->addDays($i + 1)->setTime(12, 0);
            
            $config = $accessibilityConfig[$i];

            Event::updateOrCreate(
                ['user_id' => $user->id, 'title' => $title],
                [
                    'description' => 'Kegiatan '.$title.' bersama komunitas setempat. Terbuka untuk umum.',
                    'start_at' => $start,
                    'end_at' => $end,
                    'location_name' => $config['location_type'] === 'online' ? 'Zoom Meeting' : 'Kota '.($user->city ?? 'Setempat'),
                    'latitude' => null,
                    'longitude' => null,
                    'image_path' => $path,
                    'location_type' => $config['location_type'],
                    'is_wheelchair_accessible' => $config['wheelchair'],
                    'has_live_caption' => $config['caption'],
                    'max_participants' => $config['max'],
                    'participants_count' => $config['current'],
                ]
            );
        }
    }

    private function bannerSvg(string $title, string $color): string
    {
        $titleEsc = htmlspecialchars($title, ENT_QUOTES);
        return <<<SVG
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="$color" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#111827" stop-opacity="0.9" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)" />
  <text x="60" y="300" font-family="Segoe UI, Roboto, Arial" font-size="72" font-weight="700" fill="#ffffff">$titleEsc</text>
  <text x="60" y="380" font-family="Segoe UI, Roboto, Arial" font-size="28" fill="#e5e7eb">SetaraLoka · Agenda Lembaga</text>
  <circle cx="1100" cy="90" r="60" fill="#ffffff22" />
  <circle cx="1040" cy="180" r="40" fill="#ffffff18" />
  <circle cx="1120" cy="230" r="30" fill="#ffffff12" />
  <rect x="0" y="560" width="1200" height="70" fill="#ffffff10" />
  <text x="60" y="605" font-family="Segoe UI, Roboto, Arial" font-size="20" fill="#f9fafb">setaraloka.id</text>
  <text x="1050" y="605" font-family="Segoe UI, Roboto, Arial" font-size="20" fill="#f9fafb">#InklusifBersama</text>
  Sorry, your browser does not support inline SVG.
</svg>
SVG;
    }
}
