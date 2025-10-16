<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>CV</title>
  <style>
    body { font-family: DejaVu Sans, sans-serif; font-size: 12px; }
    h1 { font-size: 20px; margin-bottom: 0; }
    h2 { font-size: 16px; border-bottom: 1px solid #ddd; }
    .section { margin-top: 12px; }
  </style>
</head>
<body>
  <h1>{{ $resume->title }}</h1>
  <p>{{ data_get($resume->profile,'summary') }}</p>

  <div class="section">
    <h2>Pendidikan</h2>
    <ul>
      @foreach((array) $resume->education as $edu)
        <li>{{ data_get($edu,'school') }} - {{ data_get($edu,'degree') }} ({{ data_get($edu,'year') }})</li>
      @endforeach
    </ul>
  </div>

  <div class="section">
    <h2>Pengalaman</h2>
    <ul>
      @foreach((array) $resume->experience as $exp)
        <li>{{ data_get($exp,'company') }} - {{ data_get($exp,'role') }} ({{ data_get($exp,'period') }})</li>
      @endforeach
    </ul>
  </div>

  <div class="section">
    <h2>Keterampilan</h2>
    <ul>
      @foreach((array) $resume->skills as $s)
        <li>{{ $s }}</li>
      @endforeach
    </ul>
  </div>
</body>
</html>