import React, { useState } from 'react';
import { BEFORE_AFTER_ITEMS } from '../data/cleaningData';
import { Sparkles, MapPin, Clock, Layers } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [selectedId, setSelectedId] = useState(BEFORE_AFTER_ITEMS[0].id);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const activeItem = BEFORE_AFTER_ITEMS.find((item) => item.id === selectedId) || BEFORE_AFTER_ITEMS[0];

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging && e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  return (
    <section id="before-after" className="pt-2 pb-16 sm:pt-3 sm:pb-20 bg-[#FAFAFA] border-b border-zinc-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18181B] tracking-tight font-sans">
            Before and After
          </h2>
          <p className="text-[#71717A] text-sm sm:text-base leading-relaxed">
            Drag the slider horizontally to see how our industrial steam extractors restore dirty sofas, carpets, tiles, and water tanks.
          </p>
        </div>

        {/* Tabs for Portfolio Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {BEFORE_AFTER_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedId(item.id);
                setSliderPosition(50);
              }}
              className={`px-4 py-2 rounded-[12px] text-xs font-semibold transition-all cursor-pointer ${
                selectedId === item.id
                  ? 'bg-[#059669] text-white shadow-sm'
                  : 'bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              {item.category}
            </button>
          ))}
        </div>

        {/* Slider Card Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-[24px] p-4 sm:p-6 border border-zinc-200/80 shadow-sm space-y-6">
          
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-[#18181B] font-sans">{activeItem.title}</h3>
              <p className="text-xs text-[#71717A] flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#059669]" />
                <span>{activeItem.location}</span>
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700 bg-zinc-50 px-3 py-1.5 rounded-[10px] border border-zinc-200/70 w-fit">
              <Clock className="w-4 h-4 text-[#059669]" />
              <span>Completion Time: {activeItem.durationHours} Hours</span>
            </div>
          </div>

          {/* Draggable Comparison View */}
          <div
            className="relative h-[350px] sm:h-[450px] rounded-[16px] overflow-hidden cursor-ew-resize select-none border border-zinc-200 shadow-xs"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* After Image (Background) */}
            <img
              src={activeItem.afterImg}
              alt={`${activeItem.title} - After Cleaning`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-[#059669]/90 text-white font-bold text-[11px] px-3 py-1.5 rounded-[8px] shadow-md backdrop-blur-xs uppercase tracking-wider">
              AFTER
            </div>

            {/* Before Image (Clipped Foreground) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={activeItem.beforeImg}
                alt={`${activeItem.title} - Before Cleaning`}
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="absolute top-4 left-4 bg-[#18181B]/90 text-zinc-200 font-bold text-[11px] px-3 py-1.5 rounded-[8px] shadow-md backdrop-blur-xs uppercase tracking-wider">
                BEFORE
              </div>
            </div>

            {/* Draggable Divider Line & Knob */}
            <div
              className="absolute inset-y-0 w-1 bg-white shadow-2xl pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 bg-[#059669] text-white rounded-full border-2 border-white shadow-xl flex items-center justify-center font-bold text-xs">
                ↔
              </div>
            </div>
          </div>

          {/* Description Footer */}
          <div className="bg-slate-50/80 p-4 rounded-[14px] border border-slate-200/80 text-xs text-slate-700 leading-relaxed flex items-start gap-3">
            <Layers className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
            <p>
              <strong className="text-[#0F172A] font-bold">Process & Outcome:</strong> {activeItem.description}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
