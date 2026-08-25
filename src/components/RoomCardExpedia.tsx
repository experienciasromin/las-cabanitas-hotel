import React, { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight, Check, Tag } from 'lucide-react';
import { RoomType } from '../types';

interface RoomCardExpediaProps {
  room: RoomType;
  index: number;
  onSelect: (roomId: string) => void;
  isSelected?: boolean;
}

export const RoomCardExpedia: React.FC<RoomCardExpediaProps> = ({ room, index, onSelect, isSelected }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Ratings for each room to simulate authentic guest feedback
  const ratings = [
    { score: '9.6', label: 'Excepcional', reviews: 152 },
    { score: '9.4', label: 'Excepcional', reviews: 183 },
    { score: '9.8', label: 'Excepcional', reviews: 210 },
    { score: '9.5', label: 'Excepcional', reviews: 128 },
    { score: '9.7', label: 'Excepcional', reviews: 195 },
  ];
  const rating = ratings[index % ratings.length];

  // Images list (fallback to room image if only 1 exists)
  const roomImages = [room.image];

  // Discounts and regular pricing simulation (like reference image)
  const originalPrice = Math.round(room.price * 1.35);
  const discountAmount = originalPrice - room.price;

  const handlePrevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev === 0 ? roomImages.length - 1 : prev - 1));
  };

  const handleNextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev === roomImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      onClick={() => onSelect(room.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(room.id);
        }
      }}
      className={`group relative flex flex-col bg-white rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 text-left border ${
        isSelected 
          ? 'border-gold-500 shadow-xl ring-2 ring-gold-500/50 scale-[1.02]' 
          : 'border-wood-200/80 shadow-md hover:shadow-2xl hover:-translate-y-1.5'
      }`}
    >
      {/* 1. Image Carousel Container */}
      <div className="relative aspect-4/3 sm:aspect-[16/11] w-full overflow-hidden bg-wood-950">
        <img
          src={roomImages[activeImageIdx]}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Top Badges: VIP Access */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="px-3 py-1 bg-wood-950/90 text-white font-sans text-xs font-bold rounded-lg shadow-md tracking-wide backdrop-blur-sm border border-white/10">
            VIP Access
          </span>
        </div>

        {/* Top Heart / Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          aria-label="Guardar en favoritos"
          className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-white/95 text-charcoal-800 hover:text-red-500 hover:scale-110 active:scale-95 transition-all shadow-md flex items-center justify-center backdrop-blur-sm"
        >
          <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-charcoal-700'}`} />
        </button>

        {/* Left / Right Carousel Controls (Matching Expedia Reference) */}
        {roomImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImg}
              aria-label="Foto anterior"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-charcoal-900/60 hover:bg-charcoal-900 text-white flex items-center justify-center transition-all shadow-md opacity-80 group-hover:opacity-100"
            >
              <ChevronLeft className="w-4 h-4 stroke-[3]" />
            </button>
            <button
              type="button"
              onClick={handleNextImg}
              aria-label="Siguiente foto"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-charcoal-900/60 hover:bg-charcoal-900 text-white flex items-center justify-center transition-all shadow-md opacity-80 group-hover:opacity-100"
            >
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </>
        )}
      </div>

      {/* 2. Content & Pricing Details (Matching Expedia Layout) */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between text-charcoal-900 bg-white">
        <div>
          {/* Room Name */}
          <h3 className="font-sans font-bold text-base sm:text-lg text-charcoal-900 line-clamp-1 group-hover:text-gold-600 transition-colors">
            {room.name}
          </h3>

          {/* Location / Subtitle */}
          <p className="text-xs text-charcoal-500 mt-0.5 mb-2 font-medium">
            El Boquerón · San Salvador
          </p>

          {/* Rating Badge (Green Box + Text + Reviews Count) */}
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-[#1e5b4f] text-white text-xs font-bold px-2 py-0.5 rounded-md">
              {rating.score}
            </span>
            <span className="text-xs font-bold text-charcoal-900">
              {rating.label}
            </span>
            <span className="text-xs text-charcoal-500">
              ({rating.reviews} opiniones)
            </span>
          </div>
        </div>

        {/* 3. Pricing Section */}
        <div className="pt-2 border-t border-wood-100 flex flex-col space-y-1">
          {/* Discount Pill Badge */}
          <div className="flex items-center gap-1.5">
            <span className="bg-[#1e5b4f] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1 whitespace-nowrap">
              <Tag className="w-3 h-3 shrink-0" />
              $10 dto. 2a noche
            </span>
            <span className="text-[11px] text-charcoal-500">
              ${room.price} por noche
            </span>
          </div>

          {/* Price Header (Strikethrough and Current) */}
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-sans font-extrabold text-2xl text-charcoal-900 leading-none">
              ${room.price}
            </span>
            <span className="text-xs text-charcoal-400 line-through">
              ${originalPrice}
            </span>
          </div>

          <p className="text-[11px] text-charcoal-500">
            ${room.price} por noche
          </p>

          {/* Taxes note */}
          <div className="flex items-center gap-1 text-[11px] text-emerald-800 font-medium pt-1">
            <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[2.5]" />
            <span>Total con impuestos y cargos</span>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(room.id);
            }}
            className="w-full mt-3 py-2.5 bg-wood-950 hover:bg-gold-500 text-white hover:text-wood-950 font-bold uppercase tracking-wider text-xs rounded-xl shadow-md transition-all duration-200 active:scale-98 flex items-center justify-center gap-1.5"
          >
            Cotizar / Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCardExpedia;
