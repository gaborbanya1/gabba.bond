import { AppRoute, LegalDocKind } from '../../routing';
import { LegalPageLayout } from './LegalPageLayout';
import { ProductLegalBundle } from './legalCore';
import { SENEAR_OPERATIONS_DOC } from './senearOperationsContent';
import { SENEAR_DELETION_HERO, SENEAR_PRIVACY_DOC } from './senearPrivacyContent';
import { SENEAR_TERMS_DOC } from './senearTermsContent';

export const SENEAR_LEGAL_BUNDLE: ProductLegalBundle = {
  scope: {
    productId: 'senear',
    productName: 'SENEAR',
    productRoute: 'senear',
    packageOrDomain: {
      hu: 'SENEAR (NEAR Ecosystem) — Android Alkalmazás (bond.gabba.senear) és Webes Felület (gabba.bond/senear)',
      de: 'SENEAR (NEAR Ecosystem) — Android-App (bond.gabba.senear) & Webplattform (gabba.bond/senear)',
      en: 'SENEAR (NEAR Ecosystem) — Android App (bond.gabba.senear) & Web Platform (gabba.bond/senear)',
    },
    routes: {
      privacy: 'senear-privacy',
      terms: 'senear-terms',
      operations: 'senear-operations',
    },
    deleteAccountRoute: 'delete-account',
  },
  documents: {
    hu: {
      privacy: SENEAR_PRIVACY_DOC.hu,
      terms: SENEAR_TERMS_DOC.hu,
      operations: SENEAR_OPERATIONS_DOC.hu,
    },
    de: {
      privacy: SENEAR_PRIVACY_DOC.de,
      terms: SENEAR_TERMS_DOC.de,
      operations: SENEAR_OPERATIONS_DOC.de,
    },
    en: {
      privacy: SENEAR_PRIVACY_DOC.en,
      terms: SENEAR_TERMS_DOC.en,
      operations: SENEAR_OPERATIONS_DOC.en,
    },
  },
  deletionHero: SENEAR_DELETION_HERO,
};

export interface SenearLegalPageProps {
  activeDoc: LegalDocKind;
  focusDeletion?: boolean;
  onNavigate?: (route: AppRoute) => void;
}

export function SenearLegalPage({
  activeDoc,
  focusDeletion = false,
  onNavigate,
}: SenearLegalPageProps) {
  return (
    <LegalPageLayout
      bundle={SENEAR_LEGAL_BUNDLE}
      activeDoc={activeDoc}
      focusDeletion={focusDeletion}
      onNavigate={onNavigate}
    />
  );
}

export default SenearLegalPage;
