import React, { useState } from 'react';
import { Star, MessageSquare, Plus, Check } from 'lucide-react';
import { CUSTOMER_REVIEWS, CustomerReview } from '../data/businessData';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(CUSTOMER_REVIEWS);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [reviewerName, setReviewerName] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('Wedding Order');
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !comment.trim()) return;

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      namePlaceholder: `[Customer: ${reviewerName.trim()}]`,
      occasion,
      rating,
      date: 'Just now',
      comment: comment.trim(),
      itemOrdered: 'Custom Order',
    };

    setReviews([newRev, ...reviews]);
    setReviewerName('');
    setComment('');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowAddForm(false);
    }, 2000);
  };

  return (
    <section id="reviews" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9E644E] block mb-2">
              Words of Appreciation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#2E241E] tracking-tight">
              Customer Reviews
            </h2>
            <div className="w-16 h-0.5 bg-[#9E644E]/40 mt-4 mb-4" />
            <p className="text-base text-[#615248] leading-relaxed">
              Real experiences from clients who celebrated weddings, Haldi festivities,
              and special moments with our handcrafted gifts.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#F8F4EE] text-[#473931] border border-[#D8C7B7] text-xs sm:text-sm font-semibold shadow-2xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#9E644E]" />
              <span>{showAddForm ? 'Close Review Form' : 'Write a Review'}</span>
            </button>
          </div>
        </div>

        {/* Add Review Dropdown Form */}
        {showAddForm && (
          <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFD5] shadow-sm max-w-2xl mx-auto animate-in slide-in-from-top-4 duration-300">
            <h3 className="font-serif text-xl font-semibold text-[#2D2420] mb-1">
              Share Your Feedback
            </h3>
            <p className="text-xs text-[#7A6C62] mb-5">
              Review our handmade crafts and share your occasion experience.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#40332B] uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="e.g. Meera"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DFD4C7] text-sm text-[#2D231E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#40332B] uppercase mb-1">
                    Occasion / Event
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DFD4C7] text-sm text-[#2D231E]"
                  >
                    <option value="Haldi Ceremony">Haldi Ceremony</option>
                    <option value="Wedding Gift">Wedding Gift</option>
                    <option value="Birthday Gift">Birthday Gift</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Special Occasion">Special Occasion</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#40332B] uppercase mb-1">
                  Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#40332B] uppercase mb-1">
                  Your Review
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what you liked about the handcrafted flowers or custom gifts..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DFD4C7] text-sm text-[#2D231E]"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#9E644E] hover:bg-[#86513D] text-white text-xs sm:text-sm font-semibold transition-all"
                >
                  Submit Review
                </button>
                {submitted && (
                  <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>Review added successfully!</span>
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-white border border-[#E9DFD4] shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-[#57483F] leading-relaxed mb-4 italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#F2ECE4]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs sm:text-sm text-[#2D2420]">
                    {rev.namePlaceholder}
                  </span>
                  <span className="text-[10px] text-[#8C7D73] font-medium">
                    {rev.date}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#9E644E]">
                  <span>{rev.occasion}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#847368] truncate">{rev.itemOrdered}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
