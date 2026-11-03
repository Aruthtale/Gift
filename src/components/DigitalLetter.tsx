import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, RotateCcw, Sparkles, Feather } from 'lucide-react';
import { giftConfig, fillText } from '../config/giftConfig';
import { features } from '../config/features';
import { useWorld } from '../context/WorldContext';
import { soundEngine } from '../utils/soundEngine';

/** Ubah **teks** jadi tulisan tangan tebal; sisanya teks biasa. */
const renderBold = (text: string) =>
  text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((chunk, i) =>
      chunk.startsWith('**') && chunk.endsWith('**') ? (
        <strong
          key={i}
          className="font-handwriting text-xl sm:text-2xl font-semibold text-[#B66674]"
        >
          {chunk.slice(2, -2)}
        </strong>
      ) : (
        <React.Fragment key={i}>{chunk}</React.Fragment>
      )
    );

export const DigitalLetter: React.FC = () => {
  const { letterOpened, markLetterOpened, senderName, recipientName, unlockEasterEgg } = useWorld();
  const [isUnfolded, setIsUnfolded] = useState(letterOpened);
  const [visibleParagraphs, setVisibleParagraphs] = useState(
    letterOpened ? giftConfig.letter.paragraphs.length + 1 : 0
  );

  const names = { sender: senderName, recipient: recipientName };
  const postscriptParagraphs = (Array.isArray(giftConfig.letter.postscript)
    ? giftConfig.letter.postscript
    : [String(giftConfig.letter.postscript)]
  ).map((line) => fillText(line, names));

  useEffect(() => {
    if (!letterOpened) {
      setIsUnfolded(false);
      setVisibleParagraphs(0);
    }
  }, [letterOpened]);

  useEffect(() => {
    if (!isUnfolded) return;
    if (visibleParagraphs > giftConfig.letter.paragraphs.length) return;

    const timer = window.setTimeout(() => {
      setVisibleParagraphs((prev) => prev + 1);
    }, 950);

    return () => window.clearTimeout(timer);
  }, [isUnfolded, visibleParagraphs]);

  const handleOpenLetter = () => {
    markLetterOpened();
    setIsUnfolded(true);
    setVisibleParagraphs(1);
  };

  const handleReadAgain = () => {
    soundEngine.playChime('flip');
    setVisibleParagraphs(0);
    window.setTimeout(() => {
      setVisibleParagraphs(1);
    }, 250);
  };

  const handleFoldBack = () => {
    soundEngine.playChime('flip');
    setIsUnfolded(false);
    setVisibleParagraphs(0);
  };

  return (
    <section id="section-letter" className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D98F9B]/20 px-3.5 py-1 text-xs font-medium tracking-widest text-[#392D40] uppercase">
          <Feather className="h-3.5 w-3.5 text-[#D98F9B]" />
          {giftConfig.letter.eyebrow}
        </span>
        <h2 className="mt-3 font-serif-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#392D40]">
          {giftConfig.letter.title}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#74647D]">
          {giftConfig.letter.subtitle}
        </p>
      </div>

      <div className="mt-12">
        <AnimatePresence mode="wait">
          {!isUnfolded ? (
            /* CLOSED ENVELOPE STATE */
            <motion.div
              key="closed-letter-envelope"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -18 }}
              transition={{ duration: 0.45 }}
              onClick={handleOpenLetter}
              className="group relative mx-auto flex max-w-lg flex-col items-center justify-center rounded-3xl border border-[#392D40]/15 bg-gradient-to-b from-[#F8EFE4] to-[#EFE1D1] p-10 sm:p-14 text-center shadow-[0_24px_60px_-15px_rgba(57,45,64,0.16)] cursor-pointer select-none"
            >
              {/* Decorative Envelope Flap Lines */}
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#F4D88B] bg-gradient-to-br from-[#D98F9B] to-[#B66674] text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                <div className="flex flex-col items-center">
                  <Mail className="h-6 w-6" />
                  <span className="mt-0.5 font-mono-code text-[10px] font-bold">
                    {fillText(giftConfig.waxSealInitials, names)}
                  </span>
                </div>
              </div>

              <p className="font-mono-code text-xs uppercase tracking-widest text-[#74647D]">
                {fillText(giftConfig.letter.sealedFor, names)}
              </p>

              <h3 className="mt-2 font-serif-display text-2xl sm:text-3xl font-medium text-[#392D40]">
                {fillText(giftConfig.letter.noteTitle, names)}
              </h3>

              <p className="mt-2 font-handwriting text-xl text-[#D98F9B]">
                {giftConfig.letter.sealHint}
              </p>
            </motion.div>
          ) : (
            /* UNFOLDED LINED STATIONERY LETTER */
            <motion.div
              key="unfolded-letter-paper"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lined-paper relative mx-auto max-w-3xl rounded-3xl border border-[#392D40]/15 p-7 sm:p-12 md:p-16 shadow-[0_28px_70px_-15px_rgba(57,45,64,0.14)]"
            >
              {/* Washi tape top corners */}
              <div className="washi-tape-rose absolute -top-3 left-8 h-6 w-24 -rotate-3 rounded-xs" />
              <div className="washi-tape absolute -top-3 right-8 h-6 w-24 rotate-3 rounded-xs" />

              {/* Pressed Botanical Flower Ornament in Top Right (Clickable Easter Egg) */}
              <button
                type="button"
                onClick={() =>
                  unlockEasterEgg(
                    'letter-pressed-flower',
                    giftConfig.letter.flowerToastTitle,
                    giftConfig.letter.flowerToastBody
                  )
                }
                title="A pressed flower tucked into the letter"
                className="float-right ml-4 mb-2 rounded-2xl border border-[#D98F9B]/25 bg-[#FFF9F3]/90 p-3 shadow-xs transition hover:scale-105 cursor-pointer"
              >
                <svg width="48" height="58" viewBox="0 0 48 58" fill="none">
                  <path d="M24 24C24 36 21 46 25 54" stroke="#588561" strokeWidth="2" strokeLinecap="round" />
                  <path d="M24 40C17 37 14 33 19 31" stroke="#588561" strokeWidth="1.6" strokeLinecap="round" />
                  <circle cx="24" cy="14" r="6" fill="#D98F9B" fillOpacity="0.8" />
                  <circle cx="32" cy="19" r="6" fill="#D98F9B" fillOpacity="0.7" />
                  <circle cx="29" cy="27" r="6" fill="#D98F9B" fillOpacity="0.8" />
                  <circle cx="19" cy="27" r="6" fill="#D98F9B" fillOpacity="0.7" />
                  <circle cx="16" cy="19" r="6" fill="#D98F9B" fillOpacity="0.8" />
                  <circle cx="24" cy="21" r="4.5" fill="#F4D88B" />
                </svg>
              </button>

              {/* Date & Coordinates */}
              {features.letterMeta && (
                <div className="font-mono-code text-xs text-[#74647D]">
                  <span>{giftConfig.date}</span>
                  <span className="mx-2">•</span>
                  <span>{giftConfig.coordinates}</span>
                </div>
              )}

              {/* Salutation */}
              <h3 className="mt-6 font-serif-display text-2xl sm:text-3xl font-medium italic text-[#392D40]">
                {fillText(giftConfig.letter.salutation, names)}
              </h3>

              {/* Progressive Reveal Paragraphs */}
              <div className="mt-6 space-y-5 text-base sm:text-lg text-[#392D40]/92 leading-relaxed">
                {giftConfig.letter.paragraphs.map((para, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={
                      visibleParagraphs > idx
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0.08, y: 6 }
                    }
                    transition={{ duration: 0.65 }}
                    className="font-serif-display"
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              {/* Sign-Off & Postscript */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={
                  visibleParagraphs > giftConfig.letter.paragraphs.length
                    ? { opacity: 1 }
                    : { opacity: 0.15 }
                }
                transition={{ duration: 0.7 }}
                className="mt-10 border-t border-[#D98F9B]/25 pt-6"
              >
                <p className="font-serif-display text-lg italic text-[#74647D]">
                  {giftConfig.letter.signOff}
                </p>
                <p className="mt-1 font-handwriting text-4xl text-[#392D40]">
                  {fillText(giftConfig.letter.signature, names)}
                </p>

                <div className="mt-6 rounded-2xl border border-[#F4D88B]/60 bg-[#FFF9F3] p-5 sm:p-7 text-left">
                  <div className="space-y-3.5">
                    {postscriptParagraphs.map((line, idx) => (
                      <p
                        key={idx}
                        className="font-serif-display text-sm sm:text-base leading-relaxed text-[#392D40]/90"
                      >
                        {renderBold(line)}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Bottom Controls: Reveal All / Read Again / Fold Back */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#392D40]/10 pt-5">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleReadAgain}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#392D40]/15 bg-white px-4 py-2 text-xs font-medium text-[#392D40] shadow-xs transition hover:border-[#D98F9B] cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5 text-[#D98F9B]" />
                    <span>{giftConfig.letter.replayButton}</span>
                  </button>

                  {visibleParagraphs <= giftConfig.letter.paragraphs.length && (
                    <button
                      type="button"
                      onClick={() =>
                        setVisibleParagraphs(giftConfig.letter.paragraphs.length + 1)
                      }
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#F4D88B]/40 px-4 py-2 text-xs font-medium text-[#392D40] transition hover:bg-[#F4D88B]/65 cursor-pointer"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-[#D98F9B]" />
                      <span>{giftConfig.letter.fullTextButton}</span>
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleFoldBack}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#74647D] hover:text-[#392D40] cursor-pointer"
                >
                  <Heart className="h-3.5 w-3.5 text-[#D98F9B]" />
                  <span>{giftConfig.letter.foldButton}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
