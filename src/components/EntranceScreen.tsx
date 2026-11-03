import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Volume2, VolumeX, Heart, Stars } from 'lucide-react';
import { giftConfig } from '../config/giftConfig';
import { useWorld } from '../context/WorldContext';
import { soundEngine } from '../utils/soundEngine';

export const EntranceScreen: React.FC = () => {
  const { openWorld, senderName, recipientName } = useWorld();
  const [stage, setStage] = useState<'idle' | 'opening' | 'rising'>('idle');
  const [isMuted, setIsMuted] = useState(soundEngine.getState().isMuted);

  useEffect(() => {
    return soundEngine.subscribe(() => {
      setIsMuted(soundEngine.getState().isMuted);
    });
  }, []);

  const handleOpenClick = () => {
    if (stage !== 'idle') return;
    setStage('opening');
    soundEngine.playChime('unlock');

    // Fire soft romantic confetti in our custom palette
    confetti({
      particleCount: 55,
      spread: 70,
      origin: { y: 0.58 },
      colors: ['#D98F9B', '#C9B8E8', '#F4D88B', '#FFF9F3'],
    });

    window.setTimeout(() => {
      setStage('rising');
      confetti({
        particleCount: 35,
        angle: 60,
        spread: 55,
        origin: { x: 0.25, y: 0.6 },
        colors: ['#D98F9B', '#C9B8E8', '#F4D88B'],
      });
      confetti({
        particleCount: 35,
        angle: 120,
        spread: 55,
        origin: { x: 0.75, y: 0.6 },
        colors: ['#D98F9B', '#C9B8E8', '#F4D88B'],
      });
    }, 650);

    window.setTimeout(() => {
      openWorld();
    }, 1750);
  };

  const handleToggleSound = () => {
    soundEngine.toggleMute();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#FFF9F3] via-[#FDF4EC] to-[#F6EFE6] px-4 py-8 text-[#392D40]"
    >
      {/* Ambient floating stars & sparkles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0.25,
              y: (i % 5) * 10,
            }}
            animate={{
              opacity: [0.2, 0.75, 0.2],
              y: [0, -14, 0],
              rotate: [0, 12, -12, 0],
            }}
            transition={{
              duration: 3.5 + (i % 4),
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
            style={{
              left: `${8 + ((i * 17) % 84)}%`,
              top: `${10 + ((i * 23) % 78)}%`,
            }}
            className="absolute"
          >
            {i % 3 === 0 ? (
              <Sparkles className="h-4 w-4 text-[#F4D88B]" />
            ) : i % 3 === 1 ? (
              <Heart className="h-3.5 w-3.5 fill-[#D98F9B]/40 text-[#D98F9B]/70" />
            ) : (
              <div className="h-2 w-2 rounded-full bg-[#C9B8E8]/70" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Top Bar: Postage label & Mute/Unmute Toggle */}
      <div className="relative z-20 flex w-full max-w-4xl items-center justify-between">
        <div className="flex items-center gap-2 rounded-full border border-[#392D40]/10 bg-white/75 px-3.5 py-1.5 text-xs tracking-wider text-[#74647D] shadow-xs backdrop-blur-md font-mono-code">
          <Stars className="h-3.5 w-3.5 text-[#D98F9B]" />
          <span>FOR {recipientName.toUpperCase()}</span>
        </div>

        <button
          type="button"
          onClick={handleToggleSound}
          className="flex items-center gap-2 rounded-full border border-[#392D40]/12 bg-white/80 px-4 py-2 text-xs font-medium text-[#392D40] shadow-xs backdrop-blur-md transition hover:border-[#D98F9B] hover:bg-white cursor-pointer"
        >
          {isMuted ? (
            <>
              <VolumeX className="h-4 w-4 text-[#74647D]" />
              <span>Sound Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="h-4 w-4 text-[#D98F9B]" />
              <span>Music Ready</span>
            </>
          )}
        </button>
      </div>

      {/* Center Interactive Envelope & Headline */}
      <div className="relative z-10 my-auto flex max-w-xl flex-col items-center text-center py-8">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#C9B8E8]/25 px-3.5 py-1 text-xs font-medium tracking-widest text-[#74647D] uppercase"
        >
          <Sparkles className="h-3 w-3 text-[#D98F9B]" />
          {giftConfig.entrance.eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#392D40] leading-[1.15]"
        >
          Someone made something special for you.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-3 max-w-md text-sm sm:text-base text-[#74647D] leading-relaxed"
        >
          {giftConfig.entrance.subtext}
        </motion.p>

        {/* Interactive Tactile Envelope Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, type: 'spring', stiffness: 180, damping: 18 }}
          onClick={handleOpenClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleOpenClick();
          }}
          aria-label="Open your little surprise envelope"
          className="group relative mt-10 mb-8 flex flex-col items-center cursor-pointer select-none"
        >
          {/* Soft butter/rose aura behind envelope */}
          <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-[#D98F9B]/25 via-[#F4D88B]/30 to-[#C9B8E8]/30 blur-2xl transition-all duration-500 group-hover:scale-110 group-hover:opacity-95" />

          {/* Envelope Container */}
          <div className="relative h-56 w-80 sm:h-64 sm:w-96">
            {/* Back of Envelope */}
            <div className="absolute inset-0 rounded-2xl border border-[#392D40]/15 bg-[#F4E9DC] shadow-[0_24px_50px_-12px_rgba(57,45,64,0.16)]" />

            {/* Rising Letter Inside Envelope */}
            <motion.div
              animate={
                stage === 'rising'
                  ? { y: -86, scale: 1.03, rotate: -1 }
                  : stage === 'opening'
                  ? { y: -32 }
                  : { y: 8 }
              }
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-5 top-4 bottom-5 z-10 flex flex-col items-center justify-between rounded-xl border border-[#D98F9B]/30 bg-[#FFFDF9] p-5 shadow-md"
            >
              <div className="flex w-full items-center justify-between border-b border-[#392D40]/10 pb-2 text-[11px] text-[#74647D] font-mono-code">
                <span>TO: {recipientName}</span>
                <span>FROM: {senderName}</span>
              </div>

              <div className="my-auto text-center">
                <p className="font-handwriting text-2xl sm:text-3xl text-[#392D40]">
                  &ldquo;A little world, made entirely for you.&rdquo;
                </p>
                <p className="mt-1 text-xs text-[#D98F9B] font-medium tracking-wide">
                  ★ {giftConfig.entrance.stampLabel} ★
                </p>
              </div>

              <div className="h-1.5 w-16 rounded-full bg-[#F4D88B]/60" />
            </motion.div>

            {/* Envelope Side & Bottom Pocket Flaps (SVG) */}
            <svg
              viewBox="0 0 384 256"
              className="pointer-events-none absolute inset-0 z-20 h-full w-full rounded-2xl overflow-hidden"
            >
              {/* Left Flap */}
              <polygon points="0,0 192,138 0,256" fill="#EFE1D1" stroke="rgba(57,45,64,0.08)" strokeWidth="1" />
              {/* Right Flap */}
              <polygon points="384,0 192,138 384,256" fill="#EAD9C7" stroke="rgba(57,45,64,0.08)" strokeWidth="1" />
              {/* Bottom Flap */}
              <polygon points="0,256 192,126 384,256" fill="#F8EFE4" stroke="rgba(57,45,64,0.1)" strokeWidth="1" />
            </svg>

            {/* Top Flap (Animated 3D Unfold) */}
            <motion.div
              style={{ transformOrigin: 'top center' }}
              animate={
                stage === 'idle'
                  ? { rotateX: 0, zIndex: 30 }
                  : { rotateX: 180, zIndex: 5 }
              }
              transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
              className="pointer-events-none absolute inset-x-0 top-0 h-36"
            >
              <svg viewBox="0 0 384 148" className="h-full w-full overflow-visible">
                <polygon
                  points="0,0 384,0 192,142"
                  fill="#E5D2BE"
                  stroke="rgba(57,45,64,0.12)"
                  strokeWidth="1.2"
                />
              </svg>
            </motion.div>

            {/* Wax Seal Button in Center */}
            <AnimatePresence>
              {stage === 'idle' && (
                <motion.div
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-[52%] left-1/2 z-40 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#F4D88B]/80 bg-gradient-to-br from-[#D98F9B] to-[#B66674] text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <div className="flex h-12 w-12 flex-col items-center justify-center rounded-full border border-white/40 text-center">
                      <Heart className="h-4 w-4 fill-white/90 text-white" />
                      <span className="mt-0.5 text-[9px] font-semibold tracking-tighter font-mono-code">
                        {giftConfig.waxSealInitials}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Handwritten Corner Stamp */}
            <div className="pointer-events-none absolute right-4 bottom-3 z-30 font-handwriting text-base text-[#74647D]">
              deliver with care ♡
            </div>
          </div>
        </motion.div>

        {/* Primary CTA Button */}
        <motion.button
          type="button"
          onClick={handleOpenClick}
          disabled={stage !== 'idle'}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="relative z-20 inline-flex items-center gap-3 rounded-full bg-[#392D40] px-8 py-4 text-sm sm:text-base font-medium text-[#FFF9F3] shadow-[0_14px_30px_-8px_rgba(57,45,64,0.35)] transition-all hover:bg-[#4c3c55] cursor-pointer disabled:opacity-60"
        >
          <Sparkles className="h-4 w-4 text-[#F4D88B]" />
          <span>
            {stage === 'idle'
              ? giftConfig.entrance.buttonText
              : 'Opening your little world...'}
          </span>
        </motion.button>
      </div>

      {/* Bottom Whisper */}
      <div className="relative z-10 text-center">
        <p className="font-handwriting text-lg text-[#74647D]">
          Made with love by {senderName} • Turn on sound for the full experience
        </p>
      </div>
    </motion.div>
  );
};
