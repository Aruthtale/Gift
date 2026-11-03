import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Compass, ArrowDown, Stars } from 'lucide-react';
import { giftConfig, fillText } from '../config/giftConfig';
import { features, nextLiveSection } from '../config/features';
import { useWorld } from '../context/WorldContext';
import { FloatingElements } from './BackgroundEffects';
import { soundEngine } from '../utils/soundEngine';

export const HeroSection: React.FC = () => {
  const { recipientName, senderName, unlockEasterEgg } = useWorld();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [characterMood, setCharacterMood] = useState<'normal' | 'blush' | 'secret-hug'>('normal');
  const [, setTapCount] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: normX, y: normY });
  };

  const triggerSecretCharacterAnimation = () => {
    setCharacterMood('secret-hug');
    soundEngine.playChime('unlock');
    confetti({
      particleCount: 40,
      spread: 65,
      origin: { y: 0.45 },
      colors: ['#D98F9B', '#F4D88B', '#C9B8E8'],
    });
    unlockEasterEgg(
      'hero-character-hug',
      giftConfig.hero.characterSecretToastTitle,
      giftConfig.hero.characterDoubleClickSecret
    );
    window.setTimeout(() => {
      setCharacterMood('normal');
    }, 5000);
  };

  const handleCharacterClick = () => {
    soundEngine.playChime('heart');
    setCharacterMood((prev) => (prev === 'secret-hug' ? 'secret-hug' : 'blush'));
    setTapCount((prev) => {
      const next = prev + 1;
      if (next === 2) {
        triggerSecretCharacterAnimation();
      }
      return next;
    });
    window.setTimeout(() => {
      setTapCount(0);
    }, 450);
  };

  const handleCharacterDoubleClick = () => {
    triggerSecretCharacterAnimation();
  };

  const names = { sender: senderName, recipient: recipientName };
  // Badge text comes from giftConfig.hero.badge; the recipient name stays highlighted.
  const badgeLabel = fillText(giftConfig.hero.badge, names);
  const [badgeBefore, badgeAfter] = badgeLabel.split(recipientName);

  return (
    <section
      id="section-hero"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[92vh] w-full flex-col items-center justify-center overflow-hidden px-4 pt-16 pb-20 sm:px-6 lg:px-8"
    >
      {/* Parallax Decorative Elements */}
      <FloatingElements mouseOffset={mouseOffset} />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Recipient Personalized Pill Badge */}
        {features.heroBadge && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D98F9B]/35 bg-white/80 px-4 py-1.5 text-xs sm:text-sm font-medium text-[#392D40] shadow-xs backdrop-blur-md"
          >
            <Stars className="h-4 w-4 text-[#D98F9B]" />
            <span>
              {badgeBefore}
              <strong className="font-semibold text-[#D98F9B]">{recipientName}</strong>
              {badgeAfter ?? ''}
            </span>
            <span className="text-[#74647D]">•</span>
            <span className="font-mono-code text-[11px] text-[#74647D]">{giftConfig.date}</span>
          </motion.div>
        )}

        {/* Main Hero Headings */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif-display text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-[#392D40] leading-[1.08]"
        >
          {giftConfig.hero.title}{' '}
          <span className="italic font-normal text-[#D98F9B]">{recipientName}.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 font-serif-display text-2xl sm:text-3xl text-[#392D40]/90 italic"
        >
          &ldquo;{giftConfig.hero.subtitle}&rdquo;
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-4 max-w-xl text-sm sm:text-base text-[#74647D] leading-relaxed"
        >
          {giftConfig.hero.description}
        </motion.p>

        {/* Interactive Little Character Vignette (Parallax + Double-click Easter Egg) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{
            transform: `translate3d(${mouseOffset.x * 14}px, ${mouseOffset.y * 12}px, 0)`,
          }}
          className="relative mt-10 mb-8 flex flex-col items-center"
        >
          <div
            onClick={handleCharacterClick}
            onDoubleClick={handleCharacterDoubleClick}
            role="button"
            tabIndex={0}
            aria-label="Double click the cozy characters for a secret surprise"
            onKeyDown={(e) => {
              if (e.key === 'Enter') triggerSecretCharacterAnimation();
            }}
            className="group relative flex flex-col items-center rounded-3xl border border-[#392D40]/10 bg-white/80 px-8 pt-7 pb-5 shadow-[0_20px_50px_-12px_rgba(57,45,64,0.1)] backdrop-blur-md transition-all duration-300 hover:border-[#D98F9B]/50 hover:shadow-[0_24px_60px_-12px_rgba(217,143,155,0.25)] cursor-pointer select-none"
          >
            {/* Washi Tape on Top */}
            <div className="washi-tape absolute -top-3 left-1/2 h-6 w-28 -translate-x-1/2 -rotate-2 rounded-xs" />

            {/* Floating hearts when blushing or hugging */}
            <AnimatePresence>
              {characterMood !== 'normal' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: -12, scale: 1 }}
                  exit={{ opacity: 0, y: -24 }}
                  className="pointer-events-none absolute -top-8 flex items-center gap-2 rounded-full border border-[#D98F9B]/40 bg-[#FFFDF9] px-3.5 py-1 text-xs font-medium text-[#D98F9B] shadow-sm"
                >
                  <Heart className="h-3.5 w-3.5 fill-[#D98F9B]" />
                  <span>
                    {characterMood === 'secret-hug'
                      ? `${senderName} & ${recipientName}: Secret Hug Mode!`
                      : giftConfig.hero.characterSecretHintHover}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Custom Hand-Crafted Couple / Companion SVG Illustration */}
            <svg
              width="230"
              height="145"
              viewBox="0 0 230 145"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible"
            >
              {/* Soft Moon / Sun Halo Behind */}
              <circle cx="115" cy="76" r="56" fill="#FFF4DE" />
              <circle cx="115" cy="76" r="44" fill="#FBE8D3" fillOpacity="0.6" />

              {/* Little grassy hill */}
              <path
                d="M20 128C65 114 165 114 210 128"
                stroke="#9AB89F"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Left Character (Sender) */}
              <motion.g
                animate={
                  characterMood === 'secret-hug'
                    ? { x: 14, rotate: 5 }
                    : { y: [0, -3, 0] }
                }
                transition={{
                  duration: characterMood === 'secret-hug' ? 0.4 : 3.2,
                  repeat: characterMood === 'secret-hug' ? 0 : Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Body */}
                <path
                  d="M66 125C66 101 102 101 102 125Z"
                  fill="#C9B8E8"
                  stroke="#392D40"
                  strokeWidth="2.2"
                />
                {/* Head */}
                <circle
                  cx="84"
                  cy="82"
                  r="21"
                  fill="#FFFDF9"
                  stroke="#392D40"
                  strokeWidth="2.2"
                />
                {/* Hair / Beret detail */}
                <path
                  d="M65 75C68 61 98 59 104 74"
                  stroke="#392D40"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Eyes */}
                {characterMood === 'secret-hug' ? (
                  <>
                    <path d="M75 81C77 78 80 78 82 81" stroke="#392D40" strokeWidth="2" strokeLinecap="round" />
                    <path d="M88 81C90 78 93 78 95 81" stroke="#392D40" strokeWidth="2" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <circle cx="78" cy="81" r="2.2" fill="#392D40" />
                    <circle cx="91" cy="81" r="2.2" fill="#392D40" />
                  </>
                )}
                {/* Rosy Cheeks */}
                <circle cx="73" cy="86" r="4" fill="#D98F9B" fillOpacity="0.55" />
                <circle cx="96" cy="86" r="4" fill="#D98F9B" fillOpacity="0.55" />
                {/* Gentle Smile */}
                <path
                  d="M81 87C83 90 87 90 89 87"
                  stroke="#392D40"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </motion.g>

              {/* Right Character (Recipient) */}
              <motion.g
                animate={
                  characterMood === 'secret-hug'
                    ? { x: -14, rotate: -5 }
                    : { y: [0, -3.5, 0] }
                }
                transition={{
                  duration: characterMood === 'secret-hug' ? 0.4 : 3.2,
                  delay: 0.2,
                  repeat: characterMood === 'secret-hug' ? 0 : Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Body */}
                <path
                  d="M128 125C128 101 164 101 164 125Z"
                  fill="#D98F9B"
                  stroke="#392D40"
                  strokeWidth="2.2"
                />
                {/* Head */}
                <circle
                  cx="146"
                  cy="84"
                  r="20"
                  fill="#FFFDF9"
                  stroke="#392D40"
                  strokeWidth="2.2"
                />
                {/* Little Sprout/Flower on Head */}
                <path d="M146 64V55" stroke="#9AB89F" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx="146" cy="53" r="4" fill="#F4D88B" stroke="#392D40" strokeWidth="1.5" />
                {/* Eyes */}
                {characterMood !== 'normal' ? (
                  <>
                    <path d="M137 83C139 80 142 80 144 83" stroke="#392D40" strokeWidth="2" strokeLinecap="round" />
                    <path d="M149 83C151 80 154 80 156 83" stroke="#392D40" strokeWidth="2" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <circle cx="140" cy="83" r="2.2" fill="#392D40" />
                    <circle cx="152" cy="83" r="2.2" fill="#392D40" />
                  </>
                )}
                {/* Rosy Cheeks */}
                <circle cx="135" cy="88" r="4.2" fill="#D98F9B" fillOpacity="0.65" />
                <circle cx="157" cy="88" r="4.2" fill="#D98F9B" fillOpacity="0.65" />
                {/* Smile */}
                <path
                  d="M142 89C144 92 148 92 150 89"
                  stroke="#392D40"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </motion.g>

              {/* Floating Heart Between Them */}
              <motion.path
                animate={{
                  y: characterMood === 'secret-hug' ? [-2, -16, -6] : [0, -6, 0],
                  scale: characterMood === 'secret-hug' ? [1, 1.35, 1.15] : [1, 1.08, 1],
                }}
                transition={{ duration: 2.2, repeat: Infinity }}
                d="M115 56C115 56 106 49 106 43C106 39.5 109 37 112 37C113.8 37 115 38.2 115 39.5C115 38.2 116.2 37 118 37C121 37 124 39.5 124 43C124 49 115 56 115 56Z"
                fill="#D98F9B"
                stroke="#392D40"
                strokeWidth="1.8"
              />
            </svg>

            <div className="mt-2 flex items-center gap-2 text-xs text-[#74647D]">
              <span className="font-handwriting text-lg text-[#392D40]">
                {senderName} &amp; {recipientName}
              </span>
              <span>•</span>
              <span className="text-[11px] text-[#D98F9B] group-hover:underline">
                {giftConfig.hero.characterSecretHint}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={nextLiveSection()}
            onClick={() => soundEngine.playChime('sparkle')}
            className="inline-flex items-center gap-2.5 rounded-full bg-[#392D40] px-7 py-3.5 text-sm font-medium text-[#FFF9F3] shadow-[0_12px_28px_-8px_rgba(57,45,64,0.3)] transition hover:scale-105 hover:bg-[#4d3d56]"
          >
            <Compass className="h-4 w-4 text-[#F4D88B]" />
            <span>{giftConfig.hero.ctaPrimary}</span>
            <ArrowDown className="h-4 w-4 opacity-75" />
          </a>

          {features.games && (
            <a
              href="#section-games"
              onClick={() => soundEngine.playChime('flip')}
              className="inline-flex items-center gap-2 rounded-full border border-[#392D40]/15 bg-white/80 px-6 py-3.5 text-sm font-medium text-[#392D40] shadow-xs backdrop-blur-md transition hover:border-[#D98F9B] hover:bg-white"
            >
              <Sparkles className="h-4 w-4 text-[#D98F9B]" />
              <span>{giftConfig.hero.ctaSecondary}</span>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
};
