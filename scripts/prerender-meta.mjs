/**
 * Post-build prerender for the SENEAR pages.
 *
 *   npm run build  =  vite build
 *                   + vite build --ssr src/entry-server.tsx --outDir dist-ssr
 *                   + node scripts/prerender-meta.mjs   (this file)
 *
 * Output (served by Firebase Hosting with "trailingSlash": false):
 *   dist/senear/index.html        -> /senear        full SSR HTML + HU meta + OG + JSON-LD
 *   dist/senear/setup/index.html  -> /senear/setup  HU meta + OG (content rendered client-side)
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const distDir = path.resolve('dist');
const ssrDir = path.resolve('dist-ssr');
const baseHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function buildHtml({ title, description, url, image, jsonLd = [], preloadImage, bodyHtml = '' }) {
  const head = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="hu_HU" />`,
    `<meta property="og:site_name" content="gabba · SENEAR" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    preloadImage ? `<link rel="preload" as="image" href="${preloadImage}" type="image/webp" fetchpriority="high" />` : '',
    ...jsonLd.map((obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`),
  ]
    .filter(Boolean)
    .join('\n    ');

  return baseHtml
    .replace(/<html lang="[^"]*"/, '<html lang="hu"')
    .replace(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${esc(description)}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${esc(title)}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${esc(description)}" />`)
    .replace('</head>', `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
}

const ssr = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const seo = ssr.senearSeo();
const senearBody = ssr.renderSenearPage();

// Clean previous outputs (older builds wrote senear.html or index files).
fs.rmSync(path.join(distDir, 'senear'), { recursive: true, force: true });
fs.rmSync(path.join(distDir, 'senear.html'), { force: true });
fs.mkdirSync(path.join(distDir, 'senear', 'setup'), { recursive: true });

fs.writeFileSync(
  path.join(distDir, 'senear', 'index.html'),
  buildHtml({ ...seo, preloadImage: seo.heroImage, bodyHtml: senearBody }),
  'utf8'
);

fs.writeFileSync(
  path.join(distDir, 'senear', 'setup', 'index.html'),
  buildHtml({
    title: 'SENEAR beállítási útmutató – lépésről lépésre, videóval',
    description:
      'Lépésről lépésre, videóval összekötött beállítási útmutató a SENEAR idősbarát Android telefonrendszerhez: az idős szülő és a családtag telefonja.',
    url: 'https://gabba.bond/senear/setup',
    image: seo.image,
  }),
  'utf8'
);

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`Prerendered /senear (${Math.round(senearBody.length / 1024)} KB HTML) and /senear/setup`);
