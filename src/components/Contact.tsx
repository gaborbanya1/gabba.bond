import { useState } from 'react';
import { 
  Mail, 
  Copy, 
  Check, 
  ExternalLink, 
  Linkedin, 
  Github, 
  Send, 
  Clock, 
  MapPin, 
  ShieldCheck
} from 'lucide-react';
import { BRAND_INFO } from '../data/portfolioData';
import { InquiryFormData } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

export function Contact() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    company: '',
    serviceCategory: 'The NEAR Ecosystem (SENEAR & JUNEAR)',
    timeline: '1-3 months',
    message: '',
  });
  const [inquiryCopied, setInquiryCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(BRAND_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyInquiry = () => {
    const briefText = `PROJECT INQUIRY FOR GABBA:
--------------------------------------
Sender: ${formData.name || 'Not provided'} (${formData.email || 'Not provided'})
Company/Org: ${formData.company || 'Not provided'}
Service Focus: ${formData.serviceCategory}
Target Timeline: ${formData.timeline}

Project Scope & Requirements:
${formData.message || 'No description entered yet.'}
--------------------------------------
Sent via gabba`;

    navigator.clipboard.writeText(briefText);
    setInquiryCopied(true);
    setTimeout(() => setInquiryCopied(false), 2500);
  };

  const handleMailtoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry: ${formData.serviceCategory} - ${formData.name || 'Client'}`);
    const body = encodeURIComponent(
`Hello gabba team,

I would like to discuss a project.

Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || 'N/A'}
Service Area: ${formData.serviceCategory}
Estimated Timeline: ${formData.timeline}

Project Details:
${formData.message}

Looking forward to your reply.

Best regards,
${formData.name}`
    );

    window.location.href = `mailto:${BRAND_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#F5F0EB]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2C2C] tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-base sm:text-lg text-[#5C5A56] leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact & Credibility Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Email Card */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#C5A880]/40 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F5F0EB] border border-[#C5A880]/50 flex items-center justify-center text-[#A38053]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-[#2C2C2C]">{t.contact.directContact}</h3>
                  <p className="text-xs text-[#6E6B65]">banyai.gabor.danken@gmail.com</p>
                </div>
              </div>

              {/* Email Address Display */}
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] space-y-3">
                <span className="text-xs font-semibold text-[#8C7355] uppercase tracking-wider block">
                  {t.contact.emailLabel}
                </span>
                <p className="font-mono text-xs sm:text-sm font-bold text-[#2C2C2C] break-all">
                  {BRAND_INFO.email}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFFFFF] hover:bg-[#F5F0EB] border border-[#C5A880]/50 text-xs font-semibold text-[#2C2C2C] transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">{t.contact.copiedEmail}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#A38053]" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${BRAND_INFO.email}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2C2C2C] hover:bg-[#1A1A1A] text-xs font-semibold text-[#FAFAFA] transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Open in Mail</span>
                  </a>
                </div>
              </div>

              {/* Location & Time Zone */}
              <div className="space-y-3 pt-2 border-t border-[#F0EAE1]">
                <div className="flex items-center gap-3 text-xs text-[#5C5A56]">
                  <MapPin className="w-4 h-4 text-[#A38053] shrink-0" />
                  <span>{t.contact.locationValue}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#5C5A56]">
                  <Clock className="w-4 h-4 text-[#A38053] shrink-0" />
                  <span>{t.contact.availabilityValue}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#5C5A56]">
                  <ShieldCheck className="w-4 h-4 text-[#A38053] shrink-0" />
                  <span>Mutual Non-Disclosure Agreement (NDA) supported</span>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-4 border-t border-[#F0EAE1] space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2C2C2C] block">
                  Professional Profiles & Code
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={BRAND_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] hover:border-[#C5A880] flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-[#0077B5]" />
                      <span className="text-xs font-bold text-[#2C2C2C]">LinkedIn</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#6E6B65] group-hover:text-[#2C2C2C]" />
                  </a>

                  <a
                    href={BRAND_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] hover:border-[#C5A880] flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-[#2C2C2C]" />
                      <span className="text-xs font-bold text-[#2C2C2C]">GitHub</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#6E6B65] group-hover:text-[#2C2C2C]" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Project Inquiry Composer */}
          <div className="lg:col-span-7 bg-[#FFFFFF] rounded-2xl border border-[#C5A880]/40 p-6 sm:p-8 lg:p-10 shadow-xs">
            <div className="mb-6 space-y-1">
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#2C2C2C]">
                {t.contact.formTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5A56]">
                {t.contact.subtitle}
              </p>
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

              {/* Timeline */}
              <div className="space-y-1.5">
                <label htmlFor="timeline" className="text-xs font-bold text-[#2C2C2C]">
                  {t.contact.timelineLabel}
                </label>
                <select
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD3] bg-[#FAFAFA] text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-[#C5A880]"
                >
                  <option value="Immediate (< 1 month)">{t.contact.timelineOptions.immediate}</option>
                  <option value="1-3 months">{t.contact.timelineOptions.month13}</option>
                  <option value="3-6 months">{t.contact.timelineOptions.month36}</option>
                  <option value="Exploratory / Consultation">{t.contact.timelineOptions.exploratory}</option>
                </select>
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

              {/* Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2C2C2C] hover:bg-[#1A1A1A] active:scale-98 text-sm font-semibold text-[#FAFAFA] shadow-xs transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#C5A880]" />
                  <span>{t.contact.sendEmailBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyInquiry}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FFFFFF] hover:bg-[#F5F0EB] active:scale-98 border border-[#C5A880]/50 text-sm font-semibold text-[#2C2C2C] transition-colors cursor-pointer"
                >
                  {inquiryCopied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">{t.contact.briefCopied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#A38053]" />
                      <span>{t.contact.copyBriefBtn}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
