/**
 * Build-time prerender entry (vite build --ssr). Renders the SENEAR landing page to
 * static HTML in default English ('en') so search engines and link previews see
 * the real content without running JavaScript. The browser bundle replaces it on load
 * using the visitor's own browser language (with English default fallback).
 */
import { renderToString } from 'react-dom/server';
import { SkipToMainLink } from './App';
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
    <LanguageProvider initialLanguage="en">
      <div className="min-h-screen bg-[#FAFAFA] text-[#2C2C2C] flex flex-col font-sans">
        <SkipToMainLink />
        <Navbar onContactClick={noop} onExploreProjects={noop} onNavigate={noop} currentRoute="senear" />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          <SenearLandingPage onNavigate={noop} />
        </main>
        <Footer onNavigate={noop} />
      </div>
    </LanguageProvider>
  );
}

/** Default English SEO / share metadata + schema.org JSON-LD for /senear. */
export function senearSeo() {
  const c = SENEAR_CONTENT.en;
  const softwareApplication = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SENEAR',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Android 8.0+',
    inLanguage: 'en',
    description: c.meta.description,
    url: SENEAR_PAGE_URL,
    image: SENEAR_OG_IMAGE,
    installUrl: PLAY_STORE_URL,
    downloadUrl: PLAY_STORE_URL,
    identifier: SENEAR_PACKAGE_ID,
    publisher: { '@type': 'Organization', name: 'gabba', url: 'https://gabba.bond' },
    offers: [
      { '@type': 'Offer', name: c.pricing.free.name, price: '0', priceCurrency: 'EUR' },
      { '@type': 'Offer', name: `${c.pricing.family.name} – ${c.pricing.monthly}`, price: '7.99', priceCurrency: 'EUR' },
      { '@type': 'Offer', name: `${c.pricing.family.name} – ${c.pricing.yearly}`, price: '59.99', priceCurrency: 'EUR' },
      { '@type': 'Offer', name: c.pricing.lifetime.name, price: '149.00', priceCurrency: 'EUR' },
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
    heroImage: '/screenshots/senear/hero-en.webp',
    jsonLd: [softwareApplication, faqPage],
  };
}
