import React, { useState } from 'react';
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
import { N8nChatWidget, openN8nChat } from './components/N8nChatWidget';
import { Product } from './data/businessData';

export default function App() {
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

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2420] flex flex-col font-sans selection:bg-[#EBDDCF] selection:text-[#38271E]">
      {/* Navigation */}
      <Navbar
        onOpenChat={openN8nChat}
        onNavigateOrder={() => scrollToSection('custom-orders')}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOrderNow={() => scrollToSection('custom-orders')}
          onViewProducts={() => scrollToSection('products')}
          onContactUs={() => scrollToSection('contact')}
          onOpenChat={openN8nChat}
        />

        {/* About Us */}
        <AboutSection />

        {/* Products Section */}
        <ProductsSection
          onSelectProductForOrder={handleSelectProductForOrder}
        />

        {/* Pipe-Cleaner Flower Price List & Interactive Estimator */}
        <PriceListSection
          onOrderCustomBouquet={handleOrderCustomBouquet}
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

      {/* n8n Chatbot Widget (connected directly to webhook) */}
      <N8nChatWidget />
    </div>
  );
}
