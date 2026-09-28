import React, { useState } from 'react';
import { Maximize2, X, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/businessData';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Bouquets', 'Haldi & Bangles', 'Embroidery', 'Pipe Cleaner Florals', 'Gift Hampers'];

  const filteredItems =
    activeFilter === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) =>
          item.category.toLowerCase().includes(activeFilter.toLowerCase())
        );

  return (
    <section id="gallery" className="py-20 bg-[#F5EFE6]/50 border-t border-[#EAE0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#9E644E] block mb-2">
            Visual Portfolio
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#2E241E] tracking-tight">
            Handcrafted Moments Gallery
          </h2>
          <div className="w-16 h-0.5 bg-[#9E644E]/40 mx-auto mt-4 mb-4" />
          <p className="text-base text-[#615248] leading-relaxed">
            A showcase of custom creations delivered for Haldi celebrations, weddings, anniversaries,
            and intimate birthday milestones.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-[#9E644E] text-white shadow-xs'
                  : 'bg-white text-[#5C4F46] border border-[#E3D4C4] hover:bg-[#F6EFE6]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#EAE0D5] cursor-pointer shadow-2xs hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-4/3 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-amber-200">
                    {item.occasion}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-semibold leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="relative max-w-2xl w-full bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-2xl border border-[#E8DFD5] animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-4/3 w-full bg-black">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#9E644E] mb-1">
                  {selectedItem.occasion} · {selectedItem.category}
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2D2420] mb-2">
                  {selectedItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#635349] leading-relaxed mb-4">
                  Handcrafted with care and attention to detail. Similar designs can be customized
                  in your favorite flower varieties, colors, and presentation packaging.
                </p>
                <a
                  href="#custom-orders"
                  onClick={() => setSelectedItem(null)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#9E644E] hover:bg-[#86513D] text-white text-xs sm:text-sm font-semibold shadow-xs transition-all"
                >
                  <span>Request Similar Custom Piece</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
