/**
 * Build-time prerender entry (vite build --ssr). Renders the SENEAR landing page to
 * static HTML so search engines and link previews (Facebook, Messenger, Viber…) see
 * the real content without running JavaScript. The browser bundle replaces it on load.
 */
import { renderToString } from 'react-dom/server';
import { LanguageProvider } from './i18n/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SenearLandingPage } from './components/senear/SenearLandingPage';
import {
  PLAY_STORE_URL,
  SENEAR_CONTENT,
  SENEAR_OG_IMAGE,
  SENEAR_PACKAGE_ID,
  SENEAR_PAGE_URL,
} from './components/senear/senearContent';

const noop = () => {};

export function renderSenearPage(): string {
  return renderToString(
    <LanguageProvider initialLanguage="hu">
      <div className="min-h-screen bg-[#FAFAFA] text-[#2C2C2C] flex flex-col font-sans">
        <Navbar onContactClick={noop} onExploreProjects={noop} onNavigate={noop} currentRoute="senear" />
        <main className="flex-1">
          <SenearLandingPage onNavigate={noop} />
        </main>
        <Footer onNavigate={noop} />
      </div>
    </LanguageProvider>
  );
}

/** Hungarian SEO / share metadata + schema.org JSON-LD for /senear. */
export function senearSeo() {
  const c = SENEAR_CONTENT.hu;
  const softwareApplication = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SENEAR',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Android 8.0+',
    inLanguage: 'hu',
    description: c.meta.description,
    url: SENEAR_PAGE_URL,
    image: SENEAR_OG_IMAGE,
    installUrl: PLAY_STORE_URL,
    downloadUrl: PLAY_STORE_URL,
    identifier: SENEAR_PACKAGE_ID,
    publisher: { '@type': 'Organization', name: 'gabba', url: 'https://gabba.bond' },
    offers: [
      { '@type': 'Offer', name: c.pricing.free.name, price: '0', priceCurrency: 'HUF' },
      { '@type': 'Offer', name: `${c.pricing.family.name} – ${c.pricing.monthly}`, price: '2490', priceCurrency: 'HUF' },
      { '@type': 'Offer', name: `${c.pricing.family.name} – ${c.pricing.yearly}`, price: '19900', priceCurrency: 'HUF' },
      { '@type': 'Offer', name: c.pricing.lifetime.name, price: '59900', priceCurrency: 'HUF' },
    ],
  };
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
  return {
    title: c.meta.title,
    description: c.meta.description,
    url: SENEAR_PAGE_URL,
    image: SENEAR_OG_IMAGE,
    heroImage: '/screenshots/senear/hero-hu.webp',
    jsonLd: [softwareApplication, faqPage],
  };
}
