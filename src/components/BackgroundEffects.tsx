import React, { useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { giftConfig } from '../config/giftConfig';
import { useWorld } from '../context/WorldContext';

export const BackgroundEffects: React.FC = () => {
  const { unlockEasterEgg, isWorldOpened } = useWorld();
  const [floatingWhisperIndex, setFloatingWhisperIndex] = useState<number | null>(null);
  const [whisperPos, setWhisperPos] = useState({ x: 82, y: 28 });

  useEffect(() => {
    if (!isWorldOpened) return;
    // Periodically spawn a tiny clickable floating starlight whisper
    const timer = window.setInterval(() => {
      const randomIdx = Math.floor(Math.random() * giftConfig.hero.floatingWhispers.length);
      setFloatingWhisperIndex(randomIdx);
      setWhisperPos({
        x: Math.floor(12 + Math.random() * 76),
        y: Math.floor(18 + Math.random() * 62),
      });
    }, 19000);

    // Initial spawn after 6 seconds
    const firstTimer = window.setTimeout(() => {
      setFloatingWhisperIndex(0);
    }, 6000);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(firstTimer);
    };
  }, [isWorldOpened]);

  const handleWhisperClick = () => {
    if (floatingWhisperIndex === null) return;
    const msg = giftConfig.hero.floatingWhispers[floatingWhisperIndex];
    unlockEasterEgg(
      `floating-whisper-${floatingWhisperIndex}`,
      'Caught a Drifting Whisper ✨',
      msg
    );
    setFloatingWhisperIndex(null);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Soft radial gradient washes */}
      <div
        className="absolute -top-36 -left-36 h-[32rem] w-[32rem] rounded-full opacity-45 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(217,143,155,0.28) 0%, rgba(255,249,243,0) 70%)',
        }}
      />
      <div
        className="absolute top-1/3 -right-36 h-[34rem] w-[34rem] rounded-full opacity-45 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(201,184,232,0.32) 0%, rgba(255,249,243,0) 70%)',
        }}
      />
      <div
        className="absolute -bottom-32 left-1/4 h-[28rem] w-[28rem] rounded-full opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(244,216,139,0.28) 0%, rgba(255,249,243,0) 70%)',
        }}
      />

      {/* Paper grain texture */}
      <div className="paper-grain absolute inset-0" />

      {/* Random Floating Secret Whisper Star (Interactive Easter Egg) */}
      {isWorldOpened && floatingWhisperIndex !== null && (
        <button
          type="button"
          onClick={handleWhisperClick}
          style={{ left: `${whisperPos.x}%`, top: `${whisperPos.y}%` }}
          title="Click to catch this drifting note"
          className="pointer-events-auto fixed z-30 flex items-center gap-1.5 rounded-full border border-[#F4D88B]/80 bg-[#FFFDF9]/90 px-3 py-1.5 text-xs text-[#392D40] shadow-md backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#FFF9F3] animate-float-slow cursor-pointer group"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#D98F9B] transition-transform group-hover:rotate-45" />
          <span className="font-handwriting text-sm text-[#74647D] group-hover:text-[#392D40]">
            psst... a drifting note
          </span>
        </button>
      )}
    </div>
  );
};

export const FloatingElements: React.FC<{ mouseOffset?: { x: number; y: number } }> = ({
  mouseOffset = { x: 0, y: 0 },
}) => {
  const { unlockEasterEgg } = useWorld();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Top-left floating star */}
      <div
        style={{
          transform: `translate3d(${mouseOffset.x * -18}px, ${mouseOffset.y * -14}px, 0)`,
        }}
        className="pointer-events-auto absolute top-14 left-[8%] transition-transform duration-300 ease-out"
      >
        <button
          type="button"
          onClick={() =>
            unlockEasterEgg(
              'north-star',
              'Pocket Starlight 🌟',
              'Even on cloudy nights, you are always my favorite constellation.'
            )
          }
          aria-label="Decorative star"
          className="group cursor-pointer rounded-full p-2 text-[#F4D88B] transition hover:scale-125"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="animate-float-slow">
            <path
              d="M14 2L16.8 10.6L25.5 14L16.8 17.4L14 26L11.2 17.4L2.5 14L11.2 10.6L14 2Z"
              fill="#F4D88B"
              stroke="#D98F9B"
              strokeWidth="1.2"
            />
          </svg>
        </button>
      </div>

      {/* Top-right floating botanical flower */}
      <div
        style={{
          transform: `translate3d(${mouseOffset.x * 22}px, ${mouseOffset.y * -18}px, 0)`,
        }}
        className="pointer-events-auto absolute top-20 right-[10%] transition-transform duration-300 ease-out"
      >
        <button
          type="button"
          onClick={() =>
            unlockEasterEgg(
              'pressed-petal',
              'Pressed Petal 🌸',
              'I tucked this tiny flower here just in case nobody gave you flowers today.'
            )
          }
          aria-label="Decorative flower"
          className="cursor-pointer p-2 transition hover:scale-125"
        >
          <svg width="34" height="34" viewBox="0 0 36 36" fill="none" className="animate-float-slow">
            <circle cx="18" cy="10" r="6" fill="#D98F9B" fillOpacity="0.65" />
            <circle cx="26" cy="16" r="6" fill="#D98F9B" fillOpacity="0.65" />
            <circle cx="23" cy="25" r="6" fill="#D98F9B" fillOpacity="0.65" />
            <circle cx="13" cy="25" r="6" fill="#D98F9B" fillOpacity="0.65" />
            <circle cx="10" cy="16" r="6" fill="#D98F9B" fillOpacity="0.65" />
            <circle cx="18" cy="18" r="5" fill="#F4D88B" />
          </svg>
        </button>
      </div>

      {/* Bottom-left lavender heart */}
      <div
        style={{
          transform: `translate3d(${mouseOffset.x * -14}px, ${mouseOffset.y * 16}px, 0)`,
        }}
        className="pointer-events-auto absolute bottom-16 left-[12%] hidden sm:block transition-transform duration-300 ease-out"
      >
        <button
          type="button"
          onClick={() =>
            unlockEasterEgg(
              'lavender-heart',
              'Lavender Wish 💜',
              'May your shoulders drop, your jaw unclench, and your heart feel deeply loved right now.'
            )
          }
          aria-label="Decorative heart"
          className="cursor-pointer p-2 text-[#C9B8E8] transition hover:scale-125"
        >
          <Heart className="h-6 w-6 fill-[#C9B8E8]/70 text-[#74647D]/60 animate-float-slow" />
        </button>
      </div>

      {/* Bottom-right paper plane / doodle */}
      <div
        style={{
          transform: `translate3d(${mouseOffset.x * 16}px, ${mouseOffset.y * 20}px, 0)`,
        }}
        className="pointer-events-auto absolute bottom-20 right-[11%] hidden sm:block transition-transform duration-300 ease-out"
      >
        <button
          type="button"
          onClick={() =>
            unlockEasterEgg(
              'paper-plane',
              'Paper Airplane Note ✈️',
              'Sending a thousand invisible forehead kisses straight to wherever you are sitting.'
            )
          }
          aria-label="Decorative paper plane"
          className="cursor-pointer p-2 transition hover:scale-125"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="animate-float-slow">
            <path
              d="M4 15L27 5L19 27L14 18L4 15Z"
              fill="#FFFDF9"
              stroke="#392D40"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M27 5L14 18" stroke="#D98F9B" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};
