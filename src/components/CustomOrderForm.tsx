import React, { useState, useEffect } from 'react';
import { MessageCircle, Check, Copy, Calendar, User, Phone, Sparkles, AlertCircle, ShoppingBag } from 'lucide-react';
import { BUSINESS_INFO, PRODUCT_CATEGORIES } from '../data/businessData';

export interface OrderFormData {
  customerName: string;
  phoneNumber: string;
  productRequired: string;
  budget: string;
  preferredColor: string;
  quantity: string;
  requiredDate: string;
  customizationDetails: string;
}

interface CustomOrderFormProps {
  initialData?: Partial<OrderFormData>;
  onResetInitialData?: () => void;
}

export const CustomOrderForm: React.FC<CustomOrderFormProps> = ({
  initialData,
  onResetInitialData,
}) => {
  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    phoneNumber: '',
    productRequired: 'Pipe-cleaner flowers',
    budget: '',
    preferredColor: 'Pastel Palette (Pink, Lilac, Cream)',
    quantity: '1',
    requiredDate: '',
    customizationDetails: '',
  });

  const [copied, setCopied] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync external incoming pre-fills (from Product cards or Bouquet builder)
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Please enter your name.';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Please enter your WhatsApp/phone number.';
    }
    if (!formData.productRequired.trim()) {
      newErrors.productRequired = 'Please specify the product required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Prepare structured message
  const buildWhatsAppMessage = (): string => {
    return (
      `*New Handcrafted Order Inquiry*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Customer Name:* ${formData.customerName || 'Not specified'}\n` +
      `📱 *Phone / WhatsApp:* ${formData.phoneNumber || 'Not specified'}\n` +
      `🌸 *Product Required:* ${formData.productRequired}\n` +
      `💰 *Stated Budget:* ${formData.budget ? `₹${formData.budget}` : 'Flexible / Standard rate'}\n` +
      `🎨 *Preferred Color:* ${formData.preferredColor || 'As pictured'}\n` +
      `🔢 *Quantity:* ${formData.quantity || '1'}\n` +
      `📅 *Required By Date:* ${formData.requiredDate || 'Standard delivery (3-5 days)'}\n` +
      `📝 *Customization Details:*\n${formData.customizationDetails || 'None specified'}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `Sent via ${BUSINESS_INFO.name} Website Custom Order Form`
    );
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = buildWhatsAppMessage();
    const encoded = encodeURIComponent(message);

    // If active WhatsApp number is placeholder with 'X', open generic wa.me share link
    const targetPhone = BUSINESS_INFO.whatsAppNumber.includes('X')
      ? ''
      : BUSINESS_INFO.whatsAppNumber;

    const waUrl = targetPhone
      ? `https://wa.me/${targetPhone}?text=${encoded}`
      : `https://wa.me/?text=${encoded}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const handleCopySummary = () => {
    const message = buildWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="custom-orders" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#9E644E] block mb-2">
            Tailor-Made Creations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#2E241E] tracking-tight">
            Custom Order Form
          </h2>
          <div className="w-16 h-0.5 bg-[#9E644E]/40 mx-auto mt-4 mb-4" />
          <p className="text-base text-[#615248] leading-relaxed">
            Every piece is lovingly hand-crafted. Fill in your requirements below, and send your order
            directly via WhatsApp for immediate personal assistance.
          </p>
        </div>

        {/* Notice for incoming pre-fill if any */}
        {initialData?.productRequired && (
          <div className="mb-6 p-4 rounded-2xl bg-[#F6EDE3] border border-[#E8DACB] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-[#9E644E]" />
              <p className="text-xs sm:text-sm text-[#4A3B32]">
                Pre-filled from your selection: <strong className="font-semibold">{initialData.productRequired}</strong>
              </p>
            </div>
            {onResetInitialData && (
              <button
                type="button"
                onClick={onResetInitialData}
                className="text-xs text-[#8A796F] hover:text-[#9E644E] underline"
              >
                Clear
              </button>
            )}
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-[#E9DFD4]">
          <form onSubmit={handleSendWhatsApp} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-semibold text-[#3D312A] uppercase tracking-wider mb-2">
                  Customer Name <span className="text-[#9E644E]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="e.g. Radhika Sharma"
                    className={`w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border text-sm text-[#2D231E] focus:outline-hidden focus:ring-2 focus:ring-[#9E644E]/30 focus:border-[#9E644E] transition-all ${
                      errors.customerName ? 'border-red-400' : 'border-[#DFD4C7]'
                    }`}
                  />
                  <User className="w-4 h-4 text-[#9C8C80] absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
                {errors.customerName && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.customerName}</span>
                  </p>
                )}
              </div>

              {/* Phone / WhatsApp Number */}
              <div>
                <label className="block text-xs font-semibold text-[#3D312A] uppercase tracking-wider mb-2">
                  Phone / WhatsApp Number <span className="text-[#9E644E]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className={`w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border text-sm text-[#2D231E] focus:outline-hidden focus:ring-2 focus:ring-[#9E644E]/30 focus:border-[#9E644E] transition-all ${
                      errors.phoneNumber ? 'border-red-400' : 'border-[#DFD4C7]'
                    }`}
                  />
                  <Phone className="w-4 h-4 text-[#9C8C80] absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
                {errors.phoneNumber && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phoneNumber}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Product Required */}
              <div>
                <label className="block text-xs font-semibold text-[#3D312A] uppercase tracking-wider mb-2">
                  Product Required <span className="text-[#9E644E]">*</span>
                </label>
                <select
                  name="productRequired"
                  value={formData.productRequired}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DFD4C7] text-sm text-[#2D231E] focus:outline-hidden focus:ring-2 focus:ring-[#9E644E]/30 focus:border-[#9E644E] transition-all"
                >
                  <option value="Pipe-cleaner flowers">Pipe-cleaner flowers (Stems / Bunch)</option>
                  <option value="Customized bouquets">Customized bouquets</option>
                  <option value="Customized gifts">Customized gifts (Memory Box, Frames)</option>
                  <option value="Bangles">Bangles (Silk Thread / Floral Haldi)</option>
                  <option value="Earrings">Earrings (Handmade Floral & Tassel)</option>
                  <option value="Embroidery work">Embroidery work (Wedding / Name Hoops)</option>
                  <option value="Gift hampers">Gift hampers (Festive / Bridal / Birthday)</option>
                  <option value="Other bespoke request">Other bespoke request</option>
                </select>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-xs font-semibold text-[#3D312A] uppercase tracking-wider mb-2">
                  Budget (in ₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-sm font-semibold text-[#8C7B70]">
                    ₹
                  </span>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="e.g. 500, 1000, 2500"
                    className="w-full pl-8 pr-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DFD4C7] text-sm text-[#2D231E] focus:outline-hidden focus:ring-2 focus:ring-[#9E644E]/30 focus:border-[#9E644E] transition-all"
                  />
                </div>
                <p className="text-[11px] text-[#85766C] mt-1">
                  We create tailored options for every budget range.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Preferred Color */}
              <div>
                <label className="block text-xs font-semibold text-[#3D312A] uppercase tracking-wider mb-2">
                  Preferred Color / Theme
                </label>
                <input
                  type="text"
                  name="preferredColor"
                  value={formData.preferredColor}
                  onChange={handleChange}
                  placeholder="e.g. Yellow & White for Haldi, Pastel Pink"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DFD4C7] text-sm text-[#2D231E] focus:outline-hidden focus:ring-2 focus:ring-[#9E644E]/30 focus:border-[#9E644E] transition-all"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-xs font-semibold text-[#3D312A] uppercase tracking-wider mb-2">
                  Quantity
                </label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 1 bouquet, or 10 favor sets"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DFD4C7] text-sm text-[#2D231E] focus:outline-hidden focus:ring-2 focus:ring-[#9E644E]/30 focus:border-[#9E644E] transition-all"
                />
              </div>

              {/* Required Date */}
              <div>
                <label className="block text-xs font-semibold text-[#3D312A] uppercase tracking-wider mb-2">
                  Required Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="requiredDate"
                    value={formData.requiredDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DFD4C7] text-sm text-[#2D231E] focus:outline-hidden focus:ring-2 focus:ring-[#9E644E]/30 focus:border-[#9E644E] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Customization Details */}
            <div>
              <label className="block text-xs font-semibold text-[#3D312A] uppercase tracking-wider mb-2">
                Customization Details
              </label>
              <textarea
                name="customizationDetails"
                rows={4}
                value={formData.customizationDetails}
                onChange={handleChange}
                placeholder="Mention specific flowers (sunflower, tulip, daisy, rose), names/dates for embroidery hoops, bangle sizes, greeting card message, or packaging style..."
                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DFD4C7] text-sm text-[#2D231E] focus:outline-hidden focus:ring-2 focus:ring-[#9E644E]/30 focus:border-[#9E644E] transition-all resize-y"
              />
            </div>

            {/* Form Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#7A6C63] text-center sm:text-left">
                <span>Direct WhatsApp connection</span>
                <span className="mx-1.5" aria-hidden="true">·</span>
                <span>We confirm colors & send work-in-progress photos</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Fallback Copy Order Button */}
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="px-4 py-3 rounded-full bg-[#FAF5EE] hover:bg-[#F2E8DC] text-[#694E40] border border-[#DFCEBD] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shrink-0"
                  title="Copy formatted order message to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span className="text-emerald-800">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Order Text</span>
                    </>
                  )}
                </button>

                {/* Required "Send Order on WhatsApp" button */}
                <button
                  type="submit"
                  className="flex-1 sm:flex-none px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20BE5A] text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Order on WhatsApp</span>
                </button>
              </div>
            </div>
          </form>

          {/* Submission Feedback Toast / Notice */}
          {submitted && (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-start gap-3">
              <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">WhatsApp chat opened!</p>
                <p className="text-xs text-emerald-800 mt-0.5">
                  If WhatsApp did not launch automatically, click &ldquo;Copy Order Text&rdquo; above and paste it directly into your WhatsApp chat with our studio.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
