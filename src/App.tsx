import React, { useState } from 'react';
import { Sparkles, MessageCircle, ArrowUp } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProductsSection } from './components/ProductsSection';
import { PriceListSection } from './components/PriceListSection';
import { CustomOrderForm, OrderFormData } from './components/CustomOrderForm';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AiAssistantModal } from './components/AiAssistantModal';
import { N8nChatWidget } from './components/N8nChatWidget';
import { Product, BUSINESS_INFO } from './data/businessData';

export default function App() {
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);
  const [aiInitialQuery, setAiInitialQuery] = useState<string>('');
  const [orderInitialData, setOrderInitialData] = useState<Partial<OrderFormData>>({});

  // Smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // When customer clicks "Order Now" on a product card
  const handleSelectProductForOrder = (product: Product) => {
    setOrderInitialData({
      productRequired: product.name,
      budget: product.numericPrice ? String(product.numericPrice) : '',
      customizationDetails: `Interested in ordering: ${product.name} (${product.price}). Category: ${product.category}. Please customize as needed.`,
    });
    scrollToSection('custom-orders');
  };

  // When customer builds a custom bouquet in the Price List section
  const handleOrderCustomBouquet = (summary: string, estimatedPrice: number) => {
    setOrderInitialData({
      productRequired: 'Customized bouquets',
      budget: String(estimatedPrice),
      customizationDetails: summary,
    });
    scrollToSection('custom-orders');
  };

  // When customer asks AI about a specific product
  const handleOpenAiForProduct = (productName: string) => {
    setAiInitialQuery(`Tell me about the ${productName}, what customizations are available, and how much it costs.`);
    setIsAiOpen(true);
  };

  // When customer clicks quick budget ideas (e.g. ₹500)
  const handleOpenAiBudget = (budgetAmount: number) => {
    setAiInitialQuery(`I have ₹${budgetAmount}. What bouquet can I get?`);
    setIsAiOpen(true);
  };

  // When AI suggests a recommendation and customer clicks "Use this in Order Form"
  const handleApplyAiRecommendationToOrder = (recommendationText: string) => {
    // Extract first line or clean recommendation
    setOrderInitialData({
      productRequired: 'Customized bouquets',
      customizationDetails: `AI Shopping Assistant Recommendation:\n${recommendationText.slice(0, 300)}...`,
    });
    scrollToSection('custom-orders');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2420] flex flex-col font-sans selection:bg-[#EBDDCF] selection:text-[#38271E]">
      {/* Navigation */}
      <Navbar
        onOpenAi={() => {
          setAiInitialQuery('');
          setIsAiOpen(true);
        }}
        onNavigateOrder={() => scrollToSection('custom-orders')}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOrderNow={() => scrollToSection('custom-orders')}
          onViewProducts={() => scrollToSection('products')}
          onContactUs={() => scrollToSection('contact')}
          onOpenAi={() => {
            setAiInitialQuery('');
            setIsAiOpen(true);
          }}
        />

        {/* About Us */}
        <AboutSection />

        {/* Products Section */}
        <ProductsSection
          onSelectProductForOrder={handleSelectProductForOrder}
          onOpenAiForProduct={handleOpenAiForProduct}
        />

        {/* Pipe-Cleaner Flower Price List & Interactive Estimator */}
        <PriceListSection
          onOrderCustomBouquet={handleOrderCustomBouquet}
          onOpenAiBudget={handleOpenAiBudget}
        />

        {/* Custom Order Form with WhatsApp Send */}
        <CustomOrderForm
          initialData={orderInitialData}
          onResetInitialData={() => setOrderInitialData({})}
        />

        {/* Portfolio / Gallery */}
        <GallerySection />

        {/* Customer Reviews */}
        <ReviewsSection />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Contact Information */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* n8n Official Embedded Chatbot Widget */}
      <N8nChatWidget />

      {/* Floating AI Shopping Assistant Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        <button
          onClick={() => {
            setAiInitialQuery('');
            setIsAiOpen(true);
          }}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#9E644E] hover:bg-[#86513D] text-white shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 border border-white/20 cursor-pointer"
          title="Ask AI Shopping Assistant"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-300 animate-ping" />
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-wide pr-1">
            Ask AI Assistant
          </span>
        </button>
      </div>

      {/* AI Assistant Modal Dialog */}
      <AiAssistantModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        onApplyRecommendationToOrder={handleApplyAiRecommendationToOrder}
        initialQuery={aiInitialQuery}
      />
    </div>
  );
}
