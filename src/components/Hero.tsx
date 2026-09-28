import React from 'react';
import { ArrowRight, Sparkles, Heart, ShieldCheck, Clock, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface HeroProps {
  onOrderNow: () => void;
  onViewProducts: () => void;
  onContactUs: () => void;
  onOpenAi: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOrderNow,
  onViewProducts,
  onContactUs,
  onOpenAi,
}) => {
  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Soft pastel ambient background blobs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none -z-10">
        <div className="absolute top-0 left-10 w-72 h-72 rounded-full bg-[#F5E6D8]/60 blur-3xl" />
        <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-[#E8EFE5]/50 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-[#FCECEE]/50 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and Call-to-Actions */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4EDE5] border border-[#E5DACD] text-xs font-medium text-[#7D5545] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#A36048]" />
              <span>Bespoke Handmade Crafts for Weddings & Celebrations</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#2A201B] leading-[1.15] mb-6">
              Handcrafted with Care, Created for Your Special Moments
            </h1>

            <p className="text-base sm:text-lg text-[#61544D] leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8 font-light">
              From everlasting pipe-cleaner flowers and personalized bouquets to floral Haldi bangles,
              intricate embroidery hoops, and festive gift hampers—every single piece is made
              by hand with love, precision, and timeless elegance.
            </p>

            {/* Required Action Buttons: Order Now, View Products, Contact Us */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mb-10">
              <button
                onClick={onOrderNow}
                className="px-6 py-3.5 rounded-full bg-[#9E644E] hover:bg-[#86513D] text-white font-medium text-sm sm:text-base shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onViewProducts}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-[#F8F5F1] text-[#42352E] font-medium text-sm sm:text-base border border-[#DDD3C7] shadow-2xs hover:border-[#BAA998] transition-all"
              >
                View Products
              </button>

              <button
                onClick={onContactUs}
                className="px-6 py-3.5 rounded-full bg-transparent hover:bg-[#F2ECE5] text-[#63534B] font-medium text-sm sm:text-base border border-transparent transition-all"
              >
                Contact Us
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-[#EAE1D7] grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
              <div>
                <span className="block font-serif text-lg sm:text-xl font-bold text-[#3B2E27]">100%</span>
                <span className="text-xs text-[#7A6C63]">Hand-twisted florals</span>
              </div>
              <div>
                <span className="block font-serif text-lg sm:text-xl font-bold text-[#3B2E27]">Custom</span>
                <span className="text-xs text-[#7A6C63]">Any color palette</span>
              </div>
              <div>
                <span className="block font-serif text-lg sm:text-xl font-bold text-[#3B2E27]">Everlasting</span>
                <span className="text-xs text-[#7A6C63]">Will never wither</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main curated feature card */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E9DFD4] bg-white p-3">
                <div className="aspect-4/5 rounded-2xl overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80"
                    alt="Handcrafted pastel flower bouquet with pipe cleaner blossoms"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
                  
                  {/* Overlay details */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-200 block mb-1">
                      Featured Creation
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold leading-snug">
                      Custom Pastel Floral Arrangement
                    </h3>
                    <p className="text-xs text-white/85 mt-1">
                      Tulips, double daisies, and lavender sprigs handcrafted for life&apos;s memories.
                    </p>
                  </div>
                </div>

                {/* Sub-badge prompt to AI assistant */}
                <div className="mt-3 px-3 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#EDE2D4] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#EADCCF] flex items-center justify-center text-[#8C5541]">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#382D26]">Have a specific budget or event?</p>
                      <p className="text-[11px] text-[#7A6C63]">Ask our AI assistant for instant recommendations</p>
                    </div>
                  </div>
                  <button
                    onClick={onOpenAi}
                    className="text-xs font-semibold text-[#8C5541] hover:text-[#6F402F] underline underline-offset-2 ml-2 whitespace-nowrap"
                  >
                    Try it →
                  </button>
                </div>
              </div>

              {/* Decorative Floating Mini Badge */}
              <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-white/95 backdrop-blur-xs rounded-2xl p-3.5 shadow-lg border border-[#E9DFD4] items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EAF2E8] flex items-center justify-center text-[#4B7043]">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-[#2D231E]">Made with Love</span>
                  <span className="block text-[11px] text-[#786B62]">Zero plastic waste, stays forever</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
