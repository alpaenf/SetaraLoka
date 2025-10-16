<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $primaryRole = null; $roleNames = [];$normalized = [];
        if ($user) {
            $roleNames = $user->getRoleNames()->toArray();
            // Map DB slugs (id) to UI slugs (en)
            $map = [
                'penyandang_disabilitas' => 'disabled',
                'relawan' => 'volunteer',
                'perusahaan' => 'company',
                'lembaga_sosial' => 'organization',
                'admin' => 'admin',
            ];
            foreach ($roleNames as $r) {
                if (isset($map[$r])) { $normalized[] = $map[$r]; }
            }
            // Prefer volunteer over disabled when user has multiple roles
            $preferred = ['volunteer', 'disabled', 'company', 'organization', 'admin'];
            foreach ($preferred as $r) {
                if (in_array($r, $normalized, true)) { $primaryRole = $r; break; }
            }
            if (!$primaryRole && !empty($normalized)) { $primaryRole = $normalized[0]; }
        }
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? array_merge($user->toArray(), [
                    'role_names' => $roleNames, // original DB slugs
                    'role_names_normalized' => $normalized, // mapped UI slugs
                    'primary_role' => $primaryRole, // normalized value for UI
                ]) : null,
            ],
            'notifications' => [
                'unread_count' => fn() => $request->user()?->unreadNotifications()->count() ?? 0,
            ],
            'company_profile' => function() use ($user) {
                if (!$user || !$user->hasRole('perusahaan')) { return null; }
                $profile = \App\Models\CompanyProfile::where('user_id', $user->id)->first();
                if (!$profile) { return ['exists' => false]; }
                return [
                    'exists' => true,
                    'verification_status' => $profile->verification_status,
                    'verified_at' => $profile->verified_at,
                ];
            },
        ];
    }
}
