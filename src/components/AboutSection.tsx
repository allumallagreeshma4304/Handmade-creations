import React from 'react';
import { Flower2, HeartHandshake, Sparkles, Gift, Palette } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#F5EFE6]/60 border-y border-[#E9DFD4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#9E644E] block mb-2">
            The Craft & Story
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#2E241E] tracking-tight">
            About Our Handmade Studio
          </h2>
          <div className="w-16 h-0.5 bg-[#9E644E]/40 mx-auto mt-4 mb-4" />
          <p className="text-base text-[#615248] leading-relaxed">
            We believe that life’s most cherished celebrations deserve keepsakes crafted with personal warmth,
            creativity, and authentic care.
          </p>
        </div>

        {/* Narrative & Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-[#52443C] leading-relaxed text-base">
            <p>
              Welcome to <span className="font-semibold text-[#2D231E]">{BUSINESS_INFO.name}</span>.
              We specialize in creating handmade and customized products for <strong className="text-[#362B25]">weddings, birthdays, Haldi functions, special occasions, and meaningful gifting</strong>.
            </p>
            <p>
              Unlike mass-manufactured gifts, every single pipe-cleaner petal, embroidery stitch, and silk thread bangle is created by hand with patience, creativity, and close attention to detail. Our pipe-cleaner flowers bring the delicate charm of garden blossoms, but with a special promise: <em className="text-[#84503D]">they never wilt, need no watering, and retain their soft velvet texture for years.</em>
            </p>
            <p>
              Whether you are planning bridal shower favors, customized yellow Haldi floral jewelry sets, an anniversary memory box, or a vibrant bouquet in someone’s favorite color, we collaborate with you directly to translate your emotion into a lasting tangible memory.
            </p>

            {/* Key Craft Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white border border-[#EBE1D7] flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#F6EDE3] text-[#9E644E] shrink-0 mt-0.5">
                  <Flower2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#2D2420]">Everlasting Florals</h4>
                  <p className="text-xs text-[#71635A] mt-1">Soft chenille pipe-cleaners that hold their shape and beauty forever.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#EBE1D7] flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#F6EDE3] text-[#9E644E] shrink-0 mt-0.5">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#2D2420]">Custom Palettes</h4>
                  <p className="text-xs text-[#71635A] mt-1">Choose colors, wrap styles, and personalized ribbons to match your event theme.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#EBE1D7] flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#F6EDE3] text-[#9E644E] shrink-0 mt-0.5">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#2D2420]">Occasion-Ready</h4>
                  <p className="text-xs text-[#71635A] mt-1">Tailored for Haldi ceremonies, wedding rituals, bridesmaid boxes, & birthdays.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#EBE1D7] flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#F6EDE3] text-[#9E644E] shrink-0 mt-0.5">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#2D2420]">Thoughtful Packaging</h4>
                  <p className="text-xs text-[#71635A] mt-1">Wrapped in Korean florist paper, satin bows, and personalized handwritten cards.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Story Collage */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-sm border border-[#E5DACF]">
                  <img
                    src="https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80"
                    alt="Handmade sunflower and daisy bouquet"
                    className="w-full h-48 sm:h-56 object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-sm border border-[#E5DACF]">
                  <img
                    src="https://images.unsplash.com/photo-1611591475155-426c04514819?auto=format&fit=crop&w=600&q=80"
                    alt="Handmade yellow floral bangles for Haldi function"
                    className="w-full h-40 sm:h-48 object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="rounded-2xl overflow-hidden shadow-sm border border-[#E5DACF]">
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
                    alt="Hand-embroidered wedding hoop with intricate flowers"
                    className="w-full h-40 sm:h-48 object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-sm border border-[#E5DACF]">
                  <img
                    src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80"
                    alt="Artisan customized gift hamper"
                    className="w-full h-48 sm:h-56 object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
