import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/cleaningData';
import { BlogPost } from '../types';
import { PageHero } from './PageHero';
import { Sparkles, Clock, Calendar, ArrowRight, User, X, Tag } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = ['All', 'Nakuru Living', 'Post Construction', 'Move In Guides'];

  const filteredPosts = BLOG_POSTS.filter(
    (post) => selectedCategory === 'All' || post.category === selectedCategory
  );

  return (
    <section id="blog" className="pt-2 pb-16 sm:pt-3 sm:pb-20 bg-[#FAFAFA] border-b border-zinc-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Hero Header */}
        <PageHero
          title="Expert Cleaning Tips & Local"
          highlightText="Guides"
          subtitle="Learn how to protect your furniture from volcanic dust, tackle red clay stains, and maintain 5-star Airbnb cleanliness in Nakuru."
          backgroundImageUrl="/images/blog/sofa-care-guide.jpg"
          stats={[
            { value: "50+", label: "Articles & Guides" },
            { value: "Nakuru", label: "Local Focus" },
            { value: "Weekly", label: "New Updates" },
            { value: "Free", label: "Cleaning Advice" },
          ]}
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-[12px] text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#059669] text-white shadow-sm'
                  : 'bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-[20px] border border-zinc-200/80 shadow-2xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-zinc-100">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-[#059669] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-[#71717A]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#059669]" />
                      {post.publishDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#059669]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#18181B] group-hover:text-[#059669] transition-colors line-clamp-2 font-sans">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#71717A] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setActivePost(post)}
                  className="text-xs font-semibold text-[#059669] hover:text-emerald-700 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Blog Post Modal */}
        {activePost && (
          <div className="fixed inset-0 z-50 bg-[#18181B]/75 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white rounded-[24px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 border border-zinc-200 shadow-2xl relative animate-in fade-in zoom-in duration-200">
              
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#059669] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  {activePost.category}
                </span>
                <h3 className="text-2xl font-bold text-[#18181B] font-sans">
                  {activePost.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-[#71717A] pt-1">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#059669]" />
                    {activePost.author} ({activePost.authorRole})
                  </span>
                  <span>•</span>
                  <span>{activePost.publishDate}</span>
                </div>
              </div>

              <img
                src={activePost.imageUrl}
                alt={activePost.title}
                className="w-full h-60 object-cover rounded-[16px] border border-zinc-200"
              />

              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-zinc-700 leading-relaxed whitespace-pre-line">
                {activePost.content}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-100">
                {activePost.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-medium text-zinc-600 bg-zinc-100 px-2.5 py-1 rounded-[8px] flex items-center gap-1">
                    <Tag className="w-3 h-3 text-[#059669]" />
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setActivePost(null)}
                className="w-full py-3 rounded-[12px] bg-[#18181B] hover:bg-zinc-800 text-white font-semibold text-xs cursor-pointer"
              >
                Close Article
              </button>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
