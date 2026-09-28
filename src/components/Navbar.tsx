import React, { useState, useEffect } from 'react';
import { Flower2, MessageCircle, Menu, X, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface NavbarProps {
  onOpenChat: () => void;
  onNavigateOrder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenChat, onNavigateOrder }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Price List', href: '#price-list' },
    { name: 'Custom Orders', href: '#custom-orders' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs border-b border-[#E8DFD5]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Title */}
          <a
            href="#home"
            className="flex items-center gap-3 group text-left"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#home');
            }}
          >
            <div className="w-10 h-10 rounded-full bg-[#F2E8DC] border border-[#E3D1C0] flex items-center justify-center text-[#9E644E] group-hover:scale-105 transition-transform">
              <Flower2 className="w-5 h-5 text-[#9E644E]" />
            </div>
            <div>
              <span className="block font-serif text-xl sm:text-2xl font-semibold text-[#2D2420] tracking-tight">
                {BUSINESS_INFO.name}
              </span>
              <span className="block text-[11px] uppercase tracking-wider text-[#8A796F] font-medium -mt-0.5">
                Handmade & Everlasting
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-7 text-sm font-medium text-[#5A4D45]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="hover:text-[#9E644E] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#9E644E] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Chatbot Button */}
            <button
              onClick={onOpenChat}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-full bg-[#F2E8DC] hover:bg-[#E8D9C8] text-[#5C3F33] transition-all border border-[#DFCEBD] cursor-pointer"
              title="Chat with us"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#9E644E]" />
              <span>Chat with Us</span>
            </button>

            {/* Order Now Button */}
            <button
              onClick={onNavigateOrder}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-[#9E644E] hover:bg-[#885440] text-white shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span>Order Now</span>
            </button>
          </div>

          {/* Mobile Menu & Chat Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onOpenChat}
              className="p-2 rounded-full bg-[#F2E8DC] text-[#7A4B3A] border border-[#E3D1C0] cursor-pointer"
              aria-label="Chat with us"
            >
              <MessageCircle className="w-4 h-4 text-[#9E644E]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#4A3E37] hover:bg-[#EFEAE2] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FAF8F5] border-b border-[#E8DFD5] px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="block px-3 py-2.5 rounded-md text-sm font-medium text-[#4A3E37] hover:bg-[#F2EBE3] hover:text-[#9E644E] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-[#E8DFD5] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#F2E8DC] text-[#5C3F33] text-sm font-medium border border-[#DFCEBD] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#9E644E]" />
              <span>Chat with Us</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateOrder();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#9E644E] text-white text-sm font-medium shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order Now via WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
