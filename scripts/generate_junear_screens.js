import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const outDir = path.join(process.cwd(), 'public/screenshots/junear');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const w = 1080;
const h = 2400;

// Screen 1: Védett Gyerek Launcher
const svg1 = `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F0FAF8" />
      <stop offset="50%" stop-color="#FAF7F2" />
      <stop offset="100%" stop-color="#E8F5F2" />
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#2C2C2C" flood-opacity="0.08" />
    </filter>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#bg1)" />

  <!-- Status Bar -->
  <g fill="#2C2C2C" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="600">
    <text x="60" y="90">14:32</text>
    <g transform="translate(880, 60)">
      <rect x="70" y="5" width="65" height="32" rx="6" fill="none" stroke="#2C2C2C" stroke-width="4" />
      <rect x="138" y="15" width="6" height="12" rx="2" fill="#2C2C2C" />
      <rect x="76" y="11" width="48" height="20" rx="3" fill="#2EAA68" />
      <path d="M20,32 A20,20 0 0,1 48,32 M25,37 A13,13 0 0,1 43,37 M32,42 A4,4 0 0,1 36,42" stroke="#2C2C2C" stroke-width="4" fill="none" stroke-linecap="round" />
    </g>
  </g>

  <!-- Header Greeting -->
  <g transform="translate(60, 200)">
    <rect width="960" height="180" rx="36" fill="#FFFFFF" filter="url(#shadow)" />
    <text x="50" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="800" fill="#1B3B36">Szia Tomi! 🎒</text>
    <text x="50" y="135" font-family="system-ui, -apple-system, sans-serif" font-size="30" font-weight="500" fill="#5A7570">Kedd, 2026. Május 12. • Kioszk Zár Aktív</text>
    <circle cx="880" cy="90" r="42" fill="#E0F4EE" />
    <text x="862" y="105" font-size="42">🛡️</text>
  </g>

  <!-- 4 Main Tiles -->
  <g transform="translate(60, 430)">
    <!-- Tile 1: Családi Hívások -->
    <g transform="translate(0, 0)">
      <rect width="460" height="520" rx="40" fill="#FFFFFF" stroke="#87D2C0" stroke-width="4" filter="url(#shadow)" />
      <rect width="460" height="180" rx="40" fill="#E8F7F3" />
      <circle cx="230" cy="150" r="70" fill="#23A987" />
      <text x="198" y="172" font-size="70">📞</text>
      <text x="230" y="290" font-family="system-ui, sans-serif" font-size="42" font-weight="800" fill="#1B3B36" text-anchor="middle">Családi Hívó</text>
      <text x="230" y="350" font-family="system-ui, sans-serif" font-size="28" font-weight="500" fill="#5C5A56" text-anchor="middle">Anya • Apa • Nagyi</text>
      <rect x="60" y="410" width="340" height="70" rx="24" fill="#23A987" />
      <text x="230" y="458" font-family="system-ui, sans-serif" font-size="28" font-weight="700" fill="#FFFFFF" text-anchor="middle">Hívás Indítása</text>
    </g>

    <!-- Tile 2: Órarend -->
    <g transform="translate(500, 0)">
      <rect width="460" height="520" rx="40" fill="#FFFFFF" stroke="#FFD79E" stroke-width="4" filter="url(#shadow)" />
      <rect width="460" height="180" rx="40" fill="#FFF5E6" />
      <circle cx="230" cy="150" r="70" fill="#F39C12" />
      <text x="198" y="172" font-size="70">📚</text>
      <text x="230" y="290" font-family="system-ui, sans-serif" font-size="42" font-weight="800" fill="#422C0A" text-anchor="middle">Órarend</text>
      <text x="230" y="350" font-family="system-ui, sans-serif" font-size="28" font-weight="500" fill="#5C5A56" text-anchor="middle">Következő: Rajz (13:15)</text>
      <rect x="60" y="410" width="340" height="70" rx="24" fill="#F39C12" />
      <text x="230" y="458" font-family="system-ui, sans-serif" font-size="28" font-weight="700" fill="#FFFFFF" text-anchor="middle">Órák Megtekintése</text>
    </g>

    <!-- Tile 3: Oktató Játékok -->
    <g transform="translate(0, 560)">
      <rect width="460" height="520" rx="40" fill="#FFFFFF" stroke="#D3C5F5" stroke-width="4" filter="url(#shadow)" />
      <rect width="460" height="180" rx="40" fill="#F3EEFF" />
      <circle cx="230" cy="150" r="70" fill="#8E44AD" />
      <text x="198" y="172" font-size="70">🧩</text>
      <text x="230" y="290" font-family="system-ui, sans-serif" font-size="42" font-weight="800" fill="#2A113E" text-anchor="middle">Biztonságos Appok</text>
      <text x="230" y="350" font-family="system-ui, sans-serif" font-size="28" font-weight="500" fill="#5C5A56" text-anchor="middle">Duolingo • Matek Hős</text>
      <rect x="60" y="410" width="340" height="70" rx="24" fill="#8E44AD" />
      <text x="230" y="458" font-family="system-ui, sans-serif" font-size="28" font-weight="700" fill="#FFFFFF" text-anchor="middle">Megnyitás (Engedélyezve)</text>
    </g>

    <!-- Tile 4: Kamera -->
    <g transform="translate(500, 560)">
      <rect width="460" height="520" rx="40" fill="#FFFFFF" stroke="#B8E0D2" stroke-width="4" filter="url(#shadow)" />
      <rect width="460" height="180" rx="40" fill="#EDF8F5" />
      <circle cx="230" cy="150" r="70" fill="#16A085" />
      <text x="198" y="172" font-size="70">📸</text>
      <text x="230" y="290" font-family="system-ui, sans-serif" font-size="42" font-weight="800" fill="#0F4438" text-anchor="middle">Kamera &amp; Képek</text>
      <text x="230" y="350" font-family="system-ui, sans-serif" font-size="28" font-weight="500" fill="#5C5A56" text-anchor="middle">Fotózás a családnak</text>
      <rect x="60" y="410" width="340" height="70" rx="24" fill="#16A085" />
      <text x="230" y="458" font-family="system-ui, sans-serif" font-size="28" font-weight="700" fill="#FFFFFF" text-anchor="middle">Fotózás Indítása</text>
    </g>
  </g>

  <!-- Bottom Emergency SOS Bar -->
  <g transform="translate(60, 1640)">
    <rect width="960" height="220" rx="44" fill="#FFECEC" stroke="#E74C3C" stroke-width="4" filter="url(#shadow)" />
    <circle cx="140" cy="110" r="65" fill="#E74C3C" />
    <text x="108" y="132" font-size="65">🚨</text>
    <text x="240" y="95" font-family="system-ui, sans-serif" font-size="44" font-weight="900" fill="#C0392B">VÉSZHELYZETI SOS</text>
    <text x="240" y="150" font-family="system-ui, sans-serif" font-size="28" font-weight="600" fill="#7F1D1D">Tartsd nyomva 3 mp-ig: Élő GPS riasztás szülőknek</text>
  </g>

  <!-- Kiosk Security Status Bar -->
  <g transform="translate(60, 1940)">
    <rect width="960" height="120" rx="32" fill="#FFFFFF" stroke="#C5A880" stroke-width="2" filter="url(#shadow)" />
    <text x="480" y="72" font-family="system-ui, sans-serif" font-size="26" font-weight="700" fill="#5C5A56" text-anchor="middle">
      🔒 JUNEAR ZÁRT KIOSZK • Google Play &amp; Rendszerbeállítások Védve
    </text>
  </g>
</svg>
`;

// Screen 2: Élő GPS & Biztonsági Zónák
const svg2 = `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E9F3EE" />
      <stop offset="100%" stop-color="#DFECE5" />
    </linearGradient>
    <filter id="shadow2" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="8" stdDeviation="14" flood-color="#112233" flood-opacity="0.1" />
    </filter>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#mapGrad)" />

  <!-- Status Bar -->
  <g fill="#2C2C2C" font-family="system-ui, sans-serif" font-size="36" font-weight="600">
    <text x="60" y="90">14:32</text>
    <text x="860" y="90">GPS 94%</text>
  </g>

  <!-- Top Title Bar -->
  <g transform="translate(60, 160)">
    <rect width="960" height="150" rx="36" fill="#FFFFFF" filter="url(#shadow2)" />
    <text x="50" y="75" font-family="system-ui, sans-serif" font-size="44" font-weight="800" fill="#1B3B36">Élő Helyzet &amp; Zónák</text>
    <text x="50" y="120" font-family="system-ui, sans-serif" font-size="26" font-weight="600" fill="#2EAA68">● Tomi online • Pontosság: 3 méter</text>
    <rect x="730" y="40" width="190" height="70" rx="22" fill="#E8F7F3" />
    <text x="825" y="84" font-family="system-ui, sans-serif" font-size="24" font-weight="700" fill="#1B8B70" text-anchor="middle">Frissítve: most</text>
  </g>

  <!-- Vector Map Canvas -->
  <g transform="translate(60, 360)">
    <rect width="960" height="1200" rx="44" fill="#D5E5DC" stroke="#B8D5C7" stroke-width="4" filter="url(#shadow2)" />

    <!-- River / Water -->
    <path d="M0,750 Q240,650 480,720 T960,680 L960,820 Q720,860 480,820 T0,880 Z" fill="#A8D5E5" opacity="0.7" />

    <!-- Roads -->
    <path d="M80,0 L80,1200" stroke="#FFFFFF" stroke-width="32" />
    <path d="M880,0 L880,1200" stroke="#FFFFFF" stroke-width="32" />
    <path d="M0,450 L960,450" stroke="#FFFFFF" stroke-width="36" />
    <path d="M0,950 L960,950" stroke="#FFFFFF" stroke-width="28" />
    <path d="M320,0 L320,1200" stroke="#FFFFFF" stroke-width="24" stroke-dasharray="12 12" />

    <!-- Park Area -->
    <rect x="440" y="160" width="380" height="360" rx="36" fill="#BCE3CE" />
    <text x="630" y="350" font-family="system-ui, sans-serif" font-size="28" font-weight="700" fill="#2A6B4B" text-anchor="middle">🌳 Városi Park</text>

    <!-- Safe Geofence: School Zone -->
    <circle cx="480" cy="520" r="320" fill="#48C78E" fill-opacity="0.2" stroke="#2EAA68" stroke-width="6" stroke-dasharray="16 8" />
    
    <!-- Zone Badge -->
    <rect x="300" y="230" width="360" height="60" rx="20" fill="#2EAA68" />
    <text x="480" y="270" font-family="system-ui, sans-serif" font-size="24" font-weight="800" fill="#FFFFFF" text-anchor="middle">🏫 ISKOLA BIZTONSÁGI ZÓNA</text>

    <!-- Tomi Avatar Pin -->
    <circle cx="480" cy="520" r="65" fill="#23A987" filter="url(#shadow2)" />
    <circle cx="480" cy="520" r="52" fill="#FFFFFF" />
    <text x="456" y="538" font-size="48">👦</text>
    <rect x="360" y="600" width="240" height="54" rx="18" fill="#1B3B36" />
    <text x="480" y="636" font-family="system-ui, sans-serif" font-size="24" font-weight="700" fill="#FFFFFF" text-anchor="middle">Tomi (Itt tartózkodik)</text>

    <!-- Home Marker -->
    <circle cx="180" cy="1020" r="45" fill="#C5A880" filter="url(#shadow2)" />
    <text x="160" y="1035" font-size="36">🏠</text>
    <rect x="80" y="1080" width="200" height="44" rx="14" fill="#2C2C2C" />
    <text x="180" y="1110" font-family="system-ui, sans-serif" font-size="22" font-weight="700" fill="#FAFAFA" text-anchor="middle">Otthon (650m)</text>
  </g>

  <!-- Bottom Status Details Card -->
  <g transform="translate(60, 1610)">
    <rect width="960" height="450" rx="40" fill="#FFFFFF" filter="url(#shadow2)" />
    
    <!-- State row -->
    <g transform="translate(50, 60)">
      <circle cx="35" cy="35" r="35" fill="#E8F7F3" />
      <text x="18" y="48" font-size="36">✅</text>
      <text x="100" y="32" font-family="system-ui, sans-serif" font-size="32" font-weight="800" fill="#1B3B36">Zónán belül: Iskola és környéke</text>
      <text x="100" y="72" font-family="system-ui, sans-serif" font-size="26" font-weight="500" fill="#5C5A56">Érkezett: Ma 07:45-kor • Elhagyás riasztás aktív</text>
    </g>

    <line x1="50" y1="180" x2="910" y2="180" stroke="#EBDCCB" stroke-width="2" />

    <!-- Telemetry -->
    <g transform="translate(50, 220)">
      <text x="0" y="30" font-family="system-ui, sans-serif" font-size="26" font-weight="700" fill="#8C7355">AKKUMULÁTOR</text>
      <text x="0" y="70" font-family="system-ui, sans-serif" font-size="34" font-weight="900" fill="#1B3B36">92%</text>

      <text x="320" y="30" font-family="system-ui, sans-serif" font-size="26" font-weight="700" fill="#8C7355">SEBESSÉG</text>
      <text x="320" y="70" font-family="system-ui, sans-serif" font-size="34" font-weight="900" fill="#1B3B36">0 km/h (Nyugvó)</text>

      <text x="640" y="30" font-family="system-ui, sans-serif" font-size="26" font-weight="700" fill="#8C7355">HÁLÓZAT</text>
      <text x="640" y="70" font-family="system-ui, sans-serif" font-size="34" font-weight="900" fill="#1B3B36">4G LTE Kiváló</text>
    </g>

    <!-- Buttons -->
    <g transform="translate(50, 330)">
      <rect width="410" height="80" rx="24" fill="#23A987" />
      <text x="205" y="52" font-family="system-ui, sans-serif" font-size="28" font-weight="700" fill="#FFFFFF" text-anchor="middle">🗺️ Útvonaltervezés</text>

      <rect x="450" y="0" width="410" height="80" rx="24" fill="#2C2C2C" />
      <text x="655" y="52" font-family="system-ui, sans-serif" font-size="28" font-weight="700" fill="#FFFFFF" text-anchor="middle">📞 Gyorshívás</text>
    </g>
  </g>
</svg>
`;

// Screen 3: Szülői Távfelügyelet
const svg3 = `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF8F5" />
      <stop offset="100%" stop-color="#F0ECE4" />
    </linearGradient>
    <filter id="shadow3" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="8" stdDeviation="14" flood-color="#222222" flood-opacity="0.08" />
    </filter>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#bg3)" />

  <!-- Status Bar -->
  <g fill="#2C2C2C" font-family="system-ui, sans-serif" font-size="36" font-weight="600">
    <text x="60" y="90">14:32</text>
    <text x="820" y="90">Konzol ●</text>
  </g>

  <!-- Dashboard Header -->
  <g transform="translate(60, 160)">
    <rect width="960" height="180" rx="36" fill="#FFFFFF" filter="url(#shadow3)" />
    <text x="50" y="75" font-family="system-ui, sans-serif" font-size="42" font-weight="900" fill="#2C2C2C">JUNEAR Szülői Konzol</text>
    <text x="50" y="125" font-family="system-ui, sans-serif" font-size="28" font-weight="600" fill="#8C7355">Felügyelt eszköz: Tomi telefonja (Samsung Galaxy)</text>
    <circle cx="880" cy="90" r="40" fill="#E8F7F3" />
    <text x="860" y="105" font-size="42">📱</text>
  </g>

  <!-- Metric Overview Cards -->
  <g transform="translate(60, 390)">
    <!-- Battery Status -->
    <rect width="460" height="240" rx="32" fill="#FFFFFF" filter="url(#shadow3)" />
    <text x="50" y="70" font-family="system-ui, sans-serif" font-size="26" font-weight="700" fill="#8C7355">AKKUMULÁTOR SZINT</text>
    <text x="50" y="150" font-family="system-ui, sans-serif" font-size="64" font-weight="900" fill="#23A987">92%</text>
    <text x="50" y="195" font-family="system-ui, sans-serif" font-size="24" font-weight="600" fill="#5C5A56">Becsült üzemidő: 18 óra</text>

    <!-- Volume Lock -->
    <g transform="translate(500, 0)">
      <rect width="460" height="240" rx="32" fill="#FFFFFF" filter="url(#shadow3)" />
      <text x="50" y="70" font-family="system-ui, sans-serif" font-size="26" font-weight="700" fill="#8C7355">HANGERŐ KORLÁTOZÁS</text>
      <text x="50" y="150" font-family="system-ui, sans-serif" font-size="64" font-weight="900" fill="#2C2C2C">85%</text>
      <text x="50" y="195" font-family="system-ui, sans-serif" font-size="24" font-weight="600" fill="#2EAA68">🔒 Némítás kikapcsolva</text>
    </g>
  </g>

  <!-- Remote Control Settings List -->
  <g transform="translate(60, 680)">
    <rect width="960" height="950" rx="38" fill="#FFFFFF" filter="url(#shadow3)" />
    
    <text x="50" y="75" font-family="system-ui, sans-serif" font-size="36" font-weight="800" fill="#2C2C2C">Távfelügyeleti Beállítások</text>

    <!-- Row 1: Kioszk Rendszerzár -->
    <g transform="translate(50, 130)">
      <circle cx="40" cy="40" r="35" fill="#E8F7F3" />
      <text x="24" y="54" font-size="34">🔒</text>
      <text x="100" y="40" font-family="system-ui, sans-serif" font-size="30" font-weight="800" fill="#2C2C2C">Kioszk Zár Szigorúsága</text>
      <text x="100" y="78" font-family="system-ui, sans-serif" font-size="24" font-weight="500" fill="#5C5A56">Nem telepíthet, nem törölhet alkalmazást</text>
      <rect x="740" y="15" width="120" height="60" rx="30" fill="#23A987" />
      <circle cx="830" cy="45" r="24" fill="#FFFFFF" />
    </g>

    <line x1="50" y1="255" x2="910" y2="255" stroke="#F0ECE4" stroke-width="2" />

    <!-- Row 2: Ismeretlen Hívók Tiltása -->
    <g transform="translate(50, 290)">
      <circle cx="40" cy="40" r="35" fill="#FFF5E6" />
      <text x="24" y="54" font-size="34">🛡️</text>
      <text x="100" y="40" font-family="system-ui, sans-serif" font-size="30" font-weight="800" fill="#2C2C2C">Csak Fehérlistás Hívások</text>
      <text x="100" y="78" font-family="system-ui, sans-serif" font-size="24" font-weight="500" fill="#5C5A56">Ismeretlen és spam számok azonnali elutasítása</text>
      <rect x="740" y="15" width="120" height="60" rx="30" fill="#23A987" />
      <circle cx="830" cy="45" r="24" fill="#FFFFFF" />
    </g>

    <line x1="50" y1="415" x2="910" y2="415" stroke="#F0ECE4" stroke-width="2" />

    <!-- Row 3: Napi Képernyőidő Korlát -->
    <g transform="translate(50, 450)">
      <circle cx="40" cy="40" r="35" fill="#F3EEFF" />
      <text x="24" y="54" font-size="34">⏳</text>
      <text x="100" y="40" font-family="system-ui, sans-serif" font-size="30" font-weight="800" fill="#2C2C2C">Képernyőidő Korlát (2h max)</text>
      <text x="100" y="78" font-family="system-ui, sans-serif" font-size="24" font-weight="500" fill="#5C5A56">Mai használat: 1 óra 25 perc • maradt: 35 perc</text>
      <rect x="740" y="15" width="120" height="60" rx="30" fill="#23A987" />
      <circle cx="830" cy="45" r="24" fill="#FFFFFF" />
    </g>

    <line x1="50" y1="575" x2="910" y2="575" stroke="#F0ECE4" stroke-width="2" />

    <!-- Row 4: Élő GPS Háttérkövetés -->
    <g transform="translate(50, 610)">
      <circle cx="40" cy="40" r="35" fill="#E8F7F3" />
      <text x="24" y="54" font-size="34">📍</text>
      <text x="100" y="40" font-family="system-ui, sans-serif" font-size="30" font-weight="800" fill="#2C2C2C">Folyamatos Helyzetküldés</text>
      <text x="100" y="78" font-family="system-ui, sans-serif" font-size="24" font-weight="500" fill="#5C5A56">5 percenkénti GPS koordináta szinkronizálás</text>
      <rect x="740" y="15" width="120" height="60" rx="30" fill="#23A987" />
      <circle cx="830" cy="45" r="24" fill="#FFFFFF" />
    </g>

    <line x1="50" y1="735" x2="910" y2="735" stroke="#F0ECE4" stroke-width="2" />

    <!-- Row 5: Éjszakai Alvás Zár -->
    <g transform="translate(50, 770)">
      <circle cx="40" cy="40" r="35" fill="#EBF2F7" />
      <text x="24" y="54" font-size="34">🌙</text>
      <text x="100" y="40" font-family="system-ui, sans-serif" font-size="30" font-weight="800" fill="#2C2C2C">Éjszakai Nyugalmi Mód</text>
      <text x="100" y="78" font-family="system-ui, sans-serif" font-size="24" font-weight="500" fill="#5C5A56">21:00 és 07:00 között kizárólag szülő hívható</text>
      <rect x="740" y="15" width="120" height="60" rx="30" fill="#23A987" />
      <circle cx="830" cy="45" r="24" fill="#FFFFFF" />
    </g>
  </g>

  <!-- Remote Actions Bar -->
  <g transform="translate(60, 1680)">
    <rect width="960" height="200" rx="36" fill="#2C2C2C" filter="url(#shadow3)" />
    <text x="50" y="75" font-family="system-ui, sans-serif" font-size="32" font-weight="800" fill="#FAFAFA">Azonnali Távvezérlés</text>
    <text x="50" y="120" font-family="system-ui, sans-serif" font-size="24" font-weight="500" fill="#A8A49C">Megcsörgetés maximális hangerővel, ha nem találja a telefont</text>
    <rect x="680" y="50" width="230" height="80" rx="24" fill="#C5A880" />
    <text x="795" y="102" font-family="system-ui, sans-serif" font-size="28" font-weight="800" fill="#FFFFFF" text-anchor="middle">🔔 Csengetés</text>
  </g>
</svg>
`;

// Screen 4: Biztonságos Családi Hívó
const svg4 = `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F4F9F8" />
      <stop offset="100%" stop-color="#E9F4F1" />
    </linearGradient>
    <filter id="shadow4" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="8" stdDeviation="14" flood-color="#1B3B36" flood-opacity="0.08" />
    </filter>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#bg4)" />

  <!-- Status Bar -->
  <g fill="#2C2C2C" font-family="system-ui, sans-serif" font-size="36" font-weight="600">
    <text x="60" y="90">14:32</text>
    <text x="860" y="90">4G ●</text>
  </g>

  <!-- Header -->
  <g transform="translate(60, 160)">
    <rect width="960" height="170" rx="36" fill="#FFFFFF" filter="url(#shadow4)" />
    <text x="50" y="75" font-family="system-ui, sans-serif" font-size="44" font-weight="900" fill="#1B3B36">Családi Telefonkönyv</text>
    <text x="50" y="122" font-family="system-ui, sans-serif" font-size="26" font-weight="600" fill="#23A987">✓ Csak szülők által jóváhagyott kontaktok</text>
    <circle cx="880" cy="85" r="40" fill="#E8F7F3" />
    <text x="860" y="100" font-size="40">👨‍👩‍👧</text>
  </g>

  <!-- 4 Big Contact Cards -->
  <g transform="translate(60, 370)">
    <!-- Contact 1: Anya -->
    <g transform="translate(0, 0)">
      <rect width="960" height="240" rx="36" fill="#FFFFFF" stroke="#87D2C0" stroke-width="4" filter="url(#shadow4)" />
      <circle cx="120" cy="120" r="70" fill="#FDE8E8" />
      <text x="95" y="135" font-size="65">👩</text>
      <text x="230" y="95" font-family="system-ui, sans-serif" font-size="42" font-weight="900" fill="#1B3B36">Anya (Kovács Anna)</text>
      <text x="230" y="145" font-family="system-ui, sans-serif" font-size="28" font-weight="600" fill="#5C5A56">+36 30 123 4567 • Elsődleges Gondviselő</text>
      <rect x="700" y="65" width="210" height="110" rx="30" fill="#23A987" />
      <text x="805" y="133" font-family="system-ui, sans-serif" font-size="34" font-weight="800" fill="#FFFFFF" text-anchor="middle">📞 HÍVÁS</text>
    </g>

    <!-- Contact 2: Apa -->
    <g transform="translate(0, 280)">
      <rect width="960" height="240" rx="36" fill="#FFFFFF" stroke="#87D2C0" stroke-width="4" filter="url(#shadow4)" />
      <circle cx="120" cy="120" r="70" fill="#E8F2FA" />
      <text x="95" y="135" font-size="65">👨</text>
      <text x="230" y="95" font-family="system-ui, sans-serif" font-size="42" font-weight="900" fill="#1B3B36">Apa (Kovács Péter)</text>
      <text x="230" y="145" font-family="system-ui, sans-serif" font-size="28" font-weight="600" fill="#5C5A56">+36 20 987 6543 • Gondviselő</text>
      <rect x="700" y="65" width="210" height="110" rx="30" fill="#23A987" />
      <text x="805" y="133" font-family="system-ui, sans-serif" font-size="34" font-weight="800" fill="#FFFFFF" text-anchor="middle">📞 HÍVÁS</text>
    </g>

    <!-- Contact 3: Nagymama -->
    <g transform="translate(0, 560)">
      <rect width="960" height="240" rx="36" fill="#FFFFFF" stroke="#C5A880" stroke-width="3" filter="url(#shadow4)" />
      <circle cx="120" cy="120" r="70" fill="#FFF5E6" />
      <text x="95" y="135" font-size="65">👵</text>
      <text x="230" y="95" font-family="system-ui, sans-serif" font-size="42" font-weight="900" fill="#1B3B36">Nagyi (Kati néni)</text>
      <text x="230" y="145" font-family="system-ui, sans-serif" font-size="28" font-weight="600" fill="#5C5A56">+36 70 555 1234 • Otthon</text>
      <rect x="700" y="65" width="210" height="110" rx="30" fill="#23A987" />
      <text x="805" y="133" font-family="system-ui, sans-serif" font-size="34" font-weight="800" fill="#FFFFFF" text-anchor="middle">📞 HÍVÁS</text>
    </g>

    <!-- Contact 4: Nagypapa -->
    <g transform="translate(0, 840)">
      <rect width="960" height="240" rx="36" fill="#FFFFFF" stroke="#C5A880" stroke-width="3" filter="url(#shadow4)" />
      <circle cx="120" cy="120" r="70" fill="#F3EEFF" />
      <text x="95" y="135" font-size="65">👴</text>
      <text x="230" y="95" font-family="system-ui, sans-serif" font-size="42" font-weight="900" fill="#1B3B36">Nagypapa (Józsi bácsi)</text>
      <text x="230" y="145" font-family="system-ui, sans-serif" font-size="28" font-weight="600" fill="#5C5A56">+36 30 444 8899 • Mobil</text>
      <rect x="700" y="65" width="210" height="110" rx="30" fill="#23A987" />
      <text x="805" y="133" font-family="system-ui, sans-serif" font-size="34" font-weight="800" fill="#FFFFFF" text-anchor="middle">📞 HÍVÁS</text>
    </g>
  </g>

  <!-- Security Whitelist Banner -->
  <g transform="translate(60, 1530)">
    <rect width="960" height="260" rx="36" fill="#FFFFFF" stroke="#23A987" stroke-width="3" filter="url(#shadow4)" />
    <circle cx="120" cy="130" r="55" fill="#E8F7F3" />
    <text x="98" y="148" font-size="50">🛡️</text>
    <text x="210" y="105" font-family="system-ui, sans-serif" font-size="34" font-weight="900" fill="#1B3B36">Szigorú Fehérlista Védelem</text>
    <text x="210" y="155" font-family="system-ui, sans-serif" font-size="26" font-weight="500" fill="#5C5A56">Ismeretlen hívók automatikusan tiltva vannak.</text>
    <text x="210" y="195" font-family="system-ui, sans-serif" font-size="24" font-weight="600" fill="#23A987">A gyermek kizárólag a fenti 4 jóváhagyott számot tárcsázhatja.</text>
  </g>

  <!-- Quick SOS -->
  <g transform="translate(60, 1840)">
    <rect width="960" height="160" rx="36" fill="#E74C3C" filter="url(#shadow4)" />
    <text x="480" y="105" font-family="system-ui, sans-serif" font-size="34" font-weight="900" fill="#FFFFFF" text-anchor="middle">🚨 VÉSZHELYZETI SOS HÍVÁS (112 &amp; Anya)</text>
  </g>
</svg>
`;

async function render() {
  const screens = [
    { name: 'junear-1', svg: svg1 },
    { name: 'junear-2', svg: svg2 },
    { name: 'junear-3', svg: svg3 },
    { name: 'junear-4', svg: svg4 },
  ];

  for (const screen of screens) {
    const pngBuffer = await sharp(Buffer.from(screen.svg))
      .png({ quality: 95 })
      .toBuffer();

    const huPath = path.join(outDir, `${screen.name}_hu.png`);
    fs.writeFileSync(huPath, pngBuffer);
    fs.writeFileSync(path.join(outDir, `${screen.name}.png`), pngBuffer);
    fs.writeFileSync(path.join(outDir, `${screen.name}_en.png`), pngBuffer);
    fs.writeFileSync(path.join(outDir, `${screen.name}_de.png`), pngBuffer);

    console.log(`Rendered ${screen.name}_hu.png (${pngBuffer.length} bytes)`);
  }
  console.log('All 4 screens successfully rendered!');
}

render().catch(err => {
  console.error(err);
  process.exit(1);
});
