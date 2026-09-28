import React, { useState } from 'react';
import { Flower2, Plus, Minus, RotateCcw, ArrowRight, Sparkles, Check, Info } from 'lucide-react';
import { PIPE_CLEANER_PRICE_LIST, FlowerPriceItem } from '../data/businessData';

interface PriceListSectionProps {
  onOrderCustomBouquet: (summary: string, estimatedPrice: number) => void;
}

export const PriceListSection: React.FC<PriceListSectionProps> = ({
  onOrderCustomBouquet,
}) => {
  // State for interactive bouquet builder
  const [basket, setBasket] = useState<Record<string, number>>({});
  const [includeWrapping, setIncludeWrapping] = useState<boolean>(true);

  const handleAdd = (id: string) => {
    setBasket((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleRemove = (id: string) => {
    setBasket((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  const handleReset = () => {
    setBasket({});
  };

  // Calculate total stems and estimated price
  const totalStems = Object.values(basket).reduce((acc, count) => acc + count, 0);

  const flowersTotal = Object.entries(basket).reduce((sum, [id, count]) => {
    const item = PIPE_CLEANER_PRICE_LIST.find((f) => f.id === id);
    return sum + (item ? item.price * count : 0);
  }, 0);

  const wrapFee = totalStems > 0 && includeWrapping ? (totalStems >= 6 ? 90 : 60) : 0;
  const grandTotal = flowersTotal + wrapFee;

  const buildSummaryString = () => {
    const lines = Object.entries(basket)
      .map(([id, count]) => {
        const item = PIPE_CLEANER_PRICE_LIST.find((f) => f.id === id);
        return item ? `${count}x ${item.name} (₹${item.price * count})` : '';
      })
      .filter(Boolean);

    if (includeWrapping && totalStems > 0) {
      lines.push(`Korean Floral Wrap & Satin Ribbon (+₹${wrapFee})`);
    }

    return `Custom Pipe-Cleaner Bouquet: ${lines.join(', ')} | Total: ₹${grandTotal}`;
  };

  const handleProceedToOrder = () => {
    if (totalStems === 0) return;
    const summary = buildSummaryString();
    onOrderCustomBouquet(summary, grandTotal);
  };

  return (
    <section id="price-list" className="py-20 bg-[#F5EFE6]/50 border-t border-[#EAE0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#9E644E] block mb-2">
            Transparent Craft Rates
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#2E241E] tracking-tight">
            Pipe-Cleaner Flower Price List
          </h2>
          <div className="w-16 h-0.5 bg-[#9E644E]/40 mx-auto mt-4 mb-4" />
          <p className="text-base text-[#615248] leading-relaxed">
            All flowers are hand-twisted with high-density chenille craft stems.
            Mix and match single stems or create wrapped bouquets tailored to your budget.
          </p>
        </div>

        {/* Price List Grid & Live Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Complete Price List Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif text-2xl font-semibold text-[#2D231E]">
                Flower Price Menu
              </h3>
              <span className="text-xs text-[#7A6C62]">
                Click <span className="font-semibold text-[#9E644E]">+ Add</span> to test in Bouquet Estimator
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {PIPE_CLEANER_PRICE_LIST.map((flower) => {
                const countInBasket = basket[flower.id] || 0;
                return (
                  <div
                    key={flower.id}
                    className={`p-4 rounded-2xl bg-white border transition-all duration-200 flex flex-col justify-between ${
                      countInBasket > 0
                        ? 'border-[#9E644E] ring-1 ring-[#9E644E]/30 shadow-xs'
                        : 'border-[#EAE0D5] hover:border-[#D5C2B1]'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#FAF5EE] border border-[#E9DDCF] flex items-center justify-center shrink-0">
                            <Flower2 className="w-4 h-4 text-[#9E644E]" />
                          </div>
                          <div>
                            <h4 className="font-serif text-base sm:text-lg font-semibold text-[#2D2420] leading-snug">
                              {flower.name}
                            </h4>
                          </div>
                        </div>

                        {flower.badge && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#F3E8DC] text-[#784A38]">
                            {flower.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#71635B] line-clamp-2 mb-3">
                        {flower.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#F2ECE4] flex items-center justify-between">
                      <span className="font-serif text-lg font-bold text-[#8E523C]">
                        {flower.priceDisplay}
                      </span>

                      {/* Add/Remove Control for Bouquet Builder */}
                      <div className="flex items-center gap-1.5">
                        {countInBasket > 0 && (
                          <button
                            onClick={() => handleRemove(flower.id)}
                            className="w-7 h-7 rounded-full bg-[#F5ECE3] hover:bg-[#EBDDCF] text-[#6B4B3D] flex items-center justify-center transition-colors"
                            aria-label={`Remove one ${flower.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {countInBasket > 0 && (
                          <span className="w-6 text-center text-xs font-semibold text-[#2D2420]">
                            {countInBasket}
                          </span>
                        )}

                        <button
                          onClick={() => handleAdd(flower.id)}
                          className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all flex items-center gap-1 ${
                            countInBasket > 0
                              ? 'bg-[#9E644E] text-white hover:bg-[#86513D]'
                              : 'bg-[#FAF3EA] text-[#694E40] border border-[#E3D4C4] hover:bg-[#F2E5D4]'
                          }`}
                        >
                          <Plus className="w-3 h-3" />
                          <span>{countInBasket > 0 ? 'More' : 'Add'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Interactive Bouquet Price Estimator / Builder */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-3xl bg-white border border-[#E5DACF] shadow-sm p-6 sm:p-7">
              <div className="flex items-center justify-between pb-4 border-b border-[#EFE8DF]">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#2D2420]">
                    Bouquet Price Estimator
                  </h3>
                  <p className="text-xs text-[#7A6C62]">
                    Build your custom bunch and see live price
                  </p>
                </div>
                {totalStems > 0 && (
                  <button
                    onClick={handleReset}
                    className="p-1.5 text-xs text-[#8C7D73] hover:text-[#9E644E] flex items-center gap-1 transition-colors"
                    title="Reset selections"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Selected Items List */}
              <div className="py-4 min-h-[160px] flex flex-col justify-center">
                {totalStems === 0 ? (
                  <div className="text-center py-6 px-4 rounded-2xl bg-[#FAF8F5] border border-dashed border-[#DFD3C6]">
                    <Flower2 className="w-8 h-8 text-[#A8988C] mx-auto mb-2 opacity-70" />
                    <p className="text-sm font-medium text-[#4D4037]">Your bouquet is empty</p>
                    <p className="text-xs text-[#807267] mt-1">
                      Click &ldquo;Add&rdquo; on any flower from the price list to calculate your combination!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {Object.entries(basket).map(([id, count]) => {
                      const item = PIPE_CLEANER_PRICE_LIST.find((f) => f.id === id);
                      if (!item) return null;
                      return (
                        <div
                          key={id}
                          className="flex items-center justify-between text-xs sm:text-sm py-1.5 px-3 rounded-xl bg-[#FAF7F2] border border-[#EFE7DE]"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-[#9E644E] w-5">
                              {count}×
                            </span>
                            <span className="text-[#382D26] font-medium">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-bold text-[#382D26]">
                              ₹{item.price * count}
                            </span>
                            <button
                              onClick={() => handleRemove(id)}
                              className="text-[#99877C] hover:text-red-600 transition-colors"
                              aria-label="Remove stem"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Options: Korean Florist Wrap */}
              {totalStems > 0 && (
                <div className="pt-3 pb-4 border-t border-[#EFE8DF] space-y-2">
                  <label className="flex items-center justify-between cursor-pointer text-xs sm:text-sm text-[#473B34] select-none">
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={includeWrapping}
                        onChange={(e) => setIncludeWrapping(e.target.checked)}
                        className="rounded border-[#D5C5B5] text-[#9E644E] focus:ring-[#9E644E]"
                      />
                      <span>Korean Designer Wrap & Satin Bow</span>
                    </span>
                    <span className="font-medium text-[#7D6B60]">
                      {includeWrapping ? `+₹${wrapFee}` : 'None'}
                    </span>
                  </label>
                </div>
              )}

              {/* Price Calculation Summary */}
              <div className="pt-4 border-t border-[#EFE8DF] space-y-1.5">
                <div className="flex items-center justify-between text-xs text-[#71635B]">
                  <span>Total Floral Stems:</span>
                  <span className="font-medium">{totalStems} stems</span>
                </div>
                {totalStems > 0 && includeWrapping && (
                  <div className="flex items-center justify-between text-xs text-[#71635B]">
                    <span>Packaging & Ribbons:</span>
                    <span className="font-medium">₹{wrapFee}</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-2 border-t border-[#F2ECE4]">
                  <span className="font-serif text-base sm:text-lg font-bold text-[#2D231E]">
                    Estimated Total:
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#9E644E]">
                    ₹{grandTotal}
                  </span>
                </div>
              </div>

              {/* Action Button: Transfer to Order Form */}
              <button
                disabled={totalStems === 0}
                onClick={handleProceedToOrder}
                className={`w-full mt-5 py-3 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  totalStems > 0
                    ? 'bg-[#9E644E] hover:bg-[#86513D] text-white shadow-xs hover:shadow-md cursor-pointer active:scale-98'
                    : 'bg-[#EBDDCF] text-[#8C7A6D] cursor-not-allowed'
                }`}
              >
                <span>Transfer Bouquet to Order Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Quick Preset Combinations */}
              <div className="mt-4 pt-4 border-t border-[#F0E9E1] text-center">
                <p className="text-xs text-[#7D6E64] mb-2">
                  Quick Preset Combinations:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setBasket({ 'p-sunflower': 1, 'p-tulip': 1, 'p-daisy': 1 });
                      setIncludeWrapping(true);
                    }}
                    className="px-2.5 py-1 rounded-full bg-[#FAF5EE] hover:bg-[#F2E8DC] text-[#715446] border border-[#E3D3C3] text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    Sunshine Bunch (₹300)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setBasket({ 'p-large-sunflower': 1, 'p-tulip': 2, 'p-daisy': 1 });
                      setIncludeWrapping(true);
                    }}
                    className="px-2.5 py-1 rounded-full bg-[#FAF5EE] hover:bg-[#F2E8DC] text-[#715446] border border-[#E3D3C3] text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    Classic Meadow (₹500)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setBasket({ 'p-rose': 2, 'p-tulip': 2, 'p-lavender': 1, 'p-double-daisy': 1 });
                      setIncludeWrapping(true);
                    }}
                    className="px-2.5 py-1 rounded-full bg-[#FAF5EE] hover:bg-[#F2E8DC] text-[#715446] border border-[#E3D3C3] text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    Lush Romance (₹800)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
