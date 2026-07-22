import React, { useState } from 'react';
import { TESTIMONIALS_LIST, APEX_COMPANY_INFO } from '../data/cleaningData';
import { Testimonial } from '../types';
import { PageHero } from './PageHero';
import { Star, ShieldCheck, MapPin, Quote, PlusCircle, CheckCircle2, X } from 'lucide-react';

export const TestimonialSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS_LIST);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newEstate, setNewEstate] = useState('Milimani, Nakuru');
  const [newRating, setNewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [newServiceName, setNewServiceName] = useState('Residential Deep Clean');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newReviewText) return;

    const newRev: Testimonial = {
      id: `rev-user-${Date.now()}`,
      author: newAuthor,
      role: 'Verified Customer',
      estate: newEstate,
      rating: newRating,
      reviewText: newReviewText,
      date: 'Just Now',
      verified: true,
      serviceName: newServiceName,
    };

    setTestimonials([newRev, ...testimonials]);
    setShowAddReview(false);
    setNewAuthor('');
    setNewReviewText('');
  };

  return (
    <section id="reviews" className="pt-2 pb-16 sm:pt-3 sm:pb-20 bg-white border-b border-zinc-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Hero Header */}
        <PageHero
          title="What Nakuru Residents & Business Owners"
          highlightText="Say"
          subtitle="Read authentic, verified testimonials from homeowners, Airbnb Superhosts, and corporate managers across Nakuru County."
          backgroundImageUrl="/images/about/team-office.jpg"
          primaryCta={{
            text: "Leave Your Review",
            onClick: () => setShowAddReview(true),
            icon: <PlusCircle className="w-4 h-4" />
          }}
          stats={[
            { value: "350+", label: "Verified Reviews" },
            { value: "4.9 ★", label: "Average Rating" },
            { value: "100%", label: "Verified Clients" },
            { value: "Nakuru", label: "Countywide Trust" },
          ]}
        />

        {/* Overall Rating Banner */}
        <div className="bg-[#18181B] text-white rounded-[24px] p-6 sm:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-[16px] bg-[#059669] text-white flex flex-col items-center justify-center font-extrabold">
              <span className="text-2xl leading-none">4.9</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">STARS</span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm font-bold text-white">Top Rated Cleaning Service in Nakuru</p>
              <p className="text-xs text-zinc-400">{APEX_COMPANY_INFO.reviewCount} Verified Client Feedback Submissions</p>
            </div>
          </div>

          <button
            onClick={() => setShowAddReview(true)}
            className="px-5 py-3 rounded-[12px] bg-[#059669] hover:bg-emerald-500 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-sm shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Write a Google Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((rev) => (
            <div
              key={rev.id}
              className="bg-zinc-50/80 rounded-[20px] p-6 border border-zinc-200/80 hover:border-emerald-300 transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>

                <Quote className="w-7 h-7 text-zinc-300 -ml-1 -my-1" />

                <p className="text-xs text-zinc-700 leading-relaxed">
                  "{rev.reviewText}"
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-200/80 mt-4 space-y-1">
                <p className="text-xs font-bold text-[#18181B]">{rev.author}</p>
                <p className="text-[11px] text-[#71717A] font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#059669]" />
                  <span>{rev.estate}</span>
                </p>
                <p className="text-[10px] text-[#059669] font-semibold">{rev.serviceName}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Modal */}
        {showAddReview && (
          <div className="fixed inset-0 z-50 bg-[#18181B]/75 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white rounded-[24px] max-w-md w-full p-6 sm:p-8 space-y-5 border border-zinc-200 shadow-2xl relative animate-in zoom-in duration-200">
              
              <button
                onClick={() => setShowAddReview(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-xl font-bold text-[#18181B] font-sans">
                Submit Your Nakuru Service Review
              </h3>

              <form onSubmit={handleAddReview} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Wanjiku Kamau"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-[12px] p-2.5 font-medium text-[#18181B]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-zinc-700 mb-1">Your Estate / Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Kiamunyi"
                      value={newEstate}
                      onChange={(e) => setNewEstate(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-[12px] p-2.5 font-medium text-[#18181B]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 mb-1">Rating</label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-[12px] p-2.5 font-bold text-[#18181B]"
                    >
                      <option value={5}>5 Stars (Excellent)</option>
                      <option value={4}>4 Stars (Good)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">Service Received</label>
                  <input
                    type="text"
                    placeholder="e.g. Sofa Cleaning & Carpet Shampoo"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-[12px] p-2.5 font-medium text-[#18181B]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">Your Feedback Review *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe how our cleaning team handled your home or office in Nakuru..."
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-[12px] p-2.5 font-medium text-[#18181B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-[12px] bg-[#059669] hover:bg-emerald-500 text-white font-semibold shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Publish Review</span>
                </button>
              </form>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
