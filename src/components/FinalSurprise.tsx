import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Gift, RotateCcw, Heart, Stars, LockOpen } from 'lucide-react';
import { giftConfig, fillText } from '../config/giftConfig';
import { features } from '../config/features';
import { useWorld } from '../context/WorldContext';
import { soundEngine } from '../utils/soundEngine';

export const FinalSurprise: React.FC = () => {
  const {
    finalBoxOpened,
    markFinalBoxOpened,
    replayWorld,
    senderName,
    recipientName,
    allGamesCompleted,
    discoveryPercentage,
  } = useWorld();

  const [isOpened, setIsOpened] = useState(finalBoxOpened);
  const [showSecretCapsule, setShowSecretCapsule] = useState(false);

  const names = { sender: senderName, recipient: recipientName };

  // Keep the box in sync with the world state so "Replay our little world" re-closes it
  React.useEffect(() => {
    setIsOpened(finalBoxOpened);
    if (!finalBoxOpened) setShowSecretCapsule(false);
  }, [finalBoxOpened]);

  const handleOpenBox = () => {
    setIsOpened(true);
    markFinalBoxOpened();

    // Cinematic multi-burst confetti celebration
    confetti({
      particleCount: 75,
      spread: 85,
      origin: { y: 0.58 },
      colors: ['#F4D88B', '#D98F9B', '#C9B8E8', '#FFF9F3'],
    });

    window.setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 60,
        spread: 60,
        origin: { x: 0.15, y: 0.65 },
        colors: ['#F4D88B', '#D98F9B', '#C9B8E8'],
      });
      confetti({
        particleCount: 45,
        angle: 120,
        spread: 60,
        origin: { x: 0.85, y: 0.65 },
        colors: ['#F4D88B', '#D98F9B', '#C9B8E8'],
      });
    }, 450);
  };

  return (
    <section
      id="section-finale"
      className="relative mt-16 min-h-[88vh] w-full overflow-hidden rounded-t-[3rem] bg-gradient-to-b from-[#2A2033] via-[#211829] to-[#16101C] px-4 py-28 text-[#FFF9F3] sm:px-6 lg:px-8"
    >
      {/* Twinkling Starfield Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(28)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.15, 0.9, 0.15],
              scale: [0.85, 1.2, 0.85],
            }}
            transition={{
              duration: 2.8 + (i % 4),
              repeat: Infinity,
              delay: i * 0.2,
            }}
            style={{
              left: `${5 + ((i * 19) % 90)}%`,
              top: `${6 + ((i * 29) % 85)}%`,
            }}
            className="absolute h-1.5 w-1.5 rounded-full bg-[#F4D88B]"
          />
        ))}

        {/* Soft Starry Nebula Glows */}
        <div
          className="absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(217,143,155,0.45) 0%, rgba(33,24,41,0) 70%)',
          }}
        />
        <div
          className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(201,184,232,0.4) 0%, rgba(33,24,41,0) 70%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        {features.finaleEyebrow && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F4D88B]/30 bg-white/10 px-4 py-1 text-xs font-medium tracking-widest text-[#F4D88B] uppercase backdrop-blur-md">
            <Stars className="h-3.5 w-3.5" />
            {giftConfig.finalSurprise.eyebrow}
          </span>
        )}

        <AnimatePresence mode="wait">
          {!isOpened ? (
            /* CLOSED GIFT BOX STATE */
            <motion.div
              key="closed-gift-box"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-10 flex flex-col items-center"
            >
              <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#FFF9F3]">
                {fillText(giftConfig.finalSurprise.closedHeadline, names)}
              </h2>
              <p className="mt-3 max-w-md text-sm sm:text-base text-[#C9B8E8]/90">
                {giftConfig.finalSurprise.closedSubtext}
              </p>

              {/* Interactive Glowing Keepsake Gift Box */}
              <motion.div
                onClick={handleOpenBox}
                whileHover={{ scale: 1.06, rotate: -2 }}
                whileTap={{ scale: 0.96 }}
                className="group relative my-12 flex flex-col items-center cursor-pointer select-none"
              >
                <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-[#F4D88B]/35 via-[#D98F9B]/35 to-[#C9B8E8]/35 blur-2xl transition-all duration-500 group-hover:scale-125" />

                <svg width="170" height="170" viewBox="0 0 170 170" fill="none" className="relative z-10 overflow-visible">
                  {/* Ribbon Loops */}
                  <path
                    d="M85 46C65 18 38 28 52 46C62 56 85 46 85 46Z"
                    fill="#F4D88B"
                    stroke="#392D40"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M85 46C105 18 132 28 118 46C108 56 85 46 85 46Z"
                    fill="#F4D88B"
                    stroke="#392D40"
                    strokeWidth="2.5"
                  />
                  {/* Box Lid */}
                  <rect
                    x="26"
                    y="46"
                    width="118"
                    height="26"
                    rx="6"
                    fill="#D98F9B"
                    stroke="#392D40"
                    strokeWidth="2.5"
                  />
                  {/* Box Base */}
                  <rect
                    x="34"
                    y="72"
                    width="102"
                    height="76"
                    rx="8"
                    fill="#FFF9F3"
                    stroke="#392D40"
                    strokeWidth="2.5"
                  />
                  {/* Vertical & Horizontal Golden Ribbons */}
                  <rect x="76" y="46" width="18" height="102" fill="#F4D88B" stroke="#392D40" strokeWidth="2" />
                  <rect x="34" y="101" width="102" height="16" fill="#F4D88B" stroke="#392D40" strokeWidth="2" />
                  {/* Floating Sparkles */}
                  <circle cx="22" cy="34" r="4" fill="#F4D88B" />
                  <circle cx="148" cy="40" r="3.5" fill="#C9B8E8" />
                </svg>
              </motion.div>

              <motion.button
                type="button"
                onClick={handleOpenBox}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#F4D88B] via-[#F7E2A4] to-[#D98F9B] px-9 py-4 text-base font-semibold text-[#392D40] shadow-[0_14px_35px_-6px_rgba(244,216,139,0.45)] transition cursor-pointer"
              >
                <Gift className="h-5 w-5" />
                <span>{giftConfig.finalSurprise.buttonText}</span>
              </motion.button>
            </motion.div>
          ) : (
            /* OPENED CLIMAX MESSAGE STATE */
            <motion.div
              key="opened-climax"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-col items-center"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#F4D88B]/50 bg-[#F4D88B]/20 text-[#F4D88B] shadow-lg">
                <Heart className="h-8 w-8 fill-[#D98F9B] text-[#F4D88B]" />
              </div>

              <p className="font-handwriting text-2xl sm:text-3xl text-[#F4D88B]">
                {giftConfig.finalSurprise.preHeadline}
              </p>

              {/* Grand Climax Quote */}
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.8 }}
                className="mt-4 max-w-3xl font-serif-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#FFF9F3] leading-[1.14]"
              >
                &ldquo;{giftConfig.finalSurprise.mainQuote}&rdquo;
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.8 }}
                className="mt-6 max-w-xl text-sm sm:text-base text-[#C9B8E8] leading-relaxed"
              >
                {giftConfig.finalSurprise.subMessage}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
                className="mt-4 font-handwriting text-3xl text-[#D98F9B]"
              >
                {fillText(giftConfig.finalSurprise.signOff, names)}
              </motion.div>

              {/* Conditional Secret Button (Unlocked when the games chapter is off, all mini-games are completed, or discovery >= 70%) */}
              {(!features.games || allGamesCompleted || discoveryPercentage >= 70) && (
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playChime('unlock');
                      setShowSecretCapsule((prev) => !prev);
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-[#F4D88B]/60 bg-[#F4D88B]/15 px-5 py-2.5 text-xs font-semibold text-[#F4D88B] backdrop-blur-md transition hover:bg-[#F4D88B]/25 cursor-pointer"
                  >
                    <LockOpen className="h-4 w-4" />
                    <span>
                      {showSecretCapsule
                        ? giftConfig.finalSurprise.capsuleClose
                        : giftConfig.finalSurprise.capsuleOpen}
                    </span>
                  </button>

                  <AnimatePresence>
                    {showSecretCapsule && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mx-auto mt-4 max-w-lg rounded-2xl border border-[#F4D88B]/40 bg-white/10 p-5 text-left backdrop-blur-md"
                      >
                        <p className="font-mono-code text-[11px] uppercase tracking-widest text-[#F4D88B]">
                          {giftConfig.finalSurprise.capsuleEyebrow}
                        </p>
                        <p className="mt-2 text-xs sm:text-sm text-[#FFF9F3] leading-relaxed">
                          {giftConfig.finalSurprise.capsuleBody}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Replay Our Little World Button */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={replayWorld}
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#FFF9F3] px-8 py-4 text-sm font-semibold text-[#392D40] shadow-lg transition hover:scale-105 hover:bg-[#F4D88B] cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4 text-[#D98F9B]" />
                  <span>{giftConfig.finalSurprise.replayButtonText}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playChime('sparkle');
                    confetti({
                      particleCount: 50,
                      spread: 75,
                      origin: { y: 0.6 },
                      colors: ['#F4D88B', '#D98F9B', '#C9B8E8'],
                    });
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-4 text-sm font-medium text-[#FFF9F3] backdrop-blur-md transition hover:bg-white/20 cursor-pointer"
                >
                  <Sparkles className="h-4 w-4 text-[#F4D88B]" />
                  <span>{giftConfig.finalSurprise.starlightButton}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
