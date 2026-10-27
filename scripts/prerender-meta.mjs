import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const baseHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

function buildPageHtml({ title, description, url, ogImage, rootStaticHtml }) {
  let html = baseHtml
    .replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content=".*?" \/>/,
      `<meta name="description" content="${description}" />`
    )
    .replace(
      /<meta property="og:title" content=".*?" \/>/,
      `<meta property="og:title" content="${title}" />`
    )
    .replace(
      /<meta property="og:description" content=".*?" \/>/,
      `<meta property="og:description" content="${description}" />\n    <meta property="og:url" content="${url}" />\n    <meta property="og:image" content="${ogImage}" />\n    <meta name="twitter:image" content="${ogImage}" />`
    )
    .replace('<div id="root"></div>', `<div id="root">${rootStaticHtml}</div>`);
  return html;
}

const senearStaticHtml = `
<main style="max-width:960px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#2C2C2C">
  <h1>SENEAR – Biztonság az időseknek. Nyugalom a családnak.</h1>
  <p>Egyszerű, védett kezdőképernyő az idős szüleidnek, ahol csak a jóváhagyott számok csörögnek ki – te pedig távolról is látod, hogy minden rendben van.</p>
  <p><strong>Android 8.0+ készülékekre (a családtag telefonja is Android legyen)</strong> • <a href="https://play.google.com/store/apps/details?id=com.nogond.app">Letöltés a Google Playről – Ingyenes</a></p>
  <h2>Ismerős helyzet?</h2>
  <ul>
    <li>„A mamám 78 éves, és mindig felveszi a telefont az ismeretlen csalóknak.” – Megoldás: Csak az általad jóváhagyott számok hívhatják – az ismeretlen és csaló számok nem csörögnek ki.</li>
    <li>„Apukám véletlenül elállítja a telefont, lehalkítja, vagy elfelejti a gyógyszerét.” – Megoldás: Zárolt, egyszerű kezdőképernyő, automatikus kihangosított hívásfogadás és fényképes gyógyszeremlékeztető.</li>
    <li>„Másik városban élek, és napközben is látni szeretném, hogy minden rendben van-e vele.” – Megoldás: Élő akkumulátorszint, gyógyszer-visszajelzés, GPS biztonsági zóna és ingyenes Wi-Fi hívás a saját telefonodon.</li>
  </ul>
  <h2>Átlátható használat és árazás</h2>
  <ul>
    <li><strong>Csak egy egyszerű, védett telefon kell (idős szülő telefonján):</strong> 0 Ft – Örökké ingyenes és reklámmentes.</li>
    <li><strong>Családi távoli összeköttetés (családtag telefonján):</strong> 14 napig teljesen ingyen kipróbálható, utána 1 490 Ft / hó, 12 900 Ft / év (~28% kedvezmény) vagy 29 900 Ft egyszeri örökös feloldás. Az idős szülő készülékén soha nem jelenik meg fizetési ablak.</li>
  </ul>
</main>
`.trim();

const senearHtml = buildPageHtml({
  title: 'SENEAR – Biztonság az időseknek. Nyugalom a családnak. (Android 8.0+)',
  description:
    'Egyszerű, védett kezdőképernyő az idős szüleidnek, ahol csak a jóváhagyott számok csörögnek ki – te pedig távolról is látod, hogy minden rendben van. Android 8.0+ készülékekre.',
  url: 'https://gabba.bond/senear',
  ogImage: 'https://gabba.bond/screenshots/senear/senear-og.png',
  rootStaticHtml: senearStaticHtml,
});

fs.mkdirSync(path.join(distDir, 'senear', 'setup'), { recursive: true });
fs.writeFileSync(path.join(distDir, 'senear', 'index.html'), senearHtml, 'utf8');

const setupHtml = buildPageHtml({
  title: 'SENEAR Beállítási Útmutató – Lépésről lépésre videós segítség',
  description:
    'Interaktív, videóval összekötött lépésről lépésre beállítási útmutató a SENEAR idősbarát Android rendszerhez és családi vezérlőpulthoz.',
  url: 'https://gabba.bond/senear/setup',
  ogImage: 'https://gabba.bond/screenshots/senear/senear-og.png',
  rootStaticHtml: senearStaticHtml,
});
fs.writeFileSync(path.join(distDir, 'senear', 'setup', 'index.html'), setupHtml, 'utf8');
console.log('Pre-rendered dist/senear/index.html and dist/senear/setup/index.html');
