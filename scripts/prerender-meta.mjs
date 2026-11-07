/**
 * Post-build prerender for gabba.bond & SENEAR routes (default language: English 'en').
 *
 *   npm run build  =  vite build
 *                   + vite build --ssr src/entry-server.tsx --outDir dist-ssr
 *                   + node scripts/prerender-meta.mjs   (this file)
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
    `<meta property="og:locale" content="en_US" />`,
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
    .replace(/<html lang="[^"]*"/, '<html lang="en"')
    .replace(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${esc(description)}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${esc(title)}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${esc(description)}" />`)
    .replace('</head>', `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
}

function writeRouteHtml(relDir, meta) {
  const outDir = path.join(distDir, ...relDir);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), buildHtml(meta), 'utf8');
}

const ssr = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const seo = ssr.senearSeo();
const senearBody = ssr.renderSenearPage();

fs.rmSync(path.join(distDir, 'senear'), { recursive: true, force: true });
fs.rmSync(path.join(distDir, 'delete-account'), { recursive: true, force: true });
fs.rmSync(path.join(distDir, 'senear.html'), { force: true });

writeRouteHtml(['senear'], {
  ...seo,
  preloadImage: seo.heroImage,
  bodyHtml: senearBody,
});

writeRouteHtml(['senear', 'setup'], {
  title: 'SENEAR Setup Guide – Step-by-step with video',
  description:
    'Step-by-step, video-synced setup guide for the SENEAR senior-friendly Android phone system: setting up both the senior parent’s phone and the family caregiver’s phone.',
  url: 'https://gabba.bond/senear/setup',
  image: seo.image,
});

writeRouteHtml(['senear', 'privacy'], {
  title: 'GDPR Privacy Notice (Art. 13 & 14) – SENEAR · gabba',
  description:
    'Official GDPR Privacy Notice for SENEAR (bond.gabba.senear): 100% EU data residency in europe-west1, bilateral consent, zero-storage Base64 photos, and one-tap Art. 17 erasure.',
  url: 'https://gabba.bond/senear/privacy',
  image: seo.image,
});

writeRouteHtml(['senear', 'terms'], {
  title: 'Terms of Service (ÁSZF / AGB / ToS) – SENEAR · gabba',
  description:
    'Official Terms of Service (ÁSZF / AGB / ToS) for SENEAR: Forever-Free Senior Launcher, Google Play Family subscriptions, 14-day withdrawal right, and EU MDR disclaimer.',
  url: 'https://gabba.bond/senear/terms',
  image: seo.image,
});

writeRouteHtml(['senear', 'operations'], {
  title: 'Operational & Transparency Policy – SENEAR · gabba',
  description:
    'Technical and operational transparency policy for the SENEAR ecosystem: dual-role Kiosk architecture, bilateral 6-digit pairing, local CallScreeningService shield, and 0-second wipe.',
  url: 'https://gabba.bond/senear/operations',
  image: seo.image,
});

writeRouteHtml(['delete-account'], {
  title: 'Account & Personal Data Deletion (GDPR Art. 17) – SENEAR · gabba',
  description:
    'Instructions for instant one-tap in-app deletion or 72-hour email deletion of SENEAR Caregiver and Senior accounts and cloud data.',
  url: 'https://gabba.bond/delete-account',
  image: seo.image,
});

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(
  `Prerendered /senear (${Math.round(senearBody.length / 1024)} KB HTML), /senear/setup, /senear/privacy, /senear/terms, /senear/operations, and /delete-account`
);
