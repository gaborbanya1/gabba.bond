import { AppRoute } from '../routing';
import { SenearLegalPage } from './legal/SenearLegalPage';

export interface PrivacyPolicyPageProps {
  onBackToHome?: () => void;
  onBackToSenear?: () => void;
  focusDeletion?: boolean;
  onNavigate?: (route: AppRoute) => void;
}

export function PrivacyPage({
  onBackToHome,
  onBackToSenear,
  focusDeletion = false,
  onNavigate,
}: PrivacyPolicyPageProps = {}) {
  const handleNavigate = (route: AppRoute) => {
    if (onNavigate) {
      onNavigate(route);
      return;
    }
    if (route === 'home' && onBackToHome) {
      onBackToHome();
      return;
    }
    if (route === 'senear' && onBackToSenear) {
      onBackToSenear();
      return;
    }
    window.location.href = route === 'home' ? '/' : `/${route}`;
  };

  return (
    <SenearLegalPage
      activeDoc="privacy"
      focusDeletion={focusDeletion}
      onNavigate={handleNavigate}
    />
  );
}

export { PrivacyPage as PrivacyPolicyPage };
export default PrivacyPage;
