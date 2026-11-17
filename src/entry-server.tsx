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
import { JunearLandingPage } from './components/junear/JunearLandingPage';
import { JunearSetupGuidePage } from './components/JunearSetupGuidePage';
import { JunearLegalPage } from './components/legal/JunearLegalPage';
import {
  JUNEAR_DELETION_HERO_CONTENT,
  JUNEAR_DOCUMENTS_BY_TYPE,
  type JunearLegalDocType,
} from './components/legal/junearLegalContent';
import {
  JUNEAR_CONTENT,
  JUNEAR_OG_IMAGE,
  JUNEAR_PACKAGE_ID,
  JUNEAR_PAGE_URL,
} from './components/junear/junearContent';
import type { AppRoute } from './routing';

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

export function renderJunearPage(): string {
  return renderToString(
    <LanguageProvider initialLanguage="en">
      <div className="min-h-screen bg-[#FAFAFA] text-[#2C2C2C] flex flex-col font-sans">
        <SkipToMainLink />
        <Navbar onContactClick={noop} onExploreProjects={noop} onNavigate={noop} currentRoute="junear" />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          <JunearLandingPage onNavigate={noop} />
        </main>
        <div>
          <Footer onNavigate={noop} currentRoute="junear" />
        </div>
      </div>
    </LanguageProvider>
  );
}

export function renderJunearSetupPage(initialTab: 'qr' | 'usb' = 'qr'): string {
  const currentRoute: AppRoute = initialTab === 'usb' ? 'junear-usb-setup' : 'junear-setup';
  return renderToString(
    <LanguageProvider initialLanguage="en">
      <div className="min-h-screen bg-[#FAFAFA] text-[#2C2C2C] flex flex-col font-sans">
        <SkipToMainLink />
        <Navbar onContactClick={noop} onExploreProjects={noop} onNavigate={noop} currentRoute={currentRoute} />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          <JunearSetupGuidePage initialTab={initialTab} onNavigate={noop} onContactClick={noop} />
        </main>
        <div>
          <Footer onNavigate={noop} currentRoute={currentRoute} />
        </div>
      </div>
    </LanguageProvider>
  );
}

export function renderJunearLegalPage(docType: JunearLegalDocType, focusDeletion = false): string {
  const routeMap: Record<JunearLegalDocType, AppRoute> = {
    privacy: 'junear-privacy',
    terms: 'junear-terms',
    operations: 'junear-operations',
  };
  const currentRoute: AppRoute = focusDeletion ? 'junear-delete-account' : routeMap[docType];

  return renderToString(
    <LanguageProvider initialLanguage="en">
      <div className="min-h-screen bg-[#FAFAFA] text-[#2C2C2C] flex flex-col font-sans">
        <SkipToMainLink />
        <Navbar onContactClick={noop} onExploreProjects={noop} onNavigate={noop} currentRoute={currentRoute} />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          <JunearLegalPage
            docType={docType}
            focusDeletion={focusDeletion}
            initialLang="en"
            onNavigate={noop}
            onBackToHome={noop}
            onBackToJunear={noop}
          />
        </main>
        <div>
          <Footer onNavigate={noop} currentRoute={currentRoute} />
        </div>
      </div>
    </LanguageProvider>
  );
}

export function junearSeo() {
  const c = JUNEAR_CONTENT.en;
  const softwareApplication = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'JUNEAR',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Android 8.0+',
    inLanguage: 'en',
    description: c.meta.description,
    url: JUNEAR_PAGE_URL,
    image: JUNEAR_OG_IMAGE,
    identifier: JUNEAR_PACKAGE_ID,
    publisher: { '@type': 'Organization', name: 'gabba', url: 'https://gabba.bond' },
    offers: [
      { '@type': 'Offer', name: 'JUNEAR Free Trial (14 days)', price: '0', priceCurrency: 'EUR' },
      { '@type': 'Offer', name: 'JUNEAR Family – Monthly', price: '5.99', priceCurrency: 'EUR' },
      { '@type': 'Offer', name: 'JUNEAR Family – Yearly', price: '49.99', priceCurrency: 'EUR' },
      { '@type': 'Offer', name: 'JUNEAR Lifetime License', price: '129.00', priceCurrency: 'EUR' },
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
    url: JUNEAR_PAGE_URL,
    image: JUNEAR_OG_IMAGE,
    heroImage: '/screenshots/junear/junear-1_en.png',
    jsonLd: [softwareApplication, faqPage],
  };
}

export function junearSetupSeo(initialTab: 'qr' | 'usb' = 'qr') {
  if (initialTab === 'usb') {
    return {
      title: 'JUNEAR 1-Click Browser WebUSB Setup — Zero Data Loss | gabba',
      description:
        'Zero-install browser WebUSB ADB wizard (Chrome / Edge) to enroll existing Android child phones into native JUNEAR Device Owner protection without factory reset.',
      url: 'https://gabba.bond/junear/usb-setup',
      image: JUNEAR_OG_IMAGE,
    };
  }
  return {
    title: 'JUNEAR Setup Guide — 6-Tap QR, Browser WebUSB, Co-Parent PWA & Anti-Brick | gabba',
    description:
      'Step-by-step setup guide for the JUNEAR safe child phone system: 6-tap factory QR, zero-wipe WebUSB, Co-Parent & Classroom pairing, and Dual Anti-Brick unlock.',
    url: 'https://gabba.bond/junear/setup',
    image: JUNEAR_OG_IMAGE,
  };
}

export function junearLegalSeo(docType: JunearLegalDocType, focusDeletion = false) {
  if (focusDeletion) {
    const del = JUNEAR_DELETION_HERO_CONTENT.en;
    return {
      title: del.metaTitle,
      description: del.metaDescription,
      url: 'https://gabba.bond/junear/delete-account',
      image: JUNEAR_OG_IMAGE,
    };
  }
  const doc = JUNEAR_DOCUMENTS_BY_TYPE[docType].en;
  return {
    title: doc.metaTitle,
    description: doc.metaDescription,
    url: `https://gabba.bond/junear/${docType}`,
    image: JUNEAR_OG_IMAGE,
  };
}
