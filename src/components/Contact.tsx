import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { BRAND_INFO } from '../data/portfolioData';
import { useLanguage } from '../i18n/LanguageContext';

export function Contact() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceCategory: '',
    message: '',
  });
  const [gdprConsent, setGdprConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const subjectPlaceholder =
    language === 'hu'
      ? 'pl. SENEAR alkalmazás, együttműködés, kérdés'
      : language === 'de'
      ? 'z.B. SENEAR App, Partnerschaft, Frage'
      : 'e.g., SENEAR app, partnership, question';

  const sendingLabel =
    language === 'hu'
      ? 'Küldés folyamatban...'
      : language === 'de'
      ? 'Wird gesendet...'
      : 'Sending...';

  const successMessage =
    language === 'hu'
      ? `Köszönjük! Üzenetedet automatikusan elküldtük a ${BRAND_INFO.email} e-mail címre.`
      : language === 'de'
      ? `Vielen Dank! Ihre Nachricht wurde automatisch an ${BRAND_INFO.email} gesendet.`
      : `Thank you! Your message has been automatically sent to ${BRAND_INFO.email}.`;

  const errorMessage =
    language === 'hu'
      ? `Hiba történt a küldés során. Kérjük, próbáld újra, vagy írj közvetlenül a ${BRAND_INFO.email} címre.`
      : language === 'de'
      ? `Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder schreiben Sie direkt an ${BRAND_INFO.email}.`
      : `An error occurred while sending. Please try again or write directly to ${BRAND_INFO.email}.`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending' || !gdprConsent) return;

    setStatus('sending');
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${BRAND_INFO.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _replyto: formData.email,
          company: formData.company || '-',
          subject_of_interest: formData.serviceCategory || '-',
          message: formData.message,
          _subject: `gabba.bond megkeresés: ${formData.serviceCategory || 'Üzenet'} - ${formData.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json().catch(() => null);
      if (response.ok && (data?.success === 'true' || data?.success === true || response.status === 200)) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          serviceCategory: '',
          message: '',
        });
        setGdprConsent(false);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#F5F0EB]/60 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 space-y-4">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2C2C] tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-base sm:text-lg text-[#5C5A56] leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Project Inquiry Composer */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#C5A880]/40 p-6 sm:p-8 lg:p-10 shadow-xs">
          <div className="mb-6">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#2C2C2C]">
              {t.contact.formTitle}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-bold text-[#2C2C2C]">
                  {t.contact.nameLabel}
                </label>
                <input
                  id="name"
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.contact.namePlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD3] bg-[#FAFAFA] text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-[#C5A880]"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-bold text-[#2C2C2C]">
                  {t.contact.emailInputLabel}
                </label>
                <input
                  id="email"
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t.contact.emailPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD3] bg-[#FAFAFA] text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-[#C5A880]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Company / Org */}
              <div className="space-y-1.5">
                <label htmlFor="company" className="text-xs font-bold text-[#2C2C2C]">
                  {t.contact.companyLabel}
                </label>
                <input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder={t.contact.companyPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD3] bg-[#FAFAFA] text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-[#C5A880]"
                />
              </div>

              {/* Free-text Subject / Area of Interest */}
              <div className="space-y-1.5">
                <label htmlFor="service" className="text-xs font-bold text-[#2C2C2C]">
                  {t.contact.serviceLabel}
                </label>
                <input
                  id="service"
                  type="text"
                  value={formData.serviceCategory}
                  onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                  placeholder={subjectPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD3] bg-[#FAFAFA] text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-[#C5A880]"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-bold text-[#2C2C2C]">
                {t.contact.messageLabel}
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t.contact.messagePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD3] bg-[#FAFAFA] text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-[#C5A880] resize-y"
              />
            </div>

            {/* GDPR Consent Checkbox */}
            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAFAFA] border border-[#E8DFD3] cursor-pointer select-none">
              <input
                type="checkbox"
                required
                checked={gdprConsent}
                onChange={(e) => setGdprConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-[#C5A880] text-[#2C2C2C] focus:ring-[#C5A880] shrink-0"
              />
              <span className="text-xs text-[#5C5A56] leading-relaxed">
                {language === 'hu' ? (
                  <>
                    Elolvastam és elfogadom az{' '}
                    <a
                      href="/privacy"
                      className="font-semibold text-[#2C2C2C] underline hover:text-[#967344]"
                    >
                      Adatvédelmi Tájékoztatót
                    </a>
                    , és hozzájárulok a megadott adataim kapcsolatfelvételi célú kezeléséhez (GDPR 6. cikk (1) a)).
                  </>
                ) : language === 'de' ? (
                  <>
                    Ich habe die{' '}
                    <a
                      href="/privacy"
                      className="font-semibold text-[#2C2C2C] underline hover:text-[#967344]"
                    >
                      Datenschutzerklärung
                    </a>{' '}
                    gelesen und stimme der Verarbeitung meiner Angaben zur Kontaktaufnahme gemäß Art. 6 Abs. 1 lit. a DSGVO zu.
                  </>
                ) : (
                  <>
                    I have read and accept the{' '}
                    <a
                      href="/privacy"
                      className="font-semibold text-[#2C2C2C] underline hover:text-[#967344]"
                    >
                      Privacy Policy
                    </a>{' '}
                    and consent to the processing of my details for the purpose of responding to my inquiry (GDPR Art. 6(1)(a)).
                  </>
                )}
              </span>
            </label>

            {/* Status Feedback Banner */}
            {status === 'success' && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm font-medium flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-900 text-sm font-medium flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'sending' || !gdprConsent}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#2C2C2C] hover:bg-[#1A1A1A] disabled:opacity-60 active:scale-98 text-sm font-semibold text-[#FAFAFA] shadow-xs transition-all cursor-pointer"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-4 h-4 text-[#C5A880] animate-spin" />
                    <span>{sendingLabel}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#C5A880]" />
                    <span>{t.contact.sendEmailBtn}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
