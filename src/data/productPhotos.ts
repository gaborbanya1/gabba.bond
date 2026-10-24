import { Smartphone, PhoneCall, Radio, Clock, Baby, MapPin, ShieldCheck, Users } from 'lucide-react';
import { PhonePhotoItem } from '../components/PhoneScreenshotCard';
import { TranslationData } from '../i18n/types';
import { ProductKey } from '../routing';

/** Builds the 4 localized screenshot descriptors of a product. */
export function getProductPhotos(product: ProductKey, t: TranslationData): PhonePhotoItem[] {
  const p = product === 'senear' ? t.senear.photos : t.junear.photos;
  const icons =
    product === 'senear' ? [Smartphone, PhoneCall, Radio, Clock] : [Baby, MapPin, ShieldCheck, Users];
  const accents =
    product === 'senear'
      ? ['from-[#FAF7F2] to-[#F5EFE6]', 'from-[#FFF5F5] to-[#FDE8E8]', 'from-[#F5F8FA] to-[#EBF2F7]', 'from-[#FAF9F5] to-[#F5F2E9]']
      : ['from-[#F4F9F8] to-[#E6F3F1]', 'from-[#FAF8F5] to-[#F3EFEA]', 'from-[#F6F5FA] to-[#EAE9F5]', 'from-[#FAF7F2] to-[#EFEAE2]'];
  const titles = [p.title1, p.title2, p.title3, p.title4];
  const subs = [p.sub1, p.sub2, p.sub3, p.sub4];
  const badges = [p.badge1, p.badge2, p.badge3, p.badge4];

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
  return Array.from(
    new Set([
      `${folder}${baseName}_${language}.png`,
      `${folder}${baseName}_hu.png`,
      `${folder}${baseName}.png`,
      `${folder}${baseName}_en.png`,
      `${folder}${baseName}_de.png`,
    ])
  );
}
