import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Play, RotateCcw, Sparkles, Timer, CheckCircle2 } from 'lucide-react';
import { giftConfig } from '../config/giftConfig';
import { useWorld } from '../context/WorldContext';
import { soundEngine } from '../utils/soundEngine';

interface FallingHeart {
  id: number;
  x: number; // percentage 8..92
  y: number; // percentage 0..100
  speed: number;
  isGolden: boolean;
  size: number;
  noteText: string;
}

const MINI_NOTES = [
  'Yours!',
  'Got it ♡',
  'Cutie!',
  'My heart!',
  'So fast!',
  'XOXO',
  'Always you',
];

export const CatchMyHeart: React.FC = () => {
  const { completeCatchHeart, catchHeartCompleted, catchHeartBestScore } = useWorld();
  const { targetScore, durationSeconds, secretWinMessage } = giftConfig.catchHeartGame;

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'ended'>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [hearts, setHearts] = useState<FallingHeart[]>([]);
  const [basketX, setBasketX] = useState(50);
  const [popFeedback, setPopFeedback] = useState<{ id: number; x: number; y: number; text: string } | null>(null);

  const scoreRef = useRef(0);
  const basketXRef = useRef(50);
  const nextHeartId = useRef(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const startGame = () => {
    soundEngine.playChime('sparkle');
    scoreRef.current = 0;
    setScore(0);
    setTimeLeft(durationSeconds);
    setHearts([]);
    setGameState('playing');
  };

  const endGame = useCallback(() => {
    setGameState('ended');
    setHearts([]);
    completeCatchHeart(scoreRef.current);
    if (scoreRef.current >= targetScore) {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D98F9B', '#F4D88B', '#C9B8E8'],
      });
    }
  }, [completeCatchHeart, targetScore]);

  // Countdown Timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [gameState, endGame]);

  // Spawn & Move Falling Hearts
  useEffect(() => {
    if (gameState !== 'playing') return;

    const spawner = window.setInterval(() => {
      const id = nextHeartId.current++;
      const isGolden = Math.random() < 0.25;
      setHearts((prev) => [
        ...prev.slice(-10),
        {
          id,
          x: Math.floor(10 + Math.random() * 80),
          y: -6,
          speed: isGolden ? 2.1 : 1.35 + Math.random() * 0.75,
          isGolden,
          size: isGolden ? 34 : 28,
          noteText: MINI_NOTES[id % MINI_NOTES.length],
        },
      ]);
    }, 620);

    const ticker = window.setInterval(() => {
      setHearts((prev) => {
        const remaining: FallingHeart[] = [];
        for (const h of prev) {
          const nextY = h.y + h.speed;
          // Check if caught by basket at bottom (y between 80 and 94, x within 12% of basketX)
          if (nextY >= 80 && nextY <= 94 && Math.abs(h.x - basketXRef.current) <= 13) {
            const pts = h.isGolden ? 2 : 1;
            scoreRef.current += pts;
            setScore(scoreRef.current);
            soundEngine.playChime('heart');
            setPopFeedback({ id: h.id, x: h.x, y: 80, text: `+${pts} ${h.noteText}` });
            continue;
          }
          if (nextY < 102) {
            remaining.push({ ...h, y: nextY });
          }
        }
        return remaining;
      });
    }, 35);

    return () => {
      window.clearInterval(spawner);
      window.clearInterval(ticker);
    };
  }, [gameState]);

  const handleCatchClick = (heart: FallingHeart, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const pts = heart.isGolden ? 2 : 1;
    scoreRef.current += pts;
    setScore(scoreRef.current);
    soundEngine.playChime('heart');
    setPopFeedback({
      id: heart.id,
      x: heart.x,
      y: heart.y,
      text: `+${pts} ${heart.noteText}`,
    });
    setHearts((prev) => prev.filter((item) => item.id !== heart.id));
  };

  const handlePointerMove = (clientX: number) => {
    if (!containerRef.current || gameState !== 'playing') return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(10, Math.min(90, ((clientX - rect.left) / rect.width) * 100));
    basketXRef.current = pct;
    setBasketX(pct);
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-3xl border border-[#392D40]/12 bg-[#FFFDF9] p-6 sm:p-8 shadow-[0_18px_45px_-12px_rgba(57,45,64,0.08)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#392D40]/10 pb-4">
        <div>
          <span className="font-mono-code text-[11px] font-semibold uppercase tracking-widest text-[#D98F9B]">
            MINI GAME 02 • ARCADE
          </span>
          <h3 className="font-serif-display text-2xl font-medium text-[#392D40]">
            Catch My Heart
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {catchHeartCompleted && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#9AB89F]/25 px-3 py-1 text-xs font-medium text-[#392D40]">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#588561]" />
              Best: {catchHeartBestScore}
            </span>
          )}
        </div>
      </div>

      {/* Interactive Canvas Area */}
      <div
        ref={containerRef}
        onMouseMove={(e) => handlePointerMove(e.clientX)}
        onTouchMove={(e) => {
          if (e.touches[0]) handlePointerMove(e.touches[0].clientX);
        }}
        className="relative my-5 h-80 w-full overflow-hidden rounded-2xl border border-[#392D40]/10 bg-gradient-to-b from-[#FFF9F3] via-[#FDF2EA] to-[#F7E5E8] select-none"
      >
        {/* Top HUD inside game canvas */}
        <div className="pointer-events-none absolute inset-x-4 top-3 z-20 flex items-center justify-between">
          <div className="flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-[#392D40] shadow-xs backdrop-blur-xs font-mono-code">
            <Heart className="h-3.5 w-3.5 fill-[#D98F9B] text-[#D98F9B]" />
            <span>
              SCORE: {score} / {targetScore}
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-[#392D40] shadow-xs backdrop-blur-xs font-mono-code">
            <Timer className="h-3.5 w-3.5 text-[#D98F9B]" />
            <span>{timeLeft}s</span>
          </div>
        </div>

        {/* IDLE OVERLAY */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#FFF9F3]/80 p-6 text-center backdrop-blur-xs">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D98F9B]/20 text-[#D98F9B]">
              <Heart className="h-7 w-7 fill-[#D98F9B]" />
            </div>
            <h4 className="mt-3 font-serif-display text-xl font-medium text-[#392D40]">
              Ready to Catch My Heart?
            </h4>
            <p className="mt-1 max-w-xs text-xs sm:text-sm text-[#74647D]">
              Tap falling hearts directly or slide the keepsake basket at the bottom. Catch at least{' '}
              <strong className="text-[#392D40]">{targetScore} points</strong> to unlock a hidden note!
            </p>
            <button
              type="button"
              onClick={startGame}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#392D40] px-6 py-3 text-xs sm:text-sm font-medium text-[#FFF9F3] shadow-md transition hover:scale-105 hover:bg-[#4d3d56] cursor-pointer"
            >
              <Play className="h-4 w-4 fill-[#F4D88B] text-[#F4D88B]" />
              <span>Start Catching Hearts</span>
            </button>
          </div>
        )}

        {/* PLAYING STATE: Falling Hearts & Basket */}
        {gameState === 'playing' && (
          <>
            {hearts.map((h) => (
              <button
                key={h.id}
                type="button"
                onMouseDown={(e) => handleCatchClick(h, e)}
                onTouchStart={(e) => handleCatchClick(h, e)}
                style={{
                  left: `${h.x}%`,
                  top: `${h.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                aria-label="Catch falling heart"
                className="absolute z-20 cursor-pointer p-2 transition-transform active:scale-125"
              >
                <Heart
                  style={{ width: h.size, height: h.size }}
                  className={
                    h.isGolden
                      ? 'fill-[#F4D88B] text-[#392D40] drop-shadow-sm'
                      : 'fill-[#D98F9B] text-[#392D40]/80 drop-shadow-xs'
                  }
                />
              </button>
            ))}

            {/* Pop feedback text */}
            <AnimatePresence>
              {popFeedback && (
                <motion.div
                  key={popFeedback.id}
                  initial={{ opacity: 1, y: 0, scale: 0.9 }}
                  animate={{ opacity: 0, y: -24, scale: 1.1 }}
                  exit={{ opacity: 0 }}
                  style={{ left: `${popFeedback.x}%`, top: `${popFeedback.y}%` }}
                  className="pointer-events-none absolute z-30 -translate-x-1/2 font-handwriting text-lg font-bold text-[#392D40]"
                >
                  {popFeedback.text}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Keepsake Catcher Basket at Bottom */}
            <div
              style={{ left: `${basketX}%` }}
              className="pointer-events-none absolute bottom-3 z-20 -translate-x-1/2 transition-all duration-75"
            >
              <div className="flex items-center gap-1.5 rounded-full border-2 border-[#392D40] bg-[#FFFDF9] px-4 py-1.5 text-xs font-semibold text-[#392D40] shadow-md">
                <Heart className="h-3.5 w-3.5 fill-[#D98F9B] text-[#D98F9B]" />
                <span>Catch Here</span>
              </div>
            </div>
          </>
        )}

        {/* ENDED OVERLAY */}
        {gameState === 'ended' && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#FFF9F3]/92 p-6 text-center backdrop-blur-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F4D88B]/40 text-[#D98F9B]">
              <Sparkles className="h-6 w-6" />
            </div>
            <p className="mt-2 font-mono-code text-xs uppercase tracking-widest text-[#D98F9B]">
              TIME&rsquo;S UP • SCORE: {score} HEARTS
            </p>
            <h4 className="mt-1 font-serif-display text-xl font-medium text-[#392D40]">
              {score >= targetScore ? 'Secret Note Unlocked!' : 'Every Heart Still Belongs to You!'}
            </h4>
            <p className="mt-2 max-w-md rounded-xl border border-[#D98F9B]/30 bg-white p-3.5 text-xs sm:text-sm text-[#392D40] leading-relaxed shadow-xs">
              &ldquo;{secretWinMessage}&rdquo;
            </p>
            <button
              type="button"
              onClick={startGame}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#392D40]/15 bg-white px-5 py-2 text-xs font-medium text-[#392D40] shadow-xs transition hover:border-[#D98F9B] cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Play Again</span>
            </button>
          </div>
        )}
      </div>

      <p className="text-center font-handwriting text-lg text-[#74647D]">
        Tip: Golden hearts are worth +2 points!
      </p>
    </div>
  );
};
