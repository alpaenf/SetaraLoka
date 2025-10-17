<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Support\Arr;

class ForumSeeder extends Seeder
{
    public function run(): void
    {
        if (Post::count() > 0) {
            return; // avoid duplicating on repeated seed runs
        }

        $userIds = User::pluck('id')->all();
        if (empty($userIds)) return;

        // Data forum bahasa Indonesia yang relevan
        $forumData = [
            [
                'title' => 'Tips Mencari Pekerjaan untuk Penyandang Disabilitas',
                'content' => "Halo teman-teman! Saya ingin berbagi beberapa tips yang membantu saya dalam proses mencari pekerjaan.\n\n1. Persiapkan CV yang menekankan skill dan pengalaman\n2. Manfaatkan platform seperti SetaraLoka untuk menemukan perusahaan inklusif\n3. Jangan ragu untuk menjelaskan kebutuhan akomodasi yang diperlukan\n4. Networking sangat penting - ikuti event dan webinar\n\nSemoga membantu! Ada yang mau menambahkan?",
                'visibility' => 'public',
                'comments' => [
                    'Terima kasih sharingnya! Saya juga mau menambahkan pentingnya riset perusahaan sebelum melamar.',
                    'Setuju banget! Networking memang kunci. Saya dapat pekerjaan dari koneksi di event relawan.',
                    'Tips yang sangat berguna. Boleh tanya, bagaimana cara terbaik menegosiasikan akomodasi?',
                ]
            ],
            [
                'title' => 'Pengalaman Mengikuti Pelatihan Keterampilan Digital',
                'content' => "Minggu lalu saya selesai mengikuti pelatihan desain grafis yang diadakan oleh salah satu organisasi mitra SetaraLoka. Pengalaman yang luar biasa!\n\nPelatihan berlangsung selama 2 minggu dengan materi yang mudah dipahami. Instrukturnya juga sangat perhatian dengan kebutuhan peserta disabilitas.\n\nHasilnya, sekarang saya bisa membuat desain poster dan konten media sosial. Ada yang tertarik dengan pelatihan serupa?",
                'visibility' => 'public',
                'comments' => [
                    'Wah keren! Boleh info organisasinya apa? Saya juga mau ikut pelatihan serupa.',
                    'Selamat ya! Semangat terus mengembangkan skill-nya.',
                ]
            ],
            [
                'title' => 'Rekomendasi Alat Bantu untuk Mobilitas',
                'content' => "Halo semua, saya baru bergabung di komunitas ini. Saya sedang mencari rekomendasi kursi roda yang nyaman dan terjangkau.\n\nSaya butuh yang bisa dilipat dan mudah dibawa saat bepergian. Budget sekitar 2-3 juta. Ada yang punya pengalaman atau rekomendasi?",
                'visibility' => 'public',
                'comments' => [
                    'Coba cek toko online atau komunitas second kursi roda. Kadang ada yang jual dengan harga lebih murah tapi kondisi masih bagus.',
                    'Saya pakai merk X, sudah 2 tahun awet dan nyaman. Harganya sekitar 2.5 juta.',
                    'Kalau mau yang ringan, bahan aluminium lebih recommended daripada besi.',
                ]
            ],
            [
                'title' => 'Event Volunteer di Bulan Ini - Yuk Gabung!',
                'content' => "Ada event volunteer seru bulan ini:\n\n🌟 Bakti Sosial di Panti Asuhan (15 Oktober)\n🌟 Pelatihan Bahasa Isyarat untuk Umum (20 Oktober)\n🌟 Donor Darah Inklusif (25 Oktober)\n\nSemua event terbuka untuk penyandang disabilitas dan volunteer umum. Infrastruktur sudah accessible. Mari kita buat dampak positif bersama!",
                'visibility' => 'public',
                'comments' => [
                    'Saya daftar untuk pelatihan bahasa isyarat! Sudah lama mau belajar.',
                    'Event donor darahnya di mana? Saya mau ikut.',
                    'Keren banget! Senang lihat makin banyak event yang inklusif.',
                ]
            ],
            [
                'title' => 'Sharing: Pertama Kali Presentasi di Kantor',
                'content' => "Hari ini adalah hari yang bersejarah buat saya. Untuk pertama kalinya, saya presentasi di depan tim kantor dengan screen reader.\n\nAwalnya nervous, tapi tim sangat supportive. Mereka mendengarkan dengan baik dan memberikan feedback konstruktif.\n\nPesan saya: jangan biarkan keterbatasan menghalangi kita untuk berkembang. Kita bisa!",
                'visibility' => 'public',
                'comments' => [
                    'Selamat! Cerita yang sangat menginspirasi.',
                    'Proud of you! Semangat terus ya.',
                    'Tim yang supportive itu sangat penting. Senang dengar cerita positif seperti ini.',
                ]
            ],
            [
                'title' => 'Diskusi: Aksesibilitas Transportasi Umum di Jakarta',
                'content' => "Bagaimana pengalaman teman-teman menggunakan transportasi umum di Jakarta?\n\nSaya sering menggunakan TransJakarta dan MRT. MRT sudah cukup baik dengan lift dan jalur khusus, tapi beberapa halte TransJakarta masih kurang accessible.\n\nAda saran atau pengalaman yang bisa dishare?",
                'visibility' => 'public',
                'comments' => [
                    'MRT memang sudah bagus. Tapi masih perlu perbaikan di beberapa stasiun untuk jalur tunanetra.',
                    'Saya lebih sering pakai ojek online karena lebih fleksibel. Tapi mahal untuk jangka panjang.',
                    'KRL juga sudah lumayan baik dengan gerbong khusus. Tapi masih perlu sosialisasi ke penumpang lain.',
                ]
            ],
            [
                'title' => 'Rekomendasi Aplikasi Produktivitas untuk Tunanetra',
                'content' => "Saya mau share beberapa aplikasi yang sangat membantu saya dalam bekerja:\n\n📱 Screen reader built-in (iOS/Android)\n📱 Voice typing untuk dokumentasi cepat\n📱 Audio book apps untuk continuous learning\n📱 Navigation apps dengan voice guidance\n\nAda aplikasi lain yang kalian rekomendasikan?",
                'visibility' => 'public',
                'comments' => [
                    'NVDA dan JAWS sangat membantu untuk desktop work.',
                    'Terima kasih rekomendasinya! Saya baru tahu beberapa aplikasi ini.',
                ]
            ],
            [
                'title' => 'Lowongan Kerja Ramah Disabilitas - Share di Sini!',
                'content' => "Thread ini khusus untuk sharing info lowongan kerja yang ramah terhadap penyandang disabilitas.\n\nSilakan share posisi, perusahaan, dan link jika ada. Mari bantu satu sama lain menemukan peluang karir yang tepat!",
                'visibility' => 'public',
                'comments' => [
                    'Perusahaan saya sedang buka posisi customer service. Remote friendly! DM jika tertarik.',
                    'Ada lowongan content writer di startup edtech. Bisa full remote.',
                ]
            ],
            [
                'title' => 'Cerita Sukses: Dari Volunteer Jadi Full Time Staff',
                'content' => "Setahun yang lalu saya mulai sebagai volunteer di sebuah NGO. Sekarang saya sudah jadi full time staff!\n\nAwalnya saya hanya bantu event-event kecil. Tapi dengan konsisten dan komitmen, saya dipercaya untuk handle project lebih besar.\n\nPesan saya: jangan remehkan pengalaman volunteering. Ini bisa jadi stepping stone untuk karir yang lebih baik.",
                'visibility' => 'public',
                'comments' => [
                    'Inspiratif sekali! Selamat atas pencapaiannya.',
                    'Cerita seperti ini yang bikin semangat. Terima kasih sudah berbagi!',
                    'Saya juga lagi volunteering sekarang. Jadi makin semangat setelah baca ini.',
                ]
            ],
            [
                'title' => 'Tips Mengatur Waktu Antara Kerja dan Terapi',
                'content' => "Teman-teman yang masih rutin terapi sambil bekerja, bagaimana caranya mengatur waktu?\n\nSaya kadang kesulitan karena jadwal terapi bentrok dengan meeting kantor. Ada tips praktis yang bisa dishare?",
                'visibility' => 'public',
                'comments' => [
                    'Saya biasanya komunikasikan ke atasan sejak awal tentang jadwal terapi rutin. So far mereka understand.',
                    'Coba cari terapis yang bisa adjust jadwal atau online therapy jika memungkinkan.',
                    'Work-life balance memang penting. Jangan ragu untuk minta akomodasi dari perusahaan.',
                ]
            ],
        ];

        // Create posts dengan data Indonesia
        foreach ($forumData as $data) {
            $post = Post::create([
                'user_id' => Arr::random($userIds),
                'title' => $data['title'],
                'content' => $data['content'],
                'visibility' => $data['visibility'],
            ]);

            // Add comments
            foreach ($data['comments'] as $commentText) {
                Comment::create([
                    'post_id' => $post->id,
                    'user_id' => Arr::random($userIds),
                    'content' => $commentText,
                ]);
            }
        }

        // Add beberapa post tambahan dengan factory untuk variety
        Post::factory(5)->create()->each(function(Post $post) use ($userIds) {
            $post->visibility = 'public';
            $post->save();
            
            // Random comments 0-3
            $commentCount = rand(0, 3);
            for ($i = 0; $i < $commentCount; $i++) {
                Comment::factory()->create([
                    'post_id' => $post->id,
                    'user_id' => Arr::random($userIds),
                ]);
            }
        });
    }
}
