import React, { useState } from 'react';
import { ArrowUpRight, MessageCircle, Sparkles, Filter } from 'lucide-react';
import { PRODUCTS, PRODUCT_CATEGORIES, Product } from '../data/businessData';

interface ProductsSectionProps {
  onSelectProductForOrder: (product: Product) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  onSelectProductForOrder,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProducts =
    activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="products" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#9E644E] block mb-2">
            Artisanal Catalog
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#2E241E] tracking-tight">
            Our Handcrafted Collection
          </h2>
          <div className="w-16 h-0.5 bg-[#9E644E]/40 mx-auto mt-4 mb-4" />
          <p className="text-base text-[#65574F] leading-relaxed">
            Every product is hand-shaped, customized to your event theme, and made to order.
            Choose a creation below or request tailored modifications.
          </p>
        </div>

        {/* Category Filter Tabs (Interactive controls styled cleanly without garish badges) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {PRODUCT_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#9E644E] text-white shadow-xs'
                    : 'bg-white text-[#574B43] border border-[#E4D8CD] hover:border-[#BAA998] hover:bg-[#F7F2EB]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#EBE1D6] hover:border-[#D9C4B2] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Product Image */}
              <div className="aspect-4/3 sm:aspect-square relative overflow-hidden bg-[#F6F1EA]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Quiet inline category kicker */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-medium text-[#4C3D34] shadow-2xs">
                  {product.category}
                </div>

                {product.occasion && (
                  <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-medium bg-black/45 backdrop-blur-xs px-2.5 py-1 rounded-md truncate">
                    {product.occasion}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#2D2420] group-hover:text-[#9E644E] transition-colors leading-snug">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#6C5E55] leading-relaxed line-clamp-2 mb-4 font-light">
                    {product.description}
                  </p>
                </div>

                {/* Price & Order Action */}
                <div className="pt-3 border-t border-[#F2ECE4] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-[#8C7D73] uppercase tracking-wider block">Price</span>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-[#8E523C]">
                      {product.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Required "Order Now" button */}
                    <button
                      onClick={() => onSelectProductForOrder(product)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#9E644E] hover:bg-[#86513D] text-white text-xs font-semibold shadow-2xs hover:shadow-xs active:scale-95 transition-all cursor-pointer"
                    >
                      <span>Order Now</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Order Callout Footer in Products */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#F4EDE5] border border-[#E5DACF] text-center max-w-3xl mx-auto">
          <h3 className="font-serif text-2xl font-semibold text-[#2D2420] mb-2">
            Looking for something completely tailored?
          </h3>
          <p className="text-sm text-[#615248] mb-5">
            We love crafting one-of-a-kind designs for weddings, Haldi events, and milestone birthdays.
            Tell us your budget, theme, and color preference.
          </p>
          <a
            href="#custom-orders"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#9E644E] hover:bg-[#86513D] text-white text-xs sm:text-sm font-semibold shadow-2xs transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open Custom Order Form</span>
          </a>
        </div>
      </div>
    </section>
  );
};
