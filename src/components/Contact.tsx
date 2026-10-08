import { useState } from 'react';
import { 
  Send
} from 'lucide-react';
import { BRAND_INFO } from '../data/portfolioData';
import { useLanguage } from '../i18n/LanguageContext';

export function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceCategory: 'The NEAR Ecosystem (SENEAR & JUNEAR)',
    message: '',
  });

  const handleMailtoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry: ${formData.serviceCategory} - ${formData.name || 'Client'}`);
    const body = encodeURIComponent(
`Hello gabba team,

I would like to get in touch.

Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || 'N/A'}
Service Area: ${formData.serviceCategory}

Message:
${formData.message}

Best regards,
${formData.name}`
    );

    window.location.href = `mailto:${BRAND_INFO.email}?subject=${subject}&body=${body}`;
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

          <form onSubmit={handleMailtoSubmit} className="space-y-4">
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

                {/* Service Category */}
                <div className="space-y-1.5">
                  <label htmlFor="service" className="text-xs font-bold text-[#2C2C2C]">
                    {t.contact.serviceLabel}
                  </label>
                  <select
                    id="service"
                    value={formData.serviceCategory}
                    onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD3] bg-[#FAFAFA] text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-[#C5A880]"
                  >
                    <option value="The NEAR Ecosystem (SENEAR & JUNEAR)">{t.contact.serviceOptions.near}</option>
                    <option value="SENEAR Elder Care Android Kiosk">{t.contact.serviceOptions.senear}</option>
                    <option value="JUNEAR Child Digital Protection Kiosk">{t.contact.serviceOptions.junear}</option>
                    <option value="Custom Android Device Owner / Mission-Critical Software">{t.contact.serviceOptions.custom}</option>
                  </select>
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

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#2C2C2C] hover:bg-[#1A1A1A] active:scale-98 text-sm font-semibold text-[#FAFAFA] shadow-xs transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#C5A880]" />
                  <span>{t.contact.sendEmailBtn}</span>
                </button>
              </div>
            </form>
          </div>

      </div>
    </section>
  );
}
