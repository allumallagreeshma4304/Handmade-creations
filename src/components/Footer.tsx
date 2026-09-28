import React from 'react';
import { Flower2, Heart, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#261E1A] text-[#D8CCC2] pt-16 pb-12 border-t border-[#3A2E28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#3B2F29]">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#3D2F28] flex items-center justify-center text-[#E0A894]">
                <Flower2 className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-semibold text-white tracking-tight">
                {BUSINESS_INFO.name}
              </span>
            </div>
            <p className="text-sm text-[#A8988D] max-w-sm leading-relaxed">
              {BUSINESS_INFO.tagline}. Handmade pipe-cleaner flowers, customized bouquets,
              Haldi jewelry, bangles, and bespoke gift hampers crafted with care and attention to detail.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-[#C5B3A5]">
                <span>Crafted by hand</span>
                <span aria-hidden="true">·</span>
                <span>Everlasting chenille florals</span>
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white/90 font-semibold">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-[#A8988D]">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Products & Catalog
                </a>
              </li>
              <li>
                <a href="#price-list" className="hover:text-white transition-colors">
                  Pipe-Cleaner Price List
                </a>
              </li>
              <li>
                <a href="#custom-orders" className="hover:text-white transition-colors">
                  Custom Orders
                </a>
              </li>
            </ul>
          </div>

          {/* Occasions & Assistance */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white/90 font-semibold">
              Occasions & Ordering
            </h4>
            <ul className="space-y-2 text-sm text-[#A8988D]">
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Gallery & Portfolio
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact Studio
                </a>
              </li>
              <li className="pt-2">
                <span className="text-xs text-[#8A796F] block">
                  Studio Phone: {BUSINESS_INFO.phonePlaceholder}
                </span>
                <span className="text-xs text-[#8A796F] block mt-0.5">
                  Email: {BUSINESS_INFO.emailPlaceholder}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8F7F74]">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Handmade with care & creativity</span>
            <Heart className="w-3.5 h-3.5 text-[#E0A894] fill-current" />
          </p>
        </div>
      </div>
    </footer>
  );
};
