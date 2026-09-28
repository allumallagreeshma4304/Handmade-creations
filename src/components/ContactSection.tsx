import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Instagram, Check, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('Wedding & Haldi');
  const [message, setMessage] = useState<string>('');
  const [sent, setSent] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const formattedMessage =
      `*General Studio Inquiry*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Name:* ${name}\n` +
      `📱 *Contact:* ${contact || 'Not provided'}\n` +
      `🎉 *Occasion:* ${occasion}\n` +
      `💬 *Message:* ${message}\n` +
      `━━━━━━━━━━━━━━━━━━━━`;

    const encoded = encodeURIComponent(formattedMessage);
    const targetPhone = BUSINESS_INFO.whatsAppNumber.includes('X')
      ? ''
      : BUSINESS_INFO.whatsAppNumber;

    const waUrl = targetPhone
      ? `https://wa.me/${targetPhone}?text=${encoded}`
      : `https://wa.me/?text=${encoded}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#9E644E] block mb-2">
            Get in Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#2E241E] tracking-tight">
            Contact Our Studio
          </h2>
          <div className="w-16 h-0.5 bg-[#9E644E]/40 mx-auto mt-4 mb-4" />
          <p className="text-base text-[#615248] leading-relaxed">
            Have an upcoming wedding, Haldi ceremony, or customized gifting idea?
            Reach out directly—we are always happy to discuss colors and floral combinations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Studio Details with clear placeholders as requested */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-3xl bg-white border border-[#E9DFD4] shadow-2xs space-y-6">
              <h3 className="font-serif text-2xl font-semibold text-[#2D2420]">
                Studio Information
              </h3>

              <div className="space-y-5 text-sm text-[#594B43]">
                {/* Phone / WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#F5ECE3] flex items-center justify-center text-[#9E644E] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[#8A796F] font-semibold">
                      Phone & WhatsApp
                    </span>
                    <span className="font-medium text-[#2D2420] text-sm sm:text-base">
                      {BUSINESS_INFO.phonePlaceholder}
                    </span>
                    <p className="text-[11px] text-[#8C7D73] mt-0.5">
                      (Fastest response via WhatsApp)
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#F5ECE3] flex items-center justify-center text-[#9E644E] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[#8A796F] font-semibold">
                      Email Inquiries
                    </span>
                    <span className="font-medium text-[#2D2420]">
                      {BUSINESS_INFO.emailPlaceholder}
                    </span>
                  </div>
                </div>

                {/* Studio Location Placeholder */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#F5ECE3] flex items-center justify-center text-[#9E644E] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[#8A796F] font-semibold">
                      Studio Workshop
                    </span>
                    <span className="font-medium text-[#2D2420]">
                      {BUSINESS_INFO.addressPlaceholder}
                    </span>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#F5ECE3] flex items-center justify-center text-[#9E644E] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[#8A796F] font-semibold">
                      Studio Hours
                    </span>
                    <span className="font-medium text-[#2D2420]">
                      {BUSINESS_INFO.workingHours}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Media Link Placeholders */}
              <div className="pt-4 border-t border-[#F2ECE4]">
                <span className="block text-xs uppercase tracking-wider text-[#8A796F] font-semibold mb-2">
                  Social Channels
                </span>
                <div className="text-xs text-[#635349] space-y-1">
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-[#9E644E]" />
                    <span className="font-mono text-[11px]">{BUSINESS_INFO.instagramPlaceholder}</span>
                  </div>
                  <div className="text-[11px] text-[#8C7D73] pl-6">
                    {BUSINESS_INFO.facebookPlaceholder}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Message / Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl bg-white border border-[#E9DFD4] shadow-2xs">
              <h3 className="font-serif text-2xl font-semibold text-[#2D2420] mb-2">
                Send a Quick Message
              </h3>
              <p className="text-xs sm:text-sm text-[#6C5E55] mb-6">
                Fill this out to start a conversation on WhatsApp or discuss bulk order pricing.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3D312A] uppercase mb-1">
                      Your Name <span className="text-[#9E644E]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ananya"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DFD4C7] text-sm text-[#2D231E] focus:outline-hidden focus:ring-2 focus:ring-[#9E644E]/30 focus:border-[#9E644E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3D312A] uppercase mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DFD4C7] text-sm text-[#2D231E] focus:outline-hidden focus:ring-2 focus:ring-[#9E644E]/30 focus:border-[#9E644E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D312A] uppercase mb-1">
                    Occasion or Topic
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DFD4C7] text-sm text-[#2D231E] focus:outline-hidden focus:ring-2 focus:ring-[#9E644E]/30 focus:border-[#9E644E]"
                  >
                    <option value="Wedding & Haldi Decor/Favors">Wedding & Haldi Decor / Favors</option>
                    <option value="Birthday Gift Bouquet">Birthday Gift Bouquet</option>
                    <option value="Custom Embroidery Hoop">Custom Embroidery Hoop</option>
                    <option value="Gift Hamper Inquiry">Gift Hamper Inquiry</option>
                    <option value="Bulk Order Inquiry">Bulk Order Inquiry</option>
                    <option value="Other Question">Other Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D312A] uppercase mb-1">
                    Your Message <span className="text-[#9E644E]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you have in mind, your preferred flower varieties, date, or questions..."
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DFD4C7] text-sm text-[#2D231E] focus:outline-hidden focus:ring-2 focus:ring-[#9E644E]/30 focus:border-[#9E644E] resize-y"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-[#7F7065]">
                    Responses usually within 1–2 hours during studio hours.
                  </span>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20BE5A] text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>

                {sent && (
                  <p className="text-xs text-emerald-800 font-medium flex items-center gap-1.5 pt-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Inquiry prepared! WhatsApp opened in a new tab.</span>
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
