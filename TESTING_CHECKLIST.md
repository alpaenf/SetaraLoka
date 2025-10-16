# Testing Checklist - SetaraLoka

## 📋 Testing Overview
Dokumen ini berisi checklist untuk testing fitur-fitur utama SetaraLoka, khususnya untuk kategori disabilitas **tidak_bisa_berjalan** (Mobilitas) dan **tidak_bisa_berbicara** (Komunikasi).

---

## ✅ 1. Login & Category Selection Flow

### Test Scenario 1: First Time Login (Disabled User)
- [ ] Login dengan user role `penyandang_disabilitas`
- [ ] Setelah login, user diredirect ke halaman **Pilih Kategori Disabilitas** (`/disability/category`)
- [ ] Halaman menampilkan 2 kategori yang **available**:
  - **Mobilitas** (tidak_bisa_berjalan) - ✓ Available
  - **Komunikasi** (tidak_bisa_berbicara) - ✓ Available
- [ ] Kategori lain menampilkan badge "Coming Soon" dan tidak bisa diklik
- [ ] Pilih salah satu kategori (contoh: Komunikasi)
- [ ] Klik tombol "Lanjutkan" 
- [ ] User diredirect ke dashboard sesuai kategori yang dipilih

### Test Scenario 2: Return User (Already Selected Category)
- [ ] Login dengan user yang sudah memiliki `kategori_disabilitas`
- [ ] User langsung masuk ke dashboard (tidak diminta pilih kategori lagi)
- [ ] Dashboard yang tampil sesuai dengan kategori user

**✅ Expected Results:**
- Middleware `CheckDisabilityCategory` berfungsi
- User tidak bisa akses dashboard tanpa pilih kategori
- Kategori tersimpan di database (kolom `kategori_disabilitas` di tabel `users`)

---

## ✅ 2. Dashboard Features - Tidak Bisa Berbicara (Komunikasi)

### Visual Layout Check
- [ ] Header menampilkan "Dashboard Komunikasi"
- [ ] Warna aksen dominan: **cyan** dan **teal**
- [ ] Quick Actions menampilkan 3 card:
  - **Lowongan Kerja** (cyan gradient)
  - **Forum Komunitas** (cyan gradient)
  - **Resume Builder** (amber gradient)
- [ ] Stats Cards menampilkan:
  - Total Lowongan dengan filter komunikasi teks
  - Acara dengan live caption
  - Forum Posts
- [ ] **Tidak ada MapWidget** (karena kategori komunikasi)

### Tools Section
- [ ] Section "Alat & Fitur" menampilkan 3 cards:
  - **Text Selection TTS**
  - **AccessMate AI**
  - **Resume PDF**
- [ ] Setiap card memiliki hover effect (white → cyan)

**✅ Expected Results:**
- Layout khusus komunikasi (tanpa peta)
- Fokus pada fitur text-to-speech dan komunikasi
- Data stats dinamis dari `/penyandang-disabilitas/dashboard/stats`

---

## ✅ 3. Text Selection TTS Feature

### Test Scenario: Select Text Anywhere
1. **Login** sebagai user dengan kategori `tidak_bisa_berbicara`
2. **Buka halaman apa saja** (dashboard, jobs, events, posts)
3. **Select/highlight teks** dengan mouse atau touch
4. **Verify:**
   - [ ] Floating button muncul di atas teks yang diselect
   - [ ] Button menampilkan icon speaker + label "Bacakan"
   - [ ] Button posisi: center horizontal, 50px di atas selection
   - [ ] Button memiliki border cyan dan shadow
5. **Klik button "Bacakan"**
6. **Verify:**
   - [ ] Browser mulai membaca teks dengan SpeechSynthesis API
   - [ ] Button berubah menjadi "Hentikan" dengan background merah
   - [ ] Icon berubah jadi stop icon (animate-pulse)
7. **Klik "Hentikan"**
8. **Verify:**
   - [ ] Audio berhenti
   - [ ] Button hilang
   - [ ] Selection ter-clear

### Edge Cases
- [ ] Klik di luar button → button hilang (setelah delay 100ms)
- [ ] Select teks pendek (< 10 char) → button tetap muncul
- [ ] Select teks panjang (> 50 char) → tampil jumlah karakter di button
- [ ] Button tidak muncul untuk kategori `tidak_bisa_berjalan`

**✅ Component:** `resources/js/Components/TextSelectionTTS.jsx`

**✅ Technical:**
- Uses browser's `window.speechSynthesis` API
- Language: `id-ID` (Indonesian)
- Speech rate: 0.9
- Pitch: 1

---

## ✅ 4. AccessMate AI Feature

### Test Scenario: Open AccessMate
1. **Login** sebagai user dengan kategori `tidak_bisa_berbicara`
2. **Verify:**
   - [ ] Floating button muncul di **bottom-right** (fixed position)
   - [ ] Button berupa circle gradient cyan→teal
   - [ ] Icon microphone visible
3. **Klik floating button**
4. **Verify:**
   - [ ] Panel AccessMate muncul di bottom-right
   - [ ] Header gradient cyan→teal dengan label "AccessMate"
   - [ ] 2 Tabs: "Text-to-Speech" dan "Ringkas Teks"

### Tab 1: Text-to-Speech
- [ ] Textarea untuk input teks
- [ ] Button "Bacakan" (cyan)
- [ ] Button "Berhenti" (red, disabled by default)
- [ ] Ketik teks → Klik "Bacakan"
- [ ] Verify: Audio mulai play, button "Bacakan" disabled, "Berhenti" enabled
- [ ] Klik "Berhenti" → Audio stop

### Tab 2: Ringkas Teks
- [ ] Textarea untuk input teks panjang
- [ ] Button "Ringkas Teks" (teal)
- [ ] Input teks panjang (minimal 4 kalimat)
- [ ] Klik "Ringkas Teks"
- [ ] Verify:
   - [ ] Muncul card "Ringkasan" dengan background cyan-50
   - [ ] Ringkasan berisi 3 kalimat: pertama, tengah, terakhir
   - [ ] Button "Bacakan" muncul di card ringkasan
   - [ ] Klik "Bacakan" → ringkasan dibaca

### Edge Cases
- [ ] AccessMate tidak muncul untuk kategori `tidak_bisa_berjalan`
- [ ] Textarea kosong → button disabled
- [ ] Text < 3 kalimat → ringkasan = text asli

**✅ Component:** `resources/js/Components/AccessMate.jsx`

**✅ Technical:**
- Currently uses **client-side summarization** (simple algorithm)
- Future: Can integrate with Hugging Face API (`/ai/summarize`)
- Speech synthesis: browser API

---

## ✅ 5. Dashboard Features - Tidak Bisa Berjalan (Mobilitas)

### Visual Layout Check
- [ ] Header menampilkan "Dashboard Mobilitas"
- [ ] Warna aksen dominan: **cyan** dan **amber**
- [ ] Quick Actions menampilkan 3 card:
  - **Lowongan Remote** (cyan gradient)
  - **Acara Online** (amber gradient)
  - **Resume Builder** (cyan gradient)
- [ ] **MapWidget** tampil dengan:
  - [ ] Peta Leaflet
  - [ ] Marker custom (teardrop shape)
  - [ ] Job markers (cyan)
  - [ ] Event markers (amber)
  - [ ] Auto-fit bounds
  - [ ] Popup dengan badge accessibility

### Stats & Activity
- [ ] Stats cards menampilkan data:
  - Total Remote Jobs
  - Online Events
  - Forum Posts
- [ ] Activity feed: Recent jobs, events, forum posts

**✅ Expected Results:**
- Layout khusus mobilitas (dengan peta)
- Fokus pada remote work dan online events
- MapWidget interactive dan responsive

---

## ✅ 6. Forum Features (Posts)

### Test Voice-to-Text
1. **Buka halaman Forum** (`/posts`)
2. **Klik "New Post" atau tombol create**
3. **Verify:**
   - [ ] Form menampilkan:
     - Title input
     - Content textarea
     - Visibility select (public/private)
     - **Voice-to-Text button** (icon microphone)
4. **Klik button Voice-to-Text**
5. **Verify:**
   - [ ] Browser meminta permission microphone
   - [ ] Button berubah state (listening indicator)
   - [ ] Bicara ke microphone
   - [ ] Transcript muncul di textarea content
6. **Test multiple recordings:**
   - [ ] Transcript ditambahkan (tidak replace)
   - [ ] Spasi otomatis antara transcript

### Test Forum Index & Show
- [ ] **Index page** menampilkan list posts
- [ ] Setiap post card menampilkan:
  - Author info
  - Title & excerpt
  - Comments count
  - Created date
- [ ] **Show page** menampilkan:
  - Full post content
  - Comments section
  - Comment form
  - Edit/Delete buttons (jika owner)

**✅ Component:** `resources/js/Pages/Posts/Index.jsx`, `Show.jsx`

**✅ Technical:**
- Uses `webkitSpeechRecognition` or `SpeechRecognition` API
- Language: `id-ID`
- Real-time transcript appending

---

## ✅ 7. Jobs & Events Filtering

### Jobs Filtering (Mobilitas)
1. **Login** sebagai `tidak_bisa_berjalan`
2. **Buka** `/jobs`
3. **Verify filters:**
   - [ ] Filter "Remote" tersedia
   - [ ] Filter "Wheelchair Accessible" tersedia
4. **Apply filter Remote**
5. **Verify:**
   - [ ] Hanya job dengan `is_remote=true` yang tampil
   - [ ] Badge "Remote" tampil di job card
6. **Apply filter Wheelchair Accessible**
7. **Verify:**
   - [ ] Hanya job dengan `is_wheelchair_accessible=true` yang tampil

### Jobs Filtering (Komunikasi)
1. **Login** sebagai `tidak_bisa_berbicara`
2. **Buka** `/jobs`
3. **Verify filters:**
   - [ ] Filter "Komunikasi Teks" tersedia
4. **Apply filter**
5. **Verify:**
   - [ ] Hanya job dengan `has_text_communication=true` yang tampil
   - [ ] Badge "💬 Text Communication" tampil di job card

### Events Filtering (Similar logic)
- [ ] Mobilitas: Filter "Online", "Hybrid", "Wheelchair Accessible"
- [ ] Komunikasi: Filter "Live Caption", "Sign Language"

**✅ Components:** `resources/js/Pages/Jobs/Index.jsx`, `Events/Index.jsx`

---

## ✅ 8. Resume Builder

### Test Complete Flow
1. **Buka** `/resumes`
2. **Verify Index:**
   - [ ] List resumes user
   - [ ] Button "Buat Resume Baru" (amber, aligned right)
   - [ ] Empty state jika belum ada resume
3. **Klik "Buat Resume Baru"**
4. **Verify Create Form:**
   - [ ] Title input
   - [ ] Profile section (name, email, phone, address)
   - [ ] Education section (dynamic add/remove)
   - [ ] Experience section (dynamic add/remove, checkbox "Masih Bekerja")
   - [ ] Skills section (add/remove)
5. **Fill form & Submit**
6. **Verify:**
   - [ ] Redirect ke Show page
   - [ ] Resume data tersimpan
7. **Test Actions:**
   - [ ] **Edit:** Klik Edit → form pre-filled → update berhasil
   - [ ] **Download PDF:** Klik Download → PDF ter-download
   - [ ] **Delete:** Klik Delete → confirm → resume terhapus

### PDF Generation
- [ ] PDF menampilkan layout profesional
- [ ] Semua section tampil (profile, education, experience, skills)
- [ ] Font readable (DejaVu Sans)
- [ ] Styling for print

**✅ Components:** 
- `resources/js/Pages/Resumes/*`
- `app/Http/Controllers/ResumeController.php`
- `app/Http/Controllers/ResumeExportController.php`
- `resources/views/pdf/resume.blade.php`

---

## ✅ 9. Profile Settings - Category Edit

### Test Category Change
1. **Buka** `/disabled/profile`
2. **Verify:**
   - [ ] Current category ditampilkan (badge atau label)
   - [ ] Section "Kategori Aksesibilitas"
   - [ ] 2 options: Komunikasi & Mobilitas
   - [ ] Option yang dipilih ter-highlight
3. **Change category:**
   - [ ] Pilih kategori lain
   - [ ] Klik Save
4. **Verify:**
   - [ ] Success message
   - [ ] Page reload/redirect
   - [ ] Dashboard berubah sesuai kategori baru
   - [ ] Features (TTS, Map) berubah sesuai kategori

**✅ Components:** 
- `resources/js/Pages/Disabled/Profile.jsx`
- `app/Http/Controllers/DisabledController.php`

---

## ✅ 10. Accessibility & WCAG Audit

### Keyboard Navigation
- [ ] Tab navigation works across all forms
- [ ] Focus visible pada buttons & links
- [ ] Escape closes modals/panels
- [ ] Enter submits forms

### Screen Reader
- [ ] Semantic HTML (`<header>`, `<section>`, `<nav>`)
- [ ] ARIA labels ada di icons
- [ ] Alt text pada images
- [ ] aria-labelledby pada sections

### Color Contrast
- [ ] Text on cyan background: contrast ratio ≥ 4.5:1
- [ ] Text on amber background: contrast ratio ≥ 4.5:1
- [ ] Hover states clearly visible

### High Contrast Mode
- [ ] Component A11yControls berfungsi
- [ ] High contrast toggle mengubah warna
- [ ] Text remains readable

**✅ Component:** `resources/js/Components/A11yControls.jsx`

---

## ✅ 11. Mobile Responsiveness

### Breakpoints Check
- [ ] **xs** (< 640px): Single column, stacked layout
- [ ] **sm** (640px+): 2-column grids
- [ ] **md** (768px+): 3-column grids
- [ ] **lg** (1024px+): Full layout

### Touch Interactions
- [ ] Text selection TTS works on touch
- [ ] Map pinch-to-zoom works
- [ ] Buttons min 44x44px (accessibility)
- [ ] Floating buttons tidak overlap content

---

## ✅ 12. Performance & Load Times

### Initial Load
- [ ] Dashboard loads < 2s
- [ ] Map loads < 3s
- [ ] No console errors

### API Response Times
- [ ] `/penyandang-disabilitas/dashboard/stats` < 500ms
- [ ] `/penyandang-disabilitas/dashboard/feed` < 1s
- [ ] `/ai/tts` < 3s (future Hugging Face integration)

### Client-Side Performance
- [ ] Speech synthesis latency < 500ms
- [ ] No memory leaks (test long sessions)
- [ ] Smooth transitions & animations

---

## 📊 Testing Summary Template

```
Test Date: __________
Tester: __________
Environment: [Development / Staging / Production]

| Feature | Status | Notes |
|---------|--------|-------|
| Category Selection | ✅/❌ | |
| Dashboard (Komunikasi) | ✅/❌ | |
| Dashboard (Mobilitas) | ✅/❌ | |
| Text Selection TTS | ✅/❌ | |
| AccessMate AI | ✅/❌ | |
| Forum Voice-to-Text | ✅/❌ | |
| Jobs/Events Filtering | ✅/❌ | |
| Resume Builder | ✅/❌ | |
| Profile Category Edit | ✅/❌ | |
| Accessibility (WCAG) | ✅/❌ | |
| Mobile Responsive | ✅/❌ | |

Critical Bugs Found: __________
Minor Issues: __________
Recommendations: __________
```

---

## 🔧 Known Issues & To-Do

### Current Limitations
- [ ] **AccessMate Summarization:** Currently uses simple client-side algorithm
  - **Future:** Integrate Hugging Face API (`POST /ai/summarize`)
- [ ] **TTS API:** Currently uses browser SpeechSynthesis
  - **Future:** Optional server-side TTS via Hugging Face (`POST /ai/tts`)

### Pending Features
- [ ] Visual impairment category (Coming Soon)
- [ ] Hearing impairment category (Coming Soon)
- [ ] Cognitive support category (Coming Soon)

### Bug Fixes
- [ ] Test Text Selection TTS on Firefox (SpeechSynthesis support)
- [ ] Test Map on mobile Safari (Leaflet touch issues)
- [ ] Test voice-to-text on different browsers

---

## 🚀 Quick Test Commands

### Run Laravel Server
```powershell
php artisan serve
```

### Build Frontend Assets
```powershell
npm run dev
# or for production:
npm run build
```

### Test Users (Seeder)
- **Disabled User:** `disabled@setaraloka.test / password`
- **Company:** `company@setaraloka.test / password`
- **Admin:** `admin@setaraloka.test / password`

### Clear Cache
```powershell
php artisan config:clear
php artisan cache:clear
php artisan view:clear
```

---

## 📝 Notes
- **Browser Compatibility:** Text Selection TTS & Voice-to-Text require modern browsers (Chrome, Edge, Safari)
- **Microphone Permission:** User must grant permission for voice-to-text
- **Internet:** Hugging Face API (future) requires internet connection
- **Mobile:** Some speech APIs may behave differently on iOS vs Android

---

**Last Updated:** October 17, 2025
**Version:** 1.0
**Status:** Ready for Testing ✅
