import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Sparkles,
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Moon,
  Star,
  Flower2,
  BookOpen,
} from 'lucide-react';
import { giftConfig, MemoryItem } from '../config/giftConfig';
import { soundEngine } from '../utils/soundEngine';

const PolaroidIllustration: React.FC<{
  type: MemoryItem['illustrationType'];
  palette: [string, string, string];
}> = ({ type, palette }) => {
  const [bg, mid, dark] = palette;

  return (
    <svg
      viewBox="0 0 320 260"
      className="h-full w-full object-cover"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="320" height="260" fill={bg} />
      {/* Soft atmospheric gradient circle */}
      <circle cx="160" cy="115" r="95" fill={mid} fillOpacity="0.32" />

      {type === 'rainy-cafe' && (
        <>
          {/* Window frame */}
          <rect x="28" y="24" width="264" height="175" rx="12" fill="#FFFDF9" fillOpacity="0.55" stroke={dark} strokeWidth="2" />
          <line x1="160" y1="24" x2="160" y2="199" stroke={dark} strokeWidth="2" strokeOpacity="0.4" />
          {/* Rain streaks */}
          <line x1="65" y1="45" x2="55" y2="75" stroke={dark} strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
          <line x1="115" y1="55" x2="105" y2="85" stroke={dark} strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
          <line x1="220" y1="48" x2="210" y2="78" stroke={dark} strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
          {/* Smiley drawn on fogged glass */}
          <circle cx="230" cy="115" r="22" stroke={mid} strokeWidth="2.2" strokeDasharray="3 3" />
          <circle cx="223" cy="110" r="2" fill={dark} />
          <circle cx="237" cy="110" r="2" fill={dark} />
          <path d="M222 120C226 125 234 125 238 120" stroke={dark} strokeWidth="2" strokeLinecap="round" />
          {/* Two warm coffee mugs on table */}
          <path d="M20 200H300" stroke={dark} strokeWidth="2.5" />
          <rect x="92" y="166" width="38" height="34" rx="6" fill="#FFF9F3" stroke={dark} strokeWidth="2.2" />
          <path d="M130 174H137C141 174 141 190 137 190H130" stroke={dark} strokeWidth="2.2" />
          <rect x="166" y="166" width="38" height="34" rx="6" fill={mid} stroke={dark} strokeWidth="2.2" />
          <path d="M204 174H211C215 174 215 190 211 190H204" stroke={dark} strokeWidth="2.2" />
          {/* Steam hearts */}
          <path d="M110 154C107 146 115 142 112 133" stroke={dark} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M185 154C182 146 190 142 187 133" stroke={dark} strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}

      {type === 'sunset-train' && (
        <>
          {/* Sunset sky & ocean horizon */}
          <circle cx="160" cy="135" r="52" fill="#FFF4D4" />
          <path d="M0 165H320V260H0V165Z" fill={mid} fillOpacity="0.55" />
          {/* Train window frame */}
          <rect x="34" y="28" width="252" height="156" rx="18" stroke={dark} strokeWidth="3" fill="none" />
          {/* Two silhouettes leaning together */}
          <circle cx="138" cy="142" r="20" fill={dark} />
          <circle cx="174" cy="148" r="18" fill={dark} />
          <path d="M110 195C115 162 195 162 205 195" fill={dark} />
          {/* Shared headphone wire */}
          <path d="M138 148C145 175 165 175 174 152" stroke="#FFF9F3" strokeWidth="2" strokeDasharray="3 2" />
        </>
      )}

      {type === 'midnight-walk' && (
        <>
          <rect width="320" height="260" fill={dark} />
          {/* Crescent Moon */}
          <path d="M240 48C225 48 214 60 214 75C214 90 225 102 240 102C232 96 228 86 228 75C228 64 232 54 240 48Z" fill="#F4D88B" />
          {/* Stars */}
          <circle cx="65" cy="52" r="2" fill="#FFF9F3" />
          <circle cx="120" cy="38" r="2.5" fill="#F4D88B" />
          <circle cx="180" cy="66" r="1.8" fill="#FFF9F3" />
          {/* Warm streetlamp glow */}
          <line x1="88" y1="85" x2="88" y2="215" stroke="#FFF9F3" strokeWidth="3" />
          <circle cx="88" cy="85" r="10" fill="#F4D88B" />
          <polygon points="88,92 35,215 145,215" fill="#F4D88B" fillOpacity="0.18" />
          {/* Two ice cream cones */}
          <polygon points="175,165 195,165 185,202" fill="#E8C39E" stroke="#FFF9F3" strokeWidth="1.5" />
          <circle cx="185" cy="156" r="12" fill="#C5DFC9" />
          <polygon points="212,168 232,168 222,205" fill="#E8C39E" stroke="#FFF9F3" strokeWidth="1.5" />
          <circle cx="222" cy="159" r="12" fill="#D98F9B" />
        </>
      )}

      {type === 'bookshop' && (
        <>
          {/* Bookshelves */}
          <line x1="25" y1="85" x2="295" y2="85" stroke={dark} strokeWidth="3" />
          <line x1="25" y1="165" x2="295" y2="165" stroke={dark} strokeWidth="3" />
          {/* Row 1 Books */}
          <rect x="42" y="38" width="22" height="47" rx="3" fill={mid} stroke={dark} strokeWidth="1.8" />
          <rect x="68" y="44" width="18" height="41" rx="3" fill="#F4D88B" stroke={dark} strokeWidth="1.8" />
          <rect x="90" y="32" width="26" height="53" rx="3" fill="#C9B8E8" stroke={dark} strokeWidth="1.8" />
          <rect x="195" y="40" width="24" height="45" rx="3" fill="#9AB89F" stroke={dark} strokeWidth="1.8" />
          <rect x="223" y="35" width="20" height="50" rx="3" fill={mid} stroke={dark} strokeWidth="1.8" />
          {/* Open book with tucked vintage postcard in center */}
          <path d="M105 195C125 185 145 185 160 195C175 185 195 185 215 195V125C195 115 175 115 160 125C145 115 125 115 105 125V195Z" fill="#FFFDF9" stroke={dark} strokeWidth="2.2" />
          <rect x="148" y="108" width="36" height="50" rx="4" transform="rotate(8 148 108)" fill="#F4D88B" stroke={dark} strokeWidth="1.8" />
        </>
      )}

      {type === 'rooftop-stars' && (
        <>
          <rect width="320" height="260" fill={dark} />
          {/* Constellation lines */}
          <polyline points="65,65 110,48 155,75 195,45 245,70" stroke="#F4D88B" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="65" cy="65" r="4" fill="#F4D88B" />
          <circle cx="110" cy="48" r="3.5" fill="#FFF9F3" />
          <circle cx="155" cy="75" r="4.5" fill="#D98F9B" />
          <circle cx="195" cy="45" r="4" fill="#F4D88B" />
          <circle cx="245" cy="70" r="3.5" fill="#FFF9F3" />
          {/* Rooftop balustrade & cozy blanket */}
          <path d="M0 205H320" stroke="#FFF9F3" strokeWidth="2" strokeOpacity="0.4" />
          <path d="M108 205C114 152 206 152 212 205Z" fill={mid} stroke="#FFF9F3" strokeWidth="2" />
          <circle cx="144" cy="144" r="15" fill="#FFF9F3" />
          <circle cx="176" cy="146" r="14" fill="#FFF9F3" />
        </>
      )}

      {type === 'sunday-morning' && (
        <>
          {/* Sunlight blinds rays */}
          <polygon points="0,0 130,0 240,260 60,260" fill="#FFFDF9" fillOpacity="0.45" />
          {/* Stack of pancakes */}
          <ellipse cx="160" cy="190" rx="68" ry="18" fill="#FFFDF9" stroke={dark} strokeWidth="2.2" />
          <ellipse cx="160" cy="176" rx="48" ry="14" fill="#E6A58E" stroke={dark} strokeWidth="2" />
          <ellipse cx="160" cy="164" rx="45" ry="13" fill="#F0B896" stroke={dark} strokeWidth="2" />
          <ellipse cx="160" cy="152" rx="40" ry="12" fill="#E6A58E" stroke={dark} strokeWidth="2" />
          {/* Heart-shaped pat of butter on top */}
          <rect x="152" y="142" width="16" height="11" rx="3" fill="#F4D88B" stroke={dark} strokeWidth="1.6" />
        </>
      )}

      {type === 'botanical-park' && (
        <>
          {/* Glass conservatory arch */}
          <path d="M48 230V115C48 55 272 55 272 115V230" stroke={dark} strokeWidth="2.5" fill="#FFFDF9" fillOpacity="0.45" />
          <line x1="160" y1="40" x2="160" y2="230" stroke={dark} strokeWidth="1.5" strokeOpacity="0.35" />
          {/* Terracotta pot & sprouting fern */}
          <polygon points="132,175 188,175 178,225 142,225" fill="#D98F9B" stroke={dark} strokeWidth="2" />
          <path d="M160 175C160 140 125 120 115 135" stroke={dark} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M160 175C160 135 195 115 205 130" stroke={dark} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M160 175V115" stroke={dark} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="160" cy="110" r="7" fill="#F4D88B" stroke={dark} strokeWidth="1.8" />
        </>
      )}

      {type === 'late-night-drive' && (
        <>
          {/* Twilight highway & coastal moon */}
          <path d="M0 150H320V260H0V150Z" fill={dark} />
          <path d="M125 150L45 260H275L195 150H125Z" fill={mid} fillOpacity="0.4" />
          <line x1="160" y1="158" x2="160" y2="255" stroke="#F4D88B" strokeWidth="3" strokeDasharray="12 10" />
          {/* Floating musical notes in the twilight sky */}
          <circle cx="95" cy="82" r="6" fill="#F4D88B" />
          <path d="M101 82V54L122 60V88" stroke="#F4D88B" strokeWidth="2.5" />
          <circle cx="215" cy="68" r="18" fill="#FFF9F3" fillOpacity="0.85" />
        </>
      )}
    </svg>
  );
};

const StickerBadge: React.FC<{ type: MemoryItem['sticker'] }> = ({ type }) => {
  const iconMap = {
    star: <Star className="h-4 w-4 fill-[#F4D88B] text-[#392D40]" />,
    heart: <Heart className="h-4 w-4 fill-[#D98F9B] text-[#392D40]" />,
    flower: <Flower2 className="h-4 w-4 text-[#D98F9B]" />,
    sparkle: <Sparkles className="h-4 w-4 text-[#F4D88B]" />,
    coffee: <Coffee className="h-4 w-4 text-[#392D40]" />,
    moon: <Moon className="h-4 w-4 fill-[#C9B8E8] text-[#392D40]" />,
  };

  return (
    <div className="absolute -right-2.5 -bottom-2.5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#392D40]/15 bg-[#FFFDF9] shadow-md transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
      {iconMap[type]}
    </div>
  );
};

export const MemoryGallery: React.FC = () => {
  const [showExtra, setShowExtra] = useState(false);
  const [selectedMemoryIndex, setSelectedMemoryIndex] = useState<number | null>(null);

  const visibleMemories = showExtra
    ? giftConfig.memories
    : giftConfig.memories.filter((m) => !m.isExtra);

  const handleOpenModal = (idx: number) => {
    soundEngine.playChime('flip');
    setSelectedMemoryIndex(idx);
  };

  const handleCloseModal = () => {
    setSelectedMemoryIndex(null);
  };

  const handlePrev = () => {
    if (selectedMemoryIndex === null) return;
    soundEngine.playChime('flip');
    setSelectedMemoryIndex(
      (selectedMemoryIndex - 1 + visibleMemories.length) % visibleMemories.length
    );
  };

  const handleNext = () => {
    if (selectedMemoryIndex === null) return;
    soundEngine.playChime('flip');
    setSelectedMemoryIndex((selectedMemoryIndex + 1) % visibleMemories.length);
  };

  const activeMemory =
    selectedMemoryIndex !== null ? visibleMemories[selectedMemoryIndex] : null;

  return (
    <section id="section-memories" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D98F9B]/15 px-3.5 py-1 text-xs font-medium tracking-widest text-[#392D40] uppercase">
          <BookOpen className="h-3.5 w-3.5 text-[#D98F9B]" />
          Chapter I • Scrapbook
        </span>
        <h2 className="mt-3 font-serif-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#392D40]">
          Our Little Memories
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#74647D]">
          Snapshots of the moments that quietly stitched our story together. Tap any Polaroid to read the memory written on the back.
        </p>
      </div>

      {/* Polaroid Scrapbook Grid */}
      <div className="mt-14 grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3">
        {visibleMemories.map((item, idx) => {
          const tapeClass =
            item.tapeStyle === 'butter'
              ? 'washi-tape'
              : item.tapeStyle === 'rose'
              ? 'washi-tape-rose'
              : 'washi-tape-lavender';

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              style={{ rotate: `${item.tilt}deg` }}
              whileHover={{
                rotate: 0,
                y: -8,
                scale: 1.02,
                transition: { type: 'spring', stiffness: 260, damping: 20 },
              }}
              onClick={() => handleOpenModal(idx)}
              className="group relative mx-auto w-full max-w-sm rounded-xl border border-[#392D40]/12 bg-[#FFFDF9] p-3.5 pb-6 shadow-[0_18px_38px_-12px_rgba(57,45,64,0.12)] transition-shadow hover:shadow-[0_26px_50px_-12px_rgba(217,143,155,0.28)] cursor-pointer select-none"
            >
              {/* Washi Tape Strip at Top */}
              <div
                className={`${tapeClass} absolute -top-3 left-1/2 z-20 h-6 w-28 -translate-x-1/2 rotate-1 rounded-xs`}
              />

              {/* Polaroid Art Frame */}
              <div className="relative aspect-[4/3.2] w-full overflow-hidden rounded-lg border border-[#392D40]/10 bg-[#F6EFE6]">
                <PolaroidIllustration
                  type={item.illustrationType}
                  palette={item.palette}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#392D40]/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute bottom-2.5 left-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-medium text-[#392D40] opacity-0 shadow-xs transition-opacity duration-300 group-hover:opacity-100">
                  Tap to flip &amp; read story →
                </span>
              </div>

              {/* Date & Location Meta */}
              <div className="mt-3.5 flex items-center justify-between text-[11px] text-[#74647D] font-mono-code">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-[#D98F9B]" />
                  {item.date}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-[#C9B8E8]" />
                  {item.location}
                </span>
              </div>

              {/* Title & Handwritten Caption */}
              <h3 className="mt-1.5 font-serif-display text-lg font-medium text-[#392D40] group-hover:text-[#D98F9B] transition-colors">
                {item.title}
              </h3>
              <p className="mt-1 font-handwriting text-xl text-[#74647D] leading-snug">
                &ldquo;{item.caption}&rdquo;
              </p>

              {/* Corner Doodle Sticker */}
              <StickerBadge type={item.sticker} />
            </motion.div>
          );
        })}
      </div>

      {/* "See more of our little moments." Toggle Button */}
      <div className="mt-12 flex justify-center">
        <button
          type="button"
          onClick={() => {
            soundEngine.playChime('sparkle');
            setShowExtra((prev) => !prev);
          }}
          className="inline-flex items-center gap-2.5 rounded-full border border-[#D98F9B]/40 bg-white/85 px-7 py-3.5 text-sm font-medium text-[#392D40] shadow-sm backdrop-blur-md transition hover:scale-105 hover:border-[#D98F9B] hover:bg-white cursor-pointer"
        >
          <Sparkles className="h-4 w-4 text-[#D98F9B]" />
          <span>
            {showExtra
              ? 'Tuck extra moments back in'
              : 'See more of our little moments.'}
          </span>
        </button>
      </div>

      {/* Memory Timeline Sub-Section */}
      <div className="mt-24 rounded-3xl border border-[#392D40]/10 bg-white/70 p-6 sm:p-10 shadow-[0_20px_50px_-12px_rgba(57,45,64,0.06)] backdrop-blur-md">
        <div className="text-center">
          <span className="font-mono-code text-xs uppercase tracking-widest text-[#D98F9B]">
            OUR FOOTPRINTS
          </span>
          <h3 className="mt-1 font-serif-display text-2xl sm:text-3xl font-medium text-[#392D40]">
            How We Got Here
          </h3>
        </div>

        <div className="relative mt-10 grid grid-cols-1 gap-6 md:grid-cols-4">
          {giftConfig.timeline.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex flex-col justify-between rounded-2xl border border-[#392D40]/8 bg-[#FFFDF9] p-5 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-xs font-semibold text-[#D98F9B]">
                    {step.date}
                  </span>
                  <span className="rounded-full bg-[#F4D88B]/35 px-2.5 py-0.5 text-[11px] font-medium text-[#392D40]">
                    {step.badge}
                  </span>
                </div>
                <h4 className="mt-3 font-serif-display text-lg font-medium text-[#392D40]">
                  {step.title}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-[#74647D] leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-[#D98F9B]">
                <Heart className="h-3.5 w-3.5 fill-[#D98F9B]" />
                <div className="h-px flex-1 bg-[#D98F9B]/25" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Polaroid Story */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#392D40]/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl rounded-3xl border border-[#392D40]/15 bg-[#FFFDF9] p-5 sm:p-7 shadow-2xl"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close memory lightbox"
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#392D40]/10 bg-white text-[#392D40] transition hover:bg-[#D98F9B] hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Polaroid Illustration Large */}
              <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#392D40]/10">
                <PolaroidIllustration
                  type={activeMemory.illustrationType}
                  palette={activeMemory.palette}
                />
              </div>

              {/* Meta & Story */}
              <div className="mt-5">
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#74647D] font-mono-code">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#F6EFE6] px-3 py-1">
                    <Calendar className="h-3.5 w-3.5 text-[#D98F9B]" />
                    {activeMemory.date}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#F6EFE6] px-3 py-1">
                    <MapPin className="h-3.5 w-3.5 text-[#C9B8E8]" />
                    {activeMemory.location}
                  </span>
                </div>

                <h3 className="mt-3 font-serif-display text-2xl sm:text-3xl font-medium text-[#392D40]">
                  {activeMemory.title}
                </h3>

                <p className="mt-1 font-handwriting text-2xl text-[#D98F9B]">
                  &ldquo;{activeMemory.caption}&rdquo;
                </p>

                <p className="mt-4 rounded-2xl bg-[#FFF9F3] p-4 text-sm sm:text-base text-[#392D40]/90 leading-relaxed border border-[#392D40]/8">
                  {activeMemory.story}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-[#392D40]/10 pt-4">
                  <span className="font-handwriting text-lg text-[#74647D]">
                    Note: {activeMemory.moodNote}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous memory"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#392D40]/15 bg-white text-[#392D40] transition hover:border-[#D98F9B] cursor-pointer"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next memory"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#392D40]/15 bg-white text-[#392D40] transition hover:border-[#D98F9B] cursor-pointer"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
