<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>{{ $resume->title }}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'DejaVu Sans', Arial, sans-serif; 
      font-size: 11px; 
      line-height: 1.6;
      color: #333;
      padding: 20px;
    }
    
    .header {
      border-bottom: 3px solid #0891b2;
      padding-bottom: 15px;
      margin-bottom: 20px;
    }
    
    .header h1 { 
      font-size: 24px; 
      color: #0891b2;
      margin-bottom: 8px;
      font-weight: bold;
    }
    
    .contact-info {
      font-size: 10px;
      color: #666;
      margin-top: 5px;
    }
    
    .contact-info span {
      margin-right: 15px;
    }
    
    .section { 
      margin-bottom: 20px;
      page-break-inside: avoid;
    }
    
    .section-title { 
      font-size: 14px;
      font-weight: bold;
      color: #0891b2;
      border-bottom: 2px solid #f59e0b;
      padding-bottom: 5px;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .summary {
      text-align: justify;
      line-height: 1.8;
      margin-bottom: 20px;
    }
    
    .experience-item, .education-item {
      margin-bottom: 15px;
      padding-left: 15px;
      border-left: 3px solid #e5e7eb;
    }
    
    .item-title {
      font-size: 13px;
      font-weight: bold;
      color: #111;
      margin-bottom: 3px;
    }
    
    .item-company {
      font-size: 11px;
      font-weight: 600;
      color: #555;
    }
    
    .item-location {
      font-size: 10px;
      color: #888;
      margin-left: 10px;
    }
    
    .item-period {
      font-size: 10px;
      color: #888;
      font-style: italic;
      margin-bottom: 5px;
    }
    
    .item-description {
      font-size: 10px;
      color: #555;
      line-height: 1.6;
      margin-top: 5px;
      text-align: justify;
    }
    
    .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    
    .skill-tag {
      display: inline-block;
      background: #e0f2fe;
      color: #0891b2;
      padding: 5px 12px;
      border-radius: 12px;
      font-size: 10px;
      font-weight: 500;
      margin-right: 8px;
      margin-bottom: 8px;
    }
    
    .footer {
      margin-top: 30px;
      padding-top: 15px;
      border-top: 1px solid #e5e7eb;
      text-align: center;
      font-size: 9px;
      color: #999;
    }
  </style>
</head>
<body>
  <!-- Header -->
  <div class="header">
    <h1>{{ data_get($resume->profile, 'full_name', 'Nama Tidak Tersedia') }}</h1>
    <div class="contact-info">
      @if(data_get($resume->profile, 'email'))
        <span>📧 {{ data_get($resume->profile, 'email') }}</span>
      @endif
      @if(data_get($resume->profile, 'phone'))
        <span>📱 {{ data_get($resume->profile, 'phone') }}</span>
      @endif
      @if(data_get($resume->profile, 'address'))
        <span>📍 {{ data_get($resume->profile, 'address') }}</span>
      @endif
    </div>
  </div>

  <!-- Summary -->
  @if(data_get($resume->profile, 'summary'))
    <div class="section">
      <div class="section-title">Ringkasan Profil</div>
      <div class="summary">
        {{ data_get($resume->profile, 'summary') }}
      </div>
    </div>
  @endif

  <!-- Experience -->
  @if($resume->experience && count($resume->experience) > 0)
    <div class="section">
      <div class="section-title">Pengalaman Kerja</div>
      @foreach($resume->experience as $exp)
        <div class="experience-item">
          <div class="item-title">{{ data_get($exp, 'position', 'Posisi Tidak Disebutkan') }}</div>
          <div>
            <span class="item-company">{{ data_get($exp, 'company', '') }}</span>
            @if(data_get($exp, 'location'))
              <span class="item-location">{{ data_get($exp, 'location') }}</span>
            @endif
          </div>
          <div class="item-period">
            @if(data_get($exp, 'start_date'))
              {{ date('M Y', strtotime(data_get($exp, 'start_date') . '-01')) }}
            @endif
            - 
            @if(data_get($exp, 'is_current'))
              Sekarang
            @elseif(data_get($exp, 'end_date'))
              {{ date('M Y', strtotime(data_get($exp, 'end_date') . '-01')) }}
            @endif
          </div>
          @if(data_get($exp, 'description'))
            <div class="item-description">{{ data_get($exp, 'description') }}</div>
          @endif
        </div>
      @endforeach
    </div>
  @endif

  <!-- Education -->
  @if($resume->education && count($resume->education) > 0)
    <div class="section">
      <div class="section-title">Pendidikan</div>
      @foreach($resume->education as $edu)
        <div class="education-item">
          <div class="item-title">{{ data_get($edu, 'school', 'Institusi Tidak Disebutkan') }}</div>
          <div class="item-company">
            {{ data_get($edu, 'degree', '') }}
            @if(data_get($edu, 'field'))
              - {{ data_get($edu, 'field') }}
            @endif
          </div>
          <div class="item-period">
            @if(data_get($edu, 'start_year') && data_get($edu, 'end_year'))
              {{ data_get($edu, 'start_year') }} - {{ data_get($edu, 'end_year') }}
            @endif
          </div>
          @if(data_get($edu, 'description'))
            <div class="item-description">{{ data_get($edu, 'description') }}</div>
          @endif
        </div>
      @endforeach
    </div>
  @endif

  <!-- Skills -->
  @if($resume->skills && count($resume->skills) > 0)
    <div class="section">
      <div class="section-title">Keterampilan</div>
      <div class="skills-container">
        @foreach($resume->skills as $skill)
          @if($skill)
            <span class="skill-tag">{{ $skill }}</span>
          @endif
        @endforeach
      </div>
    </div>
  @endif

  <!-- Footer -->
  <div class="footer">
    Resume dibuat menggunakan SetaraLoka Resume Builder • {{ now()->format('d M Y') }}
  </div>
</body>
</html>