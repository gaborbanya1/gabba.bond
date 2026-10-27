import { Smartphone, PhoneCall, Radio, Clock, Baby, MapPin, ShieldCheck, Users } from 'lucide-react';
import { PhonePhotoItem } from '../components/PhoneScreenshotCard';
import { TranslationData } from '../i18n/types';
import { ProductKey } from '../routing';

/** Builds the 4 localized screenshot descriptors of a product. */
export function getProductPhotos(product: ProductKey, t: TranslationData, language = 'en'): PhonePhotoItem[] {
  const p = product === 'senear' ? t.senear.photos : t.junear.photos;
  const icons =
    product === 'senear' ? [Smartphone, PhoneCall, Radio, Clock] : [Baby, MapPin, ShieldCheck, Users];
  const accents =
    product === 'senear'
      ? ['from-[#FAF7F2] to-[#F5EFE6]', 'from-[#FFF5F5] to-[#FDE8E8]', 'from-[#F5F8FA] to-[#EBF2F7]', 'from-[#FAF9F5] to-[#F5F2E9]']
      : ['from-[#F4F9F8] to-[#E6F3F1]', 'from-[#FAF8F5] to-[#F3EFEA]', 'from-[#F6F5FA] to-[#EAE9F5]', 'from-[#FAF7F2] to-[#EFEAE2]'];

  let titles = [p.title1, p.title2, p.title3, p.title4];
  let subs = [p.sub1, p.sub2, p.sub3, p.sub4];
  let badges = [p.badge1, p.badge2, p.badge3, p.badge4];

  if (product === 'senear') {
    if (language === 'hu') {
      titles = ['Zárolt, egyszerű kezdőképernyő', 'PIN-kóddal védett beállítások', 'Családi vezérlőpult', 'Azonnali értesítések'];
      subs = [
        '4 nagy fényképes hívógomb és jól látható SOS segélyhívó gomb',
        'Az idős szülő nem tudja véletlenül elállítani a telefont',
        'Távoli akkumulátor-, hangerő- és névjegykezelés a családtag telefonjáról',
        'Jelzés alacsony töltöttség, ki-/bekapcsolás vagy gyógyszerbevétel esetén',
      ];
      badges = ['Idős szülő telefonja', 'Védelem', 'Családtag telefonja', 'Értesítések'];
    } else if (language === 'de') {
      titles = ['Einfacher, gesperrter Startbildschirm', 'PIN-geschützte Einstellungen', 'Familien-Dashboard', 'Sofortige Benachrichtigungen'];
      subs = [
        '4 große Foto-Anruftasten und gut sichtbare SOS-Notruftaste',
        'Ihre Eltern können das Telefon nicht versehentlich verstellen',
        'Akku, Lautstärke & Kontakte aus der Ferne vom eigenen Handy verwalten',
        'Meldung bei schwachem Akku, Ein-/Ausschalten oder Medikamenteneinnahme',
      ];
      badges = ['Telefon der Eltern', 'Schutz', 'Telefon der Familie', 'Meldungen'];
    } else {
      titles = ['Locked, simple home screen', 'PIN-protected settings', 'Family remote dashboard', 'Instant family alerts'];
      subs = [
        '4 large photo speed-dial buttons and a clear red SOS emergency button',
        'Your parent cannot accidentally change settings or mute the phone',
        'Manage battery, ringer volume & contacts remotely from your own phone',
        'Notifications for low battery, power on/off, or medication confirmation',
      ];
      badges = ["Parent's Phone", 'Protection', "Family Member's Phone", 'Alerts'];
    }
  }

  return [0, 1, 2, 3].map((i) => ({
    id: i + 1,
    baseName: `${product}-${i + 1}`,
    folder: `public/screenshots/${product}/`,
    webFolder: `/screenshots/${product}/`,
    title: titles[i],
    subtitle: subs[i],
    badge: badges[i],
    accentColor: accents[i],
    icon: icons[i],
    theme: product,
  }));
}

/** Ordered list of candidate image URLs (language specific first, then fallbacks). */
export function getScreenshotSources(product: ProductKey, baseName: string, language: string): string[] {
  const folder = `/screenshots/${product}/`;
  const lang = ['hu', 'en', 'de'].includes(language) ? language : 'en';
  return Array.from(
    new Set([
      `${folder}${baseName}_${lang}.png`,
      `${folder}${baseName}_en.png`,
      `${folder}${baseName}_hu.png`,
      `${folder}${baseName}.png`,
      `${folder}${baseName}_de.png`,
    ])
  );
}
