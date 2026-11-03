import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Search,
  Sparkles,
  Key,
  Heart,
  Ticket,
  Bird,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { giftConfig, SecretObjectItem } from '../config/giftConfig';
import { useWorld } from '../context/WorldContext';

export const SecretFinder: React.FC = () => {
  const { foundSecretIds, markSecretFound, secretFinderCompleted } = useWorld();
  const [activeSecret, setActiveSecret] = useState<SecretObjectItem | null>(null);
  const [showHints, setShowHints] = useState(false);

  const handleFindObject = (item: SecretObjectItem) => {
    const isNew = !foundSecretIds.includes(item.id);
    markSecretFound(item.id);
    setActiveSecret(item);

    if (isNew && foundSecretIds.length + 1 === giftConfig.secretObjects.length) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F4D88B', '#D98F9B', '#C9B8E8'],
      });
    }
  };

  const renderObjectIcon = (icon: SecretObjectItem['icon'], isFound: boolean) => {
    const cls = `h-4 w-4 transition-transform ${
      isFound ? 'text-[#392D40]' : 'text-[#392D40]/85 group-hover:scale-125'
    }`;
    switch (icon) {
      case 'locket':
        return <Heart className={`${cls} fill-[#D98F9B]`} />;
      case 'ticket':
        return <Ticket className={`${cls} text-[#D98F9B]`} />;
      case 'origami':
        return <Bird className={`${cls} text-[#74647D]`} />;
      case 'key':
        return <Key className={`${cls} text-[#D98F9B]`} />;
      case 'star-bottle':
      default:
        return <Sparkles className={`${cls} text-[#D98F9B]`} />;
    }
  };

  return (
    <div className="mt-8 rounded-3xl border border-[#392D40]/12 bg-[#FFFDF9] p-6 sm:p-8 shadow-[0_18px_45px_-12px_rgba(57,45,64,0.08)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#392D40]/10 pb-4">
        <div>
          <span className="font-mono-code text-[11px] font-semibold uppercase tracking-widest text-[#D98F9B]">
            MINI GAME 03 • HIDDEN OBJECTS
          </span>
          <h3 className="font-serif-display text-2xl sm:text-3xl font-medium text-[#392D40]">
            Find the Secret Keepsakes
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#74647D]">
            Five tiny keepsakes are tucked inside this cozy corner. Tap each object in the scene to read the note attached to it.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowHints((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#392D40]/15 bg-[#FFF9F3] px-3.5 py-1.5 text-xs font-medium text-[#392D40] transition hover:border-[#D98F9B] cursor-pointer"
          >
            <HelpCircle className="h-3.5 w-3.5 text-[#D98F9B]" />
            <span>{showHints ? 'Hide Shimmer Hints' : 'Need a Hint?'}</span>
          </button>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F4D88B]/35 px-3.5 py-1.5 text-xs font-semibold text-[#392D40] font-mono-code">
            <Search className="h-3.5 w-3.5 text-[#D98F9B]" />
            <span>
              FOUND: {foundSecretIds.length} / {giftConfig.secretObjects.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Illustrated Cozy Study Room Scene */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="relative col-span-1 lg:col-span-2 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#392D40]/12 bg-[#F6EFE6] select-none">
          {/* Background Cozy Room SVG Illustration */}
          <svg
            viewBox="0 0 640 400"
            className="h-full w-full object-cover"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Warm wall & wooden floor */}
            <rect width="640" height="310" fill="#F9F1E7" />
            <rect y="310" width="640" height="90" fill="#EADAC7" />
            <line x1="0" y1="310" x2="640" y2="310" stroke="#392D40" strokeWidth="2" strokeOpacity="0.2" />

            {/* Left Arched Window with Twilight Sky */}
            <path
              d="M65 215V105C65 55 175 55 175 105V215H65Z"
              fill="#392D40"
              stroke="#392D40"
              strokeWidth="3"
            />
            <circle cx="135" cy="95" r="14" fill="#F4D88B" />
            <circle cx="95" cy="130" r="2" fill="#FFF9F3" />
            <circle cx="150" cy="150" r="2.5" fill="#FFF9F3" />
            <line x1="120" y1="65" x2="120" y2="215" stroke="#F9F1E7" strokeWidth="2.5" />
            <line x1="65" y1="145" x2="175" y2="145" stroke="#F9F1E7" strokeWidth="2.5" />
            {/* Windowsill */}
            <rect x="55" y="215" width="130" height="12" rx="4" fill="#D98F9B" fillOpacity="0.4" stroke="#392D40" strokeWidth="2" />

            {/* Right Bookshelf */}
            <rect x="430" y="75" width="155" height="16" rx="4" fill="#D8C3B0" stroke="#392D40" strokeWidth="2" />
            <rect x="430" y="155" width="155" height="16" rx="4" fill="#D8C3B0" stroke="#392D40" strokeWidth="2" />
            {/* Books on top shelf */}
            <rect x="446" y="35" width="18" height="40" rx="2" fill="#D98F9B" stroke="#392D40" strokeWidth="1.8" />
            <rect x="467" y="42" width="16" height="33" rx="2" fill="#C9B8E8" stroke="#392D40" strokeWidth="1.8" />
            <rect x="486" y="30" width="22" height="45" rx="2" fill="#F4D88B" stroke="#392D40" strokeWidth="1.8" />
            {/* Books on second shelf */}
            <rect x="450" y="112" width="20" height="43" rx="2" fill="#9AB89F" stroke="#392D40" strokeWidth="1.8" />
            <rect x="473" y="118" width="18" height="37" rx="2" fill="#D98F9B" stroke="#392D40" strokeWidth="1.8" />
            <rect x="525" y="115" width="24" height="40" rx="2" fill="#C9B8E8" stroke="#392D40" strokeWidth="1.8" />

            {/* Center Writing Desk & Warm Teacup */}
            <rect x="220" y="255" width="200" height="14" rx="4" fill="#D8C3B0" stroke="#392D40" strokeWidth="2" />
            <line x1="245" y1="269" x2="235" y2="355" stroke="#392D40" strokeWidth="3" />
            <line x1="395" y1="269" x2="405" y2="355" stroke="#392D40" strokeWidth="3" />
            {/* Desk Lamp */}
            <path d="M255 255L265 200L295 215" stroke="#392D40" strokeWidth="2.5" strokeLinecap="round" />
            <polygon points="285,215 312,215 304,200 290,200" fill="#F4D88B" stroke="#392D40" strokeWidth="2" />
            {/* Teacup on Desk */}
            <rect x="342" y="235" width="26" height="20" rx="5" fill="#FFFDF9" stroke="#392D40" strokeWidth="2" />

            {/* Cozy Floor Rug & Cushions */}
            <ellipse cx="320" cy="355" rx="185" ry="26" fill="#D98F9B" fillOpacity="0.28" stroke="#392D40" strokeWidth="1.8" />
            <ellipse cx="165" cy="322" rx="42" ry="18" fill="#C9B8E8" stroke="#392D40" strokeWidth="2" />

            {/* Right Botanical Plant Pot */}
            <polygon points="510,275 560,275 550,335 520,335" fill="#D98F9B" stroke="#392D40" strokeWidth="2" />
            <path d="M535 275C535 240 505 225 495 235" stroke="#588561" strokeWidth="3" strokeLinecap="round" />
            <path d="M535 275C535 235 565 220 575 232" stroke="#588561" strokeWidth="3" strokeLinecap="round" />
          </svg>

          {/* Interactive Hidden Keepsake Hotspots */}
          {giftConfig.secretObjects.map((obj) => {
            const isFound = foundSecretIds.includes(obj.id);
            return (
              <button
                key={obj.id}
                type="button"
                onClick={() => handleFindObject(obj)}
                style={{
                  left: `${obj.xPercent}%`,
                  top: `${obj.yPercent}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                title={showHints ? obj.hint : 'Something is tucked here...'}
                className={`group absolute z-20 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${
                  isFound
                    ? 'border-2 border-[#9AB89F] bg-white shadow-md scale-105'
                    : showHints
                    ? 'border-2 border-[#F4D88B] bg-[#FFFDF9]/95 shadow-lg animate-bounce'
                    : 'border border-[#392D40]/20 bg-[#FFFDF9]/75 hover:bg-white hover:scale-125 shadow-xs'
                }`}
              >
                {renderObjectIcon(obj.icon, isFound)}
                {isFound && (
                  <span className=" -top-1 -right-1 absolute flex h-4 w-4 items-center justify-center rounded-full bg-[#9AB89F] text-[9px] text-white">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Side Checklist & Revealed Message Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#392D40]/10 bg-[#FFF9F3] p-5">
          <div>
            <h4 className="font-mono-code text-xs font-semibold uppercase tracking-wider text-[#74647D]">
              KEEPSAKE CHECKLIST
            </h4>

            <div className="mt-3 space-y-2">
              {giftConfig.secretObjects.map((obj) => {
                const isFound = foundSecretIds.includes(obj.id);
                const isSelected = activeSecret?.id === obj.id;
                return (
                  <button
                    key={obj.id}
                    type="button"
                    onClick={() => {
                      if (isFound) setActiveSecret(obj);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-xs transition ${
                      isFound
                        ? isSelected
                          ? 'border-[#D98F9B] bg-white font-semibold text-[#392D40] shadow-xs cursor-pointer'
                          : 'border-[#9AB89F]/50 bg-white/80 text-[#392D40] cursor-pointer hover:bg-white'
                        : 'border-dashed border-[#392D40]/15 bg-transparent text-[#74647D]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isFound ? (
                        <CheckCircle2 className="h-4 w-4 text-[#588561]" />
                      ) : (
                        <div className="h-3.5 w-3.5 rounded-full border border-[#74647D]/50" />
                      )}
                      <span>{isFound ? obj.name : showHints ? obj.hint : 'Hidden Keepsake ???'}</span>
                    </div>
                    {isFound && (
                      <span className="text-[10px] text-[#D98F9B]">Read note</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Object Message or Master Message */}
          <div className="mt-5">
            <AnimatePresence mode="wait">
              {activeSecret ? (
                <motion.div
                  key={activeSecret.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="rounded-xl border border-[#D98F9B]/35 bg-white p-4 shadow-xs"
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D98F9B]">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{activeSecret.name}</span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#392D40] leading-relaxed">
                    {activeSecret.message}
                  </p>
                </motion.div>
              ) : (
                <div className="rounded-xl border border-dashed border-[#392D40]/15 p-4 text-center text-xs text-[#74647D]">
                  Tap any hidden object inside the room illustration to inspect its secret message.
                </div>
              )}
            </AnimatePresence>

            {secretFinderCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 rounded-xl border border-[#F4D88B] bg-gradient-to-r from-[#FFFDF7] to-[#FDF2D0] p-4 shadow-xs"
              >
                <p className="font-mono-code text-[10px] font-bold uppercase tracking-wider text-[#D98F9B]">
                  ★ ALL 5 SECRETS DISCOVERED ★
                </p>
                <p className="mt-1 text-xs text-[#392D40] leading-relaxed">
                  {giftConfig.secretMasterMessage}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
